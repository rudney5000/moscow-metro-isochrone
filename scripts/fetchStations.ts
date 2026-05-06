/**
 * fetchStations.ts
 *
 * Fetches Moscow Metro station data from the Overpass API by querying
 * route relations (which carry the line info) and resolving their
 * member station nodes.
 *
 * Run: npx tsx scripts/fetchStations.ts
 */

import { readFileSync, mkdirSync } from "fs";
import path from "path";

import type { Station, IsochroneFeature } from "@/entities/station/model/types.ts";
import {
    allFirstDepartures,
    distanceM, loadDepartureIndex,
    loadGtfsStops,
    nearbyGtfsStops,
    nearestGtfsStop,
    processStation
} from "./computeIsochrones.ts";


// ── constants ─────────────────────────────────────────────────────────────
const STATIONS_PATH = path.resolve("public/data/stations.geojson");

const OUT_DIR = path.resolve("public/data/isochrones");

const TARGET_TIME = "14:00:00";
const DATE_PREFIX = "2024-06-05T";

const CONCURRENCY = 2;

// ── types GeoJSON input ───────────────────────────────────────────────────
interface StationGeoJSON {
    type: "FeatureCollection";
    features: Array<{
        properties: {
            id: string;
            nameLocal: string;
        };
        geometry: {
            type: "Point";
            coordinates: [number, number]; // [lng, lat]
        };
    }>;
}

// ── MAIN ──────────────────────────────────────────────────────────────────

async function main() {
    console.log("Loading GTFS stops...");
    const gtfsStops = loadGtfsStops();
    console.log(`  ${gtfsStops.length} stops loaded.`);

    console.log("Loading GTFS departure times...");
    const depIndex = loadDepartureIndex();

    let raw: StationGeoJSON;

    try {
        raw = JSON.parse(readFileSync(STATIONS_PATH, "utf-8"));
    } catch {
        console.error(`Cannot read ${STATIONS_PATH}. Run fetchStations.ts first.`);
        process.exit(1);
    }

    const stations: Station[] = raw.features.map((f) => {
        const [lng, lat] = f.geometry.coordinates;

        return {
            id: f.properties.id,
            name: f.properties.nameLocal,
            nameLocal: f.properties.nameLocal,
            position: { lat, lng },
        };
    });

    mkdirSync(OUT_DIR, { recursive: true });

    console.log(
        `\nComputing isochrones for ${stations.length} stations (off-peak 14:00)...\n`
    );

    const total = stations.length;
    let done = 0;

    const counts = {
        ok: 0,
        skip: 0,
        degenerate: 0,
    };

    const results: IsochroneFeature[] = [];

    for (let i = 0; i < stations.length; i += CONCURRENCY) {
        const batch = stations.slice(i, i + CONCURRENCY);

        await Promise.all(
            batch.map(async (station) => {
                const { nameLocal, position } = station;
                const { lat: osmLat, lng: osmLon } = position;

                const snap = nearestGtfsStop(osmLat, osmLon, gtfsStops);

                const lat = snap ? snap.lat : osmLat;
                const lon = snap ? snap.lon : osmLon;

                const snapNote = snap
                    ? ` (snapped ${Math.round(distanceM(osmLat, osmLon, lat, lon))}m)`
                    : " (OSM)";

                const nearbyStops = nearbyGtfsStops(lat, lon, gtfsStops, 400);

                const depTimes =
                    nearbyStops.length > 0
                        ? allFirstDepartures(nearbyStops, TARGET_TIME, depIndex)
                        : [TARGET_TIME];

                const departures = depTimes.map(
                    (t) => `${DATE_PREFIX}${t}+03:00`
                );

                const depNote =
                    depTimes.length > 1 ? ` ${depTimes.length}dirs` : "";

                const { status, retryNote, data } = await processStation(
                    station,
                    departures,
                    nearbyStops
                );

                if (data) {
                    results.push(...data);
                }

                counts[status]++;
                done++;

                console.log(
                    `[${done}/${total}] ${nameLocal}${snapNote}${depNote}${retryNote}: ${status.toUpperCase()}`
                );
            })
        );
    }

    console.log(`\nDone.`);
    console.log(`  OK:          ${counts.ok}`);
    console.log(`  SKIP:        ${counts.skip}`);
    console.log(`  DEGENERATE:  ${counts.degenerate}`);

    console.log(`\nTotal iso features: ${results.length}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
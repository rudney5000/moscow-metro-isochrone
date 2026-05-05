// Reads all isochrone GeoJSON files, computes polygon area per interval,
// and writes public/data/rankings.json sorted by 30-min area descending.

import fs from "fs";
import path from "path";
import { area } from "@turf/turf";
import { stationsRaw } from "@/shared/data/stations.ts";
import type {RankingRow, Station} from "@/entities/station/model/types.ts";

const ISOCHRONES_DIR = path.resolve("public/data/isochrones");
const OUT_FILE = path.resolve("public/data/rankings.json");

const INTERVALS = [15, 30, 60] as const;

const stations: Station[] = stationsRaw as Station[]

const stationMap = new Map(stations.map((s) => [s.id, s]));

const files = fs
    .readdirSync(ISOCHRONES_DIR)
    .filter((f) => f.endsWith(".geojson"));

const rows: RankingRow[] = [];

let done = 0;

for (const file of files) {
    const id = file.replace(".geojson", "");
    const station = stationMap.get(id);
    if (!station) continue;

    const raw = fs.readFileSync(path.join(ISOCHRONES_DIR, file), "utf-8");
    const fc = JSON.parse(raw) as {
        features: {
            properties: {
                interval: 15 | 30 | 60
            }
        }[]
    };

    const areas: Record<number, number> = {
        15: 0,
        30: 0,
         60: 0
    };

    for (const interval of INTERVALS) {
        const feature = fc.features.find(
            (f) => f.properties.interval === interval);

        if(feature) {
            areas[interval] =
                Math.round(area(feature as any) / 1_000_000 * 10) / 10; // km², 1dp
        }
    }

    rows.push({
        id,
        nameLocal: station.nameLocal,
        area15: areas[15],
        area30: areas[30],
        area60: areas[60],
    });

    done++;
    if (done % 50 === 0) process.stdout.write(`  ${done}/${files.length}\n`);
}

// Sort by 15-min area descending
rows.sort((a, b) => b.area15 - a.area15);

// Add rank
const ranked = rows.map((r, i) => ({ rank: i + 1, ...r }));

fs.writeFileSync(OUT_FILE, JSON.stringify(ranked, null, 2));
console.log(`\nWrote ${ranked.length} entries → ${OUT_FILE}`);
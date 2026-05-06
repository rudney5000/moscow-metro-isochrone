// scripts/generateStationsGeoJSON.ts
import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { stationsRaw } from "../src/shared/data/stations.ts";
import { lines } from "../src/shared/data/lines.ts";

const OUT_DIR = path.resolve("public/data");

// Map stationId → lineIds
const stationLines = new Map<string, string[]>();
for (const line of lines) {
    for (const stationId of line.stations) {
        if (!stationLines.has(stationId)) {
            stationLines.set(stationId, []);
        }
        stationLines.get(stationId)!.push(line.id);
    }
}

const features = stationsRaw.map((s) => ({
    type: "Feature" as const,
    properties: {
        id: s.id,
        nameLocal: s.nameLocal,
        name: s.name,
        lines: stationLines.get(s.id) ?? [],
    },
    geometry: {
        type: "Point" as const,
        coordinates: [s.position.lng, s.position.lat] as [number, number],
    },
}));

mkdirSync(OUT_DIR, { recursive: true });

writeFileSync(
    path.join(OUT_DIR, "stations.geojson"),
    JSON.stringify({ type: "FeatureCollection", features }, null, 2)
);

console.log(`✅ ${features.length} stations → public/data/stations.geojson`);
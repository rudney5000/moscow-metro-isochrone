import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { stationsRaw } from '../src/shared/data/stations'
import { lines } from '../src/shared/data/lines'

const OUT_DIR = path.resolve('public/data')

// Map stationId → position
const stationMap = new Map(stationsRaw.map(s => [s.id, s.position]))

const features = lines.map(line => {
    const coords = line.stations
        .map(id => stationMap.get(id))
        .filter(Boolean)
        .map(pos => [pos!.lng, pos!.lat] as [number, number])

    return {
        type: 'Feature' as const,
        properties: { lineId: line.id },
        geometry: {
            type: 'LineString' as const,
            coordinates: coords,
        },
    }
})

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(
    path.join(OUT_DIR, 'lines.geojson'),
    JSON.stringify({ type: 'FeatureCollection', features }, null, 2)
)

console.log(`✅ ${features.length} lignes → public/data/lines.geojson`)
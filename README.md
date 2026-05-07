# Moscow Isochrone
# Москва Изохроны

**Where can you reach from any Moscow Metro station in 15, 30, or 60 minutes?**

An interactive map showing transit reachability across the Moscow Metro network — useful for apartment hunting, commute planning, or exploring the city.

[Live demo →](https://github.com/rudney5000/moscow-metro-isochrone)

---

## Features

- **166 stations** across 15 lines (Сокольническая, Замоскворецкая, Кольцевая, БКЛ, and more)
- **Isochrone rings** at 15, 30, and 60 minutes (subway + walking, off-peak 14:00 weekday)
- **Station search** — Russian (Белорусская) and transliterated English (Belorusskaya)
- **Line filter** — show/hide individual metro lines
- **Accessibility ranking** — data panel with top-15 stations by reachable area
- **Fast** — isochrones are static GeoJSON served from CDN, no routing server at runtime

---

## Architecture

Isochrones are pre-computed once at build time and shipped as static GeoJSON. No routing server runs at runtime.

```
scripts/
├── computeIsochrones.ts     # Queries GraphHopper for all 166 stations
├── computeRankings.ts       # Ranks stations by reachable area
├── generateStationsGeoJSON.ts
└── generateLinesGeoJSON.ts

public/data/
├── isochrones/<station-id>.geojson   # One file per station (up to 3 intervals)
├── rankings.json
├── stations.geojson
└── lines.geojson
```

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vue 3 + TypeScript |
| Map | MapLibre GL JS |
| Basemap | MapTiler Dataviz Dark |
| Routing *(build-time only)* | GraphHopper + Moscow Metro GTFS + Russia OSM |
| State | Pinia |
| Search | Fuse.js |
| Styling | SCSS |
| Build | Vite |
| Deploy | Vercel / GitHub Pages |

---

## Local Development

### Prerequisites

- Node.js 18+, pnpm
- MapTiler API key (free tier)
- Docker (only needed to regenerate isochrones)

### Setup

```bash
git clone https://github.com/rudney5000/moscow-metro-isochrone.git
cd moscow-metro-isochrone
pnpm install
cp .env.example .env
# Add your VITE_MAPTILER_KEY to .env
pnpm dev
```

> Pre-computed isochrones are not checked in (too large). The app loads with station dots but no isochrone polygons until you regenerate them or add the files manually.

---

## Regenerating Isochrones

```bash
# 1. Generate station coordinates from OSM
pnpm run generate-stations

# 2. Download Russia OSM extract → docker/data/russia-latest.osm.pbf
#    https://download.geofabrik.de/russia.html
#    A Moscow Metro GTFS should be placed at docker/gtfs/moscow-metro.gtfs.zip

# 3. Start GraphHopper (ingests GTFS + OSM, ~5 min on first run)
docker compose -f docker/docker-compose.yml up graphhopper

# 4. Compute all isochrones (166 stations)
pnpm run compute-isochrones

# 5. Compute accessibility rankings
pnpm run compute-rankings

# 6. Generate lines GeoJSON for map rendering
pnpm run generate-lines

# 7. Shut down Docker
docker compose -f docker/docker-compose.yml down
```

GraphHopper runs at `http://localhost:8989` by default. Override with `GH_URL=http://...`.

---

## Isochrone File Format

Each `public/data/isochrones/<station-id>.geojson` is a GeoJSON `FeatureCollection` with up to 3 features (one per interval). Feature properties:

```json
{ "interval": 15, "stationId": "belorusskaya" }
```

Intervals: **15 / 30 / 60 minutes** — off-peak, 14:00 weekday departure.

---

## Data Sources

| Data | Source | License |
|---|---|---|
| Station locations | OpenStreetMap Overpass API | ODbL |
| Metro timetables | Moscow Metro GTFS | Public |
| Street network | Geofabrik Russia OSM extract | ODbL |
| Basemap tiles | MapTiler Dataviz Dark | Commercial (free tier) |

---

## License

MIT — Dedy Rudney · 2026
<script setup lang="ts">
import maplibregl from "maplibre-gl";
import {onBeforeUnmount, onMounted, ref, shallowRef, watch} from "vue";
import {useMapStore} from "@/entities/station/model/store.ts";
import {MAP_CONFIG} from "@/shared/config/map.ts";
import { loadIsochrone } from "@/shared/api/isochrone/isochroneLoader.ts";
import {ISOCHRONE_COLORS, ISOCHRONE_INTERVALS, ISOCHRONE_STROKES} from "@/shared/const/consts.ts";
import type {LineId} from "@/entities/station/model/types.ts";
import {lines} from "@/shared/data/lines.ts";
import {getStationLineBadges} from "@/shared/utils/stationUtils.ts";

// global role of component

/** il fait 5 chose principales
 * 1. initialize map(MapLibre)
 * 2. Show:
 *  . subway lines
 *  . stations
 * 3.Handles station selection
 * 4. Loads and displays travel time isochrones
 * 5. Sync everything with your store
 */

const store = useMapStore()
const mapContainer = ref<HTMLDivElement | null>(null)
const mapRef = shallowRef<maplibregl.Map | null>(null)
const markerRef = shallowRef<maplibregl.Marker | null>(null)
const EMPTY_FC: GeoJSON.FeatureCollection = { type: 'FeatureCollection', features: []}
const LINE_COLORS = Object.fromEntries(lines.map(l => [l.id, l.color])) as Record<LineId, string>
const LINE_NAMES  = Object.fromEntries(lines.map(l => [l.id, l.name]))  as Record<LineId, string>

function drawPill(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    w: number, h: number,
    r: number
) {
  r = Math.min(r, h / 2, w / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y,     x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x,     y + h, r)
  ctx.arcTo(x,     y + h, x,     y,     r)
  ctx.arcTo(x,     y,     x + w, y,     r)
  ctx.closePath()
}

function createPulseMarker(station: typeof store.selectedStation): HTMLElement {
  if (!station) return document.createElement('div')

  const lines = store.lines
      .filter(l => l.stations.includes(station.id))
      .map(l => l.id)

  const primaryColor = LINE_COLORS[lines[0] as LineId] ?? '#333'
  const el = document.createElement('div')
  el.className = 'station-pulse-marker'

  if (lines.length <= 1) {
    el.style.cssText = 'width:20px;height:20px;position:relative;display:flex;align-items:center;justify-content:center;'
    const ring = document.createElement('div')
    ring.style.cssText = `position:absolute;width:20px;height:20px;border-radius:50%;border:2.5px solid ${primaryColor};animation:pulse-ring 1.6s ease-out infinite;opacity:0;`
    const dot = document.createElement('div')
    dot.style.cssText = `width:10px;height:10px;border-radius:50%;background:${primaryColor};border:2px solid #fff;`
    el.appendChild(ring)
    el.appendChild(dot)
  } else {
    el.style.cssText = 'position:relative;display:flex;align-items:center;justify-content:center;'
    const pill = document.createElement('div')
    pill.style.cssText = `display:flex;align-items:center;gap:3px;padding:4px 7px;background:#fff;border-radius:999px;border:1.5px solid #c8c8c8;box-shadow:0 1px 4px rgba(0,0,0,0.25);animation:pulse-pill 1.6s ease-out infinite;`
    lines.forEach(line => {
      const dot = document.createElement('div')
      dot.style.cssText = `width:9px;height:9px;border-radius:50%;background:${LINE_COLORS[line as LineId] ?? '#888'};flex-shrink:0;`
      pill.appendChild(dot)
    })
    el.appendChild(pill)
  }
  return el
}

function createStationImage(lines: string[]): ImageData {
  const dotR = 4

  if (lines.length <= 1) {
    const border = 1.5
    const size = Math.ceil((dotR + border) * 2) + 2
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const c = size / 2
    ctx.beginPath()
    ctx.arc(c, c, dotR + border, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(c, c, dotR, 0, Math.PI * 2)
    ctx.fillStyle = LINE_COLORS[lines[0] as LineId] ?? '#888'
    ctx.fill()
    return ctx.getImageData(0, 0, size, size)
  }

  const n = lines.length
  const gap = 2
  const padX = 5
  const padY = 3.5
  const borderW = 1.5
  const dotsWidth = n * dotR * 2 + (n - 1) * gap
  const pillW = dotsWidth + padX * 2
  const pillH = dotR * 2 + padY * 2
  const cornerR = pillH / 2
  const width = Math.ceil(pillW + borderW * 2) + 2
  const height = Math.ceil(pillH + borderW * 2) + 2
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  const ox = (width - pillW) / 2
  const oy = (height - pillH) / 2

  drawPill(ctx, ox - borderW, oy - borderW, pillW + borderW * 2, pillH + borderW * 2, cornerR + borderW)
  ctx.fillStyle = '#c8c8c8'
  ctx.fill()
  drawPill(ctx, ox, oy, pillW, pillH, cornerR)
  ctx.fillStyle = '#fff'
  ctx.fill()

  const cy = height / 2
  lines.forEach((line, i) => {
    const cx = ox + padX + dotR + i * (dotR * 2 + gap)
    ctx.beginPath()
    ctx.arc(cx, cy, dotR, 0, Math.PI * 2)
    ctx.fillStyle = LINE_COLORS[line as LineId] ?? '#888'
    ctx.fill()
  })

  return ctx.getImageData(0, 0, width, height)
}

function applyIsochroneData(map: maplibregl.Map) {
  const src = map.getSource('isochrones') as maplibregl.GeoJSONSource | undefined
  if (!src) return
  const iso = store.isochrones
  src.setData(iso ?? EMPTY_FC)
}

function applyIntervalVisibility(map: maplibregl.Map) {
  ISOCHRONE_INTERVALS.forEach((interval, i) => {
    const vis = store.intervals.includes(interval) ? 'visible' : 'none'
    if (map.getLayer(`isochrone-fill-${i}`)) map.setLayoutProperty(`isochrone-fill-${i}`, 'visibility', vis)
    if (map.getLayer(`isochrone-line-${i}`)) map.setLayoutProperty(`isochrone-line-${i}`, 'visibility', vis)
  })
}

function applyDimming(map: maplibregl.Map) {
  const hasIso = !!store.isochrones
  if (map.getLayer('station-icons')) map.setPaintProperty('station-icons', 'icon-opacity', hasIso ? 0.3 : 1)
  if (map.getLayer('station-labels')) map.setPaintProperty('station-labels', 'text-opacity', hasIso ? 0.3 : 1)
  if (map.getLayer('subway-lines-inner')) map.setPaintProperty('subway-lines-inner', 'line-opacity', hasIso ? 0.3 : 1)
  if (map.getLayer('subway-lines-casing')) map.setPaintProperty('subway-lines-casing', 'line-opacity', hasIso ? 0.2 : 0.7)
}

function applySelectedLabel(map: maplibregl.Map) {
  const src = map.getSource('selected-station-label') as maplibregl.GeoJSONSource | undefined
  if (!src) return
  const s = store.selectedStation
  src.setData(!s ? EMPTY_FC : {
    type: 'FeatureCollection',
    features: [{ type: 'Feature', geometry: { type: 'Point', coordinates: [s.position.lng, s.position.lat] }, properties: { name: s.name, nameLocal: s.nameLocal } }]
  })
}

async function setupLayers(map: maplibregl.Map) {

  // 1. CLEANUP — layers puis sources
  const layerIds = [
    ...ISOCHRONE_INTERVALS.flatMap((_, i) => [`isochrone-fill-${i}`, `isochrone-line-${i}`]),
    'subway-lines-casing', 'subway-lines-inner',
    'station-icons', 'station-labels', 'selected-station-label',
  ]
  layerIds.forEach(id => { if (map.getLayer(id)) map.removeLayer(id) })
  ;['isochrones', 'subway-lines', 'stations', 'selected-station-label'].forEach(id => {
    if (map.getSource(id)) map.removeSource(id)
  })

  // 2. ISOCHRONE SOURCE + LAYERS (vides au départ)
  map.addSource('isochrones', { type: 'geojson', data: EMPTY_FC })

  ;[...ISOCHRONE_INTERVALS].forEach((interval, i) => {
    map.addLayer({
      id: `isochrone-fill-${i}`,
      type: 'fill',
      source: 'isochrones',
      filter: ['==', ['get', 'interval'], interval],
      paint: { 'fill-color': ISOCHRONE_COLORS[i] },
    })
    map.addLayer({
      id: `isochrone-line-${i}`,
      type: 'line',
      source: 'isochrones',
      filter: ['==', ['get', 'interval'], interval],
      paint: {
        'line-color': ISOCHRONE_STROKES[i],
        'line-width': 1.5,
      },
    })
  })

  // 3. SUBWAY LINES depuis lines.geojson
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}data/lines.geojson`)
    if (res.ok) {
      const linesData = await res.json()
      map.addSource('subway-lines', { type: 'geojson', data: linesData })

      const lineColorExpr = [
        'match', ['get', 'lineId'],
        ...Object.entries(LINE_COLORS).flat(),
        '#888',
      ] as unknown as maplibregl.ExpressionSpecification

      map.addLayer({
        id: 'subway-lines-casing',
        type: 'line',
        source: 'subway-lines',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#fff',
          'line-width': ['interpolate', ['linear'], ['zoom'], 9, 2.5, 14, 4, 17, 6],
          'line-opacity': 0.7,
        },
      })

      map.addLayer({
        id: 'subway-lines-inner',
        type: 'line',
        source: 'subway-lines',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': lineColorExpr,
          'line-width': ['interpolate', ['linear'], ['zoom'], 9, 1, 14, 2, 17, 3.5],
          'line-opacity': 1,
        },
      })
    }
  } catch {
    console.warn('Could not load subway line geometries')
  }

  // 4. STATION ICONS
  const stationLines = new Map<string, string[]>()
  for (const line of store.lines) {
    for (const stationId of line.stations) {
      if (!stationLines.has(stationId)) stationLines.set(stationId, [])
      stationLines.get(stationId)!.push(line.id)
    }
  }

  const uniqueCombos = new Set(
      store.stations
        .map(s => {
          const ls = stationLines.get(s.id) ?? []
          return [...ls].sort().join(',')
        })
  )

  uniqueCombos.forEach(combo => {
    const key = `station-${combo}`
    if (!map.hasImage(key)) {
      map.addImage(key, createStationImage(combo.split(',')))
    }
  })

  map.addSource('stations', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: store.stations
        .map(s => {
          const ls = stationLines.get(s.id) ?? []
          const sorted = [...ls].sort().join(',')
          return {
            type: 'Feature' as const,
            geometry: { type: 'Point' as const, coordinates: [s.position.lng, s.position.lat] },
            properties: {
              id: s.id,
              name: s.name,
              nameLocal: s.nameLocal,
              lines: ls.join(','),
              linesSorted: sorted,
            },
          }
        }),
    },
  })

  map.addLayer({
    id: 'station-icons',
    type: 'symbol',
    source: 'stations',
    layout: {
      'icon-image': ['concat', 'station-', ['get', 'linesSorted']],
      'icon-size': ['interpolate', ['linear'], ['zoom'], 9, 0.55, 13, 0.8, 17, 1.0],
      'icon-anchor': 'center',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
    },
    paint: { 'icon-opacity': 1 },
  })

  map.addLayer({
    id: 'station-labels',
    type: 'symbol',
    source: 'stations',
    minzoom: 12,
    layout: {
      'text-field': ['step', ['zoom'],
        ['get', 'nameLocal'],
        14, ['format',
          ['get', 'nameLocal'], {},
          '\n', {},
          ['get', 'name'], { 'font-scale': 0.85 }
        ]
      ],
      'text-size': ['interpolate', ['linear'], ['zoom'], 12, 11, 14, 13, 17, 15],
      'text-offset': [0, 1.2],
      'text-anchor': 'top',
      'text-max-width': 8,
    },
    paint: {
      'text-color': '#0f0f1a',
      'text-halo-color': '#ffffff',
      'text-halo-width': 2,
    },
  })

  // 5. SELECTED STATION LABEL
  map.addSource('selected-station-label', { type: 'geojson', data: EMPTY_FC })
  map.addLayer({
    id: 'selected-station-label',
    type: 'symbol',
    source: 'selected-station-label',
    layout: {
      'text-field': ['format',
        ['get', 'nameLocal'], {},
        '\n', {},
        ['get', 'name'], { 'font-scale': 0.85 }
      ],
      'text-size': ['interpolate', ['linear'], ['zoom'], 12, 12, 14, 14, 17, 16],
      'text-offset': [0, 1.2],
      'text-anchor': 'top',
      'text-max-width': 8,
    },
    paint: {
      'text-color': '#0f0f1a',
      'text-halo-color': '#ffffff',
      'text-halo-width': 2.5,
    },
  })

  // 6. EVENT LISTENERS
  map.on('click', 'station-icons', e => {
    const feature = e.features?.[0]
    if (!feature?.properties) return
    const station = store.stations.find(s => s.id === feature.properties!.id)
    if (station) store.selectStation(station)
  })

  let rafId: number | null = null
  map.on('mousemove', e => {
    if (rafId !== null) return
    rafId = requestAnimationFrame(() => {
      rafId = null
      const features = map.queryRenderedFeatures(e.point, { layers: ['station-icons'] })
      map.getCanvas().style.cursor = features.length > 0 ? 'pointer' : ''
    })
  })

  // 7. APPLIQUER L'ÉTAT COURANT DU STORE
  applyIsochroneData(map)
  applyIntervalVisibility(map)
  applyDimming(map)
  applySelectedLabel(map)
}

// Init map(MapLibre)

onMounted(() => {
  if (!mapContainer.value || mapRef.value) return
  const map = new maplibregl.Map({
    container: mapContainer.value,
    style: MAP_CONFIG.style,
    center: MAP_CONFIG.center,
    zoom: MAP_CONFIG.zoom,
    minZoom: 9,
    maxZoom: 17,
    pitch: 0,
    bearing: 0,
  })
  map.addControl(new maplibregl.NavigationControl(), 'top-right')
  mapRef.value = map

  if (map.isStyleLoaded()) {
    setupLayers(map)
  } else {
    map.once('load', () => setupLayers(map))
  }
})

onBeforeUnmount(() => {
  mapRef.value?.remove()
  mapRef.value = null
})

// 2. WATCH SELECTED STATION → LOAD ISOCHRONE

watch(() => store.selectedStation, async (station) => {
  const map = mapRef.value
  if (!map) return

  // Marker pulse
  markerRef.value?.remove()
  markerRef.value = null

  applySelectedLabel(map)

  if (!station) {
    store.setIsochrones(null)
    applyIsochroneData(map)
    applyDimming(map)
    return
  }

  // FlyTo
  map.flyTo({ center: [station.position.lng, station.position.lat], zoom: 12, duration: 800 })

  // Marker
  const el = createPulseMarker(station)
  markerRef.value = new maplibregl.Marker({ element: el, anchor: 'center' })
      .setLngLat([station.position.lng, station.position.lat])
      .addTo(map)

  // Load isochrone
  let stale = false
  store.setIsochronesLoading(true)

  const attempt = async (retries: number): Promise<void> => {
    const data = await loadIsochrone(station.id)
    if (stale) return
    if (data) {
      store.setIsochrones(data)
      applyIsochroneData(map)
      applyDimming(map)
    } else if (retries > 0) {
      await new Promise(r => setTimeout(r, 500))
      if (!stale) await attempt(retries - 1)
    } else {
      store.setIsochrones(null)
      applyIsochroneData(map)
      applyDimming(map)
    }
  }
  await attempt(2)
  return () => { stale = true }
})

// ─────────────────────────────────────────────
// 3. WATCH ISOCHRONE → UPDATE MAP
// ─────────────────────────────────────────────
watch(() => store.isochrones, () => {
  if (!mapRef.value) return
  applyIsochroneData(mapRef.value)
  applyDimming(mapRef.value)
})

watch(() => store.intervals, () => {
  if (mapRef.value) applyIntervalVisibility(mapRef.value)
})

watch(() => store.enabledLines, () => {
  const map = mapRef.value
  if (!map || !map.getLayer('station-icons')) return
  const lineArr = store.enabledLines
  const stationFilter: maplibregl.FilterSpecification = [
    'any',
    ...lineArr.map(line => ['in', line, ['get', 'lines']] as maplibregl.ExpressionSpecification)
  ]
  map.setFilter('station-icons', stationFilter)
  map.setFilter('station-labels', stationFilter)
  if (map.getLayer('subway-lines-casing')) {
    const lineFilter: maplibregl.FilterSpecification = ['in', ['get', 'lineId'], ['literal', lineArr]]
    map.setFilter('subway-lines-casing', lineFilter)
    map.setFilter('subway-lines-inner', lineFilter)
  }
})

const style = document.createElement('style');
style.textContent = `
  @keyframes pulse-ring {
    0% { transform: scale(0.5); opacity: 0.8; }
    80%, 100% { transform: scale(2); opacity: 0; }
  }

  @keyframes pulse-pill {
    0% { transform: scale(0.95); opacity: 0.7; }
    50%, 100% { transform: scale(1); opacity: 1; }
  }

  .station-pulse-marker {
    cursor: pointer;
  }
`;
document.head.appendChild(style);

</script>

<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-container" />

    <div v-if="store.selectedStation" class="station-chip">
      <div class="station-chip-names">
        <span class="station-chip-ru">{{ store.selectedStation.nameLocal }}</span>
        <span v-if="store.selectedStation.name !== store.selectedStation.nameLocal" class="station-chip-en">
          {{ store.selectedStation.name }}
        </span>
      </div>
      <div class="station-chip-lines">
        <span
            v-for="badge in getStationLineBadges(store.selectedStation.id)"
            :key="badge.id"
            class="line-badge"
            :style="{ backgroundColor: badge.color }"
        >
          {{ badge.name }}
        </span>
      </div>
      <div v-if="store.isochronesLoading" class="chip-spinner" />
      <button class="station-chip-close" @click="store.selectStation(null)" aria-label="Close">✕</button>
    </div>

    <div class="map-legend">
      <div class="map-legend-title">Зоны доступности</div>
      <div v-for="(min, i) in [...ISOCHRONE_INTERVALS].reverse()" :key="min" class="legend-row">
        <span class="legend-swatch" :style="{ background: ISOCHRONE_COLORS[ISOCHRONE_INTERVALS.length - 1 - i], border: `1.5px solid ${ISOCHRONE_STROKES[ISOCHRONE_INTERVALS.length - 1 - i]}` }" />
        <span>≤ {{ min }} min</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.map-wrapper {
  flex: 1;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #000000;
}

.map-container {
  width: 100%;
  height: 100%;
  background-color: #000000;
}

.station-chip {
  position: absolute;
  top: max(16px, env(safe-area-inset-top));
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: #1a1a2e;
  border: 1px solid #FFD700;
  border-radius: 10px;
  padding: 8px 10px 8px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
  animation: chip-enter 0.2s ease;
  white-space: nowrap;
}

.station-chip-lines {
  display: flex;
  gap: 3px;
}

.station-chip-names {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.station-chip-local {
  font-family: var(--font-serif);
  font-size: 17px;
  font-weight: normal;
  color: #ffffff;
}

.station-chip-ru {
  font-family: var(--font-serif);
  font-size: 17px;
  font-weight: normal;
  color: var(--text-primary);
}

.station-chip-en {
  font-size: 12px;
  color: #888888;
}

.station-chip-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
  color: #888888;
  padding: 10px 8px;
  line-height: 1;
  margin-left: -6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.station-chip-close:hover {
  color: var(--text-muted);
}

.chip-spinner {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--border);
  border-top-color: var(--text-muted);
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

.station-chip-close:hover {
  color: #ffffff;
}

.map-legend {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid #333;
  z-index: 10;
}

.map-legend-title {
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.legend-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  color: #ffffff;
  font-size: 11px;
}

.legend-swatch {
  width: 20px;
  height: 20px;
  border-radius: 3px;
}

@keyframes chip-enter {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
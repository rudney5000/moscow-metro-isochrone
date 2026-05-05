<script setup lang="ts">
import maplibregl from "maplibre-gl";
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useMapStore} from "@/entities/station/model/store.ts";
import {MAP_CONFIG} from "@/shared/config/map.ts";
import { loadIsochrone } from "@/shared/api/isochrone/isochroneLoader.ts";

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

const mapContainer = ref<HTMLDivElement | null>(null)
const mapRef = ref<maplibregl.Map | null>(null)
const markerRef = ref<maplibregl.Marker | null>(null)

const store = useMapStore()

// init map(MapLibre)
onMounted(() => {
  if(mapRef.value) return
  if (!mapContainer.value) return

  mapRef.value = new maplibregl.Map({
    container: mapContainer.value,
    style: MAP_CONFIG.style,
    center: MAP_CONFIG.center,
    zoom: MAP_CONFIG.zoom,
    pitch: 0,
    bearing: 0
  });

  mapRef.value.on('load', () => {
    mapRef.value?.setProjection({ type: 'mercator' })
  })

  mapRef.value.addControl(new maplibregl.NavigationControl());
});

onBeforeUnmount(() => {
  mapRef.value?.remove();
  mapRef.value = null
})

// 2. WATCH SELECTED STATION → LOAD ISOCHRONE
watch(
    () => store.selectedStation,
    async (station) => {
      if(!station) {
        store.setIsochrones(null)
        return
      }

      let stale = false
      store.setIsochronesLoading(true)

      const attempt = async (retries: number): Promise<void> => {
        const data = await loadIsochrone(station.id);
        if(stale) return;

        if(data) {
          store.setIsochrones(data)
        } else if(retries > 0) {
          await new Promise(r => setTimeout(r, 500))
          if(!stale) await attempt(retries - 1)
        } else {
          store.setIsochrones(null)
        }
      }

      await attempt(2)

      return () => {
        stale = true
      }}

    //   if(mapRef.value.getSource("iso")) {
    //     mapRef.value.removeLayer("iso-layer");
    //     mapRef.value.removeSource("iso");
    //   }
    //
    //   const geojson = await loadIsochrone(station.id);
    //
    //   mapRef.value.addSource("iso", {
    //     type: "geojson",
    //     data: geojson
    //   })
    //
    //   mapRef.value.addLayer({
    //     id: "iso-layer",
    //     type: "fill",
    //     source: "iso",
    //     paint: {
    //       "fill-color": "#3b82f6",
    //       "fill-opacity": 0.3
    //     }
    //   })
    // }
    )

</script>

<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-container">
      <div v-if="store.selectedStation" class="station-chip">
        <span> {{ store.selectedStation.name }} </span>
        <button @click="store.selectStation(null)">X</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-wrapper {
  flex: 1;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.map-container {
  width: 100%;
  height: 100%;
}

.station-chip {
  position: absolute;
  top: max(16px, env(safe-area-inset-top));
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: var(--bg-sidebar);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px 10px 8px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: var(--shadow-md);
  animation: chip-enter 0.2s ease;
  white-space: nowrap;
}
</style>
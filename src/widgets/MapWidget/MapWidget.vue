<script setup lang="ts">
import maplibregl from "maplibre-gl";
import {onBeforeMount, onMounted, ref} from "vue";
import {useMapStore} from "@/entities/station/model/store.ts";

// role global de ce component

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

const MOSCOW_CENTER: [number, number] = [37.6173, 55.7558]
const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY
const store = useMapStore()

// init map(MapLibre)
onMounted(() => {
  if(!mapContainer.value) return

  mapRef.value = new maplibregl.Map({
    container: mapContainer.value,
    style: `https://api.maptiler.com/maps/dataviz/style.json?key=${MAPTILER_KEY}`,
    center: MOSCOW_CENTER,
    zoom: 12.5
  });

  mapRef.value.addControl(new maplibregl.NavigationControl());
});

onBeforeMount(() => {
  mapRef.value?.remove();
})

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
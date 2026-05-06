<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import MapWidget from "@/widgets/MapWidget/MapWidget.vue";
import Sidebar from '@/widgets/sidebar/Sidebar.vue'
import StatsPanel from '@/widgets/stats-panel/StatsPanel.vue'
import { useMapStore } from '@/entities/station/model/store.ts'
import { stationsRaw } from '@/shared/data/stations.ts'
import type {Station} from "@/entities/station/model/types.ts";

const PATCHED_STATIONS: Station[] = stationsRaw

// Read once at module load — before any renders or effects
const INITIAL_URL_STATION_ID = new URLSearchParams(window.location.search).get('s')

const store = useMapStore()
const sidebarOpen = computed(() => store.sidebarOpen)

// Starts false when there is a station ID in the URL (restore must happen first)
const urlRestored = ref(!INITIAL_URL_STATION_ID)

onMounted(() => {
  store.setStations(PATCHED_STATIONS)
})

// Restore selected station from URL (or default to City Hall), then mark restore as done
watch(
    () => store.stations,
    (stations) => {
      if (stations.length === 0) return
      const targetId = INITIAL_URL_STATION_ID ?? '1797562528'
      const station = stations.find((s) => s.id === targetId)
      if (station) store.selectStation(station)
      urlRestored.value = true
    },
    { once: true }
)

// Sync selected station to URL — only after initial restore is settled
watch(
    [() => store.selectedStation, urlRestored],
    ([selectedStation, restored]) => {
      if (!restored) return
      const params = new URLSearchParams(window.location.search)
      if (selectedStation) {
        params.set('s', selectedStation.id)
      } else {
        params.delete('s')
      }
      const qs = params.toString()
      window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
    }
)
</script>

<template>
  <div class="metro-page">
    <div :class="['app', { 'sidebar-open': sidebarOpen }]">
      <Sidebar/>
      <MapWidget/>
      <StatsPanel/>
    </div>
  </div>
</template>

<style scoped>

</style>
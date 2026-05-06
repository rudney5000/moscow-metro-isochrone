<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import Fuse from 'fuse.js'
import { useMapStore } from '@/entities/station/model/store.ts'
// import { stationsRaw } from '@/shared/data/stations.ts'
import { lines } from '@/shared/data/lines.ts'
import type { LineId, Station } from '@/entities/station/model/types'

// Derived lookup maps from the lines data
const LINE_COLORS = Object.fromEntries(lines.map((l) => [l.id, l.color])) as Record<LineId, string>
const LINE_NAMES  = Object.fromEntries(lines.map((l) => [l.id, l.name]))  as Record<LineId, string>

// Isochrone visual config (adjust colours to your palette)
const ISOCHRONE_INTERVALS = [15, 30, 60] as const
const ISOCHRONE_STROKES   = ['#4ade80', '#facc15', '#f87171']
const ISOCHRONE_COLORS    = ['rgba(74,222,128,0.15)', 'rgba(250,204,21,0.15)', 'rgba(248,113,113,0.15)']

const store = useMapStore()

const stations        = computed(() => store.stations)
const selectedStation = computed(() => store.selectedStation)
const intervals       = computed(() => store.intervals)
const enabledLines    = computed(() => {
  const v = store.enabledLines
  if (v instanceof Set) return v
  if (Array.isArray(v)) return new Set(v)
  return new Set(Object.keys(v ?? {}))
})
const isochronesLoading = computed(() => store.isochronesLoading)
const sidebarOpen     = computed(() => store.sidebarOpen)
const statsPanelOpen  = computed(() => store.statsPanelOpen)

const query       = ref('')
const activeIndex = ref(-1)
const aboutOpen   = ref(false)
const inputRef    = ref<HTMLInputElement | null>(null)
const listRef     = ref<HTMLUListElement | null>(null)

watch(activeIndex, async (idx) => {
  if (idx < 0 || !listRef.value) return
  await nextTick()
  const item = listRef.value.children[idx] as HTMLElement | undefined
  item?.scrollIntoView({ block: 'nearest' })
})

const fuse = computed(
    () =>
        new Fuse(stations.value, {
          keys: ['name', 'nameLocal'],
          threshold: 0.3,
        })
)

const results = computed<Station[]>(() => {
  if (!query.value.trim()) return []
  return fuse.value.search(query.value).slice(0, 8).map((r) => r.item)
})

function handleSelectStation(station: Station) {
  store.selectStation(station)
  query.value = ''
  activeIndex.value = -1
}

function handleSearchKeyDown(e: KeyboardEvent) {
  if (results.value.length === 0) return
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  } else if (e.key === 'Enter') {
    const target = activeIndex.value >= 0 ? results.value[activeIndex.value] : results.value[0]
    if (target) handleSelectStation(target)
  } else if (e.key === 'Escape') {
    query.value = ''
    activeIndex.value = -1
    inputRef.value?.blur()
  }
}

function toggleInterval(interval: number) {
  if (intervals.value.includes(interval)) {
    store.setIntervals(intervals.value.filter((i) => i !== interval))
  } else {
    store.setIntervals([...intervals.value, interval].sort((a, b) => a - b))
  }
}

const lineIds = computed(() => lines.map((l) => l.id as LineId))</script>

<template>
  <button
      class="sidebar-toggle"
      :style="{ left: sidebarOpen ? '332px' : '12px' }"
      :aria-label="sidebarOpen ? 'Close sidebar' : 'Open sidebar'"
      :aria-expanded="sidebarOpen"
      @click="store.toggleSidebar"
  >
    {{ sidebarOpen ? '‹' : '›' }}
  </button>

  <div :class="['sidebar', sidebarOpen ? 'open' : 'closed']">
    <!-- Masthead -->
    <div class="sidebar-masthead" @click="store.toggleSidebar">
      <h1 class="sidebar-title">Москва<br />Изохроны</h1>
      <div class="sidebar-subtitle">Московское метро</div>
      <div class="sidebar-meta">Вне пик · Будни · 14:00 МСК</div>
    </div>

    <!-- Search -->
    <div class="search-section">
      <input
          ref="inputRef"
          v-model="query"
          type="text"
          class="search-input"
          placeholder="Search station..."
          role="combobox"
          aria-autocomplete="list"
          :aria-expanded="results.length > 0"
          aria-controls="search-results-list"
          :aria-activedescendant="activeIndex >= 0 ? `search-result-${activeIndex}` : undefined"
          @input="activeIndex = -1"
          @keydown="handleSearchKeyDown"
      />
      <ul
          v-if="results.length > 0"
          ref="listRef"
          class="search-results"
          role="listbox"
          id="search-results-list"
      >
        <li
            v-for="(s, idx) in results"
            :key="s.id"
            :id="`search-result-${idx}`"
            role="option"
            :aria-selected="idx === activeIndex"
            :class="{ active: idx === activeIndex }"
            @click="handleSelectStation(s)"
            @mouseenter="activeIndex = idx"
        >
          <span class="result-name">{{ s.nameLocal }}</span>
          <span v-if="s.name !== s.nameLocal" class="result-en">{{ s.name }}</span>
          <span class="result-lines">
            <span
                v-for="l in s.lines"
                :key="l"
                class="line-badge"
                :style="{ backgroundColor: LINE_COLORS[l] }"
            >{{ LINE_NAMES[l] }}</span>
          </span>
        </li>
      </ul>
    </div>

    <!-- Selected station -->
    <div v-if="selectedStation" class="selected-station">
      <div class="selected-header">
        <h2>{{ selectedStation.nameLocal }}</h2>
        <span v-if="selectedStation.name !== selectedStation.nameLocal" class="selected-en">
          {{ selectedStation.name }}
        </span>
        <button class="deselect" aria-label="Deselect station" @click="store.selectStation(null)">
          &times;
        </button>
      </div>
      <div class="selected-lines">
        <span
            v-for="l in selectedStation.lines"
            :key="l"
            class="line-badge"
            :style="{ backgroundColor: LINE_COLORS[l] }"
        >{{ LINE_NAMES[l] }}</span>
      </div>
      <div v-if="isochronesLoading" class="loading" role="status" aria-live="polite">Loading…</div>
    </div>

    <!-- Travel Time Intervals -->
    <div class="section">
      <h3>Travel Time</h3>
      <div class="interval-pills">
        <button
            v-for="(min, i) in ISOCHRONE_INTERVALS"
            :key="min"
            :class="['interval-pill', { active: intervals.includes(min) }]"
            :style="{
            borderTopColor: ISOCHRONE_STROKES[i],
            ...(intervals.includes(min)
              ? { background: ISOCHRONE_COLORS[i], borderColor: ISOCHRONE_STROKES[i], color: 'var(--text-primary)' }
              : {}),
          }"
            @click="toggleInterval(min)"
        >
          {{ min }}m
        </button>
      </div>
      <div class="section-note">Subway + walking time from station</div>
    </div>

    <!-- Line Filter -->
    <div class="section">
      <h3>Lines</h3>
      <div class="line-filters">
        <label v-for="id in lineIds" :key="id" class="line-filter">
          <input type="checkbox" :checked="enabledLines.has(id)" @change="store.toggleLine(id)" />
          <span class="line-dot" :style="{ backgroundColor: LINE_COLORS[id] }" />
          {{ LINE_NAMES[id] }}
        </label>
      </div>
    </div>

    <!-- About -->
    <div class="about-section">
      <button class="about-toggle" :aria-expanded="aboutOpen" @click="aboutOpen = !aboutOpen">
        <span>About this project</span>
        <span class="about-chevron">{{ aboutOpen ? '−' : '+' }}</span>
      </button>
      <div v-if="aboutOpen" class="about-body">
        <p>
          Isochrone maps showing travel reach from any Seoul Metro station
          by subway and walking. Select a station to see how far you can
          get in 15, 30, or 60 minutes.
        </p>
        <p>
          Routes computed with GraphHopper using GTFS schedules and
          OpenStreetMap data. All times reflect off-peak conditions
          (weekday, 14:00 KST).
        </p>
        <p class="about-sources">Data: Seoul Metro GTFS · OpenStreetMap · MapTiler</p>
      </div>
    </div>

    <p class="about-credit">
      Matas Speičys · {{ new Date().getFullYear() }} ·
      <a href="https://github.com/matassp/seoul-isochrone" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    </p>

    <!-- Data panel toggle -->
    <button
        :class="['data-panel-btn', { active: statsPanelOpen }]"
        @click="store.toggleStatsPanel"
    >
      Data &amp; Analysis {{ statsPanelOpen ? '‹' : '›' }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
/* ── Sidebar ── */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 320px;
  height: 100%;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  overflow-y: auto;
  padding: 24px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: transform 0.25s ease;
  z-index: 5;
  transform: translateX(0);

  &.closed {
    transform: translateX(-320px);
  }
}

.sidebar-toggle {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: var(--bg-sidebar);
  border: 1px solid var(--border);
  border-radius: 0 4px 4px 0;
  padding: 8px 6px;
  cursor: pointer;
  font-size: 18px;
  color: var(--text-muted);
  transition: left 0.25s ease, color 0.12s;

  &:hover {
    color: var(--text-primary);
  }
}

.sidebar-masthead {
  border-top: 2.5px solid var(--text-primary);
  border-bottom: 1px solid var(--border);
  padding: 14px 0 13px;
  margin-bottom: 4px;
  position: relative;
  cursor: pointer;
}

.sidebar-title {
  font-family: var(--font-serif);
  font-size: 34px;
  font-weight: normal;
  letter-spacing: -0.5px;
  color: var(--text-primary);
  line-height: 1.05;
}

.sidebar-subtitle {
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.8px;
  margin-top: 5px;
  text-transform: uppercase;
}

.sidebar-meta {
  font-size: 10px;
  color: var(--text-faint);
  letter-spacing: 0.4px;
  margin-top: 2px;
}

/* ── Search ── */
.search-section {
  position: relative;
  margin-top: 20px;
}

.search-input {
  width: 100%;
  padding: 8px 0;
  border: none;
  border-bottom: 1.5px solid var(--border-input);
  border-radius: 0;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
  background: transparent;
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-faint);
  }

  &:focus {
    border-bottom-color: var(--text-primary);
  }
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-sidebar);
  border: 1px solid var(--border-input);
  border-top: none;
  border-radius: 0;
  list-style: none;
  max-height: 300px;
  overflow-y: auto;
  z-index: 20;
  box-shadow: var(--shadow-md);
  margin: 0;
  padding: 0;

  li {
    padding: 8px 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-bottom: 1px solid var(--border-subtle);

    &:hover,
    &.active {
      background: var(--bg-hover);
    }
  }
}

.result-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
}

.result-en {
  font-size: 12px;
  color: var(--text-muted);
}

.result-lines {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 2px;
}

/* ── Line badge ── */
.line-badge {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
}

/* ── Selected station ── */
.selected-station {
  background: var(--bg-section);
  border: 1px solid var(--border);
  border-left: 3px solid var(--text-primary);
  border-radius: 3px;
  padding: 14px 12px;
  margin-top: 20px;
}

.selected-header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  position: relative;

  h2 {
    font-family: var(--font-serif);
    font-size: 22px;
    font-weight: normal;
    color: var(--text-primary);
    line-height: 1.12;
  }
}

.selected-en {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.2px;
}

.deselect {
  position: absolute;
  right: -4px;
  top: -4px;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: var(--text-deselect);
  padding: 8px;
  border-radius: 3px;
  transition: color 0.12s, background 0.12s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--text-secondary);
    background: var(--bg-hover);
  }
}

.selected-lines {
  display: flex;
  gap: 4px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.loading {
  margin-top: 8px;
  font-size: 11px;
  color: var(--text-faint);
  letter-spacing: 0.3px;
}

/* ── Sections ── */
.section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 22px;

  h3 {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 7px;
    margin: 0;

    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }
  }
}

.section-note {
  font-size: 11px;
  color: var(--text-faint);
  letter-spacing: 0.2px;
}

/* ── Interval pills ── */
.interval-pills {
  display: flex;
  gap: 0;
}

.interval-pill {
  flex: 1;
  padding: 7px 4px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid var(--border-input);
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  color: var(--text-muted);
  transition: background 0.12s, color 0.12s, border-color 0.12s;
  text-align: center;
  letter-spacing: 0.3px;
  position: relative;

  & + & {
    border-left: none;
  }

  &:first-child {
    border-radius: 2px 0 0 2px;
  }

  &:last-child {
    border-radius: 0 2px 2px 0;
  }

  &:hover:not(.active) {
    background: var(--bg-hover);
    color: var(--text-secondary);
  }

  &.active {
    z-index: 1;
  }
}

/* ── Line filter ── */
.line-filters {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.line-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 5px 6px;
  border-radius: 2px;
  transition: background 0.12s;
  letter-spacing: 0.1px;
  touch-action: pan-y;

  &:hover {
    background: var(--bg-hover);
  }

  input[type='checkbox'] {
    accent-color: var(--text-primary);
    cursor: pointer;
  }
}

.line-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ── About ── */
.about-section {
  margin-top: 22px;
}

.about-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  padding: 6px 0;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--text-muted);
  cursor: pointer;
  border-top: 1px solid var(--border);
  margin-top: 4px;

  &:hover {
    color: var(--text-secondary);
  }
}

.about-chevron {
  font-size: 14px;
}

.about-body {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.55;
  padding: 10px 0 4px;

  p {
    margin: 0 0 8px;
  }
}

.about-sources {
  color: var(--text-faint);
  font-size: 11px;
}

.about-credit {
  font-size: 11px;
  color: var(--text-faint);
  margin-top: 16px;
  letter-spacing: 0.2px;

  a {
    color: var(--text-muted);
    text-decoration: underline;

    &:hover {
      color: var(--text-primary);
    }
  }
}

/* ── Data panel button ── */
.data-panel-btn {
  margin-top: 16px;
  width: 100%;
  padding: 8px 12px;
  background: none;
  border: 1.5px solid var(--border-input);
  border-radius: 3px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  cursor: pointer;
  text-align: left;
  transition: all 0.12s;
  flex-shrink: 0;

  &:hover {
    color: var(--text-primary);
    border-color: var(--text-muted);
    background: var(--bg-hover);
  }

  &.active {
    color: var(--bg-sidebar);
    background: var(--text-primary);
    border-color: var(--text-primary);
  }
}
</style>
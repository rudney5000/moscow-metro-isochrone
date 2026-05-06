<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useMapStore } from '@/entities/station/model/store.ts'
import { LINE_COLORS } from '@/shared/const/consts.ts'
import type { LineId } from '@/entities/station/model/types.ts'

type RankingEntry = {
  rank: number
  id: string
  nameLocal: string
  name: string
  lines: string[]
  area15: number
  area30: number
  area60: number
}

const store = useMapStore()
const rankings = ref<RankingEntry[]>([])

watch(
    () => store.statsPanelOpen,
    (open) => {
      if (!open || rankings.value.length > 0) return
      fetch(`${import.meta.env.BASE_URL}data/rankings.json`)
          .then((r) => r.json())
          .then((data) => (rankings.value = data))
          .catch(() => {})
    },
    { immediate: true }
)

const top15 = computed(() => rankings.value.slice(0, 15))

function selectRow(id: string) {
  const s = store.stations.find((st) => st.id === id)
  if (s) store.selectStation(s)
}
</script>

<template>
  <div :class="['stats-panel', store.statsPanelOpen ? 'open' : 'closed']">
    <!-- Masthead -->
    <div class="stats-masthead">
      <div class="stats-masthead-inner">
        <h2 class="stats-title">Data</h2>
        <button class="stats-close" aria-label="Close" @click="store.toggleStatsPanel">✕</button>
      </div>
      <div class="stats-subtitle">Accessibility Analysis</div>
    </div>

    <!-- Table 1 — Accessibility Ranking -->
    <div class="stats-section">
      <h3>Table 1 — Accessibility Ranking</h3>

      <div v-if="top15.length === 0" class="loading">Loading…</div>

      <template v-else>
        <table class="stats-table">
          <thead>
          <tr>
            <th>#</th>
            <th>Station</th>
            <th title="Reachable area in km² within 15 min">15′ km²</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="r in top15"
              :key="r.id"
              :class="['ranking-row', { active: store.selectedStation?.id === r.id }]"
              role="button"
              :tabindex="0"
              :aria-label="`Select ${r.name} station`"
              @click="selectRow(r.id)"
              @keydown.enter.prevent="selectRow(r.id)"
              @keydown.space.prevent="selectRow(r.id)"
          >
            <td class="ranking-rank">{{ r.rank }}</td>
            <td>
              <div class="ranking-name">
                <span class="ranking-ko">{{ r.nameLocal }}</span>
                <span v-if="r.name !== r.nameLocal" class="ranking-en">{{ r.name }}</span>
                <span class="ranking-lines">
                    <span
                        v-for="l in r.lines"
                        :key="l"
                        class="line-dot"
                        :style="{ backgroundColor: LINE_COLORS[l as LineId] }"
                    />
                  </span>
              </div>
            </td>
            <td class="ranking-area">{{ r.area15 }}</td>
          </tr>
          </tbody>
        </table>
        <div class="section-note" style="margin-top: 8px">
          Area in km² · ranked by 15 min · off-peak
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats-panel {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 400px;
  height: 100%;
  background: var(--bg-sidebar);
  border-left: 1px solid var(--border);
  overflow-y: auto;
  padding: 24px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: transform 0.25s ease;
  z-index: 5;
  transform: translateX(100%);

  &.open {
    transform: translateX(0);
  }

  &.closed {
    transform: translateX(100%);
  }
}

.stats-masthead {
  border-top: 2.5px solid var(--text-primary);
  border-bottom: 1px solid var(--border);
  padding: 14px 0 13px;
  margin-bottom: 4px;
}

.stats-masthead-inner {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.stats-title {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: normal;
  color: var(--text-primary);
  line-height: 1.05;
  margin: 0;
}

.stats-subtitle {
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.8px;
  margin-top: 5px;
  text-transform: uppercase;
}

.stats-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-deselect);
  padding: 8px;
  border-radius: 3px;
  transition: color 0.12s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--text-secondary);
  }
}

.stats-section {
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
    margin: 0 0 10px;

    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }
  }
}

.loading {
  font-size: 11px;
  color: var(--text-faint);
  letter-spacing: 0.3px;
}

/* ── Stats table ── */
.stats-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;

  thead tr {
    border-bottom: 1.5px solid var(--text-primary);
  }

  th {
    text-align: left;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-muted);
    padding: 0 6px 5px 0;

    &:last-child {
      text-align: right;
    }
  }
}

.ranking-row {
  border-bottom: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: background 0.1s;

  &:hover {
    background: var(--bg-hover);
  }

  &.active {
    background: var(--bg-section);
  }

  td {
    padding: 5px 6px 5px 0;
    vertical-align: middle;
  }
}

.ranking-rank {
  color: var(--text-faint);
  font-variant-numeric: tabular-nums;
  width: 24px;
  font-size: 10px;
}

.ranking-name {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.ranking-ko {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 12px;
}

.ranking-en {
  font-size: 10px;
  color: var(--text-muted);
}

.ranking-lines {
  display: flex;
  gap: 3px;
  margin-top: 2px;
}

.ranking-area {
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: var(--text-secondary);
  white-space: nowrap;
  font-size: 11px;
}

.line-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
  display: inline-block;
}

.section-note {
  font-size: 11px;
  color: var(--text-faint);
  letter-spacing: 0.2px;
}
</style>
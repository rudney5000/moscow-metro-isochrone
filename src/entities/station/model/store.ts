import {defineStore} from "pinia";
import { stationsRaw as staticStations} from '@/shared/data/stations.ts'
import { lines as staticLines} from '@/shared/data/lines.ts'
import type {IsochroneFeature, LineId, MetroLine, Station} from "@/entities/station/model/types.ts";

export const useMapStore = defineStore('map', {
    state: () => ({
        stations: [] as Station[],
        lines: [] as MetroLine[],

        selectedStation: null as Station | null,
        enabledLines: [] as LineId[],

        intervals: [15, 30, 60],
        isochrones: null as IsochroneFeature | null,
        isochronesLoading: false,

        sidebarOpen: true,
        statsPanelOpen: false
    }),

    getters: {
        enabledLineSet: (state) => new Set(state.enabledLines),
    },
    actions: {

        initStore() {
            this.stations = staticStations
            this.lines = staticLines
            this.enabledLines = staticLines.map(l => l.id as LineId)
        },

        setLines(lines: MetroLine[]) {
            this.lines = lines
        },

        setStations(stations: Station[]) {
          this.stations = stations
        },

        selectStation(station: Station | null) {
            this.selectedStation = station ? { ...station } : null;
            this.isochrones = null
        },

        setIntervals(intervals: number[]) {
            this.intervals = intervals
        },

        toggleLine(line: LineId) {
          if(this.enabledLines.includes(line)) {
              this.enabledLines = this.enabledLines.filter(l => l !== line)
          } else {
              this.enabledLines.push(line)
          }
        },

        setIsochrones(iso: IsochroneFeature | null) {
            this.isochrones = iso;
            this.isochronesLoading = false
        },

        setIsochronesLoading(loading: boolean){
            this.isochronesLoading = loading
        },

        toggleSidebar(){
            this.sidebarOpen = !this.sidebarOpen
        },

        toggleStatsPanel() {
            this.statsPanelOpen = !this.statsPanelOpen
        }
    }
})
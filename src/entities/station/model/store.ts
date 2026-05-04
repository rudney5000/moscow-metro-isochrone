import {defineStore} from "pinia";
import type {IsochroneFeature, LineId, MetroLine, Station} from "@/entities/station/model/types.ts";

export const useMapStore = defineStore('map', {
    state: () => ({
        stations: [] as Station[],
        lines: [] as MetroLine[],

        selectedStation: null as Station | null,
        enabledLines: [] as LineId[],

        intervals: [15, 30, 60],
        isochrones: null as IsochroneFeature | null,
        isochronesLoadingL: false
    }),

    getters: {
        enabledLineSet: (state) => new Set(state.enabledLines),

        selectedStation: (state) => state.stations.find(s => s.id === state.selectedStationId)
    },
    actions: {
        setStations(stations: Station[]) {
          this.stations = stations
        },
        selectStation(station: Station | null) {
            this.selectedStation = station ? { ...station } : null;
            this.isochrones = null
        }
    }
})
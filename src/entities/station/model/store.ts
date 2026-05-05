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
        isochronesLoading: false
    }),

    getters: {
        enabledLineSet: (state) => new Set(state.enabledLines),
    },
    actions: {
        setStations(stations: Station[]) {
          this.stations = stations
        },
        selectStation(station: Station | null) {
            this.selectedStation = station ? { ...station } : null;
            this.isochrones = null
        },
        setIsochrones(iso: IsochroneFeature | null) {
            this.isochrones = iso;
            this.isochronesLoading = false
        },
        setIsochronesLoading(loading: boolean){
            this.isochronesLoading = loading
        }
    }
})
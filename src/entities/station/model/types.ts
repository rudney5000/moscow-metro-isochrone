import type {GeoJSON} from "geojson";

export interface Position {
    lat: number
    lng: number
}

export interface Station {
    id: string
    name: string
    nameRu: string
    lineId: LineId[]
    position: Position
    transferIds: string[]
    isCrossPlatform?: boolean
}

export interface MetroLine {
    id: string
    name: string
    color: string
    type: LineType
}

export interface IsochroneFeature {
    stationId: string
    interval: 15 | 30 | 60
    geojson: GeoJSON.FeatureCollection
}

export type LineId =
    | "1" | "2" | "3" | "4" | "5" | "6"
    | "7" | "8" | "9" | "10" | "11"
    | "12" | "13" | "14" | "15"

export type LineType = "radial" | "circle" | "transfer"
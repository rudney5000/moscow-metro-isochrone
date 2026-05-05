import type {GeoJSON} from "geojson";

export interface Position {
    lat: number
    lng: number
}

export interface Station {
    id: string
    name: string
    nameLocal: string
    position: Position
}

export interface MetroLine {
    id: string
    name: string
    color: string
    type: LineType
    stations: string[]
}

export interface Edge {
    from: string
    to: string
    time: number
    type: "ride" | "transfer"
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

export type RankingRow = {
    rank?: number;
    id: string;
    nameLocal: string;
    area15: number;
    area30: number;
    area60: number;
};
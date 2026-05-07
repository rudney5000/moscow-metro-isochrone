import type {GeoJSON} from "geojson";

const cache = new Map<string, GeoJSON.FeatureCollection>()
const MAX_CACHE = 50

function evictOldest(){
    if(cache.size >= MAX_CACHE) {
        const firstKey = cache.keys().next().value
        if(firstKey) cache.delete(firstKey)
    }
}

export async function loadIsochrone(stationId: string): Promise<GeoJSON.FeatureCollection | null>{
    if(cache.has(stationId)) {
        return cache.get(stationId)!
    }

    try {
        const url = `${import.meta.env.BASE_URL}data/isochrones/${stationId}.geojson`;
        const res = await fetch(url);
        if(!res.ok) return null
        const data: GeoJSON.FeatureCollection = await res.json()
        evictOldest()
        cache.set(stationId, data)
        return data
    } catch {
        return null
    }
}
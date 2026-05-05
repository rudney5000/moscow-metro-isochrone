import type {IsochroneFeature} from "@/entities/station/model/types.ts";

const cache = new Map<string, IsochroneFeature>()
const MAX_CACHE = 50

function evictOldest(){
    if(cache.size >= MAX_CACHE) {
        const firstKey = cache.keys().next().value
        if(firstKey) cache.delete(firstKey)
    }
}

export async function loadIsochrone(stationId: string): Promise<IsochroneFeature | null>{
    if(cache.has(stationId)) {
        return cache.get(stationId)!
    }

    try {
        const url = `${import.meta.env.BASE_URL}data/isochrones/${stationId}.geojson`;
        const res = await fetch(url);
        if(!res.ok) return null
        const data: IsochroneFeature = await res.json()
        evictOldest()
        cache.set(stationId, data)
        return data
    } catch {
        return null
    }
}
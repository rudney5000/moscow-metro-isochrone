import type {LineId} from "@/entities/station/model/types.ts";
import {lines} from "@/shared/data/lines.ts";

export function getStationLineBadges(stationId: string): { id: LineId; name: string; color: string }[] {
    const baseId = stationId.replace(/_\d+$/, '') // "belorusskaya_5" → "belorusskaya"

    return lines
        .filter(l => l.stations.some(sid => {
            const base = sid.replace(/_\d+$/, '')
            return sid === stationId || base === stationId || sid === baseId || base === baseId
        }))
        .map(l => ({
            id: l.id as LineId,
            name: l.name,
            color: l.color,
        }))
}

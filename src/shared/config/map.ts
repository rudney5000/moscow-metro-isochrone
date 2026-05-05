const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY
export const MAP_CONFIG = {
    center: [37.6173, 55.7558] as [number, number],
    zoom: 11,
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
}
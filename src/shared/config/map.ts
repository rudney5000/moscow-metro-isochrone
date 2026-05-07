const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY

export const MAP_STYLES = {
    streets: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
    datavizDark: `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${MAPTILER_KEY}`,
    datavizLight: `https://api.maptiler.com/maps/dataviz-light/style.json?key=${MAPTILER_KEY}`,
}

export const MAP_CONFIG = {
    center: [37.6173, 55.7558] as [number, number],
    zoom: 11,
        style: MAP_STYLES.datavizDark,
}
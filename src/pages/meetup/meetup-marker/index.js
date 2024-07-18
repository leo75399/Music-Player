import L from 'leaflet'
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'
import 'leaflet-extra-markers'

// NOTE CreateFormMap use
// 封面照位置
export const byPhoto = L.ExtraMarkers.icon({
  icon: 'fa-camera',
  markerColor: '#BF3706',
  shape: 'square',
  prefix: 'fas',
  svg: true,
})

// 目前位置
export const byCurPlace = L.ExtraMarkers.icon({
  icon: 'fa-street-view',
  markerColor: '#BF3706',
  shape: 'square',
  prefix: 'fas',
  svg: true,
})

// 搜尋位置
export const bySearchPlace = L.ExtraMarkers.icon({
  icon: 'fa-search-location',
  markerColor: '#BF3706',
  shape: 'square',
  prefix: 'fas',
  svg: true,
})

// 點選位置(地圖上點選)
export const byMapClick = L.ExtraMarkers.icon({
  icon: 'fa-map-marked-alt',
  markerColor: '#BF3706',
  shape: 'square',
  prefix: 'fas',
  svg: true,
})

/////////////////////////
// 爬山
export const hikeIcon = L.ExtraMarkers.icon({
  icon: 'fa-hiking',
  markerColor: '#3B6F32',
  shape: 'square',
  prefix: 'fas',
  svg: true,
})

// 游泳
export const swimIcon = L.ExtraMarkers.icon({
  icon: 'fa-swimmer',
  markerColor: '#0D3C8C',
  shape: 'square',
  prefix: 'fas',
  svg: true,
})

// 跑步
export const runIcon = L.ExtraMarkers.icon({
  icon: 'fa-running',
  markerColor: '#FB8700',
  shape: 'square',
  prefix: 'fas',
  svg: true,
})

// 健身
export const workOutIcon = L.ExtraMarkers.icon({
  icon: 'fa-dumbbell',
  markerColor: 'black',
  shape: 'square',
  prefix: 'fas',
})

// 其他
export const OtherIcon = L.ExtraMarkers.icon({
  icon: 'fa-child',
  markerColor: 'yellow',
  shape: 'square',
  prefix: 'fas',
})

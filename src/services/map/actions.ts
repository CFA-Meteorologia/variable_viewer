import { LatLng } from 'leaflet'

export const MAP_CHANGE_CENTER = 'MAP_CHANGE_CENTER'

export const mapChangeView = (lat: number, lng: number, zoom: number) => ({
  type: MAP_CHANGE_CENTER,
  payload: { lat, lng, zoom },
})

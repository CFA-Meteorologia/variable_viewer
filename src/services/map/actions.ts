import createAction from 'helpers/createAction'
import { VariableLayer } from 'types/map'

export const CREATE_MAP = 'CREATE_MAP'
export const REMOVE_MAP = 'REMOVE_MAP'
export const MAP_CHANGE_CENTER = 'MAP-CHANGE_CENTER'
export const MAP_SET_LAYERS = 'MAP_SET_LAYERS'
export const SET_SHOW_WIND_LAYER = 'SET_SHOW_WIND_LAYER'

export const mapChangeView = (lat: number, lng: number, zoom: number) => ({
  type: MAP_CHANGE_CENTER,
  payload: { lat, lng, zoom },
})

export const createMap = (elementId) => ({
  type: CREATE_MAP,
  payload: elementId,
})

export const removeMap = () => ({
  type: REMOVE_MAP,
})

export const setLayers = createAction<VariableLayer[]>(MAP_SET_LAYERS)
export const setShowWindLayer = createAction<boolean>(SET_SHOW_WIND_LAYER)

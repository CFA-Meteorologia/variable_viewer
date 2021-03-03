import createAction from '../../helpers/createAction'

export const CREATE_MAP = 'CREATE_MAP'
export const REMOVE_MAP = 'REMOVE_MAP'
export const MAP_CHANGE_CENTER = 'MAP-CHANGE_CENTER'

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

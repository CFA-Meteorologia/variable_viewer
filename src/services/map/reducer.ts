import { MAP_CHANGE_CENTER, MAP_SET_LAYERS } from './actions'
import { VariableLayer } from 'types/map'

export interface IMapState {
  latitude: number
  longitude: number
  zoom: number
  layers: VariableLayer[]
}

const initialState: IMapState = {
  //initial state looking at Cuba
  latitude: 19.12440952808487,
  longitude: -72.55371093750001,
  zoom: 5,
  layers: [],
}

const reducer = function (state = initialState, { type, payload }) {
  switch (type) {
    case MAP_CHANGE_CENTER: {
      return {
        ...state,
        latitude: payload.lat,
        longitude: payload.lng,
        zoom: payload.zoom,
      }
    }
    case MAP_SET_LAYERS: {
      return {
        ...state,
        layers: payload,
      }
    }
    default:
      return state
  }
}

export default reducer

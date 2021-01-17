import { MAP_CHANGE_CENTER } from './actions'
import { VariableLayer } from './types'

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
  layers: [
    {
      variable: 'T2',
      domain: 1,
      bbox: {
        northWest: {
          long: -99.2800750732422,
          lat: 32.0433044433594,
        },
        southEast: {
          long: -62.8279266357422,
          lat: 13.6513442993164,
        },
      },
    },
  ],
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
    default:
      return state
  }
}

export default reducer

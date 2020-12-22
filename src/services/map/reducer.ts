import { MAP_CHANGE_CENTER } from './actions'

export interface IMapState {
  latitude: number
  longitude: number
  zoom: number
}

const initialState: IMapState = {
  //initial state looking at Cuba
  latitude: 19.12440952808487,
  longitude: -72.55371093750001,
  zoom: 5,
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

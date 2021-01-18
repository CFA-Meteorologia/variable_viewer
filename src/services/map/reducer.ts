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
      time: '2020-07-06T00:00:00/2020-07-07T00:00:00/PT3H',
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
    // {
    //   variable: 'T2',
    //   domain: 2,
    //   bbox: {
    //     northWest: {
    //       long: -88.2739944458008,
    //       lat: 26.5959930419922,
    //     },
    //     southEast: {
    //       long: -70.9283981323242,
    //       lat: 17.6354064941406,
    //     },
    //   },
    // },
    // {
    //   variable: 'T2',
    //   domain: 3,
    //   bbox: {
    //     northWest: {
    //       long: -85.717041015625,
    //       lat: 24.2644119262695,
    //     },
    //     southEast: {
    //       long: -73.7653961181641,
    //       lat: 19.3405456542969,
    //     },
    //   },
    // },
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

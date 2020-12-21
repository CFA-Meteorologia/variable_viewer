export interface IMapState {
  latitude: number
  longitude: number
  zoom: number
}

const initialState: IMapState = {
  latitude: 0,
  longitude: 0,
  zoom: 13,
}

const reducer = function (state = initialState, { type, payload }) {
  switch (type) {
    default:
      return state
  }
}

export default reducer

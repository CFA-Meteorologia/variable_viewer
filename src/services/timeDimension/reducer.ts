import {
  SET_CURRENT_TIME,
  SET_LOADING_NEXT_FRAME,
  SET_TIMES_TO_SHOW,
} from './actions'

export interface ITimeDimensionState {
  currentTime: number
  availableTimes: number[]
  loadingNextFrame: boolean
}

const initialState: ITimeDimensionState = {
  currentTime: 0,
  availableTimes: [],
  loadingNextFrame: false,
}

const reducer = function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_TIMES_TO_SHOW: {
      return {
        ...state,
        availableTimes: payload,
        loadingNextFrame: false,
      }
    }
    case SET_CURRENT_TIME: {
      return {
        ...state,
        currentTime: payload,
      }
    }
    case SET_LOADING_NEXT_FRAME: {
      return {
        ...state,
        loadingNextFrame: payload,
      }
    }
    default:
      return state
  }
}

export default reducer

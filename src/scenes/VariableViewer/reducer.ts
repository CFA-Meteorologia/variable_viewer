import { VariableLayer } from 'types/map'
import {
  GET_AVAILABLE_DATA_IN_MONTH,
  GET_AVAILABLE_DATA_IN_MONTH_SUCCESSFUL,
  SET_CURRENT_DATE,
  SET_CURRENT_DATE_SUCCESSFUL,
} from './actions'

export interface IVariableViewerState {
  currentDate: string
  loadingDateLayers: boolean
  daysInMonthWithData: string[]
  loadingDaysWithData: boolean
  layers: VariableLayer[]
}

const initialState: IVariableViewerState = {
  currentDate: '2020-07-06T00:00:00',
  daysInMonthWithData: ['2020-07-06T00:00:00'],
  loadingDateLayers: false,
  loadingDaysWithData: false,
  layers: [],
}

const reducer = function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_AVAILABLE_DATA_IN_MONTH_SUCCESSFUL: {
      return {
        ...state,
        daysInMonthWithData: payload,
        loadingDaysWithData: false,
      }
    }
    case GET_AVAILABLE_DATA_IN_MONTH: {
      return {
        ...state,
        loadingDaysWithData: true,
      }
    }
    case SET_CURRENT_DATE: {
      return {
        ...state,
        currentDate: payload,
        loadingDateLayers: true,
      }
    }
    case SET_CURRENT_DATE_SUCCESSFUL: {
      return {
        ...state,
        loadingDateLayers: false,
        layers: payload,
      }
    }
    default:
      return state
  }
}

export default reducer

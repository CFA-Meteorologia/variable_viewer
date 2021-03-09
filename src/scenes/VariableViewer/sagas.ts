import { call, takeLatest, put, select } from 'redux-saga/effects'
import { ISagasDependencies } from 'types/app'
import {
  GET_AVAILABLE_DATA_IN_MONTH,
  getAvailableDataInMonthSuccessful,
  SET_CURRENT_DATE,
  SET_CURRENT_VARIABLE,
  setCurrentDateSuccessful,
} from './actions'
import Api from 'services/api'
import { selectDaysWithData, selectLayers } from './selectors'
import { getMonth } from 'date-fns'
import { setLayers } from 'services/map/actions'

function* getAvailableDataInMonth(api: Api, action) {
  const date = action.payload

  const currentData = yield select(selectDaysWithData)

  if (currentData.length > 0 && getMonth(currentData) === getMonth(date)) {
    return yield put(getAvailableDataInMonthSuccessful(currentData))
  }

  const datesWithData = yield call(api.fetchAvailableDataInMonth, date)
  yield put(getAvailableDataInMonthSuccessful(datesWithData))
}

function* getLayersInDay(api: Api, action) {
  const currentDate = action.payload

  const layersInDay = yield call(api.fetchLayersInDay, currentDate)
  yield put(setCurrentDateSuccessful(layersInDay))
}

function* setVariable(action) {
  const variable = action.payload

  const layers = yield select(selectLayers)
  const variableLayers = layers.filter((l) => l.variable === variable)
  yield put(setLayers(variableLayers))
}

export default function* sagas({ api }: ISagasDependencies) {
  yield takeLatest(GET_AVAILABLE_DATA_IN_MONTH, getAvailableDataInMonth, api)
  yield takeLatest(SET_CURRENT_DATE, getLayersInDay, api)
  yield takeLatest(SET_CURRENT_VARIABLE, setVariable)
}

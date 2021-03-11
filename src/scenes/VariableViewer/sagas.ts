import { call, takeLatest, put, select } from 'redux-saga/effects'
import { ISagasDependencies } from 'types/app'
import {
  GET_AVAILABLE_DATA_IN_MONTH,
  getAvailableDataInMonthSuccessful,
  SELECT_DOMAINS,
  SET_CURRENT_DATE,
  SET_CURRENT_VARIABLE,
  setCurrentDateSuccessful,
  setCurrentVariable,
} from './actions'
import Api from 'services/api'
import {
  selectCurrentVariable,
  selectDaysWithData,
  selectLayers,
  selectSelectedDomains,
} from './selectors'
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

function* setCurrentDateSaga(api: Api, action) {
  const currentDate = action.payload

  const layersInDay = yield call(api.fetchLayersInDay, currentDate)
  yield put(setCurrentDateSuccessful(layersInDay))
  const variable = layersInDay[0].variable
  yield put(setCurrentVariable(variable))
}

function* setVariableSaga(action) {
  const variable = action.payload

  const layers = yield select(selectLayers)
  const selectedDomains = yield select(selectSelectedDomains)
  const variableLayers = layers.filter(
    (l) => l.variable === variable && selectedDomains.includes(l.domain),
  )
  yield put(setLayers(variableLayers))
}

function* setSelectedDomainsSaga() {
  const variable = yield select(selectCurrentVariable)

  yield put(setCurrentVariable(variable))
}

export default function* sagas({ api }: ISagasDependencies) {
  yield takeLatest(GET_AVAILABLE_DATA_IN_MONTH, getAvailableDataInMonth, api)
  yield takeLatest(SET_CURRENT_DATE, setCurrentDateSaga, api)
  yield takeLatest(SET_CURRENT_VARIABLE, setVariableSaga)
  yield takeLatest(SELECT_DOMAINS, setSelectedDomainsSaga)
}

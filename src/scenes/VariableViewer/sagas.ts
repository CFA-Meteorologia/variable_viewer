import { call, takeLatest, put } from 'redux-saga/effects'
import { ISagasDependencies } from 'types/app'
import {
  GET_AVAILABLE_DATA_IN_MONTH,
  getAvailableDataInMonthSuccessful,
} from './actions'
import Api from 'services/api'

function* getAvailableDataInMonth(api: Api, action) {
  const date = action.payload

  const datesWithData = yield call(api.fetchAvailableDataInMonth, date)
  yield put(getAvailableDataInMonthSuccessful(datesWithData))
}

export default function* sagas({ api }: ISagasDependencies) {
  yield takeLatest(GET_AVAILABLE_DATA_IN_MONTH, getAvailableDataInMonth, api)
  // yield takeLatest(REMOVE_MAP, removeMap, variablesMap)
}

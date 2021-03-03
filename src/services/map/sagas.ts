import { call, takeLatest } from 'redux-saga/effects'
import { CREATE_MAP, REMOVE_MAP } from './actions'
import { ISagasDependencies } from 'types/app'
import VariablesMap from './classes/VariablesMap'

function* createMapSaga(variablesMap: VariablesMap, action) {
  yield call(variablesMap.createMap, action.payload)
}

function* removeMap(variablesMap: VariablesMap) {
  yield call(variablesMap.removeMap)
}

export default function* sagas({ variablesMap }: ISagasDependencies) {
  yield takeLatest(CREATE_MAP, createMapSaga, variablesMap)
  yield takeLatest(REMOVE_MAP, removeMap, variablesMap)
}

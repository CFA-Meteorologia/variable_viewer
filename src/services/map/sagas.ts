import { call, takeLatest } from 'redux-saga/effects'
import { CREATE_MAP, MAP_SET_LAYERS, REMOVE_MAP } from './actions'
import { ISagasDependencies } from 'types/app'
import VariablesMap from './classes/VariablesMap'

function* createMapSaga(variablesMap: VariablesMap, action) {
  yield call(variablesMap.createMap, action.payload)
}

function* removeMap(variablesMap: VariablesMap) {
  yield call(variablesMap.removeMap)
}

function setLayers(variablesMap: VariablesMap, action) {
  const layers = action.payload
  variablesMap.setLayers(layers)
}

export default function* sagas({ variablesMap }: ISagasDependencies) {
  yield takeLatest(CREATE_MAP, createMapSaga, variablesMap)
  yield takeLatest(REMOVE_MAP, removeMap, variablesMap)
  yield takeLatest(MAP_SET_LAYERS, setLayers, variablesMap)
}

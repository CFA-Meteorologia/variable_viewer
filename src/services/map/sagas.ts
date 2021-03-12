import { call, takeLatest, select, all } from 'redux-saga/effects'
import { CREATE_MAP, MAP_SET_LAYERS, REMOVE_MAP } from './actions'
import { ISagasDependencies } from 'types/app'
import VariablesMap from './classes/VariablesMap'
import { SET_CURRENT_TIME } from '../timeDimension/actions'
import { selectShowWindLayer } from './selectors'
import Api from '../api'

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

function* setCurrentTimeSaga(variablesMap: VariablesMap, api: Api, action) {
  const currentTime = action.payload
  const showWindLayer = yield select(selectShowWindLayer)

  if (showWindLayer) {
    const [u10, v10] = yield all([
      call(api.fetchVarData, 'U10', currentTime, 1),
      call(api.fetchVarData, 'V10', currentTime, 1),
    ])

    if (u10 && v10) {
      yield call(variablesMap.setWindLayer, u10, v10)
    } else {
      yield call(variablesMap.removeWindLayer)
    }
  }
}

export default function* sagas({ variablesMap, api }: ISagasDependencies) {
  yield takeLatest(CREATE_MAP, createMapSaga, variablesMap)
  yield takeLatest(REMOVE_MAP, removeMap, variablesMap)
  yield takeLatest(MAP_SET_LAYERS, setLayers, variablesMap)
  yield takeLatest(SET_CURRENT_TIME, setCurrentTimeSaga, variablesMap, api)
}

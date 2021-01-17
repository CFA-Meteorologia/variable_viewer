import { LatLng } from 'leaflet'
import { AppState } from '../../types/appState'

const selectState = (state: AppState) => state.mapReducer

export const selectView = (state) => {
  const featureState = selectState(state)
  return new LatLng(featureState.latitude, featureState.longitude)
}

export const selectLayers = (state) => selectState(state).layers
export const selectZoom = (state) => selectState(state).zoom

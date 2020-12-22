import { SideEffectScope } from 'types/sideEffect'
import { Map, tileLayer } from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { MapSideEffectsType } from './types'
import { mapChangeView } from './actions'
import { selectView, selectZoom } from './selectors'

const mapSideEffects: SideEffectScope = ({ store }): MapSideEffectsType => {
  let lastMapCreated: Map
  const createMap = (elementId) => {
    lastMapCreated = new Map(elementId)

    const layer = tileLayer(
      // eslint-disable-next-line
      'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
    )

    lastMapCreated.addLayer(layer)
    setCurrentView()

    lastMapCreated.on('moveend', ({ target }) => {
      const center = target.getCenter()
      store.dispatch(mapChangeView(center.lat, center.lng, target.getZoom()))
    })
  }

  const removeMap = () => {
    lastMapCreated.remove()
  }

  const moveView = (lat, lng, zoom?) => {
    let zoomToSet = zoom
    if (!zoom) zoomToSet = selectZoom(store.getState())

    store.dispatch(mapChangeView(lat, lng, zoomToSet))
    setCurrentView()
  }

  const setCurrentView = () => {
    const appState = store.getState()
    lastMapCreated.setView(selectView(appState), selectZoom(appState))
  }

  return {
    createMap,
    removeMap,
    moveView,
  }
}

export default mapSideEffects

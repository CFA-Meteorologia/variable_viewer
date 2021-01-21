import { SideEffectScope } from 'types/sideEffect'
import { Layer, Map, tileLayer } from 'leaflet'

import { MapSideEffectsType } from './types'
import { mapChangeView } from './actions'
import { selectLayers, selectView, selectZoom } from './selectors'
import { TimeDimensionWMSLayer } from 'leaflet-timedimension-scoped'
import WeatherVariableWMSLayer from './classes/WeatherVariableWMSLayer'

import 'leaflet/dist/leaflet.css'
import 'leaflet-timedimension-scoped/src/leaflet.timedimension.control.css'

const mapSideEffects: SideEffectScope = ({ store }): MapSideEffectsType => {
  let lastMapCreated: Map
  const createMap = (elementId) => {
    lastMapCreated = new Map(elementId, {
      timeDimension: true,
      timeDimensionControl: true,
      timeDimensionControlOptions: {
        onlyUTC: true,
      },
    })

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

    const layers = selectLayers(store.getState())

    layers.forEach((layer) => {
      const wmsLayer = new WeatherVariableWMSLayer(
        'http://localhost:8080/insmet/wms',
        { ...layer },
      )
      lastMapCreated.addLayer(
        new TimeDimensionWMSLayer(wmsLayer, {
          cache: 24,
          wmsVersion: '1.1.0',
        }) as Layer,
      )

      // @ts-ignore
      lastMapCreated.timeDimension.setAvailableTimes(layer.time, 'replace')
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

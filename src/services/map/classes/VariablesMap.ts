import { selectLayers, selectView, selectZoom } from '../selectors'
import { Layer, Map, tileLayer } from 'leaflet'
import { Store } from 'redux'
import { AppState } from 'types/appState'
import { mapChangeView } from '../actions'
import WeatherVariableWMSLayer from './WeatherVariableWMSLayer'
import { TimeDimensionWMSLayer } from 'leaflet-timedimension-scoped'

import 'leaflet/dist/leaflet.css'
import 'leaflet-timedimension-scoped/src/leaflet.timedimension.control.css'

class VariablesMap {
  private lastMapCreated?: Map

  constructor(private store: Store<AppState, any>) {}

  createMap = (elementId: string) => {
    this.lastMapCreated = new Map(elementId, {
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

    this.lastMapCreated.addLayer(layer)

    this.setCurrentView()

    this.lastMapCreated.on('moveend', ({ target }) => {
      const center = target.getCenter()
      this.store.dispatch(
        mapChangeView(center.lat, center.lng, target.getZoom()),
      )
    })

    const layers = selectLayers(this.store.getState())

    layers.forEach((layer) => {
      const wmsLayer = new WeatherVariableWMSLayer(
        'http://localhost:8080/insmet/wms',
        { ...layer },
      )
      this.lastMapCreated?.addLayer(
        new TimeDimensionWMSLayer(wmsLayer, {
          cache: 24,
          wmsVersion: '1.1.0',
        }) as Layer,
      )

      // @ts-ignore
      this.lastMapCreated?.timeDimension.setAvailableTimes(
        layer.time,
        'replace',
      )
    })
  }

  removeMap = () => {
    this.lastMapCreated?.remove()
  }

  setCurrentView = () => {
    const appState = this.store.getState()
    this.lastMapCreated?.setView(selectView(appState), selectZoom(appState))
  }
}

export default VariablesMap

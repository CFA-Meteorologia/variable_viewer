import { selectLayers, selectView, selectZoom } from '../selectors'
import { Layer, Map, TileLayer, tileLayer } from 'leaflet'
import { Store } from 'redux'
import { AppState } from 'types/appState'
import { mapChangeView } from '../actions'
import WeatherVariableWMSLayer from './WeatherVariableWMSLayer'
import { TimeDimensionWMSLayer } from 'leaflet-timedimension-scoped'

import 'leaflet/dist/leaflet.css'
import 'leaflet-timedimension-scoped/src/leaflet.timedimension.control.css'
import domainToNumber from 'helpers/domainToNumber'

class VariablesMap {
  private lastMapCreated?: Map
  private baseLayer?: TileLayer

  constructor(private store: Store<AppState, any>) {}

  createMap = (elementId: string) => {
    this.lastMapCreated = new Map(elementId, {
      timeDimension: true,
      timeDimensionControl: true,
      timeDimensionControlOptions: {
        onlyUTC: true,
      },
    })

    this.baseLayer = tileLayer(
      // eslint-disable-next-line
      'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
    )
    this.lastMapCreated.addLayer(this.baseLayer)

    this.setCurrentView()

    this.lastMapCreated.on('moveend', ({ target }) => {
      const center = target.getCenter()
      this.store.dispatch(
        mapChangeView(center.lat, center.lng, target.getZoom()),
      )
    })

    const layers = selectLayers(this.store.getState())
    this.setLayers(layers)
  }

  removeMap = () => {
    this.lastMapCreated?.remove()
  }

  setCurrentView = () => {
    const appState = this.store.getState()
    this.lastMapCreated?.setView(selectView(appState), selectZoom(appState))
  }

  setLayers = (layers) => {
    this.lastMapCreated?.eachLayer((layer) => {
      if (layer !== this.baseLayer) this.lastMapCreated?.removeLayer(layer)
    })
    layers.sort((a, b) => domainToNumber(a.domain) - domainToNumber(b.domain))
    layers.forEach((layer) => {
      const wmsLayer = new WeatherVariableWMSLayer(
        'http://localhost:8080/insmet/wms',
        {
          ...layer,
          domain: domainToNumber(layer.domain),
        },
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
}

export default VariablesMap

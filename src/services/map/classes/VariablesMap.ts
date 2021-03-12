import { selectLayers, selectView, selectZoom } from '../selectors'
import { Layer, Map, TileLayer, tileLayer } from 'leaflet'
import { Store } from 'redux'
import { AppState } from 'types/appState'
import { mapChangeView } from '../actions'
import WeatherVariableWMSLayer from './WeatherVariableWMSLayer'
import {
  TimeDimensionWMSLayer,
  parseTimesExpression,
} from 'leaflet-timedimension-scoped'

import 'leaflet/dist/leaflet.css'
import 'leaflet-timedimension-scoped/src/leaflet.timedimension.control.css'
import 'leaflet/dist/leaflet'
import 'leaflet-velocity-ts'
import domainToNumber from 'helpers/domainToNumber'
import { IVariable } from 'types/map'

declare var L: any

const getWindData = (v: IVariable) => {
  const nx = v.data[0].length
  const ny = v.data.length
  const la1 = v.bbox.northWest.lat
  const lo1 = v.bbox.northWest.long
  const la2 = v.bbox.southEast.lat
  const lo2 = v.bbox.southEast.long

  return {
    header: {
      parameterNumber: v.variableName === 'U10' ? 3 : 2,
      parameterCategory: 2,
      dx: Math.abs(lo2 - lo1) / nx,
      dy: Math.abs(la2 - la1) / ny,
      lo1,
      la1,
      nx,
      ny,
      la2,
      lo2,
      refTime: v.date,
    },
    data: v.data.reduce((acc, v) => [...acc, ...v], []),
  }
}

class VariablesMap {
  private lastMapCreated?: Map
  private baseLayer?: TileLayer
  private windLayer?: Layer

  constructor(private store: Store<AppState, any>, private timeDimension) {}

  createMap = (elementId: string) => {
    this.lastMapCreated = new Map(elementId, {
      timeDimension: this.timeDimension,
      timeDimensionControl: true,
      timeDimensionControlOptions: {
        playerOptions: {
          transitionTime: 1500,
        },
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
      if (layer !== this.baseLayer && layer !== this.windLayer)
        this.lastMapCreated?.removeLayer(layer)
    })

    if (layers.length === 0) return

    const maxTimeIntervals = layers.sort(
      (a, b) =>
        parseTimesExpression(b.time).length -
        parseTimesExpression(a.time).length,
    )[0].time

    this.timeDimension.setAvailableTimes(maxTimeIntervals, 'replace')
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
    })
  }

  setWindLayer = (u10: IVariable, v10: IVariable) => {
    this.removeWindLayer()
    const options = {
      displayValues: true,
      displayOptions: {
        velocityType: 'GBR Wind',
        position: 'bottomleft',
        emptyString: 'No velocity data',
        angleConvention: 'bearingCW',
        displayPosition: 'bottomleft',
        displayEmptyString: 'No velocity data',
        speedUnit: 'kt',
      },
      data: [getWindData(u10), getWindData(v10)],
      maxVelocity: 10,
    }

    const velocity = L.velocityLayer(options)
    this.lastMapCreated?.addLayer(velocity)
    this.windLayer = velocity
  }

  removeWindLayer = () => {
    if (this.windLayer) this.lastMapCreated?.removeLayer(this.windLayer)
  }
}

export default VariablesMap

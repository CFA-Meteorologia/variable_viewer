import { Map, DomUtil, Layer, Util, LatLng } from 'leaflet'
import { Bbox } from '../types'

interface IWeatherVariableWMSLayer {
  new (options: { bbox: Bbox; variable: string; domain: number })
}

const WeatherVariableWMSLayer: IWeatherVariableWMSLayer = Layer.extend({
  // @section
  // @aka TileLayer.WMS options
  // If any custom options not documented here are used, they will be sent to the
  // WMS server as extra parameters in each request URL. This can be useful for
  // [non-standard vendor WMS parameters](http://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
  wmsParams: {
    service: 'WMS',
    request: 'GetMap',

    // @option layers: String = ''
    // **(required)** Comma-separated list of WMS layers to show.
    layers: '',

    // @option styles: String = ''
    // Comma-separated list of WMS styles.
    styles: '',

    // @option format: String = 'image/jpeg'
    // WMS image format (use `'image/png'` for layers with transparency).
    format: 'image/jpeg',

    // @option transparent: Boolean = false
    // If `true`, the WMS service will return images with transparency.
    transparent: false,

    // @option version: String = '1.1.1'
    // Version of the WMS service to use
    version: '1.1.0',
  },
  workSpace: 'insmet',
  baseUrl: 'http://localhost:8080/insmet/wms',
  domainSizes: [300, 500, 500],

  initialize: function (options) {
    Util.setOptions(this, options)
    this.configureWMS()
  },

  onAdd: function (map: Map) {
    this._container = DomUtil.create('img')

    this.getPane().appendChild(this._container)
    this._container.src = this.getRequestUrl()
    this._container.className = 'leaflet-zoom-animated weather-tile'
    this._update(map)

    map.on('zoomend viewreset', Util.bind(this._update, this, map), this)
  },

  onRemove: function (map) {
    DomUtil.remove(this._container)
    map.off('zoomend viewreset')
  },

  _update: function (map: Map) {
    // Recalculate position of container

    const northWestPixel = map.latLngToLayerPoint(this.getNorthWest())
    const southEastPixel = map.latLngToLayerPoint(this.getSouthEast())

    DomUtil.setPosition(this._container, northWestPixel)
    this._container.style.width =
      Math.abs(northWestPixel.x - southEastPixel.x) + 'px'
    this._container.style.height =
      Math.abs(northWestPixel.y - southEastPixel.y) + 'px'

    // Add/remove/reposition children elements if needed
  },
  getRequestUrl: function () {
    const northWest = this.getNorthWest(),
      southEast = this.getSouthEast(),
      bbox = [northWest.lng, southEast.lat, southEast.lng, northWest.lat].join(
        ',',
      ),
      url = this.baseUrl
    return (
      url +
      Util.getParamString(this.wmsParams, url, this.options.uppercase) +
      (this.options.uppercase ? '&BBOX=' : '&bbox=') +
      bbox
    )
  },
  getNorthWest: function () {
    const { northWest } = this.options.bbox
    return new LatLng(northWest.lat, northWest.long)
  },
  getSouthEast: function () {
    const { southEast } = this.options.bbox
    return new LatLng(southEast.lat, southEast.long)
  },
  configureWMS: function () {
    this.wmsParams.layers = this.getLayerName()
    const { domain } = this.options
    const size = this.domainSizes[domain - 1]
    this.wmsParams.width = size
    this.wmsParams.height = size
  },
  getLayerName: function () {
    const { variable, domain } = this.options
    const { workSpace } = this
    return `${workSpace}:${variable}_d0${domain}`
  },
})

export default WeatherVariableWMSLayer

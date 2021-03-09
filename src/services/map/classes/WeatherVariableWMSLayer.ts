import { Map, DomUtil, Layer, Util, LatLng } from 'leaflet'
import { Bbox } from 'types/map'

interface IWeatherVariableWMSLayer {
  new (url: string, options: { bbox: Bbox; variable: string; domain: number })
}

const WeatherVariableWMSLayer: IWeatherVariableWMSLayer = Layer.extend({
  wmsParams: null,
  workSpace: 'insmet',
  baseUrl: 'http://localhost:8080/insmet/wms',
  domainSizes: [300, 500, 500],
  _visible: true,
  _loaded: false,

  initialize: function (url, options) {
    Util.setOptions(this, options)
    this.baseUrl = url
    this.configureWMS()
  },

  onAdd: function (map: Map) {
    this.container = DomUtil.create('img')

    // TimeDimensionWMS interface implementation
    this.container.addEventListener('load', () => this.fire('load'))

    this.getPane().appendChild(this.container)
    this.configureContainer()

    this._update(map)

    map.on('zoomend viewreset', Util.bind(this._update, this, map), this)
  },

  configureContainer: function () {
    const northWest = this.getNorthWest(),
      southEast = this.getSouthEast(),
      bbox = [northWest.lng, southEast.lat, southEast.lng, northWest.lat].join(
        ',',
      )

    this.container.src = this.getRequestUrl()
    this.container.className = 'leaflet-zoom-animated weather-tile'
    this.container.setAttribute('time', this.options.time)
    this.container.setAttribute('bbox', bbox)
    this.container.setAttribute('layer_name', this.getLayerName())
    this.container.setAttribute('dimension', this.options.domain)
  },

  onRemove: function (map) {
    DomUtil.remove(this.container)
    map.off('zoomend viewreset')
  },

  _update: function (map: Map) {
    // Recalculate position of container

    // TimeDimensionWMS interface implementation
    if (!this._visible && this._loaded) {
      return
    }

    const northWestPixel = map.latLngToLayerPoint(this.getNorthWest())
    const southEastPixel = map.latLngToLayerPoint(this.getSouthEast())

    DomUtil.setPosition(this.container, northWestPixel)
    this.container.style.width =
      Math.abs(northWestPixel.x - southEastPixel.x) + 'px'
    this.container.style.height =
      Math.abs(northWestPixel.y - southEastPixel.y) + 'px'
  },
  getRequestUrl: function () {
    const northWest = this.getNorthWest(),
      southEast = this.getSouthEast(),
      bbox = [northWest.lng, southEast.lat, southEast.lng, northWest.lat].join(
        ',',
      ),
      url = this.baseUrl,
      params = {
        ...this.wmsParams,
        time: this.options.time,
        bbox,
      }

    return `${url}${Util.getParamString(params, url)}`
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
    this.wmsParams = {
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
    }
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

  // TimeDimensionWMS interface implementation
  setLoaded: function (loaded) {
    this._loaded = loaded
  },

  isLoaded: function () {
    return this._loaded
  },

  hide: function () {
    this._visible = false
    if (this.container) {
      this.container.style.display = 'none'
    }
  },

  show: function () {
    this._visible = true
    if (this.container) {
      this.container.style.display = 'block'
    }
  },

  getURL: function () {
    return this.baseUrl
  },

  redraw: function () {
    this._update(this._map)
  },
})

export default WeatherVariableWMSLayer

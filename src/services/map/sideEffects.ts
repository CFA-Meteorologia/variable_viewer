import { SideEffectScope } from 'types/sideEffect'
import { Map, tileLayer } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapSideEffectsType } from './types'

const mapSideEffects: SideEffectScope = (dependencies): MapSideEffectsType => {
  let lastMapCreated
  const createMap = (elementId) => {
    lastMapCreated = new Map(elementId)

    const layer = tileLayer(
      // eslint-disable-next-line
      'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
    )

    lastMapCreated.addLayer(layer)
    lastMapCreated.setView([51.505, -0.09], 13)
  }

  const removeMap = () => {
    lastMapCreated.remove()
  }

  return {
    createMap,
    removeMap,
  }
}

export default mapSideEffects

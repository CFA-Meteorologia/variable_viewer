import { SideEffectScope } from 'types/sideEffect'
import { Map } from 'leaflet'
import { MapSideEffectsType } from './types'

const mapSideEffects: SideEffectScope = (dependencies): MapSideEffectsType => {
  const createMap = (elementId) => {
    new Map(elementId)
    console.log('called')
  }

  return {
    createMap,
  }
}

export default mapSideEffects

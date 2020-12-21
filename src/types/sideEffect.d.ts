import { AppState } from './appState'
import { Store } from 'redux'
import { MapSideEffectsType } from 'services/map/types'

export interface ISideEffectDependencies {
  store: Store<AppState>
  effects: SideEffectsBundle
}
export type SideEffectScope = (
  dependencies: ISideEffectDependencies,
) => SideEffect

export type SideEffect = MapSideEffectsType

export interface SideEffectsBundle {
  mapSideEffects: MapSideEffectsType
}

import { createContext, FC } from 'react'
import { useStore } from 'react-redux'
import sideEffects from './sideEffects'
import { ISideEffectDependencies, SideEffectsBundle } from 'types/sideEffect'
import { AppState } from '../../types/appState'

// hack, this value will never be transmitted to children components since the provider will always have all dependencies
// since first rendering
const context = createContext<SideEffectsBundle>({} as SideEffectsBundle)
context.displayName = 'SideEffects context'

export const SideEffectContext = context
export const SideEffectConsumer = context.Consumer

export const SideEffectProvider: FC = ({ children }) => {
  const store = useStore<AppState>()

  const effects: SideEffectsBundle = {} as SideEffectsBundle
  const sideEffectsDependencies: ISideEffectDependencies = {
    store,
    effects,
  }

  Object.entries(sideEffects).forEach(([key, s]) => {
    effects[key] = s(sideEffectsDependencies)
  })

  return <context.Provider value={effects}>{children}</context.Provider>
}

import reducers from './reducers'
import { combineReducers, compose, createStore } from 'redux'

export const configureStore = () => {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
      : compose

  const enhancedReducers = combineReducers({ ...reducers })
  return createStore(enhancedReducers, composeEnhancers())
}

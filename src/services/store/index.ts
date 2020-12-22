import reducers from './reducers'
import { combineReducers, compose, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'

const persistConfig = {
  key: 'variable_viewer_state',
  storage,
}

export const configureStore = () => {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
      : compose

  const enhancedReducers = persistReducer(
    persistConfig,
    combineReducers({ ...reducers }),
  )
  console.log(enhancedReducers)
  const store = createStore(enhancedReducers, composeEnhancers())

  return {
    store,
    // @ts-ignore
    persistor: persistStore(store),
  }
}

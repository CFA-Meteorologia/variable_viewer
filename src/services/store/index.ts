import reducers from './reducers'
import sagas from './sagas'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { createTimeDimension } from 'services/timeDimension'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage/session'
import VariablesMap from 'services/map/classes/VariablesMap'
import Api from '../api'

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
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    enhancedReducers,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  )

  const timeDimension = createTimeDimension(store)

  const dependencies = {
    variablesMap: new VariablesMap(store, timeDimension),
    api: new Api(),
    timeDimension: timeDimension,
  }
  sagas.forEach((saga) => sagaMiddleware.run(saga, dependencies))

  return {
    store,
    // @ts-ignore
    persistor: persistStore(store),
  }
}

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { configureStore } from './services/store'
import { PersistGate } from 'redux-persist/integration/react'
import Loader from 'components/Loader'

const { store, persistor } = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={Loader}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

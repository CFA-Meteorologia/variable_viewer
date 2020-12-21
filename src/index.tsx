import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { configureStore } from './services/store'
import { SideEffectProvider } from './services/sideEffects'

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SideEffectProvider>
        <App />
      </SideEffectProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'
import Router from './routes/'
import './styles/main.scss'

const MOUNT_NODE = document.getElementById('root')

let render = (Component) => {
  ReactDOM.render(
    <AppContainer >
      <Component />
    </AppContainer>,
    MOUNT_NODE
  )
}

let renderRoutes = () => {
  ReactDOM.render(
    <AppContainer >
      <Router />
    </AppContainer>,
    MOUNT_NODE
  )
}

if (window.devToolsExtension) {
  window.devToolsExtension.open()
}

// render(App)
renderRoutes()

if (module.hot) {
  module.hot.accept('./components/App', () => {
    // render(App)
    renderRoutes()
  })
}


import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
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

renderRoutes()

if (module.hot) {
  module.hot.accept('./routes/', () => {
    renderRoutes()
  })
}


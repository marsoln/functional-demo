import React from 'react'
import ReactDOM from 'react-dom'
import Router from './routes/'
import { AppContainer } from 'react-hot-loader'
import './styles/main.scss'

const MOUNT_NODE = document.getElementById('root')


if (process.env.NODE_ENV !== 'production') {
  let renderRoutes = () => {
    ReactDOM.render(
      <AppContainer >
        <Router />
      </AppContainer>,
      MOUNT_NODE
    )
  }

  renderRoutes()
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }

  if (module.hot) {
    module.hot.accept('./routes/', () => {
      renderRoutes()
    })
  }
} else {
  ReactDOM.render(<Router />, MOUNT_NODE)
}

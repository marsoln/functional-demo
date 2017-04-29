import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import App from '../components/App'
import dragSelect from '../components/DragSelect'
import clickFloat from '../components/ClickFloat'
import easeInOut from '../components/EaseInOut'
import polygon from '../components/Polygon'

const routes = () => 
  <Router>
    <div>
      <Route exact name='app' path='/' component={App} />
      <Route path='/dragSelect' component={dragSelect} />
      <Route path='/clickFloat' component={clickFloat} />
      <Route path='/easeInOut' component={easeInOut} />
      <Route path='/polygon' component={polygon} />
    </div>
  </Router>


export default routes
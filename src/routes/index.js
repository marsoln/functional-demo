import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import dragSelect from '../components/DragSelect'
import clickFloat from '../components/ClickFloat'
import easeInOut from '../components/EaseInOut'
import polygon from '../components/Polygon'
import taskQueue from '../components/TaskQueue'
import throttle from '../components/Throttle'

import styles from './styles.scss'

export default class Routes extends React.Component {
  constructor() {
    super()
    this.state = {
      demos: [
        {
          name: '拖拽选中 Drag&Select',
          action: '/dragSelect'
        },
        {
          name: '点击浮动',
          action: '/clickFloat'
        },
        {
          name: 'easeInOut函数',
          action: '/easeInOut'
        },
        {
          name: '多边形工具',
          action: '/polygon'
        },
        {
          name: '串/并行任务队列',
          action: '/taskQueue'
        },
        {
          name: '延迟触发器',
          action: '/throttle'
        }
      ]
    }
  }

  render() {
    return <Router>
      <div className={styles.container}>
        <section className={styles.sideMenu}>
          <header className={styles.header}>点击查看示例</header>
          <ul className={styles.menuList}>
            {
              this.state.demos.map((d, i) =>
                <li key={i}><Link className={styles.link} to={d.action}>{d.name}</Link></li>
              )
            }
          </ul>
        </section>
        <section className={styles.body}>
          <Route exact path='/dragSelect' component={dragSelect} />
          <Route path='/clickFloat' component={clickFloat} />
          <Route path='/easeInOut' component={easeInOut} />
          <Route path='/polygon' component={polygon} />
          <Route path='/taskQueue' component={taskQueue} />
          <Route path='/throttle' component={throttle} />
        </section>
      </div>
    </Router>
  }
}


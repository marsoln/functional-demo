import React from 'react'
import styles from './styles.scss'
import { Link } from 'react-router-dom'

class App extends React.Component {

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
        }, {
          name: '多边形工具',
          action: '/polygon'
        }, {
          name: '串/并行任务队列',
          action: '/taskQueue'
        }
      ]
    }
  }

  render() {
    return <section>
      <header className={styles.header}>点击查看示例</header>
      <ul>
        {
          this.state.demos.map((d, i) =>
            <li key={i}><Link to={d.action}>{d.name}</Link></li>
          )
        }
      </ul>
    </section>
  }
}

export default App
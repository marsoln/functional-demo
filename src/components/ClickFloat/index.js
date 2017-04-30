import React from 'react'
import styles from './styles.scss'
import radiansGen from '../../modules/radiansGenerator'
import FloatEle from './FloatEle'

// 浮动范围
let generator = new radiansGen({
  _from: 0,
  _to: 80
}),
  counter = 0

export default class ClickFloatDemo extends React.Component {
  constructor() {
    super()
    this.createFloat = this.createFloat.bind(this)
    this.state = {
      elements: []
    }
  }

  removeEle(id) {
    this.setState((prev) => ({
      elements: prev.elements.filter(t => t.id !== id)
    }))
  }

  createFloat($event) {
    let [_from, _to] = generator.getPoints($event.clientX, $event.clientY)
    this.setState((prev) => ({
      elements: prev.elements.concat({
        _from,
        _to,
        id: counter++
      })
    }))
  }

  render() {
    return <section className={styles.container} onClick={this.createFloat}>
      {
        this.state.elements.map(
          e =>
            <FloatEle from={e._from} to={e._to} callbackFunc={this.removeEle.bind(this, e.id)} key={e.id} />
        )
      }
    </section>
  }
}
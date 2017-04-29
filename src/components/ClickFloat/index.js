import React from 'react'
import styles from './styles.scss'
import radiansGen from '../../modules/radiansGenerator'
import $ from 'jquery'

// 浮动范围
const GEN = new radiansGen({
  _from: 0,
  _to: 80
})

let counter = 0

class FloatEle extends React.Component {
  constructor(props) {
    super(props)
    let _from = this.props.from
    this.state = {
      top: _from.Y,
      left: _from.X,
      opacity: 1,
      backgroundColor: `rgba(${Math.random() * 255 >>> 0},${Math.random() * 255 >>> 0},${Math.random() * 255 >>> 0},1)`
    }
  }

  componentDidMount() {
    setTimeout(() => {
      let _to = this.props.to
      this.setState({
        top: _to.Y,
        left: _to.X,
        opacity: 0,
      })
      setTimeout(() => {
        this.props.callbackFunc()
      }, 1200)
    })
  }

  render() {
    return <div className={styles.element} style={this.state}></div>
  }
}

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
    let [_from, _to] = GEN.getPoints($event.clientX, $event.clientY)
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
import React from 'react'
import styles from './styles.scss'
import PolygonCalculator from '../../modules/polygonCalculator'

const REDUCE = Array.prototype.reduce
const FOREACH = Array.prototype.forEach

class WeightValue extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 3
    }
    this.valueChanged = this.valueChanged.bind(this)
  }

  valueChanged($event) {
    let value = $event.target.value
    this.setState({
      value
    })
  }

  render() {
    return <li >
      <input className='whatever' type='number' value={this.state.value} min='1' max='10' onChange={this.valueChanged} />
    </li>
  }
}

export default class Polygon extends React.Component {
  constructor() {
    super()
    this.state = {
      angleAmount: 5,
      points: ''
    }
    this.changeAmount = this.changeAmount.bind(this)
  }

  componentDidMount() {
    let $barsContainer = document.querySelector('#barsContainer')
    let $polygon = document.querySelector('#polygon')
    $barsContainer.addEventListener('change', (ev) => {
      let $target = ev.target || ev.srcElement
      if (~$target.className.indexOf('whatever')) {
        this.redraw()
      }
    }, true)
    this.redraw()
  }

  changeAmount($event) {
    let newVal = $event.target.value
    this.setState({
      angleAmount: newVal
    })
    this.redraw()
  }

  redraw() {
    let $container = document.querySelector('#polygonContainer')

    let points = new PolygonCalculator($container.clientWidth / 2, $container.clientHeight / 2, +this.state.angleAmount, 10, 40)
      .generatePointsPath(...REDUCE.call(document.querySelectorAll('.whatever'), (p, n) => {
        p[p.length] = n.value
        return p
      }, []))

    this.setState({
      points
    })
  }

  render() {
    let temp = new Array(+this.state.angleAmount).fill('')
    return <div className={styles.container}>
      <div className={styles.header}>
        边数:<span>{this.state.angleAmount}</span>
        <input value={this.state.angleAmount} type='range' min="3" max="10" onChange={this.changeAmount} />
        <ul id='barsContainer'>
          {
            temp.map((t, i) => (
              <WeightValue key={i} />
            ))
          }
        </ul>
      </div>
      <svg id='polygonContainer'>
        <polygon id='polygon' points={this.state.points}></polygon>
      </svg>
    </div>
  }
}
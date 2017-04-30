import React from 'react'
import styles from './styles.scss'
import generator from '../../modules/easeInOut'

let itv = -1
export default class EaseInOut extends React.Component {
  constructor() {
    super()
    this.state = {
      frame: 60,
      ts: 5500
    }
    this.changeFrame = this.changeFrame.bind(this)
    this.changeTs = this.changeTs.bind(this)
  }

  changeFrame($event) {
    this.setState({
      frame: $event.target.value
    })
  }

  changeTs($event) {
    this.setState({
      ts: $event.target.value
    })
  }

  animate() {
    let $bar = document.querySelector(`.${styles.bar}`)
    let easeInOut = generator(this.state.ts / 1000, this.state.frame, 0, 100);
    $bar.style.width = 0
    clearInterval(itv)
    itv = setInterval(function () {
      $bar.style.width = `${easeInOut()}%`
    }, 1000 / this.state.frame)
  }

  componentDidMount() {
    let $btn = document.querySelector(`.start`)
    $btn.addEventListener('click', this.animate.bind(this))
  }

  render() {
    return <div>
      <div className='container'>
        <div className={styles.progress}>
          <div className={styles.bar}></div>
        </div>
      </div>
      <div className={styles.options}>
        <span>FPS(frame per second):</span>
        <input type='number' min='10' max='120' defaultValue={this.state.frame} onChange={this.changeFrame} />
      </div>
      <div className={styles.options}>
        <span>Timespan(ms):</span>
        <input type='number' min='1' max='99999' defaultValue={this.state.ts} onChange={this.changeTs} />
      </div>
      <button className='start'>Let's do it</button>
    </div>
  }
}
import React from 'react'
import styles from './styles.scss'
import generator from '../../modules/easeInOut'

export default class EaseInOut extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    let frame = 60
    let $bar = document.querySelector(`.${styles.bar}`)
    let $btn = document.querySelector(`.start`)
    let itv = -1

    $btn.addEventListener('click', function () {
      let easeInOut = generator(3, frame, 0, 100);
      $bar.style.width = 0
      clearInterval(itv)
      itv = setInterval(function () {
        $bar.style.width = `${easeInOut()}%`
      }, 1000 / frame)
    })
  }

  render() {
    return <div>
      <div className='container'>
        <div className={styles.progress}>
          <div className={styles.bar}></div>
        </div>
      </div>
      <button className='start'>Let's do it</button>
    </div>
  }
}
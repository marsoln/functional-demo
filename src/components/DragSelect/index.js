import React from 'react'
import styles from './styles.scss'
import dragSelectInit from '../../modules/dragSelect'

export default class DragSelect extends React.Component {

  constructor() {
    super()
    this.state = {
      items: new Array(10).fill('')
    }
  }

  componentDidMount() {
    dragSelectInit(
      document.querySelector(`.${styles.dragSelectContainer}`),
      document.querySelectorAll('#list li'),
      document.querySelector(`.${styles.selectRange}`),
      'selected'
    )
  }

  render() {
    return <div className={styles.dragSelectContainer}>
      <section className='container'>
        <ul id='list'>
          {
            this.state.items.map((o, i) =>
              <li key={i}>
                list item {i}
              </li>
            )
          }
        </ul>
      </section>
      <div className={styles.selectRange}></div>
    </div>
  }
}
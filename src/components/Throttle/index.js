import React from 'react'
import styles from './styles.scss'
import Throttle from '../../modules/Throttle'

const STATUS = {
  waiting: 'waiting',
  submitted: 'submitted'
}

const manager = new Throttle()

export default class ThrottleDemo extends React.Component {
  constructor() {
    super()
    this.state = {
      status: STATUS.waiting
    }
    this.doFetch = this.doFetch.bind(this)
  }

  doFetch() {
    this.setState({
      status: STATUS.waiting
    })
    manager.addTrigger('demo', () => {
      this.setState({
        status: STATUS.submitted
      })
    })
  }

  render() {
    return (
      <div>
        <header className={styles.result}>{this.state.status}</header>
        <button onClick={this.doFetch}>Click here multi times!</button>
      </div>
    )
  }
}
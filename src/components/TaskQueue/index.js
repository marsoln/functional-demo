import React from 'react'
import styles from './styles.scss'
import {
  TaskCapsule,
  ParallelQueue,
  SerialQueue
} from '../../modules/taskQueue'

export default class TaskQueue extends React.Component {
  constructor() {
    super()
  }

  render() {
    return <div>
      <button>Create Task</button>
    </div>
  }
}
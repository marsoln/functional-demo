import React from 'react'
import styles from './styles.scss'
import {
  TaskCapsule,
  ParallelQueue,
  SerialQueue
} from '../../modules/taskQueue'

let counter = 1

export default class TaskQueue extends React.Component {
  constructor() {
    super()
    this.createTask = this.createTask.bind(this)
    this.runParallelQueue = this.runParallelQueue.bind(this)
    this.runSerialQueue = this.runSerialQueue.bind(this)
    this.state = {
      parallelQueue: new ParallelQueue(),
      serialQueue: new SerialQueue(),
      logContent: []
    }
  }

  runParallelQueue() {
    this.clearLog()
    this.state.parallelQueue.consume()
  }

  runSerialQueue() {
    this.clearLog()
    this.state.serialQueue.consume()
  }

  log(content) {
    this.setState((prev) => ({
      logContent: prev.logContent.concat(content)
    }))
  }

  clearLog() {
    this.setState({
      logContent: []
    })
  }

  createTask() {
    let newTask = new TaskCapsule(() => {
      let index = counter++
      return new Promise((resolve) => {
        setTimeout(() => {
          this.log(`Task No. [${index}] done!`)
          resolve()
        }, Math.random() * 2000 >>> 0)
      })
    })
    this.state.parallelQueue.add(newTask)
    this.state.serialQueue.add(newTask)
    this.forceUpdate()
  }

  render() {
    return <div>
      <div>
        <span className={styles.info}>并行队列中任务数量:{this.state.parallelQueue.getLength()}</span>
        <button onClick={this.runParallelQueue}>Run</button>
      </div>
      <div>
        <span className={styles.info}>串行队列中任务数量:{this.state.serialQueue.getLength()}</span>
        <button onClick={this.runSerialQueue}>Run</button>
      </div>
      <button onClick={this.createTask}>Create Task</button>
      <ul>
        {
          this.state.logContent.map((content, i) => (
            <li key={i}>{content}</li>
          ))
        }
      </ul>
    </div>
  }
}
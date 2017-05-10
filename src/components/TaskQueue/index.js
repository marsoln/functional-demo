import React from 'react'
import styles from './styles.scss'
import {
  TaskCapsule,
  ParallelQueue,
  SerialQueue
} from '../../modules/taskQueue'

let serialCounter = 1
let parallelCounter = 1
export default class TaskQueue extends React.Component {
  constructor() {
    super()
    this.createTask = this.createTask.bind(this)
    this.runParallelQueue = this.runParallelQueue.bind(this)
    this.runSerialQueue = this.runSerialQueue.bind(this)
    this.state = {
      parallelQueue: new ParallelQueue(100),
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

  createTask(type) {
    let _ct = (counter) => {
      return new TaskCapsule(() => {
        let _begin = Date.now()
        return new Promise((resolve) => {
          setTimeout(() => {
            this.log(`Task No. [${counter}] done, execute duration ${(Date.now
              () - _begin)} ms`)
            resolve()
          }, Math.random() * 2000 >>> 0)
        })
      })
    }
    if (type === 0) {
      let newTask = _ct(parallelCounter++)
      this.state.parallelQueue.add(newTask)
    } else {
      let newTask = _ct(serialCounter++)
      this.state.serialQueue.add(newTask)
    }
    this.forceUpdate()
  }

  render() {
    return <div className={styles.task}>
      <div>
        <span className={styles.info}>并行队列中任务数量:{this.state.parallelQueue.getLength()}</span>
        <button onClick={this.runParallelQueue}>Run</button>
        <button onClick={() => { this.createTask(0) }}>Create Task</button>
      </div>
      <div>
        <span className={styles.info}>串行队列中任务数量:{this.state.serialQueue.getLength()}</span>
        <button onClick={this.runSerialQueue}>Run</button>
        <button onClick={() => { this.createTask(1) }}>Create Task</button>
      </div>
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
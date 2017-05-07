const logger = console
const prepareToBegin = Symbol('__prepareToBegin')
const retry = Symbol('__retry')
const abort = Symbol('__abort')
const execAmountChange = Symbol('__execAmountChange')
const __do = Symbol('__do')
const consumeValid = Symbol('__consumeValid')
const finish = Symbol('__finish')

class TaskCapsule {
  // func must be an asynchronized function
  // if it's not
  // why you need task queue?
  constructor(func, ctx, ...args) {
    this.exec = func
    this.ctx = ctx
    this.args = args
    this[retry] = 0
  }
  run() {
    return this.exec.apply(this.ctx || this, this.args)
  }
}

class TaskQueue {
  constructor() {
    this.queue = []
    this[abort] = false
    this.done = false
    this.onHandle = false
    this.total = 0
    this.succ = 0
    this.fail = 0
    this.printFinishLog = true
    this.onExecAmount = 0
    this.onFinished = null
  }

  add(task) {
    if (!(task instanceof TaskCapsule)) {
      throw new TypeError('Task must be an instance of type - <TaskCapsule>.')
    }
    this.queue.push(task)
  }

  getLength() {
    return this.queue.length
  }

  getState() {
    return {
      onHandle: this.onHandle,
      done: this.done
    }
  }

  [prepareToBegin]() {
    if (!this.onHandle) {
      this[abort] = false
      this.done = false
      this.onHandle = true
      this.total = this.queue.length
      this.succ = 0
      this.fail = 0
      this.onExecAmount = 0
      this.printFinishLog = true
      return true
    }
    return false
  }

  [execAmountChange](num) {
    this.onExecAmount += num
    if (this.onExecAmount <= 0 && this.queue.length === 0) {
      this[finish]()
    }
  }

  [consumeValid]() {
    if (this.done) {
      if (this.onExecAmount > 0) {
        logger.warn('Called consume after the tasks were handled.')
      }
      return false
    } else if (this[abort]) {
      logger.warn(`Tasks abort.`)
      this[finish]()
      return false
    } else if (this.queue.length === 0) {
      logger.warn(`No task.`)
      this[finish]()
      return false
    } else {
      return true
    }
  }

  [finish]() {
    this.onHandle = false
    this.done = true
    if (this.printFinishLog) {
      logger.info(`-----------------------------------------------------\ntotal tasks:${this.total}\nsuccessed:${this.succ}\nfailed:${this.fail}\nonExecAmount:${this.onExecAmount}\n-----------------------------------------------------`)
    }
    this.printFinishLog = false
    if (this.onFinished) {
      this.onFinished.call(this)
    }
  }

  abort() {
    this[abort] = true
  }

  flush() {
    this.queue = []
  }
}

class ParallelQueue extends TaskQueue {
  constructor(limit = 5, span = 300, toleration = 3) {
    super()
    this.limitation = limit
    this.timespan = span
    this.toleration = toleration
  }

  [__do]() {
    if (this[consumeValid]()) {
      if (this.onExecAmount < this.limitation && this.queue.length > 0) {
        let task = this.queue.shift()
        this[execAmountChange](1)
        task
          .run()
          .then(() => {
            // exec success
            this.succ++
            this[execAmountChange](-1)
          })
          .catch(e => {
            if (task[retry] >= this.toleration) {
              // retried many times still failed
              logger.error(`Task \n ${task.exec.toString()} ${JSON.stringify(task)} failed: \n ${e.message}`)
              this.fail++
            } else {
              // failed but retry it
              task[retry]++
              this.queue.unshift(task)
            }
            this[execAmountChange](-1)
          })
      }
      setTimeout(this[__do].bind(this), this.timespan)
    }
  }

  consume() {
    if (this[prepareToBegin]()) {
      for (let _i = 0; _i < this.limitation; _i++) {
        this[__do]()
      }
    }
  }
}

class SerialQueue extends TaskQueue {
  constructor(abortAfterFail = false) {
    super()
    this.abortAfterFail = abortAfterFail
  }

  [__do]() {
    if (this[consumeValid]()) {
      this[execAmountChange](1)
      let task = this.queue.shift()
      task.run()
        .then(() => {
          this.succ++
          this[execAmountChange](-1)
          process.nextTick(this[__do].bind(this))
        })
        .catch(() => {
          this.fail++
          this[execAmountChange](-1)
          if (this.abortAfterFail) {
            logger.error(`Task failed, abort!`)
            this[finish]()
            return false
          } else {
            process.nextTick(this[__do].bind(this))
          }
        })
    }
  }

  consume() {
    if (this[prepareToBegin]()) {
      this[__do]()
    }
  }
}

export {
  TaskCapsule,
  ParallelQueue,
  SerialQueue
}

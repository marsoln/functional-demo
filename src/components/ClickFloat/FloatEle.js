import React from 'react'
import { element } from './styles.scss'

export default class FloatEle extends React.Component {
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
    return <div className={element} style={this.state}></div>
  }
}
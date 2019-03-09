import React, { Component } from 'react'
import Story from '../fresco/fusion-story'
import { func } from 'prop-types'

class Renderer extends Component {
  constructor () {
    super()

    this.handleChildAttach = ({ data: { attachedChild } }) => {
      if (attachedChild.getType() !== 'animationManager' && !this.configSent) {
        attachedChild.addEventListener('*', this.props.handleEvent)
        this.props.handleConfig(attachedChild.config)
      }
    }
  }

  componentDidMount () {
    let { content } = this.props
    let story = new Story()
    this.story = story
    story.registerFactory('content', content)
    story.addEventListener('childattached', this.handleChildAttach)
    story.setData({
      id: 'main'
    })
  }

  componentDidUpdate () {
    let { content } = this.props
    let story = this.story
    story.registerFactory('content', content)
    story.addEventListener('childattached', this.handleChildAttach)
    story.setData({
      id: 'main'
    })
  }

  render () {
    if (!this) return
    return (
      <div className="main" id="main">
      </div>
    )
  }
}

Renderer.propTypes = {
  content: func,
  handleConfig: func,
  handleEvent: func
}

export default Renderer

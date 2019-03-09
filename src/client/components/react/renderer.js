import React, { Component } from 'react'
import Story from '../fresco/fusion-story'
import { func } from 'prop-types'
class Renderer extends Component {
  componentDidMount () {
    let { content } = this.props
    let story = new Story()
    this.story = story
    story.registerFactory('content', content)
    story.setData({
      id: 'main'
    })
  }

  componentDidUpdate () {
    let { content } = this.props
    let story = this.story
    story.registerFactory('content', content)
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
  content: func
}

export default Renderer

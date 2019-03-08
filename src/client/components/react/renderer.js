import React, { Component } from 'react'
import Story from '../fresco/fusion-story'
import { func } from 'prop-types'
class Renderer extends Component {
  constructor () {
    super()
    this.state = {
      comtent: () => { // hello
      }
    }
  }
  componentDidMount () {
    let { content } = this.props
    let story = new Story()
    this.story = story
    story.registerFactory('content', content)
    story.setData({
      id: 'main'
    })
  }
  static getDerivedStateFromProps ({ content }) {
    return {
      content
    }
  }
  componentDidUpdate () {
    let { content } = this.state
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

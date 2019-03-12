import React, { Component } from 'react'
import Story from '../fresco/fusion-story'
import { func, string } from 'prop-types'

class Renderer extends Component {
  constructor (props) {
    super(props)

    this.handleChildAttach = ({ data: { attachedChild } }) => {
      if (attachedChild.getType() !== 'animationManager') {
        attachedChild.addEventListener('*', this.props.handleEvent)
        this.props.handleConfig(attachedChild.config)
      }
    }

    this.render = () => <div className="main" id="main"></div>
  }

  componentDidMount () {
    let { content, id, updateData } = this.props
    let story = new Story()
    this.prevId = id
    this.story = story
    story.addEventListener('drawn', updateData)
    story.registerFactory('content', content)
    story.addEventListener('childattached', this.handleChildAttach)
    story.setData({
      id: 'main'
    })
  }

  componentDidUpdate () {
    let { content, id } = this.props
    let story = this.story
    if (this.prevId !== id) {
      this.prevId = id
      Object.keys(story.getChildren()).forEach(key => {
        if (key !== 'animationManager') {
          story.getChildren(key).forEach(child => child.removeEventListener('*', this.props.handleEvent))
        }
      })
      story.registerFactory('content', content)
      story.addEventListener('childattached', this.handleChildAttach)
      story.setData({
        id: 'main'
      })
    }
  }
}

Renderer.propTypes = {
  content: func,
  handleConfig: func,
  handleEvent: func,
  id: string,
  updateData: func
}

export default Renderer

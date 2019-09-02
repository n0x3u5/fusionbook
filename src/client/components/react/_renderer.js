import React, { Component, createRef } from 'react'
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

    this.mainRef = createRef()

    this.render = () => <div className="main" id="main" ref={this.mainRef}/>
  }

  componentDidMount () {
    let { content, id, updateData } = this.props
    let story = new Story()

    this.prevId = id
    this.story = story

    const { width, height } = this.mainRef.current.getBoundingClientRect()

    story.addEventListener('drawn', updateData)
    story.registerFactory('content', content)
    story.addEventListener('childattached', this.handleChildAttach)
    story.setData({
      id: 'main',
      availableWidth: width,
      availableHeight: height
    })
  }

  componentDidUpdate () {
    let { content, id, updateData } = this.props

    if (this.prevId !== id) {
      this.prevId = id

      this.story.remove({ instant: true })
      this.story = new Story()

      const { width, height } = this.mainRef.current.getBoundingClientRect()

      Object.keys(this.story.getChildren()).forEach(key => {
        if (key !== 'animationManager') {
          this.story.getChildren(key).forEach(child => child.removeEventListener('*', this.props.handleEvent))
        }
      })
      this.story.addEventListener('drawn', updateData)
      this.story.registerFactory('content', content)
      this.story.addEventListener('childattached', this.handleChildAttach)
      this.story.setData({
        id: 'main',
        container: this.mainRef,
        availableWidth: width,
        availableHeight: height
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

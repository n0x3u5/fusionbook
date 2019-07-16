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
    let { content, id, updateData } = this.props

    if (this.prevId !== id) {
      this.prevId = id

      this.story.remove({ instant: true })
      this.story = new Story()

        if (key !== 'animationManager') {
          this.story.getChildren(key).forEach(child => child.removeEventListener('*', this.props.handleEvent))
        }
      })
      this.story.addEventListener('drawn', updateData)
      this.story.registerFactory('content', content)
      this.story.addEventListener('childattached', this.handleChildAttach)
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

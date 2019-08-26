import React, { useEffect, useRef } from 'react'
import Story from '../fresco/fusion-story'
import { func, string } from 'prop-types'

const Renderer = props => {
  const mainRef = useRef(null);

  useEffect(() => {
    let { content, updateData } = props
    let story = new Story()

    const { width, height } = mainRef.current.getBoundingClientRect()

    story.registerFactory('content', content)
    // story.addEventListener('drawn', updateData)
    // story.addEventListener('childattached', ({ data: { attachedChild } }) => {
    //   if (attachedChild.getType() !== 'animationManager') {
    //     attachedChild.addEventListener('*', props.handleEvent)
    //     props.handleConfig(attachedChild.config)
    //   }
    // })
    story.setData({
      id: 'main',
      availableWidth: width,
      availableHeight: height
    })
  })

  return <div ref={mainRef} className="main" id="main"></div>
}

Renderer.propTypes = {
  content: func,
  handleConfig: func,
  handleEvent: func,
  id: string,
  updateData: func
}

export default Renderer

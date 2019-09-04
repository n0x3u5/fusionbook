import * as React from 'react'
// import Story from '../fresco/fusion-story'

class Story {
  registerFactory (a, b) {}
  addEventListener (a, b) {}
  setData (a) {}
  remove (a) {}
}

const { useEffect, useRef } = React

const Renderer = ({
  type,
  content,
  onDrawn,
  onEventTrigger,
  onConfigured
}: {
  type: string
  content: Function
  onDrawn: Function
  onEventTrigger: Function
  onConfigured: (config: object) => void
}) => {
  const mainRef = useRef(null)

  useEffect(() => {
    if (type === 'html') {
      content(mainRef.current)
      const childAttrs = mainRef.current.children.length > 0
        ? [...mainRef.current.children[0].attributes]
        : []
      onConfigured(
        Object.fromEntries(
          childAttrs.map(({ name, value }) => [name, value])
        )
      )
      onDrawn()
    } else {
      let story = new Story()

      const { width, height } = mainRef.current.getBoundingClientRect()
      story.registerFactory('content', content)
      story.addEventListener('drawn', onDrawn)
      story.addEventListener(
        'childattached',
        ({
          data: { attachedChild }
        }: {
          data: { attachedChild }
        }) => {
          if (attachedChild.getType() !== 'animationManager') {
            attachedChild.addEventListener('*', onEventTrigger)
            onConfigured(attachedChild.config)
          }
        }
      )
      story.setData({
        id: 'main',
        availableWidth: width,
        availableHeight: height
      })

      return () => story.remove({ instant: false })
    }
  })

  return <div ref={mainRef} className="main" id="main"></div>
}

export default Renderer

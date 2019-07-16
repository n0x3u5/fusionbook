import { Story } from '../src/lib/story'

import Note from '../src/lib/metas/note.js'
import Config from '../src/lib/metas/config.js'
import Event from '../src/lib/metas/event.js'

import Rectangle from '../components/rectangle.js'

const rectangleStory = new Story('Rectangle')

rectangleStory.addChapter('with defaults', {
  content: story => {
    const { availableWidth, availableHeight } = story.config
    const rectangle = story.attachChild(Rectangle, 'rect')

    rectangle.setDimension(availableWidth, availableHeight)
  },
  meta: [
    new Note('This is the rectangle as it appears by default, when its provided a width of 300 and a height of 300'),
    new Config(),
    new Event()
  ]
})

rectangleStory.addChapter('with a small size', {
  content: story => {
    const rectangle = story.attachChild(Rectangle, 'rect')

    rectangle.setDimension(30, 30)
  },
  meta: [
    new Note(
      'This is the rectangle as it appears when its width and height are 30px'
    ),
    new Config(),
    new Event()
  ]
})

rectangleStory.addChapter('with a orange color', {
  content: story => {
    const { availableWidth, availableHeight } = story.config
    const rectangle = story.attachChild(Rectangle, 'rect')

    rectangle.configure({ fill: 'orange' })

    rectangle.setDimension(availableWidth, availableHeight)
  },
  meta: [
    new Note(
      'This is the rectangle as it appears when its color is orange'
    ),
    new Config(),
    new Event()
  ]
})

export default rectangleStory

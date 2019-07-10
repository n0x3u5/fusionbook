import { Story } from '../src/lib/story'

import Note from '../src/lib/metas/note.js'
import Config from '../src/lib/metas/config.js'
import Event from '../src/lib/metas/event.js'

import Rectangle from '../components/rectangle.js'

const rectangleStory = new Story('Rectangle')

rectangleStory.addChapter('with defaults', {
  content: story => story.attachChild(Rectangle, 'rect'),
  meta: [
    new Note('This is the rectangle as it appears by default'),
    new Config(),
    new Event()
  ]
})

rectangleStory.addChapter('with a small size', {
  content: story =>
    story.attachChild(Rectangle, 'rect').configure({ width: 30, height: 30 }),
  meta: [
    new Note(
      'This is the rectangle as it appears when its width and height are 30px'
    ),
    new Config(),
    new Event()
  ]
})

rectangleStory.addChapter('with a orange color', {
  content: story =>
    story.attachChild(Rectangle, 'rect').configure({ fill: 'orange' }),
  meta: [
    new Note(
      'This is the rectangle as it appears when its width and height are 30px'
    ),
    new Config(),
    new Event()
  ]
})

export default rectangleStory

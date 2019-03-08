import { FrescoParser, Story } from '../src/lib/story'
import Rectangle from './rectangle.js'
import Note from '../src/lib/metas/note.js'

Story.registerParser(FrescoParser)

const rectangleStory = new Story('Legend Item')

rectangleStory.addChapter(
  'with defaults',
  {
    content: story => story.attachChild(Rectangle),
    meta: [
      new Note('This is the legend item as it appears by default')
    ]
  }
)

rectangleStory.addChapter(
  'with background',
  {
    content: story => story.attachChild(Rectangle).configure({ showBackground: true }),
    meta: [
      new Note('This is a legend item with a background')
    ]
  }
)

export default [rectangleStory]

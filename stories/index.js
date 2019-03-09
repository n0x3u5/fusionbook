import { FrescoParser, Story } from '../src/lib/story'
import Rectangle from './rectangle.js'
import Caption from '../../fc-timeseries/src/_internal/components/caption/index.js'
import Note from '../src/lib/metas/note.js'

Story.registerParser(FrescoParser)

const rectangleStory = new Story('Rectangle')

rectangleStory.addChapter(
  'with defaults',
  {
    content: story => story.attachChild(Rectangle, 'rect'),
    meta: [
      new Note('This is the rectangle as it appears by default')
    ]
  }
)

const captionStory = new Story('Caption and Subcaption')

captionStory.addChapter(
  'default Caption appearance with text',
  {
    content: story => story
      .attachChild(Caption, 'caption')
      .configure({ caption: 'Caption' }),
    meta: [
      new Note('Caption with some text as it appears by default')
    ]
  }
)

captionStory.addChapter(
  'default Sub Caption appearance with text',
  {
    content: story => story
      .attachChild(Caption, 'caption')
      .configure({ caption: 'Sub caption' }),
    meta: [
      new Note('Sub Caption with some text as it appears by default')
    ]
  }
)

export default [rectangleStory, captionStory]

import { FrescoParser, Story } from '../src/lib/story'
import Rectangle from './rectangle.js'
import Caption from '../../fc-timeseries/src/_internal/components/caption/index.js'
import Note from '../src/lib/metas/note.js'
import Config from '../src/lib/metas/config.js'
import Event from '../src/lib/metas/event.js'

Story.registerParser(FrescoParser)

const rectangleStory = new Story('Rectangle')

rectangleStory.addChapter(
  'with defaults',
  {
    content: story => story.attachChild(Rectangle, 'rect'),
    meta: [
      new Note('This is the rectangle as it appears by default'),
      new Config(),
      new Event()
    ]
  }
)

rectangleStory.addChapter(
  'with a small size',
  {
    content: story => story
      .attachChild(Rectangle, 'rect')
      .configure({ width: 30, height: 30 }),
    meta: [
      new Note('This is the rectangle as it appears when its width and height are 30px'),
      new Config(),
      new Event()
    ]
  }
)

const captionStory = new Story('Caption and Sub Caption')

captionStory.addChapter(
  'default Caption appearance with text',
  {
    content: story => story
      .attachChild(Caption, 'caption')
      .configure({ caption: 'Caption' }),
    meta: [
      new Note('Caption with some text as it appears by default'),
      new Config(),
      new Event()
    ]
  }
)

captionStory.addChapter(
  'default Sub Caption appearance with text',
  {
    content: story => story
      .attachChild(Caption, 'caption')
      .configure({ subCaption: 'Sub Caption' }),
    meta: [
      new Note('Sub Caption with some text as it appears by default'),
      new Config(),
      new Event()
    ]
  }
)

captionStory.addChapter(
  'Caption and Sub Caption together',
  {
    content: story => story
      .attachChild(Caption, 'caption')
      .configure({ caption: 'Caption', subCaption: 'Sub Caption' }),
    meta: [
      new Note('Caption and sub caption together'),
      new Config(),
      new Event()
    ]
  }
)

export default [rectangleStory, captionStory]

import { FrescoParser, Story } from '../src/lib/story'
import Rectangle from './rectangle.js'
import Caption from '../../fc-timeseries/src/_internal/components/caption/index.js'
import Note from '../src/lib/metas/note.js'
import Config from '../src/lib/metas/config.js'
import Event from '../src/lib/metas/event.js'
import TimeInstanceMarker from '../../fc-timeseries/src/_internal/components/time-instance-marker'
import TimeScale from '../../fc-utils/src/scales/calendar'

TimeInstanceMarker.prototype.addDetailsToParent = function () {
  let { config } = this.getLinkedParent()
  config.padding = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
  config.canvasBGHeight = 200
  config.canvasBGTop = 0
  config.canvasBGLeft = 0
  config.canvasBGWidth = 200
  return this
}

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

rectangleStory.addChapter(
  'with a orange color',
  {
    content: story => story
      .attachChild(Rectangle, 'rect')
      .configure({ fill: 'orange' }),
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

const timeInstnaceStory = new Story('Time Instance')

timeInstnaceStory.addChapter(
  'default Time Instance',
  {
    content: story => story
      .attachChild(TimeInstanceMarker, 'timeInstance')
      .addDetailsToParent()
      .configure({
        timeMarker: [{
          start: '01-01-2000 10 AM',
          label: 'Economic downturn was triggered by {br} tight monetary policy in an effort to {br} fight mounting inflation.',
          timeformat: '%d-%m-%Y %I %p'
        }],
        xScale: new TimeScale()
          .setDomain([946684800000, 946751400000])
          .setRange([0, 200])
      }),
    meta: [
      new Note('Time Instance with some text as it appears by default'),
      new Config(),
      new Event()
    ]
  }
)

timeInstnaceStory.addChapter(
  'with default time format',
  {
    content: story => story
      .attachChild(TimeInstanceMarker, 'timeInstance')
      .addDetailsToParent()
      .configure({
        timeMarker: [{
          start: '01-01-2000 10 AM',
          label: 'Economic downturn was triggered by {br} tight monetary policy in an effort to {br} fight mounting inflation.'
        }],
        xScale: new TimeScale()
          .setDomain([946684800000, 946751400000])
          .setRange([0, 200]),
        defaultFormat: '%d-%m-%Y %I %p'
      }),
    meta: [
      new Note('Time Instance with some text as it appears by default'),
      new Config(),
      new Event()
    ]
  }
)

export default [rectangleStory, captionStory, timeInstnaceStory]

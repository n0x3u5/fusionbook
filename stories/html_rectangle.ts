import { Story, notes } from '../src/lib/story'

import Rectangle from '../components/rectangle'

const rectangleStory = new Story('Rectangle').addMetas([
  { name: 'Configuration' },
  { name: 'Event Log' }
])

rectangleStory.addChapter(
  'with defaults',
  story => {
    story.appendChild(Rectangle, 'rect')
  },
  [
    notes('This is the rectangle as it appears by default.')
  ]
)

rectangleStory.addChapter(
  'with a small size',
  story => {
    story.attachChild(Rectangle, 'rect')
    story.provideDimension({ width: 30, height: 30 })
  },
  [
    notes('This is the rectangle as it appears by default, when its provided a width of 300 and a height of 300.')
  ]
)

rectangleStory.addChapter(
  'with a orange color',
  story => {
    const rectangle = story.attachChild(Rectangle, 'rect')

    rectangle.configure({ fill: 'orange' })
  },
  [
    notes('This is the rectangle as it appears when rendered with an orange fill.')
  ]
)

export default rectangleStory

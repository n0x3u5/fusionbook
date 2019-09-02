import { Story, notes, configs } from '../src/lib/story'
import rectangle from '../components/html/rectangle'

const rectangleStory = new Story('Rectangle').addMetas([configs()])

rectangleStory.addChapter(
  'with defaults',
  story => {
    rectangle(story)
  },
  [
    notes('This is the rectangle as it appears by default.')
  ]
)

rectangleStory.addChapter(
  'with a 30px dimensions',
  story => {
    rectangle(story, { width: '30px', height: '30px' })
  },
  [
    notes('This is the rectangle as it appears by default, with 30px width and height')
  ]
)

rectangleStory.addChapter(
  'with a orange color',
  story => {
    rectangle(story, { bgColor: 'orange' })
  },
  [
    notes('This is the rectangle as it appears when rendered with an orange fill.')
  ]
)

export default rectangleStory

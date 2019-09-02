import { Story, notes, configs } from '../src/lib/story'
import circle from '../components/html/circle'

const circleStory = new Story('Circle').addMetas([configs()])

circleStory.addChapter(
  'with defaults',
  story => {
    circle(story)
  },
  [
    notes('This is the circle as it appears by default.')
  ]
)

circleStory.addChapter(
  'with a 30px dimensions',
  story => {
    circle(story, { width: '30px', height: '30px' })
  },
  [
    notes('This is the circle as it appears by default, with 30px width and height')
  ]
)

circleStory.addChapter(
  'with a orange color',
  story => {
    circle(story, { bgColor: 'orange' })
  },
  [
    notes('This is the circle as it appears when rendered with an orange fill.')
  ]
)

export default circleStory

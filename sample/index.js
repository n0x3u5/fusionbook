import { Fresco, Story } from '../dist/main.js'
import Rectangle from './rectangle.js'

Story.registerParser(Fresco)

const rectangleStory = new Story('Legend Item')

rectangleStory.addChapter('with defaults', story =>
  story.attachChild(Rectangle)
)

rectangleStory.addChapter('with background', story =>
  story.attachChild(Rectangle).configure({ showBackground: true })
)

export default rectangleStory

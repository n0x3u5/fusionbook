import { FrescoParser, Story } from '../src/lib/story.js'
import rectangleStory from './rectangle.js'

Story.registerParser(FrescoParser)

export default [rectangleStory]

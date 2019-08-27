import { FrescoParser, Story } from '../src/lib/story.js'
import rectangleStory from './rectangle.js'
import cartesianAxisStory from './cartesian-axis.js'

Story.registerParser(FrescoParser)

export default [rectangleStory, cartesianAxisStory]

import { Story, FrescoParser } from '../src/lib/story'
import rectangleStory from './rectangle'

Story.registerParser(FrescoParser)

export default [rectangleStory]

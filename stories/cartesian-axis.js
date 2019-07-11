import { Story } from '../src/lib/story.js'

import Note from '../src/lib/metas/note.js'
import Config from '../src/lib/metas/config.js'
import Event from '../src/lib/metas/event.js'

import Cartesian from '../../fusioncharts-xt/packages/fc-core/src/axis/cartesian_new.js'

const cartesianAxisStory = new Story('Cartesian Axis')

cartesianAxisStory.addChapter('with defaults', {
  content: story => {
    const cartesianAxis = story.attachChild(Cartesian, 'cartesianAxis')

    global.cartesianAxis = cartesianAxis

    cartesianAxis.addToEnv('number-formatter', { getCleanValue: parseFloat })
    cartesianAxis.configure({})
  },
  meta: [
    new Note('This is the cartesian axis as it appears by default'),
    new Config(),
    new Event()
  ]
})

export default cartesianAxisStory

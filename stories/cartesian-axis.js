import { Story } from '../src/lib/story.js'

import Note from '../src/lib/metas/note.js'
import Config from '../src/lib/metas/config.js'
import Event from '../src/lib/metas/event.js'

import Cartesian from '../../fusioncharts-xt/packages/fc-core/src/axis/cartesian_new.js'

const cartesianAxisStory = new Story('Cartesian Axis')

cartesianAxisStory.addChapter('default (horizontal), axis name', {
  content: story => {
    const { availableWidth, availableHeight } = story.config
    const cartesianAxis = story.attachChild(Cartesian, 'cartesianAxis')

    cartesianAxis.addToEnv('number-formatter', { getCleanValue: parseFloat })
    cartesianAxis.configure({
      axisName: 'Hello World'
    })
    cartesianAxis.setDimension(availableWidth, availableHeight)
  },
  meta: [
    new Note('This is the cartesian axis as it appears by default'),
    new Config(),
    new Event()
  ]
})

cartesianAxisStory.addChapter('default (horizontal), axis name, 30x25', {
  content: story => {
    const cartesianAxis = story.attachChild(Cartesian, 'cartesianAxis')

    cartesianAxis.addToEnv('number-formatter', { getCleanValue: parseFloat })
    cartesianAxis.configure({
      axisName: 'Hello World'
    })
    cartesianAxis.setDimension(30, 25)
  },
  meta: [
    new Note('This is the cartesian axis as it appears by default'),
    new Config(),
    new Event()
  ]
})

cartesianAxisStory.addChapter('vertical, axis name', {
  content: story => {
    const { availableWidth, availableHeight } = story.config
    const cartesianAxis = story.attachChild(Cartesian, 'cartesianAxis')

    cartesianAxis.addToEnv('number-formatter', { getCleanValue: parseFloat })
    cartesianAxis.configure({
      axisName: 'Hello World',
      isVertical: true
    })
    cartesianAxis.setDimension(availableWidth, availableHeight)
  },
  meta: [
    new Note('This is the cartesian axis as it appears by default'),
    new Config(),
    new Event()
  ]
})

cartesianAxisStory.addChapter('vertical, axis name, 25x30', {
  content: story => {
    const cartesianAxis = story.attachChild(Cartesian, 'cartesianAxis')

    cartesianAxis.addToEnv('number-formatter', { getCleanValue: parseFloat })
    cartesianAxis.configure({
      axisName: 'Hello World',
      isVertical: true
    })
    cartesianAxis.setDimension(25, 30)
  },
  meta: [
    new Note('This is the cartesian axis as it appears by default'),
    new Config(),
    new Event()
  ]
})

cartesianAxisStory.addChapter('vertical, axis name bottom', {
  content: story => {
    const { availableWidth, availableHeight } = story.config
    const cartesianAxis = story.attachChild(Cartesian, 'cartesianAxis')

    cartesianAxis.addToEnv('number-formatter', { getCleanValue: parseFloat })
    cartesianAxis.configure({
      axisName: 'Hello World',
      isVertical: true,
      drawAxisNameFromBottom: true
    })
    cartesianAxis.setDimension(availableWidth, availableHeight)
  },
  meta: [
    new Note('This is the cartesian axis as it appears by default'),
    new Config(),
    new Event()
  ]
})

cartesianAxisStory.addChapter('vertical, axis name rotated', {
  content: story => {
    const { availableWidth, availableHeight } = story.config
    const cartesianAxis = story.attachChild(Cartesian, 'cartesianAxis')

    cartesianAxis.addToEnv('number-formatter', { getCleanValue: parseFloat })
    cartesianAxis.configure({
      axisName: 'Hello World',
      isVertical: true,
      rotateAxisName: true
    })
    cartesianAxis.setDimension(availableWidth, availableHeight)
  },
  meta: [
    new Note('This is the cartesian axis as it appears by default'),
    new Config(),
    new Event()
  ]
})

cartesianAxisStory.addChapter('vertical, axis name rotated, 30x25', {
  content: story => {
    const cartesianAxis = story.attachChild(Cartesian, 'cartesianAxis')

    cartesianAxis.addToEnv('number-formatter', { getCleanValue: parseFloat })
    cartesianAxis.configure({
      axisName: 'Hello World',
      isVertical: true,
      rotateAxisName: true
    })
    cartesianAxis.setDimension(30, 25)
  },
  meta: [
    new Note('This is the cartesian axis as it appears by default'),
    new Config(),
    new Event()
  ]
})

cartesianAxisStory.addChapter('vertical, axis name bottom rotated', {
  content: story => {
    const { availableWidth, availableHeight } = story.config
    const cartesianAxis = story.attachChild(Cartesian, 'cartesianAxis')

    cartesianAxis.addToEnv('number-formatter', { getCleanValue: parseFloat })
    cartesianAxis.configure({
      axisName: 'Hello World',
      isVertical: true,
      rotateAxisName: true,
      drawAxisNameFromBottom: true
    })
    cartesianAxis.setDimension(availableWidth, availableHeight)
  },
  meta: [
    new Note('This is the cartesian axis as it appears by default'),
    new Config(),
    new Event()
  ]
})

export default cartesianAxisStory

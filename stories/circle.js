import {
  notes,
  story,
  events,
  chapter,
  configs,
  addMetasTo,
  addChaptersTo
} from '../src/lib/story'

const circleStory = addMetasTo([configs(), events()], story('Circle'))
const addChaptersToCircle = addChaptersTo(circleStory)

const defaultsChapter = chapter(
  'with defaults',
  story => { console.log(story) },
  [notes('A default circle')]
)

const smallSizeChapter = chapter(
  'with a medium size',
  story => { console.log(story) },
  [notes('A 100px by 100px circle')]
)

const orangeChapter = chapter(
  'with green color',
  story => { console.log(story) },
  [notes('An orange circle')]
)

export default addChaptersToCircle([
  defaultsChapter,
  smallSizeChapter,
  orangeChapter
])

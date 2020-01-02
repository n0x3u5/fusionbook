import {
  notes,
  story,
  events,
  chapter,
  configs,
  addMetasTo,
  addChaptersTo
} from '../src/lib/story'

const rectangleStory = addMetasTo([configs(), events()], story('Rectangle'))
const addChaptersToRectangle = addChaptersTo(rectangleStory)

const defaultsChapter = chapter(
  'with defaults',
  story => {
    const div = document.createElement('div');
    const textNode = document.createTextNode('Hello');
    div.appendChild(textNode);
    story.appendChild(div);
  },
  [notes('A default rectangle')]
)

const smallSizeChapter = chapter(
  'with a small size',
  story => { console.log(story) },
  [notes('A 30px by 30px rectangle')]
)

const orangeChapter = chapter(
  'with orange color',
  story => { console.log(story) },
  [notes('An orange rectangle')]
)

export default addChaptersToRectangle([
  defaultsChapter,
  smallSizeChapter,
  orangeChapter
])

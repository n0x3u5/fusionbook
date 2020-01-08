import {
  addChaptersTo,
  addMetasTo,
  smartRendererConfigs,
  smartRendererChapter,
  smartRendererNotes,
  story
} from '../src/lib/story'

const circleStory = addMetasTo([htmlConfigs()], story('Circle'))
const addChaptersToCircle = addChaptersTo(circleStory)

const defaultsChapter = htmlChapter(
  'with defaults',
  story => {
    const div = document.createElement('div');
    const textNode = document.createTextNode('Woah!');
    div.appendChild(textNode);
    story.appendChild(div);
  },
  [htmlNotes('A default circle')]
)

const smallSizeChapter = htmlChapter(
  'with a medium size',
  story => {
    const div = document.createElement('div');
    const textNode = document.createTextNode('Huh?');
    div.appendChild(textNode);
    story.appendChild(div);
  },
  [htmlNotes('A 100px by 100px circle')]
)

const orangeChapter = htmlChapter(
  'with green color',
  story => {
    const div = document.createElement('div');
    const textNode = document.createTextNode('Walalla');
    div.appendChild(textNode);
    story.appendChild(div);
  },
  [htmlNotes('An orange circle')]
)

export default addChaptersToCircle([
  defaultsChapter,
  smallSizeChapter,
  orangeChapter
])

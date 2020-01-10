import {
  addChaptersTo,
  addMetasTo,
  smartRendererConfigs,
  smartRendererChapter,
  smartRendererNotes,
  story
} from '../src/lib/story'
import SRCircle from '../components/component/rectangle';

const circleStory = addMetasTo([smartRendererConfigs()], story('Circle'))
const addChaptersToCircle = addChaptersTo(circleStory)

const defaultsChapter = smartRendererChapter(
  'with defaults',
  story => {
    const srCircle = story.attachChild(SRCircle, 'smart-circle');
    srCircle.configure({});
    return srCircle;
  },
  [smartRendererNotes(`
# Rectangle
## Smart Renderer
### The Perfect Shape

> Have you ever _seen_ a more perfect shape?

> — The Dude (probably)

A Rectangle component can be whatever you want. In order to use it check the following code snippet.
\`\`\`js
parent.attachChild(Rectangle, 'best-rectangle').configure({
  width: 300,
  height: 100
  // ...remaining properties
})
\`\`\`
`)]
)

const smallSizeChapter = smartRendererChapter(
  'with square dimensions',
  story => {
    const srCircle = story.attachChild(SRCircle, 'smart-circle');
    srCircle.configure({ width: 100, height: 100 });
    return srCircle;
  },
  [smartRendererNotes('A 100px by 100px circle')]
)

const greenChapter = smartRendererChapter(
  'with green color',
  story => {
    const srCircle = story.attachChild(SRCircle, 'smart-circle');
    srCircle.configure({ width: 100, height: 100 });
    return srCircle;
  },
  [smartRendererNotes('An orange circle')]
)

export default addChaptersToCircle([
  defaultsChapter,
  smallSizeChapter,
  greenChapter
])

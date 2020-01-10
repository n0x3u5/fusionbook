import {
  addChaptersTo,
  addMetasTo,
  htmlConfigs,
  htmlChapter,
  htmlNotes,
  story
} from '../src/lib/story';

const rectangleStory = addMetasTo([htmlConfigs()], story('Rectangle'));
const addChaptersToRectangle = addChaptersTo(rectangleStory);

const defaultsChapter = htmlChapter(
  'with defaults',
  story => {
    const div = document.createElement('div');
    const textNode = document.createTextNode('Hello');
    div.appendChild(textNode);
    story.appendChild(div);

    return div;
  },
  [htmlNotes('A default rectangle')]
);

const smallSizeChapter = htmlChapter(
  'with a small size',
  story => {
    const div = document.createElement('div');
    const textNode = document.createTextNode('Behold');
    div.appendChild(textNode);
    story.appendChild(div);

    return div;
  },
  [htmlNotes('A 30px by 30px rectangle')]
)

const orangeChapter = htmlChapter(
  'with orange color',
  story => {
    const div = document.createElement('div');
    const textNode = document.createTextNode('Unlimited Power');
    div.appendChild(textNode);
    story.appendChild(div);

    return div;
  },
  [htmlNotes('An orange rectangle')]
)

export default addChaptersToRectangle([
  defaultsChapter,
  smallSizeChapter,
  orangeChapter
]);

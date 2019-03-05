// import storyOf from './story-of';
// import addChapter from './add-chapter';

import React from 'react'
import { render } from 'react-dom'

import Book from './components/react/book'

render(<Book stories={ stories } />, document.querySelector('#container'))

// const rectangleStory = storyOf('Rectangle');

// addChapter(
//   'default',
//   story => {
//     story.registerFactory(
//       'defaultRectangle',
//       () => story.attachChild(Rectangle, 'defaultRectangle')
//     );
//     story.setData({});
//   },
//   rectangleStory
// );

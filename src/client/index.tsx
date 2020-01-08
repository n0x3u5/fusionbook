import * as React from 'react';
import * as ReactDOM from 'react-dom';
import stories from '../../stories/index';
import './index.css';
import Book from './components/react/book';

import X from './components/fresco/fusion-story';

console.log(new X());

const el = document.createElement('div');
el.setAttribute('id', 'fusionbook-root');
document.body.appendChild(el);

// Ignore type check for createRoot since it does not exist on the types for
// stable React and the experimental types are not working through ts-loader.
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// ReactDOM.render(
//   <TableOfContents stories={stories} />,
//   document.querySelector('#fusionbook-root')
// );
ReactDOM.createRoot(document.querySelector('#fusionbook-root')).render(
  <Book stories={stories} />
);

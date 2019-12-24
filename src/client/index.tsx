import * as React from 'react';
import * as ReactDOM from 'react-dom';
import stories from '../../stories/index';
import TableOfContents from './components/react/table-of-contents';
// import Book from './components/react/book'
import './index.css';

const el = document.createElement('div');
el.setAttribute('id', 'fusionbook-root');
document.body.appendChild(el);

ReactDOM.render(
  <React.StrictMode>
    <TableOfContents stories={stories} />
  </React.StrictMode>,
  // <Book stories={stories} />
  document.querySelector('#fusionbook-root')
);

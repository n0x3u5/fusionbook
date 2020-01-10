import * as React from 'react';
import * as ReactDOM from 'react-dom';
import stories from '../../stories/index';
import './index.css';
import Book from './components/react/book';

const el = document.createElement('div');
el.setAttribute('id', 'fusionbook-root');
document.body.appendChild(el);

ReactDOM.render(
  <Book stories={stories} />,
  document.querySelector('#fusionbook-root')
);

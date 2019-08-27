import * as React from 'react'
import * as ReactDOM from 'react-dom'

import 'semantic-ui-css/semantic.min.css'

import Book from './components/react/book'

import stories from '../../stories/index'

ReactDOM.render(
  <Book stories={stories}/>,
  document.querySelector('#fusionbook-root')
)

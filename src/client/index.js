import React from 'react'
import { render } from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import Book from './components/react/book'
// temporary changes to see the structure
const stories = [
  {
    name: 'hello',
    chapters: [
      'yo'
    ]
  }
]

render(<Book stories={stories}/>, document.querySelector('#fusionbook-root'))

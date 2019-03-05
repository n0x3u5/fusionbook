import React from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'

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

render(<Book stories={stories}/>, document.querySelector('#container'))

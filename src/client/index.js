import React from 'react'
import { render } from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import Book from './components/react/book'
// temporary changes to see the structure
const stories = [
  {
    name: 'Legend',
    chapters: [
      {
        name: 'default'
      },
      {
        name: 'with background'
      }
    ]
  },
  {
    name: 'Caption',
    chapters: [
      {
        name: 'default'
      },
      {
        name: 'with background'
      }
    ]
  }
]

render(<Book stories={stories}/>, document.querySelector('#fusionbook-root'))

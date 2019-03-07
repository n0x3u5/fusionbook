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
        name: 'default',
        content: () => {
          console.log('hello')
        }
      },
      {
        name: 'with background',
        content: () => {
          console.log('hello')
        }
      }
    ]
  },
  {
    name: 'Caption',
    chapters: [
      {
        name: 'default',
        content: () => {
          console.log('hello')
        }
      },
      {
        name: 'with background',
        content: () => {
          console.log('hello')
        }
      }
    ]
  }
]

render(<Book stories={stories}/>, document.querySelector('#fusionbook-root'))

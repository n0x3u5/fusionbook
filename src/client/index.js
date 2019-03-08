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
        content: {
          meta: [{
            name: 'chapter',
            info: 'its all about the chapter'
          },
          {
            name: 'Events',
            info: 'its all about the Events'
          }]
        }
      },
      {
        name: 'with background',
        content: {
          meta: [{
            name: 'chapter',
            info: 'its all about the chapter'
          }]
        }
      }
    ]
  },
  {
    name: 'Caption',
    chapters: [
      {
        name: 'default',
        content: {
          meta: [{
            name: 'chapter',
            info: 'its all about the chapter'
          }]
        }
      },
      {
        name: 'with background',
        content: {
          meta: [{
            name: 'chapter',
            info: 'its all about the chapter'
          }]
        }
      }
    ]
  }
]

render(<Book stories={stories}/>, document.querySelector('#fusionbook-root'))

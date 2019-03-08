import React from 'react'
import { render } from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import Book from './components/react/book'

import stories from '../../stories/index.js'

render(<Book stories={stories}/>, document.querySelector('#fusionbook-root'))

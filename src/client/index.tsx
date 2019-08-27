import * as React from 'react'
import * as ReactDOM from 'react-dom'

import 'semantic-ui-css/semantic.min.css'

import stories from '../../stories/index'

const a = 'hi'

console.log(stories);

ReactDOM.render(
  <div id={a}>Hello!</div>,
  document.querySelector('#fusionbook-root')
)

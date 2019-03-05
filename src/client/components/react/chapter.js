import React from 'react'
import { string } from 'prop-types'

const Chapter = ({ chapterName = '' }) => (
  <li>
    {chapterName}
    <div>Hello</div>
  </li>
)

Chapter.propTypes = {
  chapterName: string
}

export default Chapter

import React from 'react'
import { string } from 'prop-types'

const Chapter = ({ chapterName = '' }) => (
  <li>
    {chapterName}
  </li>
)

Chapter.propTypes = {
  chapterName: string
}

export default Chapter

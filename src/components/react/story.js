import React from 'react'
import { string, array } from 'prop-types'

import Chapter from './chapter'

const createChapter = (chapter = '', idx) => (
  <Chapter chapterName={chapter} key={idx} />
)
const createChapters = (chapters = []) => chapters.map(createChapter)

let Story = ({ storyName = '', chapters = [] }) => {
  return (
    <li>
      {storyName}
      <ul>{createChapters(chapters)}</ul>
    </li>
  )
}

Story.propTypes = {
  storyName: string,
  chapters: array
}

export default Story

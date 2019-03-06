import React from 'react'
import { string, array, number, func } from 'prop-types'

import Chapter from './chapter'
import { Accordion, Icon } from 'semantic-ui-react'

const createChapter = (chapter = {}, idx) => (
  <Chapter chapterName={chapter.name} key={idx} />
)
const createChapters = (chapters = []) => chapters.map(createChapter)

let Story = ({ storyName = '', chapters = [], activeIndex, index, handleClick }) => {
  return (
    <React.Fragment>
      <Accordion.Title active={activeIndex === index} index={index} onClick={handleClick}>
        <Icon name='dropdown' />
        {storyName}
      </Accordion.Title>
      <Accordion.Content active={activeIndex === index}>
        {createChapters(chapters)}
      </Accordion.Content>
    </React.Fragment>
  )
}

Story.propTypes = {
  storyName: string,
  chapters: array,
  activeIndex: number,
  index: number,
  handleClick: func
}

export default Story

import React from 'react'
import Story from './story'
import { array } from 'prop-types'

const createStory = (story = {}, idx) => (
  <Story key={idx} storyName={story.name} chapters={story.chapters} />
)
const createStories = stories => stories.map(createStory)

const Contents = ({ stories }) => {
  return (<ul>{createStories(stories)}</ul>)
}

Contents.propTypes = {
  stories: array
}

export default Contents

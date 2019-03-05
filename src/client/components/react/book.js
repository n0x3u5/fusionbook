import React from 'react'
import Story from './story'
import { array } from 'prop-types'

const createStory = (story = {}, idx) => (
  <Story key={idx} storyName={story.name} chapters={story.chapters} />
)
const createStories = stories => stories.map(createStory)

const Book = ({ stories = [] }) => {
  return <ul>{createStories(stories)}</ul>
}

Book.propTypes = {
  stories: array
}

export default Book

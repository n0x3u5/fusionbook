import React from 'react'
import Story from './story'
import { array } from 'prop-types'
import SeacrhBar from './search-bar'

const createStory = (story = {}, idx) => (
  <Story key={idx} storyName={story.name} chapters={story.chapters} />
)
const createStories = stories => stories.map(createStory)

const Contents = ({ stories }) => {
  return (
    <div>
      <h1>FusionBook</h1>
      <SeacrhBar stories={stories.map(({ name }) => {
        return {
          title: name
        }
      })}/>
      <ul>{createStories(stories)}</ul>
    </div>
  )
}

Contents.propTypes = {
  stories: array
}

export default Contents

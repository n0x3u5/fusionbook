import * as React from 'react'
import Accordion from 'semantic-ui-react/dist/es/modules/Accordion/Accordion'
import Icon from 'semantic-ui-react/dist/es/elements/Icon'
import List from 'semantic-ui-react/dist/es/elements/List'
import ListItem from 'semantic-ui-react/dist/es/elements/List/ListItem'

import SearchBar from './search-bar'

import { Story } from '../../../lib/story'

const TableOfContents = (props: { stories: Story[] }) => {
  const { stories } = props
  const [activeIndex, setActiveIndex] = React.useState(0);

  const createStories = () => {
    const createChapters = (chapters, storyIndex) => {
      return chapters.map((chapter, id) => (
        <ListItem key={id}>{chapter.name}</ListItem>
      ))
    }

    return stories.map((story: Story, idx: number) => {
      return (
        <React.Fragment key={idx}>
          <Accordion.Title active={activeIndex === idx} index={idx}>
            <Icon name='dropdown' /> {story.name}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === idx}>
            <List bulleted>
              {createChapters(story.chapters, idx)}
            </List>
          </Accordion.Content>
        </React.Fragment>
      )
    })
  }

  return (
    <div className="sidebar">
      <h2>FusionBook</h2>
      <SearchBar stories={stories} />
      <Accordion>
        {createStories()}
      </Accordion>
    </div>
  )
}

export default TableOfContents

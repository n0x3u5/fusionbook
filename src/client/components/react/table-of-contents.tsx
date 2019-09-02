import * as React from 'react'
import Icon from 'semantic-ui-react/dist/es/elements/Icon'
import List from 'semantic-ui-react/dist/es/elements/List'
import ListItem from 'semantic-ui-react/dist/es/elements/List/ListItem'
import Accordion from 'semantic-ui-react/dist/es/modules/Accordion/Accordion'
import { Story, Chapter } from '../../../lib/story'

const { useState } = React

const TableOfContents = ({
  stories,
  onChapterSelect
}: {
  stories: Story[]
  onChapterSelect: (storyIdx: number, chapterIdx: number) => void
}) => {
  const [openedStoryIndex, setOpenedStoryIndex] = useState(0)
  const [activeStoryChapterID, setActiveStoryChapterID] = useState('0-0')

  const storyClickHandler = (e, { index }: { index: number }) =>
    setOpenedStoryIndex(index)

  const createChapter = (chapter: Chapter, id: string) => (
    <ListItem
      key={id}
      active={activeStoryChapterID === id}
      onClick={() => {
        const [storyIdx, chapterIdx] = id.split('-')

        setActiveStoryChapterID(id)
        onChapterSelect(+storyIdx, +chapterIdx)
      }}
    >
      {chapter.name}
    </ListItem>
  )
  const createStory = (story: Story, storyIdx: number) => (
    <React.Fragment key={storyIdx}>
      <Accordion.Title
        active={openedStoryIndex === storyIdx}
        index={storyIdx}
        onClick={storyClickHandler}
      >
        <Icon name="dropdown" /> {story.name}
      </Accordion.Title>
      <Accordion.Content active={openedStoryIndex === storyIdx}>
        <List bulleted>
          {story.chapters.map((chapter, chapterIdx) =>
            createChapter(chapter, storyIdx + '-' + chapterIdx)
          )}
        </List>
      </Accordion.Content>
    </React.Fragment>
  )

  return (
    <div className="sidebar">
      <h2>FusionBook</h2>
      <Accordion>{stories.map(createStory)}</Accordion>
    </div>
  )
}

export default TableOfContents

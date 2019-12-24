import * as React from 'react'
import SearchBar from './search-bar'
import { Story, Chapter } from '../../../lib/story/index'

const { useState } = React

const TOCStory = () => {}

const TableOfContents = ({
  stories,
  onChapterSelect
}: {
  stories: ReadonlyArray<Story>
  onChapterSelect?: (storyIdx: null | string, chapterIdx: string) => void
}): React.ReactComponentElement<'div'> => {
  const [yoStories, setYoStories] = useState(stories)
  const [openedStoryID, setOpenedStoryID] = useState(
    yoStories.length
      ? yoStories[0].chapters.length
        ? yoStories[0].chapters[0].ownerID
        : null
      : null
  )
  const [activeStoryID, setActiveStoryID] = useState(
    yoStories.length
      ? yoStories[0].chapters.length
        ? yoStories[0].chapters[0].ownerID
        : null
      : null
  )
  const [activeChapterID, setActiveChapterID] = useState(
    yoStories.length
      ? yoStories[0].chapters.length
        ? yoStories[0].chapters[0].id
        : null
      : null
  )

  const createChapter = (
    chapter: Chapter
  ): React.ReactComponentElement<'li'> => (
    <li
      key={chapter.id}
      className={
        chapter.id === activeChapterID && chapter.ownerID === activeStoryID
          ? 'active'
          : undefined
      }
      onClick={(): void => {
        const { ownerID, id } = chapter

        setActiveStoryID(ownerID)
        setActiveChapterID(id)

        if (onChapterSelect) onChapterSelect(ownerID, id)
      }}
    >
      {chapter.name}
    </li>
  )

  const createStory = (story: Story): React.ReactComponentElement<'li'> => (
    <li key={story.id} onClick={(): void => setOpenedStoryID(story.id)}>
      {story.name}
      {story.id === openedStoryID ? (
        <ul>{story.chapters.map(createChapter)}</ul>
      ) : null}
    </li>
  )

  return (
    <div className="sidebar">
      <h2>FusionBook</h2>
      <SearchBar stories={stories} onSearch={(s): void => setYoStories(s)} />
      <ul>{yoStories.map(createStory)}</ul>
    </div>
  )
}

export default TableOfContents

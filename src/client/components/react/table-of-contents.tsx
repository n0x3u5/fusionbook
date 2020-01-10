import * as React from 'react';
import { Chapter, Story } from '../../../lib/story/index';
import SearchBar from './search-bar';

const { useState } = React;

const TableOfContents = ({
  stories,
  activeStoryID,
  activeChapterID,
  onChapterSelect
}: {
  stories: ReadonlyArray<Story>
  activeStoryID: string | null
  activeChapterID: string | null
  onChapterSelect?: <T>(chapter: Chapter<T>) => void
}): React.ReactComponentElement<'div'> => {
  const [tocStories, setTOCStories] = useState(stories);
  const [isAllOpened, setIsAllOpened] = useState(false);
  const [openedStoryID, setOpenedStoryID] = useState(activeStoryID);

  const createChapter = <T extends unknown>(
    chapter: Chapter<T>
  ): React.ReactComponentElement<'li'> => (
    <li
      key={chapter.id}
      className={
        chapter.id === activeChapterID && chapter.ownerID === activeStoryID
          ? 'active'
          : undefined
      }
      onClick={(): void => {
        if (onChapterSelect) onChapterSelect(chapter);
      }}
    >
      {chapter.name}
    </li>
  );

  const createStory = (story: Story): React.ReactComponentElement<'li'> => (
    <li key={story.id} onClick={(): void => setOpenedStoryID(story.id)}>
      <span className={story.id === activeStoryID ? 'active' : undefined}>
        {story.name}
      </span>
      {story.id === openedStoryID || isAllOpened ? (
        <ul>{story.chapters.map(createChapter)}</ul>
      ) : null}
    </li>
  );

  return (
    <div className="table-of-contents">
      <h2 className="title">FusionBook</h2>
      <SearchBar
        stories={stories}
        onSearch={(s, t): void => {
          if (t.length > 0) {
            setIsAllOpened(true);
          } else {
            setIsAllOpened(false);
          }

          setTOCStories(s);
        }}
      />
      <ul>{tocStories.map(createStory)}</ul>
    </div>
  );
};

export default TableOfContents;

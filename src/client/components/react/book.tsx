import * as React from 'react';
import { Story } from '../../../lib/story/index';
import MetaInfo from './meta-info';
import Renderer from './renderer';
import TableOfContents from './table-of-contents';
import useLocalStorage from './useLocalStorage';

const { useState } = React;

const Book = ({
  stories
}: {
  stories: ReadonlyArray<Story>
}): React.ReactElement => {
  const [activeStoryID, setActiveStoryID] = useLocalStorage(
    'activeStoryID',
    stories.length
      ? stories[0].chapters.length
        ? stories[0].chapters[0].ownerID
        : undefined
      : undefined
  );
  const [activeChapterID, setActiveChapterID] = useLocalStorage(
    'activeChapterID',
    stories.length
      ? stories[0].chapters.length
        ? stories[0].chapters[0].id
        : undefined
      : undefined
  );
  const [activeChapterBase, setActiveChapterBase] = useState();

  const activeStory = stories.find(story => story.id === activeStoryID);
  const activeChapter = activeStory?.chapters.find(
    chapter => chapter.id === activeChapterID
  );

  return (
    <>
      <TableOfContents
        stories={stories}
        activeStoryID={activeStoryID}
        activeChapterID={activeChapterID}
        onChapterSelect={(chapter): void => {
          const { ownerID, id } = chapter;

          setActiveStoryID(ownerID);
          setActiveChapterID(id);
        }}
      />
      <Renderer chapter={activeChapter} readyHandler={setActiveChapterBase} />
      {activeChapter && (
        <MetaInfo
          key={activeChapterID}
          chapter={activeChapter}
          chapterBase={activeChapterBase}
        />
      )}
    </>
  );
};

export default Book;

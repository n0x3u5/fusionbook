import * as React from 'react';
import { Story } from '../../../lib/story/index';
import Renderer from './renderer';
import MetaInfo from './meta-info'
import TableOfContents from './table-of-contents';
import useLocalStorage from './useLocalStorage';

// const isMeta = (metaName: string): (({ name: string }) => boolean) => ({
//   name
// }: {
//   name: string
// }): boolean => name === metaName
// const isMetaEventLog = isMeta('Event Log')
// const isMetaConfiguration = isMeta('Configuration')

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
        : null
      : null
  );
  const [activeChapterID, setActiveChapterID] = useLocalStorage(
    'activeChapterID',
    stories.length
      ? stories[0].chapters.length
        ? stories[0].chapters[0].id
        : null
      : null
  );

  const activeStory = stories.find(story => story.id === activeStoryID);
  const activeChapter = activeStory?.chapters.find(
    chapter => chapter.id === activeChapterID
  );
  console.log(stories)
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
      <Renderer content={activeChapter?.content} />
      <MetaInfo metas={activeChapter?.metas} />
    </>
  );
};

export default Book;

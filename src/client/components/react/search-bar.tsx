import * as React from 'react';
import { Story } from '../../../lib/story/index';

const { useState } = React;

const includesCaseInsensitive = (domain: string, subject: string): boolean =>
  domain.toLowerCase().includes(subject.toLowerCase());
const isEmpty = (arr: readonly unknown[]): boolean => arr.length === 0;

const SearchBar = ({
  stories = [],
  onSearch
}: {
  stories?: ReadonlyArray<Story>
  onSearch?: (stories: ReadonlyArray<Story>, searchText: string) => void
}): React.ReactComponentElement<'input'> => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = ({
    target: { value }
  }: {
    target: { value: string }
  }): void => {
    setSearchText(value);

    const nameHasSearchText = ({ name }: { name: string }): boolean =>
      includesCaseInsensitive(name, value);

    const matchStoriesReducer = (
      acc: ReadonlyArray<Story>,
      story: Story
    ): ReadonlyArray<Story> => {
      const chapters = story.chapters.filter(nameHasSearchText);

      if (!isEmpty(chapters)) {
        return acc.concat({ ...story, chapters });
      } else if (nameHasSearchText(story)) {
        return acc.concat(story);
      } else {
        return acc;
      }
    };

    const matchingStories = stories.reduce(matchStoriesReducer, []);

    if (onSearch) onSearch(matchingStories, value);
  };

  return <input type="text" value={searchText} onChange={handleSearchChange} />;
};

export default SearchBar;

import * as React from 'react'

import Search from 'semantic-ui-react/dist/es/modules/Search'

import { Story, Chapter } from '../../../lib/story'

const { useState } = React;
const includesCaseInsensitive = (domain, subject: string) : string => domain.toLowercase().includes(subject.toLowerCase())
const nonEmptyStories = story => story.chapters.length > 0

const SearchBar = ({ stories, filterContents }: { stories: Story[], filterContents: Function }) => {
  const [value, setValue] = useState('')

  const handleSearchChange = (e, { value: val }: { value: string }) => {
    setValue(val)

    const matchingEntities = (entity: Story | Chapter) =>
      includesCaseInsensitive(entity.name, val),
      matchChapters = story => ({
        ...story,
        chapters: story.chapters.filter(matchingEntities)
      })

    const storiesWithMatchingChapters = stories
      .map(matchChapters)
      .filter(nonEmptyStories);

    if (storiesWithMatchingChapters.length) {
      filterContents(storiesWithMatchingChapters)
    } else {
      filterContents(stories.filter(matchingEntities))
    }
  }

  return <Search value={value} onSearchChange={handleSearchChange} />
}

export default SearchBar;

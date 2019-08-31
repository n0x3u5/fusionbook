import * as React from 'react'

import Search from 'semantic-ui-react/dist/es/modules/Search'

import { Story } from '../../../lib/story'

const { useState } = React;

const SearchBar = (props: { stories: Story[] }) => {
  const { stories } = props
  const [value, setValue] = useState('')
  const handleSearchChange = (e, d: { value: string }) => {
    const { value } = d
    const valueLowerCase = value.toLowerCase()
    setValue(value)

    const storiesWithMatchingChapters = stories
      .map(story => {
        return {
          ...story,
          chapters: story.chapters.filter(chapter => {
            return chapter.name.toLowerCase().includes(valueLowerCase)
          })
        }
      })
      .filter(story => story.chapters.length > 0);

    if (storiesWithMatchingChapters.length === 0) {
      stories.filter(story => story.name.toLowerCase().includes(valueLowerCase))
    } else {
      storiesWithMatchingChapters
    }
  }

  return <Search value={value} onSearchChange={handleSearchChange} />
}

export default SearchBar;

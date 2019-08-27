import * as React from 'react'

import './book.css'

import TableOfContents from './table-of-contents'

import { Story } from '../../../lib/story'

const Book = (props: { stories: Story[] }) => {
  return <TableOfContents stories={props.stories} />
}

export default Book

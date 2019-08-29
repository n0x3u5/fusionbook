import * as React from 'react'

import './book.css'

import TableOfContents from './table-of-contents'

import { Story } from '../../../lib/story'

const Book = (props: { stories: Story[] }) => {
  return (
    <div className="page">
      <TableOfContents stories={props.stories} />
      <div className="content"></div>
    </div>
  )
}

export default Book

import React, { Component } from 'react'
import { array } from 'prop-types'
import TableOfContents from './table-of-contents'
import Content from './content'
import './book.css'

class Book extends Component {
  constructor () {
    super()
    this.state = {
      contentMeta: []
    }
    this.handlerChapterClick = (storyIndex, chapterIndex) => {
      let { stories } = this.props

      this.setState({
        contentMeta: stories[storyIndex].chapters[chapterIndex].content.meta
      })
    }
  }

  static getDerivedStateFromProps ({ stories }, { contentMeta }) {
    return {
      contentMeta: contentMeta.length ? contentMeta : stories[0].chapters[0].content.meta
    }
  }

  render () {
    let { stories } = this.props
    let { contentMeta } = this.state
    return (
      <div className="page">
        <div className="sidebar">
          <TableOfContents stories={stories} handlerChapterClick={this.handlerChapterClick}/>
        </div>
        <div className="content">
          <div className="main"></div>
          <div className="footer">
            <Content tabs={contentMeta}>
            </Content>
          </div>
        </div>
      </div>
    )
  }
}

Book.propTypes = {
  stories: array
}

export default Book

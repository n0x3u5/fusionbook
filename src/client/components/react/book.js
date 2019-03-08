import React, { Component } from 'react'
import { array } from 'prop-types'
import TableOfContents from './table-of-contents'
import Content from './content'
import './book.css'
import Renderer from './renderer'

class Book extends Component {
  constructor () {
    super()
    this.state = {
      currentContent: {}
    }
    this.handleChapterClick = (storyIndex, chapterIndex) => {
      let { stories } = this.props

      this.setState({
        currentContent: stories[storyIndex].chapters[chapterIndex].content
      })
    }
  }

  static getDerivedStateFromProps ({ stories }, { currentContent }) {
    return {
      currentContent: Object.keys(currentContent).length ? currentContent : stories[0].chapters[0].content
    }
  }

  render () {
    let { stories } = this.props
    let { currentContent } = this.state
    return (
      <div className="page">
        <TableOfContents stories={stories} handleChapterClick={this.handleChapterClick}/>
        <div className="content">
          <Renderer content={currentContent.content}></Renderer>
          <Content tabs={currentContent.meta}>
          </Content>
        </div>
      </div>
    )
  }
}

Book.propTypes = {
  stories: array
}

export default Book

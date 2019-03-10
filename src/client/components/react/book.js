import React, { Component } from 'react'
import { array } from 'prop-types'
import TableOfContents from './table-of-contents'
import Content from './content'
import './book.css'
import Renderer from './renderer'

const emptyFunc = function () { /* empty function */ }

class Book extends Component {
  constructor () {
    super()
    this.state = {
      id: '0-0',
      componentContent: emptyFunc,
      metaContent: []
    }
    this.handleChapterClick = (storyIndex, chapterIndex) => {
      let { stories } = this.props
      let { content } = stories[storyIndex].chapters[chapterIndex]

      this.setState({
        id: storyIndex + '-' + chapterIndex,
        componentContent: content.content,
        metaContent: content.meta
      })
      this.metaContent = content.meta
    }

    this.handleConfig = config => {
      let metaContent = this.metaContent ? [...this.metaContent] : [...this.state.metaContent]
      let configIndex = metaContent.findIndex(({ name }) => name === 'Configuration')
      if (configIndex !== undefined) {
        const configInfo = Object.assign({}, metaContent[configIndex])
        configInfo.info = config
        metaContent[configIndex] = configInfo
      }
      this.metaContent = metaContent
    }
    this.handleEvent = event => {
      let metaContent = this.metaContent ? [...this.metaContent] : [...this.state.metaContent]
      let eventIndex = metaContent.findIndex(({ name }) => name === 'Event')
      if (eventIndex !== undefined) {
        const eventInfo = Object.assign({}, metaContent[eventIndex])
        if (Array.isArray(eventInfo.info)) {
          eventInfo.info = [...eventInfo.info, event]
        } else {
          eventInfo.info = [event]
        }
        metaContent[eventIndex] = eventInfo
      }
      this.metaContent = metaContent
    }
    this.updateData = () => {
      this.setState({
        metaContent: this.metaContent
      })
    }
  }

  static getDerivedStateFromProps ({ stories }, { componentContent, metaContent }) {
    if (componentContent === emptyFunc) {
      const defaultContent = stories[0].chapters[0].content
      componentContent = defaultContent.content
      metaContent = defaultContent.meta
    }
    return {
      componentContent,
      metaContent
    }
  }

  render () {
    let { stories } = this.props
    let { componentContent, metaContent, id } = this.state
    return (
      <div className="page">
        <TableOfContents stories={stories} handleChapterClick={this.handleChapterClick}/>
        <div className="content">
          <Renderer content={componentContent} handleConfig={this.handleConfig} id={id} handleEvent={this.handleEvent} updateData={this.updateData}></Renderer>
          <Content tabs={metaContent}>
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

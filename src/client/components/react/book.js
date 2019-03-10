import React, { Component } from 'react'
import { array } from 'prop-types'
import TableOfContents from './table-of-contents'
import MetaInfo from './meta-info'
import './book.css'
import Renderer from './renderer'

const isMeta = metaName => ({ name }) => name === metaName
const isMetaConfig = isMeta('Configuration')
const isMetaEventLog = isMeta('Event Log')

class Book extends Component {
  constructor (props) {
    super(props)

    const defaultContent = props.stories[0].chapters[0].content

    this.state = {
      id: '0-0',
      componentContent: defaultContent.content,
      metaContent: defaultContent.meta
    }

    this.handleChapterClick = (storyIndex, chapterIndex) => {
      let { stories } = this.props
      let { content } = stories[storyIndex].chapters[chapterIndex]
      let id = storyIndex + '-' + chapterIndex
      if (id !== this.state.id) {
        this.setState({
          id: storyIndex + '-' + chapterIndex,
          componentContent: content.content,
          metaContent: content.meta
        })
        this.metaContent = content.meta
      }
    }

    this.handleConfig = config => {
      let metaContent = this.metaContent
        ? [...this.metaContent]
        : [...this.state.metaContent]

      let configIndex = metaContent.findIndex(isMetaConfig)

      if (configIndex !== undefined) {
        const configInfo = Object.assign({}, metaContent[configIndex])
        configInfo.info = config
        metaContent[configIndex] = configInfo
      }
      this.metaContent = metaContent
    }

    this.handleEvent = event => {
      let metaContent = this.metaContent
        ? [...this.metaContent]
        : [...this.state.metaContent]

      let eventIndex = metaContent.findIndex(isMetaEventLog)

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

  render () {
    let { stories } = this.props
    let { componentContent, metaContent, id } = this.state
    return (
      <div className="page">
        <TableOfContents
          stories={stories}
          handleChapterClick={this.handleChapterClick}
        />
        <div className="content">
          <Renderer
            content={componentContent}
            handleConfig={this.handleConfig}
            id={id}
            handleEvent={this.handleEvent}
            updateData={this.updateData}
          ></Renderer>
          <MetaInfo tabs={metaContent}></MetaInfo>
        </div>
      </div>
    )
  }
}

Book.propTypes = {
  stories: array
}

export default Book

import React, { Component, Fragment } from 'react'
import { array } from 'prop-types'
import SeacrhBar from './search-bar'
import { Accordion, Icon, List } from 'semantic-ui-react'

class TableOfContents extends Component {
  constructor () {
    super()
    this.state = { activeIndex: -1 }
    this.handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index

      this.setActiveIndex(newIndex)
    }
    this.setActiveIndex = index => {
      this.setState({
        activeIndex: index
      })
    }
  }

  createStories () {
    let { activeIndex } = this.state
    let { stories } = this.props
    let createChapters = (chapters) => {
      return chapters.map((chapter, id) => (
        <List.Item key={id} onClick={chapter.content}>
          {chapter.name}
        </List.Item>
      ))
    }

    return stories.map((story = {}, idx) => (
      <Fragment key={idx}>
        <Accordion.Title active={activeIndex === idx} index={idx} onClick={this.handleClick}>
          <Icon name='dropdown' />
          {story.name}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === idx}>
          <List>
            {createChapters(story.chapters)}
          </List>
        </Accordion.Content>
      </Fragment>
    ))
  }
  render () {
    let { stories } = this.props
    return (
      <div>
        <h1>FusionBook</h1>
        <SeacrhBar stories={stories.map(({ name }) => {
          return {
            title: name
          }
        })} setActiveIndex={this.setActiveIndex}/>
        <Accordion>
          {this.createStories()}
        </Accordion>
      </div>
    )
  }
}

TableOfContents.propTypes = {
  stories: array
}

export default TableOfContents

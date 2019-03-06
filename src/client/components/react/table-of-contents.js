import React, { Component } from 'react'
import Story from './story'
import { array } from 'prop-types'
import SeacrhBar from './search-bar'
import { Accordion } from 'semantic-ui-react'

class TableOfContents extends Component {
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  createStories () {
    let { activeIndex } = this.state
    let { stories } = this.props

    return stories.map((story = {}, idx) => (
      <Story key={idx} storyName={story.name} chapters={story.chapters}
        index={idx} activeIndex={activeIndex} handleClick={this.handleClick} />
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
        })}/>
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

import React from 'react'
import Story from './story'
import { array } from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const createStory = (story = {}, idx) => (
  <Story key={idx} storyName={story.name} chapters={story.chapters} />
)
const createStories = stories => stories.map(createStory)

const Book = ({ stories = [] }) => {
  return (
    <Container>
      <Row>
        <Col sm={2}><ul>{createStories(stories)}</ul></Col>
        <Col sm={8}></Col>
      </Row>
    </Container>
  )
}

Book.propTypes = {
  stories: array
}

export default Book

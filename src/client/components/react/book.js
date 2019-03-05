import React from 'react'
import { array } from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Contents from './table-of-contents'

const Book = ({ stories = [] }) => {
  return (
    <Container>
      <Row>
        <Col sm={2}><Contents stories={stories}/></Col>
        <Col sm={8}></Col>
      </Row>
    </Container>
  )
}

Book.propTypes = {
  stories: array
}

export default Book

import React from 'react'
import { array } from 'prop-types'
import { Grid } from 'semantic-ui-react'
import Contents from './table-of-contents'

const Book = ({ stories = [] }) => {
  return (
    <Grid columns={2}>
      <Grid.Column width={2}>
        <Contents stories={stories}/>
      </Grid.Column>
      <Grid.Column width={14}>
      </Grid.Column>
    </Grid>
  )
}

Book.propTypes = {
  stories: array
}

export default Book

import React from 'react'
import { array } from 'prop-types'
import { Grid } from 'semantic-ui-react'

const Book = ({ stories = [] }) => {
  return (
    <Grid columns={2}>
      <Grid.Column width={2}>
        Hello
      </Grid.Column>
      <Grid.Column width={14}>
        Hello
      </Grid.Column>
    </Grid>
  )
}

Book.propTypes = {
  stories: array
}

export default Book

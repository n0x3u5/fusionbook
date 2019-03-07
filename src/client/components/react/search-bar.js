import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import { array } from 'prop-types'
import { debounce } from 'lodash-es'

function escapeRegExp (text) {
  return text.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&')
}

class SeacrhBar extends Component {
  constructor () {
    super()
    this.state = {
      results: [],
      value: ''
    }

    this.resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    this.handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    this.handleSearchChange = (e, { value }) => {
      const source = this.props.stories
      if (value.length < 1) return this.resetComponent()

      const re = new RegExp(escapeRegExp(value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        value,
        results: source.filter(isMatch)
      })
    }
  }

  render () {
    const { value, results } = this.state
    return (
      <Search
        onResultSelect={this.handleResultSelect}
        onSearchChange={debounce(this.handleSearchChange, 500, { leading: true })}
        results={results}
        value={value}
      />
    )
  }
}

SeacrhBar.propTypes = {
  stories: array
}

export default SeacrhBar

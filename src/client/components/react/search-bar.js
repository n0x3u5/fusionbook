import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import { array, func } from 'prop-types'
import { debounce } from 'lodash-es'

function escapeRegExp (text) {
  return text.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&')
}

class SeacrhBar extends Component {
  constructor () {
    super()
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    }

    this.resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    this.handleResultSelect = (e, { result }) => {
      this.setState({ value: result.title })
      this.props.setActiveIndex(result.index)
    }

    this.handleSearch = debounce(value => {
      const source = this.props.stories
      if (value.length < 1) return this.resetComponent()

      const re = new RegExp(escapeRegExp(value), 'i')
      const data = []
      const len = source.length

      for (let i = 0; i < len; ++i) {
        if (re.test(source[i].title)) {
          source[i].index = i
          data.push(source[i])
        }
      }

      this.setState({
        isLoading: false,
        results: data
      })
    }, 120)

    this.handleSearchChange = (e, { value }) => {
      this.setState({
        isLoading: true,
        value
      })
      this.handleSearch(value)
    }
  }

  render () {
    const { isLoading, value, results } = this.state
    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        showNoResults={!isLoading}
      />
    )
  }
}

SeacrhBar.propTypes = {
  stories: array,
  setActiveIndex: func
}

export default SeacrhBar

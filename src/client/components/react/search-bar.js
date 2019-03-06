import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import { array } from 'prop-types'
import { debounce } from 'lodash-es'
import './search.css'

function escapeRegExp (text) {
  return text.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&')
}

class SeacrhBar extends Component {
  state = {
    isLoading: false,
    results: [],
    value: ''
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    const source = this.props.stories

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: source.filter(isMatch)
      })
    }, 0)
  }

  render () {
    const { isLoading, value, results } = this.state
    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={debounce(this.handleSearchChange, 500, { leading: true })}
        results={results}
        value={value}
        showNoResults={false}
      />
    )
  }
}

SeacrhBar.propTypes = {
  stories: array
}

export default SeacrhBar

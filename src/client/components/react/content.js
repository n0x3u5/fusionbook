import React from 'react'
import { array } from 'prop-types'
import { Tab } from 'semantic-ui-react'

const TabExampleBasic = ({ tabs }) => {
  let tabContentsFn = tabContents => () => <Tab.Pane>{tabContents}</Tab.Pane> // eslint-disable-line react/display-name
  let panes = tabs.map(({ name, info }) => {
    return {
      menuItem: name,
      render: tabContentsFn(info)
    }
  })
  return panes.length ? (<Tab panes={panes} />) : []
}

TabExampleBasic.propTypes = {
  tabs: array
}

export default TabExampleBasic

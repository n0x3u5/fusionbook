import React from 'react'
import { array } from 'prop-types'
import { Tab } from 'semantic-ui-react'
const checkCyclic = function (key, value) {
  if (key === 'lastElemUsed' || key === 'element') {
    return value.type
  } else if (key === 'sender') {
    return value.getName && value.getName()
  }
  return value
}
const TabExampleBasic = ({ tabs }) => {
  let tabContentsFn = tabContents => () => <Tab.Pane>{tabContents}</Tab.Pane> // eslint-disable-line react/display-name
  let panes = tabs.map(({ name, info }) => {
    if (typeof info !== 'string') info = JSON.stringify(info, checkCyclic)
    return {
      menuItem: name,
      render: tabContentsFn(info)
    }
  })
  let jsx = panes.length ? (<Tab panes={panes} />) : []
  return (
    <div className="footer">
      {jsx}
    </div>
  )
}

TabExampleBasic.propTypes = {
  tabs: array
}

export default TabExampleBasic

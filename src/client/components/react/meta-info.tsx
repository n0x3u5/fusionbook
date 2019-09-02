import * as React from 'react'
import { chromeDark, ObjectInspector } from 'react-inspector'
import Tab from 'semantic-ui-react/dist/es/modules/Tab/Tab'
import TabPane from 'semantic-ui-react/dist/es/modules/Tab/TabPane'
import isObject from '../../../utils/is-object'
import { Meta } from '../../../lib/story';

chromeDark.BASE_BACKGROUND_COLOR = '#434456'
chromeDark.TREENODE_FONT_SIZE = '13px'
chromeDark.TREENODE_LINE_HEIGHT = 1.4

const createInspectable = (info: unknown, i: number = 0) => (
  <ObjectInspector theme={{ ...chromeDark }} data={info} key={i} />
)

const displayable = (info: unknown) => {
  if (Array.isArray(info)) {
    return info.map(createInspectable)
  } else if (isObject(info)) {
    return createInspectable(info)
  } else {
    return info
  }
}

const createTabPanes = ({name, info} : { name: string, info: unknown }) => ({
  menuItem: name,
  render: () => <TabPane>{displayable(info)}</TabPane>
})

const MetaInfo = ({ tabs }: { tabs: Meta[] }) =>
  tabs.length
    ? <Tab panes={tabs.map(createTabPanes)} className="footer" />
    : null

export default MetaInfo

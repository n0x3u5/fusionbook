import * as React from 'react'
import { Story } from '../../../lib/story'
import './book.css'
import Renderer from './renderer'
import MetaInfo from './meta-info'
import TableOfContents from './table-of-contents'

const { useState, useMemo, useRef } = React

const isMeta = (metaName: string): (({ name: string }) => boolean) => ({
  name
}: {
  name: string
}): boolean => name === metaName
const isMetaEventLog = isMeta('Event Log')
const isMetaConfiguration = isMeta('Configuration')

const Book = ({ stories }: { stories: Story[] }) => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0)
  const [activeStoryChapterIdx, setActiveStoryChapterIdx] = useState(0)

  const story = stories[activeStoryIdx].chapters[activeStoryChapterIdx]

  const [metaContents, setMetaContents] = useState(story.metas)

  const metaContentsRef = useRef(story.metas)

  const id = '' + activeStoryIdx + activeStoryChapterIdx

  const handleChapterSelect = (storyIdx: number, chapterIdx: number) => {
    metaContentsRef.current = stories[storyIdx].chapters[chapterIdx].metas
    setActiveStoryIdx(storyIdx)
    setActiveStoryChapterIdx(chapterIdx)
  }

  const handleEventTrigger = e => {
    let eventIndex = metaContentsRef.current.findIndex(isMetaEventLog)

    if (eventIndex != null) {
      const eventInfo = Object.assign({}, metaContentsRef.current[eventIndex])
      eventInfo.info = Array.isArray(eventInfo.info)
        ? [...eventInfo.info, e]
        : [e]

      metaContentsRef.current = metaContentsRef.current.map(
        (meta, idx) => (idx === eventIndex ? eventInfo : meta)
      )
    }
  }

  const handleConfigured = config => {
    let configIndex = metaContentsRef.current.findIndex(isMetaConfiguration)

    if (configIndex != null) {
      const configInfo = Object.assign({}, metaContentsRef.current[configIndex])
      configInfo.info = config

      metaContentsRef.current = metaContentsRef.current.map(
        (meta, idx) => (idx === configIndex ? configInfo : meta)
      )
    }
  }

  const handleDrawn = () => setMetaContents(metaContentsRef.current)

  return (
    <div className="page">
      <TableOfContents
        stories={stories}
        onChapterSelect={handleChapterSelect}
      />
      <div className="book-content">
        {useMemo(
          () => (
            <Renderer
              key={id}
              type="html"
              onDrawn={handleDrawn}
              content={story.content}
              onConfigured={handleConfigured}
              onEventTrigger={handleEventTrigger}
            />
          ),
          [id]
        )}
        <MetaInfo tabs={metaContents} />
      </div>
    </div>
  )
}

export default Book

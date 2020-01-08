import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { chromeLight, Inspector } from 'react-inspector';
import { Chapter } from '../../../lib/story';
import { isObject } from './utils';

const { useState } = React;

chromeLight.TREENODE_FONT_SIZE = '13px';
chromeLight.TREENODE_LINE_HEIGHT = 1.4;

const createInspectable = (info: object, i = 0): React.ReactElement => (
  <Inspector theme={{ ...chromeLight }} data={info} key={i} />
);

const displayable = (
  info: object | string
): React.ReactElement | Array<React.ReactElement> => {
  if (Array.isArray(info)) {
    return info.map(createInspectable);
  } else if (isObject(info)) {
    return createInspectable(info as object);
  } else {
    return <p>{info.toString()}</p>;
  }
};

const MetaInfo = <T extends unknown>({
  chapter,
  chapterBase
}: {
  chapter: Chapter<T>
  chapterBase: T
}): React.ReactComponentElement<'div'> => {
  const { metas } = chapter;
  const [activeMetaID, setActiveMetaID] = useState(
    metas[0].id
  );
  const activeMeta = metas.find(meta => meta.id === activeMetaID);

  return (
    <div className="meta-tabs">
      <ul className="tab-list">
        {metas.map((meta, idx) => (
          <li
            key={idx}
            className={`${activeMetaID === meta.id ? 'active' : null}`}
            onClick={(): void => setActiveMetaID(meta.id)}
          >
            {meta.name}
          </li>
        ))}
      </ul>
      <div className="tab-content">{displayable(activeMeta?.info(chapterBase) ?? {})}</div>
    </div>
  );
};

export default MetaInfo;

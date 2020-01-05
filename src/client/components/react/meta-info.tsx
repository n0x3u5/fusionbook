import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { chromeLight, ObjectInspector } from 'react-inspector';
import { Meta } from '../../../lib/story';
import useLocalStorage from './useLocalStorage';
import { isObject } from './utils';

chromeLight.TREENODE_FONT_SIZE = '13px';
chromeLight.TREENODE_LINE_HEIGHT = 1.4;

const createInspectable = (info: object, i = 0): React.ReactElement => (
  <ObjectInspector theme={{ ...chromeLight }} data={info} key={i} />
);

const displayable = (
  info: object
): React.ReactElement | Array<React.ReactElement> => {
  if (Array.isArray(info)) {
    return info.map(createInspectable);
  } else if (isObject(info)) {
    return createInspectable(info);
  } else {
    return <p>{info.toString()}</p>;
  }
};

const MetaInfo = ({
  metas = []
}: {
  metas?: ReadonlyArray<Meta>
}): React.ReactComponentElement<'div'> => {
  const [activeMetaID, setActiveMetaID] = useLocalStorage(
    'activeMeta',
    metas[0]?.id
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
      <div className="tab-content">{displayable(activeMeta?.info ?? {})}</div>
    </div>
  );
};

export default MetaInfo;

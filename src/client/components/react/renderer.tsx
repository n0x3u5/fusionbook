import * as React from 'react';
import { Chapter } from '../../../lib/story';
import { noOp } from './utils';

const { useEffect, useRef } = React;

const Renderer = <T extends unknown>({
  chapter,
  onConfigured = noOp
}: {
  chapter: Chapter<T>
  onConfigured?: object
}): React.ReactComponentElement<'div'> => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    const container = mainRef.current;

    if (container) {
      const chapterBase = chapter.createBase(container);

      chapter.onConfigured(chapterBase)(onConfigured);
      chapter.content(chapterBase);
    }

    return (): void => {
      if (container) container.innerHTML = '';
    };
  });

  return <div ref={mainRef} className="renderer"></div>;
};

export default Renderer;

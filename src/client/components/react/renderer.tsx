import * as React from 'react';
import { Chapter } from '../../../lib/story';
import { noOp } from './utils';

const { useEffect, useRef } = React;

const Renderer = <T extends unknown>({
  chapter,
  readyHandler = noOp
}: {
  chapter?: Chapter<T>
  readyHandler?: (base: T) => void
}): React.ReactComponentElement<'div'> => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    const container = mainRef.current;

    if (container && chapter) {
      const chapterBase = chapter.createBase(container);
      chapter.content(chapterBase);
      chapter.onBaseReady(chapterBase, readyHandler);

      return (): void => chapter.destroy(chapterBase);
    }

    return noOp;
  }, [mainRef, chapter, readyHandler]);

  return <div ref={mainRef} className="renderer"></div>;
};

export default Renderer;

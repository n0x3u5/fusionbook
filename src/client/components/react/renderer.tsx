import * as React from 'react';
import { Chapter } from '../../../lib/story';

const { useEffect, useRef } = React;

const Renderer = <T extends unknown>({
  chapter,
}: {
  chapter: Chapter<T>
}): React.ReactComponentElement<'div'> => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    const container = mainRef.current;

    if (container) {
      const chapterBase = chapter.createBase(container);
      chapter.content(chapterBase);
    }

    return (): void => {
      if (container) container.innerHTML = '';
    };
  });

  return <div ref={mainRef} className="renderer"></div>;
};

export default Renderer;

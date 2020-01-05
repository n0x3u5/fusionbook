import * as React from 'react';
import { noOp } from './utils';

const { useEffect, useRef } = React;

const Renderer = ({
  content = noOp
}: {
  content?: Function
}): React.ReactComponentElement<'div'> => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    const container = mainRef.current;

    if (container) content(container);

    return (): void => {
      if (container) container.innerHTML = '';
    };
  });

  return <div ref={mainRef} className="renderer"></div>;
};

export default Renderer;

import * as React from 'react';
// import Story from '../fresco/fusion-story'

class Story {
  registerFactory(a: any, b: any): void { /* */ }
  addEventListener(a: any, b: any): void { /* */ }
  setData(a: any): void { /* */ }
  remove(a: any): void { /* */ }
}

const { useEffect, useRef } = React;

const Renderer = ({
  type,
  content,
  onDrawn,
  onEventTrigger,
  onConfigured
}: {
  type: string
  content: Function
  onDrawn: Function
  onEventTrigger: Function
  onConfigured: (config: object) => void
}): React.ReactComponentElement<'div'> => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mainRef.current;

    if (container) {
      if (type === 'html') {
        content(container);
        const childAttrs =
          container.children.length > 0
            ? Array.from(container.children[0].attributes)
            : [];
        onConfigured(
          Object.fromEntries(childAttrs.map(({ name, value }) => [name, value]))
        );
        onDrawn();
      } else {
        const story = new Story();
        const { width, height } = container.getBoundingClientRect();

        story.registerFactory('content', content);
        story.addEventListener('drawn', onDrawn);
        story.addEventListener(
          'childattached',
          ({ data: { attachedChild } }: { data: { attachedChild: any } }) => {
            if (attachedChild.getType() !== 'animationManager') {
              attachedChild.addEventListener('*', onEventTrigger);
              onConfigured(attachedChild.config);
            }
          }
        );
        story.setData({
          id: 'main',
          availableWidth: width,
          availableHeight: height
        });

        return (): void => story.remove({ instant: false });
      }
    }

  });

  return <div ref={mainRef}></div>;
};

export default Renderer;

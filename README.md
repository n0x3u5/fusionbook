# FusionBook
Develop and test FusionCharts components in isolation

## API
```javascript
import FusionBook, { Story } from 'fusionbook';
import SmartRendererParser from 'fusionbook/smart-renderer.js';
import HTMLParser from 'fusionbook/html.js';
import LegendItem from './legend-item.js';

// Instill the ability to understand SmartRenderer components to FusionBook
FusionBook.registerParser(SmartRendererParser);
FusionBook.registerParser(HTMLParser);

// Creates a story named "Legend Item"
const legendItemStory = new Story('Legend Item');

// Adds a "with defaults" chapter to the story
legendItemStory.addChapter(
  'with defaults',
  story => story.attachChild(LegendItem)
);

// Adds a "with background" chapter to the story
legendItemStory.addChapter(
  'with background',
  () => story.attachChild(LegendItem).configure({ showBackground: true })
);

// Creates a story named "Div Element"
const divStory = new Story('Div Element');

// Adds a "with 50% opacity" chapter to the story
divStory.addChapter(
  'with 50% opacity',
  story => {
    const divElement = document.createElement('div');

    divElement.style.opacity = 0.5;

    story.appendChild(divElement);
  }
);

// export the created stories
export default [legendItemStory, divStory];
```

## CLI
```bash
# Starts a server at localhost:3000 with the stories in the given folder
fusionbook --load "path/to/main/stories/file.js"
```

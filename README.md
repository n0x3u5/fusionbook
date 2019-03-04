# FusionBook
Develop and test FusionCharts components in isolation

## API
```javascript
import { Story } from 'fusionbook';
import LegendItem from './legend-item.js';

// Creates a story with a "default" chapter
const legendItemStory = new Story(LegendItem);

// Adds a "with background" chapter to the
legendItemStory.addChapter(
  'with background',
  { showBackground: true }
);

// export the created story
export default legendItemStory;
```

## CLI
```bash
# Starts a server at localhost:3000 with the stories in the given folder
fusionbook --load "path/to/stories/folder"
```

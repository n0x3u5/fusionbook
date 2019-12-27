let idCounter = 0;
const uid = (prefix = '') => prefix + '' + ++idCounter;
const notes = info => ({ name: 'Notes', info });
const configs = () => ({ name: 'Configuration' });
const events = () => ({ name: 'Event Log' });

const chapter = name => ({
  name,
  metas: [],
  chapters: [],
  id: uid(`story-${encodeURIComponent(name)}-`)
});

const page = (name, content, metas = []) => ({
  name,
  content,
  metas,
  ownerID: null,
  id: uid(`chapter-${encodeURIComponent(name)}-`)
});

const unit = 9;

const story = 6;


const addMetasTo = (metas, entity) => Object.assign({}, entity, { metas });

const addChaptersTo = story => {
  const setChapterMetas = chapter => ({
    ...chapter,
    metas: chapter.metas.concat(story.metas),
    ownerID: story.id
  });

  return chapters => ({ ...story, chapters: chapters.map(setChapterMetas) });
};

const addPagesTo = 5;

const addStoriesTo = 1;

export {
  chapter,
  notes,
  configs,
  events,
  page,
  story,
  unit,
  addChaptersTo,
  addPagesTo,
  addStoriesTo,
  addMetasTo
};

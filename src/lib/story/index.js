let idCounter = 0;
const uid = (prefix = '') => prefix + '' + ++idCounter;
const notes = info => ({
  info: () => info,
  name: 'Notes',
  id: uid(`meta-${encodeURIComponent('Notes')}-`)
});
const configs = () => ({
  info: base => base,
  name: 'Configuration',
  id: uid(`meta-${encodeURIComponent('Configuration')}-`)
});

const story = name => ({
  name,
  metas: [],
  chapters: [],
  id: uid(`story-${encodeURIComponent(name)}-`)
});

const chapter = (name, content, metas = []) => ({
  name,
  content,
  metas,
  ownerID: null,
  id: uid(`chapter-${encodeURIComponent(name)}-`)
});

const html = chapter => ({
  ...chapter,
  createBase: root => {
    const base = document.createElement('div');

    base.setAttribute('class', '__fusionbook_base__');
    root.appendChild(base);

    return base;
  },
  deleteBase: (base, root) => root.removeChild(base)
});

const htmlChapter = (name, content, metas = []) =>
  html(chapter(name, content, metas));

const addMetasTo = (metas, entity) => Object.assign({}, entity, { metas });

const addChaptersTo = story => {
  const setChapterMetas = chapter => ({
    ...chapter,
    metas: chapter.metas.concat(story.metas),
    ownerID: story.id
  });

  return chapters => ({ ...story, chapters: chapters.map(setChapterMetas) });
};

export {
  chapter,
  notes,
  htmlChapter,
  configs,
  story,
  addChaptersTo,
  addMetasTo
};

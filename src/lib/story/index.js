import FusionStory from "../../client/components/fresco/fusion-story";

let idCounter = 0;
const uid = (prefix = '') => prefix + '' + ++idCounter;
const notes = info => ({
  info: () => info,
  name: 'Notes',
  id: uid(`meta-${encodeURIComponent('Notes')}-`)
});
const htmlNotes = notes;
const smartRendererNotes = notes;
const configs = () => ({
  name: 'Configuration',
  id: uid(`meta-${encodeURIComponent('Configuration')}-`)
})
const htmlConfigs = () => {
  const basicCfg = configs();

  return {
    ...basicCfg,
    info: base => base
  }
};
const smartRendererConfigs = () => {
  const basicCfg = configs();

  return {
    ...basicCfg,
    info: base => base.config
  }
};

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
  deleteBase: (base, root) => root.removeChild(base),
  onBaseReady: (base, handler) => { return handler(base); },
  destroy: base => base.parentNode.removeChild(base)
});

const smartRenderer = chapter => ({
  ...chapter,
  createBase: root => {
    const base = new FusionStory();

    base.configure({ id: root.getAttribute('id') });

    return base;
  },
  onBaseReady: (base, handler) => base.addEventListener('animationcomplete', handler),
  destroy: base => base.remove()
})

const htmlChapter = (name, content, metas = []) =>
  html(chapter(name, content, metas));

const smartRendererChapter = (name, content, metas = []) =>
  smartRenderer(chapter(name, content, metas));

const addMetasTo = (metas, entity) => Object.assign({}, entity, { metas });

const addChaptersTo = story => {
  const setChapterMetas = chapter => ({
    ...chapter,
    metas: chapter.metas.concat(story.metas),
    ownerID: story.id
  });

  return chapters => ({ ...story, chapters: chapters.map(setChapterMetas) });
};

export { chapter, htmlNotes, htmlChapter, smartRendererChapter, smartRendererConfigs, smartRendererNotes, htmlConfigs, story, addChaptersTo, addMetasTo };

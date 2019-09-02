class FrescoParser {}

const notes = info => ({ name: 'Notes', info })
const configs = () => ({ name: 'Configuration' })
const events = () => ({ name: 'Event Log' })

class Story {
  constructor (name) {
    this.chapters = []
    this.metas = []
    this.name = name
    this.type = 'html'
  }
  static registerParser (parser) {
    Story.registeredParsers.push(parser)
  }
  addChapter (name, content, metas = []) {
    this.chapters = this.chapters.concat({
      name,
      content,
      metas: metas.concat(this.metas)
    })
    return this
  }
  addMetas (metas) {
    this.metas = this.metas.concat(metas)
    return this
  }
}
Story.registeredParsers = []

export { Story, FrescoParser, notes, configs, events }

import Chapter from './chapter.js'
import Fresco from './parsers/fresco'

class Story {
  constructor (name = '') {
    this.name = name
    this.chapters = []
  }

  addChapter (name, content) {
    this.chapters.push(new Chapter(name, content))
  }

  static registerParser (parser) {
    Story.registeredParsers.push(parser)
  }
}

Story.registeredParsers = []

export { Fresco, Story }

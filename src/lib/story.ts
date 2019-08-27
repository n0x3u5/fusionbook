interface Chapter {
  name: string,
  content: unknown
}

class Story {
  name: string
  chapters: Chapter[] = []
  static registeredParsers: unknown[] = []

  constructor (name: string) {
    this.name = name
  }

  static registerParser (parser: unknown) {
    Story.registeredParsers.push(parser)
  }

  addChapter (name: string, content: unknown) {
    this.chapters.push({ name, content })
  }
}

export { Story };

interface Meta {
  name: string,
  info?: unknown
}

interface Chapter {
  name: string
  content: Function
  metas: Meta[]
}

class FrescoParser {}

class Story {
  name: string
  chapters: Chapter[] = []
  metas: Meta[] = []
  static registeredParsers: FrescoParser[] = []

  constructor (name: string) {
    this.name = name
  }

  static registerParser (parser: FrescoParser) {
    Story.registeredParsers.push(parser)
  }

  addChapter (name: string, content: Function, metas: Meta[] = []) {
    this.chapters = this.chapters.concat({
      name,
      content,
      metas: metas.concat(this.metas)
    })

    return this
  }

  addMetas (metas: Meta[]) {
    this.metas = this.metas.concat(metas)

    return this
  }
}

export { Story, FrescoParser }

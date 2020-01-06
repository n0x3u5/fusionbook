interface Meta {
  readonly id: string
  readonly name: string
  readonly info: <T>(base: T) => unknown
}

interface Entity {
  readonly id: string
  readonly name: string
  readonly metas: ReadonlyArray<Meta>
}

interface ChapterBasic extends Entity {
  readonly ownerID: null | string
}

interface Chapter<T> extends ChapterBasic {
  readonly content: (base: T) => void
  readonly createBase: (root: HTMLElement) => T
  readonly deleteBase: (base: T, root: HTMLElement) => void
}

interface Story extends Entity {
  readonly chapters: ReadonlyArray<Chapter<unknown>>
}

declare const story: (name: string) => Story

declare const addMetasTo: <Entity>(
  metas: ReadonlyArray<Meta>,
  entity: Entity
) => Entity

declare const addChaptersTo: (
  story: Story
) => <T>(chapters: ReadonlyArray<Chapter<T>>) => Story

declare const chapter: (
  name: string,
  content: (story: HTMLElement) => unknown,
  metas?: ReadonlyArray<Meta>
) => ChapterBasic

declare const html: (chapter: ChapterBasic) => Chapter<HTMLElement>

declare const htmlChapter: (
  name: string,
  content: (story: HTMLElement) => unknown,
  metas?: ReadonlyArray<Meta>
) => Chapter<HTMLElement>

declare const notes: (info: string) => Meta

declare const configs: () => Meta

export {
  story,
  notes,
  configs,
  chapter,
  html,
  htmlChapter,
  addChaptersTo,
  addMetasTo,
  Story,
  Chapter,
  ChapterBasic,
  Entity,
  Meta
}

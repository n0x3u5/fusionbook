interface Meta {
  readonly id: string
  readonly name: string
  readonly info?: object
}

interface Entity {
  readonly id: string
  readonly name: string
  readonly metas: ReadonlyArray<Meta>
}

interface Chapter extends Entity {
  readonly ownerID: null | string
  readonly content: Function
}

interface Story extends Entity {
  readonly chapters: ReadonlyArray<Chapter>
}

declare const story: (name: string) => Story

declare const addMetasTo: <Entity>(
  metas: ReadonlyArray<Meta>,
  entity: Entity
) => Entity

declare const addChaptersTo: (
  story: Story
) => (chapters: ReadonlyArray<Chapter>) => Story

declare const chapter: (
  name: string,
  content: (story: HTMLElement) => unknown,
  metas?: ReadonlyArray<Meta>
) => Chapter

declare const notes: (info: string) => Meta

declare const configs: () => Meta

declare const events: () => Meta

export {
  story,
  notes,
  configs,
  events,
  chapter,
  addChaptersTo,
  addMetasTo,
  Story,
  Chapter,
  Entity,
  Meta
}

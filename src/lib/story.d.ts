interface Meta {
    name: string;
    info?: unknown;
}
interface Chapter {
    name: string;
    content: Function;
    metas: Meta[];
}
declare class FrescoParser {
}
declare const notes: (info: string) => Meta;
declare const configs: () => Meta;
declare const events: () => Meta;
declare class Story {
    name: string;
    type: string;
    chapters: Chapter[];
    metas: Meta[];
    static registeredParsers: FrescoParser[];
    constructor(name: string);
    static registerParser(parser: FrescoParser): void;
    addChapter(name: string, content: Function, metas?: Meta[]): this;
    addMetas(metas: Meta[]): this;
}
export { Chapter, Meta, Story, FrescoParser, notes, configs, events };

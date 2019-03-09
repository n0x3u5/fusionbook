class Note {
  constructor (text) {
    this.name = 'Note'
    this.info = text
  }

  clone () {
    return new Note(this.info)
  }
}

export default Note

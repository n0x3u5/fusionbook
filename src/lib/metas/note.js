class Note {
  constructor (text) {
    this.name = 'Notes'
    this.info = text
  }

  clone () {
    return new Note(this.info)
  }
}

export default Note

import Meta from './meta'

class Note extends Meta {
  constructor (text) {
    super(text)

    this.name = 'Notes'
  }
}

export default Note

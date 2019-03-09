class Event {
  constructor () {
    this.name = 'Event'
    this.info = ''
  }

  setInfo (info) {
    this.info = info

    return this
  }

  clone () {
    return new Event().setInfo(this.info)
  }
}

export default Event

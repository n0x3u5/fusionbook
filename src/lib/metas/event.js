class Event {
  constructor () {
    this.name = 'Event Log'
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

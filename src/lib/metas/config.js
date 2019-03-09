class Config {
  constructor () {
    this.name = 'Configuration'
    this.info = ''
  }

  setInfo (info) {
    this.info = info

    return this
  }

  clone () {
    return new Config().setInfo(this.info)
  }
}

export default Config

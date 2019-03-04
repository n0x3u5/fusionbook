import SmartRenderer from '../../../../fc-core/src/component-interface/smart-renderer'

class Rectangle extends SmartRenderer {
  __setDefaultConfig () {
    this.config.fill = '#ff7200'
    this.config.width = 300
    this.config.height = 300
    this.config.stroke = 'none'
  }

  configureAttributes (config = {}) {
    Object.assign(this.config, config)
  }

  draw () {
    const animationManager = this.getFromEnv('animationManager')
    const { width, height, fill, stroke } = this.config

    animationManager.setAnimation({
      el: 'rect',
      attr: { width, height, fill, stroke }
    })
  }
}

export default Rectangle

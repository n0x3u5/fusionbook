import Component from '../../fusioncharts-xt/packages/fc-core/src/component-interface/component.js'

class Rectangle extends Component {
  __setDefaultConfig () {
    this.config.fill = '#511818'
    this.config.width = 300
    this.config.height = 300
    this.config.stroke = 'none'
  }

  configureAttributes (config = {}) {
    Object.assign(this.config, config)
  }

  draw () {
    const { width, height, fill, stroke } = this.config

    this.addGraphicalElement({
      el: 'rect',
      attr: {
        height,
        width,
        fill,
        stroke
      }
    })
  }
}

export default Rectangle

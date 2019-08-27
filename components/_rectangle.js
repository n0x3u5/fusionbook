import Component from '../../fusioncharts-xt/packages/fc-core/src/component-interface/component.js'

class Rectangle extends Component {
  __setDefaultConfig () {
    this.config.fill = '#511818'
    this.config.stroke = 'none'
  }

  configureAttributes (config = {}) {
    Object.assign(this.config, config)
  }

  draw () {
    const { fill, stroke } = this.config
    const { x, y, width, height } = this.getLayout()
    console.log(x, y, width, height)
    this.addGraphicalElement({
      el: 'rect',
      attr: {
        x,
        y,
        height,
        width,
        fill,
        stroke
      }
    })
  }
}

export default Rectangle

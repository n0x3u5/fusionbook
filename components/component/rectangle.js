import SmartRenderer from '@fusioncharts/core/src/component-interface/smart-renderer';

class Rectangle extends SmartRenderer {
  __setDefaultConfig() {
    this.config.fill = '#511818';
    this.config.stroke = 'none';
    this.config.width = 200;
    this.config.height = 100;
    this.config.x = 0;
    this.config.y = 0;
  }

  configureAttributes(config = {}) {
    Object.assign(this.config, config);
  }

  draw() {
    const { fill, stroke, width, height, x, y } = this.config;

    this.addGraphicalElement({
      el: 'rect',
      attr: { x, y, height, width, fill, stroke }
    });
  }
}

export default Rectangle;

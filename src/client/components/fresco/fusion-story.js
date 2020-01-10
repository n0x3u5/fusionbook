import AnimationManager from '@fusioncharts/core/src/animation-manager';
import SmartRenderer from '@fusioncharts/core/src/component-interface/smart-renderer';
import TooltipControllerExtension from '@fusioncharts/core/src/dummy-tooltip-controller';
import RaphaelCSS from '@fusioncharts/core/src/_internal/redraphael/redraphael.css';
import SmartLabelManager from '@fusioncharts/core/src/_internal/vendors/fusioncharts-smartlabel/src/SmartlabelManager';
import Raphael from '@fusioncharts/core/src/_internal/vendors/redraphael/source/raphael';

RaphaelCSS(Raphael);

const { extension: DummyTooltipController } = TooltipControllerExtension;

const animationManagerFactory = fusionStory => {
  const animationManager = fusionStory.attachChild(
    AnimationManager,
    'animationManager'
  );

  animationManager.addToEnv('chart', fusionStory);
  animationManager.configure();
  animationManager.setAnimationState('default');
};

class TooltipController extends DummyTooltipController {
  enableToolTip(el, text) {
    el.data('__FC_mousemoveHandler', () => console.log(text));
    el.on('fc-mousemove', el.data('__FC_mousemoveHandler'));
  }

  disableToolTip(el) {
    el.off('fc-mousemove', el.data('__FC_mousemoveHandler'));
  }
}

class FusionStory extends SmartRenderer {
  constructor() {
    super();

    this.registerFactory('animationManager', animationManagerFactory);

    this.addToEnv('smartLabel', new SmartLabelManager(document.body));
    this.addToEnv('toolTipController', new TooltipController());
    this.addToEnv('chartInstance', { args: {} });
    this.addToEnv('core-options', {});
  }

  configureAttributes(config = {}) {
    Object.assign(this.config, config);
  }

  draw() {
    this.addToEnv('animationManager', this.getChildren('animationManager')[0]);

    if (!this.getFromEnv('paper')) {
      this.addToEnv('paper', Raphael(this.config.id, '100%', '100%'));
    }
  }

  remove(...args) {
    const paper = this.getFromEnv('paper');
    const smartLabelContainer = document.querySelector(
      '.fusioncharts-smartlabel-container'
    );

    if (paper) paper.remove();

    if (smartLabelContainer) smartLabelContainer.remove();

    super.remove(...args);
  }
}

export default FusionStory;

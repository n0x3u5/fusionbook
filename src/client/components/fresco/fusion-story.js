import { merge } from 'lodash-es';
import AnimationManager from '../../../../../fusioncharts-xt/packages/fc-core/src/animation-manager/index.js';
import Component from '../../../../../fusioncharts-xt/packages/fc-core/src/component-interface/component.js';
import TooltipControllerExtension from '../../../../../fusioncharts-xt/packages/fc-core/src/dummy-tooltip-controller/index.js';
import RaphaelCSS from '../../../../../fusioncharts-xt/packages/fc-core/src/_internal/redraphael/redraphael.css';
import SmartLabelManager from '../../../../../fusioncharts-xt/packages/fc-core/src/_internal/vendors/fusioncharts-smartlabel/src/SmartlabelManager.js';
import Raphael from '../../../../../fusioncharts-xt/packages/fc-core/src/_internal/vendors/redraphael/source/raphael.js';

RaphaelCSS(Raphael);

const { extension: DummyTooltipController } = TooltipControllerExtension;
const LINE_HEIGHT_FACTOR = 1.2;
const hasOwnProperty = (obj, prop) =>
  Object.prototype.hasOwnProperty.call(obj, prop);

const animationManagerFactory = fusionStory => {
  const animationManager = fusionStory.attachChild(
    AnimationManager,
    'animationManager'
  );

  animationManager.addToEnv('chart', fusionStory);
  animationManager.configure();
  animationManager.setAnimationState('default');
};

const parseStrokeDashArray = styleDef => {
  for (const property in styleDef) {
    if (hasOwnProperty(styleDef, property)) {
      if (typeof styleDef[property] === 'object') {
        parseStrokeDashArray(styleDef[property]);
      } else if (
        property === 'stroke-dasharray' &&
        typeof styleDef[property] === 'string'
      ) {
        // if stoke dasharray is provided in string
        // First trim the whitespaces then replace comma with space to normalise the sting and then split with space.
        styleDef[property] = styleDef[property]
          .replace(/^\s+|\s+$/g, '')
          .replace(/,/g, ' ')
          .split(' ')
          .map(c => +c);
      }
    }
  }
};

const parseOpacity = styleDef => {
  for (const property in styleDef) {
    if (hasOwnProperty(styleDef, property)) {
      if (typeof styleDef[property] === 'object') {
        parseOpacity(styleDef[property]);
      } else if (
        property === 'opacity' ||
        property === 'stroke-opacity' ||
        property === 'fill-opacity'
      ) {
        // normalize the opacity between 0 to 1
        styleDef[property] = Math.max(0, Math.min(1, +styleDef[property]));
      }
    }
  }
};

const setLineHeight = (styleObj, baseFontSize) => {
  if (typeof styleObj !== 'object') {
    return;
  }

  // Calculate line height if not explicitly provided by the user
  if (!styleObj['line-height']) {
    styleObj['line-height'] =
      (parseFloat(styleObj['font-size']) || baseFontSize || 10) *
      LINE_HEIGHT_FACTOR;
  }
};

const getStyleDef = (styleDef = {}) => {
  let mergedStyle;

  if (typeof styleDef === 'string') {
    const styleDefinition = {};
    mergedStyle = {};
    // more than one style definitions can be provided, so merge all the styles with the last mentioned style
    // having the highest priority.
    styleDefinition &&
      styleDef
        .split(/\s+/g)
        .forEach(style =>
          merge(mergedStyle, styleDefinition[style.toLowerCase()])
        );
  }
  // if mergeStyle is defined that means styleDef is of string type, then assign styleDef to mergedStyle
  if (mergedStyle) {
    styleDef = mergedStyle;
  }
  // middleware for parsing stroke dasharray
  // support for string dash array
  parseStrokeDashArray(styleDef);
  // middleware for parsing opacity
  // support for opacity normalisation
  parseOpacity(styleDef);
  (styleDef['font-size'] || styleDef['font-size'] === 0) &&
    setLineHeight(styleDef, 10);
  return styleDef;
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

class FusionStory extends Component {
  constructor() {
    super();

    this.registerFactory('animationManager', animationManagerFactory);

    this.addToEnv('smartLabel', new SmartLabelManager(document.body));
    this.addToEnv('toolTipController', new TooltipController());
    this.addToEnv('getStyleDef', getStyleDef);
  }

  __setDefaultConfig() {
    super.__setDefaultConfig();

    this.config.layoutStyle = null;
  }

  configureAttributes(config = {}) {
    Object.assign(this.config, config);

    this.addToEnv('core-options', {});
    this.addToEnv('chartInstance', { args: {} });
  }

  provideDimension(layoutStyle = { position: 'relative' }) {
    this.config.layoutStyle = layoutStyle;
  }

  layout() {
    const {
      availableWidth: width,
      availableHeight: height,
      layoutStyle
    } = this.config;

    if (layoutStyle != null) {
      this.setLayoutStyle(layoutStyle);
    } else {
      this.setLayoutStyle({ position: 'relative', width, height });
    }
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

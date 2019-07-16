import Component from '../../../../../fusioncharts-xt/packages/fc-core/src/component-interface/component.js'
import AnimationManager from '../../../../../fusioncharts-xt/packages/fc-core/src/animation-manager/index.js'
import Raphael from '../../../../../fusioncharts-xt/packages/fc-core/src/_internal/vendors/redraphael/source/raphael.js'
import RaphaelCSS from '../../../../../fusioncharts-xt/packages/fc-core/src/_internal/redraphael/redraphael.css'
import SmartLabelManager from '../../../../../fusioncharts-xt/packages/fc-core/src/_internal/vendors/fusioncharts-smartlabel/src/SmartlabelManager.js'
import TooltipControllerExtension from '../../../../../fusioncharts-xt/packages/fc-core/src/dummy-tooltip-controller/index.js'

import { merge } from 'lodash-es'

RaphaelCSS(Raphael)

const { extension: DummyTooltipController } = TooltipControllerExtension
const LINE_HEIGHT_FACTOR = 1.2

const animationManagerFactory = fusionStory => {
  const animationManager = fusionStory.attachChild(
    AnimationManager,
    'animationManager'
  )

  animationManager.addToEnv('chart', fusionStory)
  animationManager.configure()
  animationManager.setAnimationState('default')
}
const hasSetDimension = child => child.setDimension
const parseStrokeDashArray = styleDef => {
  for (var property in styleDef) {
    if (styleDef.hasOwnProperty(property)) {
      if (typeof styleDef[property] === 'object') {
        parseStrokeDashArray(styleDef[property])
      } else if (property === 'stroke-dasharray' && typeof styleDef[property] === 'string') {
        // if stoke dasharray is provided in string
        // First trim the whitespaces then replace comma with space to normalise the sting and then split with space.
        styleDef[property] = styleDef[property].replace(/^\s+|\s+$/g, '').replace(/,/g, ' ').split(' ').map(c => +c)
      }
    }
  }
}
const parseOpacity = styleDef => {
  for (var property in styleDef) {
    if (styleDef.hasOwnProperty(property)) {
      if (typeof styleDef[property] === 'object') {
        parseOpacity(styleDef[property])
      } else if (property === 'opacity' || property === 'stroke-opacity' || property === 'fill-opacity') {
        // normalize the opacity between 0 to 1
        styleDef[property] = Math.max(0, Math.min(1, +styleDef[property]))
      }
    }
  }
}
const setLineHeight = (styleObj, baseFontSize) => {
  if (typeof styleObj !== 'object') {
    return
  }

  // Calculate line height if not explicitly provided by the user
  if (!styleObj['line-height']) {
    styleObj['line-height'] =
                ((parseFloat(styleObj['font-size']) || baseFontSize || 10) * LINE_HEIGHT_FACTOR)
  }
}
const getStyleDef = (styleDef = {}) => {
  let mergedStyle

  if (typeof styleDef === 'string') {
    let styleDefinition = {}
    mergedStyle = {}
    // more than one style definitions can be provided, so merge all the styles with the last mentioned style
    // having the highest priority.
    styleDefinition && styleDef.split((/\s+/g)).forEach(style => merge(mergedStyle, styleDefinition[style.toLowerCase()]))
  }
  // if mergeStyle is defined that means styleDef is of string type, then assign styleDef to mergedStyle
  if (mergedStyle) {
    styleDef = mergedStyle
  }
  // middleware for parsing stroke dasharray
  // support for string dash array
  parseStrokeDashArray(styleDef)
  // middleware for parsing opacity
  // support for opacity normalisation
  parseOpacity(styleDef);
  (styleDef['font-size'] || styleDef['font-size'] === 0) && setLineHeight(styleDef, 10)
  return styleDef
}

class TooltipController extends DummyTooltipController {
  enableToolTip (el, text) {
    el.data('__FC_mousemoveHandler', () => console.log(text))
    el.on('fc-mousemove', el.data('__FC_mousemoveHandler'))
  }

  disableToolTip (el) {
    el.off('fc-mousemove', el.data('__FC_mousemoveHandler'))
  }
}

class FusionStory extends Component {
  constructor () {
    super()

    this.registerFactory('animationManager', animationManagerFactory)

    this.addToEnv('smartLabel', new SmartLabelManager(document.body))
    this.addToEnv('toolTipController', new TooltipController())
    this.addToEnv('getStyleDef', getStyleDef)
  }

  __setDefaultConfig () {
    super.__setDefaultConfig()
    this.config.width = this.config.height = '100%'
  }

  configureAttributes (config = {}) {
    Object.assign(this.config, config)

    this.addToEnv('core-options', {})
    this.addToEnv('chartInstance', { args: {} })
  }

  draw () {
    const children = this.getChildren()
    this.addToEnv('animationManager', children.animationManager.elemStore[0])
    const config = this.config
    let paper

    if (!(paper = this.getFromEnv('paper'))) {
      paper = Raphael(config.id, config.width, config.height)
      this.addToEnv('paper', paper)
    }

    const { width, height } = paper.canvas.getBoundingClientRect()
    const setDimension = child => child.setDimension(width, height)

    config.width = width
    config.height = height

    for (const key in children) {
      if (children.hasOwnProperty(key)) {
        const childs = children[key].elemStore
        childs
          .filter(child => child.config.width == null || child.config.height == null)
          .filter(hasSetDimension)
          .forEach(setDimension)
      }
    }
  }
}

export default FusionStory

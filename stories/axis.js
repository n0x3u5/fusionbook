import { Story } from '../src/lib/story.js'

import Axis from '../../fusioncharts-xt/packages/fc-core/src/axis/axis_new.js'

const axisStory = new Story('Axis')

axisStory.addChapter('with defaults', {
  content: story => {
    story
      .attachChild(Axis, 'axis')
      .configure({})
  },
  meta: []
})

export default axisStory

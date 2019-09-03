'use strict'

function createDOMNode () {
  const xlmnsSvg = 'http://www.w3.org/2000/svg'
  let nodeName = arguments[0]
  let attrbutes = arguments[1]
  let node = document.createElementNS(xlmnsSvg, nodeName)
  for (let property in attrbutes) {
    node.setAttribute(property, attrbutes[property])
  }
  return node
}

function calculateStar (domObject, offsetWidth, offsetHeight, width, height, strokeWidth) {
  let r = Math.min(height, width) - strokeWidth
  if (strokeWidth > r / 10) {
    domObject.setAttribute('stroke-width', 2)
    console.warn('StrokeWidth crossed max, setting to default')
  }
  let cx = r / 2 + offsetWidth
  let cy = r / 2 + offsetHeight
  let offsetX = r / 3
  let offsetY = r / 3
  let d = 'M' + cx + ',' + offsetHeight + ' ' +
      'L' + (cx + offsetX) + ',' + (offsetHeight + offsetY) + ' ' +
      'H' + (r + offsetWidth) + ' ' +
      'L' + (cx + offsetX) + ',' + (cy + offsetY / 2) + ' ' +
      'L' + (r + offsetWidth) + ',' + (r + offsetHeight) + ' ' +
      'L' + cx + ',' + (cy + offsetY) + ' ' +
      'L' + offsetWidth + ',' + (r + offsetHeight) + ' ' +
      'L' + (cx - offsetX) + ',' + (cy + offsetY / 2) + ' ' +
      'L' + offsetWidth + ',' + (offsetY + offsetHeight) + ' ' +
      'H' + (cx - offsetX) + ' ' +
      'Z'

  domObject.setAttribute('d', d)
}
export default function createStar (args) {
  let container = args['container']
  let height = args['height']
  let width = args['width']
  let stroke = args['stroke']
  let strokeWidth = args['stroke-width']
  let fill = args['fill']
  let direction = args['direction']
  let numberOfStars = args['numberOfStars']
  let rating = args['rating']
  let preColorFill = args['pre-rating-fill-color']
  let postColorFill = args['post-rating-fill-color']
  let preStrokeColor = args['pre-stroke-color']
  let postStrokeColor = args['post-stroke-color']
  if (container === undefined) {
    console.error('Number of args is not correct')
    return null
  }
  if (height < 0 || height === undefined) {
    console.error('Height is undefined or is a negative value')
    return null
  }
  if (width < 0 || width === undefined) {
    console.error('Width is undefined or is a negative value')
    return null
  }
  if (strokeWidth < 0 || strokeWidth === undefined) {
    console.error('StrokeWidth is undefined or is a negative value')
    return null
  }
  if (fill === undefined) {
    console.error('fill is undefined or has wrong value')
    return null
  }
  if (stroke === undefined) {
    console.error('stroke is undefined or has wrong value')
    return null
  }
  if (direction === undefined) {
    direction = 1
  }
  if (numberOfStars === undefined || !Number.isInteger(numberOfStars) || numberOfStars < 0) {
    numberOfStars = 5
    console.warn('numberOfStars is undefined or is not a valid value')
  }
  if (preColorFill === undefined) {
    preColorFill = fill
  }
  if (postColorFill === undefined) {
    postColorFill = fill
  }
  if (preStrokeColor === undefined) {
    preStrokeColor = stroke
  }
  if (postStrokeColor === undefined) {
    postStrokeColor = stroke
  }
  let attrSvg = {
    'width': width,
    'height': height
  }
  let attrPath = {
    'fill': fill,
    'stroke-width': strokeWidth,
    'stroke': stroke
  }

  let svg = createDOMNode('svg', attrSvg)
  container.appendChild(svg)

  if (!Number.isInteger(rating) && rating !== undefined) {
    let offset = rating.toString().split('.')[1]
    if (offset.length === 1) {
      offset += '0'
    } else if (offset.length > 2) {
      offset = offset.split('')
      console.warn('Rounding off to 2 digits only')
      offset = offset[0] + offset[1]
    }
    offset += '%'
    let def = createDOMNode('defs', null)
    svg.appendChild(def)
    let argGradient = {
      'id': 'gradient-svg-fill',
      'x1': '0%',
      'x2': '100%',
      'y1': '0%',
      'y2': '0%'
    }
    let linearGradient = createDOMNode('linearGradient', argGradient)
    def.appendChild(linearGradient)
    argGradient = {
      'offset': offset,
      'stop-color': preColorFill
    }
    let stop = createDOMNode('stop', argGradient)
    linearGradient.appendChild(stop)
    argGradient = {
      'offset': offset,
      'stop-color': postColorFill
    }
    stop = createDOMNode('stop', argGradient)
    linearGradient.appendChild(stop)
    // end of fill
    argGradient = {
      'id': 'gradient-svg-stroke',
      'x1': '0%',
      'x2': '100%',
      'y1': '0%',
      'y2': '0%'
    }
    linearGradient = createDOMNode('linearGradient', argGradient)
    def.appendChild(linearGradient)
    argGradient = {
      'offset': offset,
      'stop-color': preStrokeColor
    }
    stop = createDOMNode('stop', argGradient)
    linearGradient.appendChild(stop)
    argGradient = {
      'offset': offset,
      'stop-color': postStrokeColor
    }
    stop = createDOMNode('stop', argGradient)
    linearGradient.appendChild(stop)
  }
  width = svg.clientWidth
  height = svg.clientHeight
  let path
  for (let i = 0; i < numberOfStars; i++) {
    path = createDOMNode('path', attrPath)
    svg.appendChild(path)
    let offset
    if (direction === 1) {
      offset = width / numberOfStars * i + strokeWidth
      calculateStar(path, offset, (height - width / numberOfStars) / 2, (width - strokeWidth * 4) / numberOfStars, height, strokeWidth)
    } else {
      offset = height / numberOfStars * i + strokeWidth
      calculateStar(path, (width - height / numberOfStars) / 2, offset, width, (height - strokeWidth * 4) / numberOfStars, strokeWidth)
    }
    if (rating !== undefined) {
      if (rating >= 1) {
        path.setAttribute('fill', preColorFill)
        path.setAttribute('stroke', preStrokeColor)
        rating -= 1
      } else if (rating > 0 && rating < 1) {
        path.setAttribute('fill', 'url(#gradient-svg-fill)')
        path.setAttribute('stroke', 'url(#gradient-svg-stroke)')
        rating -= 1
      } else {
        path.setAttribute('fill', postColorFill)
        path.setAttribute('stroke', postStrokeColor)
      }
    }
  }
}

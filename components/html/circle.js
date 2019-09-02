export default (root, { width = '500px', height = '500px', bgColor = 'brown' } = {}) => {
  let rect = root.querySelector('#daCircle')

  if (!rect) {
    rect = document.createElement('div')
    root.appendChild(rect)
  }

  rect.setAttribute('id', 'daCircle')
  rect.style.borderRadius = '50%'
  rect.style.width = width
  rect.style.height = height
  rect.style.backgroundColor = bgColor

  return rect
}

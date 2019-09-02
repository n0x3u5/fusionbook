export default (root, { width = '500px', height = '500px', bgColor = 'brown' } = {}) => {
  let rect = root.querySelector('#daRect')

  if (!rect) {
    rect = document.createElement('div')
    root.appendChild(rect)
  }

  rect.setAttribute('id', 'daRect')
  rect.style.width = width
  rect.style.height = height
  rect.style.backgroundColor = bgColor

  return rect
}

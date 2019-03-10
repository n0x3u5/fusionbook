/**
 * Checks if the input is a simple JavaScript object or not.
 *
 * @param {*} x The entity which needs to be checked for being an object
 * @returns {boolean} Whether the input is a simple JavaScript object
 */
export default x => {
  if (x === null || Array.isArray(x)) return false

  return ((typeof x === 'function') || (typeof x === 'object'))
}

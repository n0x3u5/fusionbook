export default (x: unknown): boolean => {
  if (x === null || Array.isArray(x)) return false

  return ((typeof x === 'function') || (typeof x === 'object'))
}

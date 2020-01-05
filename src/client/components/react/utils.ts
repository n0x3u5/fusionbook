const noOp = (): void => { /* no-op */ };
const isClient = typeof window === "object";
const isObject = (x: unknown): boolean => {
  if (x === null || Array.isArray(x)) return false

  return ((typeof x === 'function') || (typeof x === 'object'))
}


export { noOp, isClient, isObject };

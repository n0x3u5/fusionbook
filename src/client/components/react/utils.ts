const noOp = (): void => { /* no-op */ };
const isClient = typeof window === "object";

export { noOp, isClient };

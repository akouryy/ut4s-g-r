export class NotImplementedError extends Error {
  constructor(fn?: string) {
    super(fn !== undefined ? `Not implemented: ${fn}` : 'Not implemented')
  }
}

export function notImplemented(fn?: string): never {
  throw new NotImplementedError(fn)
}

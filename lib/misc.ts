import { last, mathMod } from 'ramda'

/**
 * @param a a nonempty array
 * @param i a circular index
 */
export function circularlyAt<T>(a: readonly T[], i: number): T {
  return a[mathMod(i, a.length)]
}

export function lastBang<T>(a: readonly T[]): T {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return last(a)!
}

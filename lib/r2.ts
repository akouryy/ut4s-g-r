import * as R from 'ramda'
import { R2Algo, R2Point } from './r2Base'
import { mult, plus } from './fn'
import { calcKappa } from './r2Kappa'

export function calcVertices(points: R2Point[], algo: R2Algo): R2Point[] {
  switch (algo.kind) {
    case 'Bezier': return calcBezier(points, algo.opts.deCasteljau)
    case 'Kappa': return calcKappa(points, algo.opts.loop)
    default: return []
  }
}

const NVertices = 100

export function calcBezier(points: R2Point[], deCasteljau: boolean): R2Point[] {
  const n = points.length - 1

  if (n < 2) {
    return []
  }

  if (deCasteljau) {
    return R.range(0, NVertices + 1).map((tBase) => {
      const t = tBase / NVertices

      let step = points
      R.range(0, n).forEach(() => {
        step = R.aperture(2, step).map(([a, b]) => {
          return new R2Point(...Array<'x'|'y'|'z'>('x', 'y', 'z').map((prop) => {
            return a[prop] * (1 - t) + b[prop] * t
          }) as [number, number, number])
        })
      })
      return step[0]
    })
  }

  return R.range(0, NVertices + 1).map((tBase) => {
    const t = tBase / NVertices
    const f = (prop: 'x' | 'y' | 'z'): number => {
      let normalizer = 0
      return points.map((pt, i) => {
        const xi = binomSimple(n, i) * t ** i * (1 - t) ** (n - i) * pt.weight
        normalizer += xi
        return xi * pt[prop]
      }).reduce(plus) / normalizer
    }
    return new R2Point(f('x'), f('y'), f('z'))
  })
}

function binomSimple(n: number, k: number): number {
  return (
    R.range(Math.max(k, n - k) + 1, n + 1).reduce(mult, 1) /
    R.range(1, 1 + Math.min(k, n - k)).reduce(mult, 1)
  )
}

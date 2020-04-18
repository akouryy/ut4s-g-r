import { range } from 'lodash'
import { R2Algo, R2Point } from './r2Base'
import { mult, plus } from './fn'

type vec3 = [number, number, number]

export function calcVertices(points: R2Point[], algo: R2Algo): vec3[] {
  switch (algo.kind) {
    case 'Bezier': return calcBezier(points, algo.deCasteljau)
    default: return []
  }
}

const NVertices = 100

function calcBezier(points: R2Point[], deCasteljau: boolean): vec3[] {
  const n = points.length - 1

  if (n < 2) {
    return []
  }

  if (deCasteljau) {
    return []
  }

  return range(NVertices + 1).map((tBase) => {
    const t = tBase / NVertices
    const f = (prop: 'x' | 'y' | 'z'): number => {
      let normalizer = 0
      return points.map((pt, i) => {
        const xi = binomSimple(n, i) * t ** i * (1 - t) ** (n - i) * pt.weight
        normalizer += xi
        return xi * pt[prop]
      }).reduce(plus) / normalizer
    }
    return [f('x'), f('y'), f('z')]
  })
}

function binomSimple(n: number, k: number): number {
  return (
    range(n, 1 + Math.max(k, n - k), -1).reduce(mult, 1) /
    range(1, 1 + Math.min(k, n - k)).reduce(mult, 1)
  )
}

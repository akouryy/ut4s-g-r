import * as R from 'ramda'
import { R2Algo, R2Point } from './r2Base'
import { mult, plus } from './fn'
import { calcKappa } from './r2Kappa'

export function calcVertices(points: R2Point[], algo: R2Algo): R2Point[] {
  switch (algo.kind) {
    case 'Bezier': return calcBezier(points, { deCasteljau: algo.opts.deCasteljau, nSample: 100 })
    case 'Kappa': return calcKappa(points, { iter: 10, loop: algo.opts.loop, nSample: 1000 })
    default: throw new Error('この曲線は未実装です')
  }
}

export function calcBezier(
  points: R2Point[],
  { deCasteljau, nSample }: {deCasteljau: boolean, nSample: number},
): R2Point[] {
  const n = points.length - 1

  if (n < 2) {
    throw new Error('[Bezier] 点を3つ以上指定してください')
  }

  if (deCasteljau) {
    return R.range(0, nSample + 1).map((tBase) => {
      const t = tBase / nSample

      const cut = calcBezierCut(points, t)
      return cut[cut.length - 1]
    })
  }

  return R.range(0, nSample + 1).map((tBase) => {
    const t = tBase / nSample
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

export function calcBezierCut(points: R2Point[], splitAt: number): R2Point[] {
  if (splitAt < 0 || 1 < splitAt) {
    throw new Error('[Bezier/Cut] 切断点は0以上1以下で指定してください')
  }

  const n = points.length - 1

  if (n < 2) {
    throw new Error('[Bezier/Cut] 点を3つ以上指定してください')
  }

  let step = points
  const temps = [step[0]]

  R.range(0, n).forEach(() => {
    step = R.aperture(2, step).map(([a, b]) => {
      return new R2Point(...Array<'x' | 'y' | 'z'>('x', 'y', 'z').map((prop) => {
        return a[prop] * (1 - splitAt) + b[prop] * splitAt
      }) as [number, number, number])
    })
    temps.push(step[0])
  })

  return temps
}

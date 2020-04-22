import * as R from 'ramda'
import { R2Algo, R2Point, R2AlgoCRKnot } from './r2Base'
import { mult, plus } from './fn'
import { calcKappa } from './r2Kappa'
import { circularlyAt, lastBang } from './misc'

export function calcVertices(points: R2Point[], algo: R2Algo): R2Point[] {
  const nSample = Math.floor(200 * Math.sqrt(points.length))

  switch (algo.kind) {
    case 'Bezier': return calcBezier(points, { deCasteljau: algo.opts.deCasteljau, nSample })
    case 'CatmullRom': return calcCatmullRom(points, { knot: algo.opts.knot, nSample })
    case 'Kappa': return calcKappa(points, { iter: 10, loop: algo.opts.loop, nSample })
    default: throw new Error('この曲線は未実装です')
  }
}

export function calcBezier(
  points: R2Point[],
  { deCasteljau, nSample }: { deCasteljau: boolean, nSample: number },
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

export function calcCatmullRom(
  pointsRaw: R2Point[],
  { knot, nSample }: { knot: R2AlgoCRKnot, nSample: number },
): R2Point[] {
  // 連続する重複の除去 (loopなら循環リストとみなす)
  const points = R.pipe(
    R.always(pointsRaw),
    R.dropRepeatsWith(R.eqBy((p) => p.toVector3())),
    R.dropLastWhile(R.equals(pointsRaw[0])),
  )()

  const n = points.length

  if (n < 2) {
    throw new Error('[CatmullRom] 異なる点を3つ以上指定してください')
  }

  const pointsX = [...points, points[0]]

  const pointTsX = R.scan((ta, [pa, pb]) => {
    if (knot === 'uniform') {
      return ta + 1
    }
    if (knot === 'chordal') {
      return ta + pa.toVector3().sub(pb.toVector3()).length()
    }
    return ta + pa.toVector3().sub(pb.toVector3()).length() ** 0.5
  }, 0, R.aperture(2, pointsX))

  const samples = R.range(0, nSample).map((i) => i * lastBang(pointTsX) / nSample)

  const pointTs = pointTsX.slice(0, pointTsX.length - 1)

  return [
    ...samples.map((t) => {
      const i = R.findLastIndex((s) => (s <= t), pointTs)

      const ps = R.range(i - 1, i + 3).map((j) => circularlyAt(points, j))
      const pts = R.range(i - 1, i + 3).map((j) => {
        if (j < 0) {
          return circularlyAt(pointTs, j) + pointTsX[0] - lastBang(pointTsX)
        }
        if (j >= pointTs.length) {
          return circularlyAt(pointTs, j) + lastBang(pointTsX) - pointTsX[0]
        }
        return pointTs[j]
      })

      const as = R.zip(R.aperture(2, ps.map((p) => p.toVector3())), R.aperture(2, pts))
        .map(([[pl, pr], [tl, tr]]) => {
          return pl.clone().lerp(pr, (t - tl) / (tr - tl))
        })

      const bs = R.zip(R.aperture(2, as), R.aperture(3, pts)).map(([[pl, pr], [tl, _, tr]]) => {
        return pl.clone().lerp(pr, (t - tl) / (tr - tl))
      })

      const cs = R.zip(R.aperture(2, bs), R.aperture(4, pts)).map(([[pl, pr], [_, tl, tr, __]]) => {
        return pl.clone().lerp(pr, (t - tl) / (tr - tl))
      })

      console.log(cs)
      return new R2Point(cs[0])
    }),
    pointsRaw[0],
  ]
}

/* eslint-disable no-param-reassign */
// https://qiita.com/Rijicho_nl/items/05ee4c8d77e99e29daa5
import * as R from 'ramda'
import { Vector2 } from 'three'
import { calcBezier } from './r2'
import { R2Point } from './r2Base'

class Controls {
  readonly points: Vector2[]
  readonly segmentCount: number

  constructor(n: number) {
    console.assert(n >= 3)
    this.segmentCount = n
    this.points = [...Array(this.segmentCount * 2 + 1)].map(() => new Vector2())
  }

  get(i: number, j: number): Vector2 {
    return this.points[i * 2 + j]
  }

  set(i: number, j: number, vec: Vector2): void {
    this.points[i * 2 + j] = vec
  }
}

class Env {
  readonly n: number
  readonly nRange: number[]
  readonly p: readonly Vector2[]
  readonly loop: boolean
  readonly λ: Float32Array
  readonly cRaw: Controls
  readonly t: Float64Array
  readonly A: Float64Array

  constructor(p: Vector2[], loop: boolean) {
    this.n = p.length
    this.nRange = R.range(0, this.n)
    this.p = p
    this.loop = loop
    this.λ = new Float32Array(this.n)
    this.cRaw = new Controls(this.n)
    this.t = new Float64Array(this.n)
    this.A = new Float64Array((this.n + 2) * 3)
  }

  c(i: number, j: number): Vector2 {
    console.assert(0 <= i && i < this.n && 0 <= j && j <= 2)
    return this.cRaw.get(i, j)
  }
}

class XArrayView {
  private readonly head: Vector2
  private readonly mid: readonly Vector2[]
  private readonly last: Vector2

  constructor(head: Vector2, mid: readonly Vector2[], last: Vector2) {
    this.head = head
    this.mid = mid
    this.last = last
  }

  get(i: number): Vector2 {
    if (i === 0) { return this.head }
    if (i > this.mid.length) { return this.last }
    return this.mid[i - 1]
  }
}

class XControlsView {
  private readonly head: Vector2
  private readonly mid: Controls
  private readonly last: Vector2

  constructor(head: Vector2, mid: Controls, last: Vector2) {
    this.head = head
    this.mid = mid
    this.last = last
  }

  get(i: number): Vector2 {
    if (i === 0) { return this.head }
    if (i > this.mid.segmentCount) { return this.last }
    return this.mid.get(i - 1, 1)
  }
}

function step0(env: Env): void {
  const { n } = env

  env.λ.fill(0.5)
  if (!env.loop) {
    env.λ[0] = 0
    env.λ[n - 2] = 1
  }
  env.nRange.forEach((i) => {
    env.c(i, 1).copy(env.p[i])
    const next = (i + 1) % n
    env.c(i, 2).lerpVectors(env.p[i], env.p[next], env.λ[i])
    env.c(next, 0).lerpVectors(env.p[i], env.p[next], env.λ[i])
  })
  ;[0, !env.loop && 3, !env.loop && env.A.length - 6, env.A.length - 3].forEach((s) => {
    if (s !== false) {
      env.A[s] = 0
      env.A[s + 1] = 1
      env.A[s + 2] = 0
    }
  })
}

function step1(env: Env): void {
  function area(p: Vector2, q: Vector2, r: Vector2): number {
    return Math.abs(p.clone().sub(r).cross(q.clone().sub(r))) / 2
  }

  const { n } = env
  const begin = env.loop ? 0 : 1
  const end = env.loop ? n : n - 2
  for (let i = begin; i < end; ++i) {
    const next = (i + 1) % n
    const a1 = area(env.c(i, 0), env.c(i, 1), env.c(next, 1))
    const a2 = area(env.c(i, 1), env.c(next, 1), env.c(next, 2))
    if (Math.abs(a1 - a2) < 0.00001) {
      env.λ[i] = 0.5
    } else {
      env.λ[i] = (a1 - Math.sqrt(a1 * a2)) / (a1 - a2)
    }
  }
}

function step2(env: Env): void {
  env.nRange.forEach((i) => {
    const next = (i + 1) % env.n
    env.c(i, 2).lerpVectors(env.c(i, 1), env.c(next, 1), env.λ[i])
    env.c(next, 0).lerpVectors(env.c(i, 1), env.c(next, 1), env.λ[i])
  })
}

function step3(env: Env): void {
  function cardanoReal(a: number, b: number, c: number, d: number): number {
    function cbrt(x: number): number {
      return Math.sign(x) * Math.abs(x) ** (1 / 3)
    }

    const A = b / a
    const B = c / a
    const C = d / a
    const p = (B - A * A / 3) / 3
    const q = (2 / 27 * A * A * A - A * B / 3 + C) / 2
    const D = q * q + p * p * p
    const Ad3 = A / 3

    if (Math.abs(D) < 1.0E-12) {
      return cbrt(q) - Ad3
    }
    if (D > 0) {
      const sqrtD = Math.sqrt(D)
      const u = cbrt(-q + sqrtD)
      const v = cbrt(-q - sqrtD)
      return u + v - Ad3
    }

    const tmp = 2 * Math.sqrt(-p)
    const arg = Math.atan2(Math.sqrt(-D), -q) / 3
    const pi2d3 = 2 * Math.PI / 3
    const X1mAd3 = tmp * Math.cos(arg) - Ad3
    if (0 <= X1mAd3 && X1mAd3 <= 1) {
      return X1mAd3
    }

    const X2mAd3 = tmp * Math.cos(arg + pi2d3) - Ad3
    if (0 <= X2mAd3 && X2mAd3 <= 1) {
      return X2mAd3
    }

    const X3mAd3 = tmp * Math.cos(arg + pi2d3 + pi2d3) - Ad3
    if (0 <= X3mAd3 && X3mAd3 <= 1) {
      return X3mAd3
    }

    throw new Error(`Invalid solution: ${X1mAd3}, ${X2mAd3}, ${X3mAd3}`)
  }

  env.nRange.forEach((i) => {
    if (env.c(i, 0).equals(env.c(i, 2))) {
      env.t[i] = 0.5
    } else if (env.p[i].equals(env.c(i, 0))) {
      env.t[i] = 0
    } else if (env.p[i].equals(env.c(i, 2))) {
      env.t[i] = 1
    }
    const c2 = env.c(i, 2).clone().sub(env.c(i, 0))
    const p = env.p[i].clone().sub(env.c(i, 0))

    const a = c2.lengthSq()
    const b = -3 * c2.dot(p)
    const c = p.dot(p.clone().multiplyScalar(2).add(c2))
    const d = -p.lengthSq()

    env.t[i] = cardanoReal(a, b, c, d)
  })
}

function solveTridiagonal(env: Env, cx: XControlsView, px: XArrayView): void {
  const { n } = env

  /* A=LU, Ly=p */
  cx.get(0).copy(px.get(0))
  for (let i = 0, i3 = 0; i <= n; ++i, i3 += 3) {
    env.A[i3 + 3] /= env.A[i3 + 1]
    env.A[i3 + 4] -= env.A[i3 + 3] * env.A[i3 + 2]
    cx.get(i + 1)
      .copy(cx.get(i)).multiplyScalar(-env.A[i3 + 3]) /* negated */
      .add(px.get(i + 1))
  }

  /* Uc=y */
  cx.get(n + 1).divideScalar(env.A[n * 3 + 4])
  for (let i = n, i3 = n * 3; i >= 0; --i, i3 -= 3) {
    cx.get(i)
      .sub(cx.get(i + 1).clone().multiplyScalar(env.A[i3 + 2]))
      .divideScalar(env.A[i3 + 1])
  }
}

function step4(env: Env): void {
  const { loop, n } = env
  for (let i = loop ? 0 : 1, lim = loop ? n : n - 1; i < lim; ++i) {
    const ofs = (i + 1) * 3
    const prev = (i - 1 + n) % n
    const next = (i + 1) % n

    if (env.t[i] === 1 && env.t[next] === 0 || !loop && i === n - 2 && env.t[i] === 1) {
      env.t[i] = 0.99999
    }
    if (!loop && i === 1 && env.t[i] === 0) {
      env.t[i] = 0.00001
    }

    const tmp = (1 - env.t[i]) * (1 - env.t[i])
    env.A[ofs] = (1 - env.λ[prev]) * tmp
    env.A[ofs + 1] = env.λ[prev] * tmp + (2 - (1 + env.λ[i]) * env.t[i]) * env.t[i]
    env.A[ofs + 2] = env.λ[i] * env.t[i] * env.t[i]
  }

  const cx = new XControlsView(env.c(n - 1, 1).clone(), env.cRaw, env.c(0, 1).clone())
  const px = new XArrayView(env.c(n - 1, 1).clone(), env.p, env.c(0, 1).clone())
  solveTridiagonal(env, cx, px)
}

function calcControls(env: Env, iter: number): void {
  step0(env)
  R.range(0, iter).forEach((i) => {
    if (i < 3 || i < iter / 2) { step1(env) }
    step2(env)
    step3(env)
    step4(env)
  })
  step2(env)
}

const ITER = 10

export function calcKappa(pointsRaw: R2Point[], loop: boolean): R2Point[] {
  const points = R.dropRepeatsWith(R.eqBy((p) => p.toVector3()), pointsRaw)
  if (points.length >= 3 &&
    points[0].toVector3().equals(points[points.length - 1].toVector3())) {
    points.pop()
  }
  if (points.length < 3) {
    return []
  }

  const env = new Env(points.map((p) => new Vector2(p.x, p.z)), loop)

  calcControls(env, ITER)

  return R.range(0, loop ? env.n : env.n - 2).flatMap((i) => {
    const next = (i + 1) % env.n
    return calcBezier(
      [env.c(next, 0), env.c(next, 1), env.c(next, 2)].map((v) => new R2Point(v.x, 0, v.y)),
      false,
    )
  })
}

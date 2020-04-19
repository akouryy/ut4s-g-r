import React from 'react'
import { Vector3 } from 'three'
import { v4 as uuidv4 } from 'uuid'
import { notImplemented } from './errors'

export class R2Point {
  id: string
  readonly x: number
  readonly y: number
  readonly z: number
  readonly weight: number

  constructor()
  constructor(x: number, y: number, z: number)
  constructor(x: number, y: number, z: number, weight: number)
  constructor(v3: Vector3)

  constructor(x: number | Vector3 = 0, y = 0, z = 0, weight = 1) {
    this.id = uuidv4()
    if (typeof x === 'number') {
      this.x = x
      this.y = y
      this.z = z
    } else {
      this.x = x.x
      this.y = x.y
      this.z = x.z
    }
    console.assert(weight !== 0)
    this.weight = weight
  }

  toVector3(): Vector3 {
    return new Vector3(this.x, this.y, this.z)
  }

  toString(): string {
    return `(${this.x},${this.y},${this.z}; w=${this.weight})`
  }
}

export type R2AlgoKind = 'Bezier' | 'CatmullRom' | 'BSpline' | 'NURBS' | 'Kappa'

export interface R2AlgoOpts {deCasteljau: boolean, loop: boolean}

export class R2Algo {
  readonly kind: R2AlgoKind
  readonly opts: R2AlgoOpts

  constructor(kind: R2AlgoKind = 'Bezier', opts: Partial<R2AlgoOpts> = {}) {
    this.kind = kind
    this.opts = { deCasteljau: false, loop: true, ...opts }
  }

  withKind(kind: R2AlgoKind): R2Algo {
    return new R2Algo(kind, this.opts)
  }

  withOptsDiff(diff: Partial<R2AlgoOpts>): R2Algo {
    return new R2Algo(this.kind, { ...this.opts, ...diff })
  }

  toString(): string {
    return [
      'Algo(',
      this.kind,
      this.opts.deCasteljau && ' (de Casteljau)',
      this.opts.loop && ' (loop)',
    ].filter((x) => x).join('')
  }
}

export const R2AlgoKinds: R2AlgoKind[] = ['Bezier', 'CatmullRom', 'BSpline', 'NURBS', 'Kappa']

export const R2AlgoNames: { [_ in R2AlgoKind]: string } = {
  Bezier: 'n次有理ベジェ曲線',
  CatmullRom: 'Catmull-Romスプライン',
  BSpline: 'Bスプライン',
  NURBS: 'NURBS',
  Kappa: 'κ曲線',
}

export function usesY(algo: R2Algo): boolean {
  return algo.kind === 'Bezier' || algo.kind === 'Kappa'
}

export function usesWeight(algo: R2Algo): boolean {
  return algo.kind === 'Bezier' && !algo.opts.deCasteljau
}

export type R2Messages = {[_ in string]?: string | null}

export interface R2ContextProps {
  messages: R2Messages
  points: R2Point[]
  algo: R2Algo
  addMessage(key: string, message: string | null): void
  setPoints(_: R2Point[] | ((_: R2Point[]) => R2Point[])): void
  setAlgo(_: R2Algo | ((_: R2Algo) => R2Algo)): void
}

export const R2Context = React.createContext<R2ContextProps>({
  messages: {},
  points: [],
  algo: new R2Algo(),
  addMessage() { notImplemented() },
  setPoints() { notImplemented() },
  setAlgo() { notImplemented() },
})

import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { notImplemented } from './errors'

export interface R2ContextProps {
  points: R2Point[]
  algo: R2Algo
  setPoints(_: (_: R2Point[]) => R2Point[]): void
  setAlgo(_: R2Algo): void
}

export class R2Point {
  id: string
  x: number
  y: number
  z: number
  weight: number

  constructor() {
    this.id = uuidv4()
    this.x = 0
    this.y = 0
    this.z = 0
    this.weight = 1
  }

  toString(): string {
    return `(${this.x},${this.y}; w=${this.weight})`
  }
}

export type R2Algo =
  { kind: 'Bezier', deCasteljau: boolean } //, sampling
  | { kind: 'CatmullRom' } //, knot
  | { kind: 'BSpline' }
  | { kind: 'NURBS' }
  | { kind: 'Kappa' }

export function usesWeight(algo: R2Algo): boolean {
  return algo.kind === 'Bezier'
}

export const R2AlgoDefault: R2Algo = { kind: 'Bezier', deCasteljau: false }

export const R2Context = React.createContext<R2ContextProps>({
  points: [],
  algo: { kind: 'Bezier', deCasteljau: false },
  setPoints() { notImplemented() },
  setAlgo() { notImplemented() }
})

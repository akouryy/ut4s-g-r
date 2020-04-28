import { R2Point, R2Algo } from './base'

let counter = 0

export const resetR2CurveCounter = (): void => { counter = 0 }
export const incrementR2CurveCounter = (): number => ++counter

export class Curve {
  readonly algo: R2Algo
  readonly points: readonly R2Point[]
  readonly id: number

  constructor(algo: R2Algo, points: readonly R2Point[], id?: number) {
    this.algo = algo
    this.id = id ?? incrementR2CurveCounter()
    this.points = points
  }

  toString(): string {
    return `${this.algo.toString()} #${this.id}`
  }

  withAlgo(algo: R2Algo): Curve {
    return new Curve(algo, this.points, this.id)
  }

  withPoints(points: readonly R2Point[]): Curve {
    return new Curve(this.algo, points, this.id)
  }
}

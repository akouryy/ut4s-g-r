import React from 'react'
import { zip } from 'lodash'
import { NoChild } from '../lib/reactUtil'
import { R2Context, usesWeight, R2Point, usesY } from '../lib/r2Base'
import { R2ControlPoint } from './R2ControlPoint'
import { R2ControlAlgo } from './R2ControlAlgo'

export const R2Control: React.FC<NoChild> = () => {
  const { points, setPoints, algo } = React.useContext(R2Context)

  const addPoint = React.useCallback(() => {
    setPoints((pts) => [...pts, new R2Point()])
  }, [setPoints])

  const setPointFns = React.useMemo(() => (
    points.map((_, i) => (newPoint: R2Point) => setPoints((oldPoints) => {
      const pts = [...oldPoints]
      pts[i] = newPoint
      return pts
    }))
  ), [points, setPoints])

  return (
    <div className='R2Control'>
      <R2ControlAlgo />
      <table className='R2Control-Points'>
        <thead>
          <tr>
            <th>x</th>
            {usesY(algo) && (<th>y(高さ)</th>)}
            <th>z</th>
            {usesWeight(algo) && (<th>重み</th>)}
          </tr>
        </thead>
        <tbody>
          {zip(points, setPointFns).map(([point, setPoint]) => point && setPoint && (
            <R2ControlPoint
              point={point}
              setPoint={setPoint}
              key={point.id}
            />
          ))}
        </tbody>
      </table>
      <button onClick={addPoint} type='button'>
        点を追加
      </button>
    </div>
  )
}

import React from 'react'
import { zip } from 'lodash'
import { NoChild } from '../lib/reactUtil'
import { R2Context, createR2Point, usesWeight, R2Point } from '../contexts/R2Context'
import { R2ControlPoint } from './R2ControlPoint'

export const R2Control: React.FC<NoChild> = () => {
  const { points, setPoints, algo } = React.useContext(R2Context)

  const addPoint = React.useCallback(() => {
    setPoints((pts) => [...pts, createR2Point()])
  }, [setPoints])

  const setPointFns = React.useMemo(() => (
    points.map((_, i) => (newPoint: R2Point) => setPoints((oldPoints) => {
      const pts = [...oldPoints]
      pts[i] = newPoint
      return pts
    }))
  ), [points, setPoints])

  const showWeight = usesWeight(algo)

  return (
    <div className='R2Control'>
      <table className='R2Control-Points'>
        <thead>
          <tr>
            <th>x</th>
            <th>y</th>
            {showWeight && (<th>重み</th>)}
          </tr>
        </thead>
        <tbody>
          {zip(points, setPointFns).map(([point, setPoint]) => point && setPoint && (
            <R2ControlPoint
              point={point}
              setPoint={setPoint}
              showWeight={showWeight}
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

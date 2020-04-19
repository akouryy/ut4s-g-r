import React from 'react'
import { NoChild } from '../lib/reactUtil'
import { R2Context, usesWeight, R2Point, usesY } from '../lib/r2Base'
import { R2ManagePoint } from './R2ManagePoint'
import { R2ManageAlgo } from './R2ManageAlgo'

export const R2Manage: React.FC<NoChild> = () => {
  const { points, setPoints, algo } = React.useContext(R2Context)

  const addPoint = React.useCallback(() => {
    setPoints((pts) => [...pts, new R2Point()])
  }, [setPoints])

  return (
    <div className='R2Manage'>
      <R2ManageAlgo />
      <h3 className='R2Manage-Title'>点</h3>
      <table className='R2Manage-Points'>
        <thead>
          <tr>
            <th className='R2Manage-PointsCellWide'>x</th>
            {usesY(algo) && (<th className='R2Manage-PointsCellWide'>y(高さ)</th>)}
            <th className='R2Manage-PointsCellWide'>z</th>
            {usesWeight(algo) && (<th className='R2Manage-PointsCellWide'>重み</th>)}
            <th>操作</th>
            <th className='R2Manage-PointsID'>ID</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point, i) => point && (
            <R2ManagePoint
              index={i}
              isLast={i === points.length - 1}
              key={point.id}
              point={point}
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

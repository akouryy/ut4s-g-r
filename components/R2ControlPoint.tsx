import React from 'react'
import { NoChild } from '../lib/reactUtil'
import { R2Point } from '../contexts/R2Context'
import { EditableText } from './EditableText'

interface P {
  point: R2Point
  setPoint: (_: R2Point) => void
  showWeight: boolean
}

export const R2ControlPoint: React.FC<P & NoChild> = ({ point, setPoint, showWeight }) => {
  const updateX = React.useCallback((x: string) => {
    setPoint({ ...point, x: parseInt(x, 10) })
  }, [point, setPoint])

  const updateY = React.useCallback((y: string) => {
    setPoint({ ...point, y: parseInt(y, 10) })
  }, [point, setPoint])

  const updateWeight = React.useCallback((weight: string) => {
    setPoint({ ...point, weight: parseInt(weight, 10) })
  }, [point, setPoint])

  return (
    <tr>
      <td>
        <EditableText type='number' updateValue={updateX} value={point.x.toString()} />
      </td>
      <td>
        <EditableText type='number' updateValue={updateY} value={point.y.toString()} />
      </td>
      {showWeight && (
        <td>
          <EditableText type='number' updateValue={updateWeight} value={point.weight.toString()} />
        </td>
      )}
    </tr>
  )
}

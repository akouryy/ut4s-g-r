import React from 'react'
import { NoChild } from '../lib/reactUtil'
import { R2Point } from '../lib/r2Base'
import { NumberInput } from './NumberInput'

interface P {
  point: R2Point
  setPoint: (_: R2Point) => void
  showWeight: boolean
}

export const R2ControlPoint: React.FC<P & NoChild> = ({ point, setPoint, showWeight }) => {
  const updateX = React.useCallback((x: number) => {
    setPoint(Object.assign(new R2Point(), point, { x }))
  }, [point, setPoint])

  const updateY = React.useCallback((y: number) => {
    setPoint(Object.assign(new R2Point(), point, { y }))
  }, [point, setPoint])

  const updateZ = React.useCallback((z: number) => {
    setPoint(Object.assign(new R2Point(), point, { z }))
  }, [point, setPoint])

  const updateWeight = React.useCallback((weight: number) => {
    setPoint(Object.assign(new R2Point(), point, { weight }))
  }, [point, setPoint])

  return (
    <tr>
      <td>
        <NumberInput step={0.01} updateValue={updateX} value={point.x} />
      </td>
      <td>
        <NumberInput step={0.01} updateValue={updateY} value={point.y} />
      </td>
      <td>
        <NumberInput step={0.01} updateValue={updateZ} value={point.z} />
      </td>
      {showWeight && (
        <td>
          <NumberInput step={0.01} updateValue={updateWeight} value={point.weight} />
        </td>
      )}
    </tr>
  )
}

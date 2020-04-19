import React from 'react'
import { NoChild } from '../lib/reactUtil'
import { R2Point, R2Context, usesWeight, usesY } from '../lib/r2Base'
import { NumberInput } from './NumberInput'

interface P {
  point: R2Point
  setPoint: (_: R2Point) => void
}

export const R2ManagePoint: React.FC<P & NoChild> = ({ point, setPoint }) => {
  const { algo } = React.useContext(R2Context)

  const updateX = React.useCallback((x: number) => {
    setPoint(Object.assign(new R2Point(), point, { x }))
  }, [point, setPoint])

  const updateY = React.useCallback((y: number) => {
    setPoint(Object.assign(new R2Point(), point, { y }))
  }, [point, setPoint])

  const updateZ = React.useCallback((z: number) => {
    setPoint(Object.assign(new R2Point(), point, { z }))
  }, [point, setPoint])

  const updateW = React.useCallback((weight: number) => {
    setPoint(Object.assign(new R2Point(), point, { weight }))
  }, [point, setPoint])

  return (
    <tr>
      <td>
        <NumberInput fractoinDigits={2} step={0.01} updateValue={updateX} value={point.x} />
      </td>
      {usesY(algo) && (
        <td>
          <NumberInput fractoinDigits={2} step={0.01} updateValue={updateY} value={point.y} />
        </td>
      )}
      <td>
        <NumberInput fractoinDigits={2} step={0.01} updateValue={updateZ} value={point.z} />
      </td>
      {usesWeight(algo) && (
        <td>
          <NumberInput fractoinDigits={2} step={0.01} updateValue={updateW} value={point.weight} />
        </td>
      )}
    </tr>
  )
}

import React from 'react'
import { NoChild } from '../lib/reactUtil'
import { R2Point, R2Context, usesWeight, usesY } from '../lib/r2Base'
import { NumberInput } from './NumberInput'

interface P {
  index: number
  isLast: boolean
  point: R2Point
}

export const R2ManagePoint: React.FC<P & NoChild> = ({ index: i, isLast, point }) => {
  const { setPoints } = React.useContext(R2Context)

  const updatePoints = React.useCallback((fn: (points: R2Point[]) => void) => {
    setPoints((oldPoints) => {
      const pts = [...oldPoints]
      fn(pts)
      return pts
    })
  }, [setPoints])

  const setPoint = React.useCallback((newPoint: R2Point) => {
    updatePoints((pts) => { pts[i] = newPoint })
  }, [i, updatePoints])

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

  const remove = React.useCallback(() => {
    updatePoints((pts) => { pts.splice(i, 1) })
  }, [i, updatePoints])

  const moveUp = React.useCallback(() => {
    updatePoints((pts) => { pts.splice(i - 1, 2, pts[i], pts[i - 1]) })
  }, [i, updatePoints])

  const moveDown = React.useCallback(() => {
    updatePoints((pts) => { pts.splice(i, 2, pts[i + 1], pts[i]) })
  }, [i, updatePoints])

  return (
    <tr>
      <td>
        <NumberInput fractionDigits={2} step={0.01} updateValue={updateX} value={point.x} />
      </td>
      {usesY(algo) && (
        <td>
          <NumberInput fractionDigits={2} step={0.01} updateValue={updateY} value={point.y} />
        </td>
      )}
      <td>
        <NumberInput fractionDigits={2} step={0.01} updateValue={updateZ} value={point.z} />
      </td>
      {usesWeight(algo) && (
        <td>
          <NumberInput fractionDigits={2} step={0.01} updateValue={updateW} value={point.weight} />
        </td>
      )}
      <td>
        <button onClick={remove} type='button'>×</button>
        <button disabled={i === 0} onClick={moveUp} type='button'>↑</button>
        <button disabled={isLast} onClick={moveDown} type='button'>↓</button>
      </td>
      <td className='R2ManagePoint-ID'>
        {point.id}
      </td>
    </tr>
  )
}

import React from 'react'
import { Canvas, PointerEvent } from 'react-three-fiber'
import { NoChild } from '../lib/reactUtil'
import { R2Task } from './R2Task'
import { R2Context, R2Point } from '../lib/r2Base'
import { R2CanvasCamera } from './R2CanvasCamera'

export const R2Canvas: React.FC<NoChild> = () => {
  // https://github.com/react-spring/react-three-fiber/issues/262
  const r2Context = React.useContext(R2Context)

  return (
    <div className='R2Canvas'>
      <Canvas camera={{ position: [0, 30, 0] }}>
        <R2Context.Provider value={r2Context}>
          <R2CanvasCamera />
          <R2CanvasGrid size={50} />
          <R2Task />
        </R2Context.Provider>
      </Canvas>
    </div>
  )
}

interface R2CanvasGridProps {
  size: number
}

const R2CanvasGrid: React.FC<R2CanvasGridProps & NoChild> = ({ size }) => {
  const { setPoints } = React.useContext(R2Context)
  const handleClick = React.useCallback((ev: PointerEvent) => {
    // ev.preventDefault()
    ev.stopPropagation()
    if (ev.altKey) {
      console.log(ev.point)
      setPoints((points) => [...points, new R2Point(ev.point)])
    }
  }, [setPoints])

  return (
    <gridHelper args={[size, size, 0xdddddd, 0xeeeeee]} onClick={handleClick} />
  )
}

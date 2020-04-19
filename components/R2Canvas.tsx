import React from 'react'
import { Canvas, PointerEvent } from 'react-three-fiber'
import { NoChild } from '../lib/reactUtil'
import { R2Task } from './R2Task'
import { R2Context, R2Point } from '../lib/r2Base'
import { R2CanvasCamera } from './R2CanvasCamera'

export const R2Canvas: React.FC<NoChild> = () => {
  // https://github.com/react-spring/react-three-fiber/issues/262
  const r2Context = React.useContext(R2Context)
  const { messages } = r2Context

  return (
    <div className='R2Canvas-Wrapper'>
      <div className='R2Canvas'>
        <Canvas camera={{ position: [0, 30, 0] }}>
          <R2Context.Provider value={r2Context}>
            <R2CanvasCamera />
            <R2CanvasGrid size={50} />
            <R2Task />
          </R2Context.Provider>
        </Canvas>
      </div>
      <ul className='R2Canvas-Messages'>
        {Object.entries(messages).map(([key, message]) => (
          message ? (
            <li key={key}>
              {message}
            </li>
          ) : (
            <></>
          )
        ))}
      </ul>
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
      setPoints((points) => (
        [...points, new R2Point(ev.point.multiplyScalar(100).round().divideScalar(100))]
      ))
    }
  }, [setPoints])

  return (
    <group>
      <gridHelper args={[size, size, 0xdddddd, 0xeeeeee]} />
      <mesh position={[0, 0, 0]} rotation={[Math.PI * 1.5, 0, 0]} onClick={handleClick}>
        <planeGeometry args={[size, size]} attach='geometry' />
        <meshBasicMaterial attach='material' color={0xff0000} opacity={0} transparent />
      </mesh>
    </group>
  )
}

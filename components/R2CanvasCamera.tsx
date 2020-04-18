import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReactThreeFiber, extend, useFrame, useThree } from 'react-three-fiber'
import { OrbitControls } from '../lib/three/OrbitControls'
import { NoChild } from '../lib/reactUtil'

/* eslint-disable */
// https://qiita.com/Quarter-lab/items/151f06bddea1fc9cf4d7
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>
    }
  }
}
/* eslint-enable */

extend({ OrbitControls })

export const R2CanvasCamera: React.FC<NoChild> = () => {
  const controlsRef = React.useRef<OrbitControls>()
  const { camera, gl } = useThree()

  useFrame(() => controlsRef.current?.update())

  return (
    <orbitControls
      args={[camera, gl.domElement]}
      ref={controlsRef}
    />
  )
}

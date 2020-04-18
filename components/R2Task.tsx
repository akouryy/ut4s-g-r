import { Vector3 } from 'three'
import React from 'react'
import { NoChild } from '../lib/reactUtil'
import { R2Context } from '../lib/r2Base'
import { forceGeometryUpdate } from '../lib/threeUtil'
import { calcVertices } from '../lib/r2'

export const R2Task: React.FC<NoChild> = () => {
  const { algo, points } = React.useContext(R2Context)

  const pointVertices = points.map(({ x, y, z }) => new Vector3(x, y, z))
  const lineVertices = React.useMemo(
    () => calcVertices(points, algo).map((arr) => arr.toVector3()),
    [algo, points],
  )

  return (
    <group>
      <points
        /* https://github.com/react-spring/react-three-fiber/issues/266 */
        key={`points${pointVertices.toString()}`}
      >
        <geometry attach='geometry' onUpdate={forceGeometryUpdate} vertices={pointVertices} />
        <pointsMaterial attach='material' color={0xff3300} size={0.25} />
      </points>
      <line key={lineVertices.toString()}>
        <geometry attach='geometry' onUpdate={forceGeometryUpdate} vertices={lineVertices} />
        <lineBasicMaterial attach='material' color={0x0033ff} />
      </line>
    </group>
  )
}

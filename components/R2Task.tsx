import * as R from 'ramda'
import React from 'react'
import { DoubleSide, Face3, Vector3 } from 'three'
import { NoChild } from '../lib/reactUtil'
import { R2Context, isSurface } from '../lib/r2/base'
import { forceGeometryUpdate } from '../lib/threeUtil'
import { calcVertices } from '../lib/r2/task'

export const R2Task: React.FC<NoChild> = () => {
  const { algo, points, addMessage } = React.useContext(R2Context)

  const pointVertices = points.map(({ x, y, z }) => new Vector3(x, y, z))
  const [lineVertices, surfaceFaces] = React.useMemo(
    () => {
      try {
        const vertices = calcVertices(points, algo).map((arr) => arr.toVector3())

        if (!isSurface(algo)) {
          addMessage('components/R2Task', null)
          return [vertices, undefined]
        }

        const m = Math.floor(vertices.length ** 0.5)
        if (m * m !== vertices.length) {
          addMessage('components/R2Task', '曲面の頂点数が平方数ではありません')
          return [vertices, undefined]
        }

        addMessage('components/R2Task', null)
        return [
          vertices,
          R.range(0, m - 1).flatMap((i) => R.range(0, m - 1).flatMap((j) => [
            new Face3(i * m + j, i * m + j + 1, (i + 1) * m + j + 1),
            new Face3(i * m + j, (i + 1) * m + j, (i + 1) * m + j + 1),
          ]))
        ]
      } catch (err) {
        addMessage('components/R2Task', err.message)
        return [[], undefined]
      }
    },
    [addMessage, algo, points],
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

      {surfaceFaces ? (
        <group key={lineVertices.toString() + points.toString()}>
          <mesh>
            <geometry
              attach='geometry'
              faces={surfaceFaces}
              onUpdate={forceGeometryUpdate}
              vertices={lineVertices}
            />
            <meshBasicMaterial
              attach='material'
              color={0x00ff00}
              side={DoubleSide}
              wireframe
              wireframeLinewidth={3}
            />
          </mesh>
          <mesh>
            <geometry
              attach='geometry'
              faces={surfaceFaces}
              onUpdate={forceGeometryUpdate}
              vertices={lineVertices}
            />
            <meshBasicMaterial attach='material' color={0x66bb99} side={DoubleSide} />
          </mesh>
        </group>
      ) : (
        <line key={lineVertices.toString()}>
          <geometry attach='geometry' onUpdate={forceGeometryUpdate} vertices={lineVertices} />
          <lineBasicMaterial attach='material' color={0x0033ff} />
        </line>
      )}
    </group>
  )
}

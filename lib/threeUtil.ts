import * as THREE from 'three'

export const forceGeometryUpdate = (self: THREE.Geometry): void => {
  // eslint-disable-next-line no-param-reassign
  self.verticesNeedUpdate = true
}

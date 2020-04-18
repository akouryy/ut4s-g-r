import React from 'react'
import { R2Canvas } from './R2Canvas'
import { R2Side } from './R2Side'
import { R2Context, R2Point, R2Algo } from '../lib/r2Base'
import { NoChild } from '../lib/reactUtil'

export const R2Main: React.FC<NoChild> = () => {
  const [points, setPoints] = React.useState(Array<R2Point>())
  const [algo, setAlgo] = React.useState(new R2Algo())

  return (
    <R2Context.Provider value={{ points, algo, setPoints, setAlgo }}>
      <div className='R2Main'>
        <R2Canvas />
        <R2Side />
      </div>
    </R2Context.Provider>
  )
}

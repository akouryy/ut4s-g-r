import React from 'react'
import { R2Canvas } from './R2Canvas'
import { R2Side } from './R2Side'
import { R2Context, R2Point, R2Algo } from '../lib/r2Base'
import { NoChild } from '../lib/reactUtil'

export const R2Main: React.FC<NoChild> = () => {
  const [messages, setMessages] = React.useState<{[_ in string]?: string}>({})
  const [points, setPoints] = React.useState(Array<R2Point>())
  const [algo, setAlgo] = React.useState(new R2Algo())

  const addMessage = React.useCallback((key: string, message: string) => {
    setMessages((ms) => ({ ...ms, [key]: message }))
  }, [setMessages])

  return (
    <R2Context.Provider value={{ messages, points, algo, addMessage, setPoints, setAlgo }}>
      <div className='R2Main-WarnMini'>
        推奨環境: 幅960px以上
      </div>
      <div className='R2Main'>
        <R2Canvas />
        <R2Side />
      </div>
    </R2Context.Provider>
  )
}

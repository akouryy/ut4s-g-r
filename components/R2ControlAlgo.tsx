import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { NoChild } from '../lib/reactUtil'
import { R2Context, R2AlgoKinds, R2AlgoNames, R2AlgoKind } from '../lib/r2Base'

export const R2ControlAlgo: React.FC<NoChild> = () => {
  const { algo, setAlgo } = React.useContext(R2Context)

  const [uuid] = React.useState(() => uuidv4())

  const setKind = React.useCallback((kind: R2AlgoKind) => {
    setAlgo((a) => a.copyWith({ kind }))
  }, [setAlgo])

  const setDeCasteljau = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const deCasteljau = ev.target.checked
    setAlgo((a) => a.copyWith({ deCasteljau }))
  }, [setAlgo])

  return (
    <div className='R2ControlAlgo'>
      <section>
        <h3>曲線</h3>
        {R2AlgoKinds.map((kind) => (
          <label key={kind}>
            <input
              checked={algo.kind === kind}
              name={`${uuid}-kind`}
              onChange={() => setKind(kind)}
              type='radio'
              value={kind}
            />
            {R2AlgoNames[kind]}
          </label>
        ))}
      </section>
      {algo.kind === 'Bezier' && (
        <label>
          <input
            checked={algo.deCasteljau}
            name={`${uuid}-decasteljau`}
            onChange={setDeCasteljau}
            type='checkbox'
          />
          de Casteljau法を使う
        </label>
      )}
    </div>
  )
}

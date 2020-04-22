import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { NumberInput } from './NumberInput'
import { NoChild } from '../lib/reactUtil'
import { R2Context, R2AlgoKinds, R2AlgoNames, R2AlgoKind } from '../lib/r2Base'
import { calcBezierCut } from '../lib/r2Task'

export const R2ManageAlgo: React.FC<NoChild> = () => {
  const { addMessage, algo, points, setAlgo, setPoints } = React.useContext(R2Context)

  const [uuid, setUUID] = React.useState(() => '')
  React.useEffect(() => setUUID(uuidv4()), [])

  const setKind = React.useCallback((kind: R2AlgoKind) => {
    setAlgo((a) => a.withKind(kind))
  }, [setAlgo])

  const setDeCasteljau = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const deCasteljau = ev.target.checked
    setAlgo((a) => a.withOptsDiff({ deCasteljau }))
  }, [setAlgo])

  const setLoop = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const loop = ev.target.checked
    setAlgo((a) => a.withOptsDiff({ loop }))
  }, [setAlgo])

  const [cutAt, setCutAt] = React.useState(0.5)

  const cut = React.useCallback(() => {
    if (Number.isFinite(cutAt)) {
      try {
        setPoints(calcBezierCut(points, cutAt))
        addMessage('components/R2ManageAlgo', null)
      } catch (err) {
        addMessage('components/R2ManageAlgo', err.message)
      }
    }
  }, [addMessage, cutAt, points, setPoints])

  const OptsHeader = React.useMemo(() => (
    <h3 className='R2Manage-Title'>オプション</h3>
  ), [])

  return (
    <div className='R2ManageAlgo'>
      <section>
        <h3 className='R2Manage-Title'>曲線</h3>
        {R2AlgoKinds.map((kind) => (
          <label className='R2ManageAlgo-RadioLabel' key={kind}>
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
        <div>
          {OptsHeader}
          <label>
            <input
              checked={algo.opts.deCasteljau}
              name={`${uuid}-decasteljau`}
              onChange={setDeCasteljau}
              type='checkbox'
            />
            de Casteljau法
          </label>
          {/* <label>
            <input
              disabled
              type='checkbox'
            />
            適応的サンプリング
          </label> */}

          {algo.opts.deCasteljau && (
            <div>
              <label>
                t ≦
                {' '}
                <NumberInput
                  fractionDigits={1}
                  max={1}
                  min={0}
                  step={0.1}
                  updateValue={setCutAt}
                  value={cutAt}
                />
              </label>
              {' '}
              で
              <button onClick={cut} type='button'>切り取り</button>
            </div>
          )}
        </div>
      )}
      {algo.kind === 'Kappa' && (
        <>
          {OptsHeader}
          <label>
            <input
              checked={algo.opts.loop}
              name={`${uuid}-loop`}
              onChange={setLoop}
              type='checkbox'
            />
            ループする
          </label>
        </>
      )}
    </div>
  )
}

import React from 'react'
import '../styles/NumberInput.less'
import { NoChild } from '../lib/reactUtil'

interface P {
  className?: string
  size?: number
  step?: number
  value: number
  updateValue: (_: number) => void
}

export const NumberInput: React.FC<P & NoChild> = ({
  className, step, value, updateValue
}) => {
  const [rawValue, setRawValue] = React.useState(value.toString())

  React.useEffect(() => {
    setRawValue(value.toString())
  }, [value])

  const [error, setError] = React.useState(false)

  const handleChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault()
    setRawValue(ev.target.value)
    const float = parseFloat(ev.target.value)
    if (Number.isFinite(float)) {
      setError(false)
      updateValue(float)
    } else {
      setError(true)
    }
  }, [setRawValue, updateValue])

  const cls = className ?? 'NumberInput'

  return (
    <span className={`${cls}-Container`}>
      <input
        className={cls}
        onChange={handleChange}
        step={step}
        type='number'
        value={rawValue}
      />
      {error && (
        <span aria-label='invalid' role='img'>❌</span>
      )}
    </span>
  )
}

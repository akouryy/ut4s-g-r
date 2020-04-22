import React from 'react'
import '../styles/NumberInput.less'
import { NoChild } from '../lib/reactUtil'

type P = React.InputHTMLAttributes<HTMLInputElement> & {
  fractionDigits?: number
  onChange?: never
  type?: never
  value: number
  updateValue: (_: number) => void
}

function toFixed(value: number, fractionDigits: number | undefined): string {
  return fractionDigits ? value.toFixed(fractionDigits) : value.toString()
}

export const NumberInput: React.FC<P & NoChild> = ({
  className, fractionDigits, value, updateValue, ...props
}) => {
  const [rawValue, setRawValue] = React.useState(toFixed(value, fractionDigits))

  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    if (!error && value !== parseFloat(rawValue)) {
      setRawValue(toFixed(value, fractionDigits))
    }
  }, [error, fractionDigits, rawValue, value])

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
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        className={cls}
        onChange={handleChange}
        type='number'
        value={rawValue}
      />
      {error && (
        <span aria-label='invalid' role='img'>❌</span>
      )}
    </span>
  )
}

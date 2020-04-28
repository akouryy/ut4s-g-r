import React from 'react'
import '../styles/NumberInput.less'
import { NoChild } from '../lib/reactUtil'

type P<V> = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> & {
  onChange?: never
  /**
   * function converting a raw input to its value
   */
  s2v: (s: string) => V | null
  /**
   * function converting a value `v` to the string `s` where `s2v(s)` is equivalent to `v`
   */
  v2s: (v: V) => string
  value: V
  updateValue: (t: V) => void
}

export function ValidatingInput<T>({
  className, s2v, v2s, value, updateValue, ...props
}: P<T> & NoChild): React.ReactElement<P<T>> {
  const [rawInput, setRawInput] = React.useState(v2s(value))

  const [lastValidValue, setLastValidValue] = React.useState(value)

  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    const valueStr = v2s(value)
    if (valueStr !== v2s(lastValidValue)) {
      setRawInput(valueStr)
    }
  }, [lastValidValue, s2v, v2s, value])

  const handleChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault()
    const newInput = ev.target.value
    setRawInput(newInput)
    const newValue = s2v(newInput)
    if (newValue === null) {
      setError(true)
    } else {
      updateValue(newValue)
      setError(false)
      setLastValidValue(newValue)
    }
  }, [s2v, setError, setLastValidValue, setRawInput, updateValue])

  const cls = className ?? 'ValidatingInput'

  return (
    <span className={`${cls}-Container`}>
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        type='text'
        {...props}
        className={cls}
        onChange={handleChange}
        value={rawInput}
      />
      {error && (
        <span aria-label='invalid' role='img'>❌</span>
      )}
    </span>
  )
}

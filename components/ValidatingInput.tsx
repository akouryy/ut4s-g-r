import React from 'react'
import '../styles/NumberInput.less'
import { NoChild } from '../lib/reactUtil'

type P = React.InputHTMLAttributes<HTMLInputElement> & {
  equivalenceWith: (_: string) => unknown
  onChange?: never
  type?: never
  value: string
  updateValue: (_: string) => boolean
}

export const ValidatingInput: React.FC<P & NoChild> = ({
  className, equivalenceWith, value, updateValue, ...props
}) => {
  const [rawValue, setRawValue] = React.useState(value)

  const [lastValidValue, setLastValidValue] = React.useState(value)

  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    if (equivalenceWith(value) === equivalenceWith(lastValidValue)) {
      setRawValue(value)
    }
  }, [equivalenceWith, lastValidValue, value])

  const handleChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault()
    const newValue = ev.target.value
    setRawValue(newValue)
    const ok = updateValue(newValue)
    setError(!ok)
    if (ok) {
      setLastValidValue(value)
    }
  }, [setRawValue, updateValue, value])

  const cls = className ?? 'ValidatingInput'

  return (
    <span className={`${cls}-Container`}>
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        className={cls}
        onChange={handleChange}
        value={rawValue}
      />
      {error && (
        <span aria-label='invalid' role='img'>❌</span>
      )}
    </span>
  )
}

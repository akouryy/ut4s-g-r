import React from 'react'
import { NoChild } from '../lib/reactUtil'

interface P {
  className?: string
  step?: number
  type?: string
  value: string
  updateValue: (_: string) => void
}

export const EditableText: React.FC<P & NoChild> = ({
  className, step, type, value, updateValue
}) => {
  const [editingValue, setEditingValue] = React.useState(null as string | null)

  const startEditing = React.useCallback(() => {
    setEditingValue(value)
  }, [setEditingValue, value])

  const endEditing = React.useCallback((ev: React.SyntheticEvent<{}>) => {
    ev.preventDefault()
    if (editingValue) {
      updateValue(editingValue)
    }
    setEditingValue(null)
  }, [editingValue, setEditingValue, updateValue])

  const handleChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(ev.target.value)
  }, [setEditingValue])

  return (
    editingValue ? (
      <form onSubmit={endEditing}>
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onBlur={endEditing}
          onChange={handleChange}
          step={step}
          type={type}
          value={editingValue}
        />
      </form>
    ) : (
      <button className={`EditableText ${className ?? ''}`} onClick={startEditing} type='button'>
        {value}
      </button>
    )
  )
}

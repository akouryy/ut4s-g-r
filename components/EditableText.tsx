import React from 'react'
import { NoChild } from '../lib/reactUtil'

interface P {
  className?: string
  type?: string
  value: string
  updateValue: (_: string) => void
}

export const EditableText: React.FC<P & NoChild> = ({
  className, type, value, updateValue
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
      <form
      // eslint-disable-next-line no-script-url
        action='javascript:void(0);'
        onSubmit={endEditing}
      >
        <input onBlur={endEditing} onChange={handleChange} type={type} value={editingValue} />
      </form>
    ) : (
      <button className={`EditableText ${className ?? ''}`} onClick={startEditing} type='button'>
        {value}
      </button>
    )
  )
}

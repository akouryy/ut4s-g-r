import React from 'react'
import '../styles/NumberInput.less'
import { NoChild } from '../lib/reactUtil'
import { ValidatingInput } from './ValidatingInput'

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
  fractionDigits, ...props
}) => {
  const s2v = React.useCallback((s: string) => {
    const float = parseFloat(s)
    return Number.isFinite(float) ? float : null
  }, [])

  const v2s = React.useCallback((n: number) => toFixed(n, fractionDigits), [fractionDigits])

  return (
    <ValidatingInput
      className='NumberInput'
      {...props}
      s2v={s2v}
      type='number'
      v2s={v2s}
    />
  )
}

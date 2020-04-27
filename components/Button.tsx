import React from 'react'

type P = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<P> = (props) => {
  const { className } = props
  return (
    <button {...props} className={`Button ${className ?? ''}`} type='button' />
  )
}

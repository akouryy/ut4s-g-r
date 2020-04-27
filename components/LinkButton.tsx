import React from 'react'
import '../styles/LinkButton.less'

type P = React.ButtonHTMLAttributes<HTMLButtonElement>

export const LinkButton: React.FC<P> = (props) => {
  const { className } = props
  return (
    <button {...props} className={`LinkButton ${className ?? ''}`} type='button' />
  )
}

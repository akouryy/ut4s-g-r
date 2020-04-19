import React from 'react'

type P = React.AnchorHTMLAttributes<HTMLAnchorElement>

export const ExternalLink: React.FC<P> = (props) => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content, react/jsx-props-no-spreading
    <a {...props} rel='noopener noreferrer' target='_blank' />
  )
}

import React from 'react'
import Launch from '@material-ui/icons/Launch'

type P = React.AnchorHTMLAttributes<HTMLAnchorElement>

export const ExternalLink: React.FC<P> = ({ children, ...props }) => {
  return (
  // eslint-disable-next-line jsx-a11y/anchor-has-content, react/jsx-props-no-spreading
    <a {...props} rel='noopener noreferrer' target='_blank'>
      {children}
      <Launch fontSize='inherit' />
    </a>
  )
}

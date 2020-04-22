import React from 'react'
import '../styles/R2.less'
import { NoChild } from '../lib/reactUtil'
import { R2Main } from '../components/R2Main'
import { BasePage } from '../components/BasePage'

const PageR2: React.FC<NoChild> = () => {
  return (
    <BasePage>
      <R2Main />
    </BasePage>
  )
}

export default PageR2

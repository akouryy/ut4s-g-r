import React from 'react'
import Link from 'next/link'
import { NoChild } from '../lib/reactUtil'
import { BasePage } from '../components/BasePage'

const PageIndex: React.FC<NoChild> = () => {
  return (
    <BasePage>
      <h1>コンピュータグラフィクス論(2020) 課題</h1>
      <Link href='/r2'>第2回(M1)</Link>
    </BasePage>
  )
}

export default PageIndex

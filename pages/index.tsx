import React from 'react'
import Link from 'next/link'
import { NoChild } from '../lib/reactUtil'

const PageIndex: React.FC<NoChild> = () => {
  return (
    <>
      <h1>コンピュータグラフィクス論(2020) 課題</h1>
      <Link href="/r2"><a>第2回(M1)</a></Link>
    </>
  )
}

export default PageIndex

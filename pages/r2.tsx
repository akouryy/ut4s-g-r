import React from 'react'
import Head from 'next/head'
import '../styles/R2.less'
import { NoChild } from '../lib/reactUtil'
import { R2Main } from '../components/R2Main'
import { BasePage } from '../components/BasePage'

const PageR2: React.FC<NoChild> = () => {
  return (
    <BasePage>
      <Head>
        <link rel='shortcut icon' href='/favicon.svg' />
      </Head>
      <h1>コンピュータグラフィクス論(2020) 課題</h1>
      <h2>第2回(M1)</h2>
      <R2Main />
    </BasePage>
  )
}

export default PageR2

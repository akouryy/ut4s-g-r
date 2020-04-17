import React from 'react'
import Head from 'next/head'
import { NoChild } from '../lib/reactUtil'
import { R2Main } from '../components/R2Main'

const PageR2: React.FC<NoChild> = () => {
  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favicon.svg' />
        <script src='https://cdn.rawgit.com/toji/gl-matrix/v3.3.0/dist/gl-matrix.js' />
        <script src='https://legacygl-js.glitch.me/gl-matrix-util.js' />
        <script src='https://legacygl-js.glitch.me/legacygl.js' />
        <script src='https://legacygl-js.glitch.me/drawutil.js' />
        <script src='https://legacygl-js.glitch.me/camera.js' />
        <script src='https://legacygl-js.glitch.me/util.js' />
        <script src='https://legacygl-js.glitch.me/glu.js' />
      </Head>
      <h1>コンピュータグラフィクス論(2020) 課題</h1>
      <h2>第2回(M1)</h2>
      <R2Main />
    </>
  )
}

export default PageR2

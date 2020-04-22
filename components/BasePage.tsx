import React from 'react'
import Head from 'next/head'
import 'normalize.css'

export const BasePage: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favicon.svg' />
      </Head>

      {children}
    </>
  )
}

import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.less'
import { NoChild } from '../lib/reactUtil'
import { R2Control } from './R2Control'

export const R2Side: React.FC<NoChild> = () => {
  return (
    <Tabs className='R2Side'>
      <TabList>
        <Tab>編集</Tab>
        <Tab>操作方法</Tab>
      </TabList>

      <TabPanel>
        <R2Control />
      </TabPanel>
      <TabPanel>
        <section>
          <h2>操作方法</h2>
          <h3>カメラ</h3>
          <ul>
            <li>左クリック + ドラッグ: 回転</li>
            <li>右クリック + ドラッグ: 平行移動</li>
            <li>ホイール(スクロール): ズーム</li>
          </ul>
        </section>
      </TabPanel>
    </Tabs>
  )
}

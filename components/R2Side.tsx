import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.less'
import { NoChild } from '../lib/reactUtil'
import { R2Manage } from './R2Manage'
import { R2Report } from './R2Report'

export const R2Side: React.FC<NoChild> = () => {
  return (
    <div className='R2Side-Wrapper'>
      <Tabs className='R2Side' defaultIndex={2}>
        <TabList>
          <Tab>管理</Tab>
          <Tab>操作方法</Tab>
          <Tab>
            <span aria-hidden>📜</span>
            内容説明・考察
          </Tab>
        </TabList>

        <TabPanel>
          <R2Manage />
        </TabPanel>
        <TabPanel>
          <section>
            <h2>操作方法(キャンバス)</h2>
            <h3>点</h3>
            <ul>
              <li>
                ⌥ Alt + クリック: xz平面上に点を
                <b>追加</b>
                {' '}
                (y座標は手入力)
              </li>
            </ul>
            <h3>カメラ</h3>
            <ul>
              <li>左クリック + ドラッグ: 回転</li>
              <li>右クリック + ドラッグ: パン</li>
              <li>ホイール(スクロール): ズーム</li>
            </ul>
          </section>
        </TabPanel>
        <TabPanel>
          <R2Report />
        </TabPanel>
      </Tabs>

      <span className='R2Side-Footer'><small>↑ scrollable</small></span>
    </div>
  )
}

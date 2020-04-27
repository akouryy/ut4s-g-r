import * as R from 'ramda'
import React from 'react'
import { NoChild } from '../lib/reactUtil'
import { R2Context, R2Point, R2Algo } from '../lib/r2Base'
import { ExternalLink } from './ExternalLink'
import { LinkButton } from './LinkButton'
import { calcBezierCut } from '../lib/r2Task'

export const R2Report: React.FC<NoChild> = React.memo(() => {
  const { setAlgo, setPoints } = React.useContext(R2Context)

  const p0 = new R2Point(0, 0, 0)
  const p1 = new R2Point(10, 0, 0)
  const p1w = new R2Point(10, 0, 0, 5)
  const p2 = new R2Point(10, 0, -10)
  const p2y = new R2Point(10, -20, -10)
  const p2w = new R2Point(10, 0, -10, 5)
  const p2yw = new R2Point(10, -5, -10, 5)
  const p3 = new R2Point(3, 0, -17)
  const p4 = new R2Point(0, 15, -3)
  const p5 = new R2Point(-10, 0, 5)
  const p5w = new R2Point(-10, 0, 5, 10)
  const p6 = new R2Point(-0.5, 0, -5)
  const p7 = new R2Point(0.5, 0, -5)
  const p8 = new R2Point(10, 0, 5)

  const setter = (algo: R2Algo, points: R2Point[]) => () => {
    setAlgo(algo)
    setPoints(points)
  }

  const exB1 = setter(new R2Algo('Bezier'), [p0, p1, p2, p3])
  const exB2 = setter(new R2Algo('Bezier'), [p0, p1, p2y, p3, p4])
  const exB3 = setter(new R2Algo('Bezier', { deCasteljau: true }), [p0, p1, p2, p3])
  const exB4 = setter(new R2Algo('Bezier', { deCasteljau: true }),
    calcBezierCut([p0, p1, p2, p3], 0.7))
  const exB5 = setter(new R2Algo('Bezier'), [p0, p1w, p2w, p3])
  const exB6 = setter(new R2Algo('Bezier'),
    [new R2Point(10, 0, 0, 1), new R2Point(10, 0, -10, Math.sqrt(0.5)), new R2Point(0, 0, -10, 1)])

  const exC1 = setter(new R2Algo('CatmullRom'), [p5, p6, p7, p8])
  const exC2 = setter(new R2Algo('CatmullRom', { knot: 'chordal' }), [p5, p6, p7, p8])
  const exC3 = setter(new R2Algo('CatmullRom', { knot: 'centripetal' }), [p5, p6, p7, p8])

  const pn123 = [p0, p1, p2, p5, p3]
  const kn34 = [0, 0, 1, 3, 4, 7, 7, 9, 9]
  const exN1 = setter(new R2Algo('NURBS', { bsKnots: R.range(0, 9) }), pn123)
  const exN2 = setter(new R2Algo('NURBS', { bsKnots: [0, 0, 0, 0, 1, 2, 2, 2, 2] }), pn123)
  const exN3 = setter(new R2Algo('NURBS', { bsKnots: kn34 }), pn123)
  const exN4 = setter(new R2Algo('NURBS', { bsKnots: kn34 }), [p0, p1, p2yw, p5w, p3])

  const exK1 = setter(new R2Algo('Kappa'), [
    new R2Point(7.28, 0.00, -10.18),
    new R2Point(13.90, 0.00, 5.26),
    new R2Point(-2.83, 0.00, 13.47),
    new R2Point(5.34, 0.00, 6.79),
    new R2Point(-1.20, 0.00, 1.12),
    new R2Point(8.53, 0.00, -2.75),
  ])

  const exK2 = setter(new R2Algo('Kappa', { loop: false }), [
    new R2Point(7.28, -20.00, -10.18),
    new R2Point(13.90, 0.00, 5.26),
    new R2Point(-2.83, 10.00, 13.47),
    new R2Point(5.34, 0.00, 6.79),
    new R2Point(-1.20, 10.00, 1.12),
    new R2Point(8.53, 0.00, -2.75),
  ])

  return (
    <section className='R2Report'>
      <h1 className='R2Report-Title'>コンピュータグラフィクス論(2020) 課題</h1>
      <h2 className='R2Report-SubTitle'>第2回(Model-1)</h2>
      <h3>概要</h3>
      <p>
        <code>three.js</code>
        およびその React 向けのAPIを提供する
        <code>react-three-fiber</code>
        を用いて、様々な曲線を実装した。
      </p>
      <p>
        動作は macOS Catalina 10.15.3（19D76）上で動作する Google Chrome 81.0.4044.113 により確認した。
      </p>
      <p>
        ソースコードは Github で閲覧可能である。
      </p>
      <h3>ベジェ曲線</h3>
      <p>
        3次元空間上に一般のn次ベジェ曲線を描画した。計算方法は単純な多項式評価(
        <LinkButton onClick={exB1}>例B1</LinkButton>
        {', '}
        <LinkButton onClick={exB2}>例B2</LinkButton>
        <small>(3D(カメラ操作によりy座標を確認できる))</small>
        )と de Casteljau のアルゴリズム(
        <LinkButton onClick={exB3}>例B3</LinkButton>
        )の双方を実装した。de Casteljau のアルゴリズムを使用している際には曲線の分割操作(
        <LinkButton onClick={exB4}>例B4</LinkButton>
        <small>(例B3の曲線の t≦0.7 の切り取り)</small>
        )も可能である。
      </p>
      <p>
        さらに、有理ベジェ曲線も単純な多項式評価により実装した(
        <LinkButton onClick={exB5}>例B5</LinkButton>
        )。これにより円弧(の一部)を原理的には正確に描画できる(
        <LinkButton onClick={exB6}>例B6</LinkButton>
        , 参考:
        {' '}
        <ExternalLink href='https://ksmakoto.hatenadiary.com/entry/2015/01/03/234056'>
          id:metanest, メモ: 有理ベジェ曲線による円弧 - ksmakotoのhatenadiary
        </ExternalLink>
        )。
      </p>

      <h3>Catmull-Rom スプライン</h3>
      <p>
        3次元空間上に Catmull-Rom スプラインを描画した。ノット列として Uniform (
        <LinkButton onClick={exC1}>例C1</LinkButton>
        )、Chordal (
        <LinkButton onClick={exC2}>例C2</LinkButton>
        )、Centripetal (
        <LinkButton onClick={exC3}>例C3</LinkButton>
        )の3種を実装した。
      </p>

      <h3>NURBS</h3>
      <p>
        3次元空間上に非一様有理 B-スプラインを描画した(
        <LinkButton onClick={exN1}>例N1</LinkButton>
        <small>(一様)</small>
        {', '}
        <LinkButton onClick={exN2}>例N2</LinkButton>
        <small>(開一様)</small>
        {', '}
        <LinkButton onClick={exN3}>例N3</LinkButton>
        <small>(非一様)</small>
        {', '}
        <LinkButton onClick={exN4}>例N4</LinkButton>
        <small>(非一様、有理、3D)</small>
        )。0除算エラーの対処は
        <ExternalLink href='https://math.stackexchange.com/a/441520'>
          Alistair Buxton, computational geometry - Potential Division by zero in the
          construction of NURBS basis functions: how to handle? - Mathematics Stack Exchange
        </ExternalLink>
        を参考にした。
      </p>

      <h3>κ曲線</h3>
      <p>
        講義で提示された
        {' '}
        <ExternalLink href='https://qiita.com/Rijicho_nl/items/05ee4c8d77e99e29daa5'>
          @Rijicho_nl, UX最強のベジェ曲線「κ-Curves」を完全に理解する - Qiita
        </ExternalLink>
        を参考に、3次元空間上の κ-Curves を実装した(
        <LinkButton onClick={exK1}>例K1</LinkButton>
        {', '}
        <LinkButton onClick={exK2}>例K2</LinkButton>
        <small>(3D、非ループ)</small>
        )。なお、現在は当該資料に JavaScript
        による実装が掲載されているが、実装開始時にはなかったため、C# による実装を移植した。
      </p>
    </section>
  )
})

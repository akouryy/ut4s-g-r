/**
 * Original: https://github.com/mrdoob/three.js/blob/19beb8ecc8/examples/jsm/controls/OrbitControls.d.ts
 *
 * The MIT License
 *
 * Copyright © 2010-2020 three.js authors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint-disable */

import { Camera, MOUSE, TOUCH, Vector3 } from 'three';

export class OrbitControls {
  constructor(object: Camera, domElement?: HTMLElement);

  object: Camera;
  domElement: HTMLElement | HTMLDocument;

  // API
  enabled: boolean;
  target: Vector3;

  // deprecated
  center: Vector3;

  minDistance: number;
  maxDistance: number;

  minZoom: number;
  maxZoom: number;

  minPolarAngle: number;
  maxPolarAngle: number;

  minAzimuthAngle: number;
  maxAzimuthAngle: number;

  enableDamping: boolean;
  dampingFactor: number;

  enableZoom: boolean;
  zoomSpeed: number;

  enableRotate: boolean;
  rotateSpeed: number;

  enablePan: boolean;
  panSpeed: number;
  screenSpacePanning: boolean;
  keyPanSpeed: number;

  autoRotate: boolean;
  autoRotateSpeed: number;

  enableKeys: boolean;
  keys: { LEFT: number, UP: number, RIGHT: number, BOTTOM: number };
  mouseButtons: { LEFT: MOUSE, MIDDLE: MOUSE, RIGHT: MOUSE };
  touches: { ONE: TOUCH, TWO: TOUCH };

  update(): boolean;

  saveState(): void;

  reset(): void;

  dispose(): void;

  getPolarAngle(): number;

  getAzimuthalAngle(): number;

  // EventDispatcher mixins
  addEventListener(type: string, listener: (event: any) => void): void;

  hasEventListener(type: string, listener: (event: any) => void): boolean;

  removeEventListener(type: string, listener: (event: any) => void): void;

  dispatchEvent(event: { type: string, target: any }): void;
}

export class MapControls extends OrbitControls {
  constructor(object: Camera, domElement?: HTMLElement);
}

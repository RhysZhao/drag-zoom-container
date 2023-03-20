/*
 * Author  rhys.zhao
 * Date  2022-01-28 15:36:55
 * LastEditors  rhys.zhao
 * LastEditTime  2023-03-20 10:42:11
 * Description 开发环境入口
 */
import React from 'react';
import { render } from 'react-dom';

import DragZoomContainer from '../src';

const App = () => (
  <div style={{ width: '80vw', height: '80vh', border: '1px solid red' }}>
    <DragZoomContainer dragInDocument={false}>
      <div style={{ width: 200, height: 200, color: '#fff', backgroundColor: 'red' }}>按住鼠标拖动，滚动鼠标缩放</div>
    </DragZoomContainer>
  </div>
);
render(<App />, document.getElementById('root'));

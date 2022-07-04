/*
 * Author  rhys.zhao
 * Date  2022-01-28 15:36:55
 * LastEditors  rhys.zhao
 * LastEditTime  2022-06-22 13:39:43
 * Description
 */
import React from 'react';
import { render } from 'react-dom';

import Demo from '../../src';

const App = () => (
  <div style={{ width: '80vw', height: '80vh', border: '1px solid red' }}>
    <Demo dragInDocument={false}>
      <div style={{ width: 200, height: 200, backgroundColor: 'red' }}>111</div>
    </Demo>
  </div>
);
render(<App />, document.getElementById('root'));

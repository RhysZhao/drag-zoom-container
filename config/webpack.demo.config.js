/*
 * Author  rhys.zhao
 * Date  2023-03-20 10:13:46
 * LastEditors  rhys.zhao
 * LastEditTime  2023-03-20 11:06:18
 * Description
 */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.js'); // 引用公共配置

const demoConfig = {
  mode: 'production',
  entry: path.join(__dirname, '../example/app.js'),
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Demo',
      template: path.join(__dirname, '../example/index.html')
    })
  ]
};
module.exports = merge(demoConfig, baseConfig);

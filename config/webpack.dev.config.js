/*
 * Author  rhys.zhao
 * Date  2022-01-28 15:24:07
 * LastEditors  rhys.zhao
 * LastEditTime  2023-03-20 10:36:33
 * Description webpack开发环境配置
 */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.js'); // 引用公共配置

const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: path.join(__dirname, '../example/app.js'),
  devServer: {
    compress: true,
    host: '127.0.0.1',
    port: 11111,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../example/index.html')
    })
  ]
};
module.exports = merge(devConfig, baseConfig);

/* eslint-disable */

const path = require('path')

const { merge } = require('webpack-merge')
const base = require('./webpack.config.base.js')

const DIR_DIST = path.resolve(__dirname, 'dist')
const DIR_PUBLIC = path.resolve(__dirname, 'public')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(base, {
  mode: 'development',

  output: {
    clean: true,
    path: DIR_DIST,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/favicon.png',
      template: './src/app/index.html',
      title: 'AP React Commons',
    }),
  ],

  devtool: 'inline-source-map',

  devServer: {
    client: {
      progress: false,
    },
    compress: true,
    historyApiFallback: true,
    port: 8080,
    static: {
      directory: DIR_PUBLIC,
    },
  },
})


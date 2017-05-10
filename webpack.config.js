const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const isDebug = process.env.NODE_ENV !== 'production'

module.exports = {
  name: 'client',
  target: 'web',
  entry: [
    ...isDebug ? [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
    ] : [],
    './src/main.js'
  ],
  output: {
    path: path.resolve('./dist/'),
    publicPath: '/dist',
    filename: 'main.min.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [path.resolve('./src/')],
        exclude: /node_modules/,
        query: {
          babelrc: false,
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: pkg.browserList
                },
                modules: false,
                useBuiltIns: false,
                debug: false
              }
            ],
            'stage-2',
            'react'
          ],
          plugins: isDebug ? [
            'react-hot-loader/babel',
            'transform-react-jsx-source',
            'transform-react-jsx-self'
          ] : []
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader'
          }
          ,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: false,
              modules: true,
              localIdentName: '[name]-[local]-[hash:base64:5]',
              minimize: false,
              discardComments: { removeAll: true },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: path.resolve('./postcss.config.js')
            },
          }
        ]
      },
    ]
  },
  devtool: isDebug ? 'cheap-module-source-map' : false,
  plugins: [
    ...isDebug ?
      [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
      ] : [
        new webpack.optimize.UglifyJsPlugin()
      ],
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }
}
const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')

module.exports = {
  name: 'client',
  target: 'web',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
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
          plugins: [
            'react-hot-loader/babel',
            'transform-react-jsx-source',
            'transform-react-jsx-self'
          ]
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
              sourceMap: true,
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
      // {
      //   test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      //   loader: 'file-loader',
      //   query: {
      //     name: '[path][name].[ext]?[hash:8]',
      //   },
      // }
    ]
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }
}
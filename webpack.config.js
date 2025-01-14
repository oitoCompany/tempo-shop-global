var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve("./js/app.js")
  ],
  output: {
    path: path.resolve('./build'),
    filename: "build.js"
  },
  module: {
    loaders: [
      // {
      //   test: /\.pdf$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "[path][name].[ext]"
      //     }
      //   }
      // },
      // { test: /\.pdf$/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.jsx?$/, loader: 'babel' },
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.json$/, loader: 'raw-loader!' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]

  },
   resolve: {
    modules: [
      "./js",
      "./node_modules"
    ],
    extensions: ['', '.js', '.jsx', '.json']
  },
  resolveLoader: {
    modules: ['node_modules']
  },
  node: {
    console: true
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      Promise: 'bluebird',
      jQuery: 'jquery',
      $: 'jquery'
    })
  ]
};
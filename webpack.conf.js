'use strict'

let path = require('path')
let cwd = __dirname

module.exports = {
  entry: './src/client.js',
  output: {
    filename: './static/client.js'
  },
  module: {
    preLoaders: [
            { test: /\.json$/, loader: 'json' }
    ],
    loaders: [
            { test: /\.css$/, loader: 'style!css' }
    ]
  },
  colors: true,
  devtool: 'source-map',
  node: {
    fs: 'empty'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    fallback: path.join(cwd, 'node_modules'),
    alias: {
      'handlebars': 'handlebars/dist/cjs/handlebars.js'
    }
  },
  resolveLoader: {
    fallback: path.join(cwd, 'node_modules'),
    alias: {
      'hbs': 'handlebars-loader'
    }
  }
}

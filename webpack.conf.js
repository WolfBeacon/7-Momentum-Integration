'use strict'

let path = require('path')
let cwd = __dirname

module.exports = {
  entry: './src/client.js',
  output: {
    filename: './static/client.js'
  },
  module: {
    loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.json$/, loader: 'json' }
    ]
  },
  devtool: 'source-map',
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: ['node_modules', 'src'],
    // fallback: path.join(cwd, 'node_modules'),
    alias: {
      'handlebars': 'handlebars/dist/cjs/handlebars.js'
    }
  },
  resolveLoader: {
    // fallback: path.join(cwd, 'node_modules'),
    alias: {
      'hbs': 'handlebars-loader'
    }
  }
}

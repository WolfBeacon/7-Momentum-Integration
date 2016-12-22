'use strict'

var webpackConfig = require('./webpack.conf.js')
webpackConfig.entry = {}

module.exports = function karmaConfig (configuration) {
  configuration.set({
    autoWatch: true,
    basePath: '',
    browsers: ['Chrome'],
    colors: true,
    preprocessors: {
      'test/unit/**/*.js': ['webpack']
    },
    files: [
      'test/unit/**/*.spec.js'
    ],
    frameworks: [
      'mocha',
      'sinon-chai'
    ],
    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['progress'],
    port: 8123,
    singleRun: false
  })
}

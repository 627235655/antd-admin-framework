const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common.js');
const { root } = require('./webpack.util');

module.exports = webpackMerge(common, {
  mode: 'production',
  output: {
    path: root('dist'),
    publicPath: 'http://static2.pp.ximalaya.com/lib/customer-service-framework/last/dist/',
    filename: 'index.js'
  }
});

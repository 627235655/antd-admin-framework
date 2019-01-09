const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common.js');
const { root } = require('./webpack.util');
const  Version = new Date().getTime();
const publicPath = (process.env.npm_lifecycle_event.indexOf('publish') > -1) ? 'http://s1.xmcdn.com' : 'http://static2.pp.ximalaya.com';



module.exports = webpackMerge(common, {
  mode: 'production',
  output: {
    path: root('dist'),
    publicPath: publicPath + '/lib/customer-service-framework/last/dist/',
    filename: 'index.js?v=' + Version
  }
});

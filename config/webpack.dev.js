const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common');
const {
    getIP,
    root
} = require('./webpack.util');


module.exports = webpackMerge(common, {
    mode: 'development',
    output: {
        path: root(),
        publicPath: '/',
        filename: 'index.js'
    },
    devServer: {
        port: 2222,
        host: getIP(),
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        open: true,
        openPage: 'custom-service-views/page/index/iframe',
        proxy: {
            '/custom-service-home/*': {
                target: 'http://192.168.138.238:8080',
                changeOrigin: true,
                secure: false,
                // pathRewrite: {'^/api': ''}
            }
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});

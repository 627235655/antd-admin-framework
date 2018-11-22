const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common');
const { getIP, root } = require('./webpack.util');


module.exports = webpackMerge(common, {
    mode: 'development',
    output: {
        path: root('dist'),
        publicPath: '/',
        filename: 'index.js'
    },
    devServer: {
        contentBase: root('src'),
        compress: true,
        port: 1111,
        host: getIP(),
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        open: true,
        openPage: 'custom-service-home/page/index/iframe',
        proxy: {
            '/custom-service-home/*': {
                target: 'http://192.168.141.243:8080',
                changeOrigin: true,
                secure: false
            }
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});

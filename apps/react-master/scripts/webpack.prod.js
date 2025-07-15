const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(base(false), {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true, //开启多线程缓存
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log', 'console.warn'],//删除console.log
                    },
                },
            }),
        ],
        splitChunks: {
            // all async initial 同步 异步 初始
            // import
            chunks: 'all',//所有的chunk代码公共部分分离出来成为一个单独的文件
            cachesGroups: {
                // 缓存组
                reactComp: {
                    test: /[\\/]node_modules[\\/]_?react(.*)/,
                    name: 'react',
                    priority: 20,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10, //优先级
                },
                common: {
                    miniSize: 0, // 引入的文件大于0就提取出来
                    miniChunks: 2, // 至少引入2次
                    priority: -20,
                    reuseExistingChunk: true, // 如果主入口引入了两个模块 正好其中一个也引用了后一个模块 那么可以直接引用该模块
                }
            }
        }
    }
})

var path  = require('path')
const resolve = dir => path.resolve(__dirname, dir);

var root = path.resolve(__dirname)

const {entry, plugins} = require('./webpack-helper')

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: {
        ...entry
    },
    output: {
        path: path.join(root, 'dist'),
        filename: '[name].js',
        publicPath: ''
    },
    resolve: {
        alias: {
            '@': resolve('src/')
        }
    },
    devServer: {
        publicPath: '',
        contentBase: './public/',
        host:'0.0.0.0',
        overlay: true,
        stats: {
            modules: false
        },
        progress: true,
        watchOptions: {
          ignored: /node_modules/,
          aggregateTimeout: 300,
          poll: 1000
        }
    },
    module: {
        rules: [{
            test: /\.(sc|c)ss$/,
            use: [
                "style-loader",
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'resolve-url-loader'
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            enforce: 'pre',
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['@babel/preset-env']
                }
            }, {
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }]
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 50000,
                    name: '[name].[ext]',
                    publicPath: 'font/',
                    outputPath: 'font'
                }
            }]
        }, {
            test: /\.(png|jp(e)g|gif)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }, {
            test: /\.(html)$/,
            use: {
                loader: 'html-loader',
                options: {
                    // attrs: [':data-src']
                }
            }
        }]
    },
    plugins: [
        ...plugins
    ]
}

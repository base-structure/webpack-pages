var path  = require('path')
const resolve = dir => path.resolve(__dirname, dir);

var root = path.resolve(__dirname)
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {entry, plugins} = require('./pages.config')

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
        progress: true,
        contentBase: './public/'
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
                loader: 'file-loader',
                options: {
                    limit: 50000,
                    name: '[name].[ext]',
                    publicPath: 'font/',
                    outputPath: 'font'
                }
            }]
        }]
    },
    plugins: [
        ...plugins,
        new CopyWebpackPlugin([
            {
                from: resolve('public/'),
                to: resolve('dist/')
            }
        ])
    ],
    optimization: {
        minimize: true
    }
}

var path  = require('path')
const resolve = dir => path.resolve(__dirname, dir);

var root = path.resolve(__dirname)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const {entry, plugins} = require('./webpack-helper')

module.exports = {
    mode: 'production',
    entry: {
        ...entry
    },
    output: {
        path: path.join(root, 'dist'),
        filename: '[name].[hash:5].js',
        publicPath: ''
    },
    stats: {
        modules: false,
        children: false,
        // entrypoints: false
    },
    resolve: {
        alias: {
            '@': resolve('src/')
        }
    },
    module: {
        rules: [{
            test: /\.(sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
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
                    limit: 8192,
                    name: '[name].[hash:5].[ext]',
                    publicPath: 'images/',
                    outputPath: 'images'
                }
            }]
        }, {
            test: /\.(html)$/,
            use: {
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }
        }]
    },
    plugins: [
        ...plugins,
        new MiniCssExtractPlugin({
            filename: '[name].[hash:5].css',
            chunkFilename: '[id].css'
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true
        }),
        new CopyWebpackPlugin([
            {
                from: resolve('public/'),
                to: resolve('dist/')
            }
        ])
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ]
    }
}

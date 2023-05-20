/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CustomizeRule, merge, mergeWithRules } = require('webpack-merge')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs');
const DotenvWebpackPlugin = require('dotenv-webpack');

const commonConfig = {
    entry: './src/index.tsx',
    target: 'web',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'INTERCHOICE',
            template: 'public/index.ejs',
            favicon: 'public/favicon.png',
            inject: false,
            minify: {
                removeComments: false
            }
        }),        
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static' }
            ]
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser'
        }),
        new DotenvWebpackPlugin({
            path: './.env', // Path to .env file (this is the default)
            safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
        })  
    ],
    module: {
        rules: [
            {
                test: /\.webworker\.ts$/,
                use: { loader: 'worker-loader' },
                include: path.resolve('./src/')
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    '@teamsupercell/typings-for-css-modules-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: `stylus-loader`,
                        options: {
                            stylusOptions: {
                                import: [path.join(__dirname, 'src/constants.styl')]
                            }
                        }
                    }
                ],
                include: [path.resolve('./src/')]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js.map$/,
                enforce: 'pre',
                loader: 'source-map-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.styl', '.css'],
        plugins: [new TsconfigPathsPlugin()]
    }
}

const developmentConfig = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        host: 'localhost',
        port: 3000,
        hot: true,
        quiet: false,
        // https: {
        //     key: fs.readFileSync('certificate/localhost.key'),
        //     cert: fs.readFileSync('certificate/localhost.crt'),
        //     ca: fs.readFileSync('certificate/localhost.pem'),
        // },
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'src'),
        disableHostCheck: true
    },
    plugins: [
        new webpack.WatchIgnorePlugin({ paths: [/css\.d\.ts$/] }),
        new webpack.HotModuleReplacementPlugin()
    ]
})

const productionConfig = mergeWithRules({
    module: {
        rules: {
            test: CustomizeRule.Match,
            use: CustomizeRule.Prepend
        }
    }
})(commonConfig, {
    mode: 'production',
    devtool: 'nosources-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[contenthash].js',
        sourceMapFilename: '[name].[contenthash].js.map'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            compiler => () => ({
                parallel: true,
                terserOptions: {
                    compress: true,
                    output: {
                        comments: false
                    }
                }
            }),
            new CssMinimizerPlugin()
        ]
    }
})

module.exports.developmentConfig = developmentConfig
module.exports.productionConfig = productionConfig

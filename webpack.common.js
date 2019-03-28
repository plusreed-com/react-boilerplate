const path = require('path');
//#region Webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//#endregion

module.exports = {
    entry: './src/index.js',
    output: {
        //#region Output configuration
        path: path.resolve(__dirname, 'build'),
        filename: '_/js/[name].[chunkhash:8].js',
        chunkFilename: '_/js/[name].[chunkhash:8].chunk.js',
        //#endregion
    },
    module: {
        rules: [
            {
                //#region Normal CSS
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },

                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            import: true,
                        },
                    },

                    {
                        loader: 'postcss-loader',
                    },
                ],
                //#endregion
            },
            {
                //#region CSS modules
                test: /\.module\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },

                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            import: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                        },
                    },

                    {
                        loader: 'postcss-loader'
                    },
                ],
                //#endregion
            },
            {
                //#region Basic catch-all for most file extensions
                test: /\.(gif|png|jpe?g|svg|woff|woff2|eot|ttf|otf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '_/media/[name].[contenthash:8].[ext]'
                        },
                    },
                ],
                //#endregion
            },
            {
                //#region JS/JSX transpiling
                test: /\.(m?js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                '@emotion/babel-preset-css-prop',
                            ],
                            plugins: [
                                '@babel/plugin-proposal-object-rest-spread',
                                '@babel/plugin-syntax-dynamic-import',
                            ],
                        },
                    },
                ],
                //#endregion
            },
        ],
    },
    plugins: [
        new ProgressBarPlugin(), // Adds a progress bar while building.
        new CleanWebpackPlugin(), // Clean build directory.
        //#region Export index.html
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            hash: true,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        //#endregion
        //#region Extract CSS to file
        new MiniCssExtractPlugin({
            filename: '_/css/[name].[contenthash:8].css',
            chunkFilename: '_/css/[id].[contenthash:8].css',
        }),
        //#endregion
    ],
    resolve: {
        //#region File extensions to resolve
        extensions: [
            '.js',
            '.jsx',
            '.es6',
            '.mjs',
            '.gif',
            '.jpg',
            '.jpeg',
            '.png',
            '.svg',
            '.css',
            '.module.css',
        ],
        //#endregion
    },
}
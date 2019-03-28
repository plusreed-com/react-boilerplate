const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production', // Set mode to production
    devtool: 'nosources-source-map', // Output source maps with no code
    optimization: {
        minimizer: [
            //#region Terser config
            new TerserWebpackPlugin({
                cache: true,
				parallel: true,
				sourceMap: true,
				terserOptions: {
					ecma: 5,
					dead_code: true,
					mangle: true,
					safari10: true,
				},
            }),
            //#endregion
            //#region CSS optimization
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    },
                },
            }),
            //#endregion
        ],
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            //#region Cache groups config
            // https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
            //#endregion
        },
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin()
    ],
});
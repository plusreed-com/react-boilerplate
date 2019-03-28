const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development', // Set mode to development
    devtool: 'source-map', // Output source maps in development
    devServer: {
        contentBase: './build', // Base for development server
        port: 5000 // Port for development server
    },
})
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    performance: { hints: false },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Terra Shmup',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets',
                    noErrorOnMissing: true
                },
            ]
        })
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};
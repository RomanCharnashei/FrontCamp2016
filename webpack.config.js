'use strict';

let path = require('path');
let webpack = require('webpack');
let NODE_ENV = process.env.NODE_ENV || 'dev';
let ExtractTextPlugin = require('extract-text-webpack-plugin');

function ie() {
    let config = {
        entry: ['whatwg-fetch', 'babel-polyfill', './src/js/index'],
        output: {
            path: __dirname + "/dist",
            filename: "bundle.js"
        },

        devtool: NODE_ENV == 'dev' ? 'source-map' : null,

        plugins: [
            new webpack.NoErrorsPlugin(),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(NODE_ENV),
                LANG: JSON.stringify('en'),
            }),
            new ExtractTextPlugin('bundle.css')
        ],

        module: {
            loaders: [{
                include: [
                    path.resolve(__dirname, "src/js")
                ],
                loader: "babel",
                query: {
                    presets: ['es2015']
                }
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }, {
                test: /\.json$/,
                loader: __dirname + '/webpack_loaders/jsonNumberRemove'
            }]
        },

        devServer: {
            host: 'localhost',
            port: 8181
        }
    };

    if (NODE_ENV == 'prod') {
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        }));
    }

    return config;
};

module.exports = ie();
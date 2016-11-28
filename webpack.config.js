'use strict';

const path = require('path');

module.exports = {
    entry: ['whatwg-fetch', 'babel-polyfill', './src/js/index'],
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },

    devtool: 'source-map',

    module: {

        loaders: [{
            include: [
                path.resolve(__dirname, "src/js")
            ],
            loader: "babel",
            query: {
                presets: ['es2015']
            }
        }]
    }
};
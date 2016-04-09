var webpack = require('webpack');
var ExtractText = require("extract-text-webpack-plugin");
var copy = require("copy-webpack-plugin");

module.exports = {
    entry:  [
        './src/js/index.js',
        './src/styles/main.scss',
    ],
    output: {
        path:     'build',
        filename: 'js/main.js',
    },
    module: {
        loaders: [
            {
                test:   /\.js/,
                loader: 'babel',
                include: __dirname + '/src',
                query: {
                    presets: ['es2015'],
                }
            },
            {
                test: /\.scss/,
                loader: ExtractText.extract('style', 'css!sass!import-glob')
            }
        ],
    },
    plugins: [
        new ExtractText('./css/main.css'),
        new copy([
            { from: './src/index.html', to: '.'},
            { from: './src/json', to: './json'},
            { from: './src/svg', to: './svg'},
            { from: './src/pleasant', to: './pleasant'},
            { from: './node_modules/d3/d3.min.js', to: './js'},
            { from: './node_modules/ace-editor-builds/src-min', to: './js/ace'},
        ]),
    ]
};
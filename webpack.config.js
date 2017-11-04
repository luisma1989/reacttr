const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: ['./src/index.jsx'],
    output:{
        filename: 'app.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    module: {
        loaders: [
          {
            test: /\.js|.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
                presets: ['es2015', 'react']
            }
          },
          { test: /\.css$/, loaders: [
              'style-loader?sourceMap',
              'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'
            ]
          }
        ]
    },

    devServer:{
        host: '0.0.0.0',
        port: 8081,
        inline: true
    },

    plugins:[
        new HtmlWebpackPlugin({template: './src/assets/index.html'}),
        new ExtractTextPlugin('style.css', {allChunks: true})
    ]
}

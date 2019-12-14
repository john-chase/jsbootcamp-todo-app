const path = require('path')

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js',
    ],
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: 'bundle.js'
    },
    plugins: [
        new MomentLocalesPlugin(),
        new MomentLocalesPlugin({
            localesToKeep: ['es-us'],
        }),
    ],
    module: {
        rules: 
        [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }, {
        //     test: /\.scss$/,
        //     exclude: /node_modules/, 
        //     use: [
        //         'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'
        //     ]
        // }, { 
            test: /\.css$/, 
            use: [
                'style-loader', 'css-loader'
            ] 
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/'
    },
    devtool: 'source-map'
}

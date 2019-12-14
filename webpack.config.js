const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
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
        new ExtractTextPlugin({filename:'../styles/bundle.css'}),        
        new MomentLocalesPlugin(),
        new MomentLocalesPlugin({
            localesToKeep: ['es-us'],
        }),
    ],
    module: {
        rules: 
        [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }, {
                test:/\.css$/,
                exclude: /node_modules/,                
                use: ExtractTextPlugin.extract({ 
                    fallback:'style-loader',
                    use:['css-loader'],
                })
            },
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/'
    },
    watch:true,
    devtool: 'source-map'
}

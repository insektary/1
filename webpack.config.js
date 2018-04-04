const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        //publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.less$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['last 2 version']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    "less-loader"
                ]
            }
        ],
    },
    mode: 'development',
    devServer: {
        stats: 'errors-only',
        contentBase: __dirname,
        hot: true,
        port: 8080
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            title: 'Project demo',
            template: 'src/html/index.html'
        }),
    ]
};
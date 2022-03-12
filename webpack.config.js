const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports = {
    context: path.resolve(__dirname, 'src'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    mode: 'development',
    devtool: "source-map",
    entry: {
        main: {import: './js/main.js', filename: "./js/main.js"}
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            chunks: ['main'],
            template: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "/css/",
                        }
                    },
                    { loader: 'css-loader', options: { sourceMap: true }},
                    { loader: 'postcss-loader', options: { sourceMap: true }}
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    devServer: {
        open: true,
        host: 'localhost',
        hot: true
    },
    optimization: {
        //minimize: true,
        minimizer: [new CssMinimizerPlugin()],
    }
};
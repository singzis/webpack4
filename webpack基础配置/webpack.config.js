const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: "babel-loader"
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader"
            ]
        }, {
            test: /\.html$/,
            use: "html-loader"
        }, {
            test: /\.(jpg|png|gif|jepg)$/,
            use: "file-loader"
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "index.css"
        }),
        new CleanWebpackPlugin()
    ]
}

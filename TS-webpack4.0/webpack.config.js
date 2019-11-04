const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin} = require('clean-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"]
      },
      {
        test: /\.ts$/,
        use: ["ts-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "phonix",
      template: "src/index.html",
      filename: "index.html"
    }),
    new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
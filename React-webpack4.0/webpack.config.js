const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
  entry: path.join(__dirname, "/src/index.js"),
  output: {
    path: path.resolve(__dirname, "build/page"),
    filename: "[name].js"
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all"
  //   }
  // },
  devServer: {
    port: 3001
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html"
    }),
    new CleanWebpackPlugin(),
    new DashboardPlugin()
  ]
};

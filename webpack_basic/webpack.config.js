const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')
const chalk = require('chalk')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'[name].bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        // include:[
        //   path.resolve(__dirname,'src')
        // ],
        use:'babel-loader'
      },
      {
        test:/\.(sa|sc|le|c)ss$/,
        include:[
          path.resolve(__dirname,'src')
        ],
        use:[
          {
            loader:MiniCssExtractPlugin.loader,
            options:{
              publicpath:'../',
              hmr:process.env.NODE_ENV !== 'production'
            }
          },
          // 'less-loader',
          'css-loader',
          // 'sass-loader',
          // 'postcss-loader'
        ]
      }
    ]
  },
  resolve:{
    modules:[
      'node_modules',
      path.resolve(__dirname,'src')
    ],
    extensions:['.wasm','.mjs','.js','.json','.jsx']
  },
  devServer:{
    contentBase:'./dist',
    hot: true
  },
  plugins:[
    // new UglifyPlugin(),
    new HtmlWebpackPlugin({
      filename:'index.html',
      tepmlate:'src/index.html',
      title:'宁觉得呢'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[name].css' : '[name].[hash].css'
    }),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.bgGreen.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
    new HotModuleReplacementPlugin()
  ]
}
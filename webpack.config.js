const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(dirName) {
  return path.resolve(__dirname, dirName);
}

const { VueLoaderPlugin } = require('vue-loader');

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'vue-style-loader'

// 定义配置项
const config = {
  entry: './src/main.js',
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js'
  },
  devServer: {
    // open: true,
    port: 8848,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.css$/,
        use: [
          stylesHandler,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          stylesHandler,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      }
    ]
  },
  resolve: {
    alias: {
      "@src": resolve("src"),
      "@components": resolve("src/components"),
      "@share": resolve("src/share"),
      "@element": resolve("src/views/_element")
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
  },
  plugins: [
    // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
    new VueLoaderPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        // NODE_ENV: 'development'
      }
    }),

    new HtmlWebpackPlugin({
      title: 'vue2',
      template: 'public/index.html'
    })
  ]
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'
  } else {
    config.mode = 'development'
  }
  return config
}

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// compiler.plugin is not a function
// const PreloadWebpackPlugin = require('preload-webpack-plugin');

// 没生效
// const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');

const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')

function resolve(dirName) {
  return path.resolve(__dirname, dirName);
}

const { VueLoaderPlugin } = require('vue-loader');

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'vue-style-loader'

const cdn = {
  css: ['https://unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css'],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11',
    'https://unpkg.com/vuex@3.6.2/dist/vuex.min.js',
    'https://unpkg.com/vue-router@3.5.2/dist/vue-router.js',
    'https://unpkg.com/element-ui@2.15.3/lib/index.js'
    // 'https://unpkg.com/axios/dist/axios.min.js',
  ],
}

// 定义配置项
const config = {
  entry: './src/main.js',
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[contenthash:8].js',
    publicPath: '/',
    chunkFilename: 'js/chunk-[name].[contenthash:8].js',
    clean: true
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
        generator: {
          filename: 'static/[name].[hash:8].[ext]'
        }
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
      template: 'public/index.html',
      inject: true,
      favicon: resolve('public/favicon.ico'),
      cdn
    }),

    // new PreloadWebpackPlugin({
    //   rel: 'preload',
    //   include: 'initial',
    //   // 文件黑名单
    //   fileBlacklist: [
    //     /\.map$/,
    //     /hot-update\.js$/
    //   ]
    // }),

    // new PreloadWebpackPlugin({
    //   rel: 'preload',
    //   include: 'asyncChunks'
    // }),

    // new ResourceHintWebpackPlugin(),

    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'initial',
      fileBlacklist: [
        /\.map$/,
        /hot-update\.js$/
      ]
    }),

    new PreloadWebpackPlugin({
      rel: 'prefetch',
      include: 'asyncChunks'
    }),

    new CompressionPlugin(),
  ],
  // devtool: 'source-map',
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      // 一般采用默认的就行了
      chunks: 'all',
      minSize: 2000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      // 缓存组
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial', // initial | all
        },
        common: {
          name: 'chunk-common',
          chunks: 'initial',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    // production 默认 会开启 TerserPlugin，这里定义是为了 override 默认配置
    // minimizer: [{}],
  },
  // 疑问？左边是使用的第三方包的名称，右边这个怎么对应起来呢？
  externals: {
    vue: 'Vue', // 规则 - {import xx from 'vue'} 属性名 vue 就是 from 的那个模块 vue。
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    'element-ui': 'ELEMENT'
  }
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'

    config.plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/chunk-[name].[contenthash:8].css'
    }))
  } else {
    config.mode = 'development'
  }
  return config
}

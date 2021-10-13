#### Rules
```
// 处理 .vue 文件
npm install -D vue-loader vue-template-compiler

// 配置 babel
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install -D babel-core babel-loader

// 处理 scss
npm install -D sass-loader node-sass

// 提取 css
npm install -D mini-css-extract-plugin

// .jsx + vue2.x
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props

module.exports = {
  presets: ['@vue/babel-preset-jsx'],
}
```

#### index.html 里 BASE_URL 无法解决？
```
ERROR in Template execution failed: ReferenceError: BASE_URL is not defined

ERROR in   ReferenceError: BASE_URL is not defined
  
  - loader.js:4 eval
    [index.html?.]/[html-webpack-plugin]/lib/loader.js:4:11
  
  - loader.js:11 module.exports
    [index.html?.]/[html-webpack-plugin]/lib/loader.js:11:3
  
  - index.js:450 
    [vue2-by-webpack]/[html-webpack-plugin]/index.js:450:16
  
  - runMicrotasks
  
  - task_queues.js:93 processTicksAndRejections
    internal/process/task_queues.js:93:5
  
  - async Promise.all
```
暂时把这个移除掉！正常 run 起来了。

丢到 nginx 能够正常跑起来。也暴露了一个问题：
- 每次都要去请求一次 favicon.ico；
```
new HtmlWebpackPlugin({
  title: 'vue2',
  template: 'public/index.html',
  inject: true,
  favicon: resolve('public/favicon.ico')
})
```

---

学以致用：
1. splitChunks，做持久缓存；并把 node_modules 拆分，生成对应的 chunk-vender 文件。

当前dist/ index.html 的内容
```
<!doctype html>
<html lang="">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="icon" href="/favicon.ico">
  <title>vue2</title>
  <link rel="icon" href="/favicon.ico">
  <script defer="defer" src="/js/runtime.cf3cc4e1.js"></script>
  <script defer="defer" src="/js/chunk-vendors.59453d4e.js"></script>
  <script defer="defer" src="/js/main.a8972cc4.js"></script>
  <link href="/css/chunk-vendors.c008dc81.css" rel="stylesheet">
  <link href="/css/main.a8204fd4.css" rel="stylesheet">
</head>

<body><noscript><strong>We're sorry but vue2 doesn't work properly without JavaScript enabled. Please enable it to
      continue.</strong></noscript>
  <div id="app"></div>
</body>

</html>
```

2. Add Plugin: prefetch, preload (浏览器在空闲时加载被标记为 prefetch 的资源； preload 会把资源下载顺序权重提高)

分析：使用 code splitting 之后，单个 js 的体积减小了，但是页面下载的js的数量增加了。我们为了提高用户体验度，可能让浏览器预下载下一个导航可能会用到的资源。

vue-cli 的作用是把所有作为 asyncChunks 生成的js文件（import(), 按需 code-splitting）自动生成 prefetch 。

```
$ npm install --save-dev preload-webpack-plugin

// 遇到问题了
webpack-cli] TypeError: compiler.plugin is not a function
    at PreloadPlugin.apply (/Users/liang/PERSONAL/Core_Tech/webpack/vue2-by-webpack/node_modules/preload-webpack-plugin/index.js:63:14)

// 根据 html-webpack-plugin 官网推荐的一个插件 resource-hints-webpack-plugin
$ npm install --save-dev resource-hints-webpack-plugin
// 也不行
```

就去找 vue-cli 使用的什么插件？ [@vue/preload-webpack-plugin](https://github.com/vuejs/preload-webpack-plugin)。本质是 fork of [preload-webpack-plugin](https://github.com/GoogleChromeLabs/preload-webpack-plugin) with a number of changes。说明是做了二次封装的，那就在试一下。

```
$ npm install --save-dev @vue/preload-webpack-plugin
```
终于搞定了这个问题。

**思考** 移动端可能会关闭这个plugin 配置。

---

3. compression gzip压缩

之前：
chunk-vendor.css 45.9KB
runtime.js 2.3KB
chunk-vendors.js 250KB


安装：
```
$ npm install --save-dev compression-webpack-plugin
```
这个也搞定。

---

4. 开启 analyzer

```
npm install -D webpack-bundle-analyzer
```

```
All (875.78 KB)
js/chunk-vendors.f07ede95.js (807.69 KB)
js/main.571e53f0.js (33.77 KB)
js/chunk-Lifecycle.25daefc6.js (8.48 KB)
js/chunk-768.2456894b.js (8.41 KB)
js/chunk-228.cbd806d3.js (5.61 KB)
js/runtime.19a3e855.js (3.94 KB)
js/chunk-989.07367b6c.js (3.1 KB)
js/chunk-201.9afc6507.js (1.14 KB)
js/chunk-547.e4a08990.js (1.06 KB)
js/chunk-713.1d686592.js (913 B)
js/chunk-93.b34a5943.js (898 B)
js/chunk-457.49ab1840.js (849 B)
```

减少体积的手段：
- vue, vuex, vue-router，使用 CDN；



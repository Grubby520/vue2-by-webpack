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


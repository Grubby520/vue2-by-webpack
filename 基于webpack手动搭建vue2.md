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
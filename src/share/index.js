import Vue from "vue";
import Plugins from "./packages";

/**
 * 基于 webpack 构建的前提下
 * 使用API：require.context
 * 目标：自动化全局注册
 * 注意：在根节点 new 实例化之前完成注册
 */

// 指令
const requireDirectives = require.context("./directives", true, /\w+\.(js)$/);
requireDirectives.keys().forEach((name) => {
  const file = requireDirectives(name);
  const config = file.default || file;
  Vue.use(config);
});

// 组件
const requireComponents = require.context("./components", true, /\w+\.(vue)$/);
requireComponents.keys().forEach((fileName) => {
  const file = requireComponents(fileName);
  const config = file.default || file;
  const name = config.name;
  // 定义全局组件的命名规范：Sl 开头
  if (name && name.indexOf("Sl") !== -1) {
    // 全局注册组件 Vue.component(name, {...})
    Vue.component(config.name, config);
  }
});

// 公共属性/方法
Plugins.install(Vue);

// 过滤器
const requireFilters = require.context("./filters", true, /\w+\.(js)$/);
requireFilters.keys().forEach((name) => {
  const file = requireFilters(name);
  const config = file.default || file;
  Vue.use(config);
});

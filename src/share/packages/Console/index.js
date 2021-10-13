export default {
  // 暴露一个 install 方法，供 Vue.use 方法调用
  install: function (Vue) {
    // Plugin 插件开发 添加Vue实例方法 通过添加到 Vue.prototype 上实现
    Vue.prototype.$console = function (...rest) {
      console.log(rest);
    };
  },
};

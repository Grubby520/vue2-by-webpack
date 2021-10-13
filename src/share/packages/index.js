import Console from "./Console";

/**
 * 在 Vue.prototype 上添加属性和方法，作为全局的属性和方法
 * 这里模拟添加一个console.log打印方法
 */
const plugins = {
  install: (Vue) => {
    Console.install(Vue);
  },
};

export default plugins;

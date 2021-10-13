import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { myPluginWithSnapshot } from "./plugins";

/**
 * 基于 webpack 构建的前提下
 * 使用API：require.context
 * 目标：加载所有模块
 */
function loadModules() {
  const context = require.context("./modules", false, /([a-z_]+)\.js$/i);

  const modules = context
    .keys()
    .map((key) => ({ key, name: key.match(/([a-z_]+)\.js$/i)[1] }))
    .reduce(
      (modules, { key, name }) => ({
        ...modules,
        [name]: context(key).default,
      }),
      {}
    );

  return { context, modules };
}

const { context, modules } = loadModules();

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules,
  state,
  getters,
  mutations,
  actions,
  strict: debug, // 生产关闭，为了避免性能损失
  plugins: debug ? [myPluginWithSnapshot] : [],
});

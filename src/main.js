import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./share"; // 注册全局特性(组件，指令，过滤器，方法)

import "./views/_element";

Vue.config.productionTip = false;

window.vueInstance = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

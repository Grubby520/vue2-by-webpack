import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter); // 插件 Plugin 一个库，提供强大的API

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/lifecycle",
    name: "lifecycle",
    component: () =>
      import(/* webpackChunkName: "Lifecycle" */ "../views/Lifecycle.vue"),
  },
  {
    path: "/slot",
    name: "Slot",
    component: () => import("../views/Slot.vue"),
  },
  {
    path: "/boundary",
    name: "Boundary",
    component: () => import("../views/Boundary.vue"),
    // 元数据 用于鉴权，或者设置白名单
    meta: { auth: true },
  },
  {
    path: "/nestRouter",
    name: "NestRouter",
    component: () => import("../views/NestRouter.vue"),
    children: [
      {
        path: ":id",
        name: "detail",
        component: () => import("@components/nestRouter/detail.vue"),
        // 路由独享的守卫 只能是列表路由跳转到详情
        beforeEnter: (to, from, next) => {
          if (from.name !== "NestRouter") {
            next(false);
            return;
          }
          next();
        },
      },
    ],
  },
  {
    path: "/unitTest",
    name: "UnitTest",
    component: () => import("../views/UnitTest.vue"),
    // 元数据 用于鉴权，或者设置白名单
    meta: { auth: true },
  },
  {
    path: "/reactive",
    name: "Reactive",
    component: () => import("../views/Reactive.vue"),
  },
  {
    path: "/elementUi",
    name: "ElementUi",
    component: () => import("../views/ElementUi.vue"),
  },
  {
    path: "/sl-ui",
    name: "SlUi",
    component: () => import("../views/SlUi.vue"),
  },
  // 都没有匹配上，则使用默认值
  {
    path: "*",
    redirect: "/home", // 或者 404 页面
  },
];

const router = new VueRouter({
  mode: "hash", // 后端需要做额外的配置 nginx, Apache, nodejs
  base: process.env.BASE_URL,
  routes,
});

// 全局导航守卫
// beforeEach
router.beforeEach((to, from, next) => {
  // console.log("* global from: ", from);
  // console.log("* global beforeEach");
  // Auth 鉴权问题
  const isAuthenticated = true;
  if (to.name !== "Login" && !isAuthenticated) {
    next({ name: "Login" });
    return;
  }
  next();
  // 终止跳转
  // next(false);
  // 传递错误
  // next(new Error("problem happened"));
});

// beforeResolve
router.beforeResolve((to, from, next) => {
  // console.log("* global to: ", to);
  // console.log("* global beforeResolve");
  next();
});

// afterEach
router.afterEach((to, from) => {
  // console.log("* global to: ", to);
  // console.log("* global afterEach");
});

export default router;

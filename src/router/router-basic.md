* $router 和 $route 的区别
  $router：
    1. router 路由器, VueRouter 类的实例
    2. 任何组件都可以使用 this.$router
  $route:
    1. 当前路由 _route 属性上
    2. 任何组件内部 this.$route

* 动态路由匹配 (dynamic segment)
  router：
    1. { path: '/user/:id', component: User }
    2. { path: '/user/:username/post/:post_id', component: User }
  component：
    this.$route.params
    <重点：在路径上的params参数，刷新不会丢失；>
  监听route变化：
    1. watch: {
      $route(to, from) {
        // 对路由变化作出响应...
      }
    }
    2. beforeRouteUpdate(to, from, next) {
        // react to route changes...
        // don't forget to call next()
      }

* 嵌套路由 children: Array<Object>
  {
    path,
    name,
    component,
    children: [
      {
        path,
        name,
        component
      }
    ]
  }

* 编程式的导航
  // 字符串
  router.push('home') // path 属性

  // 对象
  router.push({ path: 'home' }) // path 属性

  // 命名的路由
  router.push({ name: 'user', params: { userId: '123' }})

  // 带查询参数，变成 /register?plan=private
  router.push({ path: 'register', query: { plan: 'private' }})

  <重点：使用 path，会忽略 params;>

  // path 上挂载了 params，可以这样写
  router.push({ name: 'user', params: { userId }}) // user/123
  router.push({ path: `/user/${userId}` }) // user/123

* 【嵌套命名视图】
  未使用。。。
  {
    path,
    components: {
      default: F00,
      a: Bar
    }
  }

* 【路由组件传参】
1. props 将组件与路由解耦 类型 any
component: this.$attrs 获取 props 的值；
重点：尽可能的保持 props 函数为无状态
复用同一个组件，区分不同 route，使用 props；
{
  path: '/a',
  component: Foo,
  props: { type: 1 } // 静态
}, {
  path: '/b',
  component: Foo,
  props: { type: 2 }
}, {
  props: (route) => ({ query: route.query.q }) // 基于路由的值 URL /search?q=vue
}

* 【history 模式】
  1. 后端配置
  location / {
    try_files $uri $uri/ /index.html;
  }

* 【transition 过渡动画】

* [router 懒加载]
  1. Vue 异步组件 + Webpack code-splitting-async；
  2. 工厂函数，都可以基于 Promise 处理；
  {
    routes: [
      {
        path,
        component: () => import("@/Foo.vue") // Webpack dynamic-import 
      }
    ]
  }
  3. 如果想把某个路由下的所有组件打包到同一个 异步块 chunk 中；
  命名 chunk, 特殊的注释: /* webpackChunkName: "Lifecycle" */
  {
    component: () =>
      import(/* webpackChunkName: "Lifecycle" */ "../views/Lifecycle.vue"),
    component: () =>
      import(/* webpackChunkName: "Lifecycle" */ "../views/Lifecycle1.vue"),
    component: () =>
      import(/* webpackChunkName: "Lifecycle" */ "../views/Lifecycle2.vue"),
  }

* 【导航故障】
  1. router-link vs $router.push()
    函数式编程，可以检测和处理导航故障；声明式无法做到；
    一般有2个回调，onComplete, onAbort;
  2. const { isNavigationFailure, NavigationFailureType } = VueRouter
    目前没有过，跳过...


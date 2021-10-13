
* 【Router 实例方法】

  「全局导航守卫」
  1. beforeEach((to, from, next) => {})
  2. beforeResolve((to, from, next) => {})
  3. afterEach((to, from) => {})

  「组件 配置 选项」
  1. beforeRouteEnter 进入前
  2. beforeRouteUpdate 更新前
  3. beforeRouteLeave 离开前

  「组件 $router 实例方法」
  1. router.push(location, onComplete?, onAbort?): Promise
  向 history 栈添加一个新的记录。
  效仿 window.history.pushState。

  2. router.replace(location, onComplete?, onAbort?): Promise
  不会向 history 栈添加一个新的记录，而是替换当前 history 记录。
  效仿 window.history.replaceState。

  3. router.go(n: bigint)
     router.back()
     router.forward()
  n 整数，在 history 中前进或后退多少步。
  效仿 window.history.go(n) / window.history.forward() / window.history.back()

  4. router.resolve(location, current?, append?)
  解析 location 目标位置

  5. router.addRoute(route: RouteConfig): () => void
     router.addRoute(parentName: string, route: RouteConfig): () => void
     添加新的路由规则；或者现有路由的子路由；
  
  「组件 $route 当前激活的路由信息对象」
   {
      fullPath: "/nestRouter/37" // 包含查询参数和 hash 的完整路径
      hash: "" // hash模式 # 才有值
      matched: (2) [{…}, {…}] // 含当前路由的所有嵌套路径片段的路由记录
      meta: {}
      name: "detail"
      params: {id: "37"} // Object，刷新页面会丢失
      path: "/nestRouter/37" // String 绝对路径
      query: {} // 查询参数 /foo?user=1
   }

* [Router 构建选项]
  
  1. 完整的属性
  {
    mode: 'history' | 'hash' | 'abstract',
    base: string,
    linkActiveClass: string,
    linkExactActiveClass: string,
    scrollBehavior: Function,
    parseQuery: Function,
    stringifyQuery: Function,
    fallback: boolean, // 浏览器不支持history，则回退到 hash 模式
    routes: Array<RouteConfig>
  }

  2. RouteConfig 接口
  interface RouteConfig = {
    path: string,
    component?: Component,
    name?: string, // 命名路由
    components?: { [name: string]: Component }, // 命名视图组件
    redirect?: string | Location | Function,
    props?: boolean | Object | Function,
    alias?: string | Array<string>,
    children?: Array<RouteConfig>, // 嵌套路由
    beforeEnter?: (to: Route, from: Route, next: Function) => void,
    meta?: any,

    // 2.6.0+
    caseSensitive?: boolean, // 匹配规则是否大小写敏感？(默认值：false)
    pathToRegexpOptions?: Object // 编译正则的选项
  }

* 声明
const store = new Vuex.Store({...options})

* Store 构造器选项
export default {
  state: Object | Function,
  reactive 响应式的，提前定义好所有要使用的属性

  getters: { [key: String]: Function },
  1. store 上，Function 入参 (state, getters)
  2. module 上，Function 入参 (state, getters, rootState, rootGetters)

  mutations: { [key: String]: Function },
  1. store 上，Function 入参 ({ state, getters, commit, dispatch }[, payload]) payload可选
  2. module 上，Function 入参 ({ state, rootState, getters, rootGetters, commit, dispatch }[, payload]) payload可选

  actions: { [key: String]: Function },
  1. store 上，Function 入参 ({ state, getters, commit, dispatch }[, payload]) payload可选
  2. module 上，Function 入参 ({ state, rootState, getters, rootGetters, commit, dispatch }[, payload]) payload可选

  modules: { // 嵌套模块 暂未使用过
    key: {
      state,
      namespaced?
      mutations?
      actions?
      getters?
      modules?
    }
  },

  plugins: Array<Function>,
  Function 入参 (store), 可以监听 mutation（用于外部地数据持久化、记录或调试）或者提交 mutation （用于内部数据，例如 websocket 或 某些观察者）;

  strict: boolean,
  默认 false，严格模式下，只能通过 mutation 修改 state，否则都会抛出错误;

  devtools: boolean,
  决定 store 会不会订阅到 devtools 插件
}

* Vuex.Store 实例属性
  1. state
  2. getters

* Vuex.Store 实例方法
  1. commit
  . commit(type: string, payload?: any, options?: Object)
  . commit(mutation: Object, options?: Object)
  提交 mutation

  2. dispatch
  . dispatch(type: sting, payload?: any, options?: Object): Promise<any>
  . dispatch(action: Object, options?: Object): Promise<any>
  分发 action

  3. replaceState(state: Object)
  替换 store 跟状态，仅用于时光旅行调试

  4. watch(fn: Function, cb: Function, options?: Object): Function
  响应式地侦听 fn 的返回值，当值改变是会调用 cb。
  fn 入参 (state, getters)
  options 作为vm.$watch 方法的入参
  watch 返回一个 取消侦听的 Function，执行返回的函数即可停止侦听。

  5. subscribe(handler: Function, options?: Object): Function
  订阅 store 的 mutation。
  handler 入参 (mutation, state), 会在每个 mutation 完成后调用, state 是更新后。
  返回一个 取消侦听的 Function。

  6. subscribeAction(handler: Function, options?: Object): Function
  2.5 新增，订阅 store 的 action。
  handler 入参 (action: {type, payload}, state), 每个 action 分发开始的时候调用，state 是当前的。
  返回一个 取消侦听的 Function。

  3.1.0 之后，api有更改。分发 之前，之后，捕获异常。
  store.subscribeAction({
    before(action, state) {},
    after(action, state) {},
    error(action, state, error) {}, // 3.4.0 之后
  })

  7. registerModule(path: string | Array<string>, module: Module, options?: Object)
  注册动态模块。

  8. unregisterModule(path: string | Array<string>)
  卸载一个动态模块。

  9. hasModule(path: string | Array<string>): boolean
  检查该模块的名字是否已被注册。

  10. hotUpdate(newOptions: Object)
  动态模块的 hot reload。

* 组件绑定的 helpers
  mapState(namespace?: string, map: Array<string> | Object<string | function>): Object,

  mapGetters(namespace?: string, map: Array<string> | Object<string>): Object,

  mapMutations(namespace?: string, map: Array<string> | Object<string | function>): Object,

  mapActions(namespace?: string, map: Array<string> | Object<string | function>): Object,

  createNamespacedHelpers(namespace: string): Object,


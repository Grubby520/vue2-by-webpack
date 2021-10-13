/**
  commit`mutation`是更改状态的唯一方法，这个过程是同步的
  异步逻辑都封装到action里
  模块拆分 使用modules注册
 */
export default {
  namespaced: true,
  /**
   * 既然是响应式的，那么必须遵循与 vue Component 一样的原则
   * 1.提前在 store state 中初始化所有需要的 property
   * 2.若要添加新属性，Vue.set(obj, "newProp", 101) | state.obj = {...state.obj, newProp: 101}
   */
  state: () => ({
    count: 1,
    age: 30,
    salary: 8,
    todo: [
      { label: "one", value: 1, done: true },
      { label: "two", value: 2, done: false },
    ],
  }),
  getters: {
    // 通过入参 state, 传递 context 上下文作用域
    doneTodo(state) {
      return state.todo.filter((item) => item.done);
    },
    // 第二个参数，拿到 getters 上下文作用域
    doneTodoLength(state, getters) {
      return getters.doneTodo.length;
    },
    // 外部传参
    getTodoById: (state) => (id) => {
      return state.todo.find((item) => item.value === id);
    },
  },
  mutations: {
    /**
     * 同步函数 <mutation 都是同步事务>
     * sync (type + handler, Payload + use commit)
     * not support async
     * Question：同步中使用异步回调函数会怎样? VS Actions 异步回调的处理逻辑？
     * Answer:
     * 1.mutation可以使用异步，依然可以正常更新；
     * 2.问题在于，多个commit同时更新时，回调状态是未知的，无法预知结果；
     * 3.代码调试会变得非常困难；
     */
    // 不带 载荷
    increment(state) {
      state.count += 1;
      // * 测试发现，异步也是正常的！
      //   setTimeout(() => {
      //     state.count += 1;
      //   }, 1000);
    },
    // 带 payload
    incrementBy(state, payload) {
      state.count += +payload.count;
    },
    // 兼容的写法 (带有默认行为)
    incrementAll(state, payload = { count: 1 }) {
      state.count += +payload.count;
    },
    // 嵌套 dispatch demo
    incrementA(state) {
      state.count += 1;
    },
    incrementB(state) {
      state.count += 1;
    },
    incrementC(state) {
      state.count += 1;
    },
  },
  /**
   * Action
   * 1.异步逻辑都封装到action里
   * 2.提交的是 mutation，而不是直接变更状态
   */
  actions: {
    // 总结经验：提前确定是否需要 payload, 不做兼容（根据业务场景来，是否包含默认）
    // 入参: 接受一个与 store 实例具有相同方法和属性的 context 对象
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment"); // 提交的是 mutation
      }, 800);
    },
    // 带载荷 payload
    incrementByAsync({ commit }, payload) {
      setTimeout(() => {
        commit("incrementAll", payload);
      }, 500);
    },
    // * 实际场景 commit完成之后，暴露给组件一个回调函数
    incrementByAsyncPromise({ commit, state, dispatch }, payload) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("incrementAll", payload);
          resolve(state.count); // 根据需求返回结果
        }, 300);
      });
    },
    // * 嵌套使用 dispatch 另一个方法，再 commit ...
    actionA({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit("incrementA");
          resolve();
        }, 1000);
        setTimeout(() => {
          reject();
        }, 500);
      });
    },
    async actionB({ commit }) {
      // return new Promise((resolve) => {
      //   setTimeout(() => {
      //     commit("incrementB");
      //     resolve();
      //   }, 1500);
      // });
      // async 简化
      function getB() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1500);
        });
      }
      commit("incrementB", await getB()); // 强烈推荐（必须兼容 Error Handler）
    },
    // 弊端：数据流不够简洁，高耦合，增加阅读难度和维护成本
    actionC({ commit, dispatch }) {
      return dispatch("actionA")
        .then(() => {
          commit("increment");
        })
        .catch(() => {
          return dispatch("actionB"); // 进入 catch
        })
        .then((res) => {
          return res;
        });
    },
    // async 简化写法
    async actionAll({ commit, dispatch }) {
      const actionA = dispatch("actionA"); // 等待 actionA 完成
      const actionB = dispatch("actionB"); // 等待 actionB 完成
      commit("incrementC", { actionA, actionB }); // sync
      commit("incrementC", await dispatch("incrementAsync")); // sync
    },
  },
  /**
   * 痛点：单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿
   * 将 store 分割成模块（module）
   */
  // modules: {},
};

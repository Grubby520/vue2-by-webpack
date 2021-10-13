const state = () => ({
  state1: "state1",
  state2: "state2",
});

const getters = {
  getter1(state) {
    return state.state1.split("1");
  },
};

const mutations = {
  mutations1(state, payload) {
    state.state2 += payload.status || "";
  },
};

const actions = {
  // rootState, rootGetters 只存在于 module 中
  actions1(
    { state, commit, dispatch, getters, rootState, rootGetters },
    payload
  ) {
    setTimeout(() => {
      commit("mutations1", payload);
    });
  },
};

// 子模块 嵌套 子模块
const modules = {};

export default {
  strict: true,
  devtools: true,
  state,
  getters,
  mutations,
  actions,
  modules,
};

export default {
  rootAction({ state, getters, commit, dispatch }, payload) {
    setTimeout(() => {
      commit("rootMutation", payload);
    }, 300);
  },
};

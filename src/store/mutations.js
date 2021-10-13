export default {
  rootMutation(state, payload) {
    state.rootState = payload || "";
  },
};

export const myPluginWithSnapshot = (store) => {
  let prevState = JSON.parse(JSON.stringify(store.state));
  // 每个 mutation 完成后都会触发 侦听回调函数
  store.subscribe((mutation, state) => {
    console.log(mutation.type);
    let nextState = JSON.parse(JSON.stringify(state));

    // 比较 prevState 和 nextState...

    // 保存状态，用于下一次 mutation
    console.log(prevState);
    prevState = nextState;
    console.log(prevState);
  });

  // 每个 action dispatch 前后都会触发相应的回调
  store.subscribeAction({
    before(action, state) {
      console.log(action.type);
      console.log("action before");
    },
    after(action, state) {
      console.log("action after");
    },
  });
};

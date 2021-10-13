<template>
  <div class="vuex-c">
    <p>count: {{ count }}</p>
    <p>ageAlias: {{ ageAlias }}</p>
    <p>salary: {{ salary }}</p>
    <p>{{ age }}(age) X {{ localCount }}(localCount) = {{ totals }}(totals)</p>
    <p>doneTodoLength: {{ doneTodoLength }}</p>
    <p>
      <el-button type="primary" @click="getTodoById">getTodoById</el-button>
    </p>
    <p>{{ JSON.stringify(checkedTodo) }}</p>
    <p>
      <el-input
        v-slFormatNumber="{ type: 'integer' }"
        v-model="inputVal"
        style="width: 150px"
        placeholder=""
      ></el-input>
    </p>

    <p>
      Mutation:
      <el-button type="primary" @click="increment">increment count</el-button>
      <el-button class="ml-m" type="primary" @click="incrementMethod"
        >incrementMethod count</el-button
      >
      <el-button class="ml-m" type="primary" @click="incrementAlias"
        >incrementAlias count</el-button
      >
    </p>

    <p>
      Mutation payload:
      <el-button
        class="ml-m"
        type="primary"
        @click="incrementBy({ count: inputVal })"
        >incrementBy inputVal</el-button
      >
      <el-button class="ml-m" type="primary" @click="incrementByMethod"
        >incrementByMethod inputVal</el-button
      >
    </p>

    <p>
      Actions:
      <el-button type="primary" @click="incrementAsync"
        >incrementAsync count</el-button
      >
      <el-button type="primary" @click="incrementAsyncMethod"
        >incrementAsyncMethod count</el-button
      >
    </p>
    <p>
      Actions payload:
      <el-button
        class="ml-m"
        type="primary"
        @click="incrementByAsync({ count: inputVal })"
        >incrementByAsync inputVal</el-button
      >
      <el-button
        class="ml-m"
        type="primary"
        @click="incrementByAsyncPromiseMethod({ count: inputVal })"
        >incrementByAsyncPromiseMethod inputVal</el-button
      >
    </p>

    <h4 class="mt-l">v-model 更新 state</h4>
    <p>
      <el-input v-model="rootState" style="width: 20%"></el-input>
    </p>
  </div>
</template>

<script>
// 使用命名空间函数，就避免直接使用 $store 对象，全部使用 map 辅助函数
import { createNamespacedHelpers } from "vuex";
// 组件绑定的辅助函数
const { mapState, mapGetters, mapActions, mapMutations } =
  createNamespacedHelpers("moduleA");

export default {
  name: "Vuex",
  data() {
    return {
      inputVal: null,
      localCount: 10,
      checkedTodo: [],
    };
  },
  computed: {
    // store.state
    count() {
      // state namespaced
      return this.$store.state.moduleA.count; // 全局的，注入到所有子组件 $store
    },
    // 利用辅助函数 + 解构
    ...mapState({
      // arrow fn 代码更加简洁
      age: (state) => state.age,
      // 设置别名
      ageAlias: "age",
      // 为了能够使用`this`获取局部状态，必须使用常规函数
      totals(state) {
        return state.age * this.localCount;
      },
    }),
    // 映射的计算属性的名称和state的子节点相同时适用
    ...mapState(["salary"]),
    // mapGetters 与 mapState 用法一模一样
    ...mapGetters(["doneTodoLength"]),
    // v-model 更新 state （或者使用自定义事件 :value="rootState" @input="$store.commit("rootMutation", e.target.value)"）
    rootState: {
      get() {
        return this.$store.state.rootState;
      },
      set(value) {
        this.$store.commit("rootMutation", value); // 任何store的修改严格使用 mutation 更新
      },
    },
  },
  mounted() {
    console.log("Vuex.Store 实例：", this.$store);
  },
  methods: {
    // store.getters
    getTodoById() {
      const id = Math.random() > 0.5 ? 1 : 2;
      // getters namespaced
      this.checkedTodo = this.$store.getters["moduleA/getTodoById"](id);
    },
    // Mutations -------------
    // 辅助函数 解构
    ...mapMutations(["increment", "incrementBy"]),
    // 直接使用 store.commit
    incrementMethod() {
      // commit namespaced
      this.$store.commit("moduleA/increment");
    },
    incrementByMethod() {
      // store mutation commit 推荐
      this.$store.commit("moduleA/incrementBy", {
        count: this.inputVal,
      });
      // object mode <@required: type 属性> 不推荐
      // this.$store.commit({
      //   type: "moduleA/incrementBy",
      //   count: this.inputVal,
      // });
    },
    // 设置别名
    ...mapMutations({
      incrementAlias: "increment",
    }),
    // Actions -------------
    // store.dispatch 分发
    incrementAsyncMethod() {
      // dispatch namespaced
      this.$store.dispatch("moduleA/incrementAsync");
      // payload
      // this.$store.dispatch("moduleA/incrementAsync", payload);
      // * object mode - 通用的，无法区分是 dispath 和 commit
      // this.$store({
      //   type: "incrementAsync",
      //   ...payload,
      // });
    },
    // 辅助函数
    ...mapActions({
      incrementAsync: "incrementAsync", // alias（相似的语法）
    }),
    ...mapActions(["incrementByAsync", "incrementByAsyncPromise"]),
    incrementByAsyncPromiseMethod(payload) {
      this.incrementByAsyncPromise(payload).then((res) => {
        alert(res);
      });
    },
  },
};
</script>

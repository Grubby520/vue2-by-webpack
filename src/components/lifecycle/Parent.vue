<template>
  <div class="parent">
    <input v-model="text" />
    <button @click="plus" style="margin-right: 10px">点我</button>

    <el-button v-if="checkPermission('export')" type="primary"
      >export permission</el-button
    >
    <el-button v-if="checkPermission('confirm')" type="primary"
      >confirm permission</el-button
    >
    <el-button v-if="checkPermission('create')" type="primary"
      >not exist permission</el-button
    >

    <!-- 通信 父传子
      传递 动态 | 静态 prop
      注意：传number和boolean，必须使用动态Prop，说明它是表达式，而不是值
    -->
    <Child
      ref="child"
      :list="list"
      :baseValue="baseValue"
      staticValue="static value"
      @del="del"
    />
    <!-- 在 template 模板里，两种方式都可以：kebab-case & PascalCase -->
    <Alive />
  </div>
</template>

<script>
/**
（1）生命周期及其加载顺序
  mount阶段 -》dispatch阶段 -》destroy阶段
  1.单个组件：
  挂载阶段：beforeCreate, created, beforeMount, mounted
  更新阶段：beforeUpdate, updated
  销毁阶段：beforeDestroy, destroyed

  2.父子组件
  挂载阶段：
    beforeCreate(父), created(父), beforeMount(父), 
    beforeCreate(子), created(子), beforeMount(子), mounted(子)
    mounted(父)
  更新阶段:
    beforeUpdate(父)
    beforeUpdate(子), updated(子)
    update(父)
  销毁阶段：
    beforeDestroy(父),
    beforeDestroy(子), destroyed(子)
    destroyed(父)
 */
import Child from "./Child.vue";
import Alive from "./Alive.vue";
import Permission from "@src/mixins/permission";
export default {
  name: "Parent",
  // 局部注册组件 (另外，全局注册的组件也会合并到每个组件配置对象所对应的components)
  components: {
    Child,
    Alive,
  },
  /**
   * mixins 混入
   * souce code: mergeOptions 处理 extends 和 mixins：
   * 1.递归把 mixins 合并到 parent上 ；
   * 2.遍历 parent，调用 mergeField，再遍历 child，如果key 不在 parent 上存在，则调用 mergeField
   */
  mixins: [Permission("oemSettleAccounts-operations")],
  data() {
    return {
      name: "parent",
      list: [
        {
          label: "张三",
          key: 0,
        },
      ],
      key: 0,
      text: "",
      baseValue: "original data type",
    };
  },
  /**
   * 通信方式 provide + inject
   * 1.Object 传递静态属性 没有this
   * 2. () => Object 能拿到this 函数返回一个对象
   * 注意：传递的是数组或对象类型，同样是响应式的
   */
  provide() {
    return {
      list: this.list,
    };
  },
  methods: {
    plus() {
      this.key++;
      this.list.push({
        label: this.text,
        key: this.key,
      });
      console.log("DOM更新之前", this.$refs.child.$el.children.length);
      this.$nextTick(() => {
        // 钩子执行过程： parent beforeUpdate -> child beforeUpate -> child updated -> parent updated
        console.log("DOM更新之后", this.$refs.child.$el.children.length);
        console.log(this);
      });
    },
    del(index) {
      this.list.splice(index, 1);
    },
  },
  beforeCreate() {
    console.log("parent beforeCreate");
  },
  created() {
    console.log("parent created");
  },
  beforeMount() {
    console.log("parent beforeMount");
  },
  mounted() {
    console.log(this);
    console.log("parent mounted");
  },
  beforeUpdate() {
    console.log("parent beforeUpdate");
  },
  updated() {
    console.log("parent updated");
  },
  beforeDestroy() {
    console.log("parent beforeDestroy");
  },
  destroyed() {
    console.log("parent destroyed");
  },
  errorCaptured() {
    // 当捕获来自子孙组件错误是被调用
    console.log("parent errorCaptured");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

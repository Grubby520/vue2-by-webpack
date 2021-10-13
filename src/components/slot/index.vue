<template>
  <Search @search="handleTable('search')" @reset="handleTable('reset')">
    <!-- 1.父模板都是在父作用域中编译的；子模板所有内容都是在子作用域中编译的 -->
    <p>template by parent, {{ parent }}</p>
    <!-- 用一个函数包裹作用域，只有一个入参，可使用ES6的解构 -->
    <!-- 2. v-slot 等价于 #, 默认时必须写成 #default -->
    <template #buttonsLeft="{ form }">
      <el-button type="primary" @click="handleTable('create')">新增</el-button>
      <el-button type="primary" @click="handleTable('edit')">修改</el-button>
      <el-button type="primary" @click="handleTable('delete')">删除</el-button>
      <!-- 插槽Prop 作用于插槽 - 父作用域中拿到子组件的作用域 
           场景：子组件列表渲染，设置一个slot，并设置默认显示内容，父组件可以自定义子组件默认内容
      -->
      <span>{{ form.supplierName }}</span>
    </template>
    <template #buttonsRight>
      <el-button type="primary" @click="handleTable('export')">导出</el-button>
    </template>
  </Search>
</template>

<script>
import Search from "./Search.vue";

export default {
  components: {
    Search,
  },
  data() {
    return {
      parent: "Father",
    };
  },
  methods: {
    // 设计思路：同一类型的操作统一入口，内部再分发到具体的方法调用
    handleTable(operationType) {
      this.$console(operationType); // 全局方法
      // option 1 使用switch.case 分别调用
      switch (operationType) {
        case "create":
          break;
        case "edit":
          break;
        case "delete":
          break;
        case "export":
          break;
        case "search":
          break;
        case "reset":
          break;
      }
      // option 2 隐晦调用
      this[operationType]();
    },
    create() {},
    edit() {},
    delete() {},
    export() {},
    reset() {},
    search() {},
  },
};
</script>

<style></style>

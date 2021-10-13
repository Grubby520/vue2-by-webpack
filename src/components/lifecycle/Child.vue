<template>
  <div class="child">
    <!-- {{ name }} -->
    <ul>
      <li v-for="(item, index) in list" :key="item.id">
        <!-- 通信方式 $attrs (包含父作用域 Parent 不作为prop被识别的 attribute 绑定 )  -->
        <Grandchild :label="item.label" v-bind="$attrs" />
        <span @click="del(index)" style="margin-left: 10px; color: red">X</span>
      </li>
    </ul>
    <div>
      <el-button type="primary" @click="getParent">Click Me</el-button>
      <el-button type="primary" @click="changeProp">Prop Change</el-button>
    </div>
  </div>
</template>

<script>
import Grandchild from "./Grandchild.vue";
export default {
  name: "Child",
  // 手动指定 attribute 传递哪些给哪些元素。 class 和 style 不受任何影响；
  inheritAttrs: true,
  components: {
    Grandchild,
  },
  /**
   * soure code (props.js)
   * 断言类型 /^(String|Number|Boolean|Function|Symbol|BigInt|Array|Object)$/
   * 写法多种(不能混合使用)
   *  1.数组，定义名字 ['list']
   *  2.对象，定义名字和类型 {list: String}
   *  3.对象+配置项 定义名称和配置对象 {list: {type: String, required: true, default: ''}}
   * 注意点：源码最终都会转成 第3种 形式
   */
  props: ["list", "baseValue"],
  data() {
    return {
      name: "child",
    };
  },
  methods: {
    del(index) {
      // this.$emit("on-del", index); // good
      // this.$emit("onDel", index); // bad
      // 自定义事件 派发事件对象 事件名：推荐始终使用 kebab-case
      this.$emit("del", index);
    },
    changeProp() {
      /* prop 单向数据流
        1.原始数据类型 不会改变父组件
        2.数组或对象类型的 prop，子组件的修改会影响到父组件的状态
      */
      // this.baseValue = "new value";
    },
    /**
     * 通信方式
     * 通过实例的 $parent，它是对父组件实例的引用
     * 获取data，methods等等
     * ps: 不太推荐
     * source code: vue实例有3个 property, 存放的是Vue实例: $parent, $children, $root
     */
    getParent() {
      this.$console(this.$parent);
      this.$console(this.$parent.$parent); // 链式引用
      this.$console(this.$children);
      this.$console(this.$root); // 根实例
      // vue实例自身的 property
      this.$console(this); // vue实例对象(全貌)
      // 封装组件，通信的时候可以用到
      this.$console(this.$attrs);
      this.$console(this.$listeners);
      // 获取 ref 组件实例
      this.$console(this.$refs);
      // 写 render 时用到
      this.$console(this.$createElement);
      // 获取 DOM 节点对象
      this.$console(this.$el);
      // 剩余不太能用到的
      this.$console(this.$slots); // 获取 插槽Prop
      this.$console(this.$data); // 代理 data 对象property 的访问
      this.$console(this.$$scopedSlots); // 访问作用域插槽 写渲染函数才有用
      this.$console(this.$isServer); // 是否是ssr 服务端渲染
      this.$console(this.$options); // vue实例的初始化选项，没用过...
    },
  },
  beforeCreate() {
    console.log("child beforeCreate");
  },
  created() {
    console.log("child created");
  },
  beforeMount() {
    console.log("child beforeMount");
  },
  mounted() {
    console.log("child mounted");
  },
  beforeUpdate() {
    console.log("child beforeUpdate");
  },
  updated() {
    console.log("child updated");
  },
  beforeDestroy() {
    console.log("child beforeDestroy");
  },
  destroyed() {
    console.log("child destroyed");
  },
};
</script>

<style></style>

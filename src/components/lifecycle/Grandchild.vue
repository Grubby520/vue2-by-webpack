<template>
  <span>{{ label }}</span>
</template>

<script>
export default {
  name: "Grandchild",
  inheritAttrs: false,
  props: {
    label: {
      required: true,
      default: "",
    },
  },
  // 通信方式 `list` 是一个Object，它是响应式的
  inject: ["list"],
  beforeCreate() {
    // 这里还拿不到 this
    console.log(`Grandchild beforeCreate`);
  },
  created() {
    console.log(`Grandchild ${this.label} created`);
  },
  beforeMount() {
    console.log(`Grandchild ${this.label} beforeMount`);
  },
  mounted() {
    console.log(`Grandchild ${this.label} mounted`);
    // 通信方法 孙子组件接收到了祖父组件传递的 data property
    this.$console(this.$attrs); // {staticValue: "static value"}
    this.$console(this.list);
    // 反过来修改 inject，不可行
  },
  beforeUpdate() {
    console.log(`Grandchild ${this.label} beforeUpdate`);
  },
  updated() {
    console.log(`Grandchild ${this.label} updated`);
  },
  beforeDestroy() {
    console.log(`Grandchild ${this.label} beforeDestroy`);
  },
  destroyed() {
    console.log(`Grandchild ${this.label} destroyed`);
  },
};
</script>

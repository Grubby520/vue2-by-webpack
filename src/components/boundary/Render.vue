<script>
export default {
  functional: true, // 函数式组件
  name: "Render",
  /** render函数写着头痛 - 放弃
   * createElement(
      tag?: string | Class<Component> | Function | Object,
      data?: VNodeData,
      children?: any,
   * )
   */
  // 函数式组件中，data会失效，无状态，没有生命周期，没有响应式
  data() {
    return {
      showFoo: true,
    };
  },
  // 只能接收prop (其他任何玩意儿都会失效)
  props: {
    showBar: {
      type: Boolean,
      default: true,
    },
  },
  render(h, ctx) {
    /**
      props：提供所有 prop 的对象
      children：VNode 子节点的数组
      slots：一个函数，返回了包含所有插槽的对象
      scopedSlots：(2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
      data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
      parent：对父组件的引用
      listeners：(2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名。
      injections：(2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的 property。
     */
    // console.log(ctx);
    return h(
      "div",
      {
        class: {
          foo: true,
          bar: ctx.props.showBar,
        },
        style: {
          "font-size": "16px",
        },
      },
      [
        "div元素 start",
        h("p", { class: { "warining-text": true } }, "这是P元素"),
        "div元素 end",
      ]
    );
  },
};
</script>

<style lang="scss" scoped>
.foo {
  color: blue;
  &.bar {
    color: #e6a23c;
  }
}
.warining-text {
  color: red;
}
</style>

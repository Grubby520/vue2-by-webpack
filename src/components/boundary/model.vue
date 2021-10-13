<template>
  <div class="v-model">
    <!-- 组件自定义v-model
      我的理解，通常情况下是用于form表单元素,如 input, checkbox, radio, select, textarea...
      这里，我们演示一下不用在表单元素上
     -->
    <el-button type="primary" @click="btnClick">update</el-button>
  </div>
</template>

<script>
/**
 * 通信方式 EventBus
 * 1.实现 Model 和 Sync 两个兄弟组件之间的通信
 */
import { EventBus } from "@share/event-bus";

export default {
  name: "v-model",
  /**
   * 观其全貌，v-model 并没有违背 单向数据流；
   * 为复杂的业务场景提供了一种可选的双向数据绑定的操作
   * 父传子，子更新父
   */
  // 1.定义一个model
  model: {
    prop: "checked", // 指定哪一个 prop
    event: "change", // 指定自定义事件的事件名 $emit eventName
  },
  props: {
    // 2.model.prop 指定的 prop
    checked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    btnClick() {
      // 3.model.event 指定的 eventName
      this.$emit("change", !this.checked);
      // 通信 2.兄弟组件 派发一个自定义的事件（Web APIs dispatchEvent 不是一回事）
      this.handleEvent();
    },
    handleEvent() {
      EventBus.$emit("model-emitter", this.checked);
    },
  },
};
</script>

<style></style>

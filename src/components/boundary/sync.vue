<template>
  <div class="sync">
    <el-input v-model="value" placeholder=""></el-input>
    <el-button type="primary" @click="btnClick">Update</el-button>
  </div>
</template>

<script>
import { EventBus } from "@share/event-bus";

export default {
  name: "sync",
  props: {
    name: [String, Number], // 这是含有 .sync 修饰符的 prop
  },
  data() {
    return {
      value: this.name, // 父先 created,子能拿到 this.name
    };
  },
  mounted() {
    // 3.另一个兄弟组件接收事件 mounted钩子函数里 $on监听自定义事件
    EventBus.$on("model-emitter", this.modelUpdate);
    // better way, 结合 $once 实例方法，监听hook钩子，且只会触发一次
    // source code: 调用 $on(event, on), on内部调用 $off, 并执行回调 fn.apply(vm, arguments)
    this.$once("hook:beforeDestroy", () => {
      console.log("hook:beforeDestroy");
      EventBus.$off();
    });
    // source code
    // function callHook(vm, hook) {
    //   if (vm._hasHookEvent) {
    //     vm.$emit("hook:" + hook); // vm 实例只能通过 $on, $once 获取hook函数
    //   }
    // }
  },
  methods: {
    btnClick() {
      // 派发事件 格式：`update:propName`
      this.$emit("update:name", this.value);
    },
    modelUpdate(data) {
      console.log(data);
    },
  },
  beforeDestroy() {
    // 4.vm.$off( [event, callback] ) 移除自定义事件监听器
    // EventBus.$off(); // 不指定参数，移除所有的事件监听器（包括事件和所有回调）
    // EventBus.$off("model-emitter", this.modelUpdate);
  },
};
</script>

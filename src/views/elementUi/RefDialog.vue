<!--
  使用 refs，直接调用内部的 show 方法；
  内部使用语法糖 .sync
  内部关闭 内部变量 visible 控制
-->
<template>
  <el-dialog title="" :visible.sync="visible" width="600px">
    <div></div>
    <div slot="footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="close">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "RefDialog",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
  },
};
</script>

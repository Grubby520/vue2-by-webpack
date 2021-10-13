<!--
  外部使用语法糖 .sync
  内部关闭使用语法糖 $emit('update:propertyName', false)
  注意：
  点击 x 按钮关闭，是el-dialog 内部的行为，只会emit before-close 事件，故要特别处理；
-->
<template>
  <el-dialog title="" :visible="visible" width="600px" :before-close="close">
    <div></div>
    <div slot="footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="close">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "SyncDialog",
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

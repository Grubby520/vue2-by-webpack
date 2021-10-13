<template>
  <div class="element-ui">
    <h3>element-ui</h3>
    <div>
      <el-button type="primary" @click="btnClick('SyncDialog')"
        >show dialog</el-button
      >
      <el-button type="primary" @click="btnClick('RefDialog')"
        >show dialog</el-button
      >
      <el-button type="primary" @click="btnClick('message')"
        >show message</el-button
      >
      <el-button type="primary" @click="btnClick('oneMessage')"
        >show message only one event queue</el-button
      >
    </div>
    <div>
      <h5>依赖关系：computed property, method, data property</h5>
      <el-button v-if="computedA">computedA</el-button>
      <el-button v-if="dataA">dataA</el-button>
      <el-button v-if="methodA()">methodA</el-button>
      <span> | </span>
      <el-button @click="dataA = !dataA">trigger dataA</el-button>
    </div>
    <div>
      <h5>form dialog</h5>
      <el-button type="primary" @click="formDialogVisible = true"
        >show form dialog</el-button
      >
    </div>
    <!-- Dialog -->
    <SyncDialog :visible.sync="dialogVisible" />
    <RefDialog ref="RefDialog" />
    <FormDialog :visible.sync="formDialogVisible" />
  </div>
</template>

<script>
import SyncDialog from "./elementUi/SyncDialog";
import RefDialog from "./elementUi/RefDialog";
import FormDialog from "./elementUi/FormDialog";
export default {
  name: "ElementUi",
  components: {
    SyncDialog,
    RefDialog,
    FormDialog,
  },
  computed: {
    computedA() {
      return this.dataA;
    },
  },
  data() {
    return {
      dialogVisible: false,
      dataA: true,
      formDialogVisible: false,
    };
  },
  methods: {
    btnClick(type) {
      switch (type) {
        case "SyncDialog":
          this.dialogVisible = true;
          break;
        case "RefDialog":
          this.$refs.RefDialog.show();
          break;
        case "message":
          /**
           * 每一次点击，触发watcher update，添加相应的微任务，点击N次，就会执行N次微任务
           * 每次点击就是一次事件循环
           */
          this.$message.success("i am fine!");
          break;
        case "oneMessage":
          /**
           * 一个事件循环里，执行三次$message,无法正确获取DOM高度差，故会出现重叠问题；
           * 加一个setTimeout，分3次宏任务，每次执行就是一次事件循环；
           * 应用场景：
           * 批量操作的接口，返回一个错误集合，分别展示每一项错误信息。
           */
          [1, 2, 3].forEach((item) => {
            // this.$message.success("i am fine!");
            setTimeout(() => {
              this.$message.success("i am fine!");
            });
          });
          // $message 部分源码 item.$el.offsetHeight 为0，DOM没渲染结果，导致高度计算有误。
          // {
          //   instance.$mount();
          //   document.body.appendChild(instance.$el);
          //   let verticalOffset = options.offset || 20;
          //   instances.forEach((item) => {
          //     verticalOffset += item.$el.offsetHeight + 16;
          //   });
          //   instance.verticalOffset = verticalOffset;
          //   instance.visible = true;
          //   instance.$el.style.zIndex = PopupManager.nextZIndex();
          //   instances.push(instance);
          //   return instance;
          // }
          break;
        default:
          console.warn("'type' catch error!");
      }
    },
    methodA() {
      return !this.dataA;
    },
  },
};
</script>

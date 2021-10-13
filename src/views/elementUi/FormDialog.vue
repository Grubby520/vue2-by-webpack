<template>
  <!-- 
  统一出口或者出口
  1. 重置表单数据（form表单，其他数据），放在 关闭弹出框的回调函数 里；而不用关注弹出框是怎么关闭的（点击取消，点击X，点击提交。。。）
 -->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="close"
    @closed="resetForm"
    width="600px"
  >
    <el-form :model="form" :rules="rules" label-width="110px" ref="form">
      <el-form-item label="审核结果" prop="isPass">
        <el-radio-group v-model="form.isPass" @change="handleIsPassChange">
          <el-radio :label="true">通过</el-radio>
          <el-radio :label="false">拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="审核意见"
        prop="remarks"
        class="remarks-item"
        :class="{ 'is-required': form.isPass === false }"
      >
        <el-input
          type="textarea"
          rows="3"
          v-model="form.remarks"
          maxlength="200"
          show-word-limit
        >
        </el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <!-- 
        canSubmit 2个作用：
        1. 防止重复提交；
        2. loading效果；
       -->
      <el-button
        type="primary"
        :disabled="!canSubmit"
        :loading="!canSubmit"
        @click="onSubmit"
      >
        提 交</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
// import { SRM_API } from "supplierCollaborationModuleApi/index";
export default {
  name: "AuditDialog",
  props: ["supplementaryDeductionId", "visible"],
  data() {
    const vm = this;
    const Validator = {
      remarks(rule, value, cb) {
        if (vm.form.isPass === false) {
          if (!value) {
            cb(new Error("请输入审核意见"));
            // 避免输入空格，换行符...
          } else if (!value.trim().length) {
            cb(new Error("无效值，请重新输入"));
          }
        }
        cb();
      },
    };
    return {
      title: "审核",
      form: {
        isPass: undefined,
        remarks: "",
        supplementaryDeductionId: undefined,
      },
      rules: {
        isPass: [
          {
            required: true,
            message: "请选择审核结果",
            trigger: "change",
          },
        ],
        remarks: [
          {
            validator: Validator.remarks,
          },
        ],
      },
      canSubmit: true,
    };
  },
  methods: {
    handleIsPassChange(value) {
      if (value) {
        /**
         * 无论业务多么复杂，form上暴露了校验相关的方法
         * 1. resetFields() 重置并清除校验
         * 2. clearValidate() 清除（某个）校验
         * 3. xxx 校验（某个）字段
         */
        this.$refs.form.clearValidate("remarks");
      }
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.canSubmit = false;
          // SRM_API.postSupplementaryDeductAudit(this.form)
          //   .then((res) => {
          //     if (res.success) {
          this.$message.success("审核提交成功！");
          this.$emit("onSubmited");
          this.close();
          //   } else {
          //     this.canSubmit = true;
          //   }
          // })
          // .catch(() => {
          //   this.canSubmit = true;
          // });
        }
      });
    },
    close() {
      this.$emit("update:visible", false);
    },
    resetForm() {
      this.canSubmit = true;
      this.$refs.form.resetFields();
    },
  },
  watch: {
    visible(bool) {
      if (bool) {
        this.form.supplementaryDeductionId = this.supplementaryDeductionId;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
/deep/ .remarks-item {
  &.is-required {
    .el-form-item__label::after {
      content: "*";
    }
  }
  .el-form-item__label::after {
    content: "";
    margin-left: 11px;
  }
}
</style>

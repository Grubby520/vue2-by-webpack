<template>
  <div>
    <sl-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="110px"
      :rules="rules"
    >
      <sl-form-item label="活动名称" prop="name">
        <sl-input v-model="ruleForm.name"></sl-input>
      </sl-form-item>
      <sl-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </sl-form-item>
    </sl-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
        }
      });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    },
  },
};
</script>

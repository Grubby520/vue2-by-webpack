<template>
  <div class="search">
    <p>i am search component</p>
    <!-- 1.不具名插槽，接收不具名的slot -->
    <!-- 2.不具名插槽，如果父级slot为空，还可以设置一个默认内容 -->
    <slot>slot为空，后背内容才会显示</slot>
    <!-- 3.具名插槽，带有特殊的 attribute：name -->
    <!-- 实现表头搜索功能 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="输入框" prop="supplierName">
            <el-input v-model="form.supplierName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="下拉框" prop="productId">
            <el-select v-model="form.productId" multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="table-header-operations clearfix">
      <div class="left">
        <!-- 父组件自定义的左侧按钮操作项 -->
        <!-- 4. 插槽Prop 作用域插槽 -->
        <slot name="buttonsLeft" v-bind:form="form"></slot>
      </div>
      <!-- 子组件内部默认配置的按钮 -->
      <el-button type="primary" @click="$emit('search')">查询</el-button>
      <el-button type="info" @click="$emit('reset')">重置</el-button>
      <!-- 父组件自定义的右侧按钮操作项 -->
      <slot name="buttonsRight"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      form: {
        supplierName: "",
        productId: [],
      },
      options: [],
    };
  },
  created() {
    this.form.productId = [0];
  },
  mounted() {
    this.getOptions();
  },
  methods: {
    getOptions() {
      setTimeout(() => {
        this.options = [
          {
            id: 0,
            label: "lili",
          },
        ];
      }, 500);
    },
  },
};
</script>

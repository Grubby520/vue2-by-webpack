<template>
  <div class="boundary-m-container">
    <h4>自定义组件的v-model</h4>
    <p>{{ checked }}</p>
    <Model v-model="checked" />

    <el-divider></el-divider>

    <h4>sync 修饰符</h4>
    <p>{{ name }}</p>
    <!-- 父组件 prop带上sync修饰符 -->
    <Sync :name.sync="name" />

    <el-divider></el-divider>
    <h4>render & jsx</h4>
    <el-button type="primary" @click="showBar = !showBar"
      >change prop</el-button
    >
    <Render :showBar="showBar" />
    <Jsx class="mt-l" />

    <el-divider></el-divider>
    <h4>Directives</h4>
    <el-input
      v-model="integer"
      v-slFormatNumber="{ type: 'integer' }"
      placeholder="我只能输入正整数"
      style="width: 250px"
    ></el-input>
    <p>{{ integer }}</p>

    <el-input
      v-model="decimals"
      v-slFormatNumber="{ type: 'decimals' }"
      placeholder="我只能输入小数"
      style="width: 250px"
    ></el-input>
    <p>{{ decimals }}</p>

    <el-divider></el-divider>
    <h4>Filters</h4>
    <p>{{ totalPrice | SlMoneyFormatter }}</p>
    <p>{{ 432345 | SlMoneyFormatter }}</p>

    <el-divider></el-divider>
    <h4>Vuex</h4>
    <Vuex />
  </div>
</template>

<script>
import Model from "./model.vue";
import Sync from "./sync.vue";
import Render from "./Render.vue";
import Jsx from "./Jsx.vue";
import Vuex from "./Vuex.vue";
export default {
  components: {
    Model,
    Sync,
    Render,
    Jsx,
    Vuex,
  },
  data() {
    return {
      checked: true,
      name: "lili",
      showBar: false,
      integer: "",
      decimals: "",
      totalPrice: 1234567,
    };
  },
};
</script>

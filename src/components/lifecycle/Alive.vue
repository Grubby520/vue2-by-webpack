<!-- 
  内置组件 keep-alive 缓存组件状态 
-->
<template>
  <div id="dynamic-component-demo">
    <el-divider></el-divider>
    <h3>dynamic component</h3>
    <p class="mb-m">keep-alive + is attribute</p>

    <button
      v-for="tab in tabs"
      v-bind:key="tab"
      v-bind:class="['tab-button', { active: currentTab === tab }]"
      v-on:click="currentTab = tab"
    >
      {{ tab }}
    </button>

    <keep-alive :exclude="'Archive'">
      <!-- 搭配内置组件 component, 动态组件 -->
      <!-- 特殊的 attribute is -->
      <component v-bind:is="currentTab" class="tab"></component>
    </keep-alive>
  </div>
</template>

<script>
/**
 * 生命周期及其加载顺序
 * 使用内置的 keep-alive，多2个生命周期 activated, deactivated
 *
 * 1.父子组件
 * 离开的：deactivated
 * 进入的：activated(子) actviated(父)
 *
 */
import Archive from "./Archive.vue";
import Posts from "./Posts.vue";

export default {
  components: {
    Archive,
    Posts,
  },
  data() {
    return {
      currentTab: "Archive",
      tabs: ["Posts", "Archive"],
    };
  },
  mounted() {
    console.log("Alive Componet", this);
  },
};
</script>

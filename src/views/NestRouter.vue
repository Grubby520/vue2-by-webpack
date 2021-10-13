<template>
  <div class="nestRouter-c">
    <Index />
    <el-divider></el-divider>
    <router-view></router-view>
  </div>
</template>

<script>
import Index from "../components/nestRouter";
export default {
  name: "NestRouter",
  components: {
    Index,
  },
};
</script>

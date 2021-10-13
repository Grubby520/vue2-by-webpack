<template>
  <div class="boundary-post">
    <p>boundary/{{ id }}</p>
  </div>
</template>

<script>
export default {
  name: "Detail",
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  mounted() {
    console.log("Vue Router $router：", this.$router);
    console.log("Vue Router $route：", this.$route);
    // Router 实例的三个属性
    console.log(this.$router.app);
    console.log(this.$router.mode);
    console.log(this.$router.currentRoute);

    // Router 实例的方法 .resolve
    const resolved = this.$router.resolve({ path: "/nestRouter" });
    console.log(resolved);

    // Router 实例的方法 .getRoutes
    const RouteRecord = this.$router.getRoutes();
    console.log(RouteRecord);
  },
  // 复用组件时，可以使用【组件配置选项】
  beforeRouteEnter(to, from, next) {
    console.log("* component beforeRouteEnter");
    // 不！能！获取组件实例 `this`
    next((vm) => {
      // 回调入参 vm, 获取组件实例
      console.log(vm);
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log("* component beforeRouteUpdate");
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("* component beforeRouteLeave");
    next();
  },
  // 也可以监听 $route
  watch: {
    $route(to, from) {
      console.log(to);
    },
  },
};
</script>

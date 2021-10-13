<template>
  <div>
    <input type="text" v-model="value" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "default",
    };
  },
  activated() {
    console.log("PostsChild activated");
  },
  deactivated() {
    console.log("PostsChild deactivated");
  },
  beforeDestroy() {
    console.log("PostsChild beforeDestroy");
  },
  destroyed() {
    console.log("PostsChild destroyed");
  },
};
</script>

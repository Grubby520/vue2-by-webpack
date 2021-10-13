<template>
  <div class="post-c">
    <p>/nestRouter</p>
    <el-button type="primary" @click="jump">show post</el-button>
  </div>
</template>

<script>
export default {
  name: "Index",
  methods: {
    jump() {
      const id = Math.ceil(Math.random() * 100) + 10;
      // 它 返回一个 Promise
      this.$router.push(
        { path: `/nestRouter/${id}` },
        () => {
          console.log("onComplete");
        },
        () => {
          console.log("onAbort");
        }
      );
      // 故还可以这样写
      // this.$router
      //   .push({ path: `/nestRouter/${id}` })
      //   .then(() => {})
      //   .catch(() => {});
    },
  },
};
</script>

<template>
  <div>
    <p>Archive component</p>
    <p :style="style">Archive component</p>
    <p>
      <el-button type="primary" @click="updateCss">update css</el-button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      style: { color: "blue" },
    };
  },
  methods: {
    updateCss() {
      this.style.color = "red";
    },
  },
  activated() {
    console.log("Archive activated");
  },
  deactivated() {
    console.log("Archive deactivated");
  },
  beforeDestroy() {
    console.log("Archive beforeDestroy");
  },
  destroyed() {
    console.log("Archive destroyed");
  },
};
</script>

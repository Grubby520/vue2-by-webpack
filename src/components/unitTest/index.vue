<template>
  <div class="unit-test-c">
    <p>
      <el-button type="primary" @click="onIncrement">increment</el-button>
      <el-button @click="onReduce">reduce</el-button>
    </p>
    <p>value: {{ count }}</p>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    onIncrement() {
      this.count++;
    },
    onReduce() {
      this.count--;
    },
  },
};
</script>

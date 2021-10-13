<!--  1.会被 webpack vue-template-compiler 模板解析
      2.其他 loader 如 file-loader, url-loader 等 解析
-->
<template>
  <div class="home-c">
    <p>响应式原理</p>
    <el-button type="primary" @click="myClick('watcher')"
      >trigger watcher</el-button
    >
  </div>
</template>
<script>
export default {
  name: "Reactive",
  computed: {
    show() {
      return this.arr.length + this.objLen;
    },
    objLen() {
      return Object.keys(this.obj).length;
    },
    count() {
      return this.a + this.b;
    },
  },
  data() {
    return {
      a: 1,
      b: 2,
      arr: [
        {
          label: "who",
          value: 1,
        },
      ],
      obj: {
        a: "a",
        b: {
          "a-1": "a-1",
        },
        arr: [1, 2, 3],
      },
    };
  },
  methods: {
    myClick(type) {
      if (type === "watcher") {
        this.arr.push(4);
        this.obj.b = [1];
      }
    },
  },
  watch: {
    arr(val, oldVal) {
      console.log(val, oldVal);
    },
    "obj.b"(val, oldVal) {
      console.log(val, oldVal);
    },
  },
};
</script>

<!-- * 会被 webpack 当做一个 *.scss 文件处理 -->
<style lang="scss" scoped>
.home {
  font-size: 16px;
}
</style>

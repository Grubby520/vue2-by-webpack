<template>
  <div class="posts-tab">
    <ul class="posts-sidebar">
      <li
        v-for="post in posts"
        v-bind:key="post.id"
        v-bind:class="{ selected: post === selectedPost }"
        v-on:click="selectedPost = post"
      >
        {{ post.title }}
      </li>
    </ul>

    <div class="selected-post-container">
      <div v-if="selectedPost" class="selected-post">
        <h3>{{ selectedPost.title }}</h3>
        <div v-html="selectedPost.content"></div>
      </div>
      <strong v-else> Click on a blog title to the left to view it. </strong>
    </div>

    <div>
      <PostsChild />
    </div>
  </div>
</template>

<script>
import PostsChild from "./PostsChild.vue";
export default {
  components: {
    PostsChild,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "Cat Ipsum",
          content: "<p>Dont wait for the storm to pass</p>",
        },
        {
          id: 2,
          title: "Hipster Ipsum",
          content: "<p>Bushwick blue bottle scenester helvetica ugh</p>",
        },
        {
          id: 3,
          title: "Cupcake Ipsum",
          content: "<p>Icing dessert</p>",
        },
      ],
      selectedPost: null,
    };
  },
  activated() {
    console.log("Posts activated");
  },
  deactivated() {
    console.log("Posts deactivated");
  },
  beforeDestroy() {
    console.log("Posts beforeDestroy");
  },
  destroyed() {
    console.log("Posts destroyed");
  },
};
</script>

<script>
import Render from "./Render.vue";

export default {
  name: "Jsx",
  data() {
    return {
      show: true,
    };
  },
  render(h) {
    return <Render showBar={this.data}></Render>;
  },
};
</script>

<template>
  <mindmap ref="mindMapRef" class="container" v-model="data" :controlMoveDirection="true" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { getData } from "./api/mxs";
import Mindmap from "./components/MindMap";
export default defineComponent({
  name: "App",
  components: {
    Mindmap,
  },
  data() {
    return {
      data: []
    }
  },
  mounted() {
    getData().then(res => {
      this.data = [res.data];
    })
  }
});
</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  outline: none;
  overflow: hidden;
  user-select: none;
}

.container {
  width: 100vw;
  height: 100vh;
}
</style>

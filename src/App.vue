<template>
  <div class="container">
    <mindmap ref="mindMapRef" :model-value="modelValue">
    </mindmap>
  </div>
</template>
<script lang="ts">
import Mindmap from "./components/MindMap";
import { data } from './learn';

export default {
  name: "App",
  components: {
    Mindmap,
  },
  data() {
    return {
      modelValue: data
    }
  }
};
</script>
<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: #f8f9fa;
}
</style>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>

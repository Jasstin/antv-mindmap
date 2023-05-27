<template>
  <mindmap ref="mindMapRef" class="container" v-model="data" :sharp-corner="true" />
</template>
<script lang="ts">
import learn from "./learn.json";
import Mindmap from "./components/MindMap";
import './static/index.scss';
export default {
  name: "App",
  components: {
    Mindmap
  },
  data() {
    return {
      data: learn,
    }
  },
  mounted() {
    this.initMode();
  },
  methods: {
    initMode() {
      const mindmapRef = this.$refs.mindMapRef;
      const graph = mindmapRef.tree.tree;
      graph.addBehaviors(["zoom-canvas", "drag-canvas", {
        type: "mobile-behavior",
        onClick: (name, node, clickTime) => {
          console.log(`触发点击事件`, node, clickTime);
        },
        onDragEnd: () => {
          console.log(`拖拽事件结束`);
        }
      }], 'default'); // 添加拖拽树与缩放树的功能
    }
  }
};
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

.toolbar {
  align-items: center;
  border-radius: 10px;
  display: flex;
  height: 40px;
  justify-content: space-evenly;
  padding: 4px;
  -webkit-user-select: none;
  user-select: none;
  z-index: 2;
  border: 1px solid rgba(0, 0, 0, .08);
  box-shadow: 0 2px 20px rgba(0, 0, 0, .05);
  bottom: 20px;
  position: absolute;
}

.top-bar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  position: fixed;
  top: 0;
  width: 100%;
  background: #f4f4f4;
  border-radius: 0;

  li.active,
  li:hover {
    color: #ff4444;
    cursor: pointer;
  }
}
</style>

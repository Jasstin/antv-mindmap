<template>
  <div>
    <ul class="action-bar top-bar">
      <li :class="{ active: mode === 'default' }" @click="changeMode('default')">阅读</li>
      <li :class="{ active: mode === 'edit' }" @click="changeMode('edit')">编辑</li>
      <li :class="{ active: mode === 'connect' }" @click="changeMode('connect')">联系</li>
    </ul>
  </div>
  <mindmap ref="mindMapRef" class="container" v-model="data" :mindmap="true" :sharp-corner="true" />
  <ul class="action-bar shadow bottom-right bgblur thin-border" ref="toolbarRef" style="position:fixed">
    <li class="button max480"><img src="./static/imgs/help.svg"></li>
    <li class="button" code="fitCenter"><img src="./static/imgs/fit.svg"></li>
    <li class="button max480" code="zoomOut"><img src="./static/imgs/zoomout.svg"></li>
    <li class="button max480" code="zoomIn"><img src="./static/imgs/zoomin.svg"></li>
  </ul>
  <div class="shadow bounceIn thin-border bgblur" ref="nodeMenuRef" style="display:none">
    <ul>
      <li code="addChild">添加子节点</li>
      <li code="delete">删除节点</li>
      <li code="collapse">折叠节点</li>
      <li code="expand">展开节点</li>
    </ul>
  </div>
  <div class="shadow bounceIn thin-border bgblur" ref="canvasMenuRef" style="display:none">
    <ul>
      <li code="zoomOut">放大</li>
      <li code="zoomIn">缩小</li>
      <li code="fitCenter">缩放到合适位置</li>
      <li code="downloadPage">导出图片</li>
      <li code="exportFile">导出文件</li>
    </ul>
  </div>
  <div class="shadow bounceIn thin-border bgblur" ref="edgeMenuRef" style="display:none">
    <ul>
      <li code="changeEdge">切换为“特殊”标签</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import learn from "./learn.json";
import Mindmap from "./components/MindMap";
import './static/index.scss';
import { Menu, ToolBar, Minimap } from "@antv/g6";
export default defineComponent({
  name: "App",
  components: {
    Mindmap,
  },
  data() {
    return {
      data: [],
      mode: 'default'
    }
  },
  mounted() {
    this.data = learn;
    this.addToolbar();
    this.addNodeMenu();
    this.addCreateEdge();
    this.addMindmap();
  },
  methods: {
    addNodeMenu() {
      const nodeMenuRef = this.$refs.nodeMenuRef;
      const canvasMenuRef = this.$refs.canvasMenuRef;
      const edgeMenuRef = this.$refs.edgeMenuRef;
      const mindmapRef = this.$refs.mindMapRef;
      const graph = mindmapRef.tree.tree;
      const toolbar = new Menu({
        className: nodeMenuRef.className,
        shouldBegin: function (e) {
          const isCanvas = e?.target.isCanvas && e.target.isCanvas();
          const isEdge = e?.item?.get('type') === 'edge';
          console.log('当前模式', graph.getCurrentMode());
          const mode = graph.getCurrentMode();
          if (mode === 'default' && !isCanvas) return false; // 阅读模式不支持右键
          if (mode === 'connect' && !isEdge) return false; // 联系模式只支持连线和切换线条
          return true
        },
        getContent: (e) => {
          const isCanvas = e?.target.isCanvas && e.target.isCanvas();
          const isEdge = e?.item?.get('type') === 'edge';
          const Dom = isCanvas ? canvasMenuRef.cloneNode(true) : isEdge ? edgeMenuRef.cloneNode(true) : nodeMenuRef.cloneNode(true)
          const mode = graph.getCurrentMode();
          if (mode === 'default' && !isCanvas) return null; // 阅读模式不支持右键
          if (mode === 'connect' && !isEdge) return; // 联系模式只支持连线和切换线条
          if (!isCanvas && !isEdge) {
            const item = e?.item;
            const expandDom = Dom?.querySelector('[code="expand"]');
            const collapseDom = Dom?.querySelector('[code="collapse"]');
            if (!item?.getModel().children?.length && !item?.getModel()._children?.length) {
              expandDom.style.display = "none";
              collapseDom.style.display = "none";
            } else if (item.getModel().collapse) {
              expandDom.style.display = "";
              collapseDom.style.display = "none";
            } else {
              collapseDom.style.display = "";
              expandDom.style.display = "none";
            }
          }

          Dom.id = 'menu'
          Dom.style.display = 'block'
          return Dom
        },
        itemTypes: ['node', 'canvas', 'edge'],
        handleMenuClick: (target, item) => {
          const code = target.getAttribute('code');
          this.handleClickCode(code, item);
        }
      });
      graph.addPlugin(toolbar);
    },
    addToolbar() {
      const toolbarRef = this.$refs.toolbarRef;
      const mindmapRef = this.$refs.mindMapRef;
      const graph = mindmapRef.tree.tree;
      const toolbar = new ToolBar({
        className: toolbarRef.className,
        getContent: () => toolbarRef,
        handleClick: this.handleClickCode
      });
      graph.addPlugin(toolbar);
      this.toolbar = toolbar;
    },
    handleClickCode(code, node?) {
      const mindmapRef = this.$refs.mindMapRef;
      const graph = mindmapRef.tree.tree;
      if (code === 'fitCenter') {
        // 在渲染和动画完成后调用
        graph.fitCenter();
        return mindmapRef.fitCenter();
      } else if (code === 'zoomIn') {
        return mindmapRef.zoomIn();
      } else if (code === 'zoomOut') {
        return mindmapRef.zoomOut();
      } else if (code === 'exportFile') {
        console.log(graph.save());
      } else if (code === 'addChild') {
        return mindmapRef.add(node.get("id"), { title: '新建模型' });
      } else if (code === 'delete') {
        return mindmapRef.deleteNode(node.get('id'))
      } else if (code === 'collapse') {
        return mindmapRef.collapse(node.get('id'))
      } else if (code === 'expand') {
        return mindmapRef.expand(node.get('id'))
      } else if (code === 'changeEdge') {
        const edge = node;
        const model = edge.getModel();
        model.oriLabel = model.label;
        graph.updateItem(edge, {
          label: '特殊',
          labelCfg: {
            style: {
              fill: '#003a8c',
            },
          },
        });
      }
      this.toolbar.handleDefaultOperator(code, graph);
    },
    addMindmap() {
      const minimap = new Minimap({
        size: [100, 100],
        className: 'mindmap-miniGap',
        viewportClassName: 'mindmap-miniGap-viewPort',
        type: 'delegate',
        delegateStyle: {
          fill: '#003a8c'
        }
      });
      const mindmapRef = this.$refs.mindMapRef;
      const graph = mindmapRef.tree.tree;
      graph.addPlugin(minimap);
    },
    addCreateEdge() {
      const mindmapRef = this.$refs.mindMapRef;
      const graph = mindmapRef.tree.tree;
      graph.addBehaviors({
        type: 'create-edge',
        key: 'shift',
        edgeConfig: {
          type: 'cubic',
          style: {
            stroke: 'red',
            lineWidth: 2,
            lineDash: [5, 10]
            // ... // 其它边样式配置
          },
          // ... // 其它边配置
        },
      }, 'edit')
    },
    changeMode(mode) {
      this.mode = mode
      const mindmapRef = this.$refs.mindMapRef;
      const graph = mindmapRef.tree.tree;
      graph.setMode(mode)
    }
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

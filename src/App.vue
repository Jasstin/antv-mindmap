<template>
  <div>
    <ul class="action-bar top-bar">
      <li v-for="item in modeList" :key="item.value" :class="{ active: mode === item.value }"
        @click="changeMode(item.value)">{{ item.label }}</li>
    </ul>
  </div>
  <mindmap ref="mindMapRef" class="container" v-model="data" :sharp-corner="true" />
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
      <li code="see-detail">在子窗口查看节点视图</li>
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
  <subMindMap v-model="visible" :data="subMindMapData" v-if="visible"></subMindMap>
</template>
<script lang="ts">
import learn from "./learn.json";
import Mindmap from "./components/MindMap";
import './static/index.scss';
import { Menu, ToolBar, Minimap, TreeGraph, Node } from "@antv/g6";
import subMindMap from './page/components/subMindMap.vue';
export default {
  name: "App",
  components: {
    Mindmap,
    subMindMap,
  },
  data() {
    return {
      data: [],
      modeList: [{ label: '阅读', value: 'default' }, { label: '编辑', value: 'edit' }, { label: '联系', value: 'connect' }],
      mode: 'default',
      visible: false,
      subMindMapData: [],
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
            const seeDetailDom = Dom?.querySelector('[code="see-detail"]');
            const collapseDom = Dom?.querySelector('[code="collapse"]');
            if (!item?.getModel().children?.length && !item?.getModel()._children?.length) {
              expandDom.style.display = "none";
              collapseDom.style.display = "none";
              seeDetailDom.style.display = "none";
            } else if (item.getModel().collapse) {
              expandDom.style.display = "";
              seeDetailDom.style.display = "";
              collapseDom.style.display = "none";
            } else {
              collapseDom.style.display = "";
              seeDetailDom.style.display = "none";
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
    handleClickCode(code: string, node: Node) {
      const mindmapRef = this.$refs.mindMapRef as any;
      const graph = mindmapRef.tree.tree;
      switch (code) {
        case 'fitCenter': mindmapRef.fitCenter(); break;
        case 'zoomIn': mindmapRef.zoomIn(); break;
        case 'zoomOut': mindmapRef.zoomOut(); break;
        case 'exportFile': console.log(graph.save()); break;
        case 'addChild': mindmapRef.add(node.get("id"), { title: '新建模型' }); break;
        case 'delete': mindmapRef.deleteNode(node.get('id')); break;
        case 'collapse': mindmapRef.collapse(node.get('id')); break;
        case 'expand': mindmapRef.expand(node.get('id')); break;
        case 'changeEdge': this.changeEdge(node, graph); break;
        case 'see-detail': this.seeDetail(node, graph); break;
        default: this.toolbar.handleDefaultOperator(code, graph);
      }
    },
    changeEdge(node: Node, graph: TreeGraph) {
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
      }, 'connect')
    },
    changeMode(mode) {
      this.mode = mode
      const mindmapRef = this.$refs.mindMapRef;
      const graph = mindmapRef.tree.tree;
      graph.setMode(mode)
    },
    seeDetail(node, graph) {
      const mindmapRef = this.$refs.mindMapRef;
      const data = mindmapRef.parseData(node.getModel(), true);
      this.subMindMapData = data;
      this.visible = true;
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

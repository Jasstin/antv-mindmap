<template>
  <mindmap ref="mindMapRef" class="container" v-model="data" :controlMoveDirection="true" :edit="true" :zoom="true"
    :drag="true" :mindmap="true" />
  <ul class="action-bar shadow bottom-right bgblur thin-border" ref="toolbarRef" style="position:fixed">
    <li class="button max480"><img src="./static/imgs/help.svg"></li>
    <li class="button" code="fitCenter"><img src="./static/imgs/fit.svg"></li>
    <li class="button max480" code="zoomOut"><img src="./static/imgs/zoomout.svg"></li>
    <li class="button max480" code="zoomIn"><img src="./static/imgs/zoomin.svg"></li>
    <li role="img" aria-label="undo" code="undo" tabindex="-1" class="anticon anticon-undo button"><svg
        viewBox="64 64 896 896" focusable="false" data-icon="undo" width="1em" height="1em" fill="currentColor"
        aria-hidden="true">
        <path
          d="M511.4 124C290.5 124.3 112 303 112 523.9c0 128 60.2 242 153.8 315.2l-37.5 48c-4.1 5.3-.3 13 6.3 12.9l167-.8c5.2 0 9-4.9 7.7-9.9L369.8 727a8 8 0 00-14.1-3L315 776.1c-10.2-8-20-16.7-29.3-26a318.64 318.64 0 01-68.6-101.7C200.4 609 192 567.1 192 523.9s8.4-85.1 25.1-124.5c16.1-38.1 39.2-72.3 68.6-101.7 29.4-29.4 63.6-52.5 101.7-68.6C426.9 212.4 468.8 204 512 204s85.1 8.4 124.5 25.1c38.1 16.1 72.3 39.2 101.7 68.6 29.4 29.4 52.5 63.6 68.6 101.7 16.7 39.4 25.1 81.3 25.1 124.5s-8.4 85.1-25.1 124.5a318.64 318.64 0 01-68.6 101.7c-7.5 7.5-15.3 14.5-23.4 21.2a7.93 7.93 0 00-1.2 11.1l39.4 50.5c2.8 3.5 7.9 4.1 11.4 1.3C854.5 760.8 912 649.1 912 523.9c0-221.1-179.4-400.2-400.6-399.9z">
        </path>
      </svg>
    </li>
    <li role="img" aria-label="redo" tabindex="-1" class="anticon anticon-redo button" code="redo"><svg
        viewBox="64 64 896 896" focusable="false" data-icon="redo" width="1em" height="1em" fill="currentColor"
        aria-hidden="true">
        <path
          d="M758.2 839.1C851.8 765.9 912 651.9 912 523.9 912 303 733.5 124.3 512.6 124 291.4 123.7 112 302.8 112 523.9c0 125.2 57.5 236.9 147.6 310.2 3.5 2.8 8.6 2.2 11.4-1.3l39.4-50.5c2.7-3.4 2.1-8.3-1.2-11.1-8.1-6.6-15.9-13.7-23.4-21.2a318.64 318.64 0 01-68.6-101.7C200.4 609 192 567.1 192 523.9s8.4-85.1 25.1-124.5c16.1-38.1 39.2-72.3 68.6-101.7 29.4-29.4 63.6-52.5 101.7-68.6C426.9 212.4 468.8 204 512 204s85.1 8.4 124.5 25.1c38.1 16.1 72.3 39.2 101.7 68.6 29.4 29.4 52.5 63.6 68.6 101.7 16.7 39.4 25.1 81.3 25.1 124.5s-8.4 85.1-25.1 124.5a318.64 318.64 0 01-68.6 101.7c-9.3 9.3-19.1 18-29.3 26L668.2 724a8 8 0 00-14.1 3l-39.6 162.2c-1.2 5 2.6 9.9 7.7 9.9l167 .8c6.7 0 10.5-7.7 6.3-12.9l-37.3-47.9z">
        </path>
      </svg>
    </li>
  </ul>
  <div class="shadow bounceIn thin-border bgblur" ref="nodeMenuRef">
    <ul>
      <li code="addChild">添加子节点</li>
      <li code="delete">删除节点</li>
      <li code="collapse">折叠节点</li>
      <li code="expand">展开节点</li>
    </ul>
  </div>
  <div class="shadow bounceIn thin-border bgblur" ref="canvasMenuRef">
    <ul>
      <li code="zoomOut">放大</li>
      <li code="zoomIn">缩小</li>
      <li code="fitCenter">缩放到合适位置</li>
      <li code="downloadPage">导出图片</li>
      <li code="exportFile">导出文件</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import learn from "./learn.json";
import Mindmap from "./components/MindMap";
import './static/index.scss';
import { Menu, ToolBar } from "@antv/g6";
export default defineComponent({
  name: "App",
  components: {
    Mindmap,
  },
  data() {
    return {
      data: [],
    }
  },
  mounted() {
    this.data = learn;
    this.addToolbar();
    this.addNodeMenu();
  },
  methods: {
    addNodeMenu() {
      const nodeMenuRef = this.$refs.nodeMenuRef;
      const canvasMenuRef = this.$refs.canvasMenuRef;
      const mindmapRef = this.$refs.mindMapRef;
      const graph = mindmapRef.tree.tree;
      const toolbar = new Menu({
        className: nodeMenuRef.className,
        getContent: (e) => {
          const isCanvas = e?.target.isCanvas && e.target.isCanvas();
          const Dom = isCanvas ? canvasMenuRef : nodeMenuRef
          if (!isCanvas) {
            const item = e?.item;
            const expandDom = Dom?.querySelector('[code="expand"]');
            const collapseDom = Dom?.querySelector('[code="collapse"]');
            if (!item?.getModel().children?.length) {
              expandDom.style.display = "none";
              collapseDom.style.display = "none";
            } else if (item.getModel().collapsed) {
              expandDom.style.display = "";
              collapseDom.style.display = "none";
            } else {
              collapseDom.style.display = "";
              expandDom.style.display = "none";
            }
          }

          Dom.id = 'menu'
          return Dom
        },
        itemTypes: ['node', 'canvas'],
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
        return mindmapRef.addChild({
          info: { title: '新添加的埋点' }
        }, node);
      } else if (code === 'delete') {
        graph.removeChild(node.get('id'))
      } else if (code === 'collapse') {
        node.getModel().collapsed = true;
        graph.layout()
      } else if (code === 'expand') {
        node.getModel().collapsed = false;
        graph.layout()
      }
      this.toolbar.handleDefaultOperator(code, graph);
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
</style>

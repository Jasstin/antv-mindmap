<template>
  <div id="mxs-mindmap_container" class="mindmap-container" tabindex="1" />
</template>
<script lang="ts">
import Tree from "./tree/tree";
import { TreeGraph, IGraph } from '@antv/g6';
import resizeObserver from "./utils/resizeObserver";
import throttle from 'lodash/throttle';
import { PropType } from "vue";
import getCenterPointById from "./utils/getCenterPointById";
import { parseData } from "./tree/handleData";
import { getSize } from './elements/nodes/mindmap-node';
import './elements/edges/round-poly';
import './behaviors/double-finger-move';
export default {
  props: {
    // 脑图数据
    modelValue: { required: true, default: [] },
    // 绘制所需的变量
    xGap: { type: Number, default: 16 },
    yGap: { type: Number, default: 5 },
    branch: {
      type: Number,
      default: 2.5,
      validator: (val: number) => val >= 1 && val <= 6,
    },
    branchColor: {
      type: String,
      default: "rgb(19,128,255)"
    },
    direction: { type: String, default: "H" },
    sharpCorner: { type: Boolean, default: true },
    themeColor: { type: String, default: "rgb(19,128,255)" },
    rootFontColor: { type: String, default: "#fff" },
    subThemeColor: { type: String, default: "rgba(245,245,245,1)" },
    subFontColor: { type: String, default: "#333" },
    leafThemeColor: { type: String, default: "rgba(245,245,245,1)" },
    leafFontColor: { type: String, default: "#333" },
    scaleExtent: {
      type: Object as PropType<[number, number]>
    },
    scaleRatio: { type: Number, default: 0.8 },
    // 功能设置
    // tooltip: Boolean, //废弃
    // edit: Boolean, //废弃
    // drag: Boolean, //废弃
    // zoom: Boolean, //废弃
    // centerBtn: Boolean, //废弃
    // fitBtn: Boolean, //废弃
    // downloadBtn: Boolean, //废弃
    // timetravel: Boolean, //废弃
    // mindmap: Boolean, //废弃
    // addNodeBtn: Boolean, //废弃
    // collapseBtn: Boolean, //废弃
    // fisheye: Boolean, //废弃
    // watchResize: Boolean, //废弃
    // keyboard: Boolean, //废弃
    // ctm: Boolean, //  开启右键菜单 //废弃
    // nodeMenu: Array, // 菜单配置 //废弃
    // hotKey: Array, // 快捷键配置 //废弃
    // closeEditInput: Boolean, // 关闭思维导图富文本编辑功能
    // 钩子函数
    onAdd: Function,
    onCancelSelected: Function,
    onExpand: Function,
    onCollapse: Function,
    onSelectedNode: Function,
    onAfterEdit: Function,
    onDragEnd: Function,
    onEdit: Function,
    // 绘图方式
    renderer: String,
  },
  data() {
    return {
      id: "mxs-mindmap_container",
      tree: void 0 as any
    }
  },
  mounted() {
    this.tree = new Tree({
      container: this.id,
      layout: {
        direction: this.$props.direction,
        getWidth: (node) => {
          return node.size[0]
        },
        getHeight: (node) => {
          return node.size[1]
        },
        getVGap: () => {
          return this.$props.yGap;
        },
        getHGap: () => {
          return this.$props.xGap;
        },
        getSide: ({ data }) => {
          return data.side || 'right'
        }
      },
      defaultNode: {
        type: 'mindmap-node'
      },
      defaultEdge: {
        type: this.$props.sharpCorner ? "round-poly" : "cubic-horizontal",
        style: {
          radius: 8,
          lineWidth: this.$props.branch,
          stroke: this.$props.branchColor,
          lineAppendWidth: this.$props.branch + this.$props.yGap / 2
        }
      }
    });
    const tree = this.tree.tree as TreeGraph;
    if (this.$props.scaleExtent) {
      const [minZoom, maxZoom] = this.$props.scaleExtent;
      tree.setMinZoom(minZoom);
      tree.setMaxZoom(maxZoom);
    }
    resizeObserver(this.id, throttle(({ width, height }) => {
      tree.changeSize(width, height)
    }, 1000))
    if (this.$props.modelValue?.length) {
      this.tree.render(parseData(this.$props.modelValue, {
        direction: this.$props.direction,
        getSize: (cfg) => getSize(cfg, {})
      }));
    }
    this.fitCenter();
    // 两指移动放大节点
    tree.addBehaviors({
      type: 'double-finger-drag-canvas',
      controlMoveDirection: this.$props.controlMoveDirection
    }, 'default')
  },
  methods: {
    fitCenter() {
      const tree = this.tree.tree as TreeGraph;
      const { x, y } = getCenterPointById(this.id)
      tree.zoomTo(this.$props.scaleRatio, { x, y });
    },
    /**
   * zoomOut 操作
   */
    zoomOut() {
      const graph: IGraph = this.tree.tree;
      const currentZoom = graph.getZoom();
      const ratioOut = 1 / (1 - 0.05 * 2);
      const maxZoom = graph.get('maxZoom');
      const { x, y } = getCenterPointById(this.id)
      if (ratioOut * currentZoom > maxZoom) {
        return;
      }
      graph.zoomTo(currentZoom * ratioOut, { x, y });
    },
    /**
     * zoomIn 操作
     */
    zoomIn() {
      const graph: IGraph = this.tree.tree;
      const currentZoom = graph.getZoom();
      const ratioIn = 1 - 0.05 * 2;
      const minZoom = graph.get('minZoom');
      if (ratioIn * currentZoom < minZoom) {
        return;
      }
      const { x, y } = getCenterPointById(this.id)
      graph.zoomTo(currentZoom * ratioIn, { x, y });
    },
    /**
     * 添加子节点
     */
    addChild(data, parent) {
      const graph: TreeGraph = this.tree.tree;
      const pData = parent.getModel();
      const newNode = parseData([data], {
        getSize: (cfg) => getSize(cfg, {})
      });
      if (this.$props.direction !== 'LR') {
        newNode.side = ['left', 'right'][Math.floor(Math.random() * 2)]
      }
      graph.addChild(newNode, parent)
      graph.layout()
    }
  },
  watch: {
    "$props.modelValue": {
      handler(val) {
        if (!this.tree) return;
        if (val.length) {
          this.tree.render(parseData(val, {
            direction: this.$props.direction,
            getSize: (cfg) => getSize(cfg, {})
          }));
          this.fitCenter();
        }
      },
      immediate: true,
    }
  },
};
</script>

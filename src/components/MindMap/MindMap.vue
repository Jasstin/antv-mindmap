<template>
  <div id="mxs-mindmap_container" class="mindmap-container" tabindex="1" />
</template>
<script lang="ts">
import "./css/Mindmap.scss";
import Tree from "./tree/tree";
import { TreeGraph } from '@antv/g6';
import resizeObserver from "./utils/resizeObserver";
import throttle from 'lodash/throttle';
import { PropType } from "vue";
import getCenterPointById from "./utils/getCenterPointById";
export default {
  props: {
    // 脑图数据
    modelValue: { required: true },
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
    direction: { type: String, default: "LR" },
    sharpCorner: { type: Boolean, default: true },
    themeColor: { type: String, default: "rgb(19,128,255)" },
    rootFontColor: { type: String, default: "#fff" },
    subThemeColor: { type: String, default: "rgba(245,245,245,1)" },
    subFontColor: { type: String, default: "#333" },
    leafThemeColor: { type: String, default: "rgba(245,245,245,1)" },
    leafFontColor: { type: String, default: "#333" },
    scaleExtent: {
      type: Object as PropType<[number, number]>,
      default: [0.1, 8],
    },
    scaleRatio: { type: Number, default: 0.8 },
    // 功能设置
    tooltip: Boolean,
    edit: Boolean,
    drag: Boolean,
    zoom: Boolean,
    centerBtn: Boolean,
    fitBtn: Boolean,
    downloadBtn: Boolean,
    timetravel: Boolean,
    mindmap: Boolean,
    addNodeBtn: Boolean,
    collapseBtn: Boolean,
    fisheye: Boolean,
    watchResize: Boolean,
    keyboard: Boolean,
    ctm: Boolean, //  开启右键菜单
    nodeMenu: Array, // 菜单配置
    hotKey: Array, // 快捷键配置
    closeEditInput: Boolean, // 关闭思维导图富文本编辑功能
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
        getWidth: () => {
          return 200
        },
        getVGap: () => {
          return this.$props.yGap;
        },
        getHGap: () => {
          return this.$props.xGap;
        }
      },
      defaultEdge: {
        type: this.$props.sharpCorner ? "mindmap-line" : "cubic-horizontal",
        style: {
          lineWidth: this.$props.branch,
          stroke: this.$props.branchColor,
          lineAppendWidth: this.$props.branch + this.$props.yGap / 2
        }
      }
    });
    const tree = this.tree.tree as TreeGraph;
    const [minZoom, maxZoom] = this.$props.scaleExtent;
    tree.setMinZoom(minZoom);
    tree.setMaxZoom(maxZoom);
    const { x, y } = getCenterPointById(this.id)
    resizeObserver(this.id, throttle(({ width, height }) => {
      tree.changeSize(width, height)
    }, 1000))
    if (this.$props.modelValue) {
      this.tree.render(this.$props.modelValue);
      tree.zoomTo(this.$props.scaleRatio, { x, y });
    }
    tree.addBehaviors({
      type: 'double-finger-drag-canvas',
      controlMoveDirection: this.$props.controlMoveDirection
    }, 'default')
  },
  watch: {
    "$props.modelValue": {
      handler(val) {
        if (!val) return console.log(`[mindTree wran]: 没有数据传入`);
        if (!this.tree) return;
        this.tree.render(val);
        const { x, y } = getCenterPointById(this.id)
        this.tree.tree.zoomTo(this.$props.scaleRatio, { x, y });
      },
      immediate: true,
    }
  },
};
</script>

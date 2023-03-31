<template>
  <div :id="id" style="width:100%;height:100%;overflow: hidden;" />
</template>
<script lang="ts">
import { PropType } from "vue";
import Tree from "./tree";
import getCenterPointById from './utils/getCenterPointById';
export default {
  props: {
    // 脑图数据
    modelValue: { required: true },
    // 绘制所需的变量
    xGap: { type: Number, default: 10 },
    yGap: { type: Number, default: 10 },
    branch: {
      type: Number,
      default: 1,
      validator: (val: number) => val >= 1 && val <= 6,
    },
    branchColor: {
      type: String,
      default: '#5a6ef0'
    },
    direction: { type: String, default: "H" },
    themeColor: { type: String, default: "rgb(19,128,255)" },
    rootFontColor: { type: String, default: "#fff" },
    subThemeColor: { type: String, default: "rgba(245,245,245,1)" },
    subFontColor: { type: String, default: "#333" },
    leafThemeColor: { type: String, default: "transparent" },
    leafFontColor: { type: String, default: "#333" },
    // 绘图方式
    renderer: { type: String, default: "canvas" },
    sharpCorner: Boolean,
    scaleExtent: {
      type: Object as PropType<[number, number]>,
      default: [0.1, 8],
    },
    scaleRatio: { type: Number, default: 1 },
    controlMoveDirection: { type: Boolean, default: true },
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
    onEdit: Function
  },
  data() {
    return {
      id: 'mxs-mindmap_container',
      tree: null as any
    }
  },
  mounted() {
    const tree = new Tree({
      container: this.id,
      renderer: this.$props.renderer,
      layout: {
        direction: this.$props.direction,
        getVGap: () => {
          return this.$props.yGap;
        },
        getHGap: () => {
          return this.$props.xGap;
        }
      },
      modes: {
        default: [{
          type: 'double-finger-drag-canvas',
          controlMoveDirection: this.$props.controlMoveDirection // 控制只允许横滑或者竖滑
        }, 'drag-canvas']
      },
      defaultEdge: {
        style: {
          lineWidth: this.$props.branch,
          stroke: this.$props.branchColor,
        },
      },
    }, {
      theme: {
        backgroundColor: {
          root: this.$props.themeColor,
          sub: this.$props.subThemeColor,
          leaf: this.$props.leafThemeColor
        },
        fontColor: {
          root: this.$props.rootFontColor,
          sub: this.$props.subFontColor,
          leaf: this.$props.leafFontColor
        }
      }
    }) as any;
    this.tree = tree;
    if (this.$props.modelValue) {
      tree.render(this.$props.modelValue);
    }
    const originTree = tree.tree;
    const [minZoom, maxZoom] = this.$props.scaleExtent;
    originTree.setMinZoom(minZoom);
    originTree.setMaxZoom(maxZoom);
    const { x, y } = getCenterPointById(this.id)
    originTree.zoomTo(this.$props.scaleRatio, { x, y });
    window.mindTree = originTree;
  },
  beforeUnmount() {
    this.tree?.destroy();
    this.tree = null;
  },
  watch: {
    "$props.modelValue": {
      handler(val) {
        if (val && val.length && this.tree) {
          this.tree?.render(val);
        }
      },
      immediate: true,
    }
  },
};
</script>

<template>
  <div>
    <div id="mxs-mindmap_container" class="mindmap-container" tabindex="1" />
    <input id="node-input" type="textarea" tabIndex="2" />
  </div>
</template>
<script lang="ts">
import "./css/Mindmap.scss";
import { PropType } from "vue";
import Tree from "./tree/tree";
import { tooltip } from "./plugins";
import {
  changeNodeMenuList,
  setGlobalTree,
  changehotKeyList,
} from "./variable";
import EditInput from "./editInput";
import {
  addData,
  update,
  deleteNode,
  deleteOneNode,
  expand,
  collapse,
  addSibling,
  addParent,
  findData,
  edit,
} from "./tree/methods";
import emitter from "./mitt";
import defaultHotKey from "./tree/hotkeys";
const isArray = (arg) =>
  Object.prototype.toString.call(arg).toLowerCase().indexOf("array") > 5;
const isObject = (arg) =>
  Object.prototype.toString.call(arg).toLowerCase() === "[object object]";
let tree;
export default {
  props: {
    // 脑图数据
    modelValue: { required: true },
    // 绘制所需的变量
    xGap: { type: Number, default: 18 },
    yGap: { type: Number, default: 84 },
    branch: {
      type: Number,
      default: 1,
      validator: (val: number) => val >= 1 && val <= 6,
    },
    branchColor: {
      type: String,
    },
    themeColor: { type: String, default: "rgb(19,128,255)" },
    rootFontColor: { type: String, default: "#fff" },
    subThemeColor: { type: String, default: "rgba(245,245,245,1)" },
    subFontColor: { type: String, default: "#333" },
    leafThemeColor: { type: String, default: "transparent" },
    leafFontColor: { type: String, default: "#333" },
    direction: { type: String, default: "LR" },
    sharpCorner: Boolean,
    scaleExtent: {
      type: Object as PropType<[number, number]>,
      default: [0.1, 8],
    },
    scaleRatio: { type: Number, default: 1 },
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
    // 控制画布移动方向
    controlMoveDirection: Boolean,
    // 节点是否自动添加到画布上
    defaultAppendNode: Boolean,
    // 是否启用交互创建边
    createEdge: Boolean
  },
  mounted() {
    this.$props.onAdd && emitter.on("onAdd", this.$props.onAdd);
    this.$props.onExpand && emitter.on("onExpand", this.$props.onExpand);
    this.$props.onCollapse && emitter.on("onCollapse", this.$props.onCollapse);
    this.$props.onSelectedNode &&
      emitter.on("onSelectedNode", this.$props.onSelectedNode);
    this.$props.onAfterEdit &&
      emitter.on("onAfterEdit", this.$props.onAfterEdit);
    this.$props.onDragEnd && emitter.on("onDragEnd", this.$props.onDragEnd);
    this.$props.onCancelSelected &&
      emitter.on("onCancelSelected", this.$props.onCancelSelected);
    this.$props.onEdit && emitter.on("onEdit", this.$props.onEdit);
    this.changeCanvasSize();
    window.addEventListener("resize", this.changeCanvasSize);
  },
  beforeUnmount() {
    this.$props.onAdd && emitter.off("onAdd", this.$props.onAdd);
    this.$props.onExpand && emitter.off("onExpand", this.$props.onExpand);
    this.$props.onCollapse && emitter.off("onCollapse", this.$props.onCollapse);
    this.$props.onSelectedNode &&
      emitter.off("onSelectedNode", this.$props.onSelectedNode);
    this.$props.onAfterEdit &&
      emitter.off("onAfterEdit", this.$props.onAfterEdit);
    this.$props.onDragEnd && emitter.off("onDragEnd", this.$props.onDragEnd);
    this.$props.onCancelSelected &&
      emitter.off("onCancelSelected", this.$props.onCancelSelected);
    this.$props.onEdit && emitter.off("onEdit", this.$props.onEdit);
    window.removeEventListener("resize", this.changeCanvasSize);
    tree.destroy();
    tree = null;
  },
  methods: {
    changeCanvasSize() {
      this.$nextTick(() => {
        const height = this.$el.parentNode.offsetHeight;
        const width = this.$el.offsetWidth;
        this.$el.style.height = height + "px";
        if (tree) {
          tree.changeSize(width, height);
        }
      });
    },
    treeInit() {
      const { modelValue } = this.$props;
      this.$nextTick(() => {
        tree = new Tree("mxs-mindmap_container", modelValue);
        tree.init(this.$props);
      });
    },
    inputInit() {
      EditInput.init("node-input");
    },
    add: addData,
    update,
    deleteNode,
    deleteOneNode,
    expand,
    collapse,
    addSibling,
    addParent,
    find: findData,
    editNode: edit,
    InputFocus() {
      EditInput.toFocus()
    }
  },
  watch: {
    "$props.modelValue": {
      handler(val) {
        if (isArray(val) && !val.length) return;
        if (isObject(val) && !Object.keys(val).length) return;
        this.treeInit();
        this.inputInit();
      },
      immediate: true,
    },
    "$props.tooltip": {
      handler(val) {
        if (val) {
          tree.addBehaviors(tooltip);
        } else {
          tree.removeBehaviors("tooltip");
        }
      },
    },
    "$props.edit": {
      handler(val) {
        tree.changeEditMode(val);
      },
    },
    "$props.drag": {
      handler(val) {
        if (val) {
          tree.addBehaviors("drag-canvas");
        } else {
          tree.removeBehaviors("drag-canvas");
        }
      },
    },
    "$props.zoom": {
      handler(val) {
        if (val) {
          tree.addBehaviors("zoom-canvas");
        } else {
          tree.removeBehaviors("zoom-canvas");
        }
      },
    },
    centerBtn(val) {},
    fitBtn(val) {},
    downloadBtn(val) {},
    timetravel(val) {},
    mindmap(val) {},
    addNodeBtn(val) {},
    collapseBtn(val) {},
    fisheye(val) {},
    watchResize(val) {},
    nodeMenu: {
      handler(val) {
        changeNodeMenuList(val);
      },
      immediate: true,
    },
    hotKey: {
      handler(val) {
        changehotKeyList(
          val
            .filter((i) => i.enabled == null || i.enabled === true)
            .map((item) => {
              return (
                defaultHotKey.filter(
                  (i) => i.name === item || i.name === item.name
                )[0] || { key: null }
              );
            })
        );
      },
      immediate: true,
    },
  },
};
</script>

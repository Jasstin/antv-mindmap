<template>
  <div>
    <div :id="id" class="mindmap-container" tabindex="1" />
    <input id="node-input" type="textarea" tabIndex="2" style="display: none;" />
  </div>
</template>
<script lang="ts">
import "./css/Mindmap.scss";
import { PropType } from "vue";
import Tree from "./tree/tree";
import {
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
import getCenterPointById from "./utils/getCenterPointById";
const isArray = (arg) =>
  Object.prototype.toString.call(arg).toLowerCase().indexOf("array") > 5;
const isObject = (arg) =>
  Object.prototype.toString.call(arg).toLowerCase() === "[object object]";
// 深度遍历树节点，修改树对象
export const transferTree = (tree, func, depth = 0, parent = null) => {
  let node, list = [...tree];
  return list.map((item, index) => {
    node = func(item, index, depth, parent);
    const children = item.children.length ? item.children : item._children
    if (children) {
      const _children = transferTree(children, func, depth + 1, node);
      if (_children && _children.length) {
        item.children.length ? node.children = _children : node._children = _children;
      }
    }
    return node
  });
}
export default {
  props: {
    // 脑图数据
    modelValue: { required: true },
    // 绘制所需的变量
    xGap: { type: Number, default: 20 },
    yGap: { type: Number, default: 20 },
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
    scaleRatio: { type: Number, default: 0.9 },
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
  data() {
    return {
      id: "mxs-mindmap_container_" + Date.now(),
      tree: void 0 as any,
      treeInited: false
    }
  },
  mounted() {
    this.treeInit();
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
    emitter.on('onValueChange', this.handleValueChange);
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
    emitter.off('onValueChange', this.handleValueChange);
    this.tree.destroy();
    this.tree = null;
  },
  methods: {
    handleValueChange(data) {
      this.$emit('update:modelValue', this.parseData(data))
    },
    treeInit() {
      if (this.treeInited) return;
      this.tree = new Tree(this.id);
      this.tree.init(this.$props);
      this.tree.render(this.$props.modelValue)
      this.inputInit();
      this.treeInited = true;
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
    parseData(data, expand = false) {
      return transferTree([...[data]], (node) => {
        const info = node?.rawData?.info;
        if (!info) {
          return { ...node, id: void 0, title: node.fullName, side: node.side }
        }
        if (expand && node.collapse) {
          return { title: node.fullName, info, collapse: false, children: node._children, side: node.side }
        }
        return { title: node.fullName, info, collapse: node.collapse, children: node.children, _children: node._children, side: node.side }
      });
    },
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
    InputFocus() {
      EditInput.toFocus()
    }
  },
  watch: {
    "$props.modelValue": {
      handler(val) {
        if (isArray(val) && !val.length) return;
        if (isObject(val) && !Object.keys(val).length) return;
        this.tree?.render(val)
      },
      immediate: true,
    },
    "$props.edit": {
      handler(val) {
        this.tree.changeEditMode(val);
      },
    },
    hotKey: {
      handler(val) {
        changehotKeyList(
          val
            ?.filter((i) => i.enabled == null || i.enabled === true)
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

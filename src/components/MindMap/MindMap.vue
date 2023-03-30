<template>
  <div>
    <div id="mxs-mindmap_container" class="mindmap-container" tabindex="1" />
    <div id="node-input" contenteditable="true" tabIndex="2" />
  </div>
</template>
<script lang="ts">
import "./css/Mindmap.scss";
import { PropType } from "vue";
import Tree from "./tree/tree";
import { tooltip } from "./plugins";
import {
  changeNodeMenuList,
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
  },
  data(){
    return {
      tree:null
    }
  },
  mounted() {
    this.tree = new Tree({
      container:"mxs-mindmap_container"
    },{}) as any;
    EditInput.init("node-input");
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
  },
  beforeUnmount() {
    this.tree?.destroy();
    this.tree = null;
  },
  methods: {
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
  },
  watch: {
    "$props.modelValue": {
      handler(val) {
        if(val && val.length){
          this.tree.render(val);
        }
      },
      immediate: true,
    },
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

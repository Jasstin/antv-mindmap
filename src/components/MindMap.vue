<template>
  <div>
    <div id="container" class="mindmap-container" />
    <textarea id="node-input" />
  </div>
</template>
<script lang="ts">
import './css/Mindmap.scss'
import {PropType} from 'vue'
import Tree from './tree/tree'
import {tooltip} from "./plugins";
import {changeNodeMenuList, setGlobalTree} from "./variable";
import EditInput from './editInput'
import {
  addData,
  update,
  deleteNode,
  deleteOneNode,
  expand,
  collapse,
  addSibling,
  addParent,
  findData
} from './tree/methods'
import emitter from "./mitt";

let tree;
export default {
  props: {
    // 脑图数据
    modelValue: {required: true},
    // 绘制所需的变量
    xGap: {type: Number, default: 18},
    yGap: {type: Number, default: 84},
    branch: {
      type: Number,
      default: 1,
      validator: (val: number) => val >= 1 && val <= 6
    },
    branchColor: {
      type: String,
    },
    themeColor: {type: String, default: 'rgb(19,128,255)'},
    rootFontColor: {type: String, default: '#fff'},
    subThemeColor: {type: String, default: 'rgba(245,245,245,1)'},
    subFontColor: {type: String, default: '#333'},
    direction: {type: String, default: 'LR'},
    sharpCorner: Boolean,
    scaleExtent: {
      type: Object as PropType<[number, number]>,
      default: [0.1, 8]
    },
    scaleRatio: {type: Number, default: 1},
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
    ctm: Boolean,//  开启右键菜单
    nodeMenu: Array, // 菜单配置
    // 钩子函数
    onAdd: Function,
    onExpand: Function,
    onCollapse: Function,
    onSelectedNode: Function,
    onAfterEdit: Function,
    onDragEnd: Function
  },
  mounted() {
    this.treeInit()
    this.inputInit()
    this.$props.onAdd && emitter.on('onAdd', this.$props.onAdd)
    this.$props.onExpand && emitter.on('onExpand', this.$props.onExpand)
    this.$props.onCollapse && emitter.on('onCollapse', this.$props.onCollapse)
    this.$props.onSelectedNode && emitter.on('onSelectedNode', this.$props.onSelectedNode)
    this.$props.onAfterEdit && emitter.on('onAfterEdit', this.$props.onAfterEdit)
    this.$props.onDragEnd && emitter.on('onDragEnd', this.$props.onDragEnd)
  },
  methods: {
    treeInit() {
      const {modelValue} = this.$props
      tree = new Tree('container', modelValue)
      tree.init(this.$props)
    },
    inputInit() {
      EditInput.init('node-input')
    },
    add: addData,
    update,
    deleteNode,
    deleteOneNode,
    expand,
    collapse,
    addSibling,
    addParent,
    find: findData
  },
  watch: {
    '$props.tooltip': {
      handler(val) {
        if (val) {
          tree.addBehaviors(tooltip)
        } else {
          tree.removeBehaviors('tooltip')
        }
      }
    },
    '$props.edit': {
      handler(val) {
        tree.changeEditMode(val)
      }
    },
    '$props.drag': {
      handler(val) {
        if (val) {
          tree.addBehaviors('drag-canvas')
        } else {
          tree.removeBehaviors('drag-canvas')
        }
      },
    },
    '$props.zoom': {
      handler(val) {
        if (val) {
          tree.addBehaviors('zoom-canvas')
        } else {
          tree.removeBehaviors('zoom-canvas')
        }
      }
    },
    centerBtn(val) {
    },
    fitBtn(val) {
    },
    downloadBtn(val) {
    },
    timetravel(val) {
    },
    mindmap(val) {
    },
    addNodeBtn(val) {
    },
    collapseBtn(val) {
    },
    fisheye(val) {
    },
    watchResize(val) {
    },
    nodeMenu: {
      handler(val) {
        changeNodeMenuList(val)
      },
      immediate: true
    }
  }
}
</script>

import G6, { GraphData, TreeGraph, TreeGraphData } from "@antv/g6";
import IMData from "../data";
import contextMenu from '../menu'
import { NodeData, InputData } from "../interface";
import { mindmap, toolbar, tooltip } from "../plugins";
import {
  branch,
  branchColor,
  changeBranch,
  changeBranchColor, changeCenterBtn, changeDownloadBtn, changeFitBtn,
  changeRootFontColor, changeScaleRatio,
  changeSubFontColor,
  changeSubThemeColor,
  changeThemeColor, changeTimetravel, globalTree, lineType, paddingH, paddingV, setGlobalTree, setLineType
} from "../variable";
import './registerNode' // 自定义节点形状
import './registerBehavior'
import { INode } from "@antv/g6-core/lib/interface/item"; // 自定义交互
const {
  Util
} = G6;

interface Window {
  mindTree?: TreeGraph;
}

interface layoutConfig {
  xGap?: number,
  yGap?: number,
  direction?: string,
  sharpCorner?: boolean // 直角边框
  branch?: number
  branchColor?: string
  themeColor?: string
  rootFontColor?: string
  subThemeColor?: string
  subFontColor?: string
  scaleExtent?: string
  scaleRatio?: number
  tooltip?: boolean,
  edit?: boolean,
  drag?: boolean,
  zoom?: boolean,
  centerBtn?: boolean,
  fitBtn?: boolean,
  downloadBtn?: boolean,
  timetravel?: boolean,
  mindmap?: boolean,
  addNodeBtn?: boolean,
  collapseBtn?: boolean,
  watchResize?: boolean,
}

interface Variable {
  branch?: number,
  branchColor?: string,
  rootFontColor?: string,
  subFontColor?: string,
  subThemeColor?: string,
  themeColor?: string
  timetravel?: boolean,
  centerBtn?: boolean,
  fitBtn?: boolean,
  downloadBtn?: boolean
  scaleRatio?: number
  lineType?: string
}

class Tree {
  container: HTMLElement | null
  data: NodeData | GraphData | TreeGraphData | undefined
  tree: TreeGraph | null

  constructor(containerId: string, data: InputData | InputData[]) {
    this.container = document.getElementById(containerId)
    this.data = IMData.init(data instanceof Array ? data[0] : data, true);
    this.tree = null
  }

  createLayoutConfig(layoutConfig?: layoutConfig) {
    if (layoutConfig) {
      let {
        branch,
        branchColor,
        rootFontColor,
        subFontColor,
        subThemeColor,
        themeColor,
        timetravel,
        centerBtn,
        fitBtn,
        downloadBtn,
        scaleRatio
      } = layoutConfig
      this.changeVariable({
        branch,
        branchColor,
        rootFontColor,
        subFontColor,
        subThemeColor,
        themeColor,
        timetravel,
        centerBtn,
        fitBtn,
        downloadBtn,
        scaleRatio,
        lineType: layoutConfig?.sharpCorner ? 'hvh' : 'cubic-horizontal'
      })
    }
    const config = {
      width: this.container?.scrollWidth,
      height: this.container?.scrollHeight ?? 0 - 20,
      layout: {
        type: 'compactBox',
        direction: 'H',
        getHeight: (node: NodeData) => {
          return node.height
        },
        getWidth: (node: NodeData) => {
          return node.width
        },
        getVGap: () => {
          return layoutConfig?.yGap || 10;
        },
        getHGap: () => {
          return layoutConfig?.xGap || 30;
        },
        getSide: (node: INode) => {
          return 'right';
        },
      },
      defaultEdge: {
        type: layoutConfig?.sharpCorner ? 'hvh' : 'cubic-horizontal',
        style: {
          lineWidth: branch.value,
          stroke: branchColor.value
        },
      },
      scaleRatio: layoutConfig?.scaleRatio || 1,
      modes: {
        default: [],
        edit: ['edit-mindmap']
      },
      plugins: [] as any,
      groupByTypes: false,
    }
    const plugins = [];
    plugins.push(toolbar())
    if (layoutConfig?.mindmap) {
      plugins.push(mindmap())
    }
    if (layoutConfig?.edit) {
      plugins.push(contextMenu())
    }
    config.plugins = plugins
    return config
  }

  init(layoutConfig?: layoutConfig) {
    if (!this.container) return
    console.log(layoutConfig,'树初始化参数')
    const config = this.createLayoutConfig(layoutConfig)
    const tree = new G6.TreeGraph({
      ...config,
      container: this.container,
      animate: false,
      renderer: 'canvas'
    });
    tree.data(this.data);
    this.tree = tree
    tree.layout()
    tree.fitCenter()
    tree.zoomTo(config.scaleRatio, {
      x: tree.getWidth() / 2,
      y: tree.getHeight() / 2
    })
    this.enableFeature(layoutConfig)
    let global = window as Window
    global.mindTree = tree
    setGlobalTree(tree)
    this.bindEvent(tree)
    return tree;
  }

  changeSize(width, height) {
    this.tree.changeSize(width, height)
    this.tree.fitCenter()
  }

  bindEvent(tree) {

  }

  enableFeature(layoutConfig?: layoutConfig) {
    if (layoutConfig?.tooltip) {
      this.addBehaviors(tooltip)
    }
    if (layoutConfig?.edit) {
      this.changeEditMode(true)
    }
    if (layoutConfig?.drag) {
      this.addBehaviors('drag-canvas')
    }
    if (layoutConfig?.zoom) {
      this.addBehaviors('zoom-canvas')
    }
  }

  changeVariable({
    branch,
    branchColor,
    rootFontColor,
    subFontColor,
    subThemeColor,
    themeColor,
    timetravel,
    centerBtn,
    fitBtn,
    downloadBtn,
    scaleRatio,
    lineType
  }: Variable) {
    branch && changeBranch(branch)
    branchColor && changeBranchColor(branchColor)
    rootFontColor && changeRootFontColor(rootFontColor)
    subFontColor && changeSubFontColor(subFontColor)
    subThemeColor && changeSubThemeColor(subThemeColor)
    themeColor && changeThemeColor(themeColor)
    timetravel && changeTimetravel(timetravel)
    centerBtn && changeCenterBtn(centerBtn)
    fitBtn && changeFitBtn(fitBtn)
    downloadBtn && changeDownloadBtn(downloadBtn)
    scaleRatio && changeScaleRatio(scaleRatio)
    lineType && setLineType(lineType)

  }

  changeLayout(layoutConfig?: layoutConfig) {
    const config = this.createLayoutConfig(layoutConfig)
    this.tree?.updateLayout(config)
  }

  addBehaviors(behavior: any, modeType?: string) {
    if (modeType) {
      this.tree?.addBehaviors(behavior, modeType)
    } else {
      this.tree?.addBehaviors(behavior, 'default')
      this.tree?.addBehaviors(behavior, 'edit')
    }
  }

  removeBehaviors(behavior: any, modeType: string) {
    if (modeType) {
      this.tree?.removeBehaviors(behavior, modeType)
    } else {
      this.tree?.removeBehaviors(behavior, 'default')
      this.tree?.removeBehaviors(behavior, 'edit')
    }
  }

  changeEditMode(edit: boolean) {
    if (edit) {
      this.tree?.setMode('edit')
    } else {
      this.tree?.setMode('default')
    }
  }

  reBuild(layoutConfig?: layoutConfig) {
    this.tree?.destroy()
    this.init(layoutConfig)
  }

  destroy() {
    console.log("组件销毁")
    this.tree?.destroy()
    console.log("组件销毁完成")
  }
}

export default Tree

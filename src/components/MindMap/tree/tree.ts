import G6, { GraphData, TreeGraph, TreeGraphData } from "@antv/g6";
import IMData from "../data";
import { NodeData, InputData } from "../interface";
import { isMobile } from "../utils/testDevice";
import {
  branch,
  branchColor,
  changeBranch,
  changeBranchColor,
  changeCenterBtn,
  changeDownloadBtn,
  changeFitBtn,
  changeLeafFontColor,
  changeLeafThemeColor,
  changeRootFontColor,
  changeScaleRatio,
  changeSubFontColor,
  changeSubThemeColor,
  changeThemeColor,
  changeTimetravel,
  changeCloseEditInput,
  globalTree,
  lineType,
  paddingH,
  paddingV,
  setLineType,
  changeControlMoveDirection,
  changeDefaultAppendNode,
  handleBtnAreaWidth,
  themeColor,
  setGlobalTree,
} from "../variable";
import "../elements/nodes/mindmap-node"; // 自定义节点形状
import "../elements/edges/round-poly"; // 自定义边
import "./registerBehavior";
import { INode } from "@antv/g6-core/lib/interface/item"; // 自定义交互
import getCenterPointById from "../utils/getCenterPointById";

interface Window {
  mindTree?: TreeGraph;
}

interface layoutConfig {
  xGap?: number;
  yGap?: number;
  direction?: string;
  sharpCorner?: boolean; // 直角边框
  branch?: number;
  branchColor?: string;
  themeColor?: string;
  rootFontColor?: string;
  subThemeColor?: string;
  subFontColor?: string;
  scaleExtent?: string;
  leafThemeColor?: string;
  leafFontColor?: string;
  scaleRatio?: number;
  tooltip?: boolean;
  edit?: boolean;
  drag?: boolean;
  zoom?: boolean;
  centerBtn?: boolean;
  fitBtn?: boolean;
  downloadBtn?: boolean;
  timetravel?: boolean;
  mindmap?: boolean;
  addNodeBtn?: boolean;
  collapseBtn?: boolean;
  watchResize?: boolean;
  closeEditInput?: boolean;
  renderer?: string;
  controlMoveDirection?: boolean;
  defaultAppendNode: boolean;
  createEdge?: boolean;
}

interface Variable {
  branch?: number;
  branchColor?: string;
  rootFontColor?: string;
  subFontColor?: string;
  subThemeColor?: string;
  themeColor?: string;
  timetravel?: boolean;
  centerBtn?: boolean;
  fitBtn?: boolean;
  downloadBtn?: boolean;
  scaleRatio?: number;
  lineType?: string;
  leafThemeColor?: string;
  leafFontColor?: string;
  closeEditInput?: boolean;
  controlMoveDirection?: boolean;
  defaultAppendNode: boolean;
}

class Tree {
  container: HTMLElement | null;
  data: NodeData | GraphData | TreeGraphData | undefined;
  tree: TreeGraph | null;
  config

  constructor(containerId: string) {
    this.container = document.getElementById(containerId);
    this.tree = null;
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
        leafThemeColor,
        leafFontColor,
        timetravel,
        centerBtn,
        fitBtn,
        downloadBtn,
        scaleRatio,
        closeEditInput,
        controlMoveDirection,
        defaultAppendNode,
      } = layoutConfig;
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
        leafThemeColor,
        leafFontColor,
        lineType: layoutConfig?.sharpCorner ? "round-poly" : "cubic-horizontal",
        closeEditInput,
        controlMoveDirection,
        defaultAppendNode,
      });
    }
    const { width, height } = this.container.getBoundingClientRect();
    const config = {
      width,
      height,
      layout: {
        type: "mindmap",
        direction: "H",
        getHeight: (node: NodeData) => {
          return node.style?.height;
        },
        getWidth: (node: NodeData) => {
          return node.style?.width;
        },
        getVGap: () => {
          return layoutConfig?.yGap || 10;
        },
        getHGap: () => {
          return layoutConfig?.xGap || 30;
        },
        getSide: (node: INode) => {
          return node.data.side || "right";
        },
      },
      defaultNode: {
        type: 'mindmap-node'
      },
      defaultEdge: {
        type: layoutConfig?.sharpCorner ? "round-poly" : "cubic-horizontal",
        style: {
          lineWidth: branch.value,
          stroke: branchColor.value,
          radius: 8,
          lineAppendWidth: branch.value + (layoutConfig?.yGap || 10) / 2
        },
      },
      modes: {
        // default: ["drag-canvas","zoom-canvas"],
        // default: ['default-view', "double-finger-drag-canvas", "drag-canvas"],
        // edit: [isMobile() ? "edit-mindmap-mobile" : "edit-mindmap-pc", "my-shortcut", "double-finger-drag-canvas", "drag-canvas"],
        // connect: ["double-finger-drag-canvas", "drag-canvas"]
      },
      groupByTypes: false,
    };
    return config;
  }

  async init(layoutConfig?: layoutConfig) {
    if (!this.container) return;
    const config = this.createLayoutConfig(layoutConfig);
    this.config = layoutConfig;
    const tree = new G6.TreeGraph({
      ...config,
      container: this.container,
      animate: false,
      renderer: layoutConfig.renderer || "canvas",
    });
    this.tree = tree;
    setGlobalTree(tree);
    return tree;
  }

  render(_data) {
    if (!_data?.length) return;
    const data = IMData.init(_data, true);
    this.tree.data(data);
    this.tree.layout(true);
    if (this.config.scaleRatio != 1) {
      const { x, y } = getCenterPointById(this.container.id)
      this.tree.zoomTo(this.config.scaleRatio, { x, y });
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
    lineType,
    leafThemeColor,
    leafFontColor,
    closeEditInput,
    controlMoveDirection,
    defaultAppendNode,
  }: Variable) {
    branch && changeBranch(branch);
    branchColor && changeBranchColor(branchColor);
    rootFontColor && changeRootFontColor(rootFontColor);
    subFontColor && changeSubFontColor(subFontColor);
    subThemeColor && changeSubThemeColor(subThemeColor);
    themeColor && changeThemeColor(themeColor);
    timetravel && changeTimetravel(timetravel);
    centerBtn && changeCenterBtn(centerBtn);
    fitBtn && changeFitBtn(fitBtn);
    downloadBtn && changeDownloadBtn(downloadBtn);
    scaleRatio && changeScaleRatio(scaleRatio);
    lineType && setLineType(lineType);
    leafThemeColor && changeLeafThemeColor(leafThemeColor);
    leafFontColor && changeLeafFontColor(leafFontColor);
    closeEditInput && changeCloseEditInput(closeEditInput);
    controlMoveDirection && changeControlMoveDirection(controlMoveDirection);
    defaultAppendNode && changeDefaultAppendNode(defaultAppendNode);
  }

  reBuild(layoutConfig?: layoutConfig) {
    this.tree?.destroy();
    this.init(layoutConfig);
  }

  destroy() {
    this.tree?.destroy();
  }
}

export default Tree;

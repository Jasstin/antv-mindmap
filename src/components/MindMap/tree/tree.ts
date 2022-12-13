import G6, { GraphData, TreeGraph, TreeGraphData } from "@antv/g6";
import IMData from "../data";
import { renderMenu, handleMenuClick } from "../menu";
import { NodeData } from "../type/NodeData";
import { InputData } from "../type/inputData";
import { layoutConfig } from "../type/layoutConfig";
import { isMobile } from "../utils/testDevice";
import getAnchorByDirection from "../utils/getAnchorByDirection";
import withCss from "../utils/withCss";
import * as TreeMethods from "./methods";
class Tree {
  container: HTMLElement | null;
  containerId: string;
  data: NodeData | GraphData | TreeGraphData | undefined;
  tree: TreeGraph | null;

  constructor(containerId: string, data: InputData | InputData[]) {
    this.container = document.getElementById(containerId);
    this.containerId = containerId;
    this.data = data;
    this.tree = null;
    Object.assign(this, TreeMethods); // 树图方法
  }
  prepareConfig(layoutConfig: layoutConfig = {}) {
    const propsConfig = {
      ...layoutConfig,
      direction: layoutConfig.direction || "H",
      lineType: layoutConfig?.sharpCorner ? "polyline" : "cubic-horizontal",
    };
    const config = {
      width: propsConfig.containerWidth,
      height: propsConfig.containerHeight,
      layout: {
        type: "mindmap",
        direction: propsConfig.direction,
        getHeight: (node: NodeData) => {
          return node.style.height;
        },
        getWidth: (node: NodeData) => {
          return node.style.width;
        },
        getVGap: () => {
          return layoutConfig?.yGap || 10;
        },
        getHGap: () => {
          return layoutConfig?.xGap || 30;
        },
        getSide: (node: NodeData) => {
          return node.data.side;
        },
      },
      defaultEdge: {
        type: propsConfig.lineType,
        ...getAnchorByDirection(propsConfig.direction),
        style: {
          lineWidth: propsConfig.branch,
          stroke: propsConfig.branchColor,
          radius: 10, // 拐弯处的圆角弧度，若不设置则为直角,折线类型生效
        },
      },
      scaleRatio: propsConfig?.scaleRatio || 1,
      modes: {
        mobile: ["edit-mindmap-mobile"],
        editPc: [
          "edit-mindmap-pc",
          "my-shortcut",
          "double-finger-drag-canvas",
          "drag-canvas",
        ],
      },
      plugins: [
        new G6.Minimap({
          size: [100, 100],
          className: "mindmap-miniGap",
          viewportClassName: "mindmap-miniGap-viewPort",
          type: "delegate",
          delegateStyle: {
            fill: propsConfig.themeColor,
            stroke: propsConfig.themeColor,
          },
        }),
        new G6.Menu({
          getContent: renderMenu,
          handleMenuClick,
          offsetX: 10, // 需要加上父级容器的 padding-left 16 与自身偏移量 10
          offsetY: -100, // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
          itemTypes: ["node", "canvas"], // 在哪些类型的元素上响应
        }),
      ] as any,
      groupByTypes: false,
      renderer: propsConfig.renderer || "canvas",
    };
    const mindTreeConfig = {
      propsConfig,
      config,
    };
    return mindTreeConfig;
  }

  async init(layoutConfig?: layoutConfig) {
    const { config, propsConfig } = this.prepareConfig(layoutConfig);
    if (!this.container) {
      //  如果没有容器元素，则按照传入的id名称进行创建
      const oDiv = document.createElement("div");
      oDiv.id = this.containerId;
      withCss(oDiv, {
        width: propsConfig.containerWidth + "px" || "100%",
        height: propsConfig.containerHeight + "px" || "100%",
      });
      document.body.appendChild(oDiv);
      this.container = oDiv;
    }
    const inputData = this.data instanceof Array ? this.data[0] : this.data;
    const data = IMData.init(inputData, true);
    const tree = new G6.TreeGraph({
      ...config,
      container: this.container,
      animate: false,
    });
    tree.data(data);
    tree.changeSize(this.container.offsetWidth, this.container.offsetHeight);
    tree.fitCenter();
    tree.zoomTo(config.scaleRatio, {
      x: tree.getWidth() / 2,
      y: tree.getHeight() / 2,
    });
    tree.setMode(isMobile() ? "mobile" : "editPc");
    tree.layout();
    tree.setAutoPaint(true);
    this.tree = tree;
    window.mindTree = tree;
    window.mindTreeConfig = { propsConfig, config };
    return this;
  }

  registerHotKey(hotkeys) {
    //  Todo：可以修改快捷键是否开启以及对应的快捷键
  }

  destroy() {
    this.tree?.destroy();
    delete window.mindTree;
    delete window.mindTreeConfig;
  }
}

export default Tree;

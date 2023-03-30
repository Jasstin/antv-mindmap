import G6, { GraphData, TreeGraph, TreeGraphData } from "@antv/g6";
import IMData from "../data";
import { renderMenu, handleMenuClick } from "../menu";
import { NodeData } from "../type/NodeData";
import { InputData } from "../type/inputData";
import { layoutConfig } from "../type/layoutConfig";
import { isMobile } from "../utils/testDevice";
import "./registerNode"; // 自定义节点形状
import "./registerBehavior";
import { INode } from "@antv/g6-core/lib/interface/item"; // 自定义交互
import { branch, branchColor, handleBtnAreaWidth } from "../variable";
import { deepMix } from '@antv/util';

class Tree {
  tree: TreeGraph | null;
  constructor(cfg, extraConfig) {
    if (!cfg.container) throw new Error('[mindTree]: invalid container');
    const config = deepMix({}, this.getDefaultCfg(), cfg);
    const tree = new G6.TreeGraph(config);
    this.tree = tree;
  }

  getDefaultCfg() {
    return {
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
          return 10;
        },
        getHGap: () => {
          return 30;
        },
        getSide: (node: NodeData) => {
          return node.data.side;
        },
      },
      defaultEdge: {
        type: "hvh",
        style: {
          lineWidth: propsConfig.branch,
          stroke: propsConfig.branchColor,
          radius: 10, // 拐弯处的圆角弧度，若不设置则为直角,折线类型生效
        },
      },
      groupByTypes: false,
      animate: false,
    }
  }

  render(data) {
    const tree = this.tree
    const _data = IMData.init(
      data instanceof Array ? data[0] : data,
      true
    );
    tree.data(_data);
    tree.layout();
    tree.fitCenter();
  }
  destroy() {
    this.tree?.destroy();
    delete window.mindTree;
    delete window.mindTreeConfig;
  }
}

export default Tree;

import G6, { TreeGraph } from "@antv/g6";
import IMData from "../data";
import { NodeData } from "../type/NodeData";
import { branch, branchColor } from "../variable";
import { deepMix } from '@antv/util';
import "./registerNode"; // 自定义节点形状
import "./registerBehavior";

const CURRENT_VERSION = '4.0.0';
class Tree {
  tree: TreeGraph | null;
  constructor(cfg, extraConfig) {
    if (!cfg.container) throw new Error('[mindTree]: invalid container');
    const config = deepMix({}, this.getDefaultCfg(), cfg);
    const tree = new G6.TreeGraph(config);
    tree.set('extraConfig', extraConfig);
    tree.set('currentVersion', CURRENT_VERSION)
    this.tree = tree;
  }

  getDefaultCfg() {
    return {
      layout: {
        type: "mindmap",
        direction: 'H',
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
          lineWidth: branch,
          stroke: branchColor,
          radius: 10, // 拐弯处的圆角弧度，若不设置则为直角,折线类型生效
          offset: 10
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
  }
}

export default Tree;

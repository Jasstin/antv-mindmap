import G6, { TreeGraph } from "@antv/g6";
import IMData from "../data";
import { NodeData } from "../type/NodeData";
import { deepMix } from '@antv/util';
import "./registerNode"; // 自定义节点形状
import "./behavior";
import { CURRENT_VERSION, EDGE_LINE_COLOR, EDGE_LINE_WIDTH, EDGE_RADIUS, EDGE_TYPE, H_GAP, LAUOUT_DIRECTION, LAUOUT_TYPE, V_GAP } from "./contast";


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
        type: LAUOUT_TYPE,
        direction: LAUOUT_DIRECTION,
        getHeight: (node: NodeData) => {
          return node.style.height;
        },
        getWidth: (node: NodeData) => {
          return node.style.width;
        },
        getVGap: () => {
          return V_GAP;
        },
        getHGap: () => {
          return H_GAP;
        },
        getSide: (node: NodeData) => {
          return node.data.side;
        },
      },
      defaultEdge: {
        type:EDGE_TYPE,
        style: {
          lineWidth:EDGE_LINE_WIDTH,
          stroke: EDGE_LINE_COLOR,
          radius: EDGE_RADIUS, // 拐弯处的圆角弧度，若不设置则为直角,折线类型生效
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

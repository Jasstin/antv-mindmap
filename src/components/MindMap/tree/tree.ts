import G6, { TreeGraph } from "@antv/g6";
import "./registerNode"; // 自定义节点形状,边
import "./registerBehavior";
import { deepMix } from '@antv/util';

class Tree {
  tree
  constructor(layoutConfig) {
    this.init(layoutConfig)
  }
  init(layoutConfig) {
    const config = deepMix({
      layout: {
        type: "mindmap",
        direction: 'LR',
        getVGap: () => {
          return 10;
        },
        getHGap: () => {
          return 30;
        }
      },
      defaultNode: {
        type: 'mindmap-node'
      },
      modes: {
        // default: [isMobile() ? "edit-mindmap-mobile" : "edit-mindmap-pc", 'my-shortcut', 'drag-canvas', layoutConfig.createEdge ? {
        //   type: 'create-edge',
        //   key: 'shift',
        //   edgeConfig: {
        //     type: 'cubic',
        //     style: {
        //       lineWidth: 2,
        //       lineDash: [5, 10]
        //       // ... // 其它边样式配置
        //     },
        //     // ... // 其它边配置
        //   },
        // } : ''],
      },
      groupByTypes: false,
      animate: false,
      renderer: "canvas",
    }, layoutConfig);
    this.tree = new G6.TreeGraph(config);
    this.bindEvent()
  }
  bindEvent() {
    const graph = this.tree;
    graph.on('afterlayout', () => {
      // 由于左右布局时根节点的连接点无法很好计算，因此会出现线连接出现在节点之上的情况，因此需要将根节点的层级置于边之上
      const rootNode = graph.get('nodes')[0];
      if (rootNode) {
        rootNode.toFront();
      }
    })
  }
  render(data) {
    this.tree.data(data);
    this.tree.layout(true);
  }
}

export default Tree;

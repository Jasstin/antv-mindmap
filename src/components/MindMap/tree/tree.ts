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
        direction: 'H',
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
  }
  render(data) {
    const rootData = {
      name: 'root',
      visible: false,
      children: data,
      branchColor: 'transparent'
    }
    let renderData;
    if (data?.length > 2) {
      renderData = rootData;
    } else if (data?.length === 1) {
      renderData = data[0]
    } else if (!data?.length) {
      return;
    } else {
      console.log(`[mindTree warn]: 数据格式错误`);
    }
    this.tree.data(renderData);
    this.tree.layout(true);
  }
}

export default Tree;

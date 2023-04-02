import G6, { TreeGraph } from "@antv/g6";
import { deepMix } from '@antv/util';
import { CURRENT_VERSION,LAUOUT_DIRECTION, LAUOUT_TYPE } from "./contast";
import "./behavior";
import "./element";

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
        getWidth:(node) => {
          // node 是传入的数据
          return 180
        },
        getHeight:(node) => {
          // node 是传入的数据
          return 80
        },
      },
      groupByTypes: false,
      animate: false,
    }
  }
  render(data) {
    const tree = this.tree
    let _data = {};
    if (data instanceof Array) {
      _data = {
        id: 'node_root',
        type: 'rect',
        label: 'root',
        children: data
      }
    } else {
      _data = data;
    }
    tree.data(_data);
    tree.layout(true);
  }
  destroy() {
    this.tree?.destroy();
  }
}

export default Tree;

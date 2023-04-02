import { IGroup, IShape, ModelConfig } from "@antv/g6";
import { registerNode } from "@antv/g6-core";
registerNode('mindmapNode',{
  options:{
    style: {},
    stateStyles: {
      hover: {},
      selected: {},
    },
  },
  shapeType:'mindmapNode',
  /**
   * 绘制节点，包含文本
   * @param  {Object} cfg 节点的配置项
   * @param  {G.Group} group 图形分组，节点中图形对象的容器
   * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 node.get('keyShape') 可以获取。
   * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
   */
  drawShape(cfg, group: IGroup): IShape {
     console.log(`>>>>drawShape`,cfg,group)
    let keyShape = group.addShape('rect', {
      attrs: {
        width: 200,
        height: 56,
        fill:'blue'
      }
    })
    return keyShape;
  },
  /**
   * 绘制完成后的操作，便于用户继承现有的节点、边
   * @param cfg
   * @param group
   * @param keyShape
   */
  afterDraw(cfg?: ModelConfig, group?: IGroup, keyShape?: IShape) {
    console.log(`>>>>afterDraw`,cfg,group,keyShape)
  },
});


import { __assign, __rest } from "tslib";
import Shape from "../nodeTemplate/draw/shape";
import getTextBounds from "../nodeTemplate/utils/getTextBounds";
import { isSafari, isWin } from "../utils/testDevice";

import { IGroup, IShape } from '@antv/g-base';
import {
  registerNode,
  registerEdge,
  Item,
  NodeConfig,
  ShapeStyle,
  ShapeOptions,
  BaseGlobal as Global,
  UpdateType,
  EdgeConfig,
} from '@antv/g6-core';
import { deepMix } from '@antv/util';
// startY 由于不同浏览器的展示规则不一致，导致垂直居中会存在1px误差，所以需要细调
const diffY = isSafari ? -3 : isWin ? 2 : 0;
const GlobalFamily = '"Microsoft YaHei", "PingFang SC", "Microsoft JhengHei", sans-serif';
registerNode('mindmap-node', {
  // 自定义节点时的配置
  options: {
    size: 300,
    lineHeight: 25,
    paddingTop: 0,
    paddingLeft: 3,
    iconMarginRight: 3,
    beforeWidth: 5,
    afterWidth: 5,
    style: {
      stroke: Global.defaultNode.style.stroke,
      fill: Global.defaultNode.style.fill,
      radius: 4
    },
    labelCfg: {
      style: {
        fill: Global.nodeLabel.style.fill,
        fontSize: 16,
        fontFamily: GlobalFamily,
        fontStyle: 'normal',
        fontWeight: 400,
      },
    },
    // 节点中icon配置
    icon: {
      // 是否显示icon，值为 false 则不渲染icon
      show: true,
      // icon的地址，字符串类型
      width: 20,
      height: 20,
    },
    // 连接点，默认为左右
    // anchorPoints: [{ x: 0, y: 0.5 }, { x: 1, y: 0.5 }]
    anchorPoints: [
      [0, 0.5],
      [1, 0.5],
    ],
    stateStyles: {
      ...Global.nodeStateStyles,
    },
  },
  shapeType: 'mindmap-node',
  // 文本位置
  labelPosition: 'center',
  drawShape(cfg: NodeConfig, group: IGroup): IShape {
    const { icon: defaultIcon = {}, size, beforeWidth, afterWidth } = this.mergeStyle || this.getOptions(cfg) as NodeConfig;
    const nodeData = cfg.info as { title: string, icon: string };
    const depth = cfg.depth as number;
    const icon = deepMix({}, defaultIcon, { img: nodeData.icon });
    const wrapper = `${this.type}-keyShape`;
    const bg = `${this.type}-background`;
    const newNodeFn = new Shape(group);
    const rest = { draggable: depth > 0 };
    const [width, height] = this.getSize(cfg);
    group['shapeMap'][wrapper] = newNodeFn.Rect(wrapper, { x: 0, y: 0, width: width + beforeWidth + afterWidth, height: height, fill: 'transparent' }, rest);
    group['shapeMap'][bg] = newNodeFn.Rect(bg, this.getBgStyle!(cfg), rest);
    const { show, img } = icon;
    const iconName = `${this.type}-icon`;
    const labelName = `${this.type}-label`;
    if (show && img) {
      group['shapeMap'][iconName] = newNodeFn.Image('icon', this.getIconStyle!(cfg), rest);
    }
    group['shapeMap'][labelName] = newNodeFn.Text('title', this.getLabelStyle!(cfg), size, rest)
    return group['shapeMap'][wrapper];
  },
  getSize: function getSize(cfg) {
    var { size: maxNodeSize, labelCfg, icon: defaultIcon, paddingLeft, paddingTop, lineHeight, iconMarginRight } = (this.mergeStyle || this.getOptions(cfg));
    const nodeData = cfg.info as { title: string, icon: string };
    const icon = deepMix({}, defaultIcon, { img: nodeData.icon });
    const { show, img, width: imgWidth } = icon;
    const { fontSize, fontWeight } = labelCfg.style;
    const iconWidth = (show && img) ? imgWidth + iconMarginRight : 0;
    const { width, line } = getTextBounds(nodeData.title, { text: nodeData.title, fontSize, fontWeight, textIndent: iconWidth }, maxNodeSize);
    return [width + paddingLeft * 2, lineHeight * line + paddingTop * 2]
  },
  /**
   * 获取节点的样式，供基于该节点自定义时使用
   * @param {Object} cfg 节点数据模型
   * @return {Object} 节点的样式
   */
  getBgStyle: function getShapeStyle(cfg) {
    const { style, beforeWidth } = (this.mergeStyle || this.getOptions(cfg));
    const [width, height] = this.getSize(cfg);
    var styles = __assign({
      x: beforeWidth,
      y: 0,
      width,
      height,
    }, style);

    return styles;
  },
  /**
   * 获取节点的样式，供基于该节点自定义时使用
   * @param {Object} cfg 节点数据模型
   * @return {Object} 节点的样式
   */
  getIconStyle: function getIconStyle(cfg) {
    const { icon, lineHeight, paddingLeft, paddingTop, beforeWidth } = (this.mergeStyle || this.getOptions(cfg));
    var styles = __assign({
      height: Math.min(lineHeight, icon.height),
      x: paddingLeft + beforeWidth,
      y: paddingTop + Math.max((lineHeight - icon.height) / 2, 0),
      cursor: 'pointer'
    }, icon);

    return styles;
  },
  /**
   * 获取节点的样式，供基于该节点自定义时使用
   * @param {Object} cfg 节点数据模型
   * @return {Object} 节点的样式
   */
  getLabelStyle: function getLabelStyle(cfg) {
    const { labelCfg, paddingLeft, icon, iconMarginRight, beforeWidth } = (this.mergeStyle || this.getOptions(cfg));
    const info = cfg.info as { title: string, icon: string };
    const { show, img, width: iconWidth } = icon;
    var styles = __assign({
      x: paddingLeft + beforeWidth,
      y: diffY + (isWin ? -1 : 0),
      text: info.title,
      textIndent: (show && img) ? iconWidth + iconMarginRight : 0,
      cursor: 'pointer'
    }, labelCfg.style);

    return styles;
  },
}, 'single-node');

registerEdge("mindmap-line", {
  options: {
    color: Global.defaultEdge.color,
    size: Global.defaultEdge.size,
    style: {
      x: 0,
      y: 0,
      stroke: Global.defaultEdge.style.stroke,
      lineAppendWidth: Global.defaultEdge.style.lineAppendWidth,
    },
    // 文本样式配置
    labelCfg: {
      style: {
        fill: Global.edgeLabel.style.fill,
        fontSize: Global.edgeLabel.style.fontSize,
        fontFamily: GlobalFamily
      },
    },
    stateStyles: {
      ...Global.edgeStateStyles,
    },
  },
  shapeType: 'mindmap-line',
  // 文本位置
  labelPosition: 'center',
  drawShape(cfg: EdgeConfig, group: IGroup) {
    const shapeStyle = (this as any).getShapeStyle(cfg);
    const keyShape = group.addShape('path', {
      className: 'edge-shape',
      name: 'edge-shape',
      attrs: shapeStyle,
    });
    group['shapeMap']['edge-shape'] = keyShape;
    return keyShape;
  },
  getShapeStyle(cfg: EdgeConfig): ShapeStyle {
    const { style: defaultStyle } = this.options;

    const strokeStyle: ShapeStyle = {
      stroke: cfg.color,
    };

    const style: ShapeStyle = deepMix({}, defaultStyle, strokeStyle, cfg.style);
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const path = this.getPath(startPoint, endPoint);
    const attrs: ShapeStyle = deepMix({}, Global.defaultEdge.style as ShapeStyle, style, {
      lineWidth: cfg.size,
      path,
    } as ShapeStyle);
    console.log(`>>>path`, startPoint, endPoint, path, attrs);
    return attrs;
  },
  getPath(startPoint, endPoint): Array<Array<string | number>> | string {
    let dist = endPoint.y < startPoint.y ? 10 : -10;
    if (endPoint.y === startPoint.y) {
      dist = 0;
    }
    return [
      ["M", startPoint.x, startPoint.y],
      ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
      [
        "L",
        endPoint.x / 3 + (2 / 3) * startPoint.x,
        startPoint.y + (endPoint.y - startPoint.y) + dist,
      ],
      [
        "Q",
        endPoint.x / 3 + (2 / 3) * startPoint.x,
        startPoint.y + (endPoint.y - startPoint.y),
        endPoint.x / 3 + (2 / 3) * startPoint.x + 10,
        endPoint.y,
      ], // 三分之二处
      ["L", endPoint.x, endPoint.y],
    ]
  }
}, 'single-edge');

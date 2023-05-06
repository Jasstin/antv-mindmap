import { __assign, __rest } from "tslib";
import Shape from "../../nodeTemplate/draw/shape";
import getTextBounds from "../../nodeTemplate/utils/getTextBounds";
import { isSafari, isWin } from "../../utils/testDevice";

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
import { NodeData } from "../../tree/handleData";
// startY 由于不同浏览器的展示规则不一致，导致垂直居中会存在1px误差，所以需要细调
const diffY = isSafari ? -3 : isWin ? 2 : 0;
const GlobalFamily = '"Microsoft YaHei", "PingFang SC", "Microsoft JhengHei", sans-serif';
const defaultOptions = {
    size: 300,
    lineHeight: 25,
    paddingTop: 0,
    paddingLeft: 3,
    iconMarginRight: 3,
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
    stateStyles: {
        ...Global.nodeStateStyles,
    },
}
export const getSize = (cfg, options) => {
    var { size: maxNodeSize, labelCfg, icon: defaultIcon, paddingLeft, paddingTop, lineHeight, iconMarginRight } = deepMix({}, options, defaultOptions);
    const nodeData = cfg.info as { title: string, icon: string };
    const icon = deepMix({}, defaultIcon, { img: nodeData.icon });
    const { show, img, width: imgWidth } = icon;
    const { fontSize, fontWeight } = labelCfg.style;
    const iconWidth = (show && img) ? imgWidth + iconMarginRight : 0;
    const { width, line } = getTextBounds(nodeData.title, { text: nodeData.title, fontSize, fontWeight, textIndent: iconWidth }, maxNodeSize);
    return [width + paddingLeft * 2, lineHeight * line + paddingTop * 2]
}
registerNode('mindmap-node', {
    // 自定义节点时的配置
    options: defaultOptions,
    shapeType: 'mindmap-node',
    // 文本位置
    labelPosition: 'center',
    drawShape(cfg: NodeConfig, group: IGroup): IShape {
        const { icon: defaultIcon = {}, size } = this.mergeStyle || this.getOptions(cfg) as NodeConfig;
        const nodeData = cfg.info as NodeData;
        const depth = cfg.depth as number;
        const icon = deepMix({}, defaultIcon, { img: nodeData.icon });
        const wrapper = `${this.type}-keyShape`;
        const bg = `${this.type}-background`;
        const newNodeFn = new Shape(group);
        const rest = { draggable: depth > 0 };
        group['shapeMap'][wrapper] = newNodeFn.Rect(bg, this.getBgStyle!(cfg), rest);
        const { show, img } = icon;
        const iconName = `${this.type}-icon`;
        const labelName = `${this.type}-label`;
        if (show && img) {
            group['shapeMap'][iconName] = newNodeFn.Image('icon', this.getIconStyle!(cfg), rest);
        }
        group['shapeMap'][labelName] = newNodeFn.Text('title', this.getLabelStyle!(cfg), size, rest)
        return group['shapeMap'][wrapper];
    },
    /**
     * 获取节点的样式，供基于该节点自定义时使用
     * @param {Object} cfg 节点数据模型
     * @return {Object} 节点的样式
     */
    getBgStyle: function getShapeStyle(cfg) {
        const { style } = (this.mergeStyle || this.getOptions(cfg));
        const [width, height] = this.getSize(cfg);
        var styles = __assign({
            x: 0,
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
        const { icon, lineHeight, paddingLeft, paddingTop } = (this.mergeStyle || this.getOptions(cfg));
        var styles = __assign({
            height: Math.min(lineHeight, icon.height),
            x: paddingLeft,
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
        const { labelCfg, paddingLeft, icon, iconMarginRight } = (this.mergeStyle || this.getOptions(cfg));
        const info = cfg.info as { title: string, icon: string };
        const { show, img, width: iconWidth } = icon;
        var styles = __assign({
            x: paddingLeft,
            y: diffY + (isWin ? -1 : 0),
            text: info.title,
            textIndent: (show && img) ? iconWidth + iconMarginRight : 0,
            cursor: 'pointer'
        }, labelCfg.style);

        return styles;
    },
    getAnchorPoints(cfg) {
        return [
            [1, 0.5],
            [0, 0.5]
        ]
    },
}, 'single-node');
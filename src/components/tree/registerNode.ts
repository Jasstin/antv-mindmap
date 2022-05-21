import G6, {IGroup, IShape, ModelConfig, Modes} from "@antv/g6";
import {
    themeColor,
    themeColor_sub,
    fontColor_root,
    fontColor_sub,
    radius,
    paddingH,
    paddingV,
    branch,
    branchColor, globalFontSize
} from "../variable";

enum textBaseline {
    top = "top"
}

const {
    Util
} = G6;

function drawAddBtn(group: IGroup, params: { width: number, height: number, fillColor: string, fontColor: string, fontSize: number }) {
    const r = params.height / 5
    const circleStyle = {x: params.width + r, y: params.height / 2, r, fill: params.fillColor}
    const textStyle = {
        x: params.width + 2.5,
        y: r - 1.5,
        text: '+',
        fill: params.fontColor,
        fontSize: params.fontSize,
        fontWeight: 600,
        textBaseline: textBaseline.top,
        cursor: 'point'
    }
    // const container = group.addGroup({name: 'add-btn', visible: false, capture: true})
    // container?.addShape('circle', {attrs: circleStyle})
    // container?.addShape('text', {attrs: textStyle})
}

function drawCollapse(group: IGroup, params: { width, height, collapseNum }) {
    const fontSize = 14
    if (params.collapseNum > 99) params.collapseNum = '...'
    const widthHeight = Util.getTextSize(params.collapseNum + '', fontSize);
    const r = widthHeight[0] / 2 + 4
    const lineStyle = {
        x: params.width + 1,
        y: params.height / 2 - 1,
        width: 15,
        height: 2,
        fill: themeColor.value,
    }
    const circleStyle = {
        x: params.width + lineStyle.width + r + 3,
        y: params.height / 2 - r / 2 + 3,
        r,
        fill: 'transparent',
        stroke: themeColor.value,
        lineWidth: 2
    }
    const textStyle = {
        x: params.width + lineStyle.width + r - widthHeight[0] / 2 + 3,
        y: params.collapseNum === '...' ? params.height / 2 - r / 2 - 8 : params.height / 2 - r / 2 - 4,
        text: params.collapseNum,
        fill: themeColor.value,
        fontSize,
        fontWeight: 600,
        textBaseline: textBaseline.top,
        cursor: 'point'
    }
    const container = group.addGroup({name: 'add-btn', visible: true, capture: true})
    container?.addShape('circle', {attrs: circleStyle})
    container?.addShape('rect', {attrs: lineStyle})
    container?.addShape('text', {attrs: textStyle})
}

// 根节点
G6.registerNode(
    'dice-mind-map-root', {
        draw(cfg, group): IShape {
            const fontSize = cfg?.fontSize as number;
            const FillColor = themeColor.value
            const FontColor = fontColor_root.value
            const {width, height, _children} = cfg
            const RectStyle = {x: 0, y: 0, width, height, radius, fill: FillColor}
            const TextStyle = {
                x: paddingV,
                y: paddingH - 1,
                text: cfg?.label,
                fill: FontColor,
                fontSize: fontSize,
                textBaseline: textBaseline.top
            }
            const container = group?.addShape('rect', {attrs: RectStyle, name: 'big-rect-shape', zIndex: 0}) as IShape
            group?.addShape('text', {attrs: TextStyle, name: 'text-shape', zIndex: 1})
            drawAddBtn(group, {width, height, fillColor: FillColor, fontColor: FontColor, fontSize})
            if (cfg.collapse) {
                drawCollapse(group, {width, height, collapseNum: _children.length})
            }
            return container;
        },
        getAnchorPoints() {
            return [
                [0, 0.5],
                [1, 0.5],
            ];
        },
    }
);
G6.registerNode(
    'dice-mind-map-sub', {
        drawShape: function drawShape(cfg, group) {
            if (!cfg) return
            const fontSize = cfg.fontSize as number;
            const {width, height, _children} = cfg
            const RectStyle = {x: 0, y: 0, width, height, radius, fill: themeColor_sub.value}
            const TextStyle = {
                x: paddingV,
                y: paddingH - 1,
                text: cfg.label,
                fill: fontColor_sub.value,
                fontSize,
                textBaseline: 'top',
                lineHeight: fontSize + paddingH
            }
            const container = group?.addShape('rect', {attrs: RectStyle, name: 'big-rect-shape', zIndex: 0})
            group?.addShape('text', {attrs: TextStyle, name: 'text', zIndex: 1})
            drawAddBtn(group, {
                width,
                height,
                fillColor: themeColor_sub.value,
                fontColor: fontColor_sub.value,
                fontSize
            })
            if (cfg.collapse) {
                drawCollapse(group, {width, height, collapseNum: _children.length})
            }
            return container;
        },
        getAnchorPoints() {
            return [
                [0, 0.5],
                [1, 0.5],
            ];
        },
    }
);
G6.registerNode(
    'dice-mind-map-leaf', {
        draw(cfg, group) {
            if (!cfg) return
            const fontSize = cfg.fontSize as number;
            const {width, height, _children} = cfg
            const RectStyle = {x: 0, y: 0, width, height}
            const TextStyle = {
                x: paddingV,
                y: paddingH,
                text: cfg.label,
                fill: fontColor_sub.value,
                fontSize,
                textBaseline: 'top',
                lineHeight: fontSize + paddingH
            }
            const container = group?.addShape('rect', {attrs: RectStyle, name: 'big-rect-shape', zIndex: 0})
            group?.addShape('text', {attrs: TextStyle, name: 'text', zIndex: 1})
            drawAddBtn(group, {
                width,
                height,
                fillColor: themeColor.value,
                fontColor: fontColor_root.value,
                fontSize: fontSize + 1
            })
            if (cfg.collapse) {
                drawCollapse(group, {width, height, collapseNum: _children.length})
            }
            return container;
        },
        getAnchorPoints() {
            return [
                [0, 0.5],
                [1, 0.5],
            ];
        },
    }
);
G6.registerEdge('hvh', {
    draw(cfg, group) {
        if (!cfg || !group) return
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;
        const shape = group.addShape('path', {
            attrs: {
                stroke: branchColor.value,
                lineWidth: branch.value,
                path: [
                    ['M', startPoint?.x, startPoint?.y],
                    ['L', endPoint?.x ?? 0 / 3 + (2 / 3) * (startPoint?.x ?? 1), startPoint?.y], // 三分之一处
                    ['L', endPoint?.x ?? 0 / 3 + (2 / 3) * (startPoint?.x ?? 1), endPoint?.y], // 三分之二处
                    ['L', endPoint?.x, endPoint?.y],
                ],
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'path-shape',
        });
        return shape;
    },
});

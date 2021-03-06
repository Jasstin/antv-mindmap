import G6, {IGroup, IShape} from "@antv/g6";
import {
    themeColor,
    themeColor_sub,
    fontColor_root,
    fontColor_sub,
    radius,
    paddingH,
    paddingV,
    branch,
    branchColor, globalTree
} from "../variable";
import Color from 'color';
import {collapse} from "./methods";

let activeStrokeColor = Color(themeColor.value).fade(0.2).string();

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
    if (params.collapseNum === 0) return
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
        lineWidth: 2,
        cursor: 'pointer'
    }
    const textStyle = {
        x: params.width + lineStyle.width + r - widthHeight[0] / 2 + 3,
        y: params.collapseNum === '...' ? params.height / 2 - r / 2 - 8 : params.height / 2 - r / 2 - 4,
        text: params.collapseNum,
        fill: themeColor.value,
        fontSize,
        fontWeight: 600,
        textBaseline: textBaseline.top,
        cursor: 'pointer'
    }
    const container = group.addGroup({name: 'add-btn', visible: true, capture: true})
    container?.addShape('rect', {attrs: lineStyle})
    container?.addShape('circle', {attrs: circleStyle, action: 'expand'})
    container?.addShape('text', {attrs: textStyle, action: 'expand'})
}

// ?????????
G6.registerNode(
    'dice-mind-map-root', {
        draw(cfg, group): IShape {
            const fontSize = cfg?.fontSize as number;
            const FillColor = themeColor.value
            const FontColor = fontColor_root.value
            const {width, height, _children, isCurrentSelected} = cfg
            const RectStyle = {
                x: 0,
                y: 0,
                width,
                height,
                radius,
                fill: FillColor,
                cursor: 'pointer',
                stroke: isCurrentSelected ? activeStrokeColor : 'transparent',
                lineWidth: 2,
            }
            const TextStyle = {
                x: paddingV,
                y: paddingH - 1,
                text: cfg?.label,
                fill: FontColor,
                fontSize: fontSize,
                textBaseline: textBaseline.top,
                cursor: 'pointer'
            }
            const container = group?.addShape('rect', {attrs: RectStyle, name: 'big-rect-shape', zIndex: 0}) as IShape
            group?.addShape('text', {attrs: TextStyle, name: 'text-shape', zIndex: 1})
            drawAddBtn(group, {width, height, fillColor: FillColor, fontColor: FontColor, fontSize})
            if (cfg.collapse) {
                drawCollapse(group, {width, height, collapseNum: _children.length})
            }
            return container;
        },
        setState: function (name, state, node) {
            const group = node.getContainer();
            let wrapper = group.get('children').filter(t => t.get('name') === 'big-rect-shape')[0]
            if (name === 'hover') {
                let hoverColor = Color(themeColor.value).fade(0.5).string();
                if (state) {
                    wrapper?.attr('stroke', hoverColor)
                } else {
                    if (node.get('model').isCurrentSelected) {
                        wrapper?.attr('stroke', activeStrokeColor)
                    } else {
                        wrapper?.attr('stroke', 'transparent')
                    }
                }
            } else if (name === 'selected') {
                wrapper?.attr('stroke', state ? activeStrokeColor : 'transparent')
            }
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
            const {
                width,
                height,
                _children,
                style,
                isCurrentSelected
            } = cfg
            const RectStyle = Object.assign({}, {
                x: 0,
                y: 0,
                width,
                height,
                radius,
                fill: themeColor_sub.value,
                cursor: 'pointer',
                stroke: isCurrentSelected ? activeStrokeColor : 'transparent',
                lineWidth: 2
            }, style)
            const TextStyle = Object.assign({}, {
                x: paddingV,
                y: paddingH - 1,
                text: cfg.label,
                fill: fontColor_sub.value,
                fontSize,
                textBaseline: 'top',
                lineHeight: fontSize + paddingH,
                cursor: 'pointer'
            }, style)
            const container = group?.addShape('rect', {
                attrs: RectStyle,
                name: 'big-rect-shape',
                zIndex: 0,
                draggable: true,
            })
            group?.addShape('text', {attrs: TextStyle, name: 'text', zIndex: 1, draggable: true})
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
        setState: function (name, state, node) {
            const group = node.getContainer();
            let wrapper = group.get('children').filter(t => t.get('name') === 'big-rect-shape')[0]
            if (name === 'hover') {
                let hoverColor = Color(themeColor.value).fade(0.5).string();
                if (state) {
                    wrapper?.attr('stroke', hoverColor)
                } else {
                    if (node.get('model').isCurrentSelected) {
                        wrapper?.attr('stroke', activeStrokeColor)
                    } else {
                        wrapper?.attr('stroke', 'transparent')
                    }
                }
            } else if (name === 'selected') {
                wrapper?.attr('stroke', state ? activeStrokeColor : 'transparent')
            }
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
            const {
                width,
                height,
                _children,
                style,
                isCurrentSelected
            } = cfg as { width: number, height: number, _children: any[], isCurrentSelected: any[] }
            const RectStyle = Object.assign({}, {
                x: 0, y: 0, width, height, cursor: 'pointer',
                radius,
                stroke: isCurrentSelected ? activeStrokeColor : 'transparent',
                lineWidth: 2,
                fill: 'transparent'
            }, style)
            const TextStyle = Object.assign({}, {
                x: paddingV,
                y: paddingH,
                text: cfg.label,
                fill: fontColor_sub.value,
                fontSize,
                textBaseline: 'top',
                lineHeight: fontSize + paddingH,
                cursor: 'pointer',
            }, style)
            const expandWidth = _children.length ? 80 : 30
            const container = group?.addShape('rect', {
                attrs: RectStyle,
                name: 'big-rect-shape',
                zIndex: 0,
                draggable: true
            })
            group?.addShape('text', {attrs: TextStyle, name: 'text', zIndex: 1, draggable: true})
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
        setState: function (name, state, node) {
            const group = node.getContainer();
            let wrapper = group.get('children').filter(t => t.get('name') === 'big-rect-shape')[0]
            if (name === 'hover') {
                let hoverColor = Color(themeColor.value).fade(0.5).string();
                if (state) {
                    wrapper?.attr('stroke', hoverColor)
                } else {
                    if (node.get('model').isCurrentSelected) {
                        wrapper?.attr('stroke', activeStrokeColor)
                    } else {
                        wrapper?.attr('stroke', 'transparent')
                    }
                }
            } else if (name === 'selected') {
                wrapper?.attr('stroke', state ? activeStrokeColor : 'transparent')
            }
        },
    }
);
G6.registerEdge('hvh', {
    draw(cfg, group) {
        if (!cfg || !group) return
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;
        let dist = endPoint.y < startPoint.y ? 10 : -10;
        if (endPoint.y === startPoint.y) {
            dist = 0;
        }
        const shape = group.addShape('path', {
            attrs: {
                stroke: branchColor.value,
                lineWidth: branch.value,
                opacity: cfg.style.opacity == null ? 1 : cfg.style.opacity,
                path: [
                    ['M', startPoint.x, startPoint.y],
                    ['L', endPoint.x / 3 + (2 / 3) * (startPoint.x), startPoint.y], // ???????????????
                    ['L', endPoint.x / 3 + (2 / 3) * (startPoint.x), startPoint.y + (endPoint.y - startPoint.y) + dist],
                    ['Q', endPoint.x / 3 + (2 / 3) * (startPoint.x), startPoint.y + (endPoint.y - startPoint.y), endPoint.x / 3 + (2 / 3) * (startPoint.x) + 10, endPoint.y], // ???????????????
                    ['L', endPoint.x, endPoint.y],
                ],
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'path-shape',
        });
        return shape;
    },
});

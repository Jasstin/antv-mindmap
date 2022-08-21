import G6, { IGroup, IShape } from "@antv/g6";
import {
  themeColor,
  radius,
  paddingH,
  paddingV,
  branch,
  branchColor, globalTree
} from "../variable";
import Color from 'color';
import { collapse } from "./methods";

let activeStrokeColor = Color(themeColor.value).fade(0.2).string();

enum textBaseline {
  top = "top"
}

const {
  Util
} = G6;

function drawAddBtn(group: IGroup, params?: { width?: number, height?: number, fillColor?: string, fontColor?: string, fontSize?: number }) {
  if (!params) {
    params = {}
  }
  params.width = 30
  params.height = 30
  params.fontSize = 14
  params.fillColor = themeColor.value
  params.fontColor = themeColor.value
  const r = params.height / 5
  const circleStyle = { x: params.width + r, y: params.height / 2, r, fill: params.fillColor }
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

function drawCollapse(group: IGroup, params: { width?, height?, collapseNum }) {
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
  const container = group.addGroup({ name: 'add-btn', visible: true, capture: true })
  container?.addShape('rect', { attrs: lineStyle })
  container?.addShape('circle', { attrs: circleStyle, action: 'expand' })
  container?.addShape('text', { attrs: textStyle, action: 'expand' })
}

function getAttribute(cfg) {
  const { width, height, _children, isCurrentSelected, nameHeight, fontSize, descFontSize, descHeight, FillColor, FontColor } = cfg
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
    y: paddingH,
    text: cfg?.label,
    fill: FontColor,
    fontSize: fontSize,
    textBaseline: textBaseline.top,
    cursor: 'pointer',
    fontWeight: 600,
    lineHeight: paddingV + fontSize
  }
  const DescWrapper = {
    x: 0,
    y: nameHeight,
    width,
    height: descHeight,
    radius: [0, 0, radius, radius],
    fill: "rgba(255,255,255,0.3)",
    cursor: 'pointer',
    stroke: 'transparent',
    lineWidth: 2,
  }
  const DescText = {
    x: paddingV,
    y: paddingV + nameHeight,
    text: cfg?.desc,
    fill: FontColor,
    fontSize: descFontSize,
    textBaseline: textBaseline.top,
    cursor: 'pointer',
    lineHeight: paddingV + descFontSize
  }
  return { RectStyle, TextStyle, DescWrapper, DescText }
}

function buildNode(cfg, group) {
  const { RectStyle, TextStyle, DescWrapper, DescText } = getAttribute(cfg);
  const container = group?.addShape('rect', { attrs: RectStyle, name: `wrapper`, zIndex: 0 }) as IShape
  group?.addShape('text', { attrs: TextStyle, name: `title`, zIndex: 1 })
  if (cfg.desc) {
    group?.addShape('rect', { attrs: DescWrapper, name: `desc-wrapper`, zIndex: 0 })
    group?.addShape('text', { attrs: DescText, name: `desc`, zIndex: 1 })
  }
  if (cfg.collapse) {
    console.log({ collapseNum: cfg._children?.length, width: RectStyle.width, height: RectStyle.height })
    drawCollapse(group, { collapseNum: cfg._children?.length, width: RectStyle.width, height: RectStyle.height })
  }
  return container
}

function setState(name, state, node) {
  const group = node.getContainer();
  let wrapper = group.get('children').filter(t => t.get('name') === 'wrapper')[0]
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
}
// 根节点
G6.registerNode(
  'dice-mind-map-root', {
  draw(cfg, group): IShape {
    const container = buildNode(cfg, group);
    drawAddBtn(group)
    return container;
  },
  setState,
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
    const container = buildNode(cfg, group);
    drawAddBtn(group)
    return container;
  },
  setState,
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
    const container = buildNode(cfg, group);
    drawAddBtn(group)
    return container;
  },
  getAnchorPoints() {
    return [
      [0, 0.5],
      [1, 0.5],
    ];
  },
  setState
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
          ['L', endPoint.x / 3 + (2 / 3) * (startPoint.x), startPoint.y], // 三分之一处
          ['L', endPoint.x / 3 + (2 / 3) * (startPoint.x), startPoint.y + (endPoint.y - startPoint.y) + dist],
          ['Q', endPoint.x / 3 + (2 / 3) * (startPoint.x), startPoint.y + (endPoint.y - startPoint.y), endPoint.x / 3 + (2 / 3) * (startPoint.x) + 10, endPoint.y], // 三分之二处
          ['L', endPoint.x, endPoint.y],
        ],
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'path-shape',
    });
    return shape;
  },
});

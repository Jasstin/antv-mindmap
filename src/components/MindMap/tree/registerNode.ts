import G6, { IGroup, IShape } from "@antv/g6";
import {
  themeColor,
  radius,
  paddingH,
  paddingV,
  branch,
  branchColor,
  fontColor_root,
  hoverStrokeColor,
  activeStrokeColor,
  isCurrentEdit
} from "../variable";

enum textBaseline {
  top = "top"
}

const {
  Util
} = G6;

function drawHandleBtn(group: IGroup, cfg, type) {
  const { style: { width, height, opacity = 1 }, _children } = cfg
  const fontSize = 14
  const text = {
    'add': '+',
    'collapse': '<',
    'expand': _children.length + '' || '0'
  }[type]
  const widthHeight = Util.getTextSize(text, fontSize);
  const isExpand = type === 'expand';
  const r = widthHeight[0] / 2 + 4
  const lineStyle = isExpand ? {
    x: width + 1,
    y: height / 2 - 1,
    width: 10,
    height: 2,
    fill: themeColor.value,
    opacity
  } : { width: 0 }
  const handleStyle = {
    x: width,
    y: 0,
    width: widthHeight[0] + lineStyle.width + r + 3,
    height,
    fill: 'transparent'
  }
  const fill = isExpand ? 'transparent' : themeColor.value
  const stroke = isExpand ? themeColor.value : 'transparent'
  const textColor = isExpand ? themeColor.value : fontColor_root.value
  const visible = isExpand ? true : false
  const circleStyle = {
    x: width + lineStyle.width + r + 3,
    y: height / 2,
    r,
    fill,
    stroke,
    lineWidth: 2,
    cursor: 'pointer',
    opacity
  }
  const textStyle = {
    x: width + lineStyle.width + r - widthHeight[0] / 2 + 3,
    y: height / 2 - r / 2 - 4,
    text,
    fill: textColor,
    fontSize,
    fontWeight: 600,
    textBaseline: textBaseline.top,
    cursor: 'pointer',
    opacity
  }
  const container = group.addGroup({ name: type, visible, capture: true, action: type })
  container?.addShape('rect', { attrs: lineStyle })
  container?.addShape('rect', { attrs: handleStyle })
  container?.addShape('circle', { attrs: circleStyle, action: type })
  container?.addShape('text', { attrs: textStyle, action: type })
}

function getAttribute(cfg) {
  const { style: { width, height, nameHeight, nameLineHeight, fontSize, descFontSize, descHeight, FillColor, FontColor, opacity = 1, stroke, strokeColor } } = cfg
  const RectStyle = {
    x: 0,
    y: 0,
    width,
    height,
    radius,
    fill: FillColor,
    cursor: 'pointer',
    stroke: strokeColor,
    lineWidth: stroke,
    opacity
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
    lineHeight: nameLineHeight,
    opacity
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
    opacity
  }
  const DescText = {
    x: paddingV,
    y: paddingV + nameHeight,
    text: cfg?.desc,
    fill: FontColor,
    fontSize: descFontSize,
    textBaseline: textBaseline.top,
    cursor: 'pointer',
    lineHeight: paddingV + descFontSize,
    opacity
  }
  return { RectStyle, TextStyle, DescWrapper, DescText }
}

function buildNode(cfg, group) {
  const { RectStyle, TextStyle, DescWrapper, DescText } = getAttribute(cfg);
  const { depth, collapse } = cfg
  const container = group?.addShape('rect', { attrs: RectStyle, name: `wrapper`, zIndex: 0, draggable: depth > 0 }) as IShape
  group?.addShape('text', { attrs: TextStyle, name: `title`, zIndex: 1, draggable: depth > 0 })
  if (cfg.desc) {
    group?.addShape('rect', { attrs: DescWrapper, name: `desc-wrapper`, zIndex: 0, draggable: depth > 0 })
    group?.addShape('text', { attrs: DescText, name: `desc`, zIndex: 1, draggable: depth > 0 })
  }
  //  绘制操作按钮
  drawHandleBtn(group, cfg, 'add')
  if (cfg.children.length > 0 || cfg._children.length > 0) {
    drawHandleBtn(group, cfg, collapse ? 'expand' : 'collapse')
  }
  return container
}
const getNode = (group, name) => group.get('children').filter(t => t.get('name') === name)[0]
const getCollapseBtn = group => getNode(group, 'collapse')
const getWrapper = group => getNode(group, 'wrapper')
const getAddBtn = group => getNode(group, 'add')
let timer;
function handleNodeHover(state, node) {
  // 鼠标移上显示折叠按钮
  if (isCurrentEdit.value) return
  const group = node.getContainer();
  const isCurrentSelected = node.hasState('selected');
  let collapseBtn = getCollapseBtn(group)
  const visible = state && !isCurrentSelected;
  collapseBtn && collapseBtn[visible ? 'show' : 'hide']()
  // 节点hover状态
  let wrapper = getWrapper(group)
  let hoverColor = 'transparent';
  if (state && !isCurrentSelected) hoverColor = hoverStrokeColor.value;

  //  如果当前节点不是选中状态才操作hover状态
  if (!isCurrentSelected) {
    wrapper?.attr('stroke', hoverColor);
  }
}

function handleNodeSelected(state, node) {
  // 选中节点置于最上方
  node[state ? 'toFront' : 'toBack']()
  // 选中的节点显示添加按钮
  const group = node.getContainer();
  let addBtn = getAddBtn(group)
  let collapseBtn = getCollapseBtn(group)
  collapseBtn?.hide()
  // 非折叠状态显示添加按钮
  if (!(node.get('model').collapse && node.get('model')._children.length)) {
    addBtn?.[state ? 'show' : 'hide']()
  }
  if (isCurrentEdit.value) addBtn?.hide()
  // 设置节点边框颜色
  let wrapper = group.get('children').filter(t => t.get('name') === 'wrapper')[0]
  wrapper?.attr('stroke', state ? activeStrokeColor.value : 'transparent')
}

// 根节点
G6.registerNode(
  'mindmap-node', {
  draw(cfg, group): IShape {
    const container = buildNode(cfg, group);
    return container;
  },
  setState(name, state, node) {
    if (name === 'hover') handleNodeHover(state, node)
    if (name === 'selected') handleNodeSelected(state, node)
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
    let dist = endPoint.y < startPoint.y ? 10 : -10;
    if (endPoint.y === startPoint.y) {
      dist = 0;
    }
    const shape = group.addShape('path', {
      attrs: {
        cursor: 'pointer',
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
      zIndex: 0,
    });
    return shape;
  },
});

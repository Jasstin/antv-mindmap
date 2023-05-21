import G6, { IGroup, IShape, registerNode } from "@antv/g6";
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
  isCurrentEdit,
  handleBtnAreaWidth,
} from "../../variable";
import Shape from "../../nodeTemplate/draw/shape";
import getTextBounds from "../../nodeTemplate/utils/getTextBounds";
import { isSafari, isWin } from "../../utils/testDevice";
// startY 由于不同浏览器的展示规则不一致，导致垂直居中会存在1px误差，所以需要细调
const diffY = isSafari ? -3 : isWin ? 2 : 0;


function drawHandleBtn(group: IGroup, cfg, type) {
  const {
    style: { width, height, opacity = 1, beforeWidth },
    _children,
  } = cfg;
  const isExpand = type === "expand";
  const visible = isExpand ? true : false;
  const textColor = isExpand ? themeColor.value : fontColor_root.value;
  const text = {
    add: "+",
    collapse: "-",
    expand: _children.length + "" || "0",
  }[type];
  const lineStyle = isExpand
    ? {
      x: beforeWidth + width,
      y: height / 2,
      width: 10,
      height: 2,
      fill: themeColor.value,
      opacity,
    }
    : {
      x: beforeWidth + width,
      y: 0,
      width: 20,
      height,
      fill: 'transparent',
      opacity,
    };
  const textStyle = {
    text,
    fill: textColor,
    cursor: "pointer",
    opacity,
    fontSize: isExpand ? 10 : 14,
    lineHeight: 18
  };
  const fill = isExpand ? "transparent" : themeColor.value;
  const stroke = isExpand ? themeColor.value : "transparent";
  const { width: textWidth, height: textHeight } = getTextBounds(text, textStyle)
  const startX = width + (isExpand ? lineStyle.width : 3);
  const startY = height / 2 - textHeight / 2;
  const size = textWidth + 5;
  const BgStyle = {
    x: beforeWidth + startX,
    y: startY,
    radius: 9,
    width: size < textHeight ? textHeight : size,
    height: textHeight,
    fill,
    stroke,
    cursor: "pointer",
    opacity,
  };
  const container = group.addGroup({
    name: type,
    visible,
    capture: true,
    action: type,
  });
  const newNode = new Shape(container);
  newNode.Rect("line", lineStyle, { action: type });
  newNode.Rect("action-bg", BgStyle, { action: type });
  //  safari 浏览器中< 和+ 还需要再上移1px，才会看到居中
  const diffY2 = !isExpand ? -1 : 0;
  newNode.Text("action-text", {
    x: beforeWidth + startX + size / 2 + (size < textHeight ? (textHeight - size) / 2 : 0),
    y: startY + diffY + diffY2,
    textAlign: 'center',
    ...textStyle
  }, 400, { action: type });
}

function getAttribute(cfg) {
  const {
    style: {
      width,
      height,
      nameHeight,
      fontSize,
      descFontSize,
      descHeight,
      FillColor,
      FontColor,
      opacity = 1,
      stroke,
      strokeColor,
      imageIconWidth,
      fontWeight, descFontWeight,
      beforeWidth,
      afterWidth
    },
  } = cfg;
  const ContainerStyle = {
    width:width+beforeWidth+afterWidth,
    height,
    fill: 'transparent',
    stroke: 'transparent',
    lineWidth: 0
  }
  const RectStyle = {
    x: beforeWidth,
    width,
    height,
    radius,
    fill: FillColor,
    cursor: "pointer",
    stroke: strokeColor,
    lineWidth: stroke,
    opacity,
  };
  const TextStyle = {
    x: beforeWidth + paddingH,
    y: diffY + (isWin ? -1 : 0),
    text: cfg?.label,
    fill: FontColor,
    fontSize,
    cursor: "pointer",
    fontWeight,
    opacity,
    textIndent: imageIconWidth,
  };
  const IconStyle = {
    x: beforeWidth + paddingH,
    opacity,
    img: cfg.iconPath,
    width: imageIconWidth,
    height: imageIconWidth,
  };
  const DescWrapper = {
    x: beforeWidth,
    y: nameHeight,
    width,
    height: descHeight,
    radius: [0, 0, radius, radius],
    fill: descHeight ? "rgba(255,255,255,0.3)" : "transparent",
    cursor: "pointer",
    stroke: "transparent",
    lineWidth: 2,
    opacity,
  };
  const DescText = {
    x: beforeWidth + paddingH,
    y: nameHeight,
    text: cfg?.desc,
    fill: FontColor,
    fontSize: descFontSize,
    fontWeight: descFontWeight,
    cursor: "pointer",
    opacity,
  };
  return { ContainerStyle, RectStyle, TextStyle, DescWrapper, DescText, IconStyle };
}

const getNode = (group, name) =>
  group.findAllByName(name)[0];
const getCollapseBtn = (group) => getNode(group, "collapse");
const getWrapper = (group) => getNode(group, "wrapper");
const getAddBtn = (group) => getNode(group, "add");
let timer;
function handleNodeHover(state, node) {
  // 鼠标移上显示折叠按钮
  if (isCurrentEdit.value) return;
  const group = node.getContainer();
  const isCurrentSelected = node.hasState("selected");
  let collapseBtn = getCollapseBtn(group);
  const visible = state && !isCurrentSelected;
  collapseBtn && collapseBtn[visible ? "show" : "hide"]();
  // 节点hover状态
  let wrapper = getWrapper(group);
  let hoverColor = "transparent";
  if (state && !isCurrentSelected) hoverColor = hoverStrokeColor.value;

  //  如果当前节点不是选中状态才操作hover状态
  if (!isCurrentSelected) {
    wrapper?.attr("stroke", hoverColor);
  }
}

function handleNodeSelected(state, node) {
  // 选中节点置于最上方
  node[state ? "toFront" : "toBack"]();
  // 选中的节点显示添加按钮
  const group = node.getContainer();
  let addBtn = getAddBtn(group);
  let collapseBtn = getCollapseBtn(group);
  collapseBtn?.hide();
  // 非折叠状态显示添加按钮
  if (!(node.get("model").collapse && node.get("model")._children.length)) {
    addBtn?.[state ? "show" : "hide"]();
  }
  if (isCurrentEdit.value) addBtn?.hide();
  // 设置节点边框颜色
  let wrapper = getWrapper(group);
  wrapper?.attr("stroke", state ? activeStrokeColor.value : "transparent");
}



registerNode('mindmap-node', {
  // 自定义节点时的配置
  options: {},
  shapeType: 'mindmap-node',
  // 文本位置
  labelPosition: 'center',
  draw(cfg, group): IShape {
    const visible = cfg.style.visible;
    const newNode = new Shape(group);
    if (!visible) {
      const shape = newNode.Rect('wrapper', {
        width: 0,
        height: 0,
        fill: 'transparent'
      })
      return shape
    }
    const { ContainerStyle, RectStyle, TextStyle, DescWrapper, DescText, IconStyle } =
      getAttribute(cfg);
    const maxNodeWidth = cfg.style.maxWidth;
    const { depth, collapse } = cfg;
    const rest = { draggable: depth > 0 }
    const keyShape = newNode.Rect('container', ContainerStyle, rest)
    newNode.Rect('wrapper', RectStyle, rest)
    newNode.inner()
    newNode.Image('icon', IconStyle, rest)
    newNode.Text('title', TextStyle, maxNodeWidth, rest)
    newNode.inner()
    newNode.Rect('desc-wrapper', DescWrapper, rest)
    newNode.Text('desc', DescText, maxNodeWidth, rest)
    //  绘制操作按钮
    drawHandleBtn(group, cfg, "add");
    if (cfg.children.length > 0 || cfg._children.length > 0) {
      drawHandleBtn(group, cfg, collapse ? "expand" : "collapse");
    }
    return keyShape;
  },
  getAnchorPoints(cfg) {
    return [
      [1, 0.5],
      [0, 0.5]
    ]
  },
  setState(name, state, node) {
    if (name === "hover") handleNodeHover(state, node);
    if (name === "selected") handleNodeSelected(state, node);
  },
});
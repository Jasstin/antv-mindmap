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
  isCurrentEdit,
  handleBtnAreaWidth,
} from "../variable";
import Shape from "../nodeTemplate/draw/shape";
import getTextBounds from "../nodeTemplate/utils/getTextBounds";



function drawHandleBtn(group: IGroup, cfg, type) {
  const {
    style: { width, height, opacity = 1 },
    _children,
  } = cfg;
  const isExpand = type === "expand";
  const visible = isExpand ? true : false;
  const textColor = isExpand ? themeColor.value : fontColor_root.value;
  const text = {
    add: "+",
    collapse: "<",
    expand: _children.length + "" || "0",
  }[type];
  const lineStyle = isExpand
    ? {
      x: width,
      y: height / 2,
      width: 10,
      height: 2,
      fill: themeColor.value,
      opacity,
    }
    : {
      x: width,
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
    fontSize: 14,
    lineHeight: 18
  };
  const maxWidthSize = handleBtnAreaWidth - lineStyle.width;
  const fill = isExpand ? "transparent" : themeColor.value;
  const stroke = isExpand ? themeColor.value : "transparent";
  const { width: textWidth, height: textHeight } = getTextBounds(text, textStyle, maxWidthSize)
  const startX = width + (isExpand ? lineStyle.width : 3);
  const startY = height / 2 - textHeight / 2;
  const size = textWidth + 5;
  const BgStyle = {
    x: startX,
    y: startY,
    radius: 7,
    width: size,
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
  newNode.Text("action-text", {
    x: startX + size / 2,
    y: startY + 1,
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
      fontWeight, descFontWeight
    },
  } = cfg;
  const RectStyle = {
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
    x: paddingH,
    text: cfg?.label,
    fill: FontColor,
    fontSize,
    cursor: "pointer",
    fontWeight,
    opacity,
    textIndent: imageIconWidth,
  };
  const IconStyle = {
    x: paddingH,
    opacity,
    img: cfg.iconPath,
    width: imageIconWidth,
    height: imageIconWidth,
  };
  const DescWrapper = {
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
    x: paddingH,
    y: nameHeight,
    text: cfg?.desc,
    fill: FontColor,
    fontSize: descFontSize,
    fontWeight: descFontWeight,
    cursor: "pointer",
    opacity,
  };
  return { RectStyle, TextStyle, DescWrapper, DescText, IconStyle };
}
function buildStyle(obj) {
  let res = "";
  for (let key in obj) {
    res += `${key}:${obj[key]};`;
  }
  return res;
}
function getStyle(cfg) {
  const {
    style: { fontSize, FillColor, FontColor, stroke, nameLineHeight },
  } = cfg;
  return buildStyle({
    width: "100%",
    height: "100%",
    display: "block",
    "box-sizing": `border-box`,
    "font-size": `${fontSize}px`,
    "text-align": "left",
    "border-radius": `${radius}px`,
    "z-index": 1,
    overflow: `hidden`,
    "font-weight": 600,
    color: FontColor,
    background: FillColor,
    border: `${stroke}px solid ${activeStrokeColor.value}`,
    "line-height": nameLineHeight + "px",
  });
}

function buildCanvasNode(cfg, group) {
  const { RectStyle, TextStyle, DescWrapper, DescText, IconStyle } =
    getAttribute(cfg);
  const maxNodeWidth = cfg.style.maxWidth;
  const { depth, collapse } = cfg;
  const newNode = new Shape(group);
  const rest = { draggable: depth > 0 }
  const Wrapper = newNode.Rect('wrapper', RectStyle, rest)
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
  return Wrapper;
}
function buildDomNode(cfg, group) {
  const { depth } = cfg;
  const container = group?.addShape("dom", {
    attrs: {
      width: cfg.style.width,
      height: cfg.style.height,
      html: `<div style=${getStyle(cfg)}>
      <p style="margin:0;display:flex;align-items:center"><img src="${cfg.iconPath
        }" style="width:${cfg.style.imageIconWidth}px;height:${cfg.style.imageIconWidth
        }px"/>${cfg.name}</p>
      <div style="max-height:${cfg.style.descHeight}px;overflow:overlay;">${cfg.desc
        }</div>
      </div>`,
    },
    name: `wrapper`,
    zIndex: 0,
    draggable: depth > 0,
  });
  return container;
}

const getNode = (group, name) =>
  group.get("children").filter((t) => t.get("name") === name)[0];
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
  let wrapper = group
    .get("children")
    .filter((t) => t.get("name") === "wrapper")[0];
  wrapper?.attr("stroke", state ? activeStrokeColor.value : "transparent");
}

// canvas节点
G6.registerNode("mindmap-node", {
  draw(cfg, group): IShape {
    const container = buildCanvasNode(cfg, group);
    return container;
  },
  setState(name, state, node) {
    if (name === "hover") handleNodeHover(state, node);
    if (name === "selected") handleNodeSelected(state, node);
  },
  getAnchorPoints() {
    return [
      [0, 0.5],
      [1, 0.5],
    ];
  },
});
// dom节点
G6.registerNode("dom-node", {
  draw(cfg, group): IShape {
    const container = buildDomNode(cfg, group);
    return container;
  },
  setState(name, state, node) {
    if (name === "hover") handleNodeHover(state, node);
    if (name === "selected") handleNodeSelected(state, node);
  },
  getAnchorPoints() {
    return [
      [0, 0.5],
      [1, 0.5],
    ];
  },
});
G6.registerEdge("hvh", {
  draw(cfg, group) {
    if (!cfg || !group) return;
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    let dist = endPoint.y < startPoint.y ? 10 : -10;
    if (endPoint.y === startPoint.y) {
      dist = 0;
    }
    const shape = group.addShape("path", {
      attrs: {
        cursor: "pointer",
        stroke: branchColor.value,
        lineWidth: branch.value,
        opacity: cfg.style.opacity == null ? 1 : cfg.style.opacity,
        path: [
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
        ],
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: "path-shape",
      zIndex: 0,
    });
    return shape;
  },
});

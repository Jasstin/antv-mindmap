import G6, { Graph, IGroup, IShape } from "@antv/g6";
import { defaultIconStyle, defaultTextStyle, globalTheme } from "../nodeTemplate/constant";
import Shape from "../nodeTemplate/draw/shape";
import getTextBounds from "../nodeTemplate/utils/getTextBounds";
import { isSafari, isWin } from "../utils/testDevice";
// startY 由于不同浏览器的展示规则不一致，导致垂直居中会存在1px误差，所以需要细调
const diffY = isSafari ? -3 : isWin ? 2 : 0;

enum textBaseline {
  top = "top",
}

function getStyle(text, icon, depth) {
  const _depth = Math.min(depth, 2);
  const fontSize = globalTheme['maxFontSize'] - 2 * _depth;
  const fontWeight = [600, 400, 400][_depth];
  const maxNodeSize = globalTheme.maxWidth;
  const imageIconWidth = icon ? defaultIconStyle.width : 0;
  const { width, line } = getTextBounds(text, { text, fontSize, fontWeight, textIndent: imageIconWidth }, maxNodeSize);
  const oneLineHeight = defaultTextStyle.lineHeight;
  const height = oneLineHeight * line;
  const fillColor = [globalTheme.themeColor, globalTheme.themeColor_sub, globalTheme.themeColor_leaf][_depth];
  const fontColor = [globalTheme.fontColor_root, globalTheme.fontColor_sub, globalTheme.fontColor_leaf][_depth];
  const { borderRadius, paddingTop, paddingLeft } = globalTheme;
  return {
    width: width + paddingLeft * 2 + imageIconWidth,
    height: height + paddingTop * 2,
    background: fillColor,
    color: fontColor,
    fontSize,
    fontWeight,
    maxWidth: maxNodeSize,
    paddingLeft: paddingLeft,
    borderRadius,
    paddingTop,
    lineHeight: oneLineHeight,
    imageIconWidth,
    imageIconHeight: defaultIconStyle.height
  }
}


function buildCanvasNode(cfg, group) {
  const { info, depth } = cfg;
  const style = getStyle(info.title, info.icon, depth);
  console.log(`>>>>style`,style)
  const container = group?.addShape("rect", {
    attrs: {
      x: 0,
      y: 0,
      width: style.width,
      height: style.height,
      radius: style.borderRadius,
      fill: style.background,
      cursor: "pointer",
    },
    name: `wrapper`,
    zIndex: 0,
    draggable: depth > 0,
  }) as IShape;
  if (info.icon) {
    group?.addShape("image", {
      attrs: {
        x: style.paddingLeft,
        y: style.paddingTop,
        img: info.icon,
        width: style.imageIconWidth,
        height: style.imageIconHeight,
      },
      name: `icon`,
      zIndex: 1,
      draggable: depth > 0,
    });
  }
  group?.addShape("text", {
    attrs: {
      x: style.paddingLeft,
      y: style.paddingTop,
      text: info.title,
      fill: style.color,
      fontSize: style.fontSize,
      textBaseline:'top',
      cursor: "pointer",
      fontWeight: style.fontWeight,
      lineHeight: style.lineHeight,
    },
    name: `title`,
    zIndex: 1,
    draggable: depth > 0,
  });
  return container;
}
function buildNullNode(cfg, group) {
  const newNode = new Shape(group);
  const res = newNode.Rect('wrapper', {
    width: 0,
    height: 0,
    fill: 'transparent'
  })
  return res;
}

// canvas节点
G6.registerNode("mindmap-node", {
  draw(cfg, group): IShape {
    const hide = cfg.hide || !cfg.info;
    const container = hide ? buildNullNode(cfg, group) : buildCanvasNode(cfg, group);
    return container;
  }
});
G6.registerEdge("mindmap-line", {
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

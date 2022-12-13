import {
  branch,
  branchColor,
  globalTree,
  radius,
  themeColor,
  lineType,
} from "../variable";
import G6 from "@antv/g6";
import { ref } from "vue";
const sourceId = ref(null);
const setSourceId = (id) => (sourceId.value = id);
//  检测两个节点之间的关系
const testPosition = (source, target) => {
  const tree = globalTree.value;
  const node1 = tree.findById(source);
  const node2 = tree.findById(target);
  if (!node2 || !node1) return;
  const node1Box = node1.getBBox();
  const node2Box = node2.getBBox();
  const isTop = node2Box.y + node2Box.height < node1Box.y;
  const isLeft = node2Box.x + node2Box.width < node1Box.x;
  const isRight = node1Box.x + node1Box.width < node2Box.x;
  const isBottom = node1Box.y + node1Box.height < node2Box.y;
  let res = "";
  switch (true) {
    case isTop:
      res = "top";
      break;
    case isLeft:
      res = "left";
      break;
    case isRight:
      res = "right";
      break;
    case isBottom:
      res = "bottom";
      break;
    default:
      res = "inner";
  }
  return res;
};
const smartAnchor = (source, target) => {
  const dir = testPosition(source, target);
  let tar = 0;
  let sou = 2;
  switch (dir) {
    case "top":
      tar = 3;
      sou = 1;
      break;
    case "left":
      tar = 2;
      sou = 0;
      break;
    case "bottom":
      sou = 3;
      tar = 1;
      break;
    default:
      sou = 2;
      tar = 0;
  }
  return {
    sourceAnchor: sou,
    targetAnchor: tar,
  };
};
const buildEdgeOption = (source, target, id) => {
  return {
    id,
    source,
    target,
    type: "arc",
    zIndex: 3,
    ...smartAnchor(source, target),
    style: {
      stroke: branchColor.value,
      lineWidth: branch.value,
      lineDash: [5, 5, 5],
      endArrow: {
        path: G6.Arrow.triangle(8, 12, 0), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
        d: 0,
        fill: branchColor.value,
        lineDash: false,
        lineWidth: 0,
        stroke: "transparent",
      },
    },
  };
};
export const showMoveEdge = (clientX, clientY, parentId) => {
  if (!clientX || !clientY || !parentId) {
    console.error("[MindTree error]: clientX,ClientY,parentId all need");
  }
  setSourceId(parentId);
  const tree = globalTree.value;
  const { x, y } = tree.getPointByClient(clientX, clientY);
  const model = {
    id: "moveNode",
    label: "",
    x,
    y,
    type: "rect",
    zIndex: 3,
    style: {
      width: 10,
      height: 10,
      fill: themeColor.value,
      opacity: 0.1,
    },
    anchorPoints: [
      [0, 0.5],
      [0.5, 0],
      [1, 0.5],
      [0.5, 1],
    ],
  };
  const id = `${parentId} connectTo moveNode`;
  const edgeOption = buildEdgeOption(parentId, "moveNode", id);
  const moveNode = tree
    .getNodes()
    .filter((item) => item.get("id") === "moveNode");
  const moveEdge = tree.getEdges().filter((item) => item.get("id") === id);
  if (moveNode.length && moveEdge.length) {
    tree.updateItem(moveNode[0], model);
    tree.updateItem(moveEdge[0], edgeOption);
  } else {
    tree.addItem("node", model);
    tree.addItem("edge", edgeOption);
  }
  return { moveNode: moveNode[0] };
};
export const hideMoveEdge = () => {
  const tree = globalTree.value;
  const moveNode = tree
    .getNodes()
    .filter((item) => item.get("id") === "moveNode");
  if (moveNode.length) {
    tree.removeItem(moveNode[0]);
  }
};
export const createEdge = (targetId) => {
  const tree = globalTree.value;
  const edgeOption = buildEdgeOption(
    sourceId.value,
    targetId,
    `${sourceId.value} connectTo ${targetId}`
  );
  tree.addItem("edge", edgeOption);
};
export const removeEdge = (sourceId, targetId) => {
  const tree = globalTree.value;
};
export const queryEdge = (sourceId, targetId) => {
  const tree = globalTree.value;
  const findNode = tree.find("edge", (edge) => {
    console.log(edge);
    return false;
  });
};

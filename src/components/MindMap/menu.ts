import * as TreeMethods from "./tree/methods";
import { NodeData } from "./type/NodeData";
import { isObject } from "./utils/type";
const isCanvas = (evt) =>
  evt.target && evt.target.isCanvas && evt.target.isCanvas();
const depthGt = (evt, num) => !isCanvas(evt) && evt.item._cfg.model.depth > num;
const isCanCollapse = (evt) =>
  !isCanvas(evt) &&
  !evt.item._cfg.model.collapse &&
  evt.item._cfg.model.children.length;
const isCanExpand = (evt) => !isCanvas(evt) && evt.item._cfg.model.collapse;
const nodeMenuMap = {
  add: {
    name: "add",
    title: "添加子节点",
    click: (node: NodeData) => {
      TreeMethods.addData(node?.id as string, "", true);
    },
  },
  "add-parent": {
    name: "add-parent",
    title: "添加父级节点",
    auth: (evt) => depthGt(evt, 0),
    click: (node: NodeData) => {
      TreeMethods.addParent(node?.id as string);
    },
  },
  "add-sibling": {
    name: "add-sibling",
    title: "添加兄弟节点",
    auth: (evt) => depthGt(evt, 0),
    click: (node: NodeData) => {
      TreeMethods.addSibling(node?.id as string);
    },
  },
  edit: {
    name: "edit",
    title: "编辑当前节点",
    click: (node: NodeData) => {
      TreeMethods.edit(node?.id as string);
    },
  },
  delete: {
    name: "delete",
    title: "删除当前节点",
    auth: (evt) => depthGt(evt, 0),
    click: (node: NodeData) => {
      TreeMethods.deleteNode(node?.id as string);
    },
  },
  collapse: {
    name: "collapse",
    title: "收起模型",
    auth: isCanCollapse,
    click: (node: NodeData) => {
      TreeMethods.collapse(node?.id as string);
    },
  },
  expand: {
    name: "expand",
    title: "展开模型",
    auth: isCanExpand,
    click: (node: NodeData) => {
      TreeMethods.expand(node?.id as string);
    },
  },
  "add-edge": {
    name: "add-edge",
    title: "联系",
    click: (node: NodeData) => {
      TreeMethods.addEdge(node?.id as string);
    },
  },
  enlarge: {
    name: "enlarge",
    title: "放大",
    auth: isCanvas,
    click: TreeMethods.canvasEnLarge,
  },
  ensmall: {
    name: "ensmall",
    title: "缩小",
    auth: isCanvas,
    click: TreeMethods.canvasEnSmall,
  },
  fit: {
    name: "fit",
    title: "缩放到合适大小",
    auth: isCanvas,
    click: TreeMethods.canvasFitFill,
  },
  center: {
    name: "center",
    title: "缩放到屏幕中间",
    auth: isCanvas,
    click: TreeMethods.canvasFitCenter,
  },
  download: {
    name: "download",
    title: "下载",
    auth: isCanvas,
    click: TreeMethods.downloadJepg,
  },
};
export const renderMenu = (evt): string => {
  let { menuList } = window.mindTreeConfig.propsConfig;
  // step1: 过滤出外部传入的对象，添加到nodeMenuMap
  menuList
    .filter((item) => isObject(item))
    .forEach((item) => {
      nodeMenuMap[item.name] = item;
    });
  // step2: 校验权限进行渲染
  return `<ul>${Object.keys(nodeMenuMap)
    .filter((item) =>
      nodeMenuMap[item].auth ? nodeMenuMap[item].auth(evt) : true
    ) // 权限验证
    .map((item) => nodeMenuMap[item]) // 获取数据
    .map((item) => ` <li code="${item.name}">${item.title}</li>`) // 渲染
    .join("")}</ul>`;
};

export function handleMenuClick(target, item) {
  let name = target.getAttribute("name");
  if (name) {
    nodeMenuMap[name]?.click();
  }
}

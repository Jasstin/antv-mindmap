import { isMac } from "../utils/testDevice";
import * as TreeMethods from "./methods";
const defaultHotKey = [
  {
    key: "Enter",
    label: "插入同级节点",
    Event: function (selectedNodes) {
      if (selectedNodes?.length != 1) return;
      TreeMethods.addSibling(selectedNodes[0], "");
    },
    name: "add-sibling", // 右键菜单匹配值
  },
  {
    key: "Tab",
    label: "插入子节点",
    Event: function (selectedNodes) {
      if (selectedNodes?.length != 1) return;
      TreeMethods.addData(selectedNodes[0], "");
    },
    name: "add", // 右键菜单匹配值
  },
  {
    key: "Tab",
    control: "shift",
    label: "插入父节点",
    Event: function (selectedNodes) {
      if (selectedNodes?.length != 1) return;
      TreeMethods.addParent(selectedNodes[0], "");
    },
    name: "add-parent", // 右键菜单匹配值
  },
  {
    key: "c",
    control: isMac ? "cmd" : "ctrl",
    label: "复制",
    Event: function (selectedNodes) {
      if (!selectedNodes?.length) return;
      TreeMethods.copy(selectedNodes);
    },
    name: "copy", // 右键菜单匹配值
  },
  {
    key: "x",
    control: isMac ? "cmd" : "ctrl",
    label: "剪切",
    Event: function (selectedNodes) {
      if (!selectedNodes?.length) return;
      TreeMethods.cut(selectedNodes);
    },
    name: "cut", // 右键菜单匹配值
  },
  {
    key: "v",
    control: isMac ? "cmd" : "ctrl",
    label: "粘贴",
    Event: function (selectedNodes) {
      if (selectedNodes?.length != 1) return;
      TreeMethods.paste(selectedNodes[0]);
    },
    name: "paste", // 右键菜单匹配值
  },
  {
    key: "d",
    control: isMac ? "cmd" : "ctrl",
    label: "创建副本",
    name: "create-a-copy", // 右键菜单匹配值
    Event: function (selectedNodes) {
      if (selectedNodes?.length != 1) return;
      TreeMethods.createACopy(selectedNodes[0]);
    },
  },
  {
    key: "z",
    control: isMac ? "cmd" : "ctrl",
    label: "撤销操作",
    name: "revert", // 右键菜单匹配值
    Event: function (selectedNodes) {
      TreeMethods.unDo();
    },
  },
  {
    key: "y",
    control: isMac ? "cmd" : "ctrl",
    label: "重新操作",
    name: "redo", // 右键菜单匹配值
    Event: function (selectedNodes) {
      TreeMethods.reDo();
    },
  },
  {
    key: "Backspace",
    label: "删除",
    Event: function (selectedNodes) {
      if (!selectedNodes?.length) return;
      selectedNodes.forEach((nodeId) => {
        TreeMethods.deleteNode(nodeId);
      });
    },
    name: "delete", // 右键菜单匹配值
  },
  {
    key: " ",
    label: "编辑",
    Event: function (selectedNodes) {
      if (!selectedNodes?.length) return;
      selectedNodes.forEach((nodeId) => {
        TreeMethods.edit(nodeId);
      });
    },
    name: "edit", // 右键菜单匹配值
  },
];
export default defaultHotKey;

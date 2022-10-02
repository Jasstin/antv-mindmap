import editInput from "../editInput";
import { addData, addParent, addSibling, copy, deleteNode, paste, createACopy, cut, unDo, reDo, edit } from "./methods";
var isMac = function () {
  return /macintosh|mac os x/i.test(navigator.userAgent);
}();
var defaultHotKey = [
  {
    key: 'Enter',
    label: '插入同级节点',
    Event: function (selectedNodes) {
      if (selectedNodes?.length != 1) return;
      addSibling(selectedNodes[0], "")
    },
    name: 'add-sibling', // 右键菜单匹配值
  },
  {
    key: 'Tab',
    label: '插入子节点',
    Event: function (selectedNodes) {
      if (selectedNodes?.length != 1) return;
      addData(selectedNodes[0], "")
    },
    name: 'add', // 右键菜单匹配值
  },
  {
    key: 'Tab',
    control: 'shift',
    label: '插入父节点',
    Event: function (selectedNodes) {
      if (selectedNodes?.length != 1) return;
      addParent(selectedNodes[0], "")
    },
    name: 'add-parent', // 右键菜单匹配值
  },
  {
    key: 'c',
    control: isMac ? 'cmd' : 'ctrl',
    label: '复制',
    Event: function (selectedNodes) {
      if (!selectedNodes?.length) return;
      copy(selectedNodes)
    },
    name: 'copy', // 右键菜单匹配值
  },
  {
    key: 'x',
    control: isMac ? 'cmd' : 'ctrl',
    label: '剪切',
    Event: function (selectedNodes) {
      if (!selectedNodes?.length) return;
      cut(selectedNodes)
    },
    name: 'cut', // 右键菜单匹配值
  },
  {
    key: 'v',
    control: isMac ? 'cmd' : 'ctrl',
    label: '粘贴',
    Event: function (selectedNodes) {
      if (selectedNodes?.length != 1) return;
      paste(selectedNodes[0])
    },
    name: 'paste', // 右键菜单匹配值
  },
  {
    key: 'd',
    control: isMac ? 'cmd' : 'ctrl',
    label: '创建副本',
    name: 'create-a-copy', // 右键菜单匹配值
    Event: function (selectedNodes) {
      if (selectedNodes?.length != 1) return;
      createACopy(selectedNodes[0])
    },
  },
  {
    key: 'z',
    control: isMac ? 'cmd' : 'ctrl',
    label: '撤销操作',
    name: 'revert', // 右键菜单匹配值
    Event: function (selectedNodes) {
      unDo()
    },
  },
  {
    key: 'y',
    control: isMac ? 'cmd' : 'ctrl',
    label: '重新操作',
    name: 'redo', // 右键菜单匹配值
    Event: function (selectedNodes) {
      reDo()
    },
  },
  {
    key: 'Backspace',
    label: '删除',
    Event: function (selectedNodes) {
      if (!selectedNodes?.length) return;
      selectedNodes.forEach(nodeId => {
        deleteNode(nodeId)
      })
    },
    name: 'delete', // 右键菜单匹配值
  },
  {
    key: ' ',
    label: '编辑',
    Event: function (selectedNodes) {
      if (!selectedNodes?.length) return;
      selectedNodes.forEach(nodeId => {
        edit(nodeId)
        let timer = setTimeout(() => {
          editInput._input?.focus();
          clearTimeout(timer)
        }, 300)
      })
    },
    name: 'edit', // 右键菜单匹配值
  },
]
export default defaultHotKey
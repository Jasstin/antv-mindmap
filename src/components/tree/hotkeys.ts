import {addData, addParent, addSibling, copy, deleteNode, paste, createACopy, cut, unDo, reDo} from "./methods";
import {globalTree} from "../variable";

var isMac = function () {
    return /macintosh|mac os x/i.test(navigator.userAgent);
}();
export default [
    {
        key: 'Enter',
        label: '插入同级节点',
        Event: function (selectedNodes) {
            if (selectedNodes?.length != 1) return;
            addSibling(selectedNodes[0].id, '新兄弟节点', false)
        },
        name: 'add-sibling', // 右键菜单匹配值
    },
    {
        key: 'Tab',
        label: '插入子节点',
        Event: function (selectedNodes) {
            if (selectedNodes?.length != 1) return;
            addData(selectedNodes[0].id, '新子节点', false)
        },
        name: 'add', // 右键菜单匹配值
    },
    {
        key: 'Tab',
        control: 'shift',
        label: '插入父节点',
        Event: function (selectedNodes) {
            if (selectedNodes?.length != 1) return;
            addParent(selectedNodes[0].id, '新父节点', false)
        },
        name: 'add-parent', // 右键菜单匹配值
    },
    {
        key: 'c',
        control: isMac ? 'cmd' : 'ctrl',
        label: '复制',
        Event: function (selectedNodes) {
            if (!selectedNodes?.length) return;
            let ids = selectedNodes.map(item => item.id)
            copy(ids)
        },
        name: 'copy', // 右键菜单匹配值
    },
    {
        key: 'x',
        control: isMac ? 'cmd' : 'ctrl',
        label: '剪切',
        Event: function (selectedNodes) {
            if (!selectedNodes?.length) return;
            let ids = selectedNodes.map(item => item.id)
            cut(ids)
        },
        name: 'cut', // 右键菜单匹配值
    },
    {
        key: 'v',
        control: isMac ? 'cmd' : 'ctrl',
        label: '粘贴',
        Event: function (selectedNodes) {
            if (selectedNodes?.length != 1) return;
            paste(selectedNodes[0].id)
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
            createACopy(selectedNodes[0].id)
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
            selectedNodes.forEach(item => {
                deleteNode(item.id)
            })
        },
        name: 'delete', // 右键菜单匹配值
    },
]

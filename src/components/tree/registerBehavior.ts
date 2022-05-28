import G6 from "@antv/g6";
import {cancelAllSelect, collapse, edit, expand, findData, moveToChild, selectNode} from "./methods";
import {globalTree, radius, themeColor} from "../variable";
import {throttle} from "lodash";

const showDragDiv = throttle((x, y) => {
    const Tree = globalTree.value
    let ratio = Tree.getZoom()
    let oDiv = document.getElementById('mindmap-drag-div');
    if (!oDiv) {
        oDiv = document.createElement('div')
        oDiv.id = 'mindmap-drag-div'
        document.body.appendChild(oDiv)
    }
    oDiv.style.display = 'block'
    oDiv.style.cursor = 'grabbing'
    oDiv.style.width = 40 * ratio + 'px'
    oDiv.style.height = 20 * ratio + 'px'
    oDiv.style.background = themeColor.value
    oDiv.style.borderRadius = radius * ratio + 'px'
    oDiv.style.position = 'fixed'
    oDiv.style.left = x - 40 * ratio / 2 + 'px'
    oDiv.style.top = y - 20 * ratio / 2 + 'px'
}, 30)
const hideDragDiv = () => {
    let oDiv = document.getElementById('mindmap-drag-div');
    if (oDiv) {
        oDiv.style.display = 'none'
    }
}
G6.registerBehavior('edit-mindmap', {
    dragging: false,
    selectNodeId: null,
    dragNodeId: null,
    getEvents() {
        return {
            'node:click': 'clickNode',
            'node:dblclick': 'editNode',
            'node:mouseover': 'hoverNode',
            'node:mouseleave': 'clearHoverStatus',
            'node:dragstart': 'dragStart',
            'node:contextmenu': 'contextmenu'
        };
    },
    contextmenu() {
        this.dragging = false
    },
    clickNode(evt) {
        const tree = evt.currentTarget;
        const model = evt.item.get('model');
        const name = evt.target.get('action');
        this.dragging = false
        if (name === 'expand') {
            expand(model.id)
        } else if (model.isCurrentSelected) {
            edit(model.id)
        } else {
            selectNode(model.id, !model.isCurrentSelected)
        }
    },
    editNode(evt) {
        const item = evt.item;
        const model = item.get('model');
        edit(model.id)
        this.dragging = false
    },
    hoverNode(evt) {
        const {currentTarget: tree, item: node} = evt
        if (this.dragging) return
        tree.setItemState(node, 'hover', true)
    },
    clearHoverStatus(evt) {
        const {currentTarget: tree, item: node} = evt
        tree.setItemState(node, 'hover', false)
    },
    dragStart(evt) {
        // 拖拽的节点及其所有子节点设置drag state 为true
        const {currentTarget: tree, item: node, clientX, clientY} = evt
        const id = node.get('model').id;
        this.dragging = true
        const nodePosition = {};
        this.dragNodeId = id
        if (!this.dragging) return;
        collapse(id)
        setTimeout(() => {
            tree.setItemState(node, 'drag', true)
            cancelAllSelect()
            showDragDiv(clientX, clientY)
        }, 100);
        tree.getNodes().forEach(node => {
            const nodeId = node.get('id');
            if (nodeId === id) return // 计算除拖拽节点外的其他节点
            const {x: pointX, y: pointY, width, height} = node.getBBox()
            let {x: clientX, y: clientY} = tree.getClientByPoint(pointX, pointY)
            nodePosition[nodeId] = {clientX, clientY, width, height}
        })
        window.onmousemove = (ev) => this.dragNode.call(this, {
            tree,
            clientX: ev.clientX,
            clientY: ev.clientY,
            nodePosition
        })
        window.onmouseup = (ev) => this.dragEnd.call(this, {
            tree,
            clientX: ev.clientX,
            clientY: ev.clientY,
            nodePosition
        })
    },
    dragNode({tree, clientX, clientY, nodePosition}) {
        if (!this.dragging) return
        showDragDiv(clientX, clientY)
        let nodes = []
        for (let nodeId in nodePosition) {
            let node = nodePosition[nodeId]
            /**
             * 完全碰撞： 符合条件即为两个节点完全重合，拖拽节点将成为重合节点的子级
             * */
            let coditionH_inner = clientX > node.clientX && clientX < node.clientX + node.width;
            let coditionV = clientY > node.clientY && clientY < node.clientY + node.height
            if (coditionH_inner && coditionV) {
                nodes.push(nodeId)
            }
        }
        if (nodes.length) {
            // 有重合节点,可能有多个符合条件的节点
            selectNode(nodes[0], true)
            this.selectNodeId = nodes[0]
        } else {
            // 没有完全重合节点
            cancelAllSelect()
            this.selectNodeId = null
        }
    },
    dragEnd({tree, clientX, clientY}) {
        if (!this.dragging) return
        this.dragging = false
        if (this.dragNodeId) {
            tree.setItemState(this.dragNodeId, 'drag', false)
        }
        hideDragDiv()
        if (this.selectNodeId) {
            // 节点拖拽为另一个节点的子节点
            moveToChild(this.dragNodeId, this.selectNodeId)
            this.selectNodeId = null
            cancelAllSelect()
        }
        window.onmousemove = null
        window.onmouseup = null
    }
});

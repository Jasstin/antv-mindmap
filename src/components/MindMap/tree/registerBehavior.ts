import G6 from "@antv/g6";
import {
  cancelAllSelect,
  edit,
  expand,
  findData,
  moveData,
  selectNode,
  getSelectedNodes,
  collapse,
  addData,
} from "./methods";
import {
  branch,
  branchColor,
  globalFontSize,
  globalTree,
  maxFontCount,
  paddingH,
  radius,
  themeColor,
  lineType,
  isCurrentEdit,
  isDragging,
  setIsDragging,
  hotkeys,
  controlMoveDirection,
} from "../variable";
import emitter from "../mitt";
G6.registerBehavior('default-view', {
  getEvents() {
    return {
      "node:click": "clickNode",
      "node:touchend": "clickNode",
      "node:mouseover": "hoverNode",
      "node:mouseleave": "clearHoverStatus",
    };
  },
  clickNode(evt) {
    const tree = evt.currentTarget;
    const node = evt.item;
    const model = evt.item.get("model");
    const name = evt.target.get("action");
    if (name === "expand") {
      expand(model.id);
    } else if (name === "collapse") {
      collapse(model.id);
    } else if (name === "add") {
      addData(model?.id as string, "", true);
    } else {
      if (Date.now() - this.lastClickTime < 500) return; //  如果500ms内连续点击了两次为双击行为，不做任何处理
      this.lastClickTime = Date.now();
      selectNode(model.id, !model.isCurrentSelected, false);
    }
  },
  hoverNode(evt) {
    const { currentTarget: tree, item: node } = evt;
    if (isDragging.value) return;
    tree.setItemState(node, "hover", true);
    node.toFront();
    tree.paint();
  },
  clearHoverStatus(evt) {
    let { currentTarget: tree, item: node } = evt;
    tree.setItemState(node, "hover", false);
    tree.paint();
  },
})
// pc端自定义行为
G6.registerBehavior("edit-mindmap-pc", {
  selectNodeId: null,
  dragNodeId: null,
  nodePosition: {},
  dragStatus: "",
  upClientInfo: [],
  lastClickTime: 0,
  getEvents() {
    return {
      "node:click": "clickNode",
      "node:touchend": "clickNode",
      "node:dblclick": "editNode",
      "node:mouseover": "hoverNode",
      "node:mouseleave": "clearHoverStatus",
      "node:dragstart": "dragStart",
      "canvas:click": "clickCanvas",
      "canvas:touchend": "clickCanvas",
      "edge:click": "clickEdge"
    };
  },
  clickCanvas(evt) {
    cancelAllSelect();
  },
  clickNode(evt) {
    const tree = evt.currentTarget;
    const node = evt.item;
    const model = evt.item.get("model");
    const name = evt.target.get("action");
    if (name === "expand") {
      expand(model.id);
    } else if (name === "collapse") {
      collapse(model.id);
    } else if (name === "add") {
      addData(model?.id as string, "", true);
    } else {
      if (Date.now() - this.lastClickTime < 500) return; //  如果500ms内连续点击了两次为双击行为，不做任何处理
      this.lastClickTime = Date.now();
      selectNode(model.id, !model.isCurrentSelected);
    }
  },
  clickEdge(evt) {
    const node = evt.item.get('sourceNode');
    const tree = evt.currentTarget;
    if (isDragging.value) return;
    tree.setItemState(node, "hover", true);
    node.toFront();
    tree.paint();
  },
  selectNode(evt) {
    const model = evt.item.get("model");
    selectNode(model.id, !model.isCurrentSelected);
  },
  editNode(evt) {
    const item = evt.item;
    const model = item.get("model");
    edit(model.id);
  },
  hoverNode(evt) {
    const { currentTarget: tree, item: node } = evt;
    if (isDragging.value) return;
    tree.setItemState(node, "hover", true);
    node.toFront();
    tree.paint();
  },
  clearHoverStatus(evt) {
    let { currentTarget: tree, item: node } = evt;
    tree.setItemState(node, "hover", false);
    tree.paint();
  },
  dragStart(evt) {
    // 拖拽的节点及其所有子节点设置drag state 为true
    const { currentTarget: tree, item: node, clientX, clientY } = evt;
    const id = node.get("model").id;
    setIsDragging(true);
    this.dragNodeId = id;
    const _dragnode = tree.findById(this.dragNodeId);
    //  拖拽开始的时候，需要将节点的hover状态取消掉
    tree.setItemState(id, "hover", false);
    document.documentElement.style.cursor = "grabbing";
    tree.getNodes().forEach((node) => {
      const nodeId = node.get("id");
      const { x: pointX, y: pointY, width, height } = node.getBBox();
      let { x: clientX, y: clientY } = tree.getClientByPoint(pointX, pointY);
      let model = node.get("model");
      const ratio = tree.getZoom();
      // 记录节点位置
      this.nodePosition[nodeId] = {
        clientX,
        clientY,
        width: width * ratio,
        height: height * ratio,
        depth: model.depth,
        parentId: model.parentId,
        sameLevel: model.depth === _dragnode.get("model").depth,
      };
      // 修改拖拽节点及其所有子节点的样式
      if (nodeId.indexOf(this.dragNodeId) === 0) {
        tree.updateItem(node, {
          // 节点的样式
          style: {
            opacity: 0.2,
          },
        });
        node.get("edges").forEach((edge) => {
          tree.updateItem(edge, {
            // 节点的样式
            style: {
              opacity: 0.2,
            },
          });
        });
      }
    });
    this.showDragDiv(clientX, clientY);
    let ratio = tree.getZoom();
    window.onmousemove = (ev) =>
      this.dragNode.call(this, {
        tree,
        clientX: ev.clientX,
        clientY: ev.clientY,
        width: (40 * ratio) / 2,
        height: (20 * ratio) / 2,
      });
    window.onmouseup = (ev) =>
      this.dragEnd.call(this, {
        tree,
        clientX: ev.clientX,
        clientY: ev.clientY,
      });
  },
  dragNode({ tree, clientX, clientY, width, height }) {
    if (!isDragging.value) return;
    let nodePosition = this.nodePosition;
    let nodes = [];
    for (let nodeId in nodePosition) {
      let node = nodePosition[nodeId];
      /**
       * 完全碰撞： 符合条件即为两个节点完全重合，拖拽节点将成为重合节点的子级
       * */
      let size =
        (globalFontSize[node.depth] || 12) * maxFontCount +
        paddingH * 4 +
        width * 4; // 最大横向距离=最大节点宽度+两个拖拽节点的宽度
      let parentNode = findData(node.parentId);
      let firstNode = node;
      let lastNode = node;
      if (parentNode.children.length) {
        firstNode = nodePosition[parentNode.children[0].id];
        lastNode =
          nodePosition[parentNode.children[parentNode.children.length - 1].id];
      }
      let coditionH_inner =
        clientX - width > node.clientX - width * 2 &&
        clientX + width < node.clientX + node.width + width * 2;
      let coditionV_inner =
        clientY - height > node.clientY - height * 2 &&
        clientY + height < node.clientY + node.height + height * 2;
      let coditionH_outer =
        clientX - width > node.clientX - width * 2 &&
        clientX + width < node.clientX + size + width * 2;
      let coditionV_outer =
        clientY - height > firstNode.clientY - height * 2 &&
        clientY + height < lastNode.clientY + lastNode.height + height * 2; // 所有节点的纵向区域
      if (coditionH_inner && coditionV_inner) {
        // 拖拽节点与树节点有重合部分
        nodes.push({
          nodeId: nodeId,
          inner: true,
          depth: node.depth,
          index: +nodeId.split("-").pop(),
          sameLevel: true,
          parentId: node.parentId,
        });
      } else if (coditionH_outer && coditionV_inner) {
        //     超出节点但在最大节点宽度范围内，高度在节点范围内
        nodes.push({
          nodeId: nodeId,
          inner: false,
          depth: node.depth,
          index: +nodeId.split("-").pop(),
          sameLevel: false,
          parentId: node.parentId,
        });
      } else if (
        coditionH_inner &&
        coditionV_outer &&
        clientX - width > node.clientX &&
        nodeId != node.parentId
      ) {
        // 拖拽节点在允许选中范围
        nodes.push({
          nodeId: nodeId,
          inner: false,
          depth: node.depth,
          index: +nodeId.split("-").pop(),
          sameLevel: true,
          parentId: node.parentId,
        });
      }
    }
    if (nodes.length) {
      // 有重合节点,可能有多个符合条件的节点
      let node = nodes.filter(
        (node) => node.inner || (!node.inner && !node.sameLevel)
      ) as any;
      if (node.length > 1) {
        node.sort((a, b) => {
          if (a.depth === b.depth) {
            return a.index - b.index;
          } else {
            return b.depth - a.depth;
          }
        });
      }
      if (nodes.length > 1) {
        nodes.sort((a, b) => {
          if (a.depth === b.depth) {
            return a.index - b.index;
          } else {
            return b.depth - a.depth;
          }
        });
      }
      node = node.length ? node[0] : nodes[0];
      let nodeId = node.sameLevel ? node.parentId : node.nodeId;
      if (nodeId.indexOf(this.dragNodeId) != -1) {
        cancelAllSelect();
        this.selectNodeId = null;
        this.showDragDiv(clientX, clientY, false, null);
        this.dragStatus = "";
        return; // 如果是拖拽节点或者拖拽子级，直接返回
      }
      selectNode(nodeId, true);
      this.selectNodeId = nodeId;
      this.showDragDiv(clientX, clientY, true, nodeId);
      this.dragStatus = "child";
      this.upClientInfo = [clientX, clientY];
    } else {
      cancelAllSelect();
      this.selectNodeId = null;
      this.showDragDiv(clientX, clientY, false, null);
      this.dragStatus = "";
    }
  },
  dragEnd({ tree }) {
    if (!isDragging.value) return;
    setIsDragging(false);
    document.documentElement.style.cursor = "default";
    this.hideDragDiv();
    if (this.dragStatus !== "" && this.selectNodeId) {
      const parentNode = tree.findDataById(this.selectNodeId);
      let index = 0;
      for (let i = 0, len = parentNode.children.length; i < len; i++) {
        let node = parentNode.children[i];
        if (node.id === this.dragNodeId) continue;
        if (
          this.nodePosition[node.id].clientY +
          this.nodePosition[node.id].height / 2 <
          this.upClientInfo[1]
        ) {
          index++;
        } else {
          break;
        }
      }
      emitter.emit("onDragEnd", [
        findData(this.dragNodeId),
        findData(this.selectNodeId),
        index,
      ]);
      moveData(this.selectNodeId, this.dragNodeId, index);
    }
    //    还原
    tree.getNodes().forEach((node) => {
      const nodeId = node.get("id");
      // 修改拖拽节点及其所有子节点的样式
      tree.updateItem(node, {
        // 节点的样式
        style: {
          opacity: 1,
        },
      });
      node.get("edges").forEach((edge) => {
        tree.updateItem(edge, {
          // 节点的样式
          style: {
            opacity: 1,
          },
        });
      });
    });
    cancelAllSelect();
    this.selectNodeId = null;
    this.dragStatus = "";
    this.nodePosition = {};
    window.onmousemove = null;
    window.onmouseup = null;
  },
  showDragDiv(clientX, clientY, showLine, parentId) {
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
        width: 40,
        height: 20,
        fill: themeColor.value,
        radius: radius,
        opacity: 0.6,
        cursor: "grabbing",
      },
    };
    const edgeOption = {
      id: "moveNodeEdge",
      source: parentId || "0",
      target: "moveNode",
      type: lineType.value,
      zIndex: 3,
      style: {
        stroke: branchColor.value,
        lineWidth: branch.value,
        opacity: showLine ? 0.6 : 0,
        cursor: "grabbing",
      },
    };
    const moveNode = tree
      .getNodes()
      .filter((item) => item.get("id") === "moveNode");
    const moveEdge = tree
      .getEdges()
      .filter((item) => item.get("id") === "moveNodeEdge");
    if (moveNode.length && moveEdge.length) {
      tree.updateItem(moveNode[0], model);
      tree.updateItem(moveEdge[0], edgeOption);
    } else {
      tree.addItem("node", model);
      tree.addItem("edge", edgeOption);
    }
    return { moveNode: moveNode[0] };
  },
  hideDragDiv() {
    const tree = globalTree.value;
    const moveNode = tree
      .getNodes()
      .filter((item) => item.get("id") === "moveNode");
    if (moveNode.length) {
      tree.removeItem(moveNode[0]);
    }
  },
});

G6.registerBehavior("double-finger-drag-canvas", {
  getEvents: function getEvents() {
    return {
      wheel: "onWheel",
    };
  },
  reCalcDir: true,
  timer: null,
  onWheel: function onWheel(ev) {
    const graph = globalTree.value;
    if (ev.ctrlKey) {
      const canvas = graph.get("canvas");
      const point = canvas.getPointByClient(ev.clientX, ev.clientY);
      let ratio = graph.getZoom();
      if (ev.wheelDelta > 0) {
        ratio = ratio + ratio * 0.05;
      } else {
        ratio = ratio - ratio * 0.05;
      }
      graph.zoomTo(ratio, {
        x: point.x,
        y: point.y,
      });
    } else {
      let direction = "all";
      let x = ev.deltaX || ev.movementX;
      let y = ev.deltaY || ev.movementY;
      if (controlMoveDirection.value) {
        direction = Math.abs(x) < Math.abs(y) ? "v" : "h";
        this.reCalcDir = false;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.reCalcDir = true;
        }, 1000);
      }
      if (!y && navigator.userAgent.indexOf("Firefox") > -1)
        y = (-ev.wheelDelta * 125) / 3;
      if (direction === "h") {
        y = 0;
      } else if (direction === "v") {
        x = 0;
      }
      graph.translate(-x, -y);
    }
    ev.preventDefault();
  },
});

G6.registerBehavior("my-shortcut", {
  focusCanvasId: "mxs-mindmap_container",
  getEvents: function getEvents() {
    return {
      keydown: "handleKeydown",
    };
  },
  handleKeydown(evt) {
    if (
      document.activeElement?.id !== this.focusCanvasId ||
      isCurrentEdit.value
    )
      return;
    const { key, shiftKey, ctrlKey, altKey, metaKey } = evt;
    let handler = hotkeys.value?.filter((item) => item.key === key) || [];
    if (shiftKey || ctrlKey || altKey || metaKey) {
      if (shiftKey) {
        handler = handler.filter((item) => item.control?.indexOf("shift") > -1);
      }
      if (ctrlKey) {
        handler = handler.filter((item) => item.control?.indexOf("ctrl") > -1);
      }
      if (metaKey) {
        handler = handler.filter((item) => item.control?.indexOf("cmd") > -1);
      }
      if (altKey) {
        handler = handler.filter((item) => item.control?.indexOf("alt") > -1);
      }
    } else if (handler.length === 1 && handler[0].control) {
      handler = [];
    }
    if (isCurrentEdit.value) return;
    if (handler.length) {
      // 识别到快捷键，处理快捷键
      evt.preventDefault(); // 禁止默认事件
      handler[0].Event.call(this, getSelectedNodes());
    }
  },
});

// 移动端自定义行为
G6.registerBehavior("mobile-behavior", {
  selectNodeId: null,
  dragNodeId: null,
  nodePosition: {},
  dragStatus: "",
  upClientInfo: [],
  readyToDrag: false,
  clickNumber: 0,
  timer: null,
  getDefaultCfg(): object {
    return {
      onClick: () => {},
      onDragEnd: () => {},
      dragWaitTime: 1000,
      clickDuring: 1000
    };
  },
  getEvents() {
    return {
      "node:touchstart": "handleTouchStart",
      "canvas:touchmove": "dragNode",
      "node:touchend": "handleTouchEnd",
      "touchend":"dragEnd"
    };
  },
  handleTouchStart(evt) {
    this.readyToDrag = true;
    let timer = setTimeout(() => {
      if (this.readyToDrag) {
        this.dragStart(evt); // 长按拖拽
        clearTimeout(timer);
      }
    }, this.get('dragWaitTime'));
  },
  handleTouchEnd(evt) {
    this.readyToDrag = false;
    if (!isDragging.value && evt.item) {
      this.clickNode(evt); // 点击事件
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.clickNumber = 0
        clearTimeout(this.timer);
      }, this.get('clickDuring'));
    } else {
      this.dragEnd(evt); // 拖拽事件
    }
  },
  clickNode(evt) {
    const node = evt.item;
    const name = evt.target.get("action");
    const onClickFn = this.get('onClick');
    if (node) {
      this.clickNumber++;
      onClickFn(name, node, this.clickNumber);
    }
  },
  dragStart(evt) {
    // 拖拽的节点及其所有子节点设置drag state 为true
    const { currentTarget: tree, item: node, clientX, clientY } = evt;
    const id = node.get("model").id;
    setIsDragging(true);
    this.dragNodeId = id;
    const _dragnode = tree.findById(this.dragNodeId);
    tree.getNodes().forEach((node) => {
      const nodeId = node.get("id");
      const { x: pointX, y: pointY, width, height } = node.getBBox();
      let { x: clientX, y: clientY } = tree.getClientByPoint(pointX, pointY);
      let model = node.get("model");
      const ratio = tree.getZoom();
      // 记录节点位置
      this.nodePosition[nodeId] = {
        clientX,
        clientY,
        width: width * ratio,
        height: height * ratio,
        depth: model.depth,
        parentId: model.parentId,
        sameLevel: model.depth === _dragnode.get("model").depth,
      };
      // 修改拖拽节点及其所有子节点的样式
      if (nodeId.indexOf(this.dragNodeId) === 0) {
        tree.updateItem(node, {
          // 节点的样式
          style: {
            opacity: 0.2,
          },
        });
        node.get("edges").forEach((edge) => {
          tree.updateItem(edge, {
            // 节点的样式
            style: {
              opacity: 0.2,
            },
          });
        });
      }
    });
    this.showDragDiv(clientX, clientY);
  },
  dragNode(evt) {
    if (!isDragging.value) return;
    const { currentTarget: tree, clientX, clientY } = evt;
    let ratio = tree.getZoom();
    const [width, height] = [(40 * ratio) / 2, (20 * ratio) / 2];
    let nodePosition = this.nodePosition;
    let nodes = [];
    for (let nodeId in nodePosition) {
      let node = nodePosition[nodeId];
      /**
       * 完全碰撞： 符合条件即为两个节点完全重合，拖拽节点将成为重合节点的子级
       * */
      let size =
        (globalFontSize[node.depth] || 12) * maxFontCount +
        paddingH * 4 +
        width * 4; // 最大横向距离=最大节点宽度+两个拖拽节点的宽度
      let parentNode = findData(node.parentId);
      let firstNode = node;
      let lastNode = node;
      if (parentNode.children.length) {
        firstNode = nodePosition[parentNode.children[0].id];
        lastNode =
          nodePosition[parentNode.children[parentNode.children.length - 1].id];
      }
      let coditionH_inner =
        clientX - width > node.clientX - width * 2 &&
        clientX + width < node.clientX + node.width + width * 2;
      let coditionV_inner =
        clientY - height > node.clientY - height * 2 &&
        clientY + height < node.clientY + node.height + height * 2;
      let coditionH_outer =
        clientX - width > node.clientX - width * 2 &&
        clientX + width < node.clientX + size + width * 2;
      let coditionV_outer =
        clientY - height > firstNode.clientY - height * 2 &&
        clientY + height < lastNode.clientY + lastNode.height + height * 2; // 所有节点的纵向区域
      if (coditionH_inner && coditionV_inner) {
        // 拖拽节点与树节点有重合部分
        nodes.push({
          nodeId: nodeId,
          inner: true,
          depth: node.depth,
          index: +nodeId.split("-").pop(),
          sameLevel: true,
          parentId: node.parentId,
        });
      } else if (coditionH_outer && coditionV_inner) {
        //     超出节点但在最大节点宽度范围内，高度在节点范围内
        nodes.push({
          nodeId: nodeId,
          inner: false,
          depth: node.depth,
          index: +nodeId.split("-").pop(),
          sameLevel: false,
          parentId: node.parentId,
        });
      } else if (
        coditionH_inner &&
        coditionV_outer &&
        clientX - width > node.clientX &&
        nodeId != node.parentId
      ) {
        // 拖拽节点在允许选中范围
        nodes.push({
          nodeId: nodeId,
          inner: false,
          depth: node.depth,
          index: +nodeId.split("-").pop(),
          sameLevel: true,
          parentId: node.parentId,
        });
      }
    }
    if (nodes.length) {
      // 有重合节点,可能有多个符合条件的节点
      let node = nodes.filter(
        (node) => node.inner || (!node.inner && !node.sameLevel)
      ) as any;
      if (node.length > 1) {
        node.sort((a, b) => {
          if (a.depth === b.depth) {
            return a.index - b.index;
          } else {
            return b.depth - a.depth;
          }
        });
      }
      if (nodes.length > 1) {
        nodes.sort((a, b) => {
          if (a.depth === b.depth) {
            return a.index - b.index;
          } else {
            return b.depth - a.depth;
          }
        });
      }
      node = node.length ? node[0] : nodes[0];
      let nodeId = node.sameLevel ? node.parentId : node.nodeId;
      if (nodeId.indexOf(this.dragNodeId) != -1) {
        cancelAllSelect();
        this.selectNodeId = null;
        this.showDragDiv(clientX, clientY, false, null);
        this.dragStatus = "";
        return; // 如果是拖拽节点或者拖拽子级，直接返回
      }
      selectNode(nodeId, true);
      this.selectNodeId = nodeId;
      this.showDragDiv(clientX, clientY, true, nodeId);
      this.dragStatus = "child";
      this.upClientInfo = [clientX, clientY];
    } else {
      cancelAllSelect();
      this.selectNodeId = null;
      this.showDragDiv(clientX, clientY, false, null);
      this.dragStatus = "";
    }
  },
  dragEnd(evt) {
    if(!isDragging.value) return;
    const { currentTarget: tree } = evt;
    setIsDragging(false);
    document.documentElement.style.cursor = "default";
    this.hideDragDiv();
    if (this.dragStatus !== "" && this.selectNodeId) {
      const parentNode = tree.findDataById(this.selectNodeId);
      let index = 0;
      for (let i = 0, len = parentNode.children.length; i < len; i++) {
        let node = parentNode.children[i];
        if (node.id === this.dragNodeId) continue;
        if (this.nodePosition[node.id].clientY < this.upClientInfo[1]) {
          index++;
        } else {
          break;
        }
      }
      emitter.emit("onDragEnd", [
        findData(this.dragNodeId),
        findData(this.selectNodeId),
        index,
      ]);
      const diagEnd = this.get('onDragEnd');
      diagEnd(findData(this.dragNodeId),
        findData(this.selectNodeId),
        index);
      moveData(this.selectNodeId, this.dragNodeId, index);
    }
    //    还原
    tree.getNodes().forEach((node) => {
      const nodeId = node.get("id");
      // 修改拖拽节点及其所有子节点的样式
      tree.updateItem(node, {
        // 节点的样式
        style: {
          opacity: 1,
        },
      });
      node.get("edges").forEach((edge) => {
        tree.updateItem(edge, {
          // 节点的样式
          style: {
            opacity: 1,
          },
        });
      });
    });
    cancelAllSelect();
    this.selectNodeId = null;
    this.dragStatus = "";
    this.nodePosition = {};
  },
  showDragDiv(clientX, clientY, showLine, parentId) {
    const tree = this.get('graph');
    const { x, y } = tree.getPointByClient(clientX, clientY);
    const model = {
      id: "moveNode",
      label: "",
      x,
      y,
      type: "rect",
      zIndex: 3,
      style: {
        width: 40,
        height: 20,
        fill: themeColor.value,
        radius: radius,
        opacity: 0.6,
        cursor: "grabbing",
      },
    };
    const edgeOption = {
      id: "moveNodeEdge",
      source: parentId || "0",
      target: "moveNode",
      type: lineType.value,
      zIndex: 3,
      style: {
        stroke: branchColor.value,
        lineWidth: branch.value,
        opacity: showLine ? 0.6 : 0,
        cursor: "grabbing",
      },
    };
    const moveNode = tree
      .getNodes()
      .filter((item) => item.get("id") === "moveNode");
    const moveEdge = tree
      .getEdges()
      .filter((item) => item.get("id") === "moveNodeEdge");
    if (moveNode.length && moveEdge.length) {
      tree.updateItem(moveNode[0], model);
      tree.updateItem(moveEdge[0], edgeOption);
    } else {
      tree.addItem("node", model);
      tree.addItem("edge", edgeOption);
    }
    return { moveNode: moveNode[0] };
  },
  hideDragDiv() {
    const tree = this.get('graph');
    const moveNode = tree
      .getNodes()
      .filter((item) => item.get("id") === "moveNode");
    if (moveNode.length) {
      tree.removeItem(moveNode[0]);
    }
  },
});

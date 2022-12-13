import IMData, { buildNodeStyle } from "../data/index";
import { InputData } from "../type/inputData";
import {
  globalTree,
  isCurrentEdit,
  setIsCurrentEdit,
  closeEditInput,
  isCurrentConnect,
  setIsCurrentConnect,
} from "../variable";
import { TreeGraph } from "@antv/g6";
import History from "../data/history";
import EditInput from "../editInput";
import { INode } from "@antv/g6-core/lib/interface/item";
import emitter from "../mitt";
import { pushData, popData } from "./clipboard";
import { showMoveEdge, hideMoveEdge } from "../utils/showMoveEdge";
/***
 * data 为History栈里面的历史数据
 */
export const rePaint = (stack = true) => {
  let tree: TreeGraph | null = globalTree.value as TreeGraph;
  if (!IMData.data) return;
  tree?.data(IMData.data);
  if (stack) {
    History.push(IMData.data);
  }
  tree?.layout();
};
export const addData = (
  id: string,
  rawData: string | InputData,
  editNow = true
) => {
  let data = IMData.add(id, rawData);
  emitter.emit("onAdd", data);
  rePaint();
  if (data && editNow) edit(data.id);
};
export const addParent = (id: string, rawData: string | InputData = "") => {
  let data = IMData.addParent(id, rawData);
  rePaint();
  if (data) edit(data.id);
};
export const addSibling = (id: string, rawData: string | InputData = "") => {
  let data = IMData.addSibling(id, rawData);
  rePaint();
  if (data) edit(data.id);
};
export const edit = (id: string, clear = false) => {
  if (closeEditInput.value)
    return emitter.emit("onEdit", { nodeData: findData(id) });
  const Tree = globalTree.value;
  const NodeData = Tree?.findById(id) as INode;
  if (!NodeData || !Tree) return;
  setIsCurrentEdit(true);
  selectNode(id, true);
  let oldName = NodeData.get("model").name;
  if (clear) {
    NodeData.set("model", Object.assign(NodeData.get("model"), { name: "" }));
  }
  EditInput.showInput(NodeData);
  EditInput.toFocus();
  Tree.on("wheel", () => {
    EditInput.hideInput();
  });
  EditInput.handleInput = (name: string) => {
    if (!isCurrentEdit.value) setIsCurrentEdit(true);
    let _name = name.replace(/\s/g, "");
    const pattern = new RegExp("[\u4E00-\u9FA5]+"); // distinguish the Chinese charactors and letters
    let nL = _name.length * (pattern.test(_name) ? 2 : 1);
    let oL = oldName.length * (pattern.test(oldName) ? 2 : 1);
    // width: 如果当前节点显示的内容长于新建入的内容，使用当前节点的长度
    const newData = buildNodeStyle({
      name: nL < oL ? oldName : _name,
      depth: NodeData.get("model").depth,
    });
    EditInput.changeStyle(newData);
  };
  EditInput.handleInputBlur = (name: string) => {
    emitter.emit("onAfterEdit", {
      name: name.replace(/\s/g, ""),
      nodeData: findData(id),
    });
    let _name = name.replace(/\s/g, "");
    update(id, _name === "" ? oldName : _name);
    EditInput.hideInput();
    let timer = setTimeout(() => {
      clearTimeout(timer);
      setIsCurrentEdit(false);
    }, 100);
  };
};
export const update = (id: string, name: any) => {
  IMData.update(id, typeof name === "string" ? { name } : name);
  selectNode(id, true);
  rePaint();
};
export const selectNode = (id: string, selected: boolean) => {
  cancelAllSelect();
  globalTree.value.setItemState(id, "selected", selected);
  selected && emitter.emit("onSelectedNode", findData(id));
};
export const cancelAllSelect = () => {
  globalTree.value.getNodes().forEach((item) => {
    if (item.hasState("selected")) {
      item.clearStates("selected");
      emitter.emit("onCancelSelected");
    }
  });
};
export const getSelectedNodes = () => {
  // 返回当前所有选中的节点
  return globalTree.value
    .getNodes()
    .filter((item) => {
      return item.hasState("selected");
    })
    .map((item) => item.get("model").id);
};
export const deleteNode = (id: string) => {
  IMData.removeItem(id);
  rePaint();
};
export const deleteOneNode = (id: string) => {
  IMData.removeOneItem(id);
  rePaint();
};
export const collapse = (id: string) => {
  //  判断如果没有子元素直接返回
  let data = findData(id);
  if (data.children.length <= 0) return false;
  IMData.collapse(id);
  emitter.emit("onCollapse", findData(id));
  rePaint();
};
export const expand = (id: string) => {
  IMData.expand(id);
  emitter.emit("onExpand", findData(id));
  rePaint();
};
export const onlyShowCurrent = (id: string) => {
  IMData.onlyShowCurrent(id);
  rePaint();
};
export const backParent = (id: string) => {
  IMData.backParent();
  rePaint();
};
export const reDo = () => {
  let data = History.forword();
  if (data) {
    IMData.data = { ...data };
  }
  rePaint(false);
};
export const unDo = () => {
  let data = History.goBack();
  if (data) {
    IMData.data = { ...data };
  }
  rePaint(false);
};
/***
 * 将childId节点从原节点删除，移动到新的parentId节点下面
 * */
export const moveToChild = (childId, parentId) => {
  const data = IMData.find(childId);
  IMData.add(parentId, data);
  IMData.removeItem(childId);
  rePaint();
};
export const findData = (id) => {
  return IMData.find(id);
};
export const moveData = (parentId, nodeId, index) => {
  IMData.moveData(parentId, nodeId, index);
  rePaint();
};
export const copy = (ids) => {
  pushData(ids.map((id) => findData(id)));
};
export const cut = (ids) => {
  pushData(ids.map((id) => findData(id)));
  ids.forEach((id) => {
    deleteNode(id);
  });
};
export const paste = (pid) => {
  let data = popData();
  if (data) {
    data.forEach((item) => {
      addData(pid, item);
    });
    rePaint();
  }
};
export const createACopy = (id) => {
  copy([id]);
  let d = findData(id);
  paste(findData(id).parentId);
  rePaint();
};
export const addEdge = (id) => {
  /***
   * Todo:
   * 1. 开启联系模式
   * 2. 创建线条，线条起点为点击的节点,终点为创建的节点
   * 4. 鼠标移动时更新线条展示
   * 5. 点击另一个节点时，判断当前联系模式是否开启
   * 6. 如果开启，更新线条的终点，联系模式关闭
   * 7. 创建联系功能关闭
   */
  //  创建连线的功能在behaviors
  if (isCurrentConnect.value) return;
  const tree = globalTree.value;
  setIsCurrentConnect(true); // 开启联系模式
  tree.refreshItem(id); // 联系模式不现实加号
  window.onmousemove = (ev) => {
    showMoveEdge(ev.clientX, ev.clientY, id); // 创建线条，更新线条
  };
  window.onmouseup = () => {
    window.onmousemove = null;
    hideMoveEdge(); // 隐藏线条
    setIsCurrentConnect(false); // 关闭联系模式
  };
};
export const canvasEnLarge = () => {
  const graph = window.mindTree;
  graph.zoom(1.2, { x: graph.getWidth() / 2, y: graph.getHeight() / 2 });
};
export const canvasEnSmall = () => {
  const graph = window.mindTree;
  graph.zoom(0.8, { x: graph.getWidth() / 2, y: graph.getHeight() / 2 });
};
export const canvasFitFill = () => {
  const graph = window.mindTree;
  graph.layout(true);
};
export const canvasFitCenter = () => {
  const graph = window.mindTree;
  const { scaleRatio } = window.mindTreeConfig.propsConfig;
  graph.fitCenter();
  graph.zoomTo(scaleRatio.value, {
    x: graph.getWidth() / 2,
    y: graph.getHeight() / 2,
  });
};
export const downloadJepg = () => {
  const graph = window.mindTree;
  graph.downloadFullImage("mindmap_" + Date.now(), "image/jpeg", {
    backgroundColor: "#ddd",
    padding: [30, 15, 15, 15],
  });
};

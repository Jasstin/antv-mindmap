import IMData from '../data/index'
import { InputData, NodeData } from "../interface";
import { globalTree, radius, setIsCurrentEdit, themeColor } from "../variable";
import { TreeGraph } from "@antv/g6";
import History from "../data/history";
import EditInput from "../editInput";
import { INode } from "@antv/g6-core/lib/interface/item";
import emitter from '../mitt'
import { pushData, popData } from "./clipboard";

/***
 * data 为History栈里面的历史数据
 */
export const rePaint = (stack = true) => {
  let tree: TreeGraph | null = globalTree.value as TreeGraph
  if (!IMData.data) return
  tree?.data(IMData.data)
  if (stack) {
    History.push(IMData.data)
  }
  tree?.layout()
}
export const addData = (id: string, rawData: string | InputData, editNow = true) => {
  let data = IMData.add(id, rawData)
  rePaint()
  emitter.emit('onAdd', data)
  if (editNow) {
    if (data) edit(data.id)
  }
}
export const addParent = (id: string, rawData: string | InputData, editNow = true) => {
  let data = IMData.addParent(id, rawData)
  rePaint()
  if (editNow) {
    if (data) edit(data.id)
  }
}
export const addSibling = (id: string, rawData: string | InputData, editNow = true) => {
  let data = IMData.addSibling(id, rawData)
  rePaint()
  if (editNow) {
    if (data) edit(data.id)
  }
}
export const edit = (id: string) => {
  const Tree = globalTree.value
  const NodeData = Tree?.findById(id) as INode
  if (!NodeData || !Tree) return
  const { x: pointX, y: pointY } = NodeData._cfg?.bboxCache
  const { name, type, fontSize, width, height } = NodeData._cfg?.model as NodeData
  let ratio = Tree.getZoom()
  let { x, y } = Tree.getClientByPoint(pointX, pointY)
  setIsCurrentEdit(true)
  EditInput.showInput(x, y, width * ratio, height * ratio, name, fontSize * ratio, type, radius * ratio, ratio)
  EditInput.handleInputBlur = (name: string) => {
    console.log(name)
    emitter.emit('onAfterEdit', name.replace(/\s/g, ''));
    let _name = name.replace(/\s/g, '');
    update(id, _name === '' ? NodeData.get('model').name : _name)
    Tree.off('wheelzoom')
    EditInput.hideInput()
    let timer = setTimeout(() => {
      setIsCurrentEdit(false);
      clearTimeout(timer)
    }, 500)
  }
  Tree.on('wheelzoom', () => {
    ratio = Tree.getZoom()
    let { x, y } = Tree.getClientByPoint(pointX, pointY)
    EditInput.showInput(x, y, width * ratio, height * ratio, name, fontSize * ratio, type, radius * ratio, ratio)
  })
}
export const update = (id: string, name: string) => {
  IMData.update(id, { name })
  selectNode(id, true)
}
export const selectNode = (id: string, selected: boolean) => {
  let tree: TreeGraph | null = globalTree.value as TreeGraph
  if (IMData._selectNode && tree.findDataById(IMData._selectNode.id)) {
    tree.setItemState(IMData._selectNode.id, 'selected', false)
  }
  IMData.update(id, { isCurrentSelected: selected })
  if (selected) {
    tree.setItemState(id, 'selected', true)
    emitter.emit('onSelectedNode', findData(id))
  }
  rePaint()
}
export const cancelAllSelect = () => {
  let tree: TreeGraph | null = globalTree.value as TreeGraph
  if (IMData._selectNode) {
    const id = IMData._selectNode.id;
    if (tree.findDataById(id)) {
      tree.setItemState(id, 'selected', false)
    }
    IMData.update(id, { isCurrentSelected: false })
  }
  rePaint()
}
export const getSelectedNodes = () => {
  if (IMData._selectNode) {
    return [IMData._selectNode]
  } else {
    return []
  }
}
export const deleteNode = (id: string) => {
  IMData.removeItem(id)
  rePaint()
}
export const deleteOneNode = (id: string) => {
  IMData.removeOneItem(id)
  rePaint()
}
export const collapse = (id: string) => {
  IMData.collapse(id)
  emitter.emit('onCollapse', findData(id))
  rePaint()
}
export const expand = (id: string) => {
  IMData.expand(id)
  emitter.emit('onExpand', findData(id))
  rePaint()
}
export const onlyShowCurrent = (id: string) => {
  IMData.onlyShowCurrent(id)
  rePaint()
}
export const backParent = (id: string) => {
  IMData.backParent(id)
  rePaint()
}
export const reDo = () => {
  let data = History.forword();
  if (data) {
    IMData.data = { ...data }
  }
  rePaint(false)
}
export const unDo = () => {
  let data = History.goBack();
  if (data) {
    IMData.data = { ...data }
  }
  rePaint(false)
}
/***
 * 将childId节点从原节点删除，移动到新的parentId节点下面
 * */
export const moveToChild = (childId, parentId) => {
  const data = IMData.find(childId);
  IMData.add(parentId, data);
  IMData.removeItem(childId);
  rePaint()
}
export const findData = (id) => {
  return IMData.find(id);
}
export const moveData = (parentId, nodeId, index) => {
  IMData.moveData(parentId, nodeId, index);
  rePaint()
}
export const copy = (ids) => {
  pushData(ids.map(id => findData(id)))
}
export const cut = (ids) => {
  pushData(ids.map(id => findData(id)))
  ids.forEach(id => {
    deleteNode(id)
  })
}
export const paste = (pid) => {
  let data = popData()
  if (data) {
    data.forEach(item => {
      addData(pid, item, false)
    })
    rePaint()
  }
}
export const createACopy = (id) => {
  copy([id])
  let d = findData(id)
  paste(findData(id).parentId)
  rePaint()
}

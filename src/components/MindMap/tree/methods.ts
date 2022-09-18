import IMData, { buildNodeStyle } from '../data/index'
import { InputData } from "../interface";
import { globalTree, isCurrentEdit, setIsCurrentEdit } from "../variable";
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
  setIsCurrentEdit(true)
  let show = false;
  let oldName = NodeData.get('model').name;
  EditInput.showInput(NodeData)
  show = true;
  Tree.on('wheel', () => {
    if (!show) return;
    EditInput.showInput(NodeData)
  })
  EditInput.handleInput = (name: string) => {
    console.log('>>>>>>2')
    if (!isCurrentEdit.value) setIsCurrentEdit(true)
    let _name = name.replace(/\s/g, '');
    const newData = buildNodeStyle({
      name: _name.length < oldName.length ? oldName : _name,
      depth: NodeData.get('model').depth
    })
    EditInput.changeStyle(newData);
  }
  EditInput.handleInputBlur = (name: string) => {
    show = false;
    emitter.emit('onAfterEdit', name.replace(/\s/g, ''));
    let _name = name.replace(/\s/g, '');
    update(id, _name === '' ? oldName : _name)
    EditInput.hideInput()
    let timer = setTimeout(() => {
      clearTimeout(timer)
      setIsCurrentEdit(false)
    }, 100)
  }
}
export const update = (id: string, name: any) => {
  IMData.update(id, typeof name === 'string' ? { name } : name)
  rePaint()
  selectNode(id, true)
}
export const selectNode = (id: string, selected: boolean) => {
  cancelAllSelect()
  globalTree.value.setItemState(id, 'selected', selected)
  selected && emitter.emit('onSelectedNode', findData(id));
  // 节点选中的时候就将富文本内容显示出来
  const nodeData = globalTree.value.findById(id)
  console.log('>>>>>>nodeData=', nodeData)
  EditInput.showInput(nodeData)
  EditInput._input.addEventListener('focus', () => {
    // 输入框聚焦时，调用编辑方法进行编辑
    edit(id)
  })
}
export const cancelAllSelect = () => {
  globalTree.value.getNodes().forEach(item => {
    if (item.hasState('selected')) {
      item.clearStates('selected')
    }
  })
  EditInput.hideInput()
}
export const getSelectedNodes = () => {
  // 返回当前所有选中的节点
  return globalTree.value.getNodes().filter(item => {
    return item.hasState('selected');
  }).map(item => item.get('model').id)
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
  //  判断如果没有子元素直接返回
  let data = findData(id);
  if (data.children.length <= 0) return false;
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
  IMData.backParent()
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

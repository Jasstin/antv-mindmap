import IMData from '../data/index'
import {InputData, NodeData} from "../interface";
import {globalTree, radius, themeColor} from "../variable";
import {TreeGraph} from "@antv/g6";
import History from "../data/history";
import EditInput from "../editInput";
import {INode} from "@antv/g6-core/lib/interface/item";
import {find} from "lodash";

/***
 * data 为History栈里面的历史数据
 */
export const rePaint = (data?: NodeData) => {
    let tree: TreeGraph | null = globalTree.value as TreeGraph
    if (!IMData.data) return
    tree?.data(data || IMData.data)
    if (data === undefined) {
        History.push(IMData.data)
    }
    tree?.layout()
}
export const addData = (id: string, rawData: string | InputData) => {
    let data = IMData.add(id, rawData)
    rePaint()
    if (data) edit(data.id)
}
export const addParent = (id: string, rawData: string | InputData) => {
    let data = IMData.addParent(id, rawData)
    rePaint()
    if (data) edit(data.id)
}
export const addSibling = (id: string, rawData: string | InputData) => {
    let data = IMData.addSibling(id, rawData)
    rePaint()
    if (data) edit(data.id)
}
export const edit = (id: string) => {
    const Tree = globalTree.value
    const NodeData = Tree?.findById(id) as INode
    if (!NodeData || !Tree) return
    const {x: pointX, y: pointY} = NodeData._cfg?.bboxCache
    const {name, type, fontSize, width, height} = NodeData._cfg?.model as NodeData
    let ratio = Tree.getZoom()
    let {x, y} = Tree.getClientByPoint(pointX, pointY)
    EditInput.showInput(x, y, width * ratio, height * ratio, name, fontSize * ratio, type, radius * ratio, ratio)
    EditInput.handleInputBlur = (name: string) => {
        if (name.trim().length) {
            update(id, name.replace(/\s/g, ''))
        } else if (name === '') {
            deleteOneNode(id)
        }
        Tree.off('wheelzoom')
    }
    Tree.on('wheelzoom', () => {
        ratio = Tree.getZoom()
        let {x, y} = Tree.getClientByPoint(pointX, pointY)
        EditInput.showInput(x, y, width * ratio, height * ratio, name, fontSize * ratio, type, radius * ratio, ratio)
    })
}
export const update = (id: string, name: string) => {
    IMData.update(id, name)
    rePaint()
}
export const selectNode = (id: string, selected: boolean) => {
    let tree: TreeGraph | null = globalTree.value as TreeGraph
    if (IMData._selectNode && tree.findDataById(IMData._selectNode.id)) {
        tree.setItemState(IMData._selectNode.id, 'selected', false)
    }
    IMData.update(id, {isCurrentSelected: selected})
    if (selected) {
        tree.setItemState(id, 'selected', true)
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
        IMData.update(id, {isCurrentSelected: false})
    }
    rePaint()
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
    rePaint()
}
export const expand = (id: string) => {
    IMData.expand(id)
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
export const reDo = (id: string) => {
    rePaint(History.forword())
}
export const unDo = (id: string) => {
    rePaint(History.goBack())
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

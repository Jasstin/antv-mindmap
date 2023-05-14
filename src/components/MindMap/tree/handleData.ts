import treeForEach, { transferTree } from "../utils/treeForEach";

interface Options {
    direction: string,
    depth: number,
    getSize: (cfg) => [number, number]
}
interface InputData {
    title: string,
    icon?: string,
    children: InputData[]
}
export interface NodeData {
    info: InputData,
    rawData: InputData,
    size: number[]
}
export const parseData = (data, options: Options) => {
    const { getSize, direction = 'H', depth: _depth = 0 } = options || {};
    const defaultNode = { info: { title: '思维导图根节点' } }
    if (!data?.length) {
        console.log(`[mindTree warn]: 传入数据有误，需要一个数组`)
        return defaultNode;
    }
    //  数据预处理： 1. 如果传入的是一个单对象数组，则直接取第一个对象的值，2。 如果传入的是一个多对象的数组，则拼接一个根节点
    let preData: any;
    if (data.length > 1) {
        preData = {
            ...defaultNode,
            children: []
        }
    } else {
        preData = data[0];
    }
    /**
     * 数据样式处理
     * 1. 计算节点的size： size部分影响到layout的getWidth和getSize
     * 2. 考虑到后期可能新增节点类型，因此getSize方法从外界传入(节点默认使用为mindMap-node 节点,自定义节点时需导出计算size的方法)
     */
    let renderTree = transferTree([preData], (item, index, depth, parent) => {
        let side = depth < 2 ? index % 2 == 0 ? 'left' : 'right' : parent.side;
        if (direction === 'LR') {
            side = 'right'
        }
        return {
            info: item.info,
            rawData: item.info,
            size: getSize(item),
            depth: depth + _depth,
            side
        }
    })
    return renderTree[0]
}

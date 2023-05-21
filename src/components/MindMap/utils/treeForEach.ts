// 广度优先遍历
export default function treeForEach(tree, func) {
    let node, list = [...tree];
    while (node = list.shift()) {
        func(node)
        node.children && list.push(...node.children)
    }
}

// 深度遍历树节点，修改树对象
export const transferTree = (tree, func, depth = 0, parent = null) => {
    let node, list = [...tree];
    return list.map((item, index) => {
        node = func(item, index, depth, parent);
        if (item.children) {
            node.children = transferTree(item.children, func, depth + 1, node)
        }
        return node
    });
}
import {globalTree} from "./variable";

const watchDrag = () => {
    const Tree = globalTree.value
    Tree?.on('node:dragstart', (e) => {
    })
    Tree?.on('node:drag', (e) => {
        const {item, clientX: x, clientY: y} = e;
        const nodes = Tree.getNodes();
        nodes.forEach(node => {
            console.log(node._cfg)
        })
    })
    Tree?.on('node:dragend', (e) => {

    })
}
export default watchDrag

import G6 from "@antv/g6";
import {edit, expand, selectNode} from "./methods";

G6.registerBehavior('edit-mindmap', {
    getEvents() {
        return {
            'node:click': 'clickNode',
            'node:dblclick': 'editNode',
            'node:mouseover': 'hoverNode',
            'node:mouseleave': 'clearHoverStatus',
        };
    },
    clickNode(evt) {
        const tree = evt.currentTarget;
        const model = evt.item.get('model');
        const name = evt.target.get('action');
        if (name === 'expand') {
            expand(model.id)
        } else {
            selectNode(model.id, !model.isCurrentSelected)
        }
    },
    editNode(evt) {
        const item = evt.item;
        const model = item.get('model');
        edit(model.id)
    },
    hoverNode(evt) {
        const {currentTarget: tree, item: node} = evt
        tree.setItemState(node, 'hover', true)
    },
    clearHoverStatus(evt) {
        const {currentTarget: tree, item: node} = evt
        tree.setItemState(node, 'hover', false)
    }
});

import G6 from "@antv/g6";
import {edit} from "./methods";

G6.registerBehavior('edit-mindmap', {
    getEvents() {
        return {
            'node:click': 'clickNode',
            'node:dblclick': 'editNode'
        };
    },
    clickNode(evt) {
        const model = evt.item.get('model');
        const name = evt.target.get('action');
        switch (name) {
            case 'add':
                const newId =
                    model.id +
                    '-' +
                    (((model.children || []).reduce((a, b) => {
                            const num = Number(b.id.split('-').pop());
                            return a < num ? num : a;
                        }, 0) || 0) +
                        1);
                evt.currentTarget.updateItem(evt.item, {
                    children: (model.children || []).concat([{
                        id: newId,
                        direction: newId.charCodeAt(newId.length - 1) % 2 === 0 ? 'right' : 'left',
                        label: 'New',
                        type: 'dice-mind-map-leaf',
                    },]),
                });
                evt.currentTarget.layout(false);
                break;
            case 'delete':
                const parent = evt.item.get('parent');
                evt.currentTarget.updateItem(parent, {
                    children: (parent.get('model').children || []).filter((e) => e.id !== model.id),
                });
                evt.currentTarget.layout(false);
                break;
            case 'edit':
                break;
            default:
                return;
        }
    },
    editNode(evt) {
        const item = evt.item;
        const model = item.get('model');
        edit(model.id)
    },
});

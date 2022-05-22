import {InputData, NodeData} from "../interface";
import {fittingString, wrapString} from "../utils";
import {globalFontSize, maxFontCount, paddingH, paddingV} from "../variable";

class IMData {
    data: NodeData | null = null
    _data: NodeData | any[] = []
    _selectNode: NodeData | null = null

    private createMdataFromData(rawData: InputData, id: string, parent: NodeData | null = null): NodeData {
        const {label, name, desc, content, children: rawChildren, collapse, isSubView} = rawData
        const depth = parent ? parent.depth + 1 : 0
        const fontSize = globalFontSize[depth] || 12;
        const size = fontSize * maxFontCount + paddingH * 2; // 节点最多显示12个字
        const wrapContent = wrapString(name || label, size, fontSize)
        const data: NodeData = {
            id,
            fullName: name,
            label: wrapContent.text,
            name: wrapContent.text,
            depth,
            fontSize,
            desc,
            content,
            width: Math.min(fontSize * name.length + paddingH * 2, size + paddingH * 3),
            height: (fontSize + paddingV) * wrapContent.line + paddingV,
            isSubView: isSubView || false,
            collapse: collapse || false,
            parentId: parent?.id ?? '0',
            type: ['dice-mind-map-root', 'dice-mind-map-sub'][depth] || 'dice-mind-map-leaf',
            isCurrentSelected: false,
            children: [],
            _children: []
        }
        if (rawChildren) {
            if (!data.collapse) {
                rawChildren.forEach((c, j) => {
                    data?.children?.push(this.createMdataFromData(c, `${id}-${j}`, data))
                })
            } else {
                rawChildren.forEach((c, j) => {
                    data?._children?.push(this.createMdataFromData(c, `${id}-${j}`, data))
                })
            }
        }
        return data
    }

    init(d: InputData) {
        this.data = this.createMdataFromData(d, '0')
        return this.data
    }

    find(id: string): NodeData | null { // 根据id找到数据
        const array = id.split('-').map(n => ~~n)
        let data = this.data
        if (!data) return null
        for (let i = 1; i < array.length; i++) {
            const index = array[i]
            const {children} = data as NodeData
            if (index < children.length) {
                data = children[index]
            } else { // No data matching id
                return null
            }
        }
        return data?.id === id ? data : null
    }

    expand(id: string): NodeData | null {
        return this.eoc(id, false)
    }

    collapse(id: string): NodeData | null {
        return this.eoc(id, true)
    }

    /**
     * 展开或折叠(expand or collapse)
     */
    eoc(id: string, collapse: boolean): NodeData | null {
        const d = this.find(id)
        if (d) {
            d.collapse = collapse
            ;[d._children, d.children] = [d.children, d._children]
        }
        return d
    }

    add(id: string, rawData: string | InputData): NodeData | null {
        const p = this.find(id)
        if (p) {
            if (p.collapse) {
                this.expand(id)
            }
            if (!p.children) {
                p.children = []
            }
            let name, desc, content;
            if (typeof rawData === 'string') {
                name = rawData
            } else {
                name = rawData.name || rawData.label
                desc = rawData.desc
                content = rawData.content
            }
            const depth = p ? p.depth + 1 : 0
            const fontSize = globalFontSize[depth] || 12;
            const size = fontSize * maxFontCount + paddingH * 2; // 节点最多显示12个字
            const wrapContent = wrapString(name === '' ? '请输入文本内容' : name, size, fontSize)
            const data: NodeData = {
                id: `${id}-${p.children.length}`,
                fullName: name,
                name: name,
                label: name,
                depth,
                fontSize,
                desc,
                content,
                parentId: id,
                collapse: false,
                isSubView: false,
                width: Math.min(fontSize * wrapContent.text.length + paddingH * 2, size + paddingH * 3),
                height: (fontSize + paddingV) * wrapContent.line + paddingV,
                type: ['dice-mind-map-root', 'dice-mind-map-sub'][depth] || 'dice-mind-map-leaf',
                isCurrentSelected: false,
                children: [],
                _children: []
            }
            p.children.push(data)
            return data
        }
        return null
    }

    addSibling(id: string, rawData: string | InputData, before = false): NodeData | null {
        const d = this.find(id)
        if (d && d.parentId) {
            const index = parseInt(id.split('-').pop() as string, 10)
            const start = before ? index : index + 1
            const depth = d ? d.depth : 1
            const fontSize = globalFontSize[depth] || 12;
            const size = fontSize * maxFontCount + paddingH * 2; // 节点最多显示12个字
            let name, desc, content;
            if (typeof rawData === 'string') {
                name = rawData;
            } else {
                name = rawData.name
                desc = rawData.desc
                content = rawData.content
            }
            const wrapContent = wrapString(name === '' ? '请输入文本内容' : name, size, fontSize)
            const sibling: NodeData = {
                id: `${d.parentId}-${start}`,
                fullName: name,
                name: name,
                label: name,
                depth,
                fontSize,
                desc,
                content,
                collapse: false,
                isSubView: false,
                parentId: d.parentId,
                width: Math.min(fontSize * wrapContent.text.length + paddingH * 2, size + paddingH * 3),
                height: (fontSize + paddingV) * wrapContent.line + paddingV,
                type: ['dice-mind-map-root', 'dice-mind-map-sub'][depth] || 'dice-mind-map-leaf',
                isCurrentSelected: false,
                children: [],
                _children: []
            }
            const parent: NodeData | null = this.find(d.parentId);
            parent?.children.splice(start, 0, sibling)
            parent?.children.forEach((item: NodeData, index: number) => item.id = `${parent.id}-${index}`)
            return sibling
        }
        return null
    }

    addParent(id: string, rawData: string | InputData): NodeData | null {
        const d = this.find(id)
        if (d && d.parentId) {
            const p = this.find(d.parentId)
            const index = parseInt(id.split('-').pop() as string, 10)
            const depth = d ? d.depth : 1
            const fontSize = globalFontSize[depth] || 12;
            const size = fontSize * maxFontCount + paddingH * 2; // 节点最多显示12个字
            let name, desc, content;
            const parentId = d.parentId
            if (typeof rawData === 'string') {
                name = rawData;
            } else {
                name = rawData.name
                desc = rawData.desc
                content = rawData.content
            }
            const wrapContent = wrapString(name === '' ? '请输入文本内容' : name, size, fontSize)
            const parent: NodeData = {
                id,
                fullName: name,
                name: name,
                label: name,
                depth,
                fontSize,
                desc,
                content,
                parentId,
                collapse: false,
                isSubView: false,
                width: Math.min(fontSize * wrapContent.text.length + paddingH * 2, size + paddingH * 3),
                height: (fontSize + paddingV) * wrapContent.line + paddingV,
                type: ['dice-mind-map-root', 'dice-mind-map-sub'][depth] || 'dice-mind-map-leaf',
                isCurrentSelected: false,
                children: [],
                _children: []
            }
            p?.children.splice(index, 1, parent)
            parent.children.push(this.createMdataFromData(d, id + '-0', parent))
            return parent
        }
        return null
    }

    removeItem(id: string) {
        const d = this.find(id)
        if (d) {
            const p = this.find(d.parentId)
            if (!p) return
            p.children = p.children.filter(t => t.id !== id)
            p.children.forEach((t, i) => t.id = `${p.id}-${i}`)
        }
    }

    removeOneItem(id: string) {
        const d = this.find(id)
        if (d) {
            const p = this.find(d.parentId)
            if (!p) return
            p.children = p.children.filter(t => t.id !== id)
            if (d.children) {
                const _pI = id.split(p.id + '-')[1];
                d.children.forEach((item, index) => {
                    p.children.splice(+_pI, 0, this.createMdataFromData(item, p.id + '-' + index, p))
                })
            }
            p.children.forEach((t, i) => t.id = `${p.id}-${i}`)
        }
    }

    onlyShowCurrent(id: string) {
        const d = this.find(id)
        if (d) {
            if (d.collapse) {
                this.expand(id)
            }
            this._data.push(this.data)
            d.isSubView = true
            this.data = this.createMdataFromData(d, '0')
        }
    }

    update(id: string, data: string | { name?: string, isCurrentSelected?: boolean }) {
        const d = this.find(id)
        if (!d) return
        const fontSize = globalFontSize[d.depth] || 12;
        const size = fontSize * maxFontCount + paddingH * 2; // 节点最多显示12个字
        let name, isCurrentSelect;
        if (typeof data !== 'string') {
            if (data.isCurrentSelected) {
                this._selectNode && (this._selectNode.isCurrentSelected = false)
                this._selectNode = d;
            }
            name = data?.name ?? d.fullName
            isCurrentSelect = data?.isCurrentSelected ?? d.isCurrentSelected
        } else {
            name = data;
        }
        const wrapContent = wrapString(name, size, fontSize)
        d.fullName = name;
        d.name = wrapContent.text;
        d.label = wrapContent.text;
        d.width = Math.min(fontSize * name.length + paddingH * 2, size + paddingH * 3);
        d.height = (fontSize + paddingV) * wrapContent.line + paddingV;
        d.isCurrentSelected = isCurrentSelect
        console.log(d)
    }

    backParent() {
        let _data = this._data.pop()
        // Todo:合并最新的改动
        this.data = _data
    }
}

export default new IMData()

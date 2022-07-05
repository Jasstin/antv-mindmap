import { InputData, NodeData } from "../interface";
import { fittingString, wrapString } from "../utils";
import { globalFontSize, maxFontCount, paddingH, paddingV } from "../variable";
import { collapse } from "../tree/methods";
class IMData {
  data: NodeData | null = null
  _data: NodeData | any[] = []
  _selectNode: NodeData | null = null

  private createMdataFromData(rawData: InputData | NodeData, id: string, parent: NodeData | null = null): NodeData {
    const {
      label,
      name,
      desc,
      content,
      children: rawChildren,
      _children: _rawChildren,
      collapse,
      isSubView
    } = rawData
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
      _children: [],
      rawData
    }
    if (rawChildren) {
      rawChildren.filter(t => !t.destroyed).forEach((c, j) => {
        data?.children?.push(this.createMdataFromData(c, `${id}-${j}`, data))
      })
    }
    if (_rawChildren) {
      _rawChildren.filter(t => !t.destroyed).forEach((c, j) => {
        data?._children?.push(this.createMdataFromData(c, `${id}-${j}`, data))
      })
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
      const { children } = data as NodeData
      if (index < children.length) {
        data = children[index]
      } else { // No data matching id
        return null
      }
    }
    return data?.id === id ? data : null
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

  expand(id: string): NodeData | null {
    return this.eoc(id, false)
  }

  collapse(id: string): NodeData | null {
    return this.eoc(id, true)
  }

  /**
   * 支持传入单节点、带有子级的节点
   * */
  add(id: string, rawData: string | InputData): NodeData | null {
    const p = this.find(id)
    if (p) {
      if (p.collapse) {
        this.expand(id)
      }
      if (!p.children) {
        p.children = []
      }
      let name, desc, content, children, _children;
      if (typeof rawData === 'string') {
        name = rawData
      } else {
        name = rawData.name || rawData.label
        desc = rawData.desc
        content = rawData.content
        children = rawData.children
        _children = rawData._children
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
        rawData: typeof rawData === 'string' ? {} : rawData,
        width: Math.min(fontSize * wrapContent.text.length + paddingH * 2, size + paddingH * 3),
        height: (fontSize + paddingV) * wrapContent.line + paddingV,
        type: ['dice-mind-map-root', 'dice-mind-map-sub'][depth] || 'dice-mind-map-leaf',
        isCurrentSelected: false,
        children: [],
        _children: []
      }
      if (children || _children) {
        children.forEach((item, i) => {
          data?.children?.push(this.createMdataFromData(item, `${data.id}-${i}`, data))
        })
        _children.forEach((item, i) => {
          data?.children?.push(this.createMdataFromData(item, `${data.id}-${i}`, data))
        })
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
        rawData: typeof rawData === 'string' ? {} : rawData,
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
        rawData: typeof rawData === 'string' ? {} : rawData,
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

  /**
   * 删除节点及其所有子节点 支持逻辑删除与物理删除
   * 逻辑删除： 在数据中，被打上destroyed的标识，会在下一次重置数据的时候删除 应用场景听：moveData 先逻辑删除再物理删除
   * 物理删除： 本次操作就将数据删除掉
   * */
  removeItem(id: string, real = true) {
    const d = this.find(id)
    if (d) {
      const p = this.find(d.parentId)
      if (!p) return
      p.children.forEach(d => {
        if (d.id === id) {
          d.destroyed = true
        }
      })
    }
    if (real) {
      this.init(this.data)
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
  }

  backParent() {
    let _data = this._data.pop()
    // Todo:合并最新的改动
    this.data = _data
  }

  moveData(pid: string, id: string, index: number) {
    let data = this.find(id);
    const p = this.find(pid);
    let isSibling = data.parentId === pid
    if (p.collapse) {
      this.expand(pid)
    }
    if (data.collapse) {
      this.expand(id)
    }
    if (!isSibling) {
      this.removeItem(id, false);
    }
    if (p.children.length) {
      let _data = [...p.children.filter(node => node.id != id)]
      p.children = []
      _data.splice(index, 0, data)
      _data.forEach((item, index) => p.children.push(this.createMdataFromData(item, p.id + '-' + index, p)))
    } else {
      this.add(pid, data)
    }
    // 重新梳理id
    this.init(this.data)
  }
}

export default new IMData()

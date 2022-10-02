import { InputData, NodeData } from "../interface";
import { fittingString, wrapString } from "../utils";
import { globalFontSize, maxFontCount, paddingH, paddingV, themeColor_sub, themeColor, themeColor_leaf, fontColor_sub, fontColor_leaf, fontColor_root, placeholderText, activeStrokeColor } from "../variable";
export const buildNodeStyle = ({ name = placeholderText, desc = "", content = "", depth }) => {
  name === "" && (name = placeholderText);
  const fontSize = globalFontSize[depth] || 12;
  const size = fontSize * maxFontCount + paddingH * 2; // 节点最多显示12个字
  const { text: wrapName, line: nameLine, width: nameWidth } = wrapString(name, size, fontSize); // 标题换行
  const { text: wrapDesc, line: descLine, width: descWidth } = wrapString(desc, size, fontSize - 2); // 描述换行
  const nameLineHeight = (fontSize + paddingV);
  const nameHeight = nameLineHeight * (nameLine) + paddingV; // 标题高度
  const descHeight = (fontSize - 2 + paddingV) * (descLine) + paddingV; // 描述内容高度
  const height = nameHeight + (desc ? descHeight : 0) // 节点高度
  const FillColor = [themeColor.value, themeColor_sub.value, themeColor_leaf.value][depth] || themeColor_leaf.value // 背景颜色
  const FontColor = [fontColor_root.value, fontColor_sub.value, fontColor_leaf.value][depth] || fontColor_leaf.value // 字体颜色
  const obj = {
    label: wrapName,
    name: wrapName,
    fullName: name,
    desc: wrapDesc,
    content,
    type: 'mindmap-node',
    style: {
      fontSize,
      descFontSize: fontSize - 2,
      descHeight,
      width: Math.max(nameWidth, descWidth) + paddingV * 2, //  标题宽度与描述宽度取最大值
      maxWidth: size,
      height,
      nameHeight,
      FillColor,
      FontColor,
      stroke: 2,
      strokeColor: 'transparent',
      nameLineHeight
    }
  }
  return obj
}
class IMData {
  data: NodeData | null = null
  _data: NodeData | any[] = []

  private createMdataFromData(rawData: InputData, id: string, parent: NodeData | null = null, isInit = false): NodeData {
    const {
      children: rawChildren,
      _children: _rawChildren,
      collapse,
      isSubView
    } = rawData
    const depth = parent ? parent.depth + 1 : 0
    const data: NodeData = {
      id,
      depth,
      isSubView: isSubView || false,
      collapse: collapse || false,
      parentId: parent?.id ?? '0',
      children: [],
      _children: [],
      rawData: isInit ? rawData : rawData?.rawData,
      ...buildNodeStyle({ ...rawData, depth })
    }
    if (rawChildren) {
      rawChildren.filter(t => !t.destroyed).forEach((c, j) => {
        data?.children?.push(this.createMdataFromData(c, `${id}-${j}`, data, isInit))
      })
    }
    if (_rawChildren) {
      _rawChildren.filter(t => !t.destroyed).forEach((c, j) => {
        data?._children?.push(this.createMdataFromData(c, `${id}-${j}`, data, isInit))
      })
    }
    if (collapse && data.children.length) {
      data._children = [...data.children]
      data.children = []
    }
    return data
  }

  init(d: InputData, isInit = false) {
    this.data = this.createMdataFromData(d, '0', null, isInit)
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
      d.collapse = collapse;
      [d._children, d.children] = [d.children, d._children]
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
    if (!p) return null;
    if (p.collapse) {
      this.expand(id)
    }
    if (!p.children) {
      p.children = []
    }
    if (typeof rawData === 'string') {
      rawData = { name: rawData }
    }
    const newData = this.createMdataFromData(rawData, `${id}-${p.children.length}`, p);
    p.children.push(newData);
    return newData;
  }

  addSibling(id: string, rawData: string | InputData, before = false): NodeData | null {
    const d = this.find(id);
    if (!d || !d.parentId) return null;
    if (typeof rawData === 'string') {
      rawData = { name: rawData };
    }
    return this.add(d.parentId, rawData);
  }

  addParent(id: string, rawData: string | InputData): NodeData | null {
    let d = this.find(id);
    if (!d || !d.parentId) return null;
    const p = this.find(d.parentId);
    if (typeof rawData === 'string') {
      rawData = { name: rawData };
    }
    const newData = this.createMdataFromData({
      ...rawData,
      children: [d]
    }, id, p)
    this.replaceNode(id, newData);
    return newData;
  }
  replaceNode(id, rawData) {
    let d = this.find(id);
    let p = this.find(d.parentId);
    if (!p?.children) return;
    p.children.forEach(item => {
      if (item.id === id) {
        for (let key in rawData) {
          item[key] = rawData[key]
        }
      }
    })
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

  update(id: string, rawData: string | InputData) {
    let d = this.find(id)
    if (!d) return
    const p = this.find(d.parentId);
    if (typeof rawData === 'string') {
      rawData = { ...d, name: rawData }
    } else {
      rawData = { ...d, ...rawData }
    }
    if (d.id === '0') {
      return this.init(rawData)
    } else {
      const newData = this.createMdataFromData(rawData, id, p);
      this.replaceNode(id, newData);
      return newData;
    }
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
    if (!isSibling) {
      this.removeItem(id, false);
    }
    if (p.children.length) {
      let _data = [...p.children.filter(node => node.id != id)]
      p.children = []
      _data.splice(index, 0, data)
      _data.forEach((item, index) => p.children.push(this.createMdataFromData(item, p.id + '-' + index, p)))
    } else if (p._children.length) {
      let _data = [...p._children.filter(node => node.id != id)]
      p._children = []
      _data.splice(index, 0, data)
      _data.forEach((item, index) => p._children.push(this.createMdataFromData(item, p.id + '-' + index, p)))
      this.expand(pid)
    } else {
      this.add(pid, data)
    }
    // 重新梳理id
    this.init(this.data)
  }
}

export default new IMData()

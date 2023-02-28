var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import G6 from "@antv/g6";
import { ref, openBlock, createElementBlock, createElementVNode } from "vue";
var Mindmap$1 = "";
const wrapString = (str, maxWidth, fontSize) => {
  let currentWidth = 0;
  const pattern = new RegExp("[\u4E00-\u9FA5]+");
  const lineGroup = [];
  let firstIndex = 0;
  let rowWidth = 0;
  str = str.replace(/\s/g, "");
  str.split("").forEach((letter, i, array) => {
    if (pattern.test(letter)) {
      currentWidth += fontSize;
    } else {
      currentWidth += G6.Util.getLetterWidth(letter, fontSize);
    }
    if (currentWidth > maxWidth) {
      if (currentWidth > rowWidth) {
        rowWidth = currentWidth;
      }
      lineGroup.push(str.slice(firstIndex, i));
      currentWidth = 0;
      firstIndex = i;
    } else if (i === array.length - 1) {
      if (currentWidth > rowWidth) {
        rowWidth = currentWidth;
      }
      lineGroup.push(str.slice(firstIndex, i + 1));
    }
  });
  return { line: lineGroup.length, text: lineGroup.join("\n"), width: Math.ceil(rowWidth) };
};
window.wrapString = wrapString;
const themeColor = ref("rgb(19, 128, 255)");
const activeStrokeColor = ref("red");
const hoverStrokeColor = ref("green");
const changeThemeColor = (val) => {
  themeColor.value = val;
  activeStrokeColor.value = val;
  hoverStrokeColor.value = val;
};
const themeColor_sub = ref("rgb(245,245,245)");
const changeSubThemeColor = (val) => themeColor_sub.value = val;
const themeColor_leaf = ref("transparent");
const changeLeafThemeColor = (val) => themeColor_leaf.value = val;
const fontColor_root = ref("#ffffff");
const changeRootFontColor = (val) => fontColor_root.value = val;
const fontColor_sub = ref("#333");
const changeSubFontColor = (val) => fontColor_sub.value = val;
const fontColor_leaf = ref("#333");
const changeLeafFontColor = (val) => fontColor_leaf.value = val;
const branch = ref(2);
const changeBranch = (val) => branch.value = val;
const branchColor = ref("rgb(19, 128, 255)");
const changeBranchColor = (val) => branchColor.value = val;
const timetravel = ref(false);
const changeTimetravel = (val) => timetravel.value = val;
const downloadBtn = ref(false);
const changeDownloadBtn = (val) => downloadBtn.value = val;
const fitBtn = ref(false);
const changeFitBtn = (val) => fitBtn.value = val;
const centerBtn = ref(false);
const changeCenterBtn = (val) => centerBtn.value = val;
const scaleRatio = ref(1);
const changeScaleRatio = (val) => scaleRatio.value = val;
const radius = 4;
const paddingH = 10;
const paddingV = 10;
const maxFontCount = 12;
const globalFontSize = [16, 14, 12];
const nodeMenuList = ref([]);
const changeNodeMenuList = (val) => nodeMenuList.value = val;
ref(null);
const globalTree = ref(null);
const setGlobalTree = (val) => globalTree.value = val;
const lineType = ref("cubic-horizontal");
const setLineType = (val) => lineType.value = val;
const isCurrentEdit = ref(false);
const setIsCurrentEdit = (val) => isCurrentEdit.value = val;
const placeholderText = "\u65B0\u5EFA\u6A21\u578B";
const isDragging = ref(false);
const setIsDragging = (val) => isDragging.value = val;
const hotkeys = ref([]);
const changehotKeyList = (val) => hotkeys.value = val;
const closeEditInput = ref(false);
const changeCloseEditInput = (val) => closeEditInput.value = val;
const controlMoveDirection = ref(false);
const changeControlMoveDirection = (val) => controlMoveDirection.value = val;
const defaultAppendNode = ref(false);
const changeDefaultAppendNode = (val) => defaultAppendNode.value = val;
const buildNodeStyle = ({ name = placeholderText, desc = "", depth, iconPath, nodeStyle }, config = { renderer: "canvas" }) => {
  name === "" && (name = placeholderText);
  const isSvg = config.renderer === "svg";
  const fontSize = globalFontSize[depth] || 12;
  const size = fontSize * maxFontCount + paddingH * 2;
  let {
    text: wrapName,
    line: nameLine,
    width: nameWidth
  } = wrapString(name, size, fontSize);
  const {
    text: wrapDesc,
    line: descLine,
    width: descWidth
  } = wrapString(desc, size, fontSize - 2);
  const nameLineHeight = fontSize + paddingV;
  const nameHeight = nameLineHeight * nameLine + paddingV;
  const descHeight = isSvg ? 300 : (fontSize - 2 + paddingV) * descLine + paddingV;
  const imageIconWidth = iconPath ? nameHeight : 0;
  const height = nameHeight + (desc ? descHeight : 0);
  nameWidth += imageIconWidth;
  const FillColor = [themeColor.value, themeColor_sub.value, themeColor_leaf.value][depth] || themeColor_leaf.value;
  const FontColor = [fontColor_root.value, fontColor_sub.value, fontColor_leaf.value][depth] || fontColor_leaf.value;
  const obj = {
    label: wrapName,
    name: wrapName,
    fullName: name,
    desc: isSvg ? desc : wrapDesc,
    iconPath,
    type: isSvg ? "dom-node" : "mindmap-node",
    style: Object.assign({}, {
      fontSize,
      descFontSize: fontSize - 2,
      descHeight,
      width: Math.max(nameWidth, descWidth) + paddingH * 2,
      maxWidth: size,
      height,
      nameHeight,
      FillColor,
      FontColor,
      stroke: 2,
      strokeColor: "transparent",
      nameLineHeight,
      imageIconWidth
    }, nodeStyle)
  };
  return obj;
};
class IMData {
  constructor() {
    this.data = null;
    this._data = [];
  }
  createMdataFromData(rawData, id, parent = null, isInit = false) {
    var _a;
    const {
      children: rawChildren,
      _children: _rawChildren,
      collapse: collapse2,
      isSubView
    } = rawData;
    const depth = parent ? parent.depth + 1 : 0;
    const data = __spreadValues({
      id,
      depth,
      isSubView: isSubView || false,
      collapse: collapse2 || false,
      parentId: (_a = parent == null ? void 0 : parent.id) != null ? _a : "0",
      children: [],
      _children: [],
      rawData: isInit ? rawData : rawData == null ? void 0 : rawData.rawData
    }, buildNodeStyle(__spreadProps(__spreadValues({}, rawData), { depth }), this.config));
    if (rawChildren) {
      rawChildren.filter((t) => !t.destroyed).forEach((c, j) => {
        var _a2;
        (_a2 = data == null ? void 0 : data.children) == null ? void 0 : _a2.push(this.createMdataFromData(c, `${id}-${j}`, data, isInit));
      });
    }
    if (_rawChildren) {
      _rawChildren.filter((t) => !t.destroyed).forEach((c, j) => {
        var _a2;
        (_a2 = data == null ? void 0 : data._children) == null ? void 0 : _a2.push(this.createMdataFromData(c, `${id}-${j}`, data, isInit));
      });
    }
    if (collapse2 && data.children.length) {
      data._children = [...data.children];
      data.children = [];
    }
    return data;
  }
  init(d, isInit = false) {
    this.data = this.createMdataFromData(d, "0", null, isInit);
    return this.data;
  }
  setConfig(config) {
    this.config = config;
  }
  find(id) {
    const array = id.split("-").map((n) => ~~n);
    let data = this.data;
    if (!data)
      return null;
    for (let i = 1; i < array.length; i++) {
      const index = array[i];
      const { children } = data;
      if (index < children.length) {
        data = children[index];
      } else {
        return null;
      }
    }
    return (data == null ? void 0 : data.id) === id ? data : null;
  }
  eoc(id, collapse2) {
    const d = this.find(id);
    if (d) {
      d.collapse = collapse2;
      [d._children, d.children] = [d.children, d._children];
    }
    return d;
  }
  expand(id) {
    return this.eoc(id, false);
  }
  collapse(id) {
    return this.eoc(id, true);
  }
  add(id, rawData) {
    const p = this.find(id);
    if (!p)
      return null;
    if (p.collapse) {
      this.expand(id);
    }
    if (!p.children) {
      p.children = [];
    }
    if (typeof rawData === "string") {
      rawData = { name: rawData };
    }
    const newData = this.createMdataFromData(rawData, `${id}-${p.children.length}`, p);
    p.children.push(newData);
    return newData;
  }
  addSibling(id, rawData, before = false) {
    const d = this.find(id);
    if (!d || !d.parentId)
      return null;
    if (typeof rawData === "string") {
      rawData = { name: rawData };
    }
    return this.add(d.parentId, rawData);
  }
  addParent(id, rawData) {
    let d = this.find(id);
    if (!d || !d.parentId)
      return null;
    const p = this.find(d.parentId);
    if (typeof rawData === "string") {
      rawData = { name: rawData };
    }
    const newData = this.createMdataFromData(__spreadProps(__spreadValues({}, rawData), {
      children: [d]
    }), id, p);
    this.replaceNode(id, newData);
    return newData;
  }
  replaceNode(id, rawData) {
    let d = this.find(id);
    let p = this.find(d.parentId);
    if (!(p == null ? void 0 : p.children))
      return;
    p.children.forEach((item) => {
      if (item.id === id) {
        for (let key in rawData) {
          item[key] = rawData[key];
        }
      }
    });
  }
  removeItem(id, real = true) {
    const d = this.find(id);
    if (d) {
      const p = this.find(d.parentId);
      if (!p)
        return;
      p.children.forEach((d2) => {
        if (d2.id === id) {
          d2.destroyed = true;
        }
      });
    }
    if (real) {
      this.init(this.data);
    }
  }
  removeOneItem(id) {
    const d = this.find(id);
    if (d) {
      const p = this.find(d.parentId);
      if (!p)
        return;
      p.children = p.children.filter((t) => t.id !== id);
      if (d.children) {
        const _pI = id.split(p.id + "-")[1];
        d.children.forEach((item, index) => {
          p.children.splice(+_pI, 0, this.createMdataFromData(item, p.id + "-" + index, p));
        });
      }
      p.children.forEach((t, i) => t.id = `${p.id}-${i}`);
    }
  }
  onlyShowCurrent(id) {
    const d = this.find(id);
    if (d) {
      if (d.collapse) {
        this.expand(id);
      }
      this._data.push(this.data);
      d.isSubView = true;
      this.data = this.createMdataFromData(d, "0");
    }
  }
  update(id, rawData) {
    let d = this.find(id);
    if (!d)
      return;
    const p = this.find(d.parentId);
    if (typeof rawData === "string") {
      rawData = __spreadProps(__spreadValues({}, d), { name: rawData });
    } else {
      rawData = __spreadValues(__spreadValues({}, d), rawData);
    }
    if (d.id === "0") {
      return this.init(rawData);
    } else {
      const newData = this.createMdataFromData(rawData, id, p);
      this.replaceNode(id, newData);
      return newData;
    }
  }
  backParent() {
    let _data = this._data.pop();
    this.data = _data;
  }
  moveData(pid, id, index) {
    let data = this.find(id);
    const p = this.find(pid);
    let isSibling = data.parentId === pid;
    if (!isSibling) {
      this.removeItem(id, false);
    }
    if (p.children.length) {
      let _data = [...p.children.filter((node) => node.id != id)];
      p.children = [];
      _data.splice(index, 0, data);
      _data.forEach((item, index2) => p.children.push(this.createMdataFromData(item, p.id + "-" + index2, p)));
    } else if (p._children.length) {
      let _data = [...p._children.filter((node) => node.id != id)];
      p._children = [];
      _data.splice(index, 0, data);
      _data.forEach((item, index2) => p._children.push(this.createMdataFromData(item, p.id + "-" + index2, p)));
      this.expand(pid);
    } else {
      this.add(pid, data);
    }
    this.init(this.data);
  }
}
var IMData$1 = new IMData();
class History {
  constructor() {
    this.data = [];
    this.index = 0;
  }
  push(data) {
    this.data.push(data);
    this.index = this.data.length - 1;
  }
  goBack(n = 1) {
    this.index--;
    if (this.index <= 0)
      this.index = 0;
    let data = this.data[this.index];
    return data;
  }
  forword(n = 1) {
    this.index++;
    if (this.index >= this.data.length - 1)
      this.index = this.data.length - 1;
    let data = this.data[this.index];
    return data;
  }
}
var History$1 = new History();
function buildStyle$1(obj) {
  let res = "";
  for (let key in obj) {
    res += `${key}:${obj[key]};`;
  }
  return res;
}
class EditInput {
  constructor() {
    this._input = null;
  }
  init(id) {
    this._input = document.getElementById(id);
    this._id = id;
    this.bindEvent();
  }
  showInput(nodeData) {
    var _a, _b;
    if (!this._input) {
      this.init(this._id);
      if (!this._input)
        return;
    }
    let NodeInput = this._input;
    const { x: pointX, y: pointY } = (_a = nodeData._cfg) == null ? void 0 : _a.bboxCache;
    const {
      name,
      style: {
        fontSize,
        width,
        height,
        maxWidth,
        FillColor,
        FontColor,
        stroke,
        nameLineHeight
      }
    } = (_b = nodeData._cfg) == null ? void 0 : _b.model;
    const Tree2 = globalTree.value;
    let ratio = Tree2.getZoom();
    let { x, y } = Tree2.getClientByPoint(pointX, pointY);
    NodeInput.style.cssText = buildStyle$1({
      transform: `scale(${ratio})`,
      "transform-origin": "0 0",
      display: "block",
      position: "fixed",
      top: `${y}px`,
      left: `${x}px`,
      width: `${width + stroke}px`,
      height: `${height + stroke}px`,
      "box-sizing": `border-box`,
      "font-size": `${fontSize}px`,
      "text-align": "left",
      "padding-top": `${paddingV / 2}px`,
      "padding-left": `${paddingH - stroke}px`,
      "border-radius": `${radius}px`,
      zIndex: 1,
      overflow: `hidden`,
      resize: `none`,
      outline: `none`,
      "font-weight": 600,
      color: FontColor,
      background: FillColor,
      border: `${stroke}px solid ${activeStrokeColor.value}`,
      "line-height": nameLineHeight + "px"
    });
    NodeInput.innerText = placeholderText === name ? "" : name;
    document.body.style["--placeholderText"] = placeholderText;
    NodeInput.classList[name === placeholderText ? "add" : "remove"]("empty");
  }
  changeStyle({ style: { width, stroke, height } }) {
    let NodeInput = this._input;
    NodeInput.style.width = `${width + stroke}px`;
    NodeInput.style.height = `${height + stroke}px`;
  }
  bindEvent() {
    if (!this._input)
      return;
    this._input.addEventListener("input", (ev) => {
      let input = ev.target;
      if (input.innerText.length > 0) {
        input.classList.remove("empty");
      } else {
        input.classList.add("empty");
      }
      this.handleInput(this._input.innerText === "" ? placeholderText : this._input.innerText);
    });
    this._input.addEventListener("blur", () => {
      this.handleInputBlur(this._input.innerText);
    });
    this._input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" && !ev.shiftKey) {
        let input = ev.target;
        this.handleInputBlur.call(this, input.innerText);
      }
    });
  }
  hideInput() {
    if (!this._input)
      return;
    this._input.style.display = "none";
    document.getElementById("mxs-mindmap_container").focus();
  }
  handlefocus(name) {
  }
  handleInput(name) {
  }
  handleInputBlur(name) {
  }
  moveCursor(len) {
    let range = new Range();
    let selection = document.getSelection();
    if (!selection)
      return;
    let text = this._input.lastChild;
    if (text) {
      range.setStart(text, 0);
      range.setEndAfter(text);
      range.collapse(false);
    } else {
      range.collapse(true);
    }
    selection.removeAllRanges();
    selection.addRange(range);
  }
  toFocus() {
    if (!this._input)
      return;
    this._input.focus();
    try {
      let timer = setTimeout(() => {
        this.moveCursor(this._input.innerText.length);
        clearTimeout(timer);
      }, 0);
    } catch (e) {
      console.log(e);
    }
  }
}
var EditInput$1 = new EditInput();
function mitt(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i ? i.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i = n.get(t);
    i && i.slice().map(function(n2) {
      n2(e);
    }), (i = n.get("*")) && i.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}
const emitter = mitt();
let dataArr = ref([]);
const pushData = (data) => {
  dataArr.value.push(data);
};
const popData = () => {
  return dataArr.value.pop();
};
const rePaint = (stack = true) => {
  let tree2 = globalTree.value;
  if (!IMData$1.data)
    return;
  tree2 == null ? void 0 : tree2.data(IMData$1.data);
  if (stack) {
    History$1.push(IMData$1.data);
  }
  tree2 == null ? void 0 : tree2.layout();
};
const addData = (id, rawData, editNow = true) => {
  let data = IMData$1.add(id, rawData);
  emitter.emit("onAdd", data);
  rePaint();
  if (data && editNow)
    edit(data.id);
};
const addParent = (id, rawData) => {
  let data = IMData$1.addParent(id, rawData);
  rePaint();
  if (data)
    edit(data.id);
};
const addSibling = (id, rawData) => {
  let data = IMData$1.addSibling(id, rawData);
  rePaint();
  if (data)
    edit(data.id);
};
const edit = (id, clear = false) => {
  if (closeEditInput.value)
    return emitter.emit("onEdit", { nodeData: findData(id) });
  const Tree2 = globalTree.value;
  const NodeData = Tree2 == null ? void 0 : Tree2.findById(id);
  if (!NodeData || !Tree2)
    return;
  setIsCurrentEdit(true);
  selectNode(id, true);
  let oldName = NodeData.get("model").name;
  if (clear) {
    NodeData.set("model", Object.assign(NodeData.get("model"), { name: "" }));
  }
  EditInput$1.showInput(NodeData);
  EditInput$1.toFocus();
  Tree2.on("wheel", () => {
    EditInput$1.hideInput();
  });
  EditInput$1.handleInput = (name) => {
    if (!isCurrentEdit.value)
      setIsCurrentEdit(true);
    let _name = name.replace(/\s/g, "");
    const pattern = new RegExp("[\u4E00-\u9FA5]+");
    let nL = _name.length * (pattern.test(_name) ? 2 : 1);
    let oL = oldName.length * (pattern.test(oldName) ? 2 : 1);
    const newData = buildNodeStyle({
      name: nL < oL ? oldName : _name,
      depth: NodeData.get("model").depth
    });
    EditInput$1.changeStyle(newData);
  };
  EditInput$1.handleInputBlur = (name) => {
    emitter.emit("onAfterEdit", {
      name: name.replace(/\s/g, ""),
      nodeData: findData(id)
    });
    let _name = name.replace(/\s/g, "");
    if (defaultAppendNode.value) {
      update(id, _name === "" ? oldName : _name);
    } else {
      deleteNode(id);
    }
    EditInput$1.hideInput();
    let timer = setTimeout(() => {
      clearTimeout(timer);
      setIsCurrentEdit(false);
    }, 100);
  };
};
const update = (id, name) => {
  IMData$1.update(id, typeof name === "string" ? { name } : name);
  selectNode(id, true);
  rePaint();
};
const selectNode = (id, selected) => {
  cancelAllSelect();
  globalTree.value.setItemState(id, "selected", selected);
  selected && emitter.emit("onSelectedNode", findData(id));
};
const cancelAllSelect = () => {
  globalTree.value.getNodes().forEach((item) => {
    if (item.hasState("selected")) {
      item.clearStates("selected");
      emitter.emit("onCancelSelected");
    }
  });
};
const getSelectedNodes = () => {
  return globalTree.value.getNodes().filter((item) => {
    return item.hasState("selected");
  }).map((item) => item.get("model").id);
};
const deleteNode = (id) => {
  IMData$1.removeItem(id);
  rePaint();
};
const deleteOneNode = (id) => {
  IMData$1.removeOneItem(id);
  rePaint();
};
const collapse = (id) => {
  let data = findData(id);
  if (data.children.length <= 0)
    return false;
  IMData$1.collapse(id);
  emitter.emit("onCollapse", findData(id));
  rePaint();
};
const expand = (id) => {
  IMData$1.expand(id);
  emitter.emit("onExpand", findData(id));
  rePaint();
};
const onlyShowCurrent = (id) => {
  IMData$1.onlyShowCurrent(id);
  rePaint();
};
const backParent = (id) => {
  IMData$1.backParent();
  rePaint();
};
const reDo = () => {
  let data = History$1.forword();
  if (data) {
    IMData$1.data = __spreadValues({}, data);
  }
  rePaint(false);
};
const unDo = () => {
  let data = History$1.goBack();
  if (data) {
    IMData$1.data = __spreadValues({}, data);
  }
  rePaint(false);
};
const findData = (id) => {
  return IMData$1.find(id);
};
const moveData = (parentId, nodeId, index) => {
  IMData$1.moveData(parentId, nodeId, index);
  rePaint();
};
const copy = (ids) => {
  pushData(ids.map((id) => findData(id)));
};
const cut = (ids) => {
  pushData(ids.map((id) => findData(id)));
  ids.forEach((id) => {
    deleteNode(id);
  });
};
const paste = (pid) => {
  let data = popData();
  if (data) {
    data.forEach((item) => {
      addData(pid, item);
    });
    rePaint();
  }
};
const createACopy = (id) => {
  copy([id]);
  findData(id);
  paste(findData(id).parentId);
  rePaint();
};
const nodeMenuMap = {
  add: {
    name: "add",
    title: "\u6DFB\u52A0\u5B50\u8282\u70B9",
    click: (node) => {
      addData(node == null ? void 0 : node.id, "", true);
    }
  },
  "add-parent": {
    name: "add-parent",
    title: "\u6DFB\u52A0\u7236\u7EA7\u8282\u70B9",
    click: (node) => {
      addParent(node == null ? void 0 : node.id, "");
    }
  },
  "add-sibling": {
    name: "add-sibling",
    title: "\u6DFB\u52A0\u5144\u5F1F\u8282\u70B9",
    click: (node) => {
      addSibling(node == null ? void 0 : node.id, "");
    }
  },
  "edit": {
    name: "edit",
    title: "\u7F16\u8F91\u5F53\u524D\u8282\u70B9",
    click: (node) => {
      edit(node == null ? void 0 : node.id);
    }
  },
  "delete": {
    name: "delete",
    title: "\u5220\u9664\u5F53\u524D\u8282\u70B9",
    click: (node) => {
      deleteNode(node == null ? void 0 : node.id);
    }
  },
  "collapse": {
    name: "collapse",
    title: "\u6536\u8D77\u6A21\u578B",
    click: (node) => {
      collapse(node == null ? void 0 : node.id);
    }
  },
  "expand": {
    name: "expand",
    title: "\u5C55\u5F00\u6A21\u578B",
    click: (node) => {
      expand(node == null ? void 0 : node.id);
    }
  },
  "only-show-current": {
    name: "only-show-current",
    title: "\u8FDB\u5165\u5F53\u524D\u8282\u70B9",
    click: (node) => {
      onlyShowCurrent(node == null ? void 0 : node.id);
    }
  },
  "back-parent": {
    name: "back-parent",
    title: "\u8FD4\u56DE\u4E0A\u4E00\u7EA7\u8282\u70B9",
    click: (node) => {
      backParent(node == null ? void 0 : node.id);
    }
  }
};
const nodeMenuClickList = {};
const contextMenu = () => new G6.Menu({
  getContent(evt) {
    if (!evt)
      return `div`;
    const isCanvasTarget = evt.target && evt.target.isCanvas && evt.target.isCanvas();
    return isCanvasTarget ? renderCanvasMenu() : renderNodeMenu(evt);
  },
  handleMenuClick: (target, item, graph) => {
    handleMenuClick(target, item, graph);
  },
  offsetX: 10,
  offsetY: -100,
  itemTypes: ["node", "canvas"]
});
function renderCanvasMenu(evt) {
  return `<ul>
               <li code="enlarge">\u653E\u5927</li>
               <li code="ensmall">\u7F29\u5C0F</li>
              ${fitBtn.value ? `<li code="fit">\u7F29\u653E\u5230\u5408\u9002\u5927\u5C0F</li>` : ``} 
               ${centerBtn.value ? `<li code="center">\u7F29\u653E\u5230\u5C4F\u5E55\u4E2D\u95F4</li>` : ``}
               ${downloadBtn.value ? `<li code="download">\u4E0B\u8F7D</li>` : ``}
           </ul>`;
}
function renderNodeMenu(evt) {
  const nodeData = evt.item._cfg.model;
  let menuList = nodeMenuList.value;
  let { depth, collapse: collapse2, isSubView, children } = nodeData;
  let str = menuList.map((group) => {
    return `<ul class="group">
            ${group.map((item) => {
      if (typeof item === "string") {
        let itemInfo = nodeMenuMap[item];
        if (!itemInfo)
          return "";
        if (depth === 0 && ["add-parent", "add-sibling", "delete"].indexOf(item) != -1)
          return "";
        if (item === "collapse" && (collapse2 || children.length === 0))
          return "";
        if (!collapse2 && item === "expand")
          return "";
        if (!isSubView && depth === 0 && item === "only-show-current")
          return "";
        if (isSubView && depth === 0 && item === "only-show-current")
          itemInfo = nodeMenuMap["back-parent"];
        nodeMenuClickList[itemInfo.name] = itemInfo.click;
        let hotkey = hotkeys.value.filter((item2) => item2.name === itemInfo.name)[0];
        if (hotkey) {
          return `<li code="Node" name="${itemInfo.name}"><div code="Node" name="${itemInfo.name}">${itemInfo.title}</div><div class="small-tip" code="Node" name="${itemInfo.name}">${hotkey.control ? `${hotkey.control}+` : ""}${hotkey.key}</div></li>`;
        } else {
          return `<li code="Node" name="${itemInfo.name}">${itemInfo.title}</li>`;
        }
      } else if (typeof item === "object" && item.title) {
        nodeMenuClickList[item.name] = item.click;
        return `<li code="Node" name="${item.name}">${item.title}</li>`;
      } else {
        return "";
      }
    }).join("")}
        </ul>`;
  }).join("");
  return str;
}
function handleMenuClick(target, item, graph) {
  if (target.getAttribute("code") === "enlarge") {
    graph.zoom(1.2, { x: graph.getWidth() / 2, y: graph.getHeight() / 2 });
  } else if (target.getAttribute("code") === "ensmall") {
    graph.zoom(0.8, { x: graph.getWidth() / 2, y: graph.getHeight() / 2 });
  } else if (target.getAttribute("code") === "fit") {
    graph.layout(true);
  } else if (target.getAttribute("code") === "center") {
    graph.fitCenter();
    graph.zoomTo(scaleRatio.value, {
      x: graph.getWidth() / 2,
      y: graph.getHeight() / 2
    });
  } else if (target.getAttribute("code") === "download") {
    graph.downloadFullImage("mindmap_" + Date.now(), "image/jpeg", {
      backgroundColor: "#ddd",
      padding: [30, 15, 15, 15]
    });
  } else if (target.getAttribute("code") === "Node") {
    let name = target.getAttribute("name");
    if (name) {
      nodeMenuClickList[name](item.get("model"), item, graph);
    }
  }
}
const mindmap = () => new G6.Minimap({
  size: [100, 100],
  className: "mindmap-miniGap",
  viewportClassName: "mindmap-miniGap-viewPort",
  type: "delegate",
  delegateStyle: {
    fill: themeColor.value,
    stroke: themeColor.value
  }
});
const toolbar = () => new G6.ToolBar({
  className: "mindmap-toolbar",
  getContent: () => {
    return `
<div>
${timetravel.value ? `
<div class="mindmap-toolbar-top">
<ul class='mindmap-toolbar'>
        <li class='mindmap-toolbar-list_item' code='undo' title="\u64A4\u9500"><i class="icon-undo"></i></li>
        <li class='mindmap-toolbar-list_item' code='redo' title="\u6062\u590D"><i class="icon-redo"></i></li>
      </ul>
</div>` : ""}
<div class="mindmap-toolbar-bottom">
<ul class='mindmap-toolbar'>
        ${downloadBtn.value ? `<li class='mindmap-toolbar-list_item' code='download' title="\u4E0B\u8F7D\u56FE\u7247"><i class="icon-download"></i></li>` : ""}
        ${centerBtn.value ? `<li class='mindmap-toolbar-list_item' code='center' title="\u7F29\u653E\u5230\u5C4F\u5E55\u4E2D\u5FC3"><i class="icon-center"></i>\u7F29\u653E\u5230\u753B\u5E03\u4E2D\u5FC3</li>` : ""}
        ${fitBtn.value ? `<li class='mindmap-toolbar-list_item' code='fit' title="\u7F29\u653E\u5230\u5408\u9002\u6BD4\u4F8B"><i class="icon-fit"></i></li>` : ""}
      </ul>
</div>
</div>
    `;
  },
  handleClick: (code, graph) => {
    switch (code) {
      case "undo":
        toolbar.undo();
        break;
      case "redo":
        toolbar.redo();
        break;
      case "download":
        graph.downloadFullImage("mindmap_" + Date.now(), "image/jpeg", {
          backgroundColor: "#ddd",
          padding: [30, 15, 15, 15]
        });
        break;
      case "fit":
        graph.layout(true);
        break;
      case "center":
        graph.fitCenter();
        graph.zoomTo(scaleRatio.value, {
          x: graph.getWidth() / 2,
          y: graph.getHeight() / 2
        });
        break;
    }
  }
});
const tooltip = {
  type: "tooltip",
  formatText(model) {
    return model.content || model.desc || model.fullName;
  },
  offset: 10
};
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
const { Util } = G6;
function drawHandleBtn(group, cfg, type) {
  const {
    style: { width, height, opacity = 1 },
    _children
  } = cfg;
  const fontSize = 14;
  const text = {
    add: "+",
    collapse: "<",
    expand: _children.length + "" || "0"
  }[type];
  const widthHeight = Util.getTextSize(text, fontSize);
  const isExpand = type === "expand";
  const r = widthHeight[0] / 2 + 4;
  const lineStyle = isExpand ? {
    x: width + 1,
    y: height / 2 - 1,
    width: 10,
    height: 2,
    fill: themeColor.value,
    opacity
  } : { width: 0 };
  const handleStyle = {
    x: width,
    y: 0,
    width: widthHeight[0] + lineStyle.width + r + 3,
    height,
    fill: "transparent"
  };
  const fill = isExpand ? "transparent" : themeColor.value;
  const stroke = isExpand ? themeColor.value : "transparent";
  const textColor = isExpand ? themeColor.value : fontColor_root.value;
  const visible = isExpand ? true : false;
  const circleStyle = {
    x: width + lineStyle.width + r + 3,
    y: height / 2,
    r,
    fill,
    stroke,
    lineWidth: 2,
    cursor: "pointer",
    opacity
  };
  const textStyle = {
    x: width + lineStyle.width + r - widthHeight[0] / 2 + 3,
    y: height / 2 - r / 2 - 4,
    text,
    fill: textColor,
    fontSize,
    fontWeight: 600,
    textBaseline: "top",
    cursor: "pointer",
    opacity
  };
  const container = group.addGroup({
    name: type,
    visible,
    capture: true,
    action: type
  });
  container == null ? void 0 : container.addShape("rect", { attrs: lineStyle });
  container == null ? void 0 : container.addShape("rect", { attrs: handleStyle });
  container == null ? void 0 : container.addShape("circle", { attrs: circleStyle, action: type });
  container == null ? void 0 : container.addShape("text", { attrs: textStyle, action: type });
}
function getAttribute(cfg) {
  const {
    style: {
      width,
      height,
      nameHeight,
      nameLineHeight,
      fontSize,
      descFontSize,
      descHeight,
      FillColor,
      FontColor,
      opacity = 1,
      stroke,
      strokeColor,
      imageIconWidth
    }
  } = cfg;
  const RectStyle = {
    x: 0,
    y: 0,
    width,
    height,
    radius,
    fill: FillColor,
    cursor: "pointer",
    stroke: strokeColor,
    lineWidth: stroke,
    opacity
  };
  const TextStyle = {
    x: paddingH + imageIconWidth,
    y: paddingV,
    text: cfg == null ? void 0 : cfg.label,
    fill: FontColor,
    fontSize,
    textBaseline: "top",
    cursor: "pointer",
    fontWeight: 600,
    lineHeight: nameLineHeight,
    opacity
  };
  const IconStyle = {
    x: paddingH,
    y: 0,
    opacity,
    img: cfg.iconPath,
    width: imageIconWidth,
    height: imageIconWidth
  };
  const DescWrapper = {
    x: 0,
    y: nameHeight,
    width,
    height: descHeight,
    radius: [0, 0, radius, radius],
    fill: "rgba(255,255,255,0.3)",
    cursor: "pointer",
    stroke: "transparent",
    lineWidth: 2,
    opacity
  };
  const DescText = {
    x: paddingV,
    y: paddingV + nameHeight,
    text: cfg == null ? void 0 : cfg.desc,
    fill: FontColor,
    fontSize: descFontSize,
    textBaseline: "top",
    cursor: "pointer",
    lineHeight: paddingV + descFontSize,
    opacity
  };
  return { RectStyle, TextStyle, DescWrapper, DescText, IconStyle };
}
function buildStyle(obj) {
  let res = "";
  for (let key in obj) {
    res += `${key}:${obj[key]};`;
  }
  return res;
}
function getStyle(cfg) {
  const {
    style: { fontSize, FillColor, FontColor, stroke, nameLineHeight }
  } = cfg;
  return buildStyle({
    width: "100%",
    height: "100%",
    display: "block",
    "box-sizing": `border-box`,
    "font-size": `${fontSize}px`,
    "text-align": "left",
    "border-radius": `${radius}px`,
    "z-index": 1,
    overflow: `hidden`,
    "font-weight": 600,
    color: FontColor,
    background: FillColor,
    border: `${stroke}px solid ${activeStrokeColor.value}`,
    "line-height": nameLineHeight + "px"
  });
}
function buildCanvasNode(cfg, group) {
  const { RectStyle, TextStyle, DescWrapper, DescText, IconStyle } = getAttribute(cfg);
  const { depth, collapse: collapse2 } = cfg;
  const container = group == null ? void 0 : group.addShape("rect", {
    attrs: RectStyle,
    name: `wrapper`,
    zIndex: 0,
    draggable: depth > 0
  });
  group == null ? void 0 : group.addShape("image", {
    attrs: IconStyle,
    name: `icon`,
    zIndex: 1,
    draggable: depth > 0
  });
  group == null ? void 0 : group.addShape("text", {
    attrs: TextStyle,
    name: `title`,
    zIndex: 1,
    draggable: depth > 0
  });
  if (cfg.desc) {
    group == null ? void 0 : group.addShape("rect", {
      attrs: DescWrapper,
      name: `desc-wrapper`,
      zIndex: 0,
      draggable: depth > 0
    });
    group == null ? void 0 : group.addShape("text", {
      attrs: DescText,
      name: `desc`,
      zIndex: 1,
      draggable: depth > 0
    });
  }
  drawHandleBtn(group, cfg, "add");
  if (cfg.children.length > 0 || cfg._children.length > 0) {
    drawHandleBtn(group, cfg, collapse2 ? "expand" : "collapse");
  }
  return container;
}
function buildDomNode(cfg, group) {
  const { depth } = cfg;
  const container = group == null ? void 0 : group.addShape("dom", {
    attrs: {
      width: cfg.style.width,
      height: cfg.style.height,
      html: `<div style=${getStyle(cfg)}>
      <p style="margin:0;display:flex;align-items:center"><img src="${cfg.iconPath}" style="width:${cfg.style.imageIconWidth}px;height:${cfg.style.imageIconWidth}px"/>${cfg.name}</p>
      <div style="max-height:${cfg.style.descHeight}px;overflow:overlay;">${cfg.desc}</div>
      </div>`
    },
    name: `wrapper`,
    zIndex: 0,
    draggable: depth > 0
  });
  return container;
}
const getNode = (group, name) => group.get("children").filter((t) => t.get("name") === name)[0];
const getCollapseBtn = (group) => getNode(group, "collapse");
const getWrapper = (group) => getNode(group, "wrapper");
const getAddBtn = (group) => getNode(group, "add");
function handleNodeHover(state, node) {
  if (isCurrentEdit.value)
    return;
  const group = node.getContainer();
  const isCurrentSelected = node.hasState("selected");
  let collapseBtn = getCollapseBtn(group);
  const visible = state && !isCurrentSelected;
  collapseBtn && collapseBtn[visible ? "show" : "hide"]();
  let wrapper = getWrapper(group);
  let hoverColor = "transparent";
  if (state && !isCurrentSelected)
    hoverColor = hoverStrokeColor.value;
  if (!isCurrentSelected) {
    wrapper == null ? void 0 : wrapper.attr("stroke", hoverColor);
  }
}
function handleNodeSelected(state, node) {
  node[state ? "toFront" : "toBack"]();
  const group = node.getContainer();
  let addBtn = getAddBtn(group);
  let collapseBtn = getCollapseBtn(group);
  collapseBtn == null ? void 0 : collapseBtn.hide();
  if (!(node.get("model").collapse && node.get("model")._children.length)) {
    addBtn == null ? void 0 : addBtn[state ? "show" : "hide"]();
  }
  if (isCurrentEdit.value)
    addBtn == null ? void 0 : addBtn.hide();
  let wrapper = group.get("children").filter((t) => t.get("name") === "wrapper")[0];
  wrapper == null ? void 0 : wrapper.attr("stroke", state ? activeStrokeColor.value : "transparent");
}
G6.registerNode("mindmap-node", {
  draw(cfg, group) {
    const container = buildCanvasNode(cfg, group);
    return container;
  },
  setState(name, state, node) {
    if (name === "hover")
      handleNodeHover(state, node);
    if (name === "selected")
      handleNodeSelected(state, node);
  },
  getAnchorPoints() {
    return [
      [0, 0.5],
      [1, 0.5]
    ];
  }
});
G6.registerNode("dom-node", {
  draw(cfg, group) {
    const container = buildDomNode(cfg, group);
    return container;
  },
  setState(name, state, node) {
    if (name === "hover")
      handleNodeHover(state, node);
    if (name === "selected")
      handleNodeSelected(state, node);
  },
  getAnchorPoints() {
    return [
      [0, 0.5],
      [1, 0.5]
    ];
  }
});
G6.registerEdge("hvh", {
  draw(cfg, group) {
    if (!cfg || !group)
      return;
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    let dist = endPoint.y < startPoint.y ? 10 : -10;
    if (endPoint.y === startPoint.y) {
      dist = 0;
    }
    const shape = group.addShape("path", {
      attrs: {
        cursor: "pointer",
        stroke: branchColor.value,
        lineWidth: branch.value,
        opacity: cfg.style.opacity == null ? 1 : cfg.style.opacity,
        path: [
          ["M", startPoint.x, startPoint.y],
          ["L", endPoint.x / 3 + 2 / 3 * startPoint.x, startPoint.y],
          [
            "L",
            endPoint.x / 3 + 2 / 3 * startPoint.x,
            startPoint.y + (endPoint.y - startPoint.y) + dist
          ],
          [
            "Q",
            endPoint.x / 3 + 2 / 3 * startPoint.x,
            startPoint.y + (endPoint.y - startPoint.y),
            endPoint.x / 3 + 2 / 3 * startPoint.x + 10,
            endPoint.y
          ],
          ["L", endPoint.x, endPoint.y]
        ]
      },
      name: "path-shape",
      zIndex: 0
    });
    return shape;
  }
});
G6.registerBehavior("edit-mindmap-pc", {
  selectNodeId: null,
  dragNodeId: null,
  nodePosition: {},
  dragStatus: "",
  upClientInfo: [],
  getEvents() {
    return {
      "node:click": "clickNode",
      "node:touchend": "clickNode",
      "node:dblclick": "editNode",
      "node:mouseover": "hoverNode",
      "node:mouseleave": "clearHoverStatus",
      "node:dragstart": "dragStart",
      "node:contextmenu": "selectNode",
      "canvas:click": "clickCanvas",
      "canvas:touchend": "clickCanvas"
    };
  },
  clickCanvas(evt) {
    cancelAllSelect();
  },
  clickNode(evt) {
    evt.currentTarget;
    evt.item;
    const model = evt.item.get("model");
    const name = evt.target.get("action");
    if (name === "expand") {
      expand(model.id);
    } else if (name === "collapse") {
      collapse(model.id);
    } else if (name === "add") {
      addData(model == null ? void 0 : model.id, "", true);
    } else {
      selectNode(model.id, !model.isCurrentSelected);
    }
  },
  selectNode(evt) {
    const model = evt.item.get("model");
    selectNode(model.id, !model.isCurrentSelected);
  },
  editNode(evt) {
    const item = evt.item;
    const model = item.get("model");
    edit(model.id);
  },
  hoverNode(evt) {
    const { currentTarget: tree2, item: node } = evt;
    if (isDragging.value)
      return;
    tree2.setItemState(node, "hover", true);
    node.toFront();
    tree2.paint();
  },
  clearHoverStatus(evt) {
    let { currentTarget: tree2, item: node } = evt;
    tree2.setItemState(node, "hover", false);
    tree2.paint();
  },
  dragStart(evt) {
    const { currentTarget: tree2, item: node, clientX, clientY } = evt;
    const id = node.get("model").id;
    setIsDragging(true);
    this.dragNodeId = id;
    const _dragnode = tree2.findById(this.dragNodeId);
    tree2.setItemState(id, "hover", false);
    document.documentElement.style.cursor = "grabbing";
    tree2.getNodes().forEach((node2) => {
      const nodeId = node2.get("id");
      const { x: pointX, y: pointY, width, height } = node2.getBBox();
      let { x: clientX2, y: clientY2 } = tree2.getClientByPoint(pointX, pointY);
      let model = node2.get("model");
      const ratio2 = tree2.getZoom();
      this.nodePosition[nodeId] = {
        clientX: clientX2,
        clientY: clientY2,
        width: width * ratio2,
        height: height * ratio2,
        depth: model.depth,
        parentId: model.parentId,
        sameLevel: model.depth === _dragnode.get("model").depth
      };
      if (nodeId.indexOf(this.dragNodeId) === 0) {
        tree2.updateItem(node2, {
          style: {
            opacity: 0.2
          }
        });
        node2.get("edges").forEach((edge) => {
          tree2.updateItem(edge, {
            style: {
              opacity: 0.2
            }
          });
        });
      }
    });
    this.showDragDiv(clientX, clientY);
    let ratio = tree2.getZoom();
    window.onmousemove = (ev) => this.dragNode.call(this, {
      tree: tree2,
      clientX: ev.clientX,
      clientY: ev.clientY,
      width: 40 * ratio / 2,
      height: 20 * ratio / 2
    });
    window.onmouseup = (ev) => this.dragEnd.call(this, {
      tree: tree2,
      clientX: ev.clientX,
      clientY: ev.clientY
    });
  },
  dragNode({ tree: tree2, clientX, clientY, width, height }) {
    if (!isDragging.value)
      return;
    let nodePosition = this.nodePosition;
    let nodes = [];
    for (let nodeId in nodePosition) {
      let node = nodePosition[nodeId];
      let size = (globalFontSize[node.depth] || 12) * maxFontCount + paddingH * 4 + width * 4;
      let parentNode = findData(node.parentId);
      let firstNode = node;
      let lastNode = node;
      if (parentNode.children.length) {
        firstNode = nodePosition[parentNode.children[0].id];
        lastNode = nodePosition[parentNode.children[parentNode.children.length - 1].id];
      }
      let coditionH_inner = clientX - width > node.clientX - width * 2 && clientX + width < node.clientX + node.width + width * 2;
      let coditionV_inner = clientY - height > node.clientY - height * 2 && clientY + height < node.clientY + node.height + height * 2;
      let coditionH_outer = clientX - width > node.clientX - width * 2 && clientX + width < node.clientX + size + width * 2;
      let coditionV_outer = clientY - height > firstNode.clientY - height * 2 && clientY + height < lastNode.clientY + lastNode.height + height * 2;
      if (coditionH_inner && coditionV_inner) {
        nodes.push({
          nodeId,
          inner: true,
          depth: node.depth,
          index: +nodeId.split("-").pop(),
          sameLevel: true,
          parentId: node.parentId
        });
      } else if (coditionH_outer && coditionV_inner) {
        nodes.push({
          nodeId,
          inner: false,
          depth: node.depth,
          index: +nodeId.split("-").pop(),
          sameLevel: false,
          parentId: node.parentId
        });
      } else if (coditionH_inner && coditionV_outer && clientX - width > node.clientX && nodeId != node.parentId) {
        nodes.push({
          nodeId,
          inner: false,
          depth: node.depth,
          index: +nodeId.split("-").pop(),
          sameLevel: true,
          parentId: node.parentId
        });
      }
    }
    if (nodes.length) {
      let node = nodes.filter((node2) => node2.inner || !node2.inner && !node2.sameLevel);
      if (node.length > 1) {
        node.sort((a, b) => {
          if (a.depth === b.depth) {
            return a.index - b.index;
          } else {
            return b.depth - a.depth;
          }
        });
      }
      if (nodes.length > 1) {
        nodes.sort((a, b) => {
          if (a.depth === b.depth) {
            return a.index - b.index;
          } else {
            return b.depth - a.depth;
          }
        });
      }
      node = node.length ? node[0] : nodes[0];
      let nodeId = node.sameLevel ? node.parentId : node.nodeId;
      if (nodeId.indexOf(this.dragNodeId) != -1) {
        cancelAllSelect();
        this.selectNodeId = null;
        this.showDragDiv(clientX, clientY, false, null);
        this.dragStatus = "";
        return;
      }
      selectNode(nodeId, true);
      this.selectNodeId = nodeId;
      this.showDragDiv(clientX, clientY, true, nodeId);
      this.dragStatus = "child";
      this.upClientInfo = [clientX, clientY];
    } else {
      cancelAllSelect();
      this.selectNodeId = null;
      this.showDragDiv(clientX, clientY, false, null);
      this.dragStatus = "";
    }
  },
  dragEnd({ tree: tree2 }) {
    if (!isDragging.value)
      return;
    setIsDragging(false);
    document.documentElement.style.cursor = "default";
    this.hideDragDiv();
    if (this.dragStatus !== "" && this.selectNodeId) {
      const parentNode = tree2.findDataById(this.selectNodeId);
      let index = 0;
      for (let i = 0, len = parentNode.children.length; i < len; i++) {
        let node = parentNode.children[i];
        if (node.id === this.dragNodeId)
          continue;
        if (this.nodePosition[node.id].clientY + this.nodePosition[node.id].height / 2 < this.upClientInfo[1]) {
          index++;
        } else {
          break;
        }
      }
      emitter.emit("onDragEnd", [
        findData(this.dragNodeId),
        findData(this.selectNodeId),
        index
      ]);
      moveData(this.selectNodeId, this.dragNodeId, index);
    }
    tree2.getNodes().forEach((node) => {
      node.get("id");
      tree2.updateItem(node, {
        style: {
          opacity: 1
        }
      });
      node.get("edges").forEach((edge) => {
        tree2.updateItem(edge, {
          style: {
            opacity: 1
          }
        });
      });
    });
    cancelAllSelect();
    this.selectNodeId = null;
    this.dragStatus = "";
    this.nodePosition = {};
    window.onmousemove = null;
    window.onmouseup = null;
  },
  showDragDiv(clientX, clientY, showLine, parentId) {
    const tree2 = globalTree.value;
    const { x, y } = tree2.getPointByClient(clientX, clientY);
    const model = {
      id: "moveNode",
      label: "",
      x,
      y,
      type: "rect",
      zIndex: 3,
      style: {
        width: 40,
        height: 20,
        fill: themeColor.value,
        radius,
        opacity: 0.6,
        cursor: "grabbing"
      }
    };
    const edgeOption = {
      id: "moveNodeEdge",
      source: parentId || "0",
      target: "moveNode",
      type: lineType.value,
      zIndex: 3,
      style: {
        stroke: branchColor.value,
        lineWidth: branch.value,
        opacity: showLine ? 0.6 : 0,
        cursor: "grabbing"
      }
    };
    const moveNode = tree2.getNodes().filter((item) => item.get("id") === "moveNode");
    const moveEdge = tree2.getEdges().filter((item) => item.get("id") === "moveNodeEdge");
    if (moveNode.length && moveEdge.length) {
      tree2.updateItem(moveNode[0], model);
      tree2.updateItem(moveEdge[0], edgeOption);
    } else {
      tree2.addItem("node", model);
      tree2.addItem("edge", edgeOption);
    }
    return { moveNode: moveNode[0] };
  },
  hideDragDiv() {
    const tree2 = globalTree.value;
    const moveNode = tree2.getNodes().filter((item) => item.get("id") === "moveNode");
    if (moveNode.length) {
      tree2.removeItem(moveNode[0]);
    }
  }
});
G6.registerBehavior("double-finger-drag-canvas", {
  getEvents: function getEvents() {
    return {
      wheel: "onWheel"
    };
  },
  reCalcDir: true,
  timer: null,
  onWheel: function onWheel(ev) {
    const graph = globalTree.value;
    if (ev.ctrlKey) {
      const canvas = graph.get("canvas");
      const point = canvas.getPointByClient(ev.clientX, ev.clientY);
      let ratio = graph.getZoom();
      if (ev.wheelDelta > 0) {
        ratio = ratio + ratio * 0.05;
      } else {
        ratio = ratio - ratio * 0.05;
      }
      graph.zoomTo(ratio, {
        x: point.x,
        y: point.y
      });
    } else {
      let direction = "all";
      let x = ev.deltaX || ev.movementX;
      let y = ev.deltaY || ev.movementY;
      if (controlMoveDirection.value) {
        direction = Math.abs(x) < Math.abs(y) ? "v" : "h";
        this.reCalcDir = false;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.reCalcDir = true;
        }, 1e3);
      }
      if (!y && navigator.userAgent.indexOf("Firefox") > -1)
        y = -ev.wheelDelta * 125 / 3;
      if (direction === "h") {
        y = 0;
      } else if (direction === "v") {
        x = 0;
      }
      graph.translate(-x, -y);
    }
    ev.preventDefault();
  }
});
G6.registerBehavior("my-shortcut", {
  focusCanvasId: "mxs-mindmap_container",
  getEvents: function getEvents2() {
    return {
      keydown: "handleKeydown"
    };
  },
  handleKeydown(evt) {
    var _a;
    if (((_a = document.activeElement) == null ? void 0 : _a.id) !== this.focusCanvasId || isCurrentEdit.value)
      return;
    const { key, shiftKey, ctrlKey, altKey, metaKey } = evt;
    let handler = hotkeys.value.filter((item) => item.key === key);
    if (shiftKey || ctrlKey || altKey || metaKey) {
      if (shiftKey) {
        handler = handler.filter((item) => {
          var _a2;
          return ((_a2 = item.control) == null ? void 0 : _a2.indexOf("shift")) > -1;
        });
      }
      if (ctrlKey) {
        handler = handler.filter((item) => {
          var _a2;
          return ((_a2 = item.control) == null ? void 0 : _a2.indexOf("ctrl")) > -1;
        });
      }
      if (metaKey) {
        handler = handler.filter((item) => {
          var _a2;
          return ((_a2 = item.control) == null ? void 0 : _a2.indexOf("cmd")) > -1;
        });
      }
      if (altKey) {
        handler = handler.filter((item) => {
          var _a2;
          return ((_a2 = item.control) == null ? void 0 : _a2.indexOf("alt")) > -1;
        });
      }
    } else if (handler.length === 1 && handler[0].control) {
      handler = [];
    }
    if (isCurrentEdit.value)
      return;
    if (!handler.length) {
      let selectNodeId = getSelectedNodes()[0];
      if (selectNodeId) {
        edit(selectNodeId, true);
      }
    } else {
      evt.preventDefault();
      handler[0].Event.call(this, getSelectedNodes());
    }
  }
});
G6.registerBehavior("edit-mindmap-mobile", {
  selectNodeId: null,
  dragNodeId: null,
  nodePosition: {},
  dragStatus: "",
  upClientInfo: [],
  readyToDrag: false,
  getEvents() {
    return {
      "node:touchstart": "handleTouchStart",
      "canvas:touchmove": "dragNode",
      "canvas:touchend": "handleTouchEnd",
      "node:touchend": "handleTouchEnd"
    };
  },
  handleTouchStart(evt) {
    this.readyToDrag = true;
    let timer = setTimeout(() => {
      if (this.readyToDrag) {
        this.dragStart(evt);
        clearTimeout(timer);
      }
    }, 400);
  },
  handleTouchEnd(evt) {
    this.readyToDrag = false;
    if (!isDragging.value) {
      this.clickNode(evt);
    } else {
      this.dragEnd(evt);
    }
  },
  clickNode(evt) {
    evt.currentTarget;
    const node = evt.item;
    const model = evt.item.get("model");
    const name = evt.target.get("action");
    if (name === "expand") {
      expand(model.id);
    } else if (name === "collapse") {
      collapse(model.id);
    } else if (name === "add") {
      addData(model == null ? void 0 : model.id, "", true);
    } else if (node.hasState("selected")) {
      edit(model.id);
    } else {
      selectNode(model.id, !model.isCurrentSelected);
    }
  },
  dragStart(evt) {
    const { currentTarget: tree2, item: node, clientX, clientY } = evt;
    const id = node.get("model").id;
    setIsDragging(true);
    this.dragNodeId = id;
    const _dragnode = tree2.findById(this.dragNodeId);
    tree2.getNodes().forEach((node2) => {
      const nodeId = node2.get("id");
      const { x: pointX, y: pointY, width, height } = node2.getBBox();
      let { x: clientX2, y: clientY2 } = tree2.getClientByPoint(pointX, pointY);
      let model = node2.get("model");
      const ratio = tree2.getZoom();
      this.nodePosition[nodeId] = {
        clientX: clientX2,
        clientY: clientY2,
        width: width * ratio,
        height: height * ratio,
        depth: model.depth,
        parentId: model.parentId,
        sameLevel: model.depth === _dragnode.get("model").depth
      };
      if (nodeId.indexOf(this.dragNodeId) === 0) {
        tree2.updateItem(node2, {
          style: {
            opacity: 0.2
          }
        });
        node2.get("edges").forEach((edge) => {
          tree2.updateItem(edge, {
            style: {
              opacity: 0.2
            }
          });
        });
      }
    });
    this.showDragDiv(clientX, clientY);
  },
  dragNode(evt) {
    if (!isDragging.value)
      return;
    const { currentTarget: tree2, clientX, clientY } = evt;
    let ratio = tree2.getZoom();
    const [width, height] = [40 * ratio / 2, 20 * ratio / 2];
    let nodePosition = this.nodePosition;
    let nodes = [];
    for (let nodeId in nodePosition) {
      let node = nodePosition[nodeId];
      let size = (globalFontSize[node.depth] || 12) * maxFontCount + paddingH * 4 + width * 4;
      let parentNode = findData(node.parentId);
      let firstNode = node;
      let lastNode = node;
      if (parentNode.children.length) {
        firstNode = nodePosition[parentNode.children[0].id];
        lastNode = nodePosition[parentNode.children[parentNode.children.length - 1].id];
      }
      let coditionH_inner = clientX - width > node.clientX - width * 2 && clientX + width < node.clientX + node.width + width * 2;
      let coditionV_inner = clientY - height > node.clientY - height * 2 && clientY + height < node.clientY + node.height + height * 2;
      let coditionH_outer = clientX - width > node.clientX - width * 2 && clientX + width < node.clientX + size + width * 2;
      let coditionV_outer = clientY - height > firstNode.clientY - height * 2 && clientY + height < lastNode.clientY + lastNode.height + height * 2;
      if (coditionH_inner && coditionV_inner) {
        nodes.push({
          nodeId,
          inner: true,
          depth: node.depth,
          index: +nodeId.split("-").pop(),
          sameLevel: true,
          parentId: node.parentId
        });
      } else if (coditionH_outer && coditionV_inner) {
        nodes.push({
          nodeId,
          inner: false,
          depth: node.depth,
          index: +nodeId.split("-").pop(),
          sameLevel: false,
          parentId: node.parentId
        });
      } else if (coditionH_inner && coditionV_outer && clientX - width > node.clientX && nodeId != node.parentId) {
        nodes.push({
          nodeId,
          inner: false,
          depth: node.depth,
          index: +nodeId.split("-").pop(),
          sameLevel: true,
          parentId: node.parentId
        });
      }
    }
    if (nodes.length) {
      let node = nodes.filter((node2) => node2.inner || !node2.inner && !node2.sameLevel);
      if (node.length > 1) {
        node.sort((a, b) => {
          if (a.depth === b.depth) {
            return a.index - b.index;
          } else {
            return b.depth - a.depth;
          }
        });
      }
      if (nodes.length > 1) {
        nodes.sort((a, b) => {
          if (a.depth === b.depth) {
            return a.index - b.index;
          } else {
            return b.depth - a.depth;
          }
        });
      }
      node = node.length ? node[0] : nodes[0];
      let nodeId = node.sameLevel ? node.parentId : node.nodeId;
      if (nodeId.indexOf(this.dragNodeId) != -1) {
        cancelAllSelect();
        this.selectNodeId = null;
        this.showDragDiv(clientX, clientY, false, null);
        this.dragStatus = "";
        return;
      }
      selectNode(nodeId, true);
      this.selectNodeId = nodeId;
      this.showDragDiv(clientX, clientY, true, nodeId);
      this.dragStatus = "child";
      this.upClientInfo = [clientX, clientY];
    } else {
      cancelAllSelect();
      this.selectNodeId = null;
      this.showDragDiv(clientX, clientY, false, null);
      this.dragStatus = "";
    }
  },
  dragEnd(evt) {
    const { currentTarget: tree2 } = evt;
    setIsDragging(false);
    document.documentElement.style.cursor = "default";
    this.hideDragDiv();
    if (this.dragStatus !== "" && this.selectNodeId) {
      const parentNode = tree2.findDataById(this.selectNodeId);
      let index = 0;
      for (let i = 0, len = parentNode.children.length; i < len; i++) {
        let node = parentNode.children[i];
        if (node.id === this.dragNodeId)
          continue;
        if (this.nodePosition[node.id].clientY < this.upClientInfo[1]) {
          index++;
        } else {
          break;
        }
      }
      emitter.emit("onDragEnd", [
        findData(this.dragNodeId),
        findData(this.selectNodeId),
        index
      ]);
      moveData(this.selectNodeId, this.dragNodeId, index);
    }
    tree2.getNodes().forEach((node) => {
      node.get("id");
      tree2.updateItem(node, {
        style: {
          opacity: 1
        }
      });
      node.get("edges").forEach((edge) => {
        tree2.updateItem(edge, {
          style: {
            opacity: 1
          }
        });
      });
    });
    cancelAllSelect();
    this.selectNodeId = null;
    this.dragStatus = "";
    this.nodePosition = {};
  },
  showDragDiv(clientX, clientY, showLine, parentId) {
    const tree2 = globalTree.value;
    const { x, y } = tree2.getPointByClient(clientX, clientY);
    console.log(">>>>>drag", x, y);
    const model = {
      id: "moveNode",
      label: "",
      x,
      y,
      type: "rect",
      zIndex: 3,
      style: {
        width: 40,
        height: 20,
        fill: themeColor.value,
        radius,
        opacity: 0.6,
        cursor: "grabbing"
      }
    };
    const edgeOption = {
      id: "moveNodeEdge",
      source: parentId || "0",
      target: "moveNode",
      type: lineType.value,
      zIndex: 3,
      style: {
        stroke: branchColor.value,
        lineWidth: branch.value,
        opacity: showLine ? 0.6 : 0,
        cursor: "grabbing"
      }
    };
    const moveNode = tree2.getNodes().filter((item) => item.get("id") === "moveNode");
    const moveEdge = tree2.getEdges().filter((item) => item.get("id") === "moveNodeEdge");
    if (moveNode.length && moveEdge.length) {
      tree2.updateItem(moveNode[0], model);
      tree2.updateItem(moveEdge[0], edgeOption);
    } else {
      tree2.addItem("node", model);
      tree2.addItem("edge", edgeOption);
    }
    return { moveNode: moveNode[0] };
  },
  hideDragDiv() {
    const tree2 = globalTree.value;
    const moveNode = tree2.getNodes().filter((item) => item.get("id") === "moveNode");
    if (moveNode.length) {
      tree2.removeItem(moveNode[0]);
    }
  }
});
class Tree {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId);
    this.data = data;
    this.tree = null;
  }
  createLayoutConfig(layoutConfig) {
    var _a, _b, _c;
    if (layoutConfig) {
      let {
        branch: branch2,
        branchColor: branchColor2,
        rootFontColor,
        subFontColor,
        subThemeColor,
        themeColor: themeColor2,
        leafThemeColor,
        leafFontColor,
        timetravel: timetravel2,
        centerBtn: centerBtn2,
        fitBtn: fitBtn2,
        downloadBtn: downloadBtn2,
        scaleRatio: scaleRatio2,
        closeEditInput: closeEditInput2,
        controlMoveDirection: controlMoveDirection2,
        defaultAppendNode: defaultAppendNode2
      } = layoutConfig;
      this.changeVariable({
        branch: branch2,
        branchColor: branchColor2,
        rootFontColor,
        subFontColor,
        subThemeColor,
        themeColor: themeColor2,
        timetravel: timetravel2,
        centerBtn: centerBtn2,
        fitBtn: fitBtn2,
        downloadBtn: downloadBtn2,
        scaleRatio: scaleRatio2,
        leafThemeColor,
        leafFontColor,
        lineType: (layoutConfig == null ? void 0 : layoutConfig.sharpCorner) ? "hvh" : "cubic-horizontal",
        closeEditInput: closeEditInput2,
        controlMoveDirection: controlMoveDirection2,
        defaultAppendNode: defaultAppendNode2
      });
    }
    const config = {
      width: (_a = this.container) == null ? void 0 : _a.scrollWidth,
      height: (_c = (_b = this.container) == null ? void 0 : _b.scrollHeight) != null ? _c : 0 - 20,
      layout: {
        type: "compactBox",
        direction: "H",
        getHeight: (node) => {
          return node.style.height;
        },
        getWidth: (node) => {
          return node.style.width;
        },
        getVGap: () => {
          return (layoutConfig == null ? void 0 : layoutConfig.yGap) || 10;
        },
        getHGap: () => {
          return (layoutConfig == null ? void 0 : layoutConfig.xGap) || 30;
        },
        getSide: (node) => {
          return "right";
        }
      },
      defaultEdge: {
        type: (layoutConfig == null ? void 0 : layoutConfig.sharpCorner) ? "hvh" : "cubic-horizontal",
        style: {
          lineWidth: branch.value,
          stroke: branchColor.value
        }
      },
      scaleRatio: (layoutConfig == null ? void 0 : layoutConfig.scaleRatio) || 1,
      modes: {
        default: [],
        edit: [isMobile() ? "edit-mindmap-mobile" : "edit-mindmap-pc"]
      },
      plugins: [],
      groupByTypes: false
    };
    const plugins = [];
    plugins.push(toolbar());
    if (layoutConfig == null ? void 0 : layoutConfig.mindmap) {
      plugins.push(mindmap());
    }
    if (layoutConfig == null ? void 0 : layoutConfig.edit) {
      plugins.push(contextMenu());
    }
    config.plugins = plugins;
    return config;
  }
  async init(layoutConfig) {
    if (!this.container)
      return;
    const config = this.createLayoutConfig(layoutConfig);
    IMData$1.setConfig({ renderer: layoutConfig.renderer });
    const data = IMData$1.init(this.data instanceof Array ? this.data[0] : this.data, true);
    const tree2 = new G6.TreeGraph(__spreadProps(__spreadValues({}, config), {
      container: this.container,
      animate: false,
      renderer: layoutConfig.renderer || "canvas"
    }));
    tree2.data(data);
    this.tree = tree2;
    tree2.layout();
    tree2.fitCenter();
    tree2.zoomTo(config.scaleRatio, {
      x: tree2.getWidth() / 2,
      y: tree2.getHeight() / 2
    });
    tree2.setAutoPaint(true);
    this.enableFeature(layoutConfig);
    let global = window;
    global.mindTree = tree2;
    global.mindTree.version = "2.0.0";
    setGlobalTree(tree2);
    this.bindEvent(tree2);
    return tree2;
  }
  changeSize(width, height) {
    this.tree.changeSize(width, height);
    this.tree.fitCenter();
  }
  bindEvent(tree2) {
  }
  enableFeature(layoutConfig) {
    if (layoutConfig == null ? void 0 : layoutConfig.tooltip) {
      this.addBehaviors(tooltip);
    }
    if (layoutConfig == null ? void 0 : layoutConfig.edit) {
      this.changeEditMode(true);
      this.addBehaviors("my-shortcut");
    }
    if (layoutConfig == null ? void 0 : layoutConfig.drag) {
      this.addBehaviors("drag-canvas");
    }
    if (layoutConfig == null ? void 0 : layoutConfig.zoom) {
      this.addBehaviors("double-finger-drag-canvas");
    }
  }
  changeVariable({
    branch: branch2,
    branchColor: branchColor2,
    rootFontColor,
    subFontColor,
    subThemeColor,
    themeColor: themeColor2,
    timetravel: timetravel2,
    centerBtn: centerBtn2,
    fitBtn: fitBtn2,
    downloadBtn: downloadBtn2,
    scaleRatio: scaleRatio2,
    lineType: lineType2,
    leafThemeColor,
    leafFontColor,
    closeEditInput: closeEditInput2,
    controlMoveDirection: controlMoveDirection2,
    defaultAppendNode: defaultAppendNode2
  }) {
    branch2 && changeBranch(branch2);
    branchColor2 && changeBranchColor(branchColor2);
    rootFontColor && changeRootFontColor(rootFontColor);
    subFontColor && changeSubFontColor(subFontColor);
    subThemeColor && changeSubThemeColor(subThemeColor);
    themeColor2 && changeThemeColor(themeColor2);
    timetravel2 && changeTimetravel(timetravel2);
    centerBtn2 && changeCenterBtn(centerBtn2);
    fitBtn2 && changeFitBtn(fitBtn2);
    downloadBtn2 && changeDownloadBtn(downloadBtn2);
    scaleRatio2 && changeScaleRatio(scaleRatio2);
    lineType2 && setLineType(lineType2);
    leafThemeColor && changeLeafThemeColor(leafThemeColor);
    leafFontColor && changeLeafFontColor(leafFontColor);
    closeEditInput2 && changeCloseEditInput(closeEditInput2);
    controlMoveDirection2 && changeControlMoveDirection(controlMoveDirection2);
    defaultAppendNode2 && changeDefaultAppendNode(defaultAppendNode2);
  }
  changeLayout(layoutConfig) {
    var _a;
    const config = this.createLayoutConfig(layoutConfig);
    (_a = this.tree) == null ? void 0 : _a.updateLayout(config);
  }
  addBehaviors(behavior, modeType) {
    var _a, _b, _c;
    if (modeType) {
      (_a = this.tree) == null ? void 0 : _a.addBehaviors(behavior, modeType);
    } else {
      (_b = this.tree) == null ? void 0 : _b.addBehaviors(behavior, "default");
      (_c = this.tree) == null ? void 0 : _c.addBehaviors(behavior, "edit");
    }
  }
  removeBehaviors(behavior, modeType) {
    var _a, _b, _c;
    if (modeType) {
      (_a = this.tree) == null ? void 0 : _a.removeBehaviors(behavior, modeType);
    } else {
      (_b = this.tree) == null ? void 0 : _b.removeBehaviors(behavior, "default");
      (_c = this.tree) == null ? void 0 : _c.removeBehaviors(behavior, "edit");
    }
  }
  changeEditMode(edit2) {
    var _a, _b;
    if (edit2) {
      (_a = this.tree) == null ? void 0 : _a.setMode("edit");
    } else {
      (_b = this.tree) == null ? void 0 : _b.setMode("default");
    }
  }
  reBuild(layoutConfig) {
    var _a;
    (_a = this.tree) == null ? void 0 : _a.destroy();
    this.init(layoutConfig);
  }
  destroy() {
    var _a;
    (_a = this.tree) == null ? void 0 : _a.destroy();
  }
}
var isMac = function() {
  return /macintosh|mac os x/i.test(navigator.userAgent);
}();
var defaultHotKey = [
  {
    key: "Enter",
    label: "\u63D2\u5165\u540C\u7EA7\u8282\u70B9",
    Event: function(selectedNodes) {
      if ((selectedNodes == null ? void 0 : selectedNodes.length) != 1)
        return;
      addSibling(selectedNodes[0], "");
    },
    name: "add-sibling"
  },
  {
    key: "Tab",
    label: "\u63D2\u5165\u5B50\u8282\u70B9",
    Event: function(selectedNodes) {
      if ((selectedNodes == null ? void 0 : selectedNodes.length) != 1)
        return;
      addData(selectedNodes[0], "");
    },
    name: "add"
  },
  {
    key: "Tab",
    control: "shift",
    label: "\u63D2\u5165\u7236\u8282\u70B9",
    Event: function(selectedNodes) {
      if ((selectedNodes == null ? void 0 : selectedNodes.length) != 1)
        return;
      addParent(selectedNodes[0], "");
    },
    name: "add-parent"
  },
  {
    key: "c",
    control: isMac ? "cmd" : "ctrl",
    label: "\u590D\u5236",
    Event: function(selectedNodes) {
      if (!(selectedNodes == null ? void 0 : selectedNodes.length))
        return;
      copy(selectedNodes);
    },
    name: "copy"
  },
  {
    key: "x",
    control: isMac ? "cmd" : "ctrl",
    label: "\u526A\u5207",
    Event: function(selectedNodes) {
      if (!(selectedNodes == null ? void 0 : selectedNodes.length))
        return;
      cut(selectedNodes);
    },
    name: "cut"
  },
  {
    key: "v",
    control: isMac ? "cmd" : "ctrl",
    label: "\u7C98\u8D34",
    Event: function(selectedNodes) {
      if ((selectedNodes == null ? void 0 : selectedNodes.length) != 1)
        return;
      paste(selectedNodes[0]);
    },
    name: "paste"
  },
  {
    key: "d",
    control: isMac ? "cmd" : "ctrl",
    label: "\u521B\u5EFA\u526F\u672C",
    name: "create-a-copy",
    Event: function(selectedNodes) {
      if ((selectedNodes == null ? void 0 : selectedNodes.length) != 1)
        return;
      createACopy(selectedNodes[0]);
    }
  },
  {
    key: "z",
    control: isMac ? "cmd" : "ctrl",
    label: "\u64A4\u9500\u64CD\u4F5C",
    name: "revert",
    Event: function(selectedNodes) {
      unDo();
    }
  },
  {
    key: "y",
    control: isMac ? "cmd" : "ctrl",
    label: "\u91CD\u65B0\u64CD\u4F5C",
    name: "redo",
    Event: function(selectedNodes) {
      reDo();
    }
  },
  {
    key: "Backspace",
    label: "\u5220\u9664",
    Event: function(selectedNodes) {
      if (!(selectedNodes == null ? void 0 : selectedNodes.length))
        return;
      selectedNodes.forEach((nodeId) => {
        deleteNode(nodeId);
      });
    },
    name: "delete"
  },
  {
    key: " ",
    label: "\u7F16\u8F91",
    Event: function(selectedNodes) {
      if (!(selectedNodes == null ? void 0 : selectedNodes.length))
        return;
      selectedNodes.forEach((nodeId) => {
        edit(nodeId);
        let timer = setTimeout(() => {
          var _a;
          (_a = EditInput$1._input) == null ? void 0 : _a.focus();
          clearTimeout(timer);
        }, 300);
      });
    },
    name: "edit"
  }
];
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const isArray = (arg) => Object.prototype.toString.call(arg).toLowerCase().indexOf("array") > 5;
const isObject = (arg) => Object.prototype.toString.call(arg).toLowerCase() === "[object object]";
let tree;
const _sfc_main = {
  props: {
    modelValue: { required: true },
    xGap: { type: Number, default: 18 },
    yGap: { type: Number, default: 84 },
    branch: {
      type: Number,
      default: 1,
      validator: (val) => val >= 1 && val <= 6
    },
    branchColor: {
      type: String
    },
    themeColor: { type: String, default: "rgb(19,128,255)" },
    rootFontColor: { type: String, default: "#fff" },
    subThemeColor: { type: String, default: "rgba(245,245,245,1)" },
    subFontColor: { type: String, default: "#333" },
    leafThemeColor: { type: String, default: "transparent" },
    leafFontColor: { type: String, default: "#333" },
    direction: { type: String, default: "LR" },
    sharpCorner: Boolean,
    scaleExtent: {
      type: Object,
      default: [0.1, 8]
    },
    scaleRatio: { type: Number, default: 1 },
    tooltip: Boolean,
    edit: Boolean,
    drag: Boolean,
    zoom: Boolean,
    centerBtn: Boolean,
    fitBtn: Boolean,
    downloadBtn: Boolean,
    timetravel: Boolean,
    mindmap: Boolean,
    addNodeBtn: Boolean,
    collapseBtn: Boolean,
    fisheye: Boolean,
    watchResize: Boolean,
    keyboard: Boolean,
    ctm: Boolean,
    nodeMenu: Array,
    hotKey: Array,
    closeEditInput: Boolean,
    onAdd: Function,
    onCancelSelected: Function,
    onExpand: Function,
    onCollapse: Function,
    onSelectedNode: Function,
    onAfterEdit: Function,
    onDragEnd: Function,
    onEdit: Function,
    renderer: String,
    controlMoveDirection: Boolean,
    defaultAppendNode: Boolean
  },
  mounted() {
    this.$props.onAdd && emitter.on("onAdd", this.$props.onAdd);
    this.$props.onExpand && emitter.on("onExpand", this.$props.onExpand);
    this.$props.onCollapse && emitter.on("onCollapse", this.$props.onCollapse);
    this.$props.onSelectedNode && emitter.on("onSelectedNode", this.$props.onSelectedNode);
    this.$props.onAfterEdit && emitter.on("onAfterEdit", this.$props.onAfterEdit);
    this.$props.onDragEnd && emitter.on("onDragEnd", this.$props.onDragEnd);
    this.$props.onCancelSelected && emitter.on("onCancelSelected", this.$props.onCancelSelected);
    this.$props.onEdit && emitter.on("onEdit", this.$props.onEdit);
    this.changeCanvasSize();
    window.addEventListener("resize", this.changeCanvasSize);
  },
  beforeUnmount() {
    this.$props.onAdd && emitter.off("onAdd", this.$props.onAdd);
    this.$props.onExpand && emitter.off("onExpand", this.$props.onExpand);
    this.$props.onCollapse && emitter.off("onCollapse", this.$props.onCollapse);
    this.$props.onSelectedNode && emitter.off("onSelectedNode", this.$props.onSelectedNode);
    this.$props.onAfterEdit && emitter.off("onAfterEdit", this.$props.onAfterEdit);
    this.$props.onDragEnd && emitter.off("onDragEnd", this.$props.onDragEnd);
    this.$props.onCancelSelected && emitter.off("onCancelSelected", this.$props.onCancelSelected);
    this.$props.onEdit && emitter.off("onEdit", this.$props.onEdit);
    window.removeEventListener("resize", this.changeCanvasSize);
    tree.destroy();
    tree = null;
  },
  methods: {
    changeCanvasSize() {
      this.$nextTick(() => {
        const height = this.$el.parentNode.offsetHeight;
        const width = this.$el.offsetWidth;
        this.$el.style.height = height + "px";
        if (tree) {
          tree.changeSize(width, height);
        }
      });
    },
    treeInit() {
      const { modelValue } = this.$props;
      this.$nextTick(() => {
        tree = new Tree("mxs-mindmap_container", modelValue);
        tree.init(this.$props);
      });
    },
    inputInit() {
      EditInput$1.init("node-input");
    },
    add: addData,
    update,
    deleteNode,
    deleteOneNode,
    expand,
    collapse,
    addSibling,
    addParent,
    find: findData,
    editNode: edit
  },
  watch: {
    "$props.modelValue": {
      handler(val) {
        if (isArray(val) && !val.length)
          return;
        if (isObject(val) && !Object.keys(val).length)
          return;
        this.treeInit();
        this.inputInit();
      },
      immediate: true
    },
    "$props.tooltip": {
      handler(val) {
        if (val) {
          tree.addBehaviors(tooltip);
        } else {
          tree.removeBehaviors("tooltip");
        }
      }
    },
    "$props.edit": {
      handler(val) {
        tree.changeEditMode(val);
      }
    },
    "$props.drag": {
      handler(val) {
        if (val) {
          tree.addBehaviors("drag-canvas");
        } else {
          tree.removeBehaviors("drag-canvas");
        }
      }
    },
    "$props.zoom": {
      handler(val) {
        if (val) {
          tree.addBehaviors("zoom-canvas");
        } else {
          tree.removeBehaviors("zoom-canvas");
        }
      }
    },
    centerBtn(val) {
    },
    fitBtn(val) {
    },
    downloadBtn(val) {
    },
    timetravel(val) {
    },
    mindmap(val) {
    },
    addNodeBtn(val) {
    },
    collapseBtn(val) {
    },
    fisheye(val) {
    },
    watchResize(val) {
    },
    nodeMenu: {
      handler(val) {
        changeNodeMenuList(val);
      },
      immediate: true
    },
    hotKey: {
      handler(val) {
        changehotKeyList(val.filter((i) => i.enabled == null || i.enabled === true).map((item) => {
          return defaultHotKey.filter((i) => i.name === item || i.name === item.name)[0] || { key: null };
        }));
      },
      immediate: true
    }
  }
};
const _hoisted_1 = /* @__PURE__ */ createElementVNode("div", {
  id: "mxs-mindmap_container",
  class: "mindmap-container",
  tabindex: "1"
}, null, -1);
const _hoisted_2 = /* @__PURE__ */ createElementVNode("div", {
  id: "node-input",
  contenteditable: "true",
  tabIndex: "2"
}, null, -1);
const _hoisted_3 = [
  _hoisted_1,
  _hoisted_2
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, _hoisted_3);
}
var Mindmap = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Mindmap as default };
//# sourceMappingURL=mxs-mindmap.es.js.map

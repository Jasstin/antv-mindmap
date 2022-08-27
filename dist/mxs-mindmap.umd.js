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
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require("@antv/g6"), require("vue")) : typeof define === "function" && define.amd ? define(["@antv/g6", "vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global["mxs-mindmap"] = factory(global["@antv/g6"], global.Vue));
})(this, function(G6, vue) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : { "default": e };
  }
  var G6__default = /* @__PURE__ */ _interopDefaultLegacy(G6);
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
        currentWidth += G6__default["default"].Util.getLetterWidth(letter, fontSize);
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
  const themeColor = vue.ref("rgb(19, 128, 255)");
  const changeThemeColor = (val) => themeColor.value = val;
  const themeColor_sub = vue.ref("rgb(245,245,245)");
  const changeSubThemeColor = (val) => themeColor_sub.value = val;
  const themeColor_leaf = vue.ref("transparent");
  const changeLeafThemeColor = (val) => themeColor_leaf.value = val;
  const fontColor_root = vue.ref("#ffffff");
  const changeRootFontColor = (val) => fontColor_root.value = val;
  const fontColor_sub = vue.ref("#333");
  const changeSubFontColor = (val) => fontColor_sub.value = val;
  const fontColor_leaf = vue.ref("#333");
  const changeLeafFontColor = (val) => fontColor_leaf.value = val;
  const branch = vue.ref(2);
  const changeBranch = (val) => branch.value = val;
  const branchColor = vue.ref("rgb(19, 128, 255)");
  const changeBranchColor = (val) => branchColor.value = val;
  const timetravel = vue.ref(false);
  const changeTimetravel = (val) => timetravel.value = val;
  const downloadBtn = vue.ref(false);
  const changeDownloadBtn = (val) => downloadBtn.value = val;
  const fitBtn = vue.ref(false);
  const changeFitBtn = (val) => fitBtn.value = val;
  const centerBtn = vue.ref(false);
  const changeCenterBtn = (val) => centerBtn.value = val;
  const scaleRatio = vue.ref(1);
  const changeScaleRatio = (val) => scaleRatio.value = val;
  const radius = 4;
  const paddingH = 10;
  const paddingV = 10;
  const maxFontCount = 12;
  const globalFontSize = [16, 14, 12];
  const nodeMenuList = vue.ref([]);
  const changeNodeMenuList = (val) => nodeMenuList.value = val;
  vue.ref(null);
  const globalTree = vue.ref(null);
  const setGlobalTree = (val) => globalTree.value = val;
  const lineType = vue.ref("cubic-horizontal");
  const setLineType = (val) => lineType.value = val;
  const isCurrentEdit = vue.ref(false);
  const setIsCurrentEdit = (val) => isCurrentEdit.value = val;
  const placeholderText = "\u65B0\u5EFA\u6A21\u578B";
  const isDragging = vue.ref(false);
  const setIsDragging = (val) => isDragging.value = val;
  const buildNodeStyle = (name2, desc = "", content = "", depth) => {
    const fontSize = globalFontSize[depth] || 12;
    const size = fontSize * maxFontCount + paddingH * 2;
    const { text: wrapName, line: nameLine, width: nameWidth } = wrapString(name2, size, fontSize);
    const { text: wrapDesc, line: descLine, width: descWidth } = wrapString(desc, size, fontSize - 2);
    const nameHeight = (fontSize + paddingV) * nameLine + paddingV;
    const descHeight = (fontSize - 2 + paddingV) * descLine + paddingV;
    const height = nameHeight + (desc ? descHeight : 0);
    const FillColor = [themeColor.value, themeColor_sub.value, themeColor_leaf.value][depth] || themeColor_leaf.value;
    const FontColor = [fontColor_root.value, fontColor_sub.value, fontColor_leaf.value][depth] || fontColor_leaf.value;
    const obj = {
      label: wrapName,
      name: wrapName,
      fullName: name2,
      fontSize,
      desc: wrapDesc,
      descFontSize: fontSize - 2,
      descHeight,
      content,
      width: Math.max(nameWidth, descWidth) + paddingV * 2,
      height,
      nameHeight,
      FillColor,
      FontColor,
      type: ["dice-mind-map-root", "dice-mind-map-sub"][depth] || "dice-mind-map-leaf"
    };
    return obj;
  };
  class IMData {
    constructor() {
      this.data = null;
      this._data = [];
      this._selectNode = null;
    }
    createMdataFromData(rawData, id, parent = null, isInit = false) {
      var _a;
      const {
        label,
        name: name2,
        desc,
        content,
        children: rawChildren,
        _children: _rawChildren,
        collapse: collapse2,
        isSubView
      } = rawData;
      const depth = parent ? parent.depth + 1 : 0;
      const data = __spreadValues({
        id,
        depth,
        desc,
        content,
        isSubView: isSubView || false,
        collapse: collapse2 || false,
        parentId: (_a = parent == null ? void 0 : parent.id) != null ? _a : "0",
        type: ["dice-mind-map-root", "dice-mind-map-sub"][depth] || "dice-mind-map-leaf",
        isCurrentSelected: false,
        isCurrentEdit: false,
        children: [],
        _children: []
      }, buildNodeStyle(name2, desc, content, depth));
      if (isInit) {
        data.rawData = rawData;
      } else {
        data.rawData = rawData == null ? void 0 : rawData.rawData;
      }
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
      if (collapse2) {
        [data._children, data.children] = [data.children, data._children];
      }
      return data;
    }
    init(d, isInit = false) {
      this.data = this.createMdataFromData(d, "0", null, isInit);
      return this.data;
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
      if (p) {
        if (p.collapse) {
          this.expand(id);
        }
        if (!p.children) {
          p.children = [];
        }
        let name2, desc, content, children, _children;
        if (typeof rawData === "string") {
          name2 = rawData;
        } else {
          name2 = rawData.name || rawData.label;
          desc = rawData.desc;
          content = rawData.content;
          children = rawData.children;
          _children = rawData._children;
        }
        const depth = p ? p.depth + 1 : 0;
        name2 = name2 === "" ? placeholderText : name2;
        const data = __spreadValues({
          id: `${id}-${p.children.length}`,
          depth,
          desc,
          content,
          parentId: id,
          collapse: false,
          isSubView: false,
          rawData: typeof rawData === "string" ? {} : rawData.rawData ? rawData.rawData : rawData,
          isCurrentSelected: false,
          isCurrentEdit: false,
          children: [],
          _children: []
        }, buildNodeStyle(name2, desc, content, depth));
        if (children || _children) {
          children.forEach((item, i) => {
            var _a;
            (_a = data == null ? void 0 : data.children) == null ? void 0 : _a.push(this.createMdataFromData(item, `${data.id}-${i}`, data));
          });
          _children.forEach((item, i) => {
            var _a;
            (_a = data == null ? void 0 : data.children) == null ? void 0 : _a.push(this.createMdataFromData(item, `${data.id}-${i}`, data));
          });
        }
        p.children.push(data);
        return data;
      }
      return null;
    }
    addSibling(id, rawData, before = false) {
      const d = this.find(id);
      if (d && d.parentId) {
        const index = parseInt(id.split("-").pop(), 10);
        const start = before ? index : index + 1;
        const depth = d ? d.depth : 1;
        let name2, desc, content;
        if (typeof rawData === "string") {
          name2 = rawData;
        } else {
          name2 = rawData.name;
          desc = rawData.desc;
          content = rawData.content;
        }
        name2 = name2 === "" ? placeholderText : name2;
        const sibling = __spreadValues({
          id: `${d.parentId}-${start}`,
          depth,
          desc,
          content,
          collapse: false,
          isSubView: false,
          parentId: d.parentId,
          rawData: typeof rawData === "string" ? {} : rawData.rawData ? rawData.rawData : rawData,
          isCurrentSelected: false,
          isCurrentEdit: false,
          children: [],
          _children: []
        }, buildNodeStyle(name2, desc, content, depth));
        const parent = this.find(d.parentId);
        parent == null ? void 0 : parent.children.splice(start, 0, sibling);
        parent == null ? void 0 : parent.children.forEach((item, index2) => item.id = `${parent.id}-${index2}`);
        return sibling;
      }
      return null;
    }
    addParent(id, rawData) {
      const d = this.find(id);
      if (d && d.parentId) {
        const p = this.find(d.parentId);
        const index = parseInt(id.split("-").pop(), 10);
        const depth = d ? d.depth : 1;
        let name2, desc, content;
        const parentId = d.parentId;
        if (typeof rawData === "string") {
          name2 = rawData;
        } else {
          name2 = rawData.name;
          desc = rawData.desc;
          content = rawData.content;
        }
        name2 = name2 === "" ? placeholderText : name2;
        const parent = __spreadValues({
          id,
          depth,
          desc,
          content,
          parentId,
          collapse: false,
          isSubView: false,
          rawData: typeof rawData === "string" ? {} : rawData.rawData ? rawData.rawData : rawData,
          isCurrentSelected: false,
          isCurrentEdit: false,
          children: [],
          _children: []
        }, buildNodeStyle(name2, desc, content, depth));
        p == null ? void 0 : p.children.splice(index, 1, parent);
        parent.children.push(this.createMdataFromData(d, id + "-0", parent));
        return parent;
      }
      return null;
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
    update(id, data) {
      var _a, _b, _c, _d;
      let d = this.find(id);
      if (!d)
        return;
      let name2, desc, isCurrentSelect, isCurrentEdit2;
      if (typeof data !== "string") {
        if (data.isCurrentSelected) {
          this._selectNode && (this._selectNode.isCurrentSelected = false);
          this._selectNode = d;
        }
        name2 = (_a = data == null ? void 0 : data.name) != null ? _a : d.fullName;
        desc = (_b = data == null ? void 0 : data.desc) != null ? _b : d.desc;
        isCurrentSelect = (_c = data == null ? void 0 : data.isCurrentSelected) != null ? _c : d.isCurrentSelected;
        isCurrentEdit2 = (_d = data == null ? void 0 : data.isCurrentEdit) != null ? _d : d.isCurrentEdit;
      } else {
        name2 = data;
      }
      Object.assign(d, buildNodeStyle(name2, desc, d.content, d.depth), { name: name2, isCurrentSelected: isCurrentSelect, isCurrentEdit: isCurrentEdit2 });
      console.log(this.data, "dData");
    }
    backParent() {
      let _data = this._data.pop();
      this.data = _data;
    }
    moveData(pid, id, index) {
      let data = this.find(id);
      const p = this.find(pid);
      let isSibling = data.parentId === pid;
      if (p.collapse) {
        this.expand(pid);
      }
      if (data.collapse) {
        this.expand(id);
      }
      if (!isSibling) {
        this.removeItem(id, false);
      }
      if (p.children.length) {
        let _data = [...p.children.filter((node) => node.id != id)];
        p.children = [];
        _data.splice(index, 0, data);
        _data.forEach((item, index2) => p.children.push(this.createMdataFromData(item, p.id + "-" + index2, p)));
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
  class EditInput {
    constructor() {
      this._input = null;
      this._fontSize = 0;
      this._height = 0;
      this._ratio = 1;
      this._lineHeight = 12;
      this._width = 0;
    }
    init(id) {
      this._input = document.getElementById(id);
      this._id = id;
      this.bindEvent();
    }
    showInput(x, y, width, height, name2, fontSize, type, radius2, ratio) {
      if (!this._input) {
        this.init(this._id);
        if (!this._input)
          return;
      }
      let NodeInput = this._input;
      this._fontSize = fontSize;
      this._height = height;
      this._ratio = ratio;
      this._width = width + 4 * ratio;
      this._lineHeight = fontSize + paddingV * ratio * 2;
      NodeInput.style.display = "block";
      NodeInput.style.position = "fixed";
      NodeInput.style.top = y + "px";
      NodeInput.style.left = x + "px";
      NodeInput.style.width = width + 4 * ratio + "px";
      NodeInput.style.height = height + 4 * ratio + "px";
      NodeInput.style.border = `${2 * ratio}px solid`;
      NodeInput.style.boxSizing = "border-box";
      NodeInput.innerText = placeholderText === name2 ? "" : name2;
      NodeInput.style.fontSize = fontSize + "px";
      NodeInput.style.textAlign = "left";
      NodeInput.style.paddingTop = paddingV / 2 * ratio + "px";
      NodeInput.style.paddingLeft = paddingH * ratio + "px";
      NodeInput.style.lineHeight = (fontSize + paddingV) * ratio + "px";
      NodeInput.style.borderRadius = radius2 + "px";
      NodeInput.style.zIndex = "1";
      NodeInput.style.overflow = "hidden";
      NodeInput.style.resize = "none";
      NodeInput.style.outline = "none";
      NodeInput.style.fontWeight = "600";
      document.body.style["--placeholderText"] = placeholderText;
      if (name2 === placeholderText) {
        NodeInput.classList.add("empty");
      }
      if (name2 === "") {
        NodeInput.style.width = "120px";
      }
      if (type === "dice-mind-map-root") {
        NodeInput.style.color = fontColor_root.value;
        NodeInput.style.background = themeColor.value;
        NodeInput.style.borderColor = themeColor.value;
      } else if (type === "dice-mind-map-sub") {
        NodeInput.style.color = fontColor_sub.value;
        NodeInput.style.background = themeColor_sub.value;
        NodeInput.style.borderColor = themeColor_sub.value;
      } else if (type === "dice-mind-map-leaf") {
        NodeInput.style.color = fontColor_leaf.value;
        NodeInput.style.background = themeColor_leaf.value;
        NodeInput.style.borderColor = themeColor.value;
      }
      let timer = setTimeout(() => {
        NodeInput.focus();
        clearTimeout(timer);
      }, 100);
    }
    changeLength(ev) {
      let input = ev.target;
      let row = input.innerText.split("\n").sort((a, b) => b.length - a.length);
      let lineWidth = row[0].replace(/[^\x00-\xff]/g, "00").length;
      if (lineWidth > 30)
        lineWidth = 30;
      let width = lineWidth * this._fontSize / 2 + paddingH * 2;
      width = width + 4 * this._ratio;
      input.style.width = `${Math.max(width, this._width)}px`;
      input.style.height = `${Math.max(input.scrollHeight, this._height + 5)}px`;
      if (input.innerText.length > 0) {
        input.classList.remove("empty");
      } else {
        input.classList.add("empty");
      }
    }
    bindEvent() {
      if (!this._input)
        return;
      this._input.addEventListener("input", this.changeLength.bind(this));
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
      this._input.style.display = "none";
    }
    handleInputBlur(name2) {
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
  let dataArr = vue.ref([]);
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
    rePaint();
    emitter.emit("onAdd", data);
    if (editNow) {
      if (data)
        edit(data.id);
    }
  };
  const addParent = (id, rawData, editNow = true) => {
    let data = IMData$1.addParent(id, rawData);
    rePaint();
    if (editNow) {
      if (data)
        edit(data.id);
    }
  };
  const addSibling = (id, rawData, editNow = true) => {
    let data = IMData$1.addSibling(id, rawData);
    rePaint();
    if (editNow) {
      if (data)
        edit(data.id);
    }
  };
  const edit = (id) => {
    var _a, _b;
    const Tree2 = globalTree.value;
    const NodeData2 = Tree2 == null ? void 0 : Tree2.findById(id);
    if (!NodeData2 || !Tree2)
      return;
    const { x: pointX, y: pointY } = (_a = NodeData2._cfg) == null ? void 0 : _a.bboxCache;
    const { name: name2, type, fontSize, width, height } = (_b = NodeData2._cfg) == null ? void 0 : _b.model;
    let ratio = Tree2.getZoom();
    let { x, y } = Tree2.getClientByPoint(pointX, pointY);
    setIsCurrentEdit(true);
    update(id, { isCurrentEdit: true });
    EditInput$1.showInput(x, y, width * ratio, height * ratio, name2, fontSize * ratio, type, radius * ratio, ratio);
    EditInput$1.handleInputBlur = (name22) => {
      console.log(name22);
      emitter.emit("onAfterEdit", name22.replace(/\s/g, ""));
      let _name = name22.replace(/\s/g, "");
      update(id, _name === "" ? NodeData2.get("model").name : _name);
      Tree2.off("wheelzoom");
      EditInput$1.hideInput();
      let timer = setTimeout(() => {
        setIsCurrentEdit(false);
        update(id, { isCurrentEdit: false });
        cancelAllSelect();
        clearTimeout(timer);
      }, 500);
    };
    Tree2.on("wheelzoom", () => {
      ratio = Tree2.getZoom();
      let { x: x2, y: y2 } = Tree2.getClientByPoint(pointX, pointY);
      EditInput$1.showInput(x2, y2, width * ratio, height * ratio, name2, fontSize * ratio, type, radius * ratio, ratio);
    });
  };
  const update = (id, name2) => {
    if (typeof name2 === "string") {
      IMData$1.update(id, { name: name2 });
    } else {
      IMData$1.update(id, name2);
    }
    selectNode(id, true);
  };
  const selectNode = (id, selected) => {
    let tree2 = globalTree.value;
    if (IMData$1._selectNode && tree2.findDataById(IMData$1._selectNode.id)) {
      tree2.setItemState(IMData$1._selectNode.id, "selected", false);
    }
    IMData$1.update(id, { isCurrentSelected: selected });
    if (selected) {
      tree2.setItemState(id, "selected", true);
      emitter.emit("onSelectedNode", findData(id));
    }
    rePaint();
  };
  const cancelAllSelect = () => {
    let tree2 = globalTree.value;
    if (IMData$1._selectNode) {
      const id = IMData$1._selectNode.id;
      if (tree2.findDataById(id)) {
        tree2.setItemState(id, "selected", false);
      }
      IMData$1.update(id, { isCurrentSelected: false });
    }
    rePaint();
  };
  const getSelectedNodes = () => {
    if (IMData$1._selectNode) {
      return [IMData$1._selectNode];
    } else {
      return [];
    }
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
    IMData$1.backParent(id);
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
        addData(pid, item, false);
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
  var isMac = function() {
    return /macintosh|mac os x/i.test(navigator.userAgent);
  }();
  var hotkeys = [
    {
      key: "Enter",
      label: "\u63D2\u5165\u540C\u7EA7\u8282\u70B9",
      Event: function(selectedNodes) {
        if ((selectedNodes == null ? void 0 : selectedNodes.length) != 1)
          return;
        addSibling(selectedNodes[0].id, placeholderText, true);
      },
      name: "add-sibling"
    },
    {
      key: "Tab",
      label: "\u63D2\u5165\u5B50\u8282\u70B9",
      Event: function(selectedNodes) {
        if ((selectedNodes == null ? void 0 : selectedNodes.length) != 1)
          return;
        addData(selectedNodes[0].id, placeholderText, true);
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
        addParent(selectedNodes[0].id, placeholderText, true);
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
        let ids = selectedNodes.map((item) => item.id);
        copy(ids);
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
        let ids = selectedNodes.map((item) => item.id);
        cut(ids);
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
        paste(selectedNodes[0].id);
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
        createACopy(selectedNodes[0].id);
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
        selectedNodes.forEach((item) => {
          deleteNode(item.id);
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
        selectedNodes.forEach((item) => {
          edit(item.id);
        });
      },
      name: "delete"
    }
  ];
  const nodeMenuMap = {
    add: {
      name: "add",
      title: "\u6DFB\u52A0\u5B50\u8282\u70B9",
      click: (node) => {
        addData(node == null ? void 0 : node.id, placeholderText, true);
      }
    },
    "add-parent": {
      name: "add-parent",
      title: "\u6DFB\u52A0\u7236\u7EA7\u8282\u70B9",
      click: (node) => {
        addParent(node == null ? void 0 : node.id, placeholderText, true);
      }
    },
    "add-sibling": {
      name: "add-sibling",
      title: "\u6DFB\u52A0\u5144\u5F1F\u8282\u70B9",
      click: (node) => {
        addSibling(node == null ? void 0 : node.id, placeholderText, true);
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
  const contextMenu = () => new G6__default["default"].Menu({
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
          let hotkey = hotkeys.filter((item2) => item2.name === itemInfo.name)[0];
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
      let name2 = target.getAttribute("name");
      if (name2) {
        nodeMenuClickList[name2](item.get("model"), item, graph);
      }
    }
  }
  const mindmap = () => new G6__default["default"].Minimap({
    size: [100, 100],
    className: "mindmap-miniGap",
    viewportClassName: "mindmap-miniGap-viewPort",
    type: "delegate",
    delegateStyle: {
      fill: themeColor.value,
      stroke: themeColor.value
    }
  });
  const toolbar = () => new G6__default["default"].ToolBar({
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
  var colorString$1 = { exports: {} };
  var colorName = {
    "aliceblue": [240, 248, 255],
    "antiquewhite": [250, 235, 215],
    "aqua": [0, 255, 255],
    "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255],
    "beige": [245, 245, 220],
    "bisque": [255, 228, 196],
    "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205],
    "blue": [0, 0, 255],
    "blueviolet": [138, 43, 226],
    "brown": [165, 42, 42],
    "burlywood": [222, 184, 135],
    "cadetblue": [95, 158, 160],
    "chartreuse": [127, 255, 0],
    "chocolate": [210, 105, 30],
    "coral": [255, 127, 80],
    "cornflowerblue": [100, 149, 237],
    "cornsilk": [255, 248, 220],
    "crimson": [220, 20, 60],
    "cyan": [0, 255, 255],
    "darkblue": [0, 0, 139],
    "darkcyan": [0, 139, 139],
    "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169],
    "darkgreen": [0, 100, 0],
    "darkgrey": [169, 169, 169],
    "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139],
    "darkolivegreen": [85, 107, 47],
    "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204],
    "darkred": [139, 0, 0],
    "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143],
    "darkslateblue": [72, 61, 139],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "darkturquoise": [0, 206, 209],
    "darkviolet": [148, 0, 211],
    "deeppink": [255, 20, 147],
    "deepskyblue": [0, 191, 255],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "dodgerblue": [30, 144, 255],
    "firebrick": [178, 34, 34],
    "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34],
    "fuchsia": [255, 0, 255],
    "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255],
    "gold": [255, 215, 0],
    "goldenrod": [218, 165, 32],
    "gray": [128, 128, 128],
    "green": [0, 128, 0],
    "greenyellow": [173, 255, 47],
    "grey": [128, 128, 128],
    "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180],
    "indianred": [205, 92, 92],
    "indigo": [75, 0, 130],
    "ivory": [255, 255, 240],
    "khaki": [240, 230, 140],
    "lavender": [230, 230, 250],
    "lavenderblush": [255, 240, 245],
    "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205],
    "lightblue": [173, 216, 230],
    "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255],
    "lightgoldenrodyellow": [250, 250, 210],
    "lightgray": [211, 211, 211],
    "lightgreen": [144, 238, 144],
    "lightgrey": [211, 211, 211],
    "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122],
    "lightseagreen": [32, 178, 170],
    "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224],
    "lime": [0, 255, 0],
    "limegreen": [50, 205, 50],
    "linen": [250, 240, 230],
    "magenta": [255, 0, 255],
    "maroon": [128, 0, 0],
    "mediumaquamarine": [102, 205, 170],
    "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211],
    "mediumpurple": [147, 112, 219],
    "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238],
    "mediumspringgreen": [0, 250, 154],
    "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133],
    "midnightblue": [25, 25, 112],
    "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225],
    "moccasin": [255, 228, 181],
    "navajowhite": [255, 222, 173],
    "navy": [0, 0, 128],
    "oldlace": [253, 245, 230],
    "olive": [128, 128, 0],
    "olivedrab": [107, 142, 35],
    "orange": [255, 165, 0],
    "orangered": [255, 69, 0],
    "orchid": [218, 112, 214],
    "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152],
    "paleturquoise": [175, 238, 238],
    "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213],
    "peachpuff": [255, 218, 185],
    "peru": [205, 133, 63],
    "pink": [255, 192, 203],
    "plum": [221, 160, 221],
    "powderblue": [176, 224, 230],
    "purple": [128, 0, 128],
    "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0],
    "rosybrown": [188, 143, 143],
    "royalblue": [65, 105, 225],
    "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114],
    "sandybrown": [244, 164, 96],
    "seagreen": [46, 139, 87],
    "seashell": [255, 245, 238],
    "sienna": [160, 82, 45],
    "silver": [192, 192, 192],
    "skyblue": [135, 206, 235],
    "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "snow": [255, 250, 250],
    "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180],
    "tan": [210, 180, 140],
    "teal": [0, 128, 128],
    "thistle": [216, 191, 216],
    "tomato": [255, 99, 71],
    "turquoise": [64, 224, 208],
    "violet": [238, 130, 238],
    "wheat": [245, 222, 179],
    "white": [255, 255, 255],
    "whitesmoke": [245, 245, 245],
    "yellow": [255, 255, 0],
    "yellowgreen": [154, 205, 50]
  };
  var simpleSwizzle = { exports: {} };
  var isArrayish$1 = function isArrayish2(obj) {
    if (!obj || typeof obj === "string") {
      return false;
    }
    return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && (obj.splice instanceof Function || Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== "String");
  };
  var isArrayish = isArrayish$1;
  var concat = Array.prototype.concat;
  var slice = Array.prototype.slice;
  var swizzle$1 = simpleSwizzle.exports = function swizzle2(args) {
    var results = [];
    for (var i = 0, len = args.length; i < len; i++) {
      var arg = args[i];
      if (isArrayish(arg)) {
        results = concat.call(results, slice.call(arg));
      } else {
        results.push(arg);
      }
    }
    return results;
  };
  swizzle$1.wrap = function(fn) {
    return function() {
      return fn(swizzle$1(arguments));
    };
  };
  var colorNames = colorName;
  var swizzle = simpleSwizzle.exports;
  var hasOwnProperty = Object.hasOwnProperty;
  var reverseNames = /* @__PURE__ */ Object.create(null);
  for (var name in colorNames) {
    if (hasOwnProperty.call(colorNames, name)) {
      reverseNames[colorNames[name]] = name;
    }
  }
  var cs = colorString$1.exports = {
    to: {},
    get: {}
  };
  cs.get = function(string) {
    var prefix = string.substring(0, 3).toLowerCase();
    var val;
    var model;
    switch (prefix) {
      case "hsl":
        val = cs.get.hsl(string);
        model = "hsl";
        break;
      case "hwb":
        val = cs.get.hwb(string);
        model = "hwb";
        break;
      default:
        val = cs.get.rgb(string);
        model = "rgb";
        break;
    }
    if (!val) {
      return null;
    }
    return { model, value: val };
  };
  cs.get.rgb = function(string) {
    if (!string) {
      return null;
    }
    var abbr = /^#([a-f0-9]{3,4})$/i;
    var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
    var rgba = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
    var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
    var keyword = /^(\w+)$/;
    var rgb = [0, 0, 0, 1];
    var match;
    var i;
    var hexAlpha;
    if (match = string.match(hex)) {
      hexAlpha = match[2];
      match = match[1];
      for (i = 0; i < 3; i++) {
        var i2 = i * 2;
        rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
      }
      if (hexAlpha) {
        rgb[3] = parseInt(hexAlpha, 16) / 255;
      }
    } else if (match = string.match(abbr)) {
      match = match[1];
      hexAlpha = match[3];
      for (i = 0; i < 3; i++) {
        rgb[i] = parseInt(match[i] + match[i], 16);
      }
      if (hexAlpha) {
        rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
      }
    } else if (match = string.match(rgba)) {
      for (i = 0; i < 3; i++) {
        rgb[i] = parseInt(match[i + 1], 0);
      }
      if (match[4]) {
        if (match[5]) {
          rgb[3] = parseFloat(match[4]) * 0.01;
        } else {
          rgb[3] = parseFloat(match[4]);
        }
      }
    } else if (match = string.match(per)) {
      for (i = 0; i < 3; i++) {
        rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
      }
      if (match[4]) {
        if (match[5]) {
          rgb[3] = parseFloat(match[4]) * 0.01;
        } else {
          rgb[3] = parseFloat(match[4]);
        }
      }
    } else if (match = string.match(keyword)) {
      if (match[1] === "transparent") {
        return [0, 0, 0, 0];
      }
      if (!hasOwnProperty.call(colorNames, match[1])) {
        return null;
      }
      rgb = colorNames[match[1]];
      rgb[3] = 1;
      return rgb;
    } else {
      return null;
    }
    for (i = 0; i < 3; i++) {
      rgb[i] = clamp(rgb[i], 0, 255);
    }
    rgb[3] = clamp(rgb[3], 0, 1);
    return rgb;
  };
  cs.get.hsl = function(string) {
    if (!string) {
      return null;
    }
    var hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
    var match = string.match(hsl);
    if (match) {
      var alpha = parseFloat(match[4]);
      var h = (parseFloat(match[1]) % 360 + 360) % 360;
      var s = clamp(parseFloat(match[2]), 0, 100);
      var l = clamp(parseFloat(match[3]), 0, 100);
      var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, s, l, a];
    }
    return null;
  };
  cs.get.hwb = function(string) {
    if (!string) {
      return null;
    }
    var hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
    var match = string.match(hwb);
    if (match) {
      var alpha = parseFloat(match[4]);
      var h = (parseFloat(match[1]) % 360 + 360) % 360;
      var w = clamp(parseFloat(match[2]), 0, 100);
      var b = clamp(parseFloat(match[3]), 0, 100);
      var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, w, b, a];
    }
    return null;
  };
  cs.to.hex = function() {
    var rgba = swizzle(arguments);
    return "#" + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : "");
  };
  cs.to.rgb = function() {
    var rgba = swizzle(arguments);
    return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ")" : "rgba(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ", " + rgba[3] + ")";
  };
  cs.to.rgb.percent = function() {
    var rgba = swizzle(arguments);
    var r = Math.round(rgba[0] / 255 * 100);
    var g = Math.round(rgba[1] / 255 * 100);
    var b = Math.round(rgba[2] / 255 * 100);
    return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + r + "%, " + g + "%, " + b + "%)" : "rgba(" + r + "%, " + g + "%, " + b + "%, " + rgba[3] + ")";
  };
  cs.to.hsl = function() {
    var hsla = swizzle(arguments);
    return hsla.length < 4 || hsla[3] === 1 ? "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)" : "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + hsla[3] + ")";
  };
  cs.to.hwb = function() {
    var hwba = swizzle(arguments);
    var a = "";
    if (hwba.length >= 4 && hwba[3] !== 1) {
      a = ", " + hwba[3];
    }
    return "hwb(" + hwba[0] + ", " + hwba[1] + "%, " + hwba[2] + "%" + a + ")";
  };
  cs.to.keyword = function(rgb) {
    return reverseNames[rgb.slice(0, 3)];
  };
  function clamp(num, min, max) {
    return Math.min(Math.max(min, num), max);
  }
  function hexDouble(num) {
    var str = Math.round(num).toString(16).toUpperCase();
    return str.length < 2 ? "0" + str : str;
  }
  const cssKeywords = colorName;
  const reverseKeywords = {};
  for (const key of Object.keys(cssKeywords)) {
    reverseKeywords[cssKeywords[key]] = key;
  }
  const convert$2 = {
    rgb: { channels: 3, labels: "rgb" },
    hsl: { channels: 3, labels: "hsl" },
    hsv: { channels: 3, labels: "hsv" },
    hwb: { channels: 3, labels: "hwb" },
    cmyk: { channels: 4, labels: "cmyk" },
    xyz: { channels: 3, labels: "xyz" },
    lab: { channels: 3, labels: "lab" },
    lch: { channels: 3, labels: "lch" },
    hex: { channels: 1, labels: ["hex"] },
    keyword: { channels: 1, labels: ["keyword"] },
    ansi16: { channels: 1, labels: ["ansi16"] },
    ansi256: { channels: 1, labels: ["ansi256"] },
    hcg: { channels: 3, labels: ["h", "c", "g"] },
    apple: { channels: 3, labels: ["r16", "g16", "b16"] },
    gray: { channels: 1, labels: ["gray"] }
  };
  var conversions$2 = convert$2;
  for (const model of Object.keys(convert$2)) {
    if (!("channels" in convert$2[model])) {
      throw new Error("missing channels property: " + model);
    }
    if (!("labels" in convert$2[model])) {
      throw new Error("missing channel labels property: " + model);
    }
    if (convert$2[model].labels.length !== convert$2[model].channels) {
      throw new Error("channel and label counts mismatch: " + model);
    }
    const { channels, labels } = convert$2[model];
    delete convert$2[model].channels;
    delete convert$2[model].labels;
    Object.defineProperty(convert$2[model], "channels", { value: channels });
    Object.defineProperty(convert$2[model], "labels", { value: labels });
  }
  convert$2.rgb.hsl = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;
    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }
    h = Math.min(h * 60, 360);
    if (h < 0) {
      h += 360;
    }
    const l = (min + max) / 2;
    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }
    return [h, s * 100, l * 100];
  };
  convert$2.rgb.hsv = function(rgb) {
    let rdif;
    let gdif;
    let bdif;
    let h;
    let s;
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const v = Math.max(r, g, b);
    const diff = v - Math.min(r, g, b);
    const diffc = function(c) {
      return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
      h = 0;
      s = 0;
    } else {
      s = diff / v;
      rdif = diffc(r);
      gdif = diffc(g);
      bdif = diffc(b);
      if (r === v) {
        h = bdif - gdif;
      } else if (g === v) {
        h = 1 / 3 + rdif - bdif;
      } else if (b === v) {
        h = 2 / 3 + gdif - rdif;
      }
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }
    return [
      h * 360,
      s * 100,
      v * 100
    ];
  };
  convert$2.rgb.hwb = function(rgb) {
    const r = rgb[0];
    const g = rgb[1];
    let b = rgb[2];
    const h = convert$2.rgb.hsl(rgb)[0];
    const w = 1 / 255 * Math.min(r, Math.min(g, b));
    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
    return [h, w * 100, b * 100];
  };
  convert$2.rgb.cmyk = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return [c * 100, m * 100, y * 100, k * 100];
  };
  function comparativeDistance(x, y) {
    return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
  }
  convert$2.rgb.keyword = function(rgb) {
    const reversed = reverseKeywords[rgb];
    if (reversed) {
      return reversed;
    }
    let currentClosestDistance = Infinity;
    let currentClosestKeyword;
    for (const keyword of Object.keys(cssKeywords)) {
      const value = cssKeywords[keyword];
      const distance = comparativeDistance(rgb, value);
      if (distance < currentClosestDistance) {
        currentClosestDistance = distance;
        currentClosestKeyword = keyword;
      }
    }
    return currentClosestKeyword;
  };
  convert$2.keyword.rgb = function(keyword) {
    return cssKeywords[keyword];
  };
  convert$2.rgb.xyz = function(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;
    r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
    g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
    b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x * 100, y * 100, z * 100];
  };
  convert$2.rgb.lab = function(rgb) {
    const xyz = convert$2.rgb.xyz(rgb);
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert$2.hsl.rgb = function(hsl) {
    const h = hsl[0] / 360;
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    let t2;
    let t3;
    let val;
    if (s === 0) {
      val = l * 255;
      return [val, val, val];
    }
    if (l < 0.5) {
      t2 = l * (1 + s);
    } else {
      t2 = l + s - l * s;
    }
    const t1 = 2 * l - t2;
    const rgb = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      t3 = h + 1 / 3 * -(i - 1);
      if (t3 < 0) {
        t3++;
      }
      if (t3 > 1) {
        t3--;
      }
      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        val = t1;
      }
      rgb[i] = val * 255;
    }
    return rgb;
  };
  convert$2.hsl.hsv = function(hsl) {
    const h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let smin = s;
    const lmin = Math.max(l, 0.01);
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    const v = (l + s) / 2;
    const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [h, sv * 100, v * 100];
  };
  convert$2.hsv.rgb = function(hsv) {
    const h = hsv[0] / 60;
    const s = hsv[1] / 100;
    let v = hsv[2] / 100;
    const hi = Math.floor(h) % 6;
    const f = h - Math.floor(h);
    const p = 255 * v * (1 - s);
    const q = 255 * v * (1 - s * f);
    const t = 255 * v * (1 - s * (1 - f));
    v *= 255;
    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];
    }
  };
  convert$2.hsv.hsl = function(hsv) {
    const h = hsv[0];
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const vmin = Math.max(v, 0.01);
    let sl;
    let l;
    l = (2 - s) * v;
    const lmin = (2 - s) * vmin;
    sl = s * vmin;
    sl /= lmin <= 1 ? lmin : 2 - lmin;
    sl = sl || 0;
    l /= 2;
    return [h, sl * 100, l * 100];
  };
  convert$2.hwb.rgb = function(hwb) {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let f;
    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }
    const i = Math.floor(6 * h);
    const v = 1 - bl;
    f = 6 * h - i;
    if ((i & 1) !== 0) {
      f = 1 - f;
    }
    const n = wh + f * (v - wh);
    let r;
    let g;
    let b;
    switch (i) {
      default:
      case 6:
      case 0:
        r = v;
        g = n;
        b = wh;
        break;
      case 1:
        r = n;
        g = v;
        b = wh;
        break;
      case 2:
        r = wh;
        g = v;
        b = n;
        break;
      case 3:
        r = wh;
        g = n;
        b = v;
        break;
      case 4:
        r = n;
        g = wh;
        b = v;
        break;
      case 5:
        r = v;
        g = wh;
        b = n;
        break;
    }
    return [r * 255, g * 255, b * 255];
  };
  convert$2.cmyk.rgb = function(cmyk) {
    const c = cmyk[0] / 100;
    const m = cmyk[1] / 100;
    const y = cmyk[2] / 100;
    const k = cmyk[3] / 100;
    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);
    return [r * 255, g * 255, b * 255];
  };
  convert$2.xyz.rgb = function(xyz) {
    const x = xyz[0] / 100;
    const y = xyz[1] / 100;
    const z = xyz[2] / 100;
    let r;
    let g;
    let b;
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
    g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
    b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);
    return [r * 255, g * 255, b * 255];
  };
  convert$2.xyz.lab = function(xyz) {
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert$2.lab.xyz = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let x;
    let y;
    let z;
    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;
    const y2 = y ** 3;
    const x2 = x ** 3;
    const z2 = z ** 3;
    y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
    x *= 95.047;
    y *= 100;
    z *= 108.883;
    return [x, y, z];
  };
  convert$2.lab.lch = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let h;
    const hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) {
      h += 360;
    }
    const c = Math.sqrt(a * a + b * b);
    return [l, c, h];
  };
  convert$2.lch.lab = function(lch) {
    const l = lch[0];
    const c = lch[1];
    const h = lch[2];
    const hr = h / 360 * 2 * Math.PI;
    const a = c * Math.cos(hr);
    const b = c * Math.sin(hr);
    return [l, a, b];
  };
  convert$2.rgb.ansi16 = function(args, saturation = null) {
    const [r, g, b] = args;
    let value = saturation === null ? convert$2.rgb.hsv(args)[2] : saturation;
    value = Math.round(value / 50);
    if (value === 0) {
      return 30;
    }
    let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
    if (value === 2) {
      ansi += 60;
    }
    return ansi;
  };
  convert$2.hsv.ansi16 = function(args) {
    return convert$2.rgb.ansi16(convert$2.hsv.rgb(args), args[2]);
  };
  convert$2.rgb.ansi256 = function(args) {
    const r = args[0];
    const g = args[1];
    const b = args[2];
    if (r === g && g === b) {
      if (r < 8) {
        return 16;
      }
      if (r > 248) {
        return 231;
      }
      return Math.round((r - 8) / 247 * 24) + 232;
    }
    const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
    return ansi;
  };
  convert$2.ansi16.rgb = function(args) {
    let color2 = args % 10;
    if (color2 === 0 || color2 === 7) {
      if (args > 50) {
        color2 += 3.5;
      }
      color2 = color2 / 10.5 * 255;
      return [color2, color2, color2];
    }
    const mult = (~~(args > 50) + 1) * 0.5;
    const r = (color2 & 1) * mult * 255;
    const g = (color2 >> 1 & 1) * mult * 255;
    const b = (color2 >> 2 & 1) * mult * 255;
    return [r, g, b];
  };
  convert$2.ansi256.rgb = function(args) {
    if (args >= 232) {
      const c = (args - 232) * 10 + 8;
      return [c, c, c];
    }
    args -= 16;
    let rem;
    const r = Math.floor(args / 36) / 5 * 255;
    const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
    const b = rem % 6 / 5 * 255;
    return [r, g, b];
  };
  convert$2.rgb.hex = function(args) {
    const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert$2.hex.rgb = function(args) {
    const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) {
      return [0, 0, 0];
    }
    let colorString2 = match[0];
    if (match[0].length === 3) {
      colorString2 = colorString2.split("").map((char) => {
        return char + char;
      }).join("");
    }
    const integer = parseInt(colorString2, 16);
    const r = integer >> 16 & 255;
    const g = integer >> 8 & 255;
    const b = integer & 255;
    return [r, g, b];
  };
  convert$2.rgb.hcg = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const max = Math.max(Math.max(r, g), b);
    const min = Math.min(Math.min(r, g), b);
    const chroma = max - min;
    let grayscale;
    let hue;
    if (chroma < 1) {
      grayscale = min / (1 - chroma);
    } else {
      grayscale = 0;
    }
    if (chroma <= 0) {
      hue = 0;
    } else if (max === r) {
      hue = (g - b) / chroma % 6;
    } else if (max === g) {
      hue = 2 + (b - r) / chroma;
    } else {
      hue = 4 + (r - g) / chroma;
    }
    hue /= 6;
    hue %= 1;
    return [hue * 360, chroma * 100, grayscale * 100];
  };
  convert$2.hsl.hcg = function(hsl) {
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
    let f = 0;
    if (c < 1) {
      f = (l - 0.5 * c) / (1 - c);
    }
    return [hsl[0], c * 100, f * 100];
  };
  convert$2.hsv.hcg = function(hsv) {
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const c = s * v;
    let f = 0;
    if (c < 1) {
      f = (v - c) / (1 - c);
    }
    return [hsv[0], c * 100, f * 100];
  };
  convert$2.hcg.rgb = function(hcg) {
    const h = hcg[0] / 360;
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    if (c === 0) {
      return [g * 255, g * 255, g * 255];
    }
    const pure = [0, 0, 0];
    const hi = h % 1 * 6;
    const v = hi % 1;
    const w = 1 - v;
    let mg = 0;
    switch (Math.floor(hi)) {
      case 0:
        pure[0] = 1;
        pure[1] = v;
        pure[2] = 0;
        break;
      case 1:
        pure[0] = w;
        pure[1] = 1;
        pure[2] = 0;
        break;
      case 2:
        pure[0] = 0;
        pure[1] = 1;
        pure[2] = v;
        break;
      case 3:
        pure[0] = 0;
        pure[1] = w;
        pure[2] = 1;
        break;
      case 4:
        pure[0] = v;
        pure[1] = 0;
        pure[2] = 1;
        break;
      default:
        pure[0] = 1;
        pure[1] = 0;
        pure[2] = w;
    }
    mg = (1 - c) * g;
    return [
      (c * pure[0] + mg) * 255,
      (c * pure[1] + mg) * 255,
      (c * pure[2] + mg) * 255
    ];
  };
  convert$2.hcg.hsv = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    let f = 0;
    if (v > 0) {
      f = c / v;
    }
    return [hcg[0], f * 100, v * 100];
  };
  convert$2.hcg.hsl = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const l = g * (1 - c) + 0.5 * c;
    let s = 0;
    if (l > 0 && l < 0.5) {
      s = c / (2 * l);
    } else if (l >= 0.5 && l < 1) {
      s = c / (2 * (1 - l));
    }
    return [hcg[0], s * 100, l * 100];
  };
  convert$2.hcg.hwb = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    return [hcg[0], (v - c) * 100, (1 - v) * 100];
  };
  convert$2.hwb.hcg = function(hwb) {
    const w = hwb[1] / 100;
    const b = hwb[2] / 100;
    const v = 1 - b;
    const c = v - w;
    let g = 0;
    if (c < 1) {
      g = (v - c) / (1 - c);
    }
    return [hwb[0], c * 100, g * 100];
  };
  convert$2.apple.rgb = function(apple) {
    return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
  };
  convert$2.rgb.apple = function(rgb) {
    return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
  };
  convert$2.gray.rgb = function(args) {
    return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
  };
  convert$2.gray.hsl = function(args) {
    return [0, 0, args[0]];
  };
  convert$2.gray.hsv = convert$2.gray.hsl;
  convert$2.gray.hwb = function(gray) {
    return [0, 100, gray[0]];
  };
  convert$2.gray.cmyk = function(gray) {
    return [0, 0, 0, gray[0]];
  };
  convert$2.gray.lab = function(gray) {
    return [gray[0], 0, 0];
  };
  convert$2.gray.hex = function(gray) {
    const val = Math.round(gray[0] / 100 * 255) & 255;
    const integer = (val << 16) + (val << 8) + val;
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert$2.rgb.gray = function(rgb) {
    const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return [val / 255 * 100];
  };
  const conversions$1 = conversions$2;
  function buildGraph() {
    const graph = {};
    const models2 = Object.keys(conversions$1);
    for (let len = models2.length, i = 0; i < len; i++) {
      graph[models2[i]] = {
        distance: -1,
        parent: null
      };
    }
    return graph;
  }
  function deriveBFS(fromModel) {
    const graph = buildGraph();
    const queue = [fromModel];
    graph[fromModel].distance = 0;
    while (queue.length) {
      const current = queue.pop();
      const adjacents = Object.keys(conversions$1[current]);
      for (let len = adjacents.length, i = 0; i < len; i++) {
        const adjacent = adjacents[i];
        const node = graph[adjacent];
        if (node.distance === -1) {
          node.distance = graph[current].distance + 1;
          node.parent = current;
          queue.unshift(adjacent);
        }
      }
    }
    return graph;
  }
  function link(from, to) {
    return function(args) {
      return to(from(args));
    };
  }
  function wrapConversion(toModel, graph) {
    const path = [graph[toModel].parent, toModel];
    let fn = conversions$1[graph[toModel].parent][toModel];
    let cur = graph[toModel].parent;
    while (graph[cur].parent) {
      path.unshift(graph[cur].parent);
      fn = link(conversions$1[graph[cur].parent][cur], fn);
      cur = graph[cur].parent;
    }
    fn.conversion = path;
    return fn;
  }
  var route$1 = function(fromModel) {
    const graph = deriveBFS(fromModel);
    const conversion = {};
    const models2 = Object.keys(graph);
    for (let len = models2.length, i = 0; i < len; i++) {
      const toModel = models2[i];
      const node = graph[toModel];
      if (node.parent === null) {
        continue;
      }
      conversion[toModel] = wrapConversion(toModel, graph);
    }
    return conversion;
  };
  const conversions = conversions$2;
  const route = route$1;
  const convert$1 = {};
  const models = Object.keys(conversions);
  function wrapRaw(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === void 0 || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      return fn(args);
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  function wrapRounded(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === void 0 || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      const result = fn(args);
      if (typeof result === "object") {
        for (let len = result.length, i = 0; i < len; i++) {
          result[i] = Math.round(result[i]);
        }
      }
      return result;
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  models.forEach((fromModel) => {
    convert$1[fromModel] = {};
    Object.defineProperty(convert$1[fromModel], "channels", { value: conversions[fromModel].channels });
    Object.defineProperty(convert$1[fromModel], "labels", { value: conversions[fromModel].labels });
    const routes = route(fromModel);
    const routeModels = Object.keys(routes);
    routeModels.forEach((toModel) => {
      const fn = routes[toModel];
      convert$1[fromModel][toModel] = wrapRounded(fn);
      convert$1[fromModel][toModel].raw = wrapRaw(fn);
    });
  });
  var colorConvert = convert$1;
  const colorString = colorString$1.exports;
  const convert = colorConvert;
  const skippedModels = [
    "keyword",
    "gray",
    "hex"
  ];
  const hashedModelKeys = {};
  for (const model of Object.keys(convert)) {
    hashedModelKeys[[...convert[model].labels].sort().join("")] = model;
  }
  const limiters = {};
  function Color(object, model) {
    if (!(this instanceof Color)) {
      return new Color(object, model);
    }
    if (model && model in skippedModels) {
      model = null;
    }
    if (model && !(model in convert)) {
      throw new Error("Unknown model: " + model);
    }
    let i;
    let channels;
    if (object == null) {
      this.model = "rgb";
      this.color = [0, 0, 0];
      this.valpha = 1;
    } else if (object instanceof Color) {
      this.model = object.model;
      this.color = [...object.color];
      this.valpha = object.valpha;
    } else if (typeof object === "string") {
      const result = colorString.get(object);
      if (result === null) {
        throw new Error("Unable to parse color from string: " + object);
      }
      this.model = result.model;
      channels = convert[this.model].channels;
      this.color = result.value.slice(0, channels);
      this.valpha = typeof result.value[channels] === "number" ? result.value[channels] : 1;
    } else if (object.length > 0) {
      this.model = model || "rgb";
      channels = convert[this.model].channels;
      const newArray = Array.prototype.slice.call(object, 0, channels);
      this.color = zeroArray(newArray, channels);
      this.valpha = typeof object[channels] === "number" ? object[channels] : 1;
    } else if (typeof object === "number") {
      this.model = "rgb";
      this.color = [
        object >> 16 & 255,
        object >> 8 & 255,
        object & 255
      ];
      this.valpha = 1;
    } else {
      this.valpha = 1;
      const keys = Object.keys(object);
      if ("alpha" in object) {
        keys.splice(keys.indexOf("alpha"), 1);
        this.valpha = typeof object.alpha === "number" ? object.alpha : 0;
      }
      const hashedKeys = keys.sort().join("");
      if (!(hashedKeys in hashedModelKeys)) {
        throw new Error("Unable to parse color from object: " + JSON.stringify(object));
      }
      this.model = hashedModelKeys[hashedKeys];
      const { labels } = convert[this.model];
      const color2 = [];
      for (i = 0; i < labels.length; i++) {
        color2.push(object[labels[i]]);
      }
      this.color = zeroArray(color2);
    }
    if (limiters[this.model]) {
      channels = convert[this.model].channels;
      for (i = 0; i < channels; i++) {
        const limit = limiters[this.model][i];
        if (limit) {
          this.color[i] = limit(this.color[i]);
        }
      }
    }
    this.valpha = Math.max(0, Math.min(1, this.valpha));
    if (Object.freeze) {
      Object.freeze(this);
    }
  }
  Color.prototype = {
    toString() {
      return this.string();
    },
    toJSON() {
      return this[this.model]();
    },
    string(places) {
      let self2 = this.model in colorString.to ? this : this.rgb();
      self2 = self2.round(typeof places === "number" ? places : 1);
      const args = self2.valpha === 1 ? self2.color : [...self2.color, this.valpha];
      return colorString.to[self2.model](args);
    },
    percentString(places) {
      const self2 = this.rgb().round(typeof places === "number" ? places : 1);
      const args = self2.valpha === 1 ? self2.color : [...self2.color, this.valpha];
      return colorString.to.rgb.percent(args);
    },
    array() {
      return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha];
    },
    object() {
      const result = {};
      const { channels } = convert[this.model];
      const { labels } = convert[this.model];
      for (let i = 0; i < channels; i++) {
        result[labels[i]] = this.color[i];
      }
      if (this.valpha !== 1) {
        result.alpha = this.valpha;
      }
      return result;
    },
    unitArray() {
      const rgb = this.rgb().color;
      rgb[0] /= 255;
      rgb[1] /= 255;
      rgb[2] /= 255;
      if (this.valpha !== 1) {
        rgb.push(this.valpha);
      }
      return rgb;
    },
    unitObject() {
      const rgb = this.rgb().object();
      rgb.r /= 255;
      rgb.g /= 255;
      rgb.b /= 255;
      if (this.valpha !== 1) {
        rgb.alpha = this.valpha;
      }
      return rgb;
    },
    round(places) {
      places = Math.max(places || 0, 0);
      return new Color([...this.color.map(roundToPlace(places)), this.valpha], this.model);
    },
    alpha(value) {
      if (value !== void 0) {
        return new Color([...this.color, Math.max(0, Math.min(1, value))], this.model);
      }
      return this.valpha;
    },
    red: getset("rgb", 0, maxfn(255)),
    green: getset("rgb", 1, maxfn(255)),
    blue: getset("rgb", 2, maxfn(255)),
    hue: getset(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (value) => (value % 360 + 360) % 360),
    saturationl: getset("hsl", 1, maxfn(100)),
    lightness: getset("hsl", 2, maxfn(100)),
    saturationv: getset("hsv", 1, maxfn(100)),
    value: getset("hsv", 2, maxfn(100)),
    chroma: getset("hcg", 1, maxfn(100)),
    gray: getset("hcg", 2, maxfn(100)),
    white: getset("hwb", 1, maxfn(100)),
    wblack: getset("hwb", 2, maxfn(100)),
    cyan: getset("cmyk", 0, maxfn(100)),
    magenta: getset("cmyk", 1, maxfn(100)),
    yellow: getset("cmyk", 2, maxfn(100)),
    black: getset("cmyk", 3, maxfn(100)),
    x: getset("xyz", 0, maxfn(95.047)),
    y: getset("xyz", 1, maxfn(100)),
    z: getset("xyz", 2, maxfn(108.833)),
    l: getset("lab", 0, maxfn(100)),
    a: getset("lab", 1),
    b: getset("lab", 2),
    keyword(value) {
      if (value !== void 0) {
        return new Color(value);
      }
      return convert[this.model].keyword(this.color);
    },
    hex(value) {
      if (value !== void 0) {
        return new Color(value);
      }
      return colorString.to.hex(this.rgb().round().color);
    },
    hexa(value) {
      if (value !== void 0) {
        return new Color(value);
      }
      const rgbArray = this.rgb().round().color;
      let alphaHex = Math.round(this.valpha * 255).toString(16).toUpperCase();
      if (alphaHex.length === 1) {
        alphaHex = "0" + alphaHex;
      }
      return colorString.to.hex(rgbArray) + alphaHex;
    },
    rgbNumber() {
      const rgb = this.rgb().color;
      return (rgb[0] & 255) << 16 | (rgb[1] & 255) << 8 | rgb[2] & 255;
    },
    luminosity() {
      const rgb = this.rgb().color;
      const lum = [];
      for (const [i, element] of rgb.entries()) {
        const chan = element / 255;
        lum[i] = chan <= 0.04045 ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4;
      }
      return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    },
    contrast(color2) {
      const lum1 = this.luminosity();
      const lum2 = color2.luminosity();
      if (lum1 > lum2) {
        return (lum1 + 0.05) / (lum2 + 0.05);
      }
      return (lum2 + 0.05) / (lum1 + 0.05);
    },
    level(color2) {
      const contrastRatio = this.contrast(color2);
      if (contrastRatio >= 7) {
        return "AAA";
      }
      return contrastRatio >= 4.5 ? "AA" : "";
    },
    isDark() {
      const rgb = this.rgb().color;
      const yiq = (rgb[0] * 2126 + rgb[1] * 7152 + rgb[2] * 722) / 1e4;
      return yiq < 128;
    },
    isLight() {
      return !this.isDark();
    },
    negate() {
      const rgb = this.rgb();
      for (let i = 0; i < 3; i++) {
        rgb.color[i] = 255 - rgb.color[i];
      }
      return rgb;
    },
    lighten(ratio) {
      const hsl = this.hsl();
      hsl.color[2] += hsl.color[2] * ratio;
      return hsl;
    },
    darken(ratio) {
      const hsl = this.hsl();
      hsl.color[2] -= hsl.color[2] * ratio;
      return hsl;
    },
    saturate(ratio) {
      const hsl = this.hsl();
      hsl.color[1] += hsl.color[1] * ratio;
      return hsl;
    },
    desaturate(ratio) {
      const hsl = this.hsl();
      hsl.color[1] -= hsl.color[1] * ratio;
      return hsl;
    },
    whiten(ratio) {
      const hwb = this.hwb();
      hwb.color[1] += hwb.color[1] * ratio;
      return hwb;
    },
    blacken(ratio) {
      const hwb = this.hwb();
      hwb.color[2] += hwb.color[2] * ratio;
      return hwb;
    },
    grayscale() {
      const rgb = this.rgb().color;
      const value = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
      return Color.rgb(value, value, value);
    },
    fade(ratio) {
      return this.alpha(this.valpha - this.valpha * ratio);
    },
    opaquer(ratio) {
      return this.alpha(this.valpha + this.valpha * ratio);
    },
    rotate(degrees) {
      const hsl = this.hsl();
      let hue = hsl.color[0];
      hue = (hue + degrees) % 360;
      hue = hue < 0 ? 360 + hue : hue;
      hsl.color[0] = hue;
      return hsl;
    },
    mix(mixinColor, weight) {
      if (!mixinColor || !mixinColor.rgb) {
        throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
      }
      const color1 = mixinColor.rgb();
      const color2 = this.rgb();
      const p = weight === void 0 ? 0.5 : weight;
      const w = 2 * p - 1;
      const a = color1.alpha() - color2.alpha();
      const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
      const w2 = 1 - w1;
      return Color.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue(), color1.alpha() * p + color2.alpha() * (1 - p));
    }
  };
  for (const model of Object.keys(convert)) {
    if (skippedModels.includes(model)) {
      continue;
    }
    const { channels } = convert[model];
    Color.prototype[model] = function(...args) {
      if (this.model === model) {
        return new Color(this);
      }
      if (args.length > 0) {
        return new Color(args, model);
      }
      return new Color([...assertArray(convert[this.model][model].raw(this.color)), this.valpha], model);
    };
    Color[model] = function(...args) {
      let color2 = args[0];
      if (typeof color2 === "number") {
        color2 = zeroArray(args, channels);
      }
      return new Color(color2, model);
    };
  }
  function roundTo(number, places) {
    return Number(number.toFixed(places));
  }
  function roundToPlace(places) {
    return function(number) {
      return roundTo(number, places);
    };
  }
  function getset(model, channel, modifier) {
    model = Array.isArray(model) ? model : [model];
    for (const m of model) {
      (limiters[m] || (limiters[m] = []))[channel] = modifier;
    }
    model = model[0];
    return function(value) {
      let result;
      if (value !== void 0) {
        if (modifier) {
          value = modifier(value);
        }
        result = this[model]();
        result.color[channel] = value;
        return result;
      }
      result = this[model]().color[channel];
      if (modifier) {
        result = modifier(result);
      }
      return result;
    };
  }
  function maxfn(max) {
    return function(v) {
      return Math.max(0, Math.min(max, v));
    };
  }
  function assertArray(value) {
    return Array.isArray(value) ? value : [value];
  }
  function zeroArray(array, length) {
    for (let i = 0; i < length; i++) {
      if (typeof array[i] !== "number") {
        array[i] = 0;
      }
    }
    return array;
  }
  var color = Color;
  var Color$1 = color;
  let activeStrokeColor = Color$1(themeColor.value).fade(0.2).string();
  const {
    Util
  } = G6__default["default"];
  function drawAddBtn(group, params) {
    if (!params) {
      params = {};
    }
    params.fontSize = 16;
    params.fillColor = themeColor.value;
    params.fontColor = fontColor_root.value;
    const r = params.height / 4;
    const circleStyle = { x: params.width + r, y: params.height / 2, r, fill: params.fillColor, cursor: "point" };
    const textStyle = {
      x: params.width + r - 5,
      y: r - 1.5,
      text: "+",
      fill: params.fontColor,
      fontSize: params.fontSize,
      fontWeight: 600,
      textBaseline: "top",
      cursor: "point"
    };
    const container = group.addGroup({ name: "add-btn", zIndex: 3, capture: true, action: "add" });
    container == null ? void 0 : container.addShape("circle", { attrs: circleStyle, zIndex: 3, action: "add" });
    container == null ? void 0 : container.addShape("text", { attrs: textStyle, zIndex: 3, action: "add" });
  }
  function drawCollapseBtn(group, params) {
    if (!params) {
      params = {};
    }
    params.fontSize = 16;
    params.fillColor = themeColor.value;
    params.fontColor = fontColor_root.value;
    const r = params.height / 4;
    const circleStyle = { x: params.width + r, y: params.height / 2, r, fill: params.fillColor, cursor: "point" };
    const textStyle = {
      x: params.width + r - 5,
      y: r - 1.5,
      text: "<",
      fill: params.fontColor,
      fontSize: params.fontSize,
      fontWeight: 600,
      textBaseline: "top",
      cursor: "point"
    };
    const container = group.addGroup({ name: "collapse-btn", zIndex: 3, capture: true, action: "collapse", visible: false });
    container == null ? void 0 : container.addShape("circle", { attrs: circleStyle, zIndex: 3, action: "collapse" });
    container == null ? void 0 : container.addShape("text", { attrs: textStyle, zIndex: 3, action: "collapse" });
  }
  function drawExpandBtn(group, params) {
    const fontSize = 14;
    if (params.collapseNum === 0)
      return;
    if (params.collapseNum > 99)
      params.collapseNum = "...";
    const widthHeight = Util.getTextSize(params.collapseNum + "", fontSize);
    const r = widthHeight[0] / 2 + 4;
    const lineStyle = {
      x: params.width + 1,
      y: params.height / 2 - 1,
      width: 15,
      height: 2,
      fill: themeColor.value
    };
    const circleStyle = {
      x: params.width + lineStyle.width + r + 3,
      y: params.height / 2 - r / 2 + 3,
      r,
      fill: "transparent",
      stroke: themeColor.value,
      lineWidth: 2,
      cursor: "pointer"
    };
    const textStyle = {
      x: params.width + lineStyle.width + r - widthHeight[0] / 2 + 3,
      y: params.collapseNum === "..." ? params.height / 2 - r / 2 - 8 : params.height / 2 - r / 2 - 4,
      text: params.collapseNum,
      fill: themeColor.value,
      fontSize,
      fontWeight: 600,
      textBaseline: "top",
      cursor: "pointer"
    };
    const container = group.addGroup({ name: "expand-btn", visible: true, capture: true });
    container == null ? void 0 : container.addShape("rect", { attrs: lineStyle });
    container == null ? void 0 : container.addShape("circle", { attrs: circleStyle, action: "expand" });
    container == null ? void 0 : container.addShape("text", { attrs: textStyle, action: "expand" });
  }
  function getAttribute(cfg) {
    const { width, height, _children, isCurrentSelected, nameHeight, fontSize, descFontSize, descHeight, FillColor, FontColor, style } = cfg;
    const withStyle = (obj) => Object.assign({}, obj, style);
    const RectStyle = withStyle({
      x: 0,
      y: 0,
      width,
      height,
      radius,
      fill: FillColor,
      cursor: "pointer",
      stroke: isCurrentSelected ? activeStrokeColor : "transparent",
      lineWidth: 2
    });
    const TextStyle = withStyle({
      x: paddingV,
      y: paddingH,
      text: cfg == null ? void 0 : cfg.label,
      fill: FontColor,
      fontSize,
      textBaseline: "top",
      cursor: "pointer",
      fontWeight: 600,
      lineHeight: paddingV + fontSize
    });
    const DescWrapper = withStyle({
      x: 0,
      y: nameHeight,
      width,
      height: descHeight,
      radius: [0, 0, radius, radius],
      fill: "rgba(255,255,255,0.3)",
      cursor: "pointer",
      stroke: "transparent",
      lineWidth: 2
    });
    const DescText = withStyle({
      x: paddingV,
      y: paddingV + nameHeight,
      text: cfg == null ? void 0 : cfg.desc,
      fill: FontColor,
      fontSize: descFontSize,
      textBaseline: "top",
      cursor: "pointer",
      lineHeight: paddingV + descFontSize
    });
    return { RectStyle, TextStyle, DescWrapper, DescText };
  }
  function buildNode(cfg, group) {
    var _a, _b;
    const { RectStyle, TextStyle, DescWrapper, DescText } = getAttribute(cfg);
    const { depth, collapse: collapse2 } = cfg;
    const container = group == null ? void 0 : group.addShape("rect", { attrs: RectStyle, name: `wrapper`, zIndex: 0, draggable: depth > 0 });
    group == null ? void 0 : group.addShape("text", { attrs: TextStyle, name: `title`, zIndex: 1, draggable: depth > 0 });
    if (cfg.desc) {
      group == null ? void 0 : group.addShape("rect", { attrs: DescWrapper, name: `desc-wrapper`, zIndex: 0, draggable: depth > 0 });
      group == null ? void 0 : group.addShape("text", { attrs: DescText, name: `desc`, zIndex: 1, draggable: depth > 0 });
    }
    if (collapse2) {
      drawExpandBtn(group, { collapseNum: (_a = cfg._children) == null ? void 0 : _a.length, width: RectStyle.width, height: RectStyle.height });
    } else if (cfg.isCurrentSelected && !isDragging.value && !cfg.isCurrentEdit) {
      drawAddBtn(group, { width: RectStyle.width, height: RectStyle.height });
    } else if ((_b = cfg.children) == null ? void 0 : _b.length) {
      drawCollapseBtn(group, { width: RectStyle.width, height: RectStyle.height });
    }
    return container;
  }
  function setState(name2, state, node) {
    const group = node.getContainer();
    let wrapper = group.get("children").filter((t) => t.get("name") === "wrapper")[0];
    let collapseBtn = group.get("children").filter((t) => t.get("name") === "collapse-btn")[0];
    if (name2 === "hover") {
      let hoverColor = Color$1(themeColor.value).fade(0.5).string();
      if (state) {
        wrapper == null ? void 0 : wrapper.attr("stroke", hoverColor);
      } else {
        wrapper == null ? void 0 : wrapper.attr("stroke", node.get("model").isCurrentSelected ? activeStrokeColor : "transparent");
      }
      collapseBtn == null ? void 0 : collapseBtn.set("visible", state ? true : false);
    } else if (name2 === "selected") {
      wrapper == null ? void 0 : wrapper.attr("stroke", state ? activeStrokeColor : "transparent");
    }
  }
  G6__default["default"].registerNode("dice-mind-map-root", {
    draw(cfg, group) {
      const container = buildNode(cfg, group);
      return container;
    },
    setState,
    getAnchorPoints() {
      return [
        [0, 0.5],
        [1, 0.5]
      ];
    }
  });
  G6__default["default"].registerNode("dice-mind-map-sub", {
    drawShape: function drawShape(cfg, group) {
      const container = buildNode(cfg, group);
      return container;
    },
    setState,
    getAnchorPoints() {
      return [
        [0, 0.5],
        [1, 0.5]
      ];
    }
  });
  G6__default["default"].registerNode("dice-mind-map-leaf", {
    draw(cfg, group) {
      const container = buildNode(cfg, group);
      return container;
    },
    getAnchorPoints() {
      return [
        [0, 0.5],
        [1, 0.5]
      ];
    },
    setState
  });
  G6__default["default"].registerEdge("hvh", {
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
          stroke: branchColor.value,
          lineWidth: branch.value,
          opacity: cfg.style.opacity == null ? 1 : cfg.style.opacity,
          path: [
            ["M", startPoint.x, startPoint.y],
            ["L", endPoint.x / 3 + 2 / 3 * startPoint.x, startPoint.y],
            ["L", endPoint.x / 3 + 2 / 3 * startPoint.x, startPoint.y + (endPoint.y - startPoint.y) + dist],
            ["Q", endPoint.x / 3 + 2 / 3 * startPoint.x, startPoint.y + (endPoint.y - startPoint.y), endPoint.x / 3 + 2 / 3 * startPoint.x + 10, endPoint.y],
            ["L", endPoint.x, endPoint.y]
          ]
        },
        name: "path-shape",
        zIndex: 0
      });
      return shape;
    }
  });
  G6__default["default"].registerBehavior("edit-mindmap", {
    selectNodeId: null,
    dragNodeId: null,
    nodePosition: {},
    dragStatus: "",
    upClientInfo: [],
    getEvents() {
      return {
        "node:click": "clickNode",
        "node:dblclick": "editNode",
        "node:mouseover": "hoverNode",
        "node:mouseleave": "clearHoverStatus",
        "node:dragstart": "dragStart",
        "node:contextmenu": "selectNode",
        "keydown": "keyDown",
        "canvas:click": "clickCanvas"
      };
    },
    clickCanvas(evt) {
      cancelAllSelect();
    },
    clickNode(evt) {
      const tree2 = evt.currentTarget;
      const model = evt.item.get("model");
      const name2 = evt.target.get("action");
      if (name2 === "expand") {
        expand(model.id);
      } else if (name2 === "collapse") {
        collapse(model.id);
      } else if (name2 === "add") {
        addData(model == null ? void 0 : model.id, placeholderText, true);
      } else if (model.isCurrentSelected) {
        edit(model.id);
      } else {
        selectNode(model.id, !model.isCurrentSelected);
        tree2.findById(model.id).toFront();
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
      const { currentTarget: tree2, item: node } = evt;
      tree2.setItemState(node, "hover", false);
      tree2.layout();
    },
    dragStart(evt) {
      const { currentTarget: tree2, item: node, clientX, clientY } = evt;
      const id = node.get("model").id;
      setIsDragging(true);
      this.dragNodeId = id;
      const _dragnode = tree2.findById(this.dragNodeId);
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
      cancelAllSelect();
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
    dragEnd({ tree: tree2, clientX, clientY }) {
      if (!isDragging.value)
        return;
      setIsDragging(false);
      if (this.dragNodeId) {
        tree2.setItemState(this.dragNodeId, "drag", false);
      }
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
        emitter.emit("onDragEnd", [findData(this.dragNodeId), findData(this.selectNodeId), index]);
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
    },
    showDragCombo({ tree: tree2, clientX, clientY, width, height }) {
      const { x, y } = tree2.getPointByClient(clientX, clientY);
      const model = {
        id: "dragCombo",
        label: "",
        x,
        y,
        type: "rect",
        zIndex: 3,
        style: {
          width,
          height,
          fill: themeColor.value,
          radius,
          opacity: 0.6
        }
      };
      const combo = tree2.getNodes().filter((item) => item.get("id") === "dragCombo");
      if (combo.length) {
        tree2.updateItem(combo[0], model);
      } else {
        tree2.addItem("node", model);
      }
    },
    keyDown(evt) {
      if (isCurrentEdit.value)
        return;
      const { key, shiftKey, ctrlKey, altKey, metaKey } = evt;
      let handler = hotkeys.filter((item) => item.key === key);
      if (!handler.length)
        return;
      if (shiftKey || ctrlKey || altKey || metaKey) {
        if (shiftKey) {
          handler = handler.filter((item) => {
            var _a;
            return ((_a = item.control) == null ? void 0 : _a.indexOf("shift")) > -1;
          });
        }
        if (ctrlKey) {
          handler = handler.filter((item) => {
            var _a;
            return ((_a = item.control) == null ? void 0 : _a.indexOf("ctrl")) > -1;
          });
        }
        if (metaKey) {
          handler = handler.filter((item) => {
            var _a;
            return ((_a = item.control) == null ? void 0 : _a.indexOf("cmd")) > -1;
          });
        }
        if (altKey) {
          handler = handler.filter((item) => {
            var _a;
            return ((_a = item.control) == null ? void 0 : _a.indexOf("alt")) > -1;
          });
        }
      } else if (handler.length === 1 && handler[0].control) {
        handler = [];
      }
      if (!handler.length)
        return;
      evt.preventDefault();
      handler[0].Event.call(this, getSelectedNodes());
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
          scaleRatio: scaleRatio2
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
          lineType: (layoutConfig == null ? void 0 : layoutConfig.sharpCorner) ? "hvh" : "cubic-horizontal"
        });
      }
      const config = {
        width: (_a = this.container) == null ? void 0 : _a.scrollWidth,
        height: (_c = (_b = this.container) == null ? void 0 : _b.scrollHeight) != null ? _c : 0 - 20,
        layout: {
          type: "compactBox",
          direction: "H",
          getHeight: (node) => {
            return node.height;
          },
          getWidth: (node) => {
            return node.width;
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
          edit: ["edit-mindmap"]
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
      const data = IMData$1.init(this.data instanceof Array ? this.data[0] : this.data, true);
      const tree2 = new G6__default["default"].TreeGraph(__spreadProps(__spreadValues({}, config), {
        container: this.container,
        animate: false,
        renderer: "canvas"
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
      }
      if (layoutConfig == null ? void 0 : layoutConfig.drag) {
        this.addBehaviors("drag-canvas");
      }
      if (layoutConfig == null ? void 0 : layoutConfig.zoom) {
        this.addBehaviors("zoom-canvas");
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
      leafFontColor
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
      onAdd: Function,
      onExpand: Function,
      onCollapse: Function,
      onSelectedNode: Function,
      onAfterEdit: Function,
      onDragEnd: Function
    },
    mounted() {
      this.$props.onAdd && emitter.on("onAdd", this.$props.onAdd);
      this.$props.onExpand && emitter.on("onExpand", this.$props.onExpand);
      this.$props.onCollapse && emitter.on("onCollapse", this.$props.onCollapse);
      this.$props.onSelectedNode && emitter.on("onSelectedNode", this.$props.onSelectedNode);
      this.$props.onAfterEdit && emitter.on("onAfterEdit", this.$props.onAfterEdit);
      this.$props.onDragEnd && emitter.on("onDragEnd", this.$props.onDragEnd);
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
      find: findData
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
      }
    }
  };
  const _hoisted_1 = /* @__PURE__ */ vue.createElementVNode("div", {
    id: "mxs-mindmap_container",
    class: "mindmap-container"
  }, null, -1);
  const _hoisted_2 = /* @__PURE__ */ vue.createElementVNode("div", {
    id: "node-input",
    contenteditable: "true"
  }, null, -1);
  const _hoisted_3 = [
    _hoisted_1,
    _hoisted_2
  ];
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", null, _hoisted_3);
  }
  var Mindmap = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  return Mindmap;
});
//# sourceMappingURL=mxs-mindmap.umd.js.map

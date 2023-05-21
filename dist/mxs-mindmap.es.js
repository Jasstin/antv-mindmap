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
import G6, { registerNode } from "@antv/g6";
import { ref, openBlock, createElementBlock, createElementVNode } from "vue";
var Mindmap$1 = "";
const defaultTextStyle = {
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 16,
  fontFamily: '"Microsoft YaHei", "PingFang SC", "Microsoft JhengHei", sans-serif',
  textBaseline: "top",
  lineHeight: 25,
  fill: "#000"
};
const defaultIconStyle = {
  height: 25
};
const isAWord = (str2) => /^[a-zA-Z]+$/.test(str2) && new RegExp("\\b" + str2 + "\\b", "g").test(str2);
const splitText = (str2) => {
  let res = [];
  str2.split(/\b/).forEach((item) => {
    if (isAWord(item)) {
      res.push(item);
    } else {
      res = res.concat(item.split(""));
    }
  });
  return res;
};
var isArrayLike = function(value) {
  return value !== null && typeof value !== "function" && isFinite(value.length);
};
var toString$1 = {}.toString;
var isType = function(value, type) {
  return toString$1.call(value) === "[object " + type + "]";
};
var isFunction = function(value) {
  return isType(value, "Function");
};
var isNil = function(value) {
  return value === null || value === void 0;
};
var isArray$1 = function(value) {
  return Array.isArray ? Array.isArray(value) : isType(value, "Array");
};
var isObject$1 = function(value) {
  var type = typeof value;
  return value !== null && type === "object" || type === "function";
};
function each(elements, func) {
  if (!elements) {
    return;
  }
  var rst;
  if (isArray$1(elements)) {
    for (var i = 0, len = elements.length; i < len; i++) {
      rst = func(elements[i], i);
      if (rst === false) {
        break;
      }
    }
  } else if (isObject$1(elements)) {
    for (var k in elements) {
      if (elements.hasOwnProperty(k)) {
        rst = func(elements[k], k);
        if (rst === false) {
          break;
        }
      }
    }
  }
}
var isObjectLike = function(value) {
  return typeof value === "object" && value !== null;
};
var isPlainObject = function(value) {
  if (!isObjectLike(value) || !isType(value, "Object")) {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  var proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
};
var max$1 = function(arr) {
  if (!isArray$1(arr)) {
    return void 0;
  }
  return arr.reduce(function(prev, curr) {
    return Math.max(prev, curr);
  }, arr[0]);
};
var min$1 = function(arr) {
  if (!isArray$1(arr)) {
    return void 0;
  }
  return arr.reduce(function(prev, curr) {
    return Math.min(prev, curr);
  }, arr[0]);
};
var isString = function(str2) {
  return isType(str2, "String");
};
function wrapBehavior(obj, action) {
  if (obj["_wrap_" + action]) {
    return obj["_wrap_" + action];
  }
  var method = function(e) {
    obj[action](e);
  };
  obj["_wrap_" + action] = method;
  return method;
}
var isNumber = function(value) {
  return isType(value, "Number");
};
var PRECISION = 1e-5;
function isNumberEqual$1(a, b, precision) {
  if (precision === void 0) {
    precision = PRECISION;
  }
  return Math.abs(a - b) < precision;
}
var mod = function(n, m) {
  return (n % m + m) % m;
};
var RADIAN = Math.PI / 180;
var toRadian = function(degree3) {
  return RADIAN * degree3;
};
var values = Object.values ? function(obj) {
  return Object.values(obj);
} : function(obj) {
  var result = [];
  each(obj, function(value, key) {
    if (!(isFunction(obj) && key === "prototype")) {
      result.push(value);
    }
  });
  return result;
};
var toString = function(value) {
  if (isNil(value))
    return "";
  return value.toString();
};
var upperFirst = function(value) {
  var str2 = toString(value);
  return str2.charAt(0).toUpperCase() + str2.substring(1);
};
var isBoolean = function(value) {
  return isType(value, "Boolean");
};
function _mix(dist, obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && key !== "constructor" && obj[key] !== void 0) {
      dist[key] = obj[key];
    }
  }
}
function mix(dist, src1, src2, src3) {
  if (src1)
    _mix(dist, src1);
  if (src2)
    _mix(dist, src2);
  if (src3)
    _mix(dist, src3);
  return dist;
}
var clone$1 = function(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  var rst;
  if (isArray$1(obj)) {
    rst = [];
    for (var i = 0, l = obj.length; i < l; i++) {
      if (typeof obj[i] === "object" && obj[i] != null) {
        rst[i] = clone$1(obj[i]);
      } else {
        rst[i] = obj[i];
      }
    }
  } else {
    rst = {};
    for (var k in obj) {
      if (typeof obj[k] === "object" && obj[k] != null) {
        rst[k] = clone$1(obj[k]);
      } else {
        rst[k] = obj[k];
      }
    }
  }
  return rst;
};
var memoize = function(f, resolver) {
  if (!isFunction(f)) {
    throw new TypeError("Expected a function");
  }
  var memoized = function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var key = resolver ? resolver.apply(this, args) : args[0];
    var cache2 = memoized.cache;
    if (cache2.has(key)) {
      return cache2.get(key);
    }
    var result = f.apply(this, args);
    cache2.set(key, result);
    return result;
  };
  memoized.cache = /* @__PURE__ */ new Map();
  return memoized;
};
var MAX_MIX_LEVEL = 5;
function _deepMix(dist, src, level, maxLevel) {
  level = level || 0;
  maxLevel = maxLevel || MAX_MIX_LEVEL;
  for (var key in src) {
    if (src.hasOwnProperty(key)) {
      var value = src[key];
      if (value !== null && isPlainObject(value)) {
        if (!isPlainObject(dist[key])) {
          dist[key] = {};
        }
        if (level < maxLevel) {
          _deepMix(dist[key], value, level + 1, maxLevel);
        } else {
          dist[key] = src[key];
        }
      } else if (isArray$1(value)) {
        dist[key] = [];
        dist[key] = dist[key].concat(value);
      } else if (value !== void 0) {
        dist[key] = value;
      }
    }
  }
}
var deepMix = function(rst) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  for (var i = 0; i < args.length; i += 1) {
    _deepMix(rst, args[i]);
  }
  return rst;
};
var isEqual$1 = function(value, other) {
  if (value === other) {
    return true;
  }
  if (!value || !other) {
    return false;
  }
  if (isString(value) || isString(other)) {
    return false;
  }
  if (isArrayLike(value) || isArrayLike(other)) {
    if (value.length !== other.length) {
      return false;
    }
    var rst = true;
    for (var i = 0; i < value.length; i++) {
      rst = isEqual$1(value[i], other[i]);
      if (!rst) {
        break;
      }
    }
    return rst;
  }
  if (isObjectLike(value) || isObjectLike(other)) {
    var valueKeys = Object.keys(value);
    var otherKeys = Object.keys(other);
    if (valueKeys.length !== otherKeys.length) {
      return false;
    }
    var rst = true;
    for (var i = 0; i < valueKeys.length; i++) {
      rst = isEqual$1(value[valueKeys[i]], other[valueKeys[i]]);
      if (!rst) {
        break;
      }
    }
    return rst;
  }
  return false;
};
var get = function(obj, key, defaultValue) {
  var p = 0;
  var keyArr = isString(key) ? key.split(".") : key;
  while (obj && p < keyArr.length) {
    obj = obj[keyArr[p++]];
  }
  return obj === void 0 || p < keyArr.length ? defaultValue : obj;
};
var throttle = function(func, wait, options) {
  var timeout2, context, args, result;
  var previous = 0;
  if (!options)
    options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout2 = null;
    result = func.apply(context, args);
    if (!timeout2)
      context = args = null;
  };
  var throttled = function() {
    var now2 = Date.now();
    if (!previous && options.leading === false)
      previous = now2;
    var remaining = wait - (now2 - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout2) {
        clearTimeout(timeout2);
        timeout2 = null;
      }
      previous = now2;
      result = func.apply(context, args);
      if (!timeout2)
        context = args = null;
    } else if (!timeout2 && options.trailing !== false) {
      timeout2 = setTimeout(later, remaining);
    }
    return result;
  };
  throttled.cancel = function() {
    clearTimeout(timeout2);
    previous = 0;
    timeout2 = context = args = null;
  };
  return throttled;
};
var map = {};
var uniqueId$1 = function(prefix) {
  prefix = prefix || "g";
  if (!map[prefix]) {
    map[prefix] = 1;
  } else {
    map[prefix] += 1;
  }
  return prefix + map[prefix];
};
var noop = function() {
};
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b10) {
    d2.__proto__ = b10;
  } || function(d2, b10) {
    for (var p in b10)
      if (Object.prototype.hasOwnProperty.call(b10, p))
        d2[p] = b10[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __spreadArray$1(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
var ctx;
var measureTextWidth = memoize(function(text2, font) {
  if (font === void 0) {
    font = {};
  }
  var fontSize = font.fontSize, fontFamily = font.fontFamily, fontWeight = font.fontWeight, fontStyle = font.fontStyle, fontVariant = font.fontVariant;
  if (!ctx) {
    ctx = document.createElement("canvas").getContext("2d");
  }
  ctx.font = [fontStyle, fontVariant, fontWeight, fontSize + "px", fontFamily].join(" ");
  return ctx.measureText(isString(text2) ? text2 : "").width;
}, function(text2, font) {
  if (font === void 0) {
    font = {};
  }
  return __spreadArrays([text2], values(font)).join("");
});
const getTextWrapHeight = (text2, attrs, maxWidth) => {
  if (!text2) {
    return {
      width: 0,
      height: 0,
      line: 0,
      endlineWidth: 0
    };
  }
  let renderItems = [];
  let line2 = 1;
  let lineLetter = "";
  let tempLine = "";
  const textIndent = attrs.textIndent || 0;
  const textAttr = Object.assign({}, defaultTextStyle, attrs);
  const originy = (textAttr.y || 0) + (textAttr.lineHeight - textAttr.fontSize) / 2;
  let y = originy;
  const getWidth = (text22) => Math.ceil(measureTextWidth(text22, textAttr));
  if (!maxWidth) {
    return {
      width: getWidth(text2) + textIndent,
      height: textAttr.lineHeight,
      line: 1,
      endlineWidth: getWidth(text2) + textIndent
    };
  }
  splitText(text2).forEach((item, index, arr) => {
    const textWidth = measureTextWidth(renderItems.join("") + item, textAttr);
    const textIndent2 = attrs.textIndent || 0;
    let isFirstLine = y === originy;
    if (textWidth + (isFirstLine ? textIndent2 : 0) > maxWidth) {
      renderItems = [item];
      y += textAttr.lineHeight;
      isFirstLine = false;
      if (getWidth(tempLine) > getWidth(lineLetter)) {
        lineLetter = tempLine;
      }
      line2++;
      tempLine = item;
    } else {
      renderItems.push(item);
      tempLine += item;
    }
    if (index === arr.length - 1) {
      if (getWidth(tempLine) > getWidth(lineLetter)) {
        lineLetter = tempLine;
      }
      tempLine = "";
    }
  });
  return {
    width: line2 > 1 ? getWidth(lineLetter) + textIndent : getWidth(text2) + textIndent,
    height: line2 * textAttr.lineHeight,
    line: line2,
    endlineWidth: line2 > 1 ? getWidth(renderItems.join("")) : getWidth(text2) + textIndent
  };
};
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
const maxFontCount = 12;
const globalFontSize = [16, 14, 12];
const globalFontWeight = [600, 500, 400];
ref([]);
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
const buildNodeStyle = ({ name = placeholderText, desc = "", depth, iconPath, nodeStyle, branchColor: branchColor2, visible = true, beforeWidth = 10, afterWidth = 10 }, config = { renderer: "canvas" }) => {
  name === "" && (name = placeholderText);
  const fontSize = globalFontSize[depth] || 12;
  const fontWeight = globalFontWeight[depth] || 400;
  const descFontWeight = 400;
  const maxNodeSize = fontSize * maxFontCount + paddingH * 2;
  const descFontSize = fontSize - 2;
  const imageIconWidth = iconPath ? defaultIconStyle.height : 0;
  const { width: nameWidth, line: nameLine } = getTextWrapHeight(name, { text: name, fontSize, fontWeight, textIndent: imageIconWidth }, maxNodeSize);
  const { width: descWidth, line: descLine } = getTextWrapHeight(desc, { text: desc, fontSize: descFontSize, fontWeight: descFontWeight }, maxNodeSize);
  const oneLineHeight = defaultTextStyle.lineHeight;
  const height = oneLineHeight * (nameLine + descLine);
  const FillColor = [themeColor.value, themeColor_sub.value, themeColor_leaf.value][depth] || themeColor_leaf.value;
  const FontColor = [fontColor_root.value, fontColor_sub.value, fontColor_leaf.value][depth] || fontColor_leaf.value;
  if (depth >= 2) {
    beforeWidth = 0;
    afterWidth = 0;
  }
  const obj = {
    label: name,
    name,
    fullName: name,
    desc,
    iconPath,
    type: "mindmap-node",
    style: Object.assign({}, {
      fontSize,
      fontWeight,
      descFontSize,
      width: Math.max(nameWidth, descWidth) + paddingH * 2,
      maxWidth: maxNodeSize,
      height,
      FillColor,
      FontColor,
      stroke: 2,
      strokeColor: "transparent",
      nameHeight: oneLineHeight * nameLine,
      descHeight: oneLineHeight * descLine,
      descFontWeight,
      imageIconWidth,
      branchColor: branchColor2,
      visible,
      beforeWidth,
      afterWidth
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
    var _a, _b;
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
      side: depth < 2 ? rawData.side : parent.side,
      rawData: isInit ? rawData : rawData == null ? void 0 : rawData.rawData
    }, buildNodeStyle(__spreadProps(__spreadValues({}, Object.assign({}, rawData, rawData.style || {}, isInit ? { name: ((_b = rawData == null ? void 0 : rawData.info) == null ? void 0 : _b.title) || rawData.name } : { name: rawData.name })), {
      depth
    }), this.config));
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
    let _data = {};
    if ((d == null ? void 0 : d.length) > 1) {
      _data = {
        name: "root",
        children: d,
        visible: false,
        branchColor: "transparent"
      };
    } else if ((d == null ? void 0 : d.length) == 1) {
      _data = d[0];
    } else {
      _data = d;
    }
    this.data = this.createMdataFromData(_data, "0", null, isInit);
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
const BROWSER_ALIASES_MAP = {
  "Amazon Silk": "amazon_silk",
  "Android Browser": "android",
  Bada: "bada",
  BlackBerry: "blackberry",
  Chrome: "chrome",
  Chromium: "chromium",
  Electron: "electron",
  Epiphany: "epiphany",
  Firefox: "firefox",
  Focus: "focus",
  Generic: "generic",
  "Google Search": "google_search",
  Googlebot: "googlebot",
  "Internet Explorer": "ie",
  "K-Meleon": "k_meleon",
  Maxthon: "maxthon",
  "Microsoft Edge": "edge",
  "MZ Browser": "mz",
  "NAVER Whale Browser": "naver",
  Opera: "opera",
  "Opera Coast": "opera_coast",
  PhantomJS: "phantomjs",
  Puffin: "puffin",
  QupZilla: "qupzilla",
  QQ: "qq",
  QQLite: "qqlite",
  Safari: "safari",
  Sailfish: "sailfish",
  "Samsung Internet for Android": "samsung_internet",
  SeaMonkey: "seamonkey",
  Sleipnir: "sleipnir",
  Swing: "swing",
  Tizen: "tizen",
  "UC Browser": "uc",
  Vivaldi: "vivaldi",
  "WebOS Browser": "webos",
  WeChat: "wechat",
  "Yandex Browser": "yandex",
  Roku: "roku"
};
const BROWSER_MAP = {
  amazon_silk: "Amazon Silk",
  android: "Android Browser",
  bada: "Bada",
  blackberry: "BlackBerry",
  chrome: "Chrome",
  chromium: "Chromium",
  electron: "Electron",
  epiphany: "Epiphany",
  firefox: "Firefox",
  focus: "Focus",
  generic: "Generic",
  googlebot: "Googlebot",
  google_search: "Google Search",
  ie: "Internet Explorer",
  k_meleon: "K-Meleon",
  maxthon: "Maxthon",
  edge: "Microsoft Edge",
  mz: "MZ Browser",
  naver: "NAVER Whale Browser",
  opera: "Opera",
  opera_coast: "Opera Coast",
  phantomjs: "PhantomJS",
  puffin: "Puffin",
  qupzilla: "QupZilla",
  qq: "QQ Browser",
  qqlite: "QQ Browser Lite",
  safari: "Safari",
  sailfish: "Sailfish",
  samsung_internet: "Samsung Internet for Android",
  seamonkey: "SeaMonkey",
  sleipnir: "Sleipnir",
  swing: "Swing",
  tizen: "Tizen",
  uc: "UC Browser",
  vivaldi: "Vivaldi",
  webos: "WebOS Browser",
  wechat: "WeChat",
  yandex: "Yandex Browser"
};
const PLATFORMS_MAP = {
  tablet: "tablet",
  mobile: "mobile",
  desktop: "desktop",
  tv: "tv"
};
const OS_MAP = {
  WindowsPhone: "Windows Phone",
  Windows: "Windows",
  MacOS: "macOS",
  iOS: "iOS",
  Android: "Android",
  WebOS: "WebOS",
  BlackBerry: "BlackBerry",
  Bada: "Bada",
  Tizen: "Tizen",
  Linux: "Linux",
  ChromeOS: "Chrome OS",
  PlayStation4: "PlayStation 4",
  Roku: "Roku"
};
const ENGINE_MAP = {
  EdgeHTML: "EdgeHTML",
  Blink: "Blink",
  Trident: "Trident",
  Presto: "Presto",
  Gecko: "Gecko",
  WebKit: "WebKit"
};
class Utils {
  static getFirstMatch(regexp, ua) {
    const match = ua.match(regexp);
    return match && match.length > 0 && match[1] || "";
  }
  static getSecondMatch(regexp, ua) {
    const match = ua.match(regexp);
    return match && match.length > 1 && match[2] || "";
  }
  static matchAndReturnConst(regexp, ua, _const) {
    if (regexp.test(ua)) {
      return _const;
    }
    return void 0;
  }
  static getWindowsVersionName(version) {
    switch (version) {
      case "NT":
        return "NT";
      case "XP":
        return "XP";
      case "NT 5.0":
        return "2000";
      case "NT 5.1":
        return "XP";
      case "NT 5.2":
        return "2003";
      case "NT 6.0":
        return "Vista";
      case "NT 6.1":
        return "7";
      case "NT 6.2":
        return "8";
      case "NT 6.3":
        return "8.1";
      case "NT 10.0":
        return "10";
      default:
        return void 0;
    }
  }
  static getMacOSVersionName(version) {
    const v = version.split(".").splice(0, 2).map((s) => parseInt(s, 10) || 0);
    v.push(0);
    if (v[0] !== 10)
      return void 0;
    switch (v[1]) {
      case 5:
        return "Leopard";
      case 6:
        return "Snow Leopard";
      case 7:
        return "Lion";
      case 8:
        return "Mountain Lion";
      case 9:
        return "Mavericks";
      case 10:
        return "Yosemite";
      case 11:
        return "El Capitan";
      case 12:
        return "Sierra";
      case 13:
        return "High Sierra";
      case 14:
        return "Mojave";
      case 15:
        return "Catalina";
      default:
        return void 0;
    }
  }
  static getAndroidVersionName(version) {
    const v = version.split(".").splice(0, 2).map((s) => parseInt(s, 10) || 0);
    v.push(0);
    if (v[0] === 1 && v[1] < 5)
      return void 0;
    if (v[0] === 1 && v[1] < 6)
      return "Cupcake";
    if (v[0] === 1 && v[1] >= 6)
      return "Donut";
    if (v[0] === 2 && v[1] < 2)
      return "Eclair";
    if (v[0] === 2 && v[1] === 2)
      return "Froyo";
    if (v[0] === 2 && v[1] > 2)
      return "Gingerbread";
    if (v[0] === 3)
      return "Honeycomb";
    if (v[0] === 4 && v[1] < 1)
      return "Ice Cream Sandwich";
    if (v[0] === 4 && v[1] < 4)
      return "Jelly Bean";
    if (v[0] === 4 && v[1] >= 4)
      return "KitKat";
    if (v[0] === 5)
      return "Lollipop";
    if (v[0] === 6)
      return "Marshmallow";
    if (v[0] === 7)
      return "Nougat";
    if (v[0] === 8)
      return "Oreo";
    if (v[0] === 9)
      return "Pie";
    return void 0;
  }
  static getVersionPrecision(version) {
    return version.split(".").length;
  }
  static compareVersions(versionA, versionB, isLoose = false) {
    const versionAPrecision = Utils.getVersionPrecision(versionA);
    const versionBPrecision = Utils.getVersionPrecision(versionB);
    let precision = Math.max(versionAPrecision, versionBPrecision);
    let lastPrecision = 0;
    const chunks = Utils.map([versionA, versionB], (version) => {
      const delta = precision - Utils.getVersionPrecision(version);
      const _version = version + new Array(delta + 1).join(".0");
      return Utils.map(_version.split("."), (chunk) => new Array(20 - chunk.length).join("0") + chunk).reverse();
    });
    if (isLoose) {
      lastPrecision = precision - Math.min(versionAPrecision, versionBPrecision);
    }
    precision -= 1;
    while (precision >= lastPrecision) {
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === lastPrecision) {
          return 0;
        }
        precision -= 1;
      } else if (chunks[0][precision] < chunks[1][precision]) {
        return -1;
      }
    }
    return void 0;
  }
  static map(arr, iterator) {
    const result = [];
    let i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i += 1) {
      result.push(iterator(arr[i]));
    }
    return result;
  }
  static find(arr, predicate) {
    let i;
    let l;
    if (Array.prototype.find) {
      return Array.prototype.find.call(arr, predicate);
    }
    for (i = 0, l = arr.length; i < l; i += 1) {
      const value = arr[i];
      if (predicate(value, i)) {
        return value;
      }
    }
    return void 0;
  }
  static assign(obj, ...assigners) {
    const result = obj;
    let i;
    let l;
    if (Object.assign) {
      return Object.assign(obj, ...assigners);
    }
    for (i = 0, l = assigners.length; i < l; i += 1) {
      const assigner = assigners[i];
      if (typeof assigner === "object" && assigner !== null) {
        const keys = Object.keys(assigner);
        keys.forEach((key) => {
          result[key] = assigner[key];
        });
      }
    }
    return obj;
  }
  static getBrowserAlias(browserName) {
    return BROWSER_ALIASES_MAP[browserName];
  }
  static getBrowserTypeByAlias(browserAlias) {
    return BROWSER_MAP[browserAlias] || "";
  }
}
const commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;
const browsersList = [
  {
    test: [/googlebot/i],
    describe(ua) {
      const browser2 = {
        name: "Googlebot"
      };
      const version = Utils.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/opera/i],
    describe(ua) {
      const browser2 = {
        name: "Opera"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/opr\/|opios/i],
    describe(ua) {
      const browser2 = {
        name: "Opera"
      };
      const version = Utils.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(ua) {
      const browser2 = {
        name: "Samsung Internet for Android"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/Whale/i],
    describe(ua) {
      const browser2 = {
        name: "NAVER Whale Browser"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/MZBrowser/i],
    describe(ua) {
      const browser2 = {
        name: "MZ Browser"
      };
      const version = Utils.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/focus/i],
    describe(ua) {
      const browser2 = {
        name: "Focus"
      };
      const version = Utils.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/swing/i],
    describe(ua) {
      const browser2 = {
        name: "Swing"
      };
      const version = Utils.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/coast/i],
    describe(ua) {
      const browser2 = {
        name: "Opera Coast"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(ua) {
      const browser2 = {
        name: "Opera Touch"
      };
      const version = Utils.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/yabrowser/i],
    describe(ua) {
      const browser2 = {
        name: "Yandex Browser"
      };
      const version = Utils.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/ucbrowser/i],
    describe(ua) {
      const browser2 = {
        name: "UC Browser"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/Maxthon|mxios/i],
    describe(ua) {
      const browser2 = {
        name: "Maxthon"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/epiphany/i],
    describe(ua) {
      const browser2 = {
        name: "Epiphany"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/puffin/i],
    describe(ua) {
      const browser2 = {
        name: "Puffin"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/sleipnir/i],
    describe(ua) {
      const browser2 = {
        name: "Sleipnir"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/k-meleon/i],
    describe(ua) {
      const browser2 = {
        name: "K-Meleon"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/micromessenger/i],
    describe(ua) {
      const browser2 = {
        name: "WeChat"
      };
      const version = Utils.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/qqbrowser/i],
    describe(ua) {
      const browser2 = {
        name: /qqbrowserlite/i.test(ua) ? "QQ Browser Lite" : "QQ Browser"
      };
      const version = Utils.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/msie|trident/i],
    describe(ua) {
      const browser2 = {
        name: "Internet Explorer"
      };
      const version = Utils.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/\sedg\//i],
    describe(ua) {
      const browser2 = {
        name: "Microsoft Edge"
      };
      const version = Utils.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(ua) {
      const browser2 = {
        name: "Microsoft Edge"
      };
      const version = Utils.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/vivaldi/i],
    describe(ua) {
      const browser2 = {
        name: "Vivaldi"
      };
      const version = Utils.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/seamonkey/i],
    describe(ua) {
      const browser2 = {
        name: "SeaMonkey"
      };
      const version = Utils.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/sailfish/i],
    describe(ua) {
      const browser2 = {
        name: "Sailfish"
      };
      const version = Utils.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/silk/i],
    describe(ua) {
      const browser2 = {
        name: "Amazon Silk"
      };
      const version = Utils.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/phantom/i],
    describe(ua) {
      const browser2 = {
        name: "PhantomJS"
      };
      const version = Utils.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/slimerjs/i],
    describe(ua) {
      const browser2 = {
        name: "SlimerJS"
      };
      const version = Utils.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(ua) {
      const browser2 = {
        name: "BlackBerry"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(ua) {
      const browser2 = {
        name: "WebOS Browser"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/bada/i],
    describe(ua) {
      const browser2 = {
        name: "Bada"
      };
      const version = Utils.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/tizen/i],
    describe(ua) {
      const browser2 = {
        name: "Tizen"
      };
      const version = Utils.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/qupzilla/i],
    describe(ua) {
      const browser2 = {
        name: "QupZilla"
      };
      const version = Utils.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(ua) {
      const browser2 = {
        name: "Firefox"
      };
      const version = Utils.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/electron/i],
    describe(ua) {
      const browser2 = {
        name: "Electron"
      };
      const version = Utils.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/MiuiBrowser/i],
    describe(ua) {
      const browser2 = {
        name: "Miui"
      };
      const version = Utils.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/chromium/i],
    describe(ua) {
      const browser2 = {
        name: "Chromium"
      };
      const version = Utils.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(ua) {
      const browser2 = {
        name: "Chrome"
      };
      const version = Utils.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/GSA/i],
    describe(ua) {
      const browser2 = {
        name: "Google Search"
      };
      const version = Utils.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe(ua) {
      const browser2 = {
        name: "Android Browser"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/playstation 4/i],
    describe(ua) {
      const browser2 = {
        name: "PlayStation 4"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/safari|applewebkit/i],
    describe(ua) {
      const browser2 = {
        name: "Safari"
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser2.version = version;
      }
      return browser2;
    }
  },
  {
    test: [/.*/i],
    describe(ua) {
      const regexpWithoutDeviceSpec = /^(.*)\/(.*) /;
      const regexpWithDeviceSpec = /^(.*)\/(.*)[ \t]\((.*)/;
      const hasDeviceSpec = ua.search("\\(") !== -1;
      const regexp = hasDeviceSpec ? regexpWithDeviceSpec : regexpWithoutDeviceSpec;
      return {
        name: Utils.getFirstMatch(regexp, ua),
        version: Utils.getSecondMatch(regexp, ua)
      };
    }
  }
];
var osParsersList = [
  {
    test: [/Roku\/DVP/],
    describe(ua) {
      const version = Utils.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, ua);
      return {
        name: OS_MAP.Roku,
        version
      };
    }
  },
  {
    test: [/windows phone/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, ua);
      return {
        name: OS_MAP.WindowsPhone,
        version
      };
    }
  },
  {
    test: [/windows /i],
    describe(ua) {
      const version = Utils.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, ua);
      const versionName = Utils.getWindowsVersionName(version);
      return {
        name: OS_MAP.Windows,
        version,
        versionName
      };
    }
  },
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe(ua) {
      const result = {
        name: OS_MAP.iOS
      };
      const version = Utils.getSecondMatch(/(Version\/)(\d[\d.]+)/, ua);
      if (version) {
        result.version = version;
      }
      return result;
    }
  },
  {
    test: [/macintosh/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, ua).replace(/[_\s]/g, ".");
      const versionName = Utils.getMacOSVersionName(version);
      const os = {
        name: OS_MAP.MacOS,
        version
      };
      if (versionName) {
        os.versionName = versionName;
      }
      return os;
    }
  },
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, ua).replace(/[_\s]/g, ".");
      return {
        name: OS_MAP.iOS,
        version
      };
    }
  },
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe(ua) {
      const version = Utils.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, ua);
      const versionName = Utils.getAndroidVersionName(version);
      const os = {
        name: OS_MAP.Android,
        version
      };
      if (versionName) {
        os.versionName = versionName;
      }
      return os;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, ua);
      const os = {
        name: OS_MAP.WebOS
      };
      if (version && version.length) {
        os.version = version;
      }
      return os;
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, ua) || Utils.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, ua) || Utils.getFirstMatch(/\bbb(\d+)/i, ua);
      return {
        name: OS_MAP.BlackBerry,
        version
      };
    }
  },
  {
    test: [/bada/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, ua);
      return {
        name: OS_MAP.Bada,
        version
      };
    }
  },
  {
    test: [/tizen/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, ua);
      return {
        name: OS_MAP.Tizen,
        version
      };
    }
  },
  {
    test: [/linux/i],
    describe() {
      return {
        name: OS_MAP.Linux
      };
    }
  },
  {
    test: [/CrOS/],
    describe() {
      return {
        name: OS_MAP.ChromeOS
      };
    }
  },
  {
    test: [/PlayStation 4/],
    describe(ua) {
      const version = Utils.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, ua);
      return {
        name: OS_MAP.PlayStation4,
        version
      };
    }
  }
];
var platformParsersList = [
  {
    test: [/googlebot/i],
    describe() {
      return {
        type: "bot",
        vendor: "Google"
      };
    }
  },
  {
    test: [/huawei/i],
    describe(ua) {
      const model = Utils.getFirstMatch(/(can-l01)/i, ua) && "Nova";
      const platform = {
        type: PLATFORMS_MAP.mobile,
        vendor: "Huawei"
      };
      if (model) {
        platform.model = model;
      }
      return platform;
    }
  },
  {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Nexus"
      };
    }
  },
  {
    test: [/ipad/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Apple",
        model: "iPad"
      };
    }
  },
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Apple",
        model: "iPad"
      };
    }
  },
  {
    test: [/kftt build/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Amazon",
        model: "Kindle Fire HD 7"
      };
    }
  },
  {
    test: [/silk/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Amazon"
      };
    }
  },
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet
      };
    }
  },
  {
    test(parser) {
      const iDevice = parser.test(/ipod|iphone/i);
      const likeIDevice = parser.test(/like (ipod|iphone)/i);
      return iDevice && !likeIDevice;
    },
    describe(ua) {
      const model = Utils.getFirstMatch(/(ipod|iphone)/i, ua);
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "Apple",
        model
      };
    }
  },
  {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "Nexus"
      };
    }
  },
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile
      };
    }
  },
  {
    test(parser) {
      return parser.getBrowserName(true) === "blackberry";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "BlackBerry"
      };
    }
  },
  {
    test(parser) {
      return parser.getBrowserName(true) === "bada";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile
      };
    }
  },
  {
    test(parser) {
      return parser.getBrowserName() === "windows phone";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "Microsoft"
      };
    }
  },
  {
    test(parser) {
      const osMajorVersion = Number(String(parser.getOSVersion()).split(".")[0]);
      return parser.getOSName(true) === "android" && osMajorVersion >= 3;
    },
    describe() {
      return {
        type: PLATFORMS_MAP.tablet
      };
    }
  },
  {
    test(parser) {
      return parser.getOSName(true) === "android";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile
      };
    }
  },
  {
    test(parser) {
      return parser.getOSName(true) === "macos";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop,
        vendor: "Apple"
      };
    }
  },
  {
    test(parser) {
      return parser.getOSName(true) === "windows";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop
      };
    }
  },
  {
    test(parser) {
      return parser.getOSName(true) === "linux";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop
      };
    }
  },
  {
    test(parser) {
      return parser.getOSName(true) === "playstation 4";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.tv
      };
    }
  },
  {
    test(parser) {
      return parser.getOSName(true) === "roku";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.tv
      };
    }
  }
];
var enginesParsersList = [
  {
    test(parser) {
      return parser.getBrowserName(true) === "microsoft edge";
    },
    describe(ua) {
      const isBlinkBased = /\sedg\//i.test(ua);
      if (isBlinkBased) {
        return {
          name: ENGINE_MAP.Blink
        };
      }
      const version = Utils.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, ua);
      return {
        name: ENGINE_MAP.EdgeHTML,
        version
      };
    }
  },
  {
    test: [/trident/i],
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Trident
      };
      const version = Utils.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        engine.version = version;
      }
      return engine;
    }
  },
  {
    test(parser) {
      return parser.test(/presto/i);
    },
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Presto
      };
      const version = Utils.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        engine.version = version;
      }
      return engine;
    }
  },
  {
    test(parser) {
      const isGecko = parser.test(/gecko/i);
      const likeGecko = parser.test(/like gecko/i);
      return isGecko && !likeGecko;
    },
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Gecko
      };
      const version = Utils.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        engine.version = version;
      }
      return engine;
    }
  },
  {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: ENGINE_MAP.Blink
      };
    }
  },
  {
    test: [/(apple)?webkit/i],
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.WebKit
      };
      const version = Utils.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        engine.version = version;
      }
      return engine;
    }
  }
];
class Parser {
  constructor(UA, skipParsing = false) {
    if (UA === void 0 || UA === null || UA === "") {
      throw new Error("UserAgent parameter can't be empty");
    }
    this._ua = UA;
    this.parsedResult = {};
    if (skipParsing !== true) {
      this.parse();
    }
  }
  getUA() {
    return this._ua;
  }
  test(regex) {
    return regex.test(this._ua);
  }
  parseBrowser() {
    this.parsedResult.browser = {};
    const browserDescriptor = Utils.find(browsersList, (_browser) => {
      if (typeof _browser.test === "function") {
        return _browser.test(this);
      }
      if (_browser.test instanceof Array) {
        return _browser.test.some((condition) => this.test(condition));
      }
      throw new Error("Browser's test function is not valid");
    });
    if (browserDescriptor) {
      this.parsedResult.browser = browserDescriptor.describe(this.getUA());
    }
    return this.parsedResult.browser;
  }
  getBrowser() {
    if (this.parsedResult.browser) {
      return this.parsedResult.browser;
    }
    return this.parseBrowser();
  }
  getBrowserName(toLowerCase) {
    if (toLowerCase) {
      return String(this.getBrowser().name).toLowerCase() || "";
    }
    return this.getBrowser().name || "";
  }
  getBrowserVersion() {
    return this.getBrowser().version;
  }
  getOS() {
    if (this.parsedResult.os) {
      return this.parsedResult.os;
    }
    return this.parseOS();
  }
  parseOS() {
    this.parsedResult.os = {};
    const os = Utils.find(osParsersList, (_os) => {
      if (typeof _os.test === "function") {
        return _os.test(this);
      }
      if (_os.test instanceof Array) {
        return _os.test.some((condition) => this.test(condition));
      }
      throw new Error("Browser's test function is not valid");
    });
    if (os) {
      this.parsedResult.os = os.describe(this.getUA());
    }
    return this.parsedResult.os;
  }
  getOSName(toLowerCase) {
    const { name } = this.getOS();
    if (toLowerCase) {
      return String(name).toLowerCase() || "";
    }
    return name || "";
  }
  getOSVersion() {
    return this.getOS().version;
  }
  getPlatform() {
    if (this.parsedResult.platform) {
      return this.parsedResult.platform;
    }
    return this.parsePlatform();
  }
  getPlatformType(toLowerCase = false) {
    const { type } = this.getPlatform();
    if (toLowerCase) {
      return String(type).toLowerCase() || "";
    }
    return type || "";
  }
  parsePlatform() {
    this.parsedResult.platform = {};
    const platform = Utils.find(platformParsersList, (_platform) => {
      if (typeof _platform.test === "function") {
        return _platform.test(this);
      }
      if (_platform.test instanceof Array) {
        return _platform.test.some((condition) => this.test(condition));
      }
      throw new Error("Browser's test function is not valid");
    });
    if (platform) {
      this.parsedResult.platform = platform.describe(this.getUA());
    }
    return this.parsedResult.platform;
  }
  getEngine() {
    if (this.parsedResult.engine) {
      return this.parsedResult.engine;
    }
    return this.parseEngine();
  }
  getEngineName(toLowerCase) {
    if (toLowerCase) {
      return String(this.getEngine().name).toLowerCase() || "";
    }
    return this.getEngine().name || "";
  }
  parseEngine() {
    this.parsedResult.engine = {};
    const engine = Utils.find(enginesParsersList, (_engine) => {
      if (typeof _engine.test === "function") {
        return _engine.test(this);
      }
      if (_engine.test instanceof Array) {
        return _engine.test.some((condition) => this.test(condition));
      }
      throw new Error("Browser's test function is not valid");
    });
    if (engine) {
      this.parsedResult.engine = engine.describe(this.getUA());
    }
    return this.parsedResult.engine;
  }
  parse() {
    this.parseBrowser();
    this.parseOS();
    this.parsePlatform();
    this.parseEngine();
    return this;
  }
  getResult() {
    return Utils.assign({}, this.parsedResult);
  }
  satisfies(checkTree) {
    const platformsAndOSes = {};
    let platformsAndOSCounter = 0;
    const browsers = {};
    let browsersCounter = 0;
    const allDefinitions = Object.keys(checkTree);
    allDefinitions.forEach((key) => {
      const currentDefinition = checkTree[key];
      if (typeof currentDefinition === "string") {
        browsers[key] = currentDefinition;
        browsersCounter += 1;
      } else if (typeof currentDefinition === "object") {
        platformsAndOSes[key] = currentDefinition;
        platformsAndOSCounter += 1;
      }
    });
    if (platformsAndOSCounter > 0) {
      const platformsAndOSNames = Object.keys(platformsAndOSes);
      const OSMatchingDefinition = Utils.find(platformsAndOSNames, (name) => this.isOS(name));
      if (OSMatchingDefinition) {
        const osResult = this.satisfies(platformsAndOSes[OSMatchingDefinition]);
        if (osResult !== void 0) {
          return osResult;
        }
      }
      const platformMatchingDefinition = Utils.find(platformsAndOSNames, (name) => this.isPlatform(name));
      if (platformMatchingDefinition) {
        const platformResult = this.satisfies(platformsAndOSes[platformMatchingDefinition]);
        if (platformResult !== void 0) {
          return platformResult;
        }
      }
    }
    if (browsersCounter > 0) {
      const browserNames = Object.keys(browsers);
      const matchingDefinition = Utils.find(browserNames, (name) => this.isBrowser(name, true));
      if (matchingDefinition !== void 0) {
        return this.compareVersion(browsers[matchingDefinition]);
      }
    }
    return void 0;
  }
  isBrowser(browserName, includingAlias = false) {
    const defaultBrowserName = this.getBrowserName().toLowerCase();
    let browserNameLower = browserName.toLowerCase();
    const alias = Utils.getBrowserTypeByAlias(browserNameLower);
    if (includingAlias && alias) {
      browserNameLower = alias.toLowerCase();
    }
    return browserNameLower === defaultBrowserName;
  }
  compareVersion(version) {
    let expectedResults = [0];
    let comparableVersion = version;
    let isLoose = false;
    const currentBrowserVersion = this.getBrowserVersion();
    if (typeof currentBrowserVersion !== "string") {
      return void 0;
    }
    if (version[0] === ">" || version[0] === "<") {
      comparableVersion = version.substr(1);
      if (version[1] === "=") {
        isLoose = true;
        comparableVersion = version.substr(2);
      } else {
        expectedResults = [];
      }
      if (version[0] === ">") {
        expectedResults.push(1);
      } else {
        expectedResults.push(-1);
      }
    } else if (version[0] === "=") {
      comparableVersion = version.substr(1);
    } else if (version[0] === "~") {
      isLoose = true;
      comparableVersion = version.substr(1);
    }
    return expectedResults.indexOf(Utils.compareVersions(currentBrowserVersion, comparableVersion, isLoose)) > -1;
  }
  isOS(osName) {
    return this.getOSName(true) === String(osName).toLowerCase();
  }
  isPlatform(platformType) {
    return this.getPlatformType(true) === String(platformType).toLowerCase();
  }
  isEngine(engineName) {
    return this.getEngineName(true) === String(engineName).toLowerCase();
  }
  is(anything, includingAlias = false) {
    return this.isBrowser(anything, includingAlias) || this.isOS(anything) || this.isPlatform(anything);
  }
  some(anythings = []) {
    return anythings.some((anything) => this.is(anything));
  }
}
/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2019
 */
class Bowser {
  static getParser(UA, skipParsing = false) {
    if (typeof UA !== "string") {
      throw new Error("UserAgent should be a string");
    }
    return new Parser(UA, skipParsing);
  }
  static parse(UA) {
    return new Parser(UA).getResult();
  }
  static get BROWSER_MAP() {
    return BROWSER_MAP;
  }
  static get ENGINE_MAP() {
    return ENGINE_MAP;
  }
  static get OS_MAP() {
    return OS_MAP;
  }
  static get PLATFORMS_MAP() {
    return PLATFORMS_MAP;
  }
}
const browser$1 = Bowser.getParser(window.navigator.userAgent).parsedResult;
const isWin = browser$1.os.name === "Windows";
const isSafari = browser$1.browser.name === "Safari";
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
class Shape$1 {
  constructor(group) {
    this.group = group.addGroup();
    this.zIndex = 0;
  }
  Rect(name, attrs, rest = {}) {
    return this.group.addShape("rect", __spreadValues({
      name,
      attrs,
      zIndex: this.zIndex
    }, rest));
  }
  Circle(name, attrs, rest = {}) {
    return this.group.addShape("circle", {
      name,
      attrs,
      zIndex: this.zIndex
    });
  }
  Image(name, attrs, rest = {}) {
    return this.group.addShape("image", __spreadValues({
      name,
      attrs,
      zIndex: this.zIndex
    }, rest));
  }
  Text(name, attrs, maxWidth, rest = {}) {
    const { text: text2 } = attrs;
    let renderItems = [];
    const itemAttrs = Object.assign({}, defaultTextStyle, attrs);
    const x = itemAttrs.x || 0;
    let y = 0;
    const originy = y = (itemAttrs.y || 0) + (itemAttrs.lineHeight - itemAttrs.fontSize) / 2;
    splitText(text2).forEach((item, index, arr) => {
      const textWidth = measureTextWidth(renderItems.join("") + item, itemAttrs);
      const textIndent = attrs.textIndent || 0;
      let isFirstLine = y === originy;
      if (textWidth + (isFirstLine ? textIndent : 0) > maxWidth) {
        this.group.addShape("text", __spreadValues({
          name,
          attrs: Object.assign({}, itemAttrs, {
            x: isFirstLine ? x + textIndent : x,
            y,
            text: renderItems.join("")
          }),
          zIndex: this.zIndex
        }, rest));
        renderItems = [item];
        y += itemAttrs.lineHeight;
        isFirstLine = false;
      } else {
        renderItems.push(item);
      }
      if (index === arr.length - 1) {
        this.group.addShape("text", __spreadValues({
          name,
          attrs: Object.assign({}, itemAttrs, {
            x: isFirstLine ? x + textIndent : x,
            y,
            text: renderItems.join("")
          }),
          zIndex: this.zIndex
        }, rest));
      }
    });
  }
  sync(cb) {
    cb(this);
  }
  inner() {
    this.group = this.group.addGroup();
    this.zIndex++;
  }
}
const diffY$1 = isSafari ? -3 : isWin ? 2 : 0;
function drawHandleBtn(group, cfg, type) {
  const {
    style: { width, height, opacity = 1, beforeWidth },
    _children
  } = cfg;
  const isExpand = type === "expand";
  const visible = isExpand ? true : false;
  const textColor2 = isExpand ? themeColor.value : fontColor_root.value;
  const text2 = {
    add: "+",
    collapse: "-",
    expand: _children.length + "" || "0"
  }[type];
  const lineStyle = isExpand ? {
    x: beforeWidth + width,
    y: height / 2,
    width: 10,
    height: 2,
    fill: themeColor.value,
    opacity
  } : {
    x: beforeWidth + width,
    y: 0,
    width: 20,
    height,
    fill: "transparent",
    opacity
  };
  const textStyle = {
    text: text2,
    fill: textColor2,
    cursor: "pointer",
    opacity,
    fontSize: isExpand ? 10 : 14,
    lineHeight: 18
  };
  const fill = isExpand ? "transparent" : themeColor.value;
  const stroke = isExpand ? themeColor.value : "transparent";
  const { width: textWidth, height: textHeight } = getTextWrapHeight(text2, textStyle);
  const startX = width + (isExpand ? lineStyle.width : 3);
  const startY = height / 2 - textHeight / 2;
  const size = textWidth + 5;
  const BgStyle = {
    x: beforeWidth + startX,
    y: startY,
    radius: 9,
    width: size < textHeight ? textHeight : size,
    height: textHeight,
    fill,
    stroke,
    cursor: "pointer",
    opacity
  };
  const container = group.addGroup({
    name: type,
    visible,
    capture: true,
    action: type
  });
  const newNode = new Shape$1(container);
  newNode.Rect("line", lineStyle, { action: type });
  newNode.Rect("action-bg", BgStyle, { action: type });
  const diffY2 = !isExpand ? -1 : 0;
  newNode.Text("action-text", __spreadValues({
    x: beforeWidth + startX + size / 2 + (size < textHeight ? (textHeight - size) / 2 : 0),
    y: startY + diffY$1 + diffY2,
    textAlign: "center"
  }, textStyle), 400, { action: type });
}
function getAttribute(cfg) {
  const {
    style: {
      width,
      height,
      nameHeight,
      fontSize,
      descFontSize,
      descHeight,
      FillColor,
      FontColor,
      opacity = 1,
      stroke,
      strokeColor,
      imageIconWidth,
      fontWeight,
      descFontWeight,
      beforeWidth,
      afterWidth
    }
  } = cfg;
  const ContainerStyle = {
    width: width + beforeWidth + afterWidth,
    height,
    fill: "transparent",
    stroke: "transparent",
    lineWidth: 0
  };
  const RectStyle = {
    x: beforeWidth,
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
    x: beforeWidth + paddingH,
    y: diffY$1 + (isWin ? -1 : 0),
    text: cfg == null ? void 0 : cfg.label,
    fill: FontColor,
    fontSize,
    cursor: "pointer",
    fontWeight,
    opacity,
    textIndent: imageIconWidth
  };
  const IconStyle = {
    x: beforeWidth + paddingH,
    opacity,
    img: cfg.iconPath,
    width: imageIconWidth,
    height: imageIconWidth
  };
  const DescWrapper = {
    x: beforeWidth,
    y: nameHeight,
    width,
    height: descHeight,
    radius: [0, 0, radius, radius],
    fill: descHeight ? "rgba(255,255,255,0.3)" : "transparent",
    cursor: "pointer",
    stroke: "transparent",
    lineWidth: 2,
    opacity
  };
  const DescText = {
    x: beforeWidth + paddingH,
    y: nameHeight,
    text: cfg == null ? void 0 : cfg.desc,
    fill: FontColor,
    fontSize: descFontSize,
    fontWeight: descFontWeight,
    cursor: "pointer",
    opacity
  };
  return { ContainerStyle, RectStyle, TextStyle, DescWrapper, DescText, IconStyle };
}
const getNode = (group, name) => group.findAllByName(name)[0];
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
  let wrapper = getWrapper(group);
  wrapper == null ? void 0 : wrapper.attr("stroke", state ? activeStrokeColor.value : "transparent");
}
registerNode("mindmap-node", {
  options: {},
  shapeType: "mindmap-node",
  labelPosition: "center",
  draw(cfg, group) {
    const visible = cfg.style.visible;
    const newNode = new Shape$1(group);
    if (!visible) {
      const shape = newNode.Rect("wrapper", {
        width: 0,
        height: 0,
        fill: "transparent"
      });
      return shape;
    }
    const { ContainerStyle, RectStyle, TextStyle, DescWrapper, DescText, IconStyle } = getAttribute(cfg);
    const maxNodeWidth = cfg.style.maxWidth;
    const { depth, collapse: collapse2 } = cfg;
    const rest = { draggable: depth > 0 };
    const keyShape = newNode.Rect("container", ContainerStyle, rest);
    newNode.Rect("wrapper", RectStyle, rest);
    newNode.inner();
    newNode.Image("icon", IconStyle, rest);
    newNode.Text("title", TextStyle, maxNodeWidth, rest);
    newNode.inner();
    newNode.Rect("desc-wrapper", DescWrapper, rest);
    newNode.Text("desc", DescText, maxNodeWidth, rest);
    drawHandleBtn(group, cfg, "add");
    if (cfg.children.length > 0 || cfg._children.length > 0) {
      drawHandleBtn(group, cfg, collapse2 ? "expand" : "collapse");
    }
    return keyShape;
  },
  getAnchorPoints(cfg) {
    return [
      [1, 0.5],
      [0, 0.5]
    ];
  },
  setState(name, state, node) {
    if (name === "hover")
      handleNodeHover(state, node);
    if (name === "selected")
      handleNodeSelected(state, node);
  }
});
var behaviorOption = {
  getDefaultCfg: function getDefaultCfg() {
    return {};
  },
  getEvents: function getEvents() {
    return {};
  },
  updateCfg: function updateCfg(cfg) {
    Object.assign(this, cfg);
    return true;
  },
  shouldBegin: function shouldBegin() {
    return true;
  },
  shouldUpdate: function shouldUpdate() {
    return true;
  },
  shouldEnd: function shouldEnd() {
    return true;
  },
  bind: function bind(graph) {
    var _this = this;
    var events = this.events;
    this.graph = graph;
    if (this.type === "drag-canvas" || this.type === "brush-select" || this.type === "lasso-select") {
      graph.get("canvas").set("draggable", true);
    }
    each(events, function(handler, event) {
      graph.on(event, handler);
    });
    document.addEventListener("visibilitychange", function() {
      _this.keydown = false;
    });
  },
  unbind: function unbind(graph) {
    var events = this.events;
    var draggable = graph.get("canvas").get("draggable");
    if (this.type === "drag-canvas" || this.type === "brush-select" || this.type === "lasso-select") {
      graph.get("canvas").set("draggable", false);
    }
    each(events, function(handler, event) {
      graph.off(event, handler);
    });
    graph.get("canvas").set("draggable", draggable);
  },
  get: function get2(val) {
    return this[val];
  },
  set: function set(key, val) {
    this[key] = val;
    return this;
  }
};
var Behavior = function() {
  function Behavior2() {
  }
  Behavior2.registerBehavior = function(type, behavior) {
    if (!behavior) {
      throw new Error("please specify handler for this behavior: ".concat(type));
    }
    var prototype = clone$1(behaviorOption);
    Object.assign(prototype, behavior);
    var base = function base2(cfg) {
      var _this = this;
      Object.assign(this, this.getDefaultCfg(), cfg);
      var events = this.getEvents();
      this.events = null;
      var eventsToBind = {};
      if (events) {
        each(events, function(handle, event) {
          eventsToBind[event] = wrapBehavior(_this, handle);
        });
        this.events = eventsToBind;
      }
    };
    base.prototype = prototype;
    Behavior2.types[type] = base;
  };
  Behavior2.hasBehavior = function(type) {
    return !!Behavior2.types[type];
  };
  Behavior2.getBehavior = function(type) {
    return Behavior2.types[type];
  };
  Behavior2.types = {};
  return Behavior2;
}();
var WILDCARD$1 = "*";
var EventEmitter = function() {
  function EventEmitter2() {
    this._events = {};
  }
  EventEmitter2.prototype.on = function(evt, callback, once) {
    if (!this._events[evt]) {
      this._events[evt] = [];
    }
    this._events[evt].push({
      callback,
      once: !!once
    });
    return this;
  };
  EventEmitter2.prototype.once = function(evt, callback) {
    return this.on(evt, callback, true);
  };
  EventEmitter2.prototype.emit = function(evt) {
    var _this = this;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    var events = this._events[evt] || [];
    var wildcardEvents = this._events[WILDCARD$1] || [];
    var doEmit = function(es) {
      var length = es.length;
      for (var i = 0; i < length; i++) {
        if (!es[i]) {
          continue;
        }
        var _a = es[i], callback = _a.callback, once = _a.once;
        if (once) {
          es.splice(i, 1);
          if (es.length === 0) {
            delete _this._events[evt];
          }
          length--;
          i--;
        }
        callback.apply(_this, args);
      }
    };
    doEmit(events);
    doEmit(wildcardEvents);
  };
  EventEmitter2.prototype.off = function(evt, callback) {
    if (!evt) {
      this._events = {};
    } else {
      if (!callback) {
        delete this._events[evt];
      } else {
        var events = this._events[evt] || [];
        var length_1 = events.length;
        for (var i = 0; i < length_1; i++) {
          if (events[i].callback === callback) {
            events.splice(i, 1);
            length_1--;
            i--;
          }
        }
        if (events.length === 0) {
          delete this._events[evt];
        }
      }
    }
    return this;
  };
  EventEmitter2.prototype.getEvents = function() {
    return this._events;
  };
  return EventEmitter2;
}();
var EPSILON$1 = 1e-6;
var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
if (!Math.hypot)
  Math.hypot = function() {
    var y = 0, i = arguments.length;
    while (i--) {
      y += arguments[i] * arguments[i];
    }
    return Math.sqrt(y);
  };
function create$2() {
  var out = new ARRAY_TYPE(9);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }
  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
function clone(a) {
  var out = new ARRAY_TYPE(9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function copy$1(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new ARRAY_TYPE(9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
function set2(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function transpose(out, a) {
  if (out === a) {
    var a01 = a[1], a02 = a[2], a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }
  return out;
}
function invert$1(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20;
  var det = a00 * b01 + a01 * b11 + a02 * b21;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
function adjoint(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}
function determinant(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
function multiply(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  var b00 = b[0], b01 = b[1], b02 = b[2];
  var b10 = b[3], b11 = b[4], b12 = b[5];
  var b20 = b[6], b21 = b[7], b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
function translate$1(out, a, v) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
function rotate$2(out, a, rad) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
function scale$2(out, a, v) {
  var x = v[0], y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}
function fromRotation(out, rad) {
  var s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = -s;
  out[4] = c;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;
  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;
  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}
function fromQuat(out, q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
function normalFromMat4(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
function str(a) {
  return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
}
function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
}
function add$1(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
function subtract$1(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
function multiplyScalarAndAdd(out, a, b, scale3) {
  out[0] = a[0] + b[0] * scale3;
  out[1] = a[1] + b[1] * scale3;
  out[2] = a[2] + b[2] * scale3;
  out[3] = a[3] + b[3] * scale3;
  out[4] = a[4] + b[4] * scale3;
  out[5] = a[5] + b[5] * scale3;
  out[6] = a[6] + b[6] * scale3;
  out[7] = a[7] + b[7] * scale3;
  out[8] = a[8] + b[8] * scale3;
  return out;
}
function exactEquals$1(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}
function equals(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
  var b02 = b[0], b12 = b[1], b22 = b[2], b32 = b[3], b42 = b[4], b52 = b[5], b62 = b[6], b72 = b[7], b82 = b[8];
  return Math.abs(a0 - b02) <= EPSILON$1 * Math.max(1, Math.abs(a0), Math.abs(b02)) && Math.abs(a1 - b12) <= EPSILON$1 * Math.max(1, Math.abs(a1), Math.abs(b12)) && Math.abs(a2 - b22) <= EPSILON$1 * Math.max(1, Math.abs(a2), Math.abs(b22)) && Math.abs(a3 - b32) <= EPSILON$1 * Math.max(1, Math.abs(a3), Math.abs(b32)) && Math.abs(a4 - b42) <= EPSILON$1 * Math.max(1, Math.abs(a4), Math.abs(b42)) && Math.abs(a5 - b52) <= EPSILON$1 * Math.max(1, Math.abs(a5), Math.abs(b52)) && Math.abs(a6 - b62) <= EPSILON$1 * Math.max(1, Math.abs(a6), Math.abs(b62)) && Math.abs(a7 - b72) <= EPSILON$1 * Math.max(1, Math.abs(a7), Math.abs(b72)) && Math.abs(a8 - b82) <= EPSILON$1 * Math.max(1, Math.abs(a8), Math.abs(b82));
}
var mul = multiply;
var sub$1 = subtract$1;
var mat3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  create: create$2,
  fromMat4,
  clone,
  copy: copy$1,
  fromValues,
  set: set2,
  identity,
  transpose,
  invert: invert$1,
  adjoint,
  determinant,
  multiply,
  translate: translate$1,
  rotate: rotate$2,
  scale: scale$2,
  fromTranslation,
  fromRotation,
  fromScaling,
  fromMat2d,
  fromQuat,
  normalFromMat4,
  projection,
  str,
  frob,
  add: add$1,
  subtract: subtract$1,
  multiplyScalar,
  multiplyScalarAndAdd,
  exactEquals: exactEquals$1,
  equals,
  mul,
  sub: sub$1
}, Symbol.toStringTag, { value: "Module" }));
function create$1() {
  var out = new ARRAY_TYPE(3);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  return out;
}
function transformMat3(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
(function() {
  var vec = create$1();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 3;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }
    return a;
  };
})();
function create() {
  var out = new ARRAY_TYPE(2);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
function scale$1(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
function distance$3(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return Math.hypot(x, y);
}
function normalize(out, a) {
  var x = a[0], y = a[1];
  var len = x * x + y * y;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }
  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
var sub = subtract;
(function() {
  var vec = create();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 2;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }
    return a;
  };
})();
function leftTranslate(out, a, v) {
  var transMat = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  fromTranslation(transMat, v);
  return multiply(out, transMat, a);
}
function leftRotate(out, a, rad) {
  var rotateMat = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  fromRotation(rotateMat, rad);
  return multiply(out, rotateMat, a);
}
function leftScale(out, a, v) {
  var scaleMat = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  fromScaling(scaleMat, v);
  return multiply(out, scaleMat, a);
}
function leftMultiply(out, a, a1) {
  return multiply(out, a1, a);
}
function transform$5(m, actions) {
  var matrix = m ? [].concat(m) : [1, 0, 0, 0, 1, 0, 0, 0, 1];
  for (var i = 0, len = actions.length; i < len; i++) {
    var action = actions[i];
    switch (action[0]) {
      case "t":
        leftTranslate(matrix, matrix, [action[1], action[2]]);
        break;
      case "s":
        leftScale(matrix, matrix, [action[1], action[2]]);
        break;
      case "r":
        leftRotate(matrix, matrix, action[1]);
        break;
      case "m":
        leftMultiply(matrix, matrix, action[1]);
        break;
    }
  }
  return matrix;
}
var adjMatrix = function adjMatrix2(graphData, directed) {
  var nodes = graphData.nodes, edges = graphData.edges;
  var matrix = [];
  var nodeMap = {};
  if (!nodes) {
    throw new Error("invalid nodes data!");
  }
  if (nodes) {
    nodes.forEach(function(node, i) {
      nodeMap[node.id] = i;
      var row = [];
      matrix.push(row);
    });
  }
  if (edges) {
    edges.forEach(function(edge) {
      var source = edge.source, target = edge.target;
      var sIndex = nodeMap[source];
      var tIndex = nodeMap[target];
      if (!sIndex && sIndex !== 0 || !tIndex && tIndex !== 0)
        return;
      matrix[sIndex][tIndex] = 1;
      if (!directed) {
        matrix[tIndex][sIndex] = 1;
      }
    });
  }
  return matrix;
};
var defaultComparator = function defaultComparator2(a, b) {
  if (a === b) {
    return true;
  }
  return false;
};
var LinkedListNode = function() {
  function LinkedListNode2(value, next) {
    if (next === void 0) {
      next = null;
    }
    this.value = value;
    this.next = next;
  }
  LinkedListNode2.prototype.toString = function(callback) {
    return callback ? callback(this.value) : "".concat(this.value);
  };
  return LinkedListNode2;
}();
var LinkedList = function() {
  function LinkedList2(comparator) {
    if (comparator === void 0) {
      comparator = defaultComparator;
    }
    this.head = null;
    this.tail = null;
    this.compare = comparator;
  }
  LinkedList2.prototype.prepend = function(value) {
    var newNode = new LinkedListNode(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  };
  LinkedList2.prototype.append = function(value) {
    var newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  };
  LinkedList2.prototype.delete = function(value) {
    if (!this.head) {
      return null;
    }
    var deleteNode2 = null;
    while (this.head && this.compare(this.head.value, value)) {
      deleteNode2 = this.head;
      this.head = this.head.next;
    }
    var currentNode = this.head;
    if (currentNode !== null) {
      while (currentNode.next) {
        if (this.compare(currentNode.next.value, value)) {
          deleteNode2 = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }
    if (this.compare(this.tail.value, value)) {
      this.tail = currentNode;
    }
    return deleteNode2;
  };
  LinkedList2.prototype.find = function(_a) {
    var _b = _a.value, value = _b === void 0 ? void 0 : _b, _c = _a.callback, callback = _c === void 0 ? void 0 : _c;
    if (!this.head) {
      return null;
    }
    var currentNode = this.head;
    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }
      if (value !== void 0 && this.compare(currentNode.value, value)) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  };
  LinkedList2.prototype.deleteTail = function() {
    var deletedTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }
    var currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    this.tail = currentNode;
    return deletedTail;
  };
  LinkedList2.prototype.deleteHead = function() {
    if (!this.head) {
      return null;
    }
    var deletedHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deletedHead;
  };
  LinkedList2.prototype.fromArray = function(values2) {
    var _this = this;
    values2.forEach(function(value) {
      return _this.append(value);
    });
    return this;
  };
  LinkedList2.prototype.toArray = function() {
    var nodes = [];
    var currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  };
  LinkedList2.prototype.reverse = function() {
    var currentNode = this.head;
    var prevNode = null;
    var nextNode = null;
    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = prevNode;
      prevNode = currentNode;
      currentNode = nextNode;
    }
    this.tail = this.head;
    this.head = prevNode;
  };
  LinkedList2.prototype.toString = function(callback) {
    if (callback === void 0) {
      callback = void 0;
    }
    return this.toArray().map(function(node) {
      return node.toString(callback);
    }).toString();
  };
  return LinkedList2;
}();
var degree = function degree2(graphData) {
  var degrees = {};
  var _a = graphData.nodes, nodes = _a === void 0 ? [] : _a, _b = graphData.edges, edges = _b === void 0 ? [] : _b;
  nodes.forEach(function(node) {
    degrees[node.id] = {
      degree: 0,
      inDegree: 0,
      outDegree: 0
    };
  });
  edges.forEach(function(edge) {
    degrees[edge.source].degree++;
    degrees[edge.source].outDegree++;
    degrees[edge.target].degree++;
    degrees[edge.target].inDegree++;
  });
  return degrees;
};
var floydWarshall$1 = function floydWarshall(graphData, directed) {
  var adjacentMatrix = adjMatrix(graphData, directed);
  var dist = [];
  var size = adjacentMatrix.length;
  for (var i = 0; i < size; i += 1) {
    dist[i] = [];
    for (var j = 0; j < size; j += 1) {
      if (i === j) {
        dist[i][j] = 0;
      } else if (adjacentMatrix[i][j] === 0 || !adjacentMatrix[i][j]) {
        dist[i][j] = Infinity;
      } else {
        dist[i][j] = adjacentMatrix[i][j];
      }
    }
  }
  for (var k = 0; k < size; k += 1) {
    for (var i = 0; i < size; i += 1) {
      for (var j = 0; j < size; j += 1) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
};
var DistanceType;
(function(DistanceType2) {
  DistanceType2["EuclideanDistance"] = "euclideanDistance";
})(DistanceType || (DistanceType = {}));
var Stack = function() {
  function Stack2(maxStep) {
    if (maxStep === void 0) {
      maxStep = 10;
    }
    this.linkedList = new LinkedList();
    this.maxStep = maxStep;
  }
  Object.defineProperty(Stack2.prototype, "length", {
    get: function get3() {
      return this.linkedList.toArray().length;
    },
    enumerable: false,
    configurable: true
  });
  Stack2.prototype.isEmpty = function() {
    return !this.linkedList.head;
  };
  Stack2.prototype.isMaxStack = function() {
    return this.toArray().length >= this.maxStep;
  };
  Stack2.prototype.peek = function() {
    if (this.isEmpty()) {
      return null;
    }
    return this.linkedList.head.value;
  };
  Stack2.prototype.push = function(value) {
    this.linkedList.prepend(value);
    if (this.length > this.maxStep) {
      this.linkedList.deleteTail();
    }
  };
  Stack2.prototype.pop = function() {
    var removeHead = this.linkedList.deleteHead();
    return removeHead ? removeHead.value : null;
  };
  Stack2.prototype.toArray = function() {
    return this.linkedList.toArray().map(function(node) {
      return node.value;
    });
  };
  Stack2.prototype.clear = function() {
    while (!this.isEmpty()) {
      this.pop();
    }
  };
  return Stack2;
}();
var transform$4 = transform$5;
var compare = function compare2(attributeName) {
  return function(m, n) {
    return m[attributeName] - n[attributeName];
  };
};
var isBetween = function isBetween2(value, min2, max2) {
  return value >= min2 && value <= max2;
};
var getLineIntersect = function getLineIntersect2(p0, p1, p2, p3) {
  var tolerance = 1e-4;
  var E = {
    x: p2.x - p0.x,
    y: p2.y - p0.y
  };
  var D0 = {
    x: p1.x - p0.x,
    y: p1.y - p0.y
  };
  var D1 = {
    x: p3.x - p2.x,
    y: p3.y - p2.y
  };
  var kross = D0.x * D1.y - D0.y * D1.x;
  var sqrKross = kross * kross;
  var invertKross = 1 / kross;
  var sqrLen0 = D0.x * D0.x + D0.y * D0.y;
  var sqrLen1 = D1.x * D1.x + D1.y * D1.y;
  if (sqrKross > tolerance * sqrLen0 * sqrLen1) {
    var s = (E.x * D1.y - E.y * D1.x) * invertKross;
    var t = (E.x * D0.y - E.y * D0.x) * invertKross;
    if (!isBetween(s, 0, 1) || !isBetween(t, 0, 1))
      return null;
    return {
      x: p0.x + s * D0.x,
      y: p0.y + s * D0.y
    };
  }
  return null;
};
var getRectIntersectByPoint = function getRectIntersectByPoint2(rect2, point) {
  var x = rect2.x, y = rect2.y, width = rect2.width, height = rect2.height;
  var cx = x + width / 2;
  var cy = y + height / 2;
  var points = [];
  var center = {
    x: cx,
    y: cy
  };
  points.push({
    x,
    y
  });
  points.push({
    x: x + width,
    y
  });
  points.push({
    x: x + width,
    y: y + height
  });
  points.push({
    x,
    y: y + height
  });
  points.push({
    x,
    y
  });
  var rst = null;
  for (var i = 1; i < points.length; i++) {
    rst = getLineIntersect(points[i - 1], points[i], center, point);
    if (rst) {
      break;
    }
  }
  return rst;
};
var getCircleIntersectByPoint = function getCircleIntersectByPoint2(circle2, point) {
  var cx = circle2.x, cy = circle2.y, r = circle2.r;
  var x = point.x, y = point.y;
  var dx = x - cx;
  var dy = y - cy;
  if (dx * dx + dy * dy < r * r) {
    return null;
  }
  var angle = Math.atan(dy / dx);
  return {
    x: cx + Math.abs(r * Math.cos(angle)) * Math.sign(dx),
    y: cy + Math.abs(r * Math.sin(angle)) * Math.sign(dy)
  };
};
var getEllipseIntersectByPoint = function getEllipseIntersectByPoint2(ellipse2, point) {
  var a = ellipse2.rx;
  var b = ellipse2.ry;
  var cx = ellipse2.x;
  var cy = ellipse2.y;
  var dx = point.x - cx;
  var dy = point.y - cy;
  var angle = Math.atan2(dy / b, dx / a);
  if (angle < 0) {
    angle += 2 * Math.PI;
  }
  return {
    x: cx + a * Math.cos(angle),
    y: cy + b * Math.sin(angle)
  };
};
var applyMatrix = function applyMatrix2(point, matrix, tag) {
  if (tag === void 0) {
    tag = 1;
  }
  var vector = [point.x, point.y, tag];
  if (!matrix || isNaN(matrix[0])) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }
  transformMat3(vector, vector, matrix);
  return {
    x: vector[0],
    y: vector[1]
  };
};
var invertMatrix = function invertMatrix2(point, matrix, tag) {
  if (tag === void 0) {
    tag = 1;
  }
  if (!matrix || isNaN(matrix[0])) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }
  var inversedMatrix = invert$1([1, 0, 0, 0, 1, 0, 0, 0, 1], matrix);
  if (!inversedMatrix) {
    inversedMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }
  var vector = [point.x, point.y, tag];
  transformMat3(vector, vector, inversedMatrix);
  return {
    x: vector[0],
    y: vector[1]
  };
};
var getCircleCenterByPoints = function getCircleCenterByPoints2(p1, p2, p3) {
  var a = p1.x - p2.x;
  var b = p1.y - p2.y;
  var c = p1.x - p3.x;
  var d = p1.y - p3.y;
  var e = (p1.x * p1.x - p2.x * p2.x - p2.y * p2.y + p1.y * p1.y) / 2;
  var f = (p1.x * p1.x - p3.x * p3.x - p3.y * p3.y + p1.y * p1.y) / 2;
  var denominator = b * c - a * d;
  return {
    x: -(d * e - b * f) / denominator,
    y: -(a * f - c * e) / denominator
  };
};
var distance$2 = function distance(p1, p2) {
  var vx = p1.x - p2.x;
  var vy = p1.y - p2.y;
  return Math.sqrt(vx * vx + vy * vy);
};
var scaleMatrix = function scaleMatrix2(matrix, ratio) {
  var result = [];
  matrix.forEach(function(row) {
    var newRow = [];
    row.forEach(function(v) {
      newRow.push(v * ratio);
    });
    result.push(newRow);
  });
  return result;
};
var floydWarshall2 = function floydWarshall3(adjMatrix3) {
  var dist = [];
  var size = adjMatrix3.length;
  for (var i = 0; i < size; i += 1) {
    dist[i] = [];
    for (var j = 0; j < size; j += 1) {
      if (i === j) {
        dist[i][j] = 0;
      } else if (adjMatrix3[i][j] === 0 || !adjMatrix3[i][j]) {
        dist[i][j] = Infinity;
      } else {
        dist[i][j] = adjMatrix3[i][j];
      }
    }
  }
  for (var k = 0; k < size; k += 1) {
    for (var i = 0; i < size; i += 1) {
      for (var j = 0; j < size; j += 1) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
};
var getAdjMatrix = function getAdjMatrix2(data, directed) {
  var nodes = data.nodes, edges = data.edges;
  var matrix = [];
  var nodeMap = {};
  if (!nodes) {
    throw new Error("invalid nodes data!");
  }
  if (nodes) {
    nodes.forEach(function(node, i) {
      nodeMap[node.id] = i;
      var row = [];
      matrix.push(row);
    });
  }
  if (edges) {
    edges.forEach(function(e) {
      var source = e.source, target = e.target;
      var sIndex = nodeMap[source];
      var tIndex = nodeMap[target];
      matrix[sIndex][tIndex] = 1;
      if (!directed) {
        matrix[tIndex][sIndex] = 1;
      }
    });
  }
  return matrix;
};
var translate = function translate2(group, vec) {
  group.translate(vec.x, vec.y);
};
var move = function move2(group, point, animate, animateCfg) {
  if (animateCfg === void 0) {
    animateCfg = {
      duration: 500
    };
  }
  var matrix = group.getMatrix();
  if (!matrix) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }
  var bbox = group.getCanvasBBox();
  var vx = point.x - bbox.minX;
  var vy = point.y - bbox.minY;
  if (animate) {
    var dx_1 = vx * matrix[0];
    var dy_1 = vy * matrix[4];
    var lastX_1 = 0;
    var lastY_1 = 0;
    var newX_1 = 0;
    var newY_1 = 0;
    group.animate(function(ratio) {
      newX_1 = dx_1 * ratio;
      newY_1 = dy_1 * ratio;
      matrix = transform$4(matrix, [["t", newX_1 - lastX_1, newY_1 - lastY_1]]);
      lastX_1 = newX_1;
      lastY_1 = newY_1;
      return {
        matrix
      };
    }, animateCfg);
  } else {
    var movedMatrix = transform$4(matrix, [["t", vx, vy]]);
    group.setMatrix(movedMatrix);
  }
};
var scale = function scale2(group, ratio) {
  var matrix = group.getMatrix();
  if (!matrix) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }
  var scaleXY = ratio;
  if (!isArray$1(ratio)) {
    scaleXY = [ratio, ratio];
  }
  if (isArray$1(ratio) && ratio.length === 1) {
    scaleXY = [ratio[0], ratio[0]];
  }
  matrix = transform$4(matrix, [["s", scaleXY[0], scaleXY[1]]]);
  group.setMatrix(matrix);
};
var rotate$1 = function rotate(group, angle) {
  var matrix = group.getMatrix();
  if (!matrix) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }
  matrix = transform$4(matrix, [["r", angle]]);
  group.setMatrix(matrix);
};
var getDegree = function getDegree2(n, nodeIdxMap, edges) {
  var degrees = [];
  for (var i = 0; i < n; i++) {
    degrees[i] = 0;
  }
  edges.forEach(function(e) {
    if (e.source) {
      degrees[nodeIdxMap[e.source]] += 1;
    }
    if (e.target) {
      degrees[nodeIdxMap[e.target]] += 1;
    }
  });
  return degrees;
};
function onSegment(p1, p2, q) {
  if ((q[0] - p1[0]) * (p2[1] - p1[1]) === (p2[0] - p1[0]) * (q[1] - p1[1]) && Math.min(p1[0], p2[0]) <= q[0] && q[0] <= Math.max(p1[0], p2[0]) && Math.min(p1[1], p2[1]) <= q[1] && q[1] <= Math.max(p1[1], p2[1])) {
    return true;
  }
  return false;
}
var isPointInPolygon = function isPointInPolygon2(points, x, y) {
  var isHit = false;
  var n = points.length;
  var tolerance = 1e-6;
  function dcmp(xValue) {
    if (Math.abs(xValue) < tolerance) {
      return 0;
    }
    return xValue < 0 ? -1 : 1;
  }
  if (n <= 2) {
    return false;
  }
  for (var i = 0; i < n; i++) {
    var p1 = points[i];
    var p2 = points[(i + 1) % n];
    if (onSegment(p1, p2, [x, y])) {
      return true;
    }
    if (dcmp(p1[1] - y) > 0 !== dcmp(p2[1] - y) > 0 && dcmp(x - (y - p1[1]) * (p1[0] - p2[0]) / (p1[1] - p2[1]) - p1[0]) < 0) {
      isHit = !isHit;
    }
  }
  return isHit;
};
var intersectBBox = function intersectBBox2(box1, box2) {
  return !(box2.minX > box1.maxX || box2.maxX < box1.minX || box2.minY > box1.maxY || box2.maxY < box1.minY);
};
var lineIntersectPolygon = function lineIntersectPolygon2(lines, line2) {
  var isIntersect = false;
  each(lines, function(l) {
    if (getLineIntersect(l.from, l.to, line2.from, line2.to)) {
      isIntersect = true;
      return false;
    }
  });
  return isIntersect;
};
var isPolygonsIntersect = function isPolygonsIntersect2(points1, points2) {
  var getBBox3 = function getBBox4(points) {
    var xArr = points.map(function(p) {
      return p[0];
    });
    var yArr = points.map(function(p) {
      return p[1];
    });
    return {
      minX: Math.min.apply(null, xArr),
      maxX: Math.max.apply(null, xArr),
      minY: Math.min.apply(null, yArr),
      maxY: Math.max.apply(null, yArr)
    };
  };
  var parseToLines = function parseToLines2(points) {
    var lines = [];
    var count = points.length;
    for (var i = 0; i < count - 1; i++) {
      var point = points[i];
      var next = points[i + 1];
      lines.push({
        from: {
          x: point[0],
          y: point[1]
        },
        to: {
          x: next[0],
          y: next[1]
        }
      });
    }
    if (lines.length > 1) {
      var first = points[0];
      var last = points[count - 1];
      lines.push({
        from: {
          x: last[0],
          y: last[1]
        },
        to: {
          x: first[0],
          y: first[1]
        }
      });
    }
    return lines;
  };
  if (points1.length < 2 || points2.length < 2) {
    return false;
  }
  var bbox1 = getBBox3(points1);
  var bbox2 = getBBox3(points2);
  if (!intersectBBox(bbox1, bbox2)) {
    return false;
  }
  var isIn = false;
  each(points2, function(point) {
    if (isPointInPolygon(points1, point[0], point[1])) {
      isIn = true;
      return false;
    }
  });
  if (isIn) {
    return true;
  }
  each(points1, function(point) {
    if (isPointInPolygon(points2, point[0], point[1])) {
      isIn = true;
      return false;
    }
  });
  if (isIn) {
    return true;
  }
  var lines1 = parseToLines(points1);
  var lines2 = parseToLines(points2);
  var isIntersect = false;
  each(lines2, function(line2) {
    if (lineIntersectPolygon(lines1, line2)) {
      isIntersect = true;
      return false;
    }
  });
  return isIntersect;
};
var Line = function() {
  function Line2(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  Line2.prototype.getBBox = function() {
    var minX = Math.min(this.x1, this.x2);
    var minY = Math.min(this.y1, this.y2);
    var maxX = Math.max(this.x1, this.x2);
    var maxY = Math.max(this.y1, this.y2);
    var res = {
      x: minX,
      y: minY,
      minX,
      minY,
      maxX,
      maxY,
      width: maxX - minX,
      height: maxY - minY
    };
    return res;
  };
  return Line2;
}();
var getBBoxBoundLine = function getBBoxBoundLine2(bbox, direction) {
  var bounds = {
    top: [bbox.minX, bbox.minY, bbox.maxX, bbox.minY],
    left: [bbox.minX, bbox.minY, bbox.minX, bbox.maxY],
    bottom: [bbox.minX, bbox.maxY, bbox.maxX, bbox.maxY],
    right: [bbox.maxX, bbox.minY, bbox.maxX, bbox.maxY]
  };
  return bounds[direction];
};
var fractionAlongLineA = function fractionAlongLineA2(la, lb) {
  var uaT = (lb.x2 - lb.x1) * (la.y1 - lb.y1) - (lb.y2 - lb.y1) * (la.x1 - lb.x1);
  var ubT = (la.x2 - la.x1) * (la.y1 - lb.y1) - (la.y2 - la.y1) * (la.x1 - lb.x1);
  var uB = (lb.y2 - lb.y1) * (la.x2 - la.x1) - (lb.x2 - lb.x1) * (la.y2 - la.y1);
  if (uB) {
    var ua = uaT / uB;
    var ub = ubT / uB;
    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      return ua;
    }
  }
  return Number.POSITIVE_INFINITY;
};
var itemIntersectByLine = function itemIntersectByLine2(item, line2) {
  var directions = ["top", "left", "bottom", "right"];
  var bbox = item.getBBox();
  var countIntersections = 0;
  var intersections = [];
  for (var i = 0; i < 4; i++) {
    var _a = getBBoxBoundLine(bbox, directions[i]), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
    intersections[i] = getLineIntersect({
      x: line2.x1,
      y: line2.y1
    }, {
      x: line2.x2,
      y: line2.y2
    }, {
      x: x1,
      y: y1
    }, {
      x: x2,
      y: y2
    });
    if (intersections[i]) {
      countIntersections += 1;
    }
  }
  return [intersections, countIntersections];
};
var fractionToLine = function fractionToLine2(item, line2) {
  var directions = ["top", "left", "bottom", "right"];
  var bbox = item.getBBox();
  var minDistance = Number.POSITIVE_INFINITY;
  var countIntersections = 0;
  for (var i = 0; i < 4; i++) {
    var _a = getBBoxBoundLine(bbox, directions[i]), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
    var testDistance = fractionAlongLineA(line2, new Line(x1, y1, x2, y2));
    testDistance = Math.abs(testDistance - 0.5);
    if (testDistance >= 0 && testDistance <= 1) {
      countIntersections += 1;
      minDistance = testDistance < minDistance ? testDistance : minDistance;
    }
  }
  if (countIntersections === 0)
    return -1;
  return minDistance;
};
var getPointsCenter = function getPointsCenter2(points) {
  var centerX = 0;
  var centerY = 0;
  if (points.length > 0) {
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
      var point = points_1[_i];
      centerX += point.x;
      centerY += point.y;
    }
    centerX /= points.length;
    centerY /= points.length;
  }
  return {
    x: centerX,
    y: centerY
  };
};
var squareDist = function squareDist2(a, b) {
  return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
};
var pointLineSquareDist = function pointLineSquareDist2(point, line2) {
  var x1 = line2.x1;
  var y1 = line2.y1;
  var x2 = line2.x2 - x1;
  var y2 = line2.y2 - y1;
  var px = point.x - x1;
  var py = point.y - y1;
  var dotprod = px * x2 + py * y2;
  var projlenSq;
  if (dotprod <= 0) {
    projlenSq = 0;
  } else {
    px = x2 - px;
    py = y2 - py;
    dotprod = px * x2 + py * y2;
    if (dotprod <= 0) {
      projlenSq = 0;
    } else {
      projlenSq = dotprod * dotprod / (x2 * x2 + y2 * y2);
    }
  }
  var lenSq = px * px + py * py - projlenSq;
  if (lenSq < 0) {
    lenSq = 0;
  }
  return lenSq;
};
var isPointsOverlap = function isPointsOverlap2(p1, p2, e) {
  if (e === void 0) {
    e = 1e-3;
  }
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) < Math.pow(e, 2);
};
var pointRectSquareDist = function pointRectSquareDist2(point, rect2) {
  var isLeft = point.x < rect2.x;
  var isRight = point.x > rect2.x + rect2.width;
  var isTop = point.y > rect2.y + rect2.height;
  var isBottom = point.y < rect2.y;
  var isPointOutside = isLeft || isRight || isTop || isBottom;
  if (!isPointOutside) {
    return 0;
  }
  if (isTop && !isLeft && !isRight) {
    return Math.pow(rect2.y + rect2.height - point.y, 2);
  }
  if (isBottom && !isLeft && !isRight) {
    return Math.pow(point.y - rect2.y, 2);
  }
  if (isLeft && !isTop && !isBottom) {
    return Math.pow(rect2.x - point.x, 2);
  }
  if (isRight && !isTop && !isBottom) {
    return Math.pow(rect2.x + rect2.width - point.x, 2);
  }
  var dx = Math.min(Math.abs(rect2.x - point.x), Math.abs(rect2.x + rect2.width - point.x));
  var dy = Math.min(Math.abs(rect2.y - point.y), Math.abs(rect2.y + rect2.height - point.y));
  return dx * dx + dy * dy;
};
var pointLineDistance = function pointLineDistance2(line2, point) {
  var x1 = line2[0], y1 = line2[1], x2 = line2[2], y2 = line2[3];
  var x = point.x, y = point.y;
  var d = [x2 - x1, y2 - y1];
  if (exactEquals(d, [0, 0])) {
    return NaN;
  }
  var u = [-d[1], d[0]];
  normalize(u, u);
  var a = [x - x1, y - y1];
  return Math.abs(dot(a, u));
};
var lerp = function lerp2(start, end, alpha) {
  return start + (end - start) * alpha;
};
var MathUtil = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  compare,
  getLineIntersect,
  getRectIntersectByPoint,
  getCircleIntersectByPoint,
  getEllipseIntersectByPoint,
  applyMatrix,
  invertMatrix,
  getCircleCenterByPoints,
  distance: distance$2,
  scaleMatrix,
  floydWarshall: floydWarshall2,
  getAdjMatrix,
  translate,
  move,
  scale,
  rotate: rotate$1,
  getDegree,
  isPointInPolygon,
  intersectBBox,
  isPolygonsIntersect,
  Line,
  getBBoxBoundLine,
  itemIntersectByLine,
  fractionToLine,
  getPointsCenter,
  squareDist,
  pointLineSquareDist,
  isPointsOverlap,
  pointRectSquareDist,
  pointLineDistance,
  lerp
}, Symbol.toStringTag, { value: "Module" }));
var subjectColor = "rgb(95, 149, 255)";
var backColor = "rgb(255, 255, 255)";
var textColor = "rgb(0, 0, 0)";
var activeFill = "rgb(247, 250, 255)";
var nodeMainFill = "rgb(239, 244, 255)";
var comboFill = "rgb(253, 253, 253)";
var disabledFill = "rgb(250, 250, 250)";
var edgeMainStroke = "rgb(224, 224, 224)";
var edgeInactiveStroke = "rgb(234, 234, 234)";
var edgeDisablesStroke = "rgb(245, 245, 245)";
var inactiveStroke = "rgb(191, 213, 255)";
var highlightStroke = "#4572d9";
var highlightFill = "rgb(223, 234, 255)";
var colorSet = {
  mainStroke: subjectColor,
  mainFill: nodeMainFill,
  activeStroke: subjectColor,
  activeFill,
  inactiveStroke,
  inactiveFill: activeFill,
  selectedStroke: subjectColor,
  selectedFill: backColor,
  highlightStroke,
  highlightFill,
  disableStroke: edgeMainStroke,
  disableFill: disabledFill,
  edgeMainStroke,
  edgeActiveStroke: subjectColor,
  edgeInactiveStroke,
  edgeSelectedStroke: subjectColor,
  edgeHighlightStroke: subjectColor,
  edgeDisableStroke: edgeDisablesStroke,
  comboMainStroke: edgeMainStroke,
  comboMainFill: comboFill,
  comboActiveStroke: subjectColor,
  comboActiveFill: activeFill,
  comboInactiveStroke: edgeMainStroke,
  comboInactiveFill: comboFill,
  comboSelectedStroke: subjectColor,
  comboSelectedFill: comboFill,
  comboHighlightStroke: highlightStroke,
  comboHighlightFill: comboFill,
  comboDisableStroke: edgeInactiveStroke,
  comboDisableFill: disabledFill
};
var Global = {
  version: "0.6.4",
  rootContainerClassName: "root-container",
  nodeContainerClassName: "node-container",
  edgeContainerClassName: "edge-container",
  comboContainerClassName: "combo-container",
  delegateContainerClassName: "delegate-container",
  defaultLoopPosition: "top",
  nodeLabel: {
    style: {
      fill: "#000",
      fontSize: 12,
      textAlign: "center",
      textBaseline: "middle"
    },
    offset: 4
  },
  defaultNode: {
    type: "circle",
    style: {
      lineWidth: 1,
      stroke: colorSet.mainStroke,
      fill: nodeMainFill
    },
    size: 20,
    color: colorSet.mainStroke,
    linkPoints: {
      size: 8,
      lineWidth: 1,
      fill: colorSet.activeFill,
      stroke: colorSet.activeStroke
    }
  },
  nodeStateStyles: {
    active: {
      fill: colorSet.activeFill,
      stroke: colorSet.activeStroke,
      lineWidth: 2,
      shadowColor: colorSet.mainStroke,
      shadowBlur: 10
    },
    selected: {
      fill: colorSet.selectedFill,
      stroke: colorSet.selectedStroke,
      lineWidth: 4,
      shadowColor: colorSet.selectedStroke,
      shadowBlur: 10,
      "text-shape": {
        fontWeight: 500
      }
    },
    highlight: {
      fill: colorSet.highlightFill,
      stroke: colorSet.highlightStroke,
      lineWidth: 2,
      "text-shape": {
        fontWeight: 500
      }
    },
    inactive: {
      fill: colorSet.inactiveFill,
      stroke: colorSet.inactiveStroke,
      lineWidth: 1
    },
    disable: {
      fill: colorSet.disableFill,
      stroke: colorSet.disableStroke,
      lineWidth: 1
    }
  },
  edgeLabel: {
    style: {
      fill: textColor,
      textAlign: "center",
      textBaseline: "middle",
      fontSize: 12
    }
  },
  defaultEdge: {
    type: "line",
    size: 1,
    style: {
      stroke: colorSet.edgeMainStroke,
      lineAppendWidth: 2
    },
    color: colorSet.edgeMainStroke
  },
  edgeStateStyles: {
    active: {
      stroke: colorSet.edgeActiveStroke,
      lineWidth: 1
    },
    selected: {
      stroke: colorSet.edgeSelectedStroke,
      lineWidth: 2,
      shadowColor: colorSet.edgeSelectedStroke,
      shadowBlur: 10,
      "text-shape": {
        fontWeight: 500
      }
    },
    highlight: {
      stroke: colorSet.edgeHighlightStroke,
      lineWidth: 2,
      "text-shape": {
        fontWeight: 500
      }
    },
    inactive: {
      stroke: colorSet.edgeInactiveStroke,
      lineWidth: 1
    },
    disable: {
      stroke: colorSet.edgeDisableStroke,
      lineWidth: 1
    }
  },
  comboLabel: {
    style: {
      fill: textColor,
      textBaseline: "middle",
      fontSize: 12
    },
    refY: 10,
    refX: 10
  },
  defaultCombo: {
    type: "circle",
    style: {
      fill: colorSet.comboMainFill,
      lineWidth: 1,
      stroke: colorSet.comboMainStroke,
      r: 5,
      width: 20,
      height: 10
    },
    size: [20, 5],
    color: colorSet.comboMainStroke,
    padding: [25, 20, 15, 20]
  },
  comboStateStyles: {
    active: {
      stroke: colorSet.comboActiveStroke,
      lineWidth: 1,
      fill: colorSet.comboActiveFill
    },
    selected: {
      stroke: colorSet.comboSelectedStroke,
      lineWidth: 2,
      fill: colorSet.comboSelectedFill,
      shadowColor: colorSet.comboSelectedStroke,
      shadowBlur: 10,
      "text-shape": {
        fontWeight: 500
      }
    },
    highlight: {
      stroke: colorSet.comboHighlightStroke,
      lineWidth: 2,
      fill: colorSet.comboHighlightFill,
      "text-shape": {
        fontWeight: 500
      }
    },
    inactive: {
      stroke: colorSet.comboInactiveStroke,
      fill: colorSet.comboInactiveFill,
      lineWidth: 1
    },
    disable: {
      stroke: colorSet.comboDisableStroke,
      fill: colorSet.comboDisableFill,
      lineWidth: 1
    }
  },
  delegateStyle: {
    fill: "#F3F9FF",
    fillOpacity: 0.5,
    stroke: "#1890FF",
    strokeOpacity: 0.9,
    lineDash: [5, 5]
  },
  windowFontFamily: typeof window !== "undefined" && window.getComputedStyle && document.body ? window.getComputedStyle(document.body, null).getPropertyValue("font-family") || "Arial, sans-serif" : "Arial, sans-serif"
};
var letterAspectRatio = {
  " ": 0.3329986572265625,
  a: 0.5589996337890625,
  A: 0.6569992065429687,
  b: 0.58599853515625,
  B: 0.6769989013671875,
  c: 0.5469985961914062,
  C: 0.7279998779296875,
  d: 0.58599853515625,
  D: 0.705999755859375,
  e: 0.554998779296875,
  E: 0.63699951171875,
  f: 0.37299957275390627,
  F: 0.5769989013671875,
  g: 0.5909988403320312,
  G: 0.7479995727539063,
  h: 0.555999755859375,
  H: 0.7199996948242188,
  i: 0.255999755859375,
  I: 0.23699951171875,
  j: 0.26699981689453123,
  J: 0.5169998168945312,
  k: 0.5289993286132812,
  K: 0.6899993896484375,
  l: 0.23499908447265624,
  L: 0.5879989624023437,
  m: 0.854998779296875,
  M: 0.8819992065429687,
  n: 0.5589996337890625,
  N: 0.7189987182617188,
  o: 0.58599853515625,
  O: 0.7669998168945312,
  p: 0.58599853515625,
  P: 0.6419998168945312,
  q: 0.58599853515625,
  Q: 0.7669998168945312,
  r: 0.3649993896484375,
  R: 0.6759994506835938,
  s: 0.504998779296875,
  S: 0.6319992065429687,
  t: 0.354998779296875,
  T: 0.6189987182617187,
  u: 0.5599990844726562,
  U: 0.7139999389648437,
  v: 0.48199920654296874,
  V: 0.6389999389648438,
  w: 0.754998779296875,
  W: 0.929998779296875,
  x: 0.5089996337890625,
  X: 0.63699951171875,
  y: 0.4959991455078125,
  Y: 0.66199951171875,
  z: 0.48699951171875,
  Z: 0.6239990234375,
  "0": 0.6,
  "1": 0.40099945068359377,
  "2": 0.6,
  "3": 0.6,
  "4": 0.6,
  "5": 0.6,
  "6": 0.6,
  "7": 0.5469985961914062,
  "8": 0.6,
  "9": 0.6,
  "[": 0.3329986572265625,
  "]": 0.3329986572265625,
  ",": 0.26399993896484375,
  ".": 0.26399993896484375,
  ";": 0.26399993896484375,
  ":": 0.26399993896484375,
  "{": 0.3329986572265625,
  "}": 0.3329986572265625,
  "\\": 0.5,
  "|": 0.19499969482421875,
  "=": 0.604998779296875,
  "+": 0.604998779296875,
  "-": 0.604998779296875,
  _: 0.5,
  "`": 0.3329986572265625,
  " ~": 0.8329986572265625,
  "!": 0.3329986572265625,
  "@": 0.8579986572265625,
  "#": 0.6,
  $: 0.6,
  "%": 0.9699996948242188,
  "^": 0.517999267578125,
  "&": 0.7259994506835937,
  "*": 0.505999755859375,
  "(": 0.3329986572265625,
  ")": 0.3329986572265625,
  "<": 0.604998779296875,
  ">": 0.604998779296875,
  "/": 0.5,
  "?": 0.53699951171875
};
var PI = Math.PI, sin = Math.sin, cos = Math.cos;
var SELF_LINK_SIN = sin(PI / 8);
var SELF_LINK_COS = cos(PI / 8);
var getBBox$1 = function getBBox(element, group) {
  var bbox = element.getBBox();
  var leftTop = {
    x: bbox.minX,
    y: bbox.minY
  };
  var rightBottom = {
    x: bbox.maxX,
    y: bbox.maxY
  };
  if (group) {
    var matrix = group.getMatrix();
    if (!matrix) {
      matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    leftTop = applyMatrix(leftTop, matrix);
    rightBottom = applyMatrix(rightBottom, matrix);
  }
  var lx = leftTop.x, ly = leftTop.y;
  var rx = rightBottom.x, ry = rightBottom.y;
  return {
    x: lx,
    y: ly,
    minX: lx,
    minY: ly,
    maxX: rx,
    maxY: ry,
    width: rx - lx,
    height: ry - ly
  };
};
var getLoopCfgs = function getLoopCfgs2(cfg) {
  var item = cfg.sourceNode || cfg.targetNode;
  var container = item.get("group");
  var containerMatrix = container.getMatrix();
  if (!containerMatrix)
    containerMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  var keyShape = item.getKeyShape();
  var bbox = keyShape.getBBox();
  var loopCfg = cfg.loopCfg || {};
  var dist = loopCfg.dist || Math.max(bbox.width, bbox.height) * 2;
  var position = loopCfg.position || Global.defaultLoopPosition;
  var center = [containerMatrix[6], containerMatrix[7]];
  var startPoint = [cfg.startPoint.x, cfg.startPoint.y];
  var endPoint = [cfg.endPoint.x, cfg.endPoint.y];
  var rstart = bbox.height / 2;
  var rend = bbox.height / 2;
  var sinDeltaStart = rstart * SELF_LINK_SIN;
  var cosDeltaStart = rstart * SELF_LINK_COS;
  var sinDeltaEnd = rend * SELF_LINK_SIN;
  var cosDeltaEnd = rend * SELF_LINK_COS;
  if (startPoint[0] === endPoint[0] && startPoint[1] === endPoint[1]) {
    switch (position) {
      case "top":
        startPoint = [center[0] - sinDeltaStart, center[1] - cosDeltaStart];
        endPoint = [center[0] + sinDeltaEnd, center[1] - cosDeltaEnd];
        break;
      case "top-right":
        rstart = bbox.height / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] + sinDeltaStart, center[1] - cosDeltaStart];
        endPoint = [center[0] + cosDeltaEnd, center[1] - sinDeltaEnd];
        break;
      case "right":
        rstart = bbox.width / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] + cosDeltaStart, center[1] - sinDeltaStart];
        endPoint = [center[0] + cosDeltaEnd, center[1] + sinDeltaEnd];
        break;
      case "bottom-right":
        rstart = bbox.width / 2;
        rend = bbox.height / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] + cosDeltaStart, center[1] + sinDeltaStart];
        endPoint = [center[0] + sinDeltaEnd, center[1] + cosDeltaEnd];
        break;
      case "bottom":
        rstart = bbox.height / 2;
        rend = bbox.height / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] + sinDeltaStart, center[1] + cosDeltaStart];
        endPoint = [center[0] - sinDeltaEnd, center[1] + cosDeltaEnd];
        break;
      case "bottom-left":
        rstart = bbox.height / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] - sinDeltaStart, center[1] + cosDeltaStart];
        endPoint = [center[0] - cosDeltaEnd, center[1] + sinDeltaEnd];
        break;
      case "left":
        rstart = bbox.width / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] - cosDeltaStart, center[1] + sinDeltaStart];
        endPoint = [center[0] - cosDeltaEnd, center[1] - sinDeltaEnd];
        break;
      case "top-left":
        rstart = bbox.width / 2;
        rend = bbox.height / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] - cosDeltaStart, center[1] - sinDeltaStart];
        endPoint = [center[0] - sinDeltaEnd, center[1] - cosDeltaEnd];
        break;
      default:
        rstart = bbox.width / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] - sinDeltaStart, center[1] - cosDeltaStart];
        endPoint = [center[0] + sinDeltaEnd, center[1] - cosDeltaEnd];
    }
    if (loopCfg.clockwise === false) {
      var swap = [startPoint[0], startPoint[1]];
      startPoint = [endPoint[0], endPoint[1]];
      endPoint = [swap[0], swap[1]];
    }
  }
  var startVec = [startPoint[0] - center[0], startPoint[1] - center[1]];
  var scaleRateStart = (rstart + dist) / rstart;
  var scaleRateEnd = (rend + dist) / rend;
  if (loopCfg.clockwise === false) {
    scaleRateStart = (rend + dist) / rend;
    scaleRateEnd = (rstart + dist) / rstart;
  }
  var startExtendVec = scale$1([0, 0], startVec, scaleRateStart);
  var controlPoint1 = [center[0] + startExtendVec[0], center[1] + startExtendVec[1]];
  var endVec = [endPoint[0] - center[0], endPoint[1] - center[1]];
  var endExtendVec = scale$1([0, 0], endVec, scaleRateEnd);
  var controlPoint2 = [center[0] + endExtendVec[0], center[1] + endExtendVec[1]];
  cfg.startPoint = {
    x: startPoint[0],
    y: startPoint[1]
  };
  cfg.endPoint = {
    x: endPoint[0],
    y: endPoint[1]
  };
  cfg.controlPoints = [{
    x: controlPoint1[0],
    y: controlPoint1[1]
  }, {
    x: controlPoint2[0],
    y: controlPoint2[1]
  }];
  return cfg;
};
var getLabelPosition = function getLabelPosition2(pathShape, percent, refX, refY, rotate3) {
  var TAN_OFFSET = 1e-4;
  var vector = [];
  var point = pathShape === null || pathShape === void 0 ? void 0 : pathShape.getPoint(percent);
  if (!point) {
    return {
      x: 0,
      y: 0,
      angle: 0
    };
  }
  if (percent < TAN_OFFSET) {
    vector = pathShape.getStartTangent().reverse();
  } else if (percent > 1 - TAN_OFFSET) {
    vector = pathShape.getEndTangent();
  } else {
    var offsetPoint = pathShape === null || pathShape === void 0 ? void 0 : pathShape.getPoint(percent + TAN_OFFSET);
    vector.push([point.x, point.y]);
    vector.push([offsetPoint.x, offsetPoint.y]);
  }
  var rad = Math.atan2(vector[1][1] - vector[0][1], vector[1][0] - vector[0][0]);
  if (rad < 0) {
    rad += PI * 2;
  }
  if (refX) {
    point.x += cos(rad) * refX;
    point.y += sin(rad) * refX;
  }
  if (refY) {
    var normal = rad - PI / 2;
    if (rad > 1 / 2 * PI && rad < 3 * 1 / 2 * PI) {
      normal -= PI;
    }
    point.x += cos(normal) * refY;
    point.y += sin(normal) * refY;
  }
  var result = {
    x: point.x,
    y: point.y,
    angle: rad
  };
  if (rotate3) {
    if (rad > 0.5 * PI && rad < 1.5 * PI) {
      rad -= PI;
    }
    return __assign({
      rotate: rad
    }, result);
  }
  return result;
};
var traverse = function traverse2(data, fn) {
  if (fn(data) === false) {
    return false;
  }
  if (data && data.children) {
    for (var i = data.children.length - 1; i >= 0; i--) {
      if (!traverse2(data.children[i], fn))
        return false;
    }
  }
  return true;
};
var traverseUp = function traverseUp2(data, fn) {
  if (data && data.children) {
    for (var i = data.children.length - 1; i >= 0; i--) {
      if (!traverseUp2(data.children[i], fn))
        return;
    }
  }
  if (fn(data) === false) {
    return false;
  }
  return true;
};
var traverseTree = function traverseTree2(data, fn) {
  if (typeof fn !== "function") {
    return;
  }
  traverse(data, fn);
};
var traverseTreeUp = function traverseTreeUp2(data, fn) {
  if (typeof fn !== "function") {
    return;
  }
  traverseUp(data, fn);
};
var getLetterWidth = function getLetterWidth2(letter, fontSize) {
  return fontSize * (letterAspectRatio[letter] || 1);
};
var getTextSize = function getTextSize2(text2, fontSize) {
  var width = 0;
  var pattern = new RegExp("[\u4E00-\u9FA5]+");
  text2.split("").forEach(function(letter) {
    if (pattern.test(letter)) {
      width += fontSize;
    } else {
      width += getLetterWidth(letter, fontSize);
    }
  });
  return [width, fontSize];
};
var plainCombosToTrees = function plainCombosToTrees2(array, nodes) {
  var result = [];
  var addedMap = {};
  var modelMap = {};
  array.forEach(function(d) {
    modelMap[d.id] = d;
  });
  array.forEach(function(d, i) {
    var cd = clone$1(d);
    cd.itemType = "combo";
    cd.children = void 0;
    if (cd.parentId === cd.id) {
      console.warn("The parentId for combo ".concat(cd.id, " can not be the same as the combo's id"));
      delete cd.parentId;
    } else if (cd.parentId && !modelMap[cd.parentId]) {
      console.warn("The parent combo for combo ".concat(cd.id, " does not exist!"));
      delete cd.parentId;
    }
    var mappedObj = addedMap[cd.id];
    if (mappedObj) {
      cd.children = mappedObj.children;
      addedMap[cd.id] = cd;
      mappedObj = cd;
      if (!mappedObj.parentId) {
        result.push(mappedObj);
        return;
      }
      var mappedParent = addedMap[mappedObj.parentId];
      if (mappedParent) {
        if (mappedParent.children)
          mappedParent.children.push(cd);
        else
          mappedParent.children = [cd];
      } else {
        var parent_1 = {
          id: mappedObj.parentId,
          children: [mappedObj]
        };
        addedMap[mappedObj.parentId] = parent_1;
        addedMap[cd.id] = cd;
      }
      return;
    }
    if (isString(d.parentId)) {
      var parent_2 = addedMap[d.parentId];
      if (parent_2) {
        if (parent_2.children)
          parent_2.children.push(cd);
        else
          parent_2.children = [cd];
        addedMap[cd.id] = cd;
      } else {
        var pa = {
          id: d.parentId,
          children: [cd]
        };
        addedMap[pa.id] = pa;
        addedMap[cd.id] = cd;
      }
    } else {
      result.push(cd);
      addedMap[cd.id] = cd;
    }
  });
  var nodeMap = {};
  (nodes || []).forEach(function(node) {
    nodeMap[node.id] = node;
    var combo = addedMap[node.comboId];
    if (combo) {
      var cnode = {
        id: node.id,
        comboId: node.comboId
      };
      if (combo.children)
        combo.children.push(cnode);
      else
        combo.children = [cnode];
      cnode.itemType = "node";
      addedMap[node.id] = cnode;
    }
  });
  var maxDepth = 0;
  result.forEach(function(tree) {
    tree.depth = maxDepth + 10;
    traverse(tree, function(child) {
      var parent;
      var itemType = addedMap[child.id].itemType;
      if (itemType === "node") {
        parent = addedMap[child.comboId];
      } else {
        parent = addedMap[child.parentId];
      }
      if (parent) {
        if (itemType === "node")
          child.depth = maxDepth + 1;
        else
          child.depth = maxDepth + 10;
      } else {
        child.depth = maxDepth + 10;
      }
      if (maxDepth < child.depth)
        maxDepth = child.depth;
      var oriNodeModel = nodeMap[child.id];
      if (oriNodeModel) {
        oriNodeModel.depth = child.depth;
      }
      return true;
    });
  });
  return result;
};
var reconstructTree = function reconstructTree2(trees, subtreeId, newParentId) {
  var _a;
  var brothers = trees;
  var subtree;
  var comboChildsMap = {
    root: {
      children: trees
    }
  };
  var foundSubTree = false;
  var oldParentId = "root";
  (trees || []).forEach(function(tree) {
    if (foundSubTree)
      return;
    if (tree.id === subtreeId) {
      subtree = tree;
      if (tree.itemType === "combo") {
        subtree.parentId = newParentId;
      } else {
        subtree.comboId = newParentId;
      }
      foundSubTree = true;
      return;
    }
    traverseTree(tree, function(child) {
      var _a2;
      comboChildsMap[child.id] = {
        children: (child === null || child === void 0 ? void 0 : child.children) || []
      };
      brothers = (_a2 = comboChildsMap[child.parentId || child.comboId || "root"]) === null || _a2 === void 0 ? void 0 : _a2.children;
      if (child && (child.removed || subtreeId === child.id) && brothers) {
        oldParentId = child.parentId || child.comboId || "root";
        subtree = child;
        if (child.itemType === "combo") {
          subtree.parentId = newParentId;
        } else {
          subtree.comboId = newParentId;
        }
        foundSubTree = true;
        return false;
      }
      return true;
    });
  });
  brothers = (_a = comboChildsMap[oldParentId]) === null || _a === void 0 ? void 0 : _a.children;
  var index = brothers ? brothers.indexOf(subtree) : -1;
  if (index > -1)
    brothers.splice(index, 1);
  if (!foundSubTree) {
    subtree = {
      id: subtreeId,
      itemType: "node",
      comboId: newParentId
    };
    comboChildsMap[subtreeId] = {
      children: void 0
    };
  }
  if (subtreeId) {
    var found_1 = false;
    if (newParentId) {
      var newParentDepth_1 = 0;
      (trees || []).forEach(function(tree) {
        if (found_1)
          return;
        traverseTree(tree, function(child) {
          if (newParentId === child.id) {
            found_1 = true;
            if (child.children)
              child.children.push(subtree);
            else
              child.children = [subtree];
            newParentDepth_1 = child.depth;
            if (subtree.itemType === "node")
              subtree.depth = newParentDepth_1 + 2;
            else
              subtree.depth = newParentDepth_1 + 1;
            return false;
          }
          return true;
        });
      });
    } else if ((!newParentId || !found_1) && subtree.itemType !== "node") {
      trees.push(subtree);
    }
    var currentDepth_1 = subtree.depth;
    traverseTree(subtree, function(child) {
      if (child.itemType === "node")
        currentDepth_1 += 2;
      else
        currentDepth_1 += 1;
      child.depth = currentDepth_1;
      return true;
    });
  }
  return trees;
};
var getComboBBox = function getComboBBox2(children, graph, combo) {
  var comboBBox = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
    x: void 0,
    y: void 0,
    width: void 0,
    height: void 0,
    centerX: void 0,
    centerY: void 0
  };
  if (!children || children.length === 0) {
    var comboModel = combo === null || combo === void 0 ? void 0 : combo.getModel();
    var _a = comboModel || {}, x = _a.x, y = _a.y;
    return {
      minX: x,
      minY: y,
      maxX: x,
      maxY: y,
      x,
      y,
      width: void 0,
      height: void 0
    };
  }
  children.forEach(function(child) {
    var childItem = graph.findById(child.id);
    if (!childItem || !childItem.isVisible())
      return;
    childItem.set("bboxCanvasCache", void 0);
    var childBBox = childItem.getCanvasBBox();
    if (childBBox.x && comboBBox.minX > childBBox.minX)
      comboBBox.minX = childBBox.minX;
    if (childBBox.y && comboBBox.minY > childBBox.minY)
      comboBBox.minY = childBBox.minY;
    if (childBBox.x && comboBBox.maxX < childBBox.maxX)
      comboBBox.maxX = childBBox.maxX;
    if (childBBox.y && comboBBox.maxY < childBBox.maxY)
      comboBBox.maxY = childBBox.maxY;
  });
  comboBBox.x = (comboBBox.minX + comboBBox.maxX) / 2;
  comboBBox.y = (comboBBox.minY + comboBBox.maxY) / 2;
  comboBBox.width = comboBBox.maxX - comboBBox.minX;
  comboBBox.height = comboBBox.maxY - comboBBox.minY;
  comboBBox.centerX = (comboBBox.minX + comboBBox.maxX) / 2;
  comboBBox.centerY = (comboBBox.minY + comboBBox.maxY) / 2;
  Object.keys(comboBBox).forEach(function(key) {
    if (comboBBox[key] === Infinity || comboBBox[key] === -Infinity) {
      comboBBox[key] = void 0;
    }
  });
  return comboBBox;
};
var shouldRefreshEdge = function shouldRefreshEdge2(cfg) {
  var refreshEdge = isNumber(cfg.x) || isNumber(cfg.y) || cfg.type || cfg.anchorPoints || cfg.size;
  if (cfg.style)
    refreshEdge = refreshEdge || isNumber(cfg.style.r) || isNumber(cfg.style.width) || isNumber(cfg.style.height) || isNumber(cfg.style.rx) || isNumber(cfg.style.ry);
  return refreshEdge;
};
var cloneBesidesImg = function cloneBesidesImg2(obj) {
  var clonedObj = {};
  Object.keys(obj).forEach(function(key1) {
    var obj2 = obj[key1];
    if (isObject$1(obj2) && !isArray$1(obj2)) {
      var clonedObj2_1 = {};
      Object.keys(obj2).forEach(function(key2) {
        var v = obj2[key2];
        if (key2 === "img" && !isString(v))
          return;
        clonedObj2_1[key2] = clone$1(v);
      });
      clonedObj[key1] = clonedObj2_1;
    } else {
      clonedObj[key1] = clone$1(obj2);
    }
  });
  return clonedObj;
};
var GraphicUtil = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getBBox: getBBox$1,
  getLoopCfgs,
  getLabelPosition,
  traverseTree,
  traverseTreeUp,
  getLetterWidth,
  getTextSize,
  plainCombosToTrees,
  reconstructTree,
  getComboBBox,
  shouldRefreshEdge,
  cloneBesidesImg
}, Symbol.toStringTag, { value: "Module" }));
var dataValidation = function dataValidation2(data) {
  if (!data) {
    console.error("G6 Error Tips: the data must be defined");
    return false;
  }
  var nodes = data.nodes, edges = data.edges, _a = data.combos, combos = _a === void 0 ? [] : _a;
  if (!nodes && !edges) {
    var validated_1 = true;
    traverseTree(data, function(param) {
      if (!isString(param.id)) {
        validated_1 = false;
        return false;
      }
      return true;
    });
    return validated_1;
  }
  var nonNode = (nodes || []).find(function(node) {
    return !isString(node.id);
  });
  if (nonNode) {
    console.warn("G6 Warning Tips: missing 'id' property, or %c".concat(nonNode.id, "%c is not a string."), "font-size: 20px; color: red;", "");
    return false;
  }
  var nodeIds = (nodes || []).map(function(node) {
    return node.id;
  });
  var comboIds = combos === null || combos === void 0 ? void 0 : combos.map(function(combo) {
    return combo.id;
  });
  var ids = __spreadArray$1(__spreadArray$1([], nodeIds, true), comboIds, true);
  var nonEdges = (edges || []).find(function(edge) {
    return !ids.includes(edge.source) || !ids.includes(edge.target);
  });
  if (nonEdges) {
    console.warn("G6 Warning Tips: The source %c".concat(nonEdges.source, "%c or the target %c").concat(nonEdges.target, "%c of the edge do not exist in the nodes or combos."), "font-size: 20px; color: red;", "", "font-size: 20px; color: red;", "");
    return false;
  }
  return true;
};
var singleDataValidation = function singleDataValidation2(type, data) {
  if (type === "node" || type === "combo") {
    if (data.id && !isString(data.id)) {
      console.warn("G6 Warning Tips: missing 'id' property, or the 'id' %c".concat(data.id, "%c is not a string."), "font-size: 20px; color: red;", "");
      return false;
    }
  } else if (type === "edge") {
    if (!data.source || !data.target) {
      console.warn("G6 Warning Tips: missing 'source' or 'target' for the edge.");
      return false;
    }
  }
  return true;
};
var ModeController = function() {
  function ModeController2(graph) {
    this.graph = graph;
    this.destroyed = false;
    this.modes = graph.get("modes") || {
      default: []
    };
    this.formatModes();
    this.mode = graph.get("defaultMode") || "default";
    this.currentBehaves = [];
    this.setMode(this.mode);
  }
  ModeController2.prototype.formatModes = function() {
    var modes = this.modes;
    each(modes, function(mode) {
      each(mode, function(behavior, i) {
        if (isString(behavior)) {
          mode[i] = {
            type: behavior
          };
        }
      });
    });
  };
  ModeController2.prototype.setBehaviors = function(mode) {
    var graph = this.graph;
    var behaviors = this.modes[mode];
    var behaves = [];
    var behave;
    each(behaviors || [], function(behavior) {
      var BehaviorInstance = Behavior.getBehavior(behavior.type || behavior);
      if (!BehaviorInstance) {
        return;
      }
      behave = new BehaviorInstance(behavior);
      if (behave) {
        behave.bind(graph);
        behaves.push(behave);
      }
    });
    this.currentBehaves = behaves;
  };
  ModeController2.mergeBehaviors = function(modeBehaviors, behaviors) {
    each(behaviors, function(behavior) {
      if (modeBehaviors.indexOf(behavior) < 0) {
        if (isString(behavior)) {
          behavior = {
            type: behavior
          };
        }
        modeBehaviors.push(behavior);
      }
    });
    return modeBehaviors;
  };
  ModeController2.filterBehaviors = function(modeBehaviors, behaviors) {
    var result = [];
    modeBehaviors.forEach(function(behavior) {
      var type = "";
      if (isString(behavior)) {
        type = behavior;
      } else {
        type = behavior.type;
      }
      if (behaviors.indexOf(type) < 0) {
        result.push(behavior);
      }
    });
    return result;
  };
  ModeController2.prototype.setMode = function(mode) {
    var _a = this, modes = _a.modes, graph = _a.graph;
    var current = mode;
    var behaviors = modes[current];
    if (!behaviors) {
      return;
    }
    graph.emit("beforemodechange", {
      mode
    });
    each(this.currentBehaves, function(behave) {
      if (behave.delegate)
        behave.delegate.remove();
      behave.unbind(graph);
    });
    this.setBehaviors(current);
    graph.emit("aftermodechange", {
      mode
    });
    this.mode = mode;
  };
  ModeController2.prototype.getMode = function() {
    return this.mode;
  };
  ModeController2.prototype.manipulateBehaviors = function(behaviors, modes, isAdd) {
    var _this = this;
    var behaves;
    if (!isArray$1(behaviors)) {
      behaves = [behaviors];
    } else {
      behaves = behaviors;
    }
    if (isArray$1(modes)) {
      each(modes, function(mode) {
        if (!_this.modes[mode]) {
          if (isAdd) {
            _this.modes[mode] = behaves;
          }
        } else if (isAdd) {
          _this.modes[mode] = ModeController2.mergeBehaviors(_this.modes[mode] || [], behaves);
        } else {
          _this.modes[mode] = ModeController2.filterBehaviors(_this.modes[mode] || [], behaves);
        }
      });
      return this;
    }
    var currentMode = modes;
    if (!modes) {
      currentMode = this.mode;
    }
    if (!this.modes[currentMode]) {
      if (isAdd) {
        this.modes[currentMode] = behaves;
      }
    }
    if (isAdd) {
      this.modes[currentMode] = ModeController2.mergeBehaviors(this.modes[currentMode] || [], behaves);
    } else {
      this.modes[currentMode] = ModeController2.filterBehaviors(this.modes[currentMode] || [], behaves);
    }
    this.formatModes();
    this.setMode(this.mode);
    return this;
  };
  ModeController2.prototype.updateBehavior = function(behavior, newCfg, mode) {
    if (isString(behavior)) {
      behavior = {
        type: behavior
      };
    }
    var behaviorSet = [];
    if (!mode || mode === this.mode || mode === "default") {
      behaviorSet = this.currentBehaves;
      if (!behaviorSet || !behaviorSet.length) {
        console.warn("Update behavior failed! There is no behaviors in this mode on the graph.");
        return this;
      }
      var length_1 = behaviorSet.length;
      for (var i = 0; i < length_1; i++) {
        var behave = behaviorSet[i];
        if (behave.type === behavior.type) {
          behave.updateCfg(newCfg);
          return this;
        }
        if (i === length_1 - 1)
          console.warn("Update behavior failed! There is no such behavior in the mode");
      }
    } else {
      behaviorSet = this.modes[mode];
      if (!behaviorSet || !behaviorSet.length) {
        console.warn("Update behavior failed! There is no behaviors in this mode on the graph.");
        return this;
      }
      var length_2 = behaviorSet.length;
      for (var i = 0; i < length_2; i++) {
        var behave = behaviorSet[i];
        if (behave.type === behavior.type || behave === behavior.type) {
          if (behave === behavior.type)
            behave = {
              type: behave
            };
          Object.assign(behave, newCfg);
          behaviorSet[i] = behave;
          return this;
        }
        if (i === length_2 - 1)
          console.warn("Update behavior failed! There is no such behavior in the mode");
      }
    }
    return this;
  };
  ModeController2.prototype.destroy = function() {
    this.graph = null;
    this.modes = null;
    this.currentBehaves = null;
    this.destroyed = true;
  };
  return ModeController2;
}();
var SPACES$1 = "	\n\v\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029";
var PATH_COMMAND$1 = new RegExp("([a-z])[" + SPACES$1 + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + SPACES$1 + "]*,?[" + SPACES$1 + "]*)+)", "ig");
var PATH_VALUES$1 = new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[" + SPACES$1 + "]*,?[" + SPACES$1 + "]*", "ig");
var parsePathString$1 = function(pathString) {
  if (!pathString) {
    return null;
  }
  if (isArray$1(pathString)) {
    return pathString;
  }
  var paramCounts = {
    a: 7,
    c: 6,
    o: 2,
    h: 1,
    l: 2,
    m: 2,
    r: 4,
    q: 4,
    s: 4,
    t: 2,
    v: 1,
    u: 3,
    z: 0
  };
  var data = [];
  String(pathString).replace(PATH_COMMAND$1, function(a, b, c) {
    var params = [];
    var name = b.toLowerCase();
    c.replace(PATH_VALUES$1, function(a2, b10) {
      b10 && params.push(+b10);
    });
    if (name === "m" && params.length > 2) {
      data.push([b].concat(params.splice(0, 2)));
      name = "l";
      b = b === "m" ? "l" : "L";
    }
    if (name === "o" && params.length === 1) {
      data.push([b, params[0]]);
    }
    if (name === "r") {
      data.push([b].concat(params));
    } else {
      while (params.length >= paramCounts[name]) {
        data.push([b].concat(params.splice(0, paramCounts[name])));
        if (!paramCounts[name]) {
          break;
        }
      }
    }
    return pathString;
  });
  return data;
};
var isEqual = function(obj1, obj2) {
  if (obj1.length !== obj2.length) {
    return false;
  }
  var result = true;
  each(obj1, function(item, i) {
    if (item !== obj2[i]) {
      result = false;
      return false;
    }
  });
  return result;
};
function getMinDiff(del, add2, modify) {
  var type = null;
  var min2 = modify;
  if (add2 < min2) {
    min2 = add2;
    type = "add";
  }
  if (del < min2) {
    min2 = del;
    type = "del";
  }
  return {
    type,
    min: min2
  };
}
var levenshteinDistance = function(source, target) {
  var sourceLen = source.length;
  var targetLen = target.length;
  var sourceSegment;
  var targetSegment;
  var temp = 0;
  if (sourceLen === 0 || targetLen === 0) {
    return null;
  }
  var dist = [];
  for (var i = 0; i <= sourceLen; i++) {
    dist[i] = [];
    dist[i][0] = { min: i };
  }
  for (var j = 0; j <= targetLen; j++) {
    dist[0][j] = { min: j };
  }
  for (var i = 1; i <= sourceLen; i++) {
    sourceSegment = source[i - 1];
    for (var j = 1; j <= targetLen; j++) {
      targetSegment = target[j - 1];
      if (isEqual(sourceSegment, targetSegment)) {
        temp = 0;
      } else {
        temp = 1;
      }
      var del = dist[i - 1][j].min + 1;
      var add2 = dist[i][j - 1].min + 1;
      var modify = dist[i - 1][j - 1].min + temp;
      dist[i][j] = getMinDiff(del, add2, modify);
    }
  }
  return dist;
};
var fillPathByDiff = function(source, target) {
  var diffMatrix = levenshteinDistance(source, target);
  var sourceLen = source.length;
  var targetLen = target.length;
  var changes = [];
  var index = 1;
  var minPos = 1;
  if (diffMatrix[sourceLen][targetLen].min !== sourceLen) {
    for (var i = 1; i <= sourceLen; i++) {
      var min2 = diffMatrix[i][i].min;
      minPos = i;
      for (var j = index; j <= targetLen; j++) {
        if (diffMatrix[i][j].min < min2) {
          min2 = diffMatrix[i][j].min;
          minPos = j;
        }
      }
      index = minPos;
      if (diffMatrix[i][index].type) {
        changes.push({ index: i - 1, type: diffMatrix[i][index].type });
      }
    }
    for (var i = changes.length - 1; i >= 0; i--) {
      index = changes[i].index;
      if (changes[i].type === "add") {
        source.splice(index, 0, [].concat(source[index]));
      } else {
        source.splice(index, 1);
      }
    }
  }
  sourceLen = source.length;
  var diff = targetLen - sourceLen;
  if (sourceLen < targetLen) {
    for (var i = 0; i < diff; i++) {
      if (source[sourceLen - 1][0] === "z" || source[sourceLen - 1][0] === "Z") {
        source.splice(sourceLen - 2, 0, source[sourceLen - 2]);
      } else {
        source.push(source[sourceLen - 1]);
      }
      sourceLen += 1;
    }
  }
  return source;
};
function _splitPoints(points, former, count) {
  var result = [].concat(points);
  var index;
  var t = 1 / (count + 1);
  var formerEnd = _getSegmentPoints(former)[0];
  for (var i = 1; i <= count; i++) {
    t *= i;
    index = Math.floor(points.length * t);
    if (index === 0) {
      result.unshift([formerEnd[0] * t + points[index][0] * (1 - t), formerEnd[1] * t + points[index][1] * (1 - t)]);
    } else {
      result.splice(index, 0, [
        formerEnd[0] * t + points[index][0] * (1 - t),
        formerEnd[1] * t + points[index][1] * (1 - t)
      ]);
    }
  }
  return result;
}
function _getSegmentPoints(segment) {
  var points = [];
  switch (segment[0]) {
    case "M":
      points.push([segment[1], segment[2]]);
      break;
    case "L":
      points.push([segment[1], segment[2]]);
      break;
    case "A":
      points.push([segment[6], segment[7]]);
      break;
    case "Q":
      points.push([segment[3], segment[4]]);
      points.push([segment[1], segment[2]]);
      break;
    case "T":
      points.push([segment[1], segment[2]]);
      break;
    case "C":
      points.push([segment[5], segment[6]]);
      points.push([segment[1], segment[2]]);
      points.push([segment[3], segment[4]]);
      break;
    case "S":
      points.push([segment[3], segment[4]]);
      points.push([segment[1], segment[2]]);
      break;
    case "H":
      points.push([segment[1], segment[1]]);
      break;
    case "V":
      points.push([segment[1], segment[1]]);
      break;
  }
  return points;
}
var formatPath = function(fromPath, toPath) {
  if (fromPath.length <= 1) {
    return fromPath;
  }
  var points;
  for (var i = 0; i < toPath.length; i++) {
    if (fromPath[i][0] !== toPath[i][0]) {
      points = _getSegmentPoints(fromPath[i]);
      switch (toPath[i][0]) {
        case "M":
          fromPath[i] = ["M"].concat(points[0]);
          break;
        case "L":
          fromPath[i] = ["L"].concat(points[0]);
          break;
        case "A":
          fromPath[i] = [].concat(toPath[i]);
          fromPath[i][6] = points[0][0];
          fromPath[i][7] = points[0][1];
          break;
        case "Q":
          if (points.length < 2) {
            if (i > 0) {
              points = _splitPoints(points, fromPath[i - 1], 1);
            } else {
              fromPath[i] = toPath[i];
              break;
            }
          }
          fromPath[i] = ["Q"].concat(points.reduce(function(arr, i2) {
            return arr.concat(i2);
          }, []));
          break;
        case "T":
          fromPath[i] = ["T"].concat(points[0]);
          break;
        case "C":
          if (points.length < 3) {
            if (i > 0) {
              points = _splitPoints(points, fromPath[i - 1], 2);
            } else {
              fromPath[i] = toPath[i];
              break;
            }
          }
          fromPath[i] = ["C"].concat(points.reduce(function(arr, i2) {
            return arr.concat(i2);
          }, []));
          break;
        case "S":
          if (points.length < 2) {
            if (i > 0) {
              points = _splitPoints(points, fromPath[i - 1], 1);
            } else {
              fromPath[i] = toPath[i];
              break;
            }
          }
          fromPath[i] = ["S"].concat(points.reduce(function(arr, i2) {
            return arr.concat(i2);
          }, []));
          break;
        default:
          fromPath[i] = toPath[i];
      }
    }
  }
  return fromPath;
};
var GraphEvent = function() {
  function GraphEvent2(type, event) {
    this.bubbles = true;
    this.target = null;
    this.currentTarget = null;
    this.delegateTarget = null;
    this.delegateObject = null;
    this.defaultPrevented = false;
    this.propagationStopped = false;
    this.shape = null;
    this.fromShape = null;
    this.toShape = null;
    this.propagationPath = [];
    this.type = type;
    this.name = type;
    this.originalEvent = event;
    this.timeStamp = event.timeStamp;
  }
  GraphEvent2.prototype.preventDefault = function() {
    this.defaultPrevented = true;
    if (this.originalEvent.preventDefault) {
      this.originalEvent.preventDefault();
    }
  };
  GraphEvent2.prototype.stopPropagation = function() {
    this.propagationStopped = true;
  };
  GraphEvent2.prototype.toString = function() {
    var type = this.type;
    return "[Event (type=" + type + ")]";
  };
  GraphEvent2.prototype.save = function() {
  };
  GraphEvent2.prototype.restore = function() {
  };
  return GraphEvent2;
}();
function removeFromArray(arr, obj) {
  var index = arr.indexOf(obj);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
function isParent(container, shape) {
  if (container.isCanvas()) {
    return true;
  }
  var parent = shape.getParent();
  var isParent2 = false;
  while (parent) {
    if (parent === container) {
      isParent2 = true;
      break;
    }
    parent = parent.getParent();
  }
  return isParent2;
}
function isAllowCapture(element) {
  return element.cfg.visible && element.cfg.capture;
}
var Base = function(_super) {
  __extends(Base2, _super);
  function Base2(cfg) {
    var _this = _super.call(this) || this;
    _this.destroyed = false;
    var defaultCfg = _this.getDefaultCfg();
    _this.cfg = mix(defaultCfg, cfg);
    return _this;
  }
  Base2.prototype.getDefaultCfg = function() {
    return {};
  };
  Base2.prototype.get = function(name) {
    return this.cfg[name];
  };
  Base2.prototype.set = function(name, value) {
    this.cfg[name] = value;
  };
  Base2.prototype.destroy = function() {
    this.cfg = {
      destroyed: true
    };
    this.off();
    this.destroyed = true;
  };
  return Base2;
}(EventEmitter);
var __spreadArray = globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var BrowserInfo = function() {
  function BrowserInfo2(name, version, os) {
    this.name = name;
    this.version = version;
    this.os = os;
    this.type = "browser";
  }
  return BrowserInfo2;
}();
var NodeInfo = function() {
  function NodeInfo2(version) {
    this.version = version;
    this.type = "node";
    this.name = "node";
    this.os = process.platform;
  }
  return NodeInfo2;
}();
var SearchBotDeviceInfo = function() {
  function SearchBotDeviceInfo2(name, version, os, bot) {
    this.name = name;
    this.version = version;
    this.os = os;
    this.bot = bot;
    this.type = "bot-device";
  }
  return SearchBotDeviceInfo2;
}();
var BotInfo = function() {
  function BotInfo2() {
    this.type = "bot";
    this.bot = true;
    this.name = "bot";
    this.version = null;
    this.os = null;
  }
  return BotInfo2;
}();
var ReactNativeInfo = function() {
  function ReactNativeInfo2() {
    this.type = "react-native";
    this.name = "react-native";
    this.version = null;
    this.os = null;
  }
  return ReactNativeInfo2;
}();
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", SEARCHBOX_UA_REGEX]
];
var operatingSystemRules = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function detect(userAgent) {
  if (!!userAgent) {
    return parseUserAgent(userAgent);
  }
  if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return new ReactNativeInfo();
  }
  if (typeof navigator !== "undefined") {
    return parseUserAgent(navigator.userAgent);
  }
  return getNodeVersion();
}
function matchUserAgent(ua) {
  return ua !== "" && userAgentRules.reduce(function(matched, _a) {
    var browser2 = _a[0], regex = _a[1];
    if (matched) {
      return matched;
    }
    var uaMatch = regex.exec(ua);
    return !!uaMatch && [browser2, uaMatch];
  }, false);
}
function parseUserAgent(ua) {
  var matchedRule = matchUserAgent(ua);
  if (!matchedRule) {
    return null;
  }
  var name = matchedRule[0], match = matchedRule[1];
  if (name === "searchbot") {
    return new BotInfo();
  }
  var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
    }
  } else {
    versionParts = [];
  }
  var version = versionParts.join(".");
  var os = detectOS(ua);
  var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]);
  }
  return new BrowserInfo(name, version, os);
}
function detectOS(ua) {
  for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
    var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
    var match = regex.exec(ua);
    if (match) {
      return os;
    }
  }
  return null;
}
function getNodeVersion() {
  var isNode = typeof process !== "undefined" && process.version;
  return isNode ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
  var output = [];
  for (var ii = 0; ii < count; ii++) {
    output.push("0");
  }
  return output;
}
function multiplyMatrix(a, b) {
  var out = [];
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a10 = a[3];
  var a11 = a[4];
  var a12 = a[5];
  var a20 = a[6];
  var a21 = a[7];
  var a22 = a[8];
  var b00 = b[0];
  var b01 = b[1];
  var b02 = b[2];
  var b10 = b[3];
  var b11 = b[4];
  var b12 = b[5];
  var b20 = b[6];
  var b21 = b[7];
  var b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
function multiplyVec2(m, v) {
  var out = [];
  var x = v[0];
  var y = v[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
function invert(a) {
  var out = [];
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a10 = a[3];
  var a11 = a[4];
  var a12 = a[5];
  var a20 = a[6];
  var a21 = a[7];
  var a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20;
  var det = a00 * b01 + a01 * b11 + a02 * b21;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
var transform$3 = transform$5;
var MATRIX = "matrix";
var CLONE_CFGS = ["zIndex", "capture", "visible", "type"];
var RESERVED_PORPS = ["repeat"];
var DELEGATION_SPLIT = ":";
var WILDCARD = "*";
function _cloneArrayAttr(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (isArray$1(arr[i])) {
      result.push([].concat(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
function getFormatFromAttrs(toAttrs, shape) {
  var fromAttrs = {};
  var attrs = shape.attrs;
  for (var k in toAttrs) {
    fromAttrs[k] = attrs[k];
  }
  return fromAttrs;
}
function getFormatToAttrs(props, shape) {
  var toAttrs = {};
  var attrs = shape.attr();
  each(props, function(v, k) {
    if (RESERVED_PORPS.indexOf(k) === -1 && !isEqual$1(attrs[k], v)) {
      toAttrs[k] = v;
    }
  });
  return toAttrs;
}
function checkExistedAttrs(animations, animation) {
  if (animation.onFrame) {
    return animations;
  }
  var startTime = animation.startTime, delay = animation.delay, duration = animation.duration;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  each(animations, function(item) {
    if (startTime + delay < item.startTime + item.delay + item.duration && duration > item.delay) {
      each(animation.toAttrs, function(v, k) {
        if (hasOwnProperty.call(item.toAttrs, k)) {
          delete item.toAttrs[k];
          delete item.fromAttrs[k];
        }
      });
    }
  });
  return animations;
}
var Element = function(_super) {
  __extends(Element2, _super);
  function Element2(cfg) {
    var _this = _super.call(this, cfg) || this;
    _this.attrs = {};
    var attrs = _this.getDefaultAttrs();
    mix(attrs, cfg.attrs);
    _this.attrs = attrs;
    _this.initAttrs(attrs);
    _this.initAnimate();
    return _this;
  }
  Element2.prototype.getDefaultCfg = function() {
    return {
      visible: true,
      capture: true,
      zIndex: 0
    };
  };
  Element2.prototype.getDefaultAttrs = function() {
    return {
      matrix: this.getDefaultMatrix(),
      opacity: 1
    };
  };
  Element2.prototype.onCanvasChange = function(changeType) {
  };
  Element2.prototype.initAttrs = function(attrs) {
  };
  Element2.prototype.initAnimate = function() {
    this.set("animable", true);
    this.set("animating", false);
  };
  Element2.prototype.isGroup = function() {
    return false;
  };
  Element2.prototype.getParent = function() {
    return this.get("parent");
  };
  Element2.prototype.getCanvas = function() {
    return this.get("canvas");
  };
  Element2.prototype.attr = function() {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var name = args[0], value = args[1];
    if (!name)
      return this.attrs;
    if (isObject$1(name)) {
      for (var k in name) {
        this.setAttr(k, name[k]);
      }
      this.afterAttrsChange(name);
      return this;
    }
    if (args.length === 2) {
      this.setAttr(name, value);
      this.afterAttrsChange((_a = {}, _a[name] = value, _a));
      return this;
    }
    return this.attrs[name];
  };
  Element2.prototype.isClipped = function(refX, refY) {
    var clip = this.getClip();
    return clip && !clip.isHit(refX, refY);
  };
  Element2.prototype.setAttr = function(name, value) {
    var originValue = this.attrs[name];
    if (originValue !== value) {
      this.attrs[name] = value;
      this.onAttrChange(name, value, originValue);
    }
  };
  Element2.prototype.onAttrChange = function(name, value, originValue) {
    if (name === "matrix") {
      this.set("totalMatrix", null);
    }
  };
  Element2.prototype.afterAttrsChange = function(targetAttrs) {
    if (this.cfg.isClipShape) {
      var applyTo = this.cfg.applyTo;
      if (applyTo) {
        applyTo.onCanvasChange("clip");
      }
    } else {
      this.onCanvasChange("attr");
    }
  };
  Element2.prototype.show = function() {
    this.set("visible", true);
    this.onCanvasChange("show");
    return this;
  };
  Element2.prototype.hide = function() {
    this.set("visible", false);
    this.onCanvasChange("hide");
    return this;
  };
  Element2.prototype.setZIndex = function(zIndex) {
    this.set("zIndex", zIndex);
    var parent = this.getParent();
    if (parent) {
      parent.sort();
    }
    return this;
  };
  Element2.prototype.toFront = function() {
    var parent = this.getParent();
    if (!parent) {
      return;
    }
    var children = parent.getChildren();
    this.get("el");
    var index = children.indexOf(this);
    children.splice(index, 1);
    children.push(this);
    this.onCanvasChange("zIndex");
  };
  Element2.prototype.toBack = function() {
    var parent = this.getParent();
    if (!parent) {
      return;
    }
    var children = parent.getChildren();
    this.get("el");
    var index = children.indexOf(this);
    children.splice(index, 1);
    children.unshift(this);
    this.onCanvasChange("zIndex");
  };
  Element2.prototype.remove = function(destroy) {
    if (destroy === void 0) {
      destroy = true;
    }
    var parent = this.getParent();
    if (parent) {
      removeFromArray(parent.getChildren(), this);
      if (!parent.get("clearing")) {
        this.onCanvasChange("remove");
      }
    } else {
      this.onCanvasChange("remove");
    }
    if (destroy) {
      this.destroy();
    }
  };
  Element2.prototype.resetMatrix = function() {
    this.attr(MATRIX, this.getDefaultMatrix());
    this.onCanvasChange("matrix");
  };
  Element2.prototype.getMatrix = function() {
    return this.attr(MATRIX);
  };
  Element2.prototype.setMatrix = function(m) {
    this.attr(MATRIX, m);
    this.onCanvasChange("matrix");
  };
  Element2.prototype.getTotalMatrix = function() {
    var totalMatrix = this.cfg.totalMatrix;
    if (!totalMatrix) {
      var currentMatrix = this.attr("matrix");
      var parentMatrix = this.cfg.parentMatrix;
      if (parentMatrix && currentMatrix) {
        totalMatrix = multiplyMatrix(parentMatrix, currentMatrix);
      } else {
        totalMatrix = currentMatrix || parentMatrix;
      }
      this.set("totalMatrix", totalMatrix);
    }
    return totalMatrix;
  };
  Element2.prototype.applyMatrix = function(matrix) {
    var currentMatrix = this.attr("matrix");
    var totalMatrix = null;
    if (matrix && currentMatrix) {
      totalMatrix = multiplyMatrix(matrix, currentMatrix);
    } else {
      totalMatrix = currentMatrix || matrix;
    }
    this.set("totalMatrix", totalMatrix);
    this.set("parentMatrix", matrix);
  };
  Element2.prototype.getDefaultMatrix = function() {
    return null;
  };
  Element2.prototype.applyToMatrix = function(v) {
    var matrix = this.attr("matrix");
    if (matrix) {
      return multiplyVec2(matrix, v);
    }
    return v;
  };
  Element2.prototype.invertFromMatrix = function(v) {
    var matrix = this.attr("matrix");
    if (matrix) {
      var invertMatrix3 = invert(matrix);
      if (invertMatrix3) {
        return multiplyVec2(invertMatrix3, v);
      }
    }
    return v;
  };
  Element2.prototype.setClip = function(clipCfg) {
    var canvas = this.getCanvas();
    var clipShape = null;
    if (clipCfg) {
      var ShapeBase = this.getShapeBase();
      var shapeType = upperFirst(clipCfg.type);
      var Cons = ShapeBase[shapeType];
      if (Cons) {
        clipShape = new Cons({
          type: clipCfg.type,
          isClipShape: true,
          applyTo: this,
          attrs: clipCfg.attrs,
          canvas
        });
      }
    }
    this.set("clipShape", clipShape);
    this.onCanvasChange("clip");
    return clipShape;
  };
  Element2.prototype.getClip = function() {
    var clipShape = this.cfg.clipShape;
    if (!clipShape) {
      return null;
    }
    return clipShape;
  };
  Element2.prototype.clone = function() {
    var _this = this;
    var originAttrs = this.attrs;
    var attrs = {};
    each(originAttrs, function(i, k) {
      if (isArray$1(originAttrs[k])) {
        attrs[k] = _cloneArrayAttr(originAttrs[k]);
      } else {
        attrs[k] = originAttrs[k];
      }
    });
    var cons = this.constructor;
    var clone2 = new cons({ attrs });
    each(CLONE_CFGS, function(cfgName) {
      clone2.set(cfgName, _this.get(cfgName));
    });
    return clone2;
  };
  Element2.prototype.destroy = function() {
    var destroyed = this.destroyed;
    if (destroyed) {
      return;
    }
    this.attrs = {};
    _super.prototype.destroy.call(this);
  };
  Element2.prototype.isAnimatePaused = function() {
    return this.get("_pause").isPaused;
  };
  Element2.prototype.animate = function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (!this.get("timeline") && !this.get("canvas")) {
      return;
    }
    this.set("animating", true);
    var timeline = this.get("timeline");
    if (!timeline) {
      timeline = this.get("canvas").get("timeline");
      this.set("timeline", timeline);
    }
    var animations = this.get("animations") || [];
    if (!timeline.timer) {
      timeline.initTimer();
    }
    var toAttrs = args[0], duration = args[1], _a = args[2], easing = _a === void 0 ? "easeLinear" : _a, _b = args[3], callback = _b === void 0 ? noop : _b, _c = args[4], delay = _c === void 0 ? 0 : _c;
    var onFrame;
    var repeat;
    var pauseCallback;
    var resumeCallback;
    var animateCfg;
    if (isFunction(toAttrs)) {
      onFrame = toAttrs;
      toAttrs = {};
    } else if (isObject$1(toAttrs) && toAttrs.onFrame) {
      onFrame = toAttrs.onFrame;
      repeat = toAttrs.repeat;
    }
    if (isObject$1(duration)) {
      animateCfg = duration;
      duration = animateCfg.duration;
      easing = animateCfg.easing || "easeLinear";
      delay = animateCfg.delay || 0;
      repeat = animateCfg.repeat || repeat || false;
      callback = animateCfg.callback || noop;
      pauseCallback = animateCfg.pauseCallback || noop;
      resumeCallback = animateCfg.resumeCallback || noop;
    } else {
      if (isNumber(callback)) {
        delay = callback;
        callback = null;
      }
      if (isFunction(easing)) {
        callback = easing;
        easing = "easeLinear";
      } else {
        easing = easing || "easeLinear";
      }
    }
    var formatToAttrs = getFormatToAttrs(toAttrs, this);
    var animation = {
      fromAttrs: getFormatFromAttrs(formatToAttrs, this),
      toAttrs: formatToAttrs,
      duration,
      easing,
      repeat,
      callback,
      pauseCallback,
      resumeCallback,
      delay,
      startTime: timeline.getTime(),
      id: uniqueId$1(),
      onFrame,
      pathFormatted: false
    };
    if (animations.length > 0) {
      animations = checkExistedAttrs(animations, animation);
    } else {
      timeline.addAnimator(this);
    }
    animations.push(animation);
    this.set("animations", animations);
    this.set("_pause", { isPaused: false });
  };
  Element2.prototype.stopAnimate = function(toEnd) {
    var _this = this;
    if (toEnd === void 0) {
      toEnd = true;
    }
    var animations = this.get("animations");
    each(animations, function(animation) {
      if (toEnd) {
        if (animation.onFrame) {
          _this.attr(animation.onFrame(1));
        } else {
          _this.attr(animation.toAttrs);
        }
      }
      if (animation.callback) {
        animation.callback();
      }
    });
    this.set("animating", false);
    this.set("animations", []);
  };
  Element2.prototype.pauseAnimate = function() {
    var timeline = this.get("timeline");
    var animations = this.get("animations");
    var pauseTime = timeline.getTime();
    each(animations, function(animation) {
      animation._paused = true;
      animation._pauseTime = pauseTime;
      if (animation.pauseCallback) {
        animation.pauseCallback();
      }
    });
    this.set("_pause", {
      isPaused: true,
      pauseTime
    });
    return this;
  };
  Element2.prototype.resumeAnimate = function() {
    var timeline = this.get("timeline");
    var current = timeline.getTime();
    var animations = this.get("animations");
    var pauseTime = this.get("_pause").pauseTime;
    each(animations, function(animation) {
      animation.startTime = animation.startTime + (current - pauseTime);
      animation._paused = false;
      animation._pauseTime = null;
      if (animation.resumeCallback) {
        animation.resumeCallback();
      }
    });
    this.set("_pause", {
      isPaused: false
    });
    this.set("animations", animations);
    return this;
  };
  Element2.prototype.emitDelegation = function(type, eventObj) {
    var _this = this;
    var paths = eventObj.propagationPath;
    this.getEvents();
    var relativeShape;
    if (type === "mouseenter") {
      relativeShape = eventObj.fromShape;
    } else if (type === "mouseleave") {
      relativeShape = eventObj.toShape;
    }
    var _loop_1 = function(i2) {
      var element = paths[i2];
      var name_1 = element.get("name");
      if (name_1) {
        if ((element.isGroup() || element.isCanvas && element.isCanvas()) && relativeShape && isParent(element, relativeShape)) {
          return "break";
        }
        if (isArray$1(name_1)) {
          each(name_1, function(subName) {
            _this.emitDelegateEvent(element, subName, eventObj);
          });
        } else {
          this_1.emitDelegateEvent(element, name_1, eventObj);
        }
      }
    };
    var this_1 = this;
    for (var i = 0; i < paths.length; i++) {
      var state_1 = _loop_1(i);
      if (state_1 === "break")
        break;
    }
  };
  Element2.prototype.emitDelegateEvent = function(element, name, eventObj) {
    var events = this.getEvents();
    var eventName = name + DELEGATION_SPLIT + eventObj.type;
    if (events[eventName] || events[WILDCARD]) {
      eventObj.name = eventName;
      eventObj.currentTarget = element;
      eventObj.delegateTarget = this;
      eventObj.delegateObject = element.get("delegateObject");
      this.emit(eventName, eventObj);
    }
  };
  Element2.prototype.translate = function(translateX, translateY) {
    if (translateX === void 0) {
      translateX = 0;
    }
    if (translateY === void 0) {
      translateY = 0;
    }
    var matrix = this.getMatrix();
    var newMatrix = transform$3(matrix, [["t", translateX, translateY]]);
    this.setMatrix(newMatrix);
    return this;
  };
  Element2.prototype.move = function(targetX, targetY) {
    var x = this.attr("x") || 0;
    var y = this.attr("y") || 0;
    this.translate(targetX - x, targetY - y);
    return this;
  };
  Element2.prototype.moveTo = function(targetX, targetY) {
    return this.move(targetX, targetY);
  };
  Element2.prototype.scale = function(ratioX, ratioY) {
    var matrix = this.getMatrix();
    var newMatrix = transform$3(matrix, [["s", ratioX, ratioY || ratioX]]);
    this.setMatrix(newMatrix);
    return this;
  };
  Element2.prototype.rotate = function(radian) {
    var matrix = this.getMatrix();
    var newMatrix = transform$3(matrix, [["r", radian]]);
    this.setMatrix(newMatrix);
    return this;
  };
  Element2.prototype.rotateAtStart = function(rotate3) {
    var _a = this.attr(), x = _a.x, y = _a.y;
    var matrix = this.getMatrix();
    var newMatrix = transform$3(matrix, [
      ["t", -x, -y],
      ["r", rotate3],
      ["t", x, y]
    ]);
    this.setMatrix(newMatrix);
    return this;
  };
  Element2.prototype.rotateAtPoint = function(x, y, rotate3) {
    var matrix = this.getMatrix();
    var newMatrix = transform$3(matrix, [
      ["t", -x, -y],
      ["r", rotate3],
      ["t", x, y]
    ]);
    this.setMatrix(newMatrix);
    return this;
  };
  return Element2;
}(Base);
var SHAPE_MAP = {};
var INDEX = "_INDEX";
function setCanvas(element, canvas) {
  element.set("canvas", canvas);
  if (element.isGroup()) {
    var children = element.get("children");
    if (children.length) {
      children.forEach(function(child) {
        setCanvas(child, canvas);
      });
    }
  }
}
function setTimeline(element, timeline) {
  element.set("timeline", timeline);
  if (element.isGroup()) {
    var children = element.get("children");
    if (children.length) {
      children.forEach(function(child) {
        setTimeline(child, timeline);
      });
    }
  }
}
function removeChild(container, element, destroy) {
  if (destroy === void 0) {
    destroy = true;
  }
  if (destroy) {
    element.destroy();
  } else {
    element.set("parent", null);
    element.set("canvas", null);
  }
  removeFromArray(container.getChildren(), element);
}
function getComparer(compare3) {
  return function(left, right) {
    var result = compare3(left, right);
    return result === 0 ? left[INDEX] - right[INDEX] : result;
  };
}
var Container = function(_super) {
  __extends(Container2, _super);
  function Container2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Container2.prototype.isCanvas = function() {
    return false;
  };
  Container2.prototype.getBBox = function() {
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;
    var xArr = [];
    var yArr = [];
    var children = this.getChildren().filter(function(child) {
      return child.get("visible") && (!child.isGroup() || child.isGroup() && child.getChildren().length > 0);
    });
    if (children.length > 0) {
      each(children, function(child) {
        var box2 = child.getBBox();
        xArr.push(box2.minX, box2.maxX);
        yArr.push(box2.minY, box2.maxY);
      });
      minX = min$1(xArr);
      maxX = max$1(xArr);
      minY = min$1(yArr);
      maxY = max$1(yArr);
    } else {
      minX = 0;
      maxX = 0;
      minY = 0;
      maxY = 0;
    }
    var box = {
      x: minX,
      y: minY,
      minX,
      minY,
      maxX,
      maxY,
      width: maxX - minX,
      height: maxY - minY
    };
    return box;
  };
  Container2.prototype.getCanvasBBox = function() {
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;
    var xArr = [];
    var yArr = [];
    var children = this.getChildren().filter(function(child) {
      return child.get("visible") && (!child.isGroup() || child.isGroup() && child.getChildren().length > 0);
    });
    if (children.length > 0) {
      each(children, function(child) {
        var box2 = child.getCanvasBBox();
        xArr.push(box2.minX, box2.maxX);
        yArr.push(box2.minY, box2.maxY);
      });
      minX = min$1(xArr);
      maxX = max$1(xArr);
      minY = min$1(yArr);
      maxY = max$1(yArr);
    } else {
      minX = 0;
      maxX = 0;
      minY = 0;
      maxY = 0;
    }
    var box = {
      x: minX,
      y: minY,
      minX,
      minY,
      maxX,
      maxY,
      width: maxX - minX,
      height: maxY - minY
    };
    return box;
  };
  Container2.prototype.getDefaultCfg = function() {
    var cfg = _super.prototype.getDefaultCfg.call(this);
    cfg["children"] = [];
    return cfg;
  };
  Container2.prototype.onAttrChange = function(name, value, originValue) {
    _super.prototype.onAttrChange.call(this, name, value, originValue);
    if (name === "matrix") {
      var totalMatrix = this.getTotalMatrix();
      this._applyChildrenMarix(totalMatrix);
    }
  };
  Container2.prototype.applyMatrix = function(matrix) {
    var preTotalMatrix = this.getTotalMatrix();
    _super.prototype.applyMatrix.call(this, matrix);
    var totalMatrix = this.getTotalMatrix();
    if (totalMatrix === preTotalMatrix) {
      return;
    }
    this._applyChildrenMarix(totalMatrix);
  };
  Container2.prototype._applyChildrenMarix = function(totalMatrix) {
    var children = this.getChildren();
    each(children, function(child) {
      child.applyMatrix(totalMatrix);
    });
  };
  Container2.prototype.addShape = function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var type = args[0];
    var cfg = args[1];
    if (isObject$1(type)) {
      cfg = type;
    } else {
      cfg["type"] = type;
    }
    var shapeType = SHAPE_MAP[cfg.type];
    if (!shapeType) {
      shapeType = upperFirst(cfg.type);
      SHAPE_MAP[cfg.type] = shapeType;
    }
    var ShapeBase = this.getShapeBase();
    var shape = new ShapeBase[shapeType](cfg);
    this.add(shape);
    return shape;
  };
  Container2.prototype.addGroup = function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var groupClass = args[0], cfg = args[1];
    var group;
    if (isFunction(groupClass)) {
      if (cfg) {
        group = new groupClass(cfg);
      } else {
        group = new groupClass({
          parent: this
        });
      }
    } else {
      var tmpCfg = groupClass || {};
      var TmpGroupClass = this.getGroupBase();
      group = new TmpGroupClass(tmpCfg);
    }
    this.add(group);
    return group;
  };
  Container2.prototype.getCanvas = function() {
    var canvas;
    if (this.isCanvas()) {
      canvas = this;
    } else {
      canvas = this.get("canvas");
    }
    return canvas;
  };
  Container2.prototype.getShape = function(x, y, ev) {
    if (!isAllowCapture(this)) {
      return null;
    }
    var children = this.getChildren();
    var shape;
    if (!this.isCanvas()) {
      var v = [x, y, 1];
      v = this.invertFromMatrix(v);
      if (!this.isClipped(v[0], v[1])) {
        shape = this._findShape(children, v[0], v[1], ev);
      }
    } else {
      shape = this._findShape(children, x, y, ev);
    }
    return shape;
  };
  Container2.prototype._findShape = function(children, x, y, ev) {
    var shape = null;
    for (var i = children.length - 1; i >= 0; i--) {
      var child = children[i];
      if (isAllowCapture(child)) {
        if (child.isGroup()) {
          shape = child.getShape(x, y, ev);
        } else if (child.isHit(x, y)) {
          shape = child;
        }
      }
      if (shape) {
        break;
      }
    }
    return shape;
  };
  Container2.prototype.add = function(element) {
    var canvas = this.getCanvas();
    var children = this.getChildren();
    var timeline = this.get("timeline");
    var preParent = element.getParent();
    if (preParent) {
      removeChild(preParent, element, false);
    }
    element.set("parent", this);
    if (canvas) {
      setCanvas(element, canvas);
    }
    if (timeline) {
      setTimeline(element, timeline);
    }
    children.push(element);
    element.onCanvasChange("add");
    this._applyElementMatrix(element);
  };
  Container2.prototype._applyElementMatrix = function(element) {
    var totalMatrix = this.getTotalMatrix();
    if (totalMatrix) {
      element.applyMatrix(totalMatrix);
    }
  };
  Container2.prototype.getChildren = function() {
    return this.get("children");
  };
  Container2.prototype.sort = function() {
    var children = this.getChildren();
    each(children, function(child, index) {
      child[INDEX] = index;
      return child;
    });
    children.sort(getComparer(function(obj1, obj2) {
      return obj1.get("zIndex") - obj2.get("zIndex");
    }));
    this.onCanvasChange("sort");
  };
  Container2.prototype.clear = function() {
    this.set("clearing", true);
    if (this.destroyed) {
      return;
    }
    var children = this.getChildren();
    for (var i = children.length - 1; i >= 0; i--) {
      children[i].destroy();
    }
    this.set("children", []);
    this.onCanvasChange("clear");
    this.set("clearing", false);
  };
  Container2.prototype.destroy = function() {
    if (this.get("destroyed")) {
      return;
    }
    this.clear();
    _super.prototype.destroy.call(this);
  };
  Container2.prototype.getFirst = function() {
    return this.getChildByIndex(0);
  };
  Container2.prototype.getLast = function() {
    var children = this.getChildren();
    return this.getChildByIndex(children.length - 1);
  };
  Container2.prototype.getChildByIndex = function(index) {
    var children = this.getChildren();
    return children[index];
  };
  Container2.prototype.getCount = function() {
    var children = this.getChildren();
    return children.length;
  };
  Container2.prototype.contain = function(element) {
    var children = this.getChildren();
    return children.indexOf(element) > -1;
  };
  Container2.prototype.removeChild = function(element, destroy) {
    if (destroy === void 0) {
      destroy = true;
    }
    if (this.contain(element)) {
      element.remove(destroy);
    }
  };
  Container2.prototype.findAll = function(fn) {
    var rst = [];
    var children = this.getChildren();
    each(children, function(element) {
      if (fn(element)) {
        rst.push(element);
      }
      if (element.isGroup()) {
        rst = rst.concat(element.findAll(fn));
      }
    });
    return rst;
  };
  Container2.prototype.find = function(fn) {
    var rst = null;
    var children = this.getChildren();
    each(children, function(element) {
      if (fn(element)) {
        rst = element;
      } else if (element.isGroup()) {
        rst = element.find(fn);
      }
      if (rst) {
        return false;
      }
    });
    return rst;
  };
  Container2.prototype.findById = function(id) {
    return this.find(function(element) {
      return element.get("id") === id;
    });
  };
  Container2.prototype.findByClassName = function(className) {
    return this.find(function(element) {
      return element.get("className") === className;
    });
  };
  Container2.prototype.findAllByName = function(name) {
    return this.findAll(function(element) {
      return element.get("name") === name;
    });
  };
  return Container2;
}(Element);
var frame = 0, timeout = 0, interval = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer$1.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail)
        taskTail._next = this;
      else
        taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer$1(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0)
      t._call.call(null, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay)
    clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time)
        time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame)
    return;
  if (timeout)
    timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity)
      timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval)
      interval = clearInterval(interval);
  } else {
    if (!interval)
      clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}
function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"), reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"), reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"), reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"), reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"), reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb$1(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define(Rgb, rgb$1, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0)
    h = s = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s = NaN;
  else if (s <= 0)
    h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min2, l = (max2 + min2) / 2;
  if (s) {
    if (r === max2)
      h = (g - b) / s + (g < b) * 6;
    else if (g === max2)
      h = (b - r) / s + 2;
    else
      h = (r - g) / s + 4;
    s /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define(Hsl, hsl, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
function constant(x) {
  return function() {
    return x;
  };
}
function linear$1(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear$1(a, d) : constant(isNaN(a) ? b : a);
}
var rgb = function rgbGamma(y) {
  var color2 = gamma(y);
  function rgb2(start, end) {
    var r = color2((start = rgb$1(start)).r, (end = rgb$1(end)).r), g = color2(start.g, end.g), b = color2(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function numberArray(a, b) {
  if (!b)
    b = [];
  var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
  return function(t) {
    for (i = 0; i < n; ++i)
      c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
function interpolateArray(a, b) {
  return (isNumberArray(b) ? numberArray : genericArray)(a, b);
}
function genericArray(a, b) {
  var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
  for (i = 0; i < na; ++i)
    x[i] = interpolate(a[i], b[i]);
  for (; i < nb; ++i)
    c[i] = b[i];
  return function(t) {
    for (i = 0; i < na; ++i)
      c[i] = x[i](t);
    return c;
  };
}
function date(a, b) {
  var d = new Date();
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}
function number(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}
function object(a, b) {
  var i = {}, c = {}, k;
  if (a === null || typeof a !== "object")
    a = {};
  if (b === null || typeof b !== "object")
    b = {};
  for (k in b) {
    if (k in a) {
      i[k] = interpolate(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }
  return function(t) {
    for (k in i)
      c[k] = i[k](t);
    return c;
  };
}
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i])
        s[i] += bs;
      else
        s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i])
        s[i] += bm;
      else
        s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: number(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i])
      s[i] += bs;
    else
      s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2)
      s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}
function interpolate(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant(b) : (t === "number" ? number : t === "string" ? (c = color(b)) ? (b = c, rgb) : string : b instanceof color ? rgb : b instanceof Date ? date : isNumberArray(b) ? numberArray : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : number)(a, b);
}
function linear(t) {
  return +t;
}
function quadIn(t) {
  return t * t;
}
function quadOut(t) {
  return t * (2 - t);
}
function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}
function cubicIn(t) {
  return t * t * t;
}
function cubicOut(t) {
  return --t * t * t + 1;
}
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var exponent = 3;
var polyIn = function custom(e) {
  e = +e;
  function polyIn2(t) {
    return Math.pow(t, e);
  }
  polyIn2.exponent = custom;
  return polyIn2;
}(exponent);
var polyOut = function custom2(e) {
  e = +e;
  function polyOut2(t) {
    return 1 - Math.pow(1 - t, e);
  }
  polyOut2.exponent = custom2;
  return polyOut2;
}(exponent);
var polyInOut = function custom3(e) {
  e = +e;
  function polyInOut2(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }
  polyInOut2.exponent = custom3;
  return polyInOut2;
}(exponent);
var pi = Math.PI, halfPi = pi / 2;
function sinIn(t) {
  return +t === 1 ? 1 : 1 - Math.cos(t * halfPi);
}
function sinOut(t) {
  return Math.sin(t * halfPi);
}
function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}
function tpmt(x) {
  return (Math.pow(2, -10 * x) - 9765625e-10) * 1.0009775171065494;
}
function expIn(t) {
  return tpmt(1 - +t);
}
function expOut(t) {
  return 1 - tpmt(t);
}
function expInOut(t) {
  return ((t *= 2) <= 1 ? tpmt(1 - t) : 2 - tpmt(t - 1)) / 2;
}
function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}
function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}
function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}
var b1 = 4 / 11, b2 = 6 / 11, b3 = 8 / 11, b4 = 3 / 4, b5 = 9 / 11, b6 = 10 / 11, b7 = 15 / 16, b8 = 21 / 22, b9 = 63 / 64, b0 = 1 / b1 / b1;
function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}
function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}
function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}
var overshoot = 1.70158;
var backIn = function custom4(s) {
  s = +s;
  function backIn2(t) {
    return (t = +t) * t * (s * (t - 1) + t);
  }
  backIn2.overshoot = custom4;
  return backIn2;
}(overshoot);
var backOut = function custom5(s) {
  s = +s;
  function backOut2(t) {
    return --t * t * ((t + 1) * s + t) + 1;
  }
  backOut2.overshoot = custom5;
  return backOut2;
}(overshoot);
var backInOut = function custom6(s) {
  s = +s;
  function backInOut2(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }
  backInOut2.overshoot = custom6;
  return backInOut2;
}(overshoot);
var tau = 2 * Math.PI, amplitude = 1, period = 0.3;
var elasticIn = function custom7(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
  function elasticIn2(t) {
    return a * tpmt(- --t) * Math.sin((s - t) / p);
  }
  elasticIn2.amplitude = function(a2) {
    return custom7(a2, p * tau);
  };
  elasticIn2.period = function(p2) {
    return custom7(a, p2);
  };
  return elasticIn2;
}(amplitude, period);
var elasticOut = function custom8(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
  function elasticOut2(t) {
    return 1 - a * tpmt(t = +t) * Math.sin((t + s) / p);
  }
  elasticOut2.amplitude = function(a2) {
    return custom8(a2, p * tau);
  };
  elasticOut2.period = function(p2) {
    return custom8(a, p2);
  };
  return elasticOut2;
}(amplitude, period);
var elasticInOut = function custom9(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
  function elasticInOut2(t) {
    return ((t = t * 2 - 1) < 0 ? a * tpmt(-t) * Math.sin((s - t) / p) : 2 - a * tpmt(t) * Math.sin((s + t) / p)) / 2;
  }
  elasticInOut2.amplitude = function(a2) {
    return custom9(a2, p * tau);
  };
  elasticInOut2.period = function(p2) {
    return custom9(a, p2);
  };
  return elasticInOut2;
}(amplitude, period);
var d3Ease = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  easeLinear: linear,
  easeQuad: quadInOut,
  easeQuadIn: quadIn,
  easeQuadOut: quadOut,
  easeQuadInOut: quadInOut,
  easeCubic: cubicInOut,
  easeCubicIn: cubicIn,
  easeCubicOut: cubicOut,
  easeCubicInOut: cubicInOut,
  easePoly: polyInOut,
  easePolyIn: polyIn,
  easePolyOut: polyOut,
  easePolyInOut: polyInOut,
  easeSin: sinInOut,
  easeSinIn: sinIn,
  easeSinOut: sinOut,
  easeSinInOut: sinInOut,
  easeExp: expInOut,
  easeExpIn: expIn,
  easeExpOut: expOut,
  easeExpInOut: expInOut,
  easeCircle: circleInOut,
  easeCircleIn: circleIn,
  easeCircleOut: circleOut,
  easeCircleInOut: circleInOut,
  easeBounce: bounceOut,
  easeBounceIn: bounceIn,
  easeBounceOut: bounceOut,
  easeBounceInOut: bounceInOut,
  easeBack: backInOut,
  easeBackIn: backIn,
  easeBackOut: backOut,
  easeBackInOut: backInOut,
  easeElastic: elasticOut,
  easeElasticIn: elasticIn,
  easeElasticOut: elasticOut,
  easeElasticInOut: elasticInOut
}, Symbol.toStringTag, { value: "Module" }));
var EASING_MAP = {};
function getEasing(type) {
  return EASING_MAP[type.toLowerCase()] || d3Ease[type];
}
var isColorProp = function(prop) {
  return ["fill", "stroke", "fillStyle", "strokeStyle"].includes(prop);
};
var isGradientColor = function(val) {
  return /^[r,R,L,l]{1}[\s]*\(/.test(val);
};
var IDENTITY_MATRIX = [1, 0, 0, 0, 1, 0, 0, 0, 1];
function _update(shape, animation, ratio) {
  var cProps = {};
  var fromAttrs = animation.fromAttrs, toAttrs = animation.toAttrs;
  if (shape.destroyed) {
    return;
  }
  var interf;
  for (var k in toAttrs) {
    if (!isEqual$1(fromAttrs[k], toAttrs[k])) {
      if (k === "path") {
        var toPath = toAttrs[k];
        var fromPath = fromAttrs[k];
        if (toPath.length > fromPath.length) {
          toPath = parsePathString$1(toAttrs[k]);
          fromPath = parsePathString$1(fromAttrs[k]);
          fromPath = fillPathByDiff(fromPath, toPath);
          fromPath = formatPath(fromPath, toPath);
          animation.fromAttrs.path = fromPath;
          animation.toAttrs.path = toPath;
        } else if (!animation.pathFormatted) {
          toPath = parsePathString$1(toAttrs[k]);
          fromPath = parsePathString$1(fromAttrs[k]);
          fromPath = formatPath(fromPath, toPath);
          animation.fromAttrs.path = fromPath;
          animation.toAttrs.path = toPath;
          animation.pathFormatted = true;
        }
        cProps[k] = [];
        for (var i = 0; i < toPath.length; i++) {
          var toPathPoint = toPath[i];
          var fromPathPoint = fromPath[i];
          var cPathPoint = [];
          for (var j = 0; j < toPathPoint.length; j++) {
            if (isNumber(toPathPoint[j]) && fromPathPoint && isNumber(fromPathPoint[j])) {
              interf = interpolate(fromPathPoint[j], toPathPoint[j]);
              cPathPoint.push(interf(ratio));
            } else {
              cPathPoint.push(toPathPoint[j]);
            }
          }
          cProps[k].push(cPathPoint);
        }
      } else if (k === "matrix") {
        var matrixFn = interpolateArray(fromAttrs[k] || IDENTITY_MATRIX, toAttrs[k] || IDENTITY_MATRIX);
        var currentMatrix = matrixFn(ratio);
        cProps[k] = currentMatrix;
      } else if (isColorProp(k) && isGradientColor(toAttrs[k])) {
        cProps[k] = toAttrs[k];
      } else if (!isFunction(toAttrs[k])) {
        interf = interpolate(fromAttrs[k], toAttrs[k]);
        cProps[k] = interf(ratio);
      }
    }
  }
  shape.attr(cProps);
}
function update$1(shape, animation, elapsed) {
  var startTime = animation.startTime, delay = animation.delay;
  if (elapsed < startTime + delay || animation._paused) {
    return false;
  }
  var ratio;
  var duration = animation.duration;
  var easing = animation.easing;
  var easeFn = getEasing(easing);
  elapsed = elapsed - startTime - animation.delay;
  if (animation.repeat) {
    ratio = elapsed % duration / duration;
    ratio = easeFn(ratio);
  } else {
    ratio = elapsed / duration;
    if (ratio < 1) {
      ratio = easeFn(ratio);
    } else {
      if (animation.onFrame) {
        shape.attr(animation.onFrame(1));
      } else {
        shape.attr(animation.toAttrs);
      }
      return true;
    }
  }
  if (animation.onFrame) {
    var attrs = animation.onFrame(ratio);
    shape.attr(attrs);
  } else {
    _update(shape, animation, ratio);
  }
  return false;
}
var Timeline = function() {
  function Timeline2(canvas) {
    this.animators = [];
    this.current = 0;
    this.timer = null;
    this.canvas = canvas;
  }
  Timeline2.prototype.initTimer = function() {
    var _this = this;
    var isFinished = false;
    var shape;
    var animations;
    var animation;
    this.timer = timer$1(function(elapsed) {
      _this.current = elapsed;
      if (_this.animators.length > 0) {
        for (var i = _this.animators.length - 1; i >= 0; i--) {
          shape = _this.animators[i];
          if (shape.destroyed) {
            _this.removeAnimator(i);
            continue;
          }
          if (!shape.isAnimatePaused()) {
            animations = shape.get("animations");
            for (var j = animations.length - 1; j >= 0; j--) {
              animation = animations[j];
              isFinished = update$1(shape, animation, elapsed);
              if (isFinished) {
                animations.splice(j, 1);
                isFinished = false;
                if (animation.callback) {
                  animation.callback();
                }
              }
            }
          }
          if (animations.length === 0) {
            _this.removeAnimator(i);
          }
        }
        var autoDraw = _this.canvas.get("autoDraw");
        if (!autoDraw) {
          _this.canvas.draw();
        }
      }
    });
  };
  Timeline2.prototype.addAnimator = function(shape) {
    this.animators.push(shape);
  };
  Timeline2.prototype.removeAnimator = function(index) {
    this.animators.splice(index, 1);
  };
  Timeline2.prototype.isAnimating = function() {
    return !!this.animators.length;
  };
  Timeline2.prototype.stop = function() {
    if (this.timer) {
      this.timer.stop();
    }
  };
  Timeline2.prototype.stopAllAnimations = function(toEnd) {
    if (toEnd === void 0) {
      toEnd = true;
    }
    this.animators.forEach(function(animator) {
      animator.stopAnimate(toEnd);
    });
    this.animators = [];
    this.canvas.draw();
  };
  Timeline2.prototype.getTime = function() {
    return this.current;
  };
  return Timeline2;
}();
var CLICK_OFFSET = 40;
var LEFT_BTN_CODE = 0;
var EVENTS = [
  "mousedown",
  "mouseup",
  "dblclick",
  "mouseout",
  "mouseover",
  "mousemove",
  "mouseleave",
  "mouseenter",
  "touchstart",
  "touchmove",
  "touchend",
  "dragenter",
  "dragover",
  "dragleave",
  "drop",
  "contextmenu",
  "mousewheel"
];
function emitTargetEvent(target, type, eventObj) {
  eventObj.name = type;
  eventObj.target = target;
  eventObj.currentTarget = target;
  eventObj.delegateTarget = target;
  target.emit(type, eventObj);
}
function bubbleEvent(container, type, eventObj) {
  if (eventObj.bubbles) {
    var relativeShape = void 0;
    var isOverEvent = false;
    if (type === "mouseenter") {
      relativeShape = eventObj.fromShape;
      isOverEvent = true;
    } else if (type === "mouseleave") {
      isOverEvent = true;
      relativeShape = eventObj.toShape;
    }
    if (container.isCanvas() && isOverEvent) {
      return;
    }
    if (relativeShape && isParent(container, relativeShape)) {
      eventObj.bubbles = false;
      return;
    }
    eventObj.name = type;
    eventObj.currentTarget = container;
    eventObj.delegateTarget = container;
    container.emit(type, eventObj);
  }
}
var EventController = function() {
  function EventController2(cfg) {
    var _this = this;
    this.draggingShape = null;
    this.dragging = false;
    this.currentShape = null;
    this.mousedownShape = null;
    this.mousedownPoint = null;
    this._eventCallback = function(ev) {
      var type = ev.type;
      _this._triggerEvent(type, ev);
    };
    this._onDocumentMove = function(ev) {
      var canvas = _this.canvas;
      var el = canvas.get("el");
      if (el !== ev.target) {
        if (_this.dragging || _this.currentShape) {
          var pointInfo = _this._getPointInfo(ev);
          if (_this.dragging) {
            _this._emitEvent("drag", ev, pointInfo, _this.draggingShape);
          }
        }
      }
    };
    this._onDocumentMouseUp = function(ev) {
      var canvas = _this.canvas;
      var el = canvas.get("el");
      if (el !== ev.target) {
        if (_this.dragging) {
          var pointInfo = _this._getPointInfo(ev);
          if (_this.draggingShape) {
            _this._emitEvent("drop", ev, pointInfo, null);
          }
          _this._emitEvent("dragend", ev, pointInfo, _this.draggingShape);
          _this._afterDrag(_this.draggingShape, pointInfo, ev);
        }
      }
    };
    this.canvas = cfg.canvas;
  }
  EventController2.prototype.init = function() {
    this._bindEvents();
  };
  EventController2.prototype._bindEvents = function() {
    var _this = this;
    var el = this.canvas.get("el");
    each(EVENTS, function(eventName) {
      el.addEventListener(eventName, _this._eventCallback);
    });
    if (document) {
      document.addEventListener("mousemove", this._onDocumentMove);
      document.addEventListener("mouseup", this._onDocumentMouseUp);
    }
  };
  EventController2.prototype._clearEvents = function() {
    var _this = this;
    var el = this.canvas.get("el");
    each(EVENTS, function(eventName) {
      el.removeEventListener(eventName, _this._eventCallback);
    });
    if (document) {
      document.removeEventListener("mousemove", this._onDocumentMove);
      document.removeEventListener("mouseup", this._onDocumentMouseUp);
    }
  };
  EventController2.prototype._getEventObj = function(type, event, point, target, fromShape, toShape) {
    var eventObj = new GraphEvent(type, event);
    eventObj.fromShape = fromShape;
    eventObj.toShape = toShape;
    eventObj.x = point.x;
    eventObj.y = point.y;
    eventObj.clientX = point.clientX;
    eventObj.clientY = point.clientY;
    eventObj.propagationPath.push(target);
    return eventObj;
  };
  EventController2.prototype._getShape = function(point, ev) {
    return this.canvas.getShape(point.x, point.y, ev);
  };
  EventController2.prototype._getPointInfo = function(ev) {
    var canvas = this.canvas;
    var clientPoint = canvas.getClientByEvent(ev);
    var point = canvas.getPointByEvent(ev);
    return {
      x: point.x,
      y: point.y,
      clientX: clientPoint.x,
      clientY: clientPoint.y
    };
  };
  EventController2.prototype._triggerEvent = function(type, ev) {
    var pointInfo = this._getPointInfo(ev);
    var shape = this._getShape(pointInfo, ev);
    var method = this["_on" + type];
    var leaveCanvas = false;
    if (method) {
      method.call(this, pointInfo, shape, ev);
    } else {
      var preShape = this.currentShape;
      if (type === "mouseenter" || type === "dragenter" || type === "mouseover") {
        this._emitEvent(type, ev, pointInfo, null, null, shape);
        if (shape) {
          this._emitEvent(type, ev, pointInfo, shape, null, shape);
        }
        if (type === "mouseenter" && this.draggingShape) {
          this._emitEvent("dragenter", ev, pointInfo, null);
        }
      } else if (type === "mouseleave" || type === "dragleave" || type === "mouseout") {
        leaveCanvas = true;
        if (preShape) {
          this._emitEvent(type, ev, pointInfo, preShape, preShape, null);
        }
        this._emitEvent(type, ev, pointInfo, null, preShape, null);
        if (type === "mouseleave" && this.draggingShape) {
          this._emitEvent("dragleave", ev, pointInfo, null);
        }
      } else {
        this._emitEvent(type, ev, pointInfo, shape, null, null);
      }
    }
    if (!leaveCanvas) {
      this.currentShape = shape;
    }
    if (shape && !shape.get("destroyed")) {
      var canvas = this.canvas;
      var el = canvas.get("el");
      el.style.cursor = shape.attr("cursor") || canvas.get("cursor");
    }
  };
  EventController2.prototype._onmousedown = function(pointInfo, shape, event) {
    if (event.button === LEFT_BTN_CODE) {
      this.mousedownShape = shape;
      this.mousedownPoint = pointInfo;
      this.mousedownTimeStamp = event.timeStamp;
    }
    this._emitEvent("mousedown", event, pointInfo, shape, null, null);
  };
  EventController2.prototype._emitMouseoverEvents = function(event, pointInfo, fromShape, toShape) {
    var el = this.canvas.get("el");
    if (fromShape !== toShape) {
      if (fromShape) {
        this._emitEvent("mouseout", event, pointInfo, fromShape, fromShape, toShape);
        this._emitEvent("mouseleave", event, pointInfo, fromShape, fromShape, toShape);
        if (!toShape || toShape.get("destroyed")) {
          el.style.cursor = this.canvas.get("cursor");
        }
      }
      if (toShape) {
        this._emitEvent("mouseover", event, pointInfo, toShape, fromShape, toShape);
        this._emitEvent("mouseenter", event, pointInfo, toShape, fromShape, toShape);
      }
    }
  };
  EventController2.prototype._emitDragoverEvents = function(event, pointInfo, fromShape, toShape, isCanvasEmit) {
    if (toShape) {
      if (toShape !== fromShape) {
        if (fromShape) {
          this._emitEvent("dragleave", event, pointInfo, fromShape, fromShape, toShape);
        }
        this._emitEvent("dragenter", event, pointInfo, toShape, fromShape, toShape);
      }
      if (!isCanvasEmit) {
        this._emitEvent("dragover", event, pointInfo, toShape);
      }
    } else if (fromShape) {
      this._emitEvent("dragleave", event, pointInfo, fromShape, fromShape, toShape);
    }
    if (isCanvasEmit) {
      this._emitEvent("dragover", event, pointInfo, toShape);
    }
  };
  EventController2.prototype._afterDrag = function(draggingShape, pointInfo, event) {
    if (draggingShape) {
      draggingShape.set("capture", true);
      this.draggingShape = null;
    }
    this.dragging = false;
    var shape = this._getShape(pointInfo, event);
    if (shape !== draggingShape) {
      this._emitMouseoverEvents(event, pointInfo, draggingShape, shape);
    }
    this.currentShape = shape;
  };
  EventController2.prototype._onmouseup = function(pointInfo, shape, event) {
    if (event.button === LEFT_BTN_CODE) {
      var draggingShape = this.draggingShape;
      if (this.dragging) {
        if (draggingShape) {
          this._emitEvent("drop", event, pointInfo, shape);
        }
        this._emitEvent("dragend", event, pointInfo, draggingShape);
        this._afterDrag(draggingShape, pointInfo, event);
      } else {
        this._emitEvent("mouseup", event, pointInfo, shape);
        if (shape === this.mousedownShape) {
          this._emitEvent("click", event, pointInfo, shape);
        }
        this.mousedownShape = null;
        this.mousedownPoint = null;
      }
    }
  };
  EventController2.prototype._ondragover = function(pointInfo, shape, event) {
    event.preventDefault();
    var preShape = this.currentShape;
    this._emitDragoverEvents(event, pointInfo, preShape, shape, true);
  };
  EventController2.prototype._onmousemove = function(pointInfo, shape, event) {
    var canvas = this.canvas;
    var preShape = this.currentShape;
    var draggingShape = this.draggingShape;
    if (this.dragging) {
      if (draggingShape) {
        this._emitDragoverEvents(event, pointInfo, preShape, shape, false);
      }
      this._emitEvent("drag", event, pointInfo, draggingShape);
    } else {
      var mousedownPoint = this.mousedownPoint;
      if (mousedownPoint) {
        var mousedownShape = this.mousedownShape;
        var now2 = event.timeStamp;
        var timeWindow = now2 - this.mousedownTimeStamp;
        var dx = mousedownPoint.clientX - pointInfo.clientX;
        var dy = mousedownPoint.clientY - pointInfo.clientY;
        var dist = dx * dx + dy * dy;
        if (timeWindow > 120 || dist > CLICK_OFFSET) {
          if (mousedownShape && mousedownShape.get("draggable")) {
            draggingShape = this.mousedownShape;
            draggingShape.set("capture", false);
            this.draggingShape = draggingShape;
            this.dragging = true;
            this._emitEvent("dragstart", event, pointInfo, draggingShape);
            this.mousedownShape = null;
            this.mousedownPoint = null;
          } else if (!mousedownShape && canvas.get("draggable")) {
            this.dragging = true;
            this._emitEvent("dragstart", event, pointInfo, null);
            this.mousedownShape = null;
            this.mousedownPoint = null;
          } else {
            this._emitMouseoverEvents(event, pointInfo, preShape, shape);
            this._emitEvent("mousemove", event, pointInfo, shape);
          }
        } else {
          this._emitMouseoverEvents(event, pointInfo, preShape, shape);
          this._emitEvent("mousemove", event, pointInfo, shape);
        }
      } else {
        this._emitMouseoverEvents(event, pointInfo, preShape, shape);
        this._emitEvent("mousemove", event, pointInfo, shape);
      }
    }
  };
  EventController2.prototype._emitEvent = function(type, event, pointInfo, shape, fromShape, toShape) {
    var eventObj = this._getEventObj(type, event, pointInfo, shape, fromShape, toShape);
    if (shape) {
      eventObj.shape = shape;
      emitTargetEvent(shape, type, eventObj);
      var parent_1 = shape.getParent();
      while (parent_1) {
        parent_1.emitDelegation(type, eventObj);
        if (!eventObj.propagationStopped) {
          bubbleEvent(parent_1, type, eventObj);
        }
        eventObj.propagationPath.push(parent_1);
        parent_1 = parent_1.getParent();
      }
    } else {
      var canvas = this.canvas;
      emitTargetEvent(canvas, type, eventObj);
    }
  };
  EventController2.prototype.destroy = function() {
    this._clearEvents();
    this.canvas = null;
    this.currentShape = null;
    this.draggingShape = null;
    this.mousedownPoint = null;
    this.mousedownShape = null;
    this.mousedownTimeStamp = null;
  };
  return EventController2;
}();
var PX_SUFFIX = "px";
var browser = detect();
var isFirefox = browser && browser.name === "firefox";
(function(_super) {
  __extends(Canvas, _super);
  function Canvas(cfg) {
    var _this = _super.call(this, cfg) || this;
    _this.initContainer();
    _this.initDom();
    _this.initEvents();
    _this.initTimeline();
    return _this;
  }
  Canvas.prototype.getDefaultCfg = function() {
    var cfg = _super.prototype.getDefaultCfg.call(this);
    cfg["cursor"] = "default";
    cfg["supportCSSTransform"] = false;
    return cfg;
  };
  Canvas.prototype.initContainer = function() {
    var container = this.get("container");
    if (isString(container)) {
      container = document.getElementById(container);
      this.set("container", container);
    }
  };
  Canvas.prototype.initDom = function() {
    var el = this.createDom();
    this.set("el", el);
    var container = this.get("container");
    container.appendChild(el);
    this.setDOMSize(this.get("width"), this.get("height"));
  };
  Canvas.prototype.initEvents = function() {
    var eventController = new EventController({
      canvas: this
    });
    eventController.init();
    this.set("eventController", eventController);
  };
  Canvas.prototype.initTimeline = function() {
    var timeline = new Timeline(this);
    this.set("timeline", timeline);
  };
  Canvas.prototype.setDOMSize = function(width, height) {
    var el = this.get("el");
    if (isBrowser) {
      el.style.width = width + PX_SUFFIX;
      el.style.height = height + PX_SUFFIX;
    }
  };
  Canvas.prototype.changeSize = function(width, height) {
    this.setDOMSize(width, height);
    this.set("width", width);
    this.set("height", height);
    this.onCanvasChange("changeSize");
  };
  Canvas.prototype.getRenderer = function() {
    return this.get("renderer");
  };
  Canvas.prototype.getCursor = function() {
    return this.get("cursor");
  };
  Canvas.prototype.setCursor = function(cursor) {
    this.set("cursor", cursor);
    var el = this.get("el");
    if (isBrowser && el) {
      el.style.cursor = cursor;
    }
  };
  Canvas.prototype.getPointByEvent = function(ev) {
    var supportCSSTransform = this.get("supportCSSTransform");
    if (supportCSSTransform) {
      if (isFirefox && !isNil(ev.layerX) && ev.layerX !== ev.offsetX) {
        return {
          x: ev.layerX,
          y: ev.layerY
        };
      }
      if (!isNil(ev.offsetX)) {
        return {
          x: ev.offsetX,
          y: ev.offsetY
        };
      }
    }
    var _a = this.getClientByEvent(ev), clientX = _a.x, clientY = _a.y;
    return this.getPointByClient(clientX, clientY);
  };
  Canvas.prototype.getClientByEvent = function(ev) {
    var clientInfo = ev;
    if (ev.touches) {
      if (ev.type === "touchend") {
        clientInfo = ev.changedTouches[0];
      } else {
        clientInfo = ev.touches[0];
      }
    }
    return {
      x: clientInfo.clientX,
      y: clientInfo.clientY
    };
  };
  Canvas.prototype.getPointByClient = function(clientX, clientY) {
    var el = this.get("el");
    var bbox = el.getBoundingClientRect();
    return {
      x: clientX - bbox.left,
      y: clientY - bbox.top
    };
  };
  Canvas.prototype.getClientByPoint = function(x, y) {
    var el = this.get("el");
    var bbox = el.getBoundingClientRect();
    return {
      x: x + bbox.left,
      y: y + bbox.top
    };
  };
  Canvas.prototype.draw = function() {
  };
  Canvas.prototype.removeDom = function() {
    var el = this.get("el");
    el.parentNode.removeChild(el);
  };
  Canvas.prototype.clearEvents = function() {
    var eventController = this.get("eventController");
    eventController.destroy();
  };
  Canvas.prototype.isCanvas = function() {
    return true;
  };
  Canvas.prototype.getParent = function() {
    return null;
  };
  Canvas.prototype.destroy = function() {
    var timeline = this.get("timeline");
    if (this.get("destroyed")) {
      return;
    }
    this.clear();
    if (timeline) {
      timeline.stop();
    }
    this.clearEvents();
    this.removeDom();
    _super.prototype.destroy.call(this);
  };
  return Canvas;
})(Container);
(function(_super) {
  __extends(AbstractGroup, _super);
  function AbstractGroup() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  AbstractGroup.prototype.isGroup = function() {
    return true;
  };
  AbstractGroup.prototype.isEntityGroup = function() {
    return false;
  };
  AbstractGroup.prototype.clone = function() {
    var clone2 = _super.prototype.clone.call(this);
    var children = this.getChildren();
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      clone2.add(child.clone());
    }
    return clone2;
  };
  return AbstractGroup;
})(Container);
(function(_super) {
  __extends(AbstractShape, _super);
  function AbstractShape(cfg) {
    return _super.call(this, cfg) || this;
  }
  AbstractShape.prototype._isInBBox = function(refX, refY) {
    var bbox = this.getBBox();
    return bbox.minX <= refX && bbox.maxX >= refX && bbox.minY <= refY && bbox.maxY >= refY;
  };
  AbstractShape.prototype.afterAttrsChange = function(targetAttrs) {
    _super.prototype.afterAttrsChange.call(this, targetAttrs);
    this.clearCacheBBox();
  };
  AbstractShape.prototype.getBBox = function() {
    var bbox = this.cfg.bbox;
    if (!bbox) {
      bbox = this.calculateBBox();
      this.set("bbox", bbox);
    }
    return bbox;
  };
  AbstractShape.prototype.getCanvasBBox = function() {
    var canvasBBox = this.cfg.canvasBBox;
    if (!canvasBBox) {
      canvasBBox = this.calculateCanvasBBox();
      this.set("canvasBBox", canvasBBox);
    }
    return canvasBBox;
  };
  AbstractShape.prototype.applyMatrix = function(matrix) {
    _super.prototype.applyMatrix.call(this, matrix);
    this.set("canvasBBox", null);
  };
  AbstractShape.prototype.calculateCanvasBBox = function() {
    var bbox = this.getBBox();
    var totalMatrix = this.getTotalMatrix();
    var minX = bbox.minX, minY = bbox.minY, maxX = bbox.maxX, maxY = bbox.maxY;
    if (totalMatrix) {
      var topLeft = multiplyVec2(totalMatrix, [bbox.minX, bbox.minY]);
      var topRight = multiplyVec2(totalMatrix, [bbox.maxX, bbox.minY]);
      var bottomLeft = multiplyVec2(totalMatrix, [bbox.minX, bbox.maxY]);
      var bottomRight = multiplyVec2(totalMatrix, [bbox.maxX, bbox.maxY]);
      minX = Math.min(topLeft[0], topRight[0], bottomLeft[0], bottomRight[0]);
      maxX = Math.max(topLeft[0], topRight[0], bottomLeft[0], bottomRight[0]);
      minY = Math.min(topLeft[1], topRight[1], bottomLeft[1], bottomRight[1]);
      maxY = Math.max(topLeft[1], topRight[1], bottomLeft[1], bottomRight[1]);
    }
    var attrs = this.attrs;
    if (attrs.shadowColor) {
      var _a = attrs.shadowBlur, shadowBlur = _a === void 0 ? 0 : _a, _b = attrs.shadowOffsetX, shadowOffsetX = _b === void 0 ? 0 : _b, _c = attrs.shadowOffsetY, shadowOffsetY = _c === void 0 ? 0 : _c;
      var shadowLeft = minX - shadowBlur + shadowOffsetX;
      var shadowRight = maxX + shadowBlur + shadowOffsetX;
      var shadowTop = minY - shadowBlur + shadowOffsetY;
      var shadowBottom = maxY + shadowBlur + shadowOffsetY;
      minX = Math.min(minX, shadowLeft);
      maxX = Math.max(maxX, shadowRight);
      minY = Math.min(minY, shadowTop);
      maxY = Math.max(maxY, shadowBottom);
    }
    return {
      x: minX,
      y: minY,
      minX,
      minY,
      maxX,
      maxY,
      width: maxX - minX,
      height: maxY - minY
    };
  };
  AbstractShape.prototype.clearCacheBBox = function() {
    this.set("bbox", null);
    this.set("canvasBBox", null);
  };
  AbstractShape.prototype.isClipShape = function() {
    return this.get("isClipShape");
  };
  AbstractShape.prototype.isInShape = function(refX, refY) {
    return false;
  };
  AbstractShape.prototype.isOnlyHitBox = function() {
    return false;
  };
  AbstractShape.prototype.isHit = function(x, y) {
    var startArrowShape = this.get("startArrowShape");
    var endArrowShape = this.get("endArrowShape");
    var vec = [x, y, 1];
    vec = this.invertFromMatrix(vec);
    var refX = vec[0], refY = vec[1];
    var inBBox = this._isInBBox(refX, refY);
    if (this.isOnlyHitBox()) {
      return inBBox;
    }
    if (inBBox && !this.isClipped(refX, refY)) {
      if (this.isInShape(refX, refY)) {
        return true;
      }
      if (startArrowShape && startArrowShape.isHit(refX, refY)) {
        return true;
      }
      if (endArrowShape && endArrowShape.isHit(refX, refY)) {
        return true;
      }
    }
    return false;
  };
  return AbstractShape;
})(Element);
var cache$1 = /* @__PURE__ */ new Map();
function register(type, method) {
  cache$1.set(type, method);
}
function rect(shape) {
  var attrs = shape.attr();
  var x = attrs.x, y = attrs.y, width = attrs.width, height = attrs.height;
  return {
    x,
    y,
    width,
    height
  };
}
function circle(shape) {
  var _a = shape.attr(), x = _a.x, y = _a.y, r = _a.r;
  return {
    x: x - r,
    y: y - r,
    width: r * 2,
    height: r * 2
  };
}
function minNum(array) {
  return Math.min.apply(null, array);
}
function maxNum(array) {
  return Math.max.apply(null, array);
}
function distance$1(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}
function isNumberEqual(v1, v2) {
  return Math.abs(v1 - v2) < 1e-3;
}
function getBBoxByArray(xArr, yArr) {
  var minX = minNum(xArr);
  var minY = minNum(yArr);
  var maxX = maxNum(xArr);
  var maxY = maxNum(yArr);
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function piMod(angle) {
  return (angle + Math.PI * 2) % (Math.PI * 2);
}
var line$1 = {
  box: function(x1, y1, x2, y2) {
    return getBBoxByArray([x1, x2], [y1, y2]);
  },
  length: function(x1, y1, x2, y2) {
    return distance$1(x1, y1, x2, y2);
  },
  pointAt: function(x1, y1, x2, y2, t) {
    return {
      x: (1 - t) * x1 + t * x2,
      y: (1 - t) * y1 + t * y2
    };
  },
  pointDistance: function(x1, y1, x2, y2, x, y) {
    var cross3 = (x2 - x1) * (x - x1) + (y2 - y1) * (y - y1);
    if (cross3 < 0) {
      return distance$1(x1, y1, x, y);
    }
    var lengthSquare = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    if (cross3 > lengthSquare) {
      return distance$1(x2, y2, x, y);
    }
    return this.pointToLine(x1, y1, x2, y2, x, y);
  },
  pointToLine: function(x1, y1, x2, y2, x, y) {
    var d = [x2 - x1, y2 - y1];
    if (exactEquals(d, [0, 0])) {
      return Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
    }
    var u = [-d[1], d[0]];
    normalize(u, u);
    var a = [x - x1, y - y1];
    return Math.abs(dot(a, u));
  },
  tangentAngle: function(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  }
};
var EPSILON = 1e-4;
function nearestPoint(xArr, yArr, x, y, tCallback, length) {
  var t;
  var d = Infinity;
  var v0 = [x, y];
  var segNum = 20;
  if (length && length > 200) {
    segNum = length / 10;
  }
  var increaseRate = 1 / segNum;
  var interval2 = increaseRate / 10;
  for (var i = 0; i <= segNum; i++) {
    var _t = i * increaseRate;
    var v1 = [tCallback.apply(null, xArr.concat([_t])), tCallback.apply(null, yArr.concat([_t]))];
    var d1 = distance$1(v0[0], v0[1], v1[0], v1[1]);
    if (d1 < d) {
      t = _t;
      d = d1;
    }
  }
  if (t === 0) {
    return {
      x: xArr[0],
      y: yArr[0]
    };
  }
  if (t === 1) {
    var count = xArr.length;
    return {
      x: xArr[count - 1],
      y: yArr[count - 1]
    };
  }
  d = Infinity;
  for (var i = 0; i < 32; i++) {
    if (interval2 < EPSILON) {
      break;
    }
    var prev = t - interval2;
    var next = t + interval2;
    var v1 = [tCallback.apply(null, xArr.concat([prev])), tCallback.apply(null, yArr.concat([prev]))];
    var d1 = distance$1(v0[0], v0[1], v1[0], v1[1]);
    if (prev >= 0 && d1 < d) {
      t = prev;
      d = d1;
    } else {
      var v2 = [tCallback.apply(null, xArr.concat([next])), tCallback.apply(null, yArr.concat([next]))];
      var d2 = distance$1(v0[0], v0[1], v2[0], v2[1]);
      if (next <= 1 && d2 < d) {
        t = next;
        d = d2;
      } else {
        interval2 *= 0.5;
      }
    }
  }
  return {
    x: tCallback.apply(null, xArr.concat([t])),
    y: tCallback.apply(null, yArr.concat([t]))
  };
}
function snapLength(xArr, yArr) {
  var totalLength = 0;
  var count = xArr.length;
  for (var i = 0; i < count; i++) {
    var x = xArr[i];
    var y = yArr[i];
    var nextX = xArr[(i + 1) % count];
    var nextY = yArr[(i + 1) % count];
    totalLength += distance$1(x, y, nextX, nextY);
  }
  return totalLength / 2;
}
function quadraticAt(p0, p1, p2, t) {
  var onet = 1 - t;
  return onet * onet * p0 + 2 * t * onet * p1 + t * t * p2;
}
function extrema$1(p0, p1, p2) {
  var a = p0 + p2 - 2 * p1;
  if (isNumberEqual(a, 0)) {
    return [0.5];
  }
  var rst = (p0 - p1) / a;
  if (rst <= 1 && rst >= 0) {
    return [rst];
  }
  return [];
}
function derivativeAt$1(p0, p1, p2, t) {
  return 2 * (1 - t) * (p1 - p0) + 2 * t * (p2 - p1);
}
function divideQuadratic(x1, y1, x2, y2, x3, y3, t) {
  var xt = quadraticAt(x1, x2, x3, t);
  var yt = quadraticAt(y1, y2, y3, t);
  var controlPoint1 = line$1.pointAt(x1, y1, x2, y2, t);
  var controlPoint2 = line$1.pointAt(x2, y2, x3, y3, t);
  return [
    [x1, y1, controlPoint1.x, controlPoint1.y, xt, yt],
    [xt, yt, controlPoint2.x, controlPoint2.y, x3, y3]
  ];
}
function quadraticLength(x1, y1, x2, y2, x3, y3, iterationCount) {
  if (iterationCount === 0) {
    return (distance$1(x1, y1, x2, y2) + distance$1(x2, y2, x3, y3) + distance$1(x1, y1, x3, y3)) / 2;
  }
  var quadratics = divideQuadratic(x1, y1, x2, y2, x3, y3, 0.5);
  var left = quadratics[0];
  var right = quadratics[1];
  left.push(iterationCount - 1);
  right.push(iterationCount - 1);
  return quadraticLength.apply(null, left) + quadraticLength.apply(null, right);
}
var QuadUtil = {
  box: function(x1, y1, x2, y2, x3, y3) {
    var xExtrema2 = extrema$1(x1, x2, x3)[0];
    var yExtrema2 = extrema$1(y1, y2, y3)[0];
    var xArr = [x1, x3];
    var yArr = [y1, y3];
    if (xExtrema2 !== void 0) {
      xArr.push(quadraticAt(x1, x2, x3, xExtrema2));
    }
    if (yExtrema2 !== void 0) {
      yArr.push(quadraticAt(y1, y2, y3, yExtrema2));
    }
    return getBBoxByArray(xArr, yArr);
  },
  length: function(x1, y1, x2, y2, x3, y3) {
    return quadraticLength(x1, y1, x2, y2, x3, y3, 3);
  },
  nearestPoint: function(x1, y1, x2, y2, x3, y3, x0, y0) {
    return nearestPoint([x1, x2, x3], [y1, y2, y3], x0, y0, quadraticAt);
  },
  pointDistance: function(x1, y1, x2, y2, x3, y3, x0, y0) {
    var point = this.nearestPoint(x1, y1, x2, y2, x3, y3, x0, y0);
    return distance$1(point.x, point.y, x0, y0);
  },
  interpolationAt: quadraticAt,
  pointAt: function(x1, y1, x2, y2, x3, y3, t) {
    return {
      x: quadraticAt(x1, x2, x3, t),
      y: quadraticAt(y1, y2, y3, t)
    };
  },
  divide: function(x1, y1, x2, y2, x3, y3, t) {
    return divideQuadratic(x1, y1, x2, y2, x3, y3, t);
  },
  tangentAngle: function(x1, y1, x2, y2, x3, y3, t) {
    var dx = derivativeAt$1(x1, x2, x3, t);
    var dy = derivativeAt$1(y1, y2, y3, t);
    var angle = Math.atan2(dy, dx);
    return piMod(angle);
  }
};
function cubicAt(p0, p1, p2, p3, t) {
  var onet = 1 - t;
  return onet * onet * onet * p0 + 3 * p1 * t * onet * onet + 3 * p2 * t * t * onet + p3 * t * t * t;
}
function derivativeAt(p0, p1, p2, p3, t) {
  var onet = 1 - t;
  return 3 * (onet * onet * (p1 - p0) + 2 * onet * t * (p2 - p1) + t * t * (p3 - p2));
}
function extrema(p0, p1, p2, p3) {
  var a = -3 * p0 + 9 * p1 - 9 * p2 + 3 * p3;
  var b = 6 * p0 - 12 * p1 + 6 * p2;
  var c = 3 * p1 - 3 * p0;
  var extremas = [];
  var t1;
  var t2;
  var discSqrt;
  if (isNumberEqual(a, 0)) {
    if (!isNumberEqual(b, 0)) {
      t1 = -c / b;
      if (t1 >= 0 && t1 <= 1) {
        extremas.push(t1);
      }
    }
  } else {
    var disc = b * b - 4 * a * c;
    if (isNumberEqual(disc, 0)) {
      extremas.push(-b / (2 * a));
    } else if (disc > 0) {
      discSqrt = Math.sqrt(disc);
      t1 = (-b + discSqrt) / (2 * a);
      t2 = (-b - discSqrt) / (2 * a);
      if (t1 >= 0 && t1 <= 1) {
        extremas.push(t1);
      }
      if (t2 >= 0 && t2 <= 1) {
        extremas.push(t2);
      }
    }
  }
  return extremas;
}
function divideCubic(x1, y1, x2, y2, x3, y3, x4, y4, t) {
  var xt = cubicAt(x1, x2, x3, x4, t);
  var yt = cubicAt(y1, y2, y3, y4, t);
  var c1 = line$1.pointAt(x1, y1, x2, y2, t);
  var c2 = line$1.pointAt(x2, y2, x3, y3, t);
  var c3 = line$1.pointAt(x3, y3, x4, y4, t);
  var c12 = line$1.pointAt(c1.x, c1.y, c2.x, c2.y, t);
  var c23 = line$1.pointAt(c2.x, c2.y, c3.x, c3.y, t);
  return [
    [x1, y1, c1.x, c1.y, c12.x, c12.y, xt, yt],
    [xt, yt, c23.x, c23.y, c3.x, c3.y, x4, y4]
  ];
}
function cubicLength(x1, y1, x2, y2, x3, y3, x4, y4, iterationCount) {
  if (iterationCount === 0) {
    return snapLength([x1, x2, x3, x4], [y1, y2, y3, y4]);
  }
  var cubics = divideCubic(x1, y1, x2, y2, x3, y3, x4, y4, 0.5);
  var left = cubics[0];
  var right = cubics[1];
  left.push(iterationCount - 1);
  right.push(iterationCount - 1);
  return cubicLength.apply(null, left) + cubicLength.apply(null, right);
}
var CubicUtil = {
  extrema,
  box: function(x1, y1, x2, y2, x3, y3, x4, y4) {
    var xArr = [x1, x4];
    var yArr = [y1, y4];
    var xExtrema2 = extrema(x1, x2, x3, x4);
    var yExtrema2 = extrema(y1, y2, y3, y4);
    for (var i = 0; i < xExtrema2.length; i++) {
      xArr.push(cubicAt(x1, x2, x3, x4, xExtrema2[i]));
    }
    for (var i = 0; i < yExtrema2.length; i++) {
      yArr.push(cubicAt(y1, y2, y3, y4, yExtrema2[i]));
    }
    return getBBoxByArray(xArr, yArr);
  },
  length: function(x1, y1, x2, y2, x3, y3, x4, y4) {
    return cubicLength(x1, y1, x2, y2, x3, y3, x4, y4, 3);
  },
  nearestPoint: function(x1, y1, x2, y2, x3, y3, x4, y4, x0, y0, length) {
    return nearestPoint([x1, x2, x3, x4], [y1, y2, y3, y4], x0, y0, cubicAt, length);
  },
  pointDistance: function(x1, y1, x2, y2, x3, y3, x4, y4, x0, y0, length) {
    var point = this.nearestPoint(x1, y1, x2, y2, x3, y3, x4, y4, x0, y0, length);
    return distance$1(point.x, point.y, x0, y0);
  },
  interpolationAt: cubicAt,
  pointAt: function(x1, y1, x2, y2, x3, y3, x4, y4, t) {
    return {
      x: cubicAt(x1, x2, x3, x4, t),
      y: cubicAt(y1, y2, y3, y4, t)
    };
  },
  divide: function(x1, y1, x2, y2, x3, y3, x4, y4, t) {
    return divideCubic(x1, y1, x2, y2, x3, y3, x4, y4, t);
  },
  tangentAngle: function(x1, y1, x2, y2, x3, y3, x4, y4, t) {
    var dx = derivativeAt(x1, x2, x3, x4, t);
    var dy = derivativeAt(y1, y2, y3, y4, t);
    return piMod(Math.atan2(dy, dx));
  }
};
function copysign(v1, v2) {
  var absv = Math.abs(v1);
  return v2 > 0 ? absv : absv * -1;
}
var ellipse$1 = {
  box: function(x, y, rx, ry) {
    return {
      x: x - rx,
      y: y - ry,
      width: rx * 2,
      height: ry * 2
    };
  },
  length: function(x, y, rx, ry) {
    return Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
  },
  nearestPoint: function(x, y, rx, ry, x0, y0) {
    var a = rx;
    var b = ry;
    if (a === 0 || b === 0) {
      return {
        x,
        y
      };
    }
    var relativeX = x0 - x;
    var relativeY = y0 - y;
    var px = Math.abs(relativeX);
    var py = Math.abs(relativeY);
    var squareA = a * a;
    var squareB = b * b;
    var t = Math.PI / 4;
    var nearestX;
    var nearestY;
    for (var i = 0; i < 4; i++) {
      nearestX = a * Math.cos(t);
      nearestY = b * Math.sin(t);
      var ex = (squareA - squareB) * Math.pow(Math.cos(t), 3) / a;
      var ey = (squareB - squareA) * Math.pow(Math.sin(t), 3) / b;
      var rx1 = nearestX - ex;
      var ry1 = nearestY - ey;
      var qx = px - ex;
      var qy = py - ey;
      var r = Math.hypot(ry1, rx1);
      var q = Math.hypot(qy, qx);
      var delta_c = r * Math.asin((rx1 * qy - ry1 * qx) / (r * q));
      var delta_t = delta_c / Math.sqrt(squareA + squareB - nearestX * nearestX - nearestY * nearestY);
      t += delta_t;
      t = Math.min(Math.PI / 2, Math.max(0, t));
    }
    return {
      x: x + copysign(nearestX, relativeX),
      y: y + copysign(nearestY, relativeY)
    };
  },
  pointDistance: function(x, y, rx, ry, x0, y0) {
    var nearestPoint2 = this.nearestPoint(x, y, rx, ry, x0, y0);
    return distance$1(nearestPoint2.x, nearestPoint2.y, x0, y0);
  },
  pointAt: function(x, y, rx, ry, t) {
    var angle = 2 * Math.PI * t;
    return {
      x: x + rx * Math.cos(angle),
      y: y + ry * Math.sin(angle)
    };
  },
  tangentAngle: function(x, y, rx, ry, t) {
    var angle = 2 * Math.PI * t;
    var tangentAngle = Math.atan2(ry * Math.cos(angle), -rx * Math.sin(angle));
    return piMod(tangentAngle);
  }
};
function derivativeXAt(cx, cy, rx, ry, xRotation, startAngle, endAngle, angle) {
  return -1 * rx * Math.cos(xRotation) * Math.sin(angle) - ry * Math.sin(xRotation) * Math.cos(angle);
}
function derivativeYAt(cx, cy, rx, ry, xRotation, startAngle, endAngle, angle) {
  return -1 * rx * Math.sin(xRotation) * Math.sin(angle) + ry * Math.cos(xRotation) * Math.cos(angle);
}
function xExtrema(rx, ry, xRotation) {
  return Math.atan(-ry / rx * Math.tan(xRotation));
}
function yExtrema(rx, ry, xRotation) {
  return Math.atan(ry / (rx * Math.tan(xRotation)));
}
function xAt(cx, cy, rx, ry, xRotation, angle) {
  return rx * Math.cos(xRotation) * Math.cos(angle) - ry * Math.sin(xRotation) * Math.sin(angle) + cx;
}
function yAt(cx, cy, rx, ry, xRotation, angle) {
  return rx * Math.sin(xRotation) * Math.cos(angle) + ry * Math.cos(xRotation) * Math.sin(angle) + cy;
}
function getAngle(rx, ry, x0, y0) {
  var angle = Math.atan2(y0 * rx, x0 * ry);
  return (angle + Math.PI * 2) % (Math.PI * 2);
}
function getPoint(rx, ry, angle) {
  return {
    x: rx * Math.cos(angle),
    y: ry * Math.sin(angle)
  };
}
function rotate2(x, y, angle) {
  var cos2 = Math.cos(angle);
  var sin2 = Math.sin(angle);
  return [x * cos2 - y * sin2, x * sin2 + y * cos2];
}
var EllipseArcUtil = {
  box: function(cx, cy, rx, ry, xRotation, startAngle, endAngle) {
    var xDim = xExtrema(rx, ry, xRotation);
    var minX = Infinity;
    var maxX = -Infinity;
    var xs = [startAngle, endAngle];
    for (var i = -Math.PI * 2; i <= Math.PI * 2; i += Math.PI) {
      var xAngle = xDim + i;
      if (startAngle < endAngle) {
        if (startAngle < xAngle && xAngle < endAngle) {
          xs.push(xAngle);
        }
      } else {
        if (endAngle < xAngle && xAngle < startAngle) {
          xs.push(xAngle);
        }
      }
    }
    for (var i = 0; i < xs.length; i++) {
      var x = xAt(cx, cy, rx, ry, xRotation, xs[i]);
      if (x < minX) {
        minX = x;
      }
      if (x > maxX) {
        maxX = x;
      }
    }
    var yDim = yExtrema(rx, ry, xRotation);
    var minY = Infinity;
    var maxY = -Infinity;
    var ys = [startAngle, endAngle];
    for (var i = -Math.PI * 2; i <= Math.PI * 2; i += Math.PI) {
      var yAngle = yDim + i;
      if (startAngle < endAngle) {
        if (startAngle < yAngle && yAngle < endAngle) {
          ys.push(yAngle);
        }
      } else {
        if (endAngle < yAngle && yAngle < startAngle) {
          ys.push(yAngle);
        }
      }
    }
    for (var i = 0; i < ys.length; i++) {
      var y = yAt(cx, cy, rx, ry, xRotation, ys[i]);
      if (y < minY) {
        minY = y;
      }
      if (y > maxY) {
        maxY = y;
      }
    }
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  },
  length: function(cx, cy, rx, ry, xRotation, startAngle, endAngle) {
  },
  nearestPoint: function(cx, cy, rx, ry, xRotation, startAngle, endAngle, x0, y0) {
    var relativeVector = rotate2(x0 - cx, y0 - cy, -xRotation);
    var x1 = relativeVector[0], y1 = relativeVector[1];
    var relativePoint = ellipse$1.nearestPoint(0, 0, rx, ry, x1, y1);
    var angle = getAngle(rx, ry, relativePoint.x, relativePoint.y);
    if (angle < startAngle) {
      relativePoint = getPoint(rx, ry, startAngle);
    } else if (angle > endAngle) {
      relativePoint = getPoint(rx, ry, endAngle);
    }
    var vector = rotate2(relativePoint.x, relativePoint.y, xRotation);
    return {
      x: vector[0] + cx,
      y: vector[1] + cy
    };
  },
  pointDistance: function(cx, cy, rx, ry, xRotation, startAngle, endAngle, x0, y0) {
    var nearestPoint2 = this.nearestPoint(cx, cy, rx, ry, x0, y0);
    return distance$1(nearestPoint2.x, nearestPoint2.y, x0, y0);
  },
  pointAt: function(cx, cy, rx, ry, xRotation, startAngle, endAngle, t) {
    var angle = (endAngle - startAngle) * t + startAngle;
    return {
      x: xAt(cx, cy, rx, ry, xRotation, angle),
      y: yAt(cx, cy, rx, ry, xRotation, angle)
    };
  },
  tangentAngle: function(cx, cy, rx, ry, xRotation, startAngle, endAngle, t) {
    var angle = (endAngle - startAngle) * t + startAngle;
    var dx = derivativeXAt(cx, cy, rx, ry, xRotation, startAngle, endAngle, angle);
    var dy = derivativeYAt(cx, cy, rx, ry, xRotation, startAngle, endAngle, angle);
    return piMod(Math.atan2(dy, dx));
  }
};
function mergeBBox(bbox1, bbox2) {
  if (!bbox1 || !bbox2) {
    return bbox1 || bbox2;
  }
  return {
    minX: Math.min(bbox1.minX, bbox2.minX),
    minY: Math.min(bbox1.minY, bbox2.minY),
    maxX: Math.max(bbox1.maxX, bbox2.maxX),
    maxY: Math.max(bbox1.maxY, bbox2.maxY)
  };
}
function mergeArrowBBox(shape, bbox) {
  var startArrowShape = shape.get("startArrowShape");
  var endArrowShape = shape.get("endArrowShape");
  var startArrowBBox = null;
  var endArrowBBox = null;
  if (startArrowShape) {
    startArrowBBox = startArrowShape.getCanvasBBox();
    bbox = mergeBBox(bbox, startArrowBBox);
  }
  if (endArrowShape) {
    endArrowBBox = endArrowShape.getCanvasBBox();
    bbox = mergeBBox(bbox, endArrowBBox);
  }
  return bbox;
}
function polyline(shape) {
  var attrs = shape.attr();
  var points = attrs.points;
  var xArr = [];
  var yArr = [];
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    xArr.push(point[0]);
    yArr.push(point[1]);
  }
  var _a = getBBoxByArray(xArr, yArr), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
  var bbox = {
    minX: x,
    minY: y,
    maxX: x + width,
    maxY: y + height
  };
  bbox = mergeArrowBBox(shape, bbox);
  return {
    x: bbox.minX,
    y: bbox.minY,
    width: bbox.maxX - bbox.minX,
    height: bbox.maxY - bbox.minY
  };
}
function polygon(shape) {
  var attrs = shape.attr();
  var points = attrs.points;
  var xArr = [];
  var yArr = [];
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    xArr.push(point[0]);
    yArr.push(point[1]);
  }
  return getBBoxByArray(xArr, yArr);
}
var offScreenCtx = null;
function getOffScreenContext() {
  if (!offScreenCtx) {
    var canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    offScreenCtx = canvas.getContext("2d");
  }
  return offScreenCtx;
}
function getTextHeight(text2, fontSize, lineHeight) {
  var lineCount = 1;
  if (isString(text2)) {
    lineCount = text2.split("\n").length;
  }
  if (lineCount > 1) {
    var spaceingY = getLineSpaceing(fontSize, lineHeight);
    return fontSize * lineCount + spaceingY * (lineCount - 1);
  }
  return fontSize;
}
function getLineSpaceing(fontSize, lineHeight) {
  return lineHeight ? lineHeight - fontSize : fontSize * 0.14;
}
function getTextWidth(text2, font) {
  var context = getOffScreenContext();
  var width = 0;
  if (isNil(text2) || text2 === "") {
    return width;
  }
  context.save();
  context.font = font;
  if (isString(text2) && text2.includes("\n")) {
    var textArr = text2.split("\n");
    each(textArr, function(subText) {
      var measureWidth = context.measureText(subText).width;
      if (width < measureWidth) {
        width = measureWidth;
      }
    });
  } else {
    width = context.measureText(text2).width;
  }
  context.restore();
  return width;
}
function assembleFont(attrs) {
  var fontSize = attrs.fontSize, fontFamily = attrs.fontFamily, fontWeight = attrs.fontWeight, fontStyle = attrs.fontStyle, fontVariant = attrs.fontVariant;
  return [fontStyle, fontVariant, fontWeight, fontSize + "px", fontFamily].join(" ").trim();
}
function text(shape) {
  var attrs = shape.attr();
  var x = attrs.x, y = attrs.y, text2 = attrs.text, fontSize = attrs.fontSize, lineHeight = attrs.lineHeight;
  var font = attrs.font;
  if (!font) {
    font = assembleFont(attrs);
  }
  var width = getTextWidth(text2, font);
  var bbox;
  if (!width) {
    bbox = {
      x,
      y,
      width: 0,
      height: 0
    };
  } else {
    var textAlign = attrs.textAlign, textBaseline = attrs.textBaseline;
    var height = getTextHeight(text2, fontSize, lineHeight);
    var point = {
      x,
      y: y - height
    };
    if (textAlign) {
      if (textAlign === "end" || textAlign === "right") {
        point.x -= width;
      } else if (textAlign === "center") {
        point.x -= width / 2;
      }
    }
    if (textBaseline) {
      if (textBaseline === "top") {
        point.y += height;
      } else if (textBaseline === "middle") {
        point.y += height / 2;
      }
    }
    bbox = {
      x: point.x,
      y: point.y,
      width,
      height
    };
  }
  return bbox;
}
var regexTags = /[MLHVQTCSAZ]([^MLHVQTCSAZ]*)/ig;
var regexDot = /[^\s\,]+/ig;
function parsePath(p) {
  var path2 = p || [];
  if (isArray$1(path2)) {
    return path2;
  }
  if (isString(path2)) {
    path2 = path2.match(regexTags);
    each(path2, function(item, index) {
      item = item.match(regexDot);
      if (item[0].length > 1) {
        var tag = item[0].charAt(0);
        item.splice(1, 0, item[0].substr(1));
        item[0] = tag;
      }
      each(item, function(sub2, i) {
        if (!isNaN(sub2)) {
          item[i] = +sub2;
        }
      });
      path2[index] = item;
    });
    return path2;
  }
}
function smoothBezier(points, smooth, isLoop, constraint) {
  var cps = [];
  var hasConstraint = !!constraint;
  var prevPoint;
  var nextPoint;
  var min$12;
  var max$12;
  var nextCp0;
  var cp1;
  var cp0;
  if (hasConstraint) {
    min$12 = constraint[0], max$12 = constraint[1];
    for (var i = 0, l = points.length; i < l; i += 1) {
      var point = points[i];
      min$12 = min([0, 0], min$12, point);
      max$12 = max([0, 0], max$12, point);
    }
  }
  for (var i = 0, len = points.length; i < len; i += 1) {
    var point = points[i];
    if (i === 0 && !isLoop) {
      cp0 = point;
    } else if (i === len - 1 && !isLoop) {
      cp1 = point;
      cps.push(cp0);
      cps.push(cp1);
    } else {
      var prevIdx = [i ? i - 1 : len - 1, i - 1][isLoop ? 0 : 1];
      prevPoint = points[prevIdx];
      nextPoint = points[isLoop ? (i + 1) % len : i + 1];
      var v = [0, 0];
      v = sub(v, nextPoint, prevPoint);
      v = scale$1(v, v, smooth);
      var d0 = distance$3(point, prevPoint);
      var d1 = distance$3(point, nextPoint);
      var sum = d0 + d1;
      if (sum !== 0) {
        d0 /= sum;
        d1 /= sum;
      }
      var v1 = scale$1([0, 0], v, -d0);
      var v2 = scale$1([0, 0], v, d1);
      cp1 = add([0, 0], point, v1);
      nextCp0 = add([0, 0], point, v2);
      nextCp0 = min([0, 0], nextCp0, max([0, 0], nextPoint, point));
      nextCp0 = max([0, 0], nextCp0, min([0, 0], nextPoint, point));
      v1 = sub([0, 0], nextCp0, point);
      v1 = scale$1([0, 0], v1, -d0 / d1);
      cp1 = add([0, 0], point, v1);
      cp1 = min([0, 0], cp1, max([0, 0], prevPoint, point));
      cp1 = max([0, 0], cp1, min([0, 0], prevPoint, point));
      v2 = sub([0, 0], point, cp1);
      v2 = scale$1([0, 0], v2, d1 / d0);
      nextCp0 = add([0, 0], point, v2);
      if (hasConstraint) {
        cp1 = max([0, 0], cp1, min$12);
        cp1 = min([0, 0], cp1, max$12);
        nextCp0 = max([0, 0], nextCp0, min$12);
        nextCp0 = min([0, 0], nextCp0, max$12);
      }
      cps.push(cp0);
      cps.push(cp1);
      cp0 = nextCp0;
    }
  }
  if (isLoop) {
    cps.push(cps.shift());
  }
  return cps;
}
function catmullRom2Bezier(crp, z, constraint) {
  if (z === void 0) {
    z = false;
  }
  if (constraint === void 0) {
    constraint = [
      [0, 0],
      [1, 1]
    ];
  }
  var isLoop = !!z;
  var pointList = [];
  for (var i = 0, l = crp.length; i < l; i += 2) {
    pointList.push([crp[i], crp[i + 1]]);
  }
  var controlPointList = smoothBezier(pointList, 0.4, isLoop, constraint);
  var len = pointList.length;
  var d1 = [];
  var cp1;
  var cp2;
  var p;
  for (var i = 0; i < len - 1; i += 1) {
    cp1 = controlPointList[i * 2];
    cp2 = controlPointList[i * 2 + 1];
    p = pointList[i + 1];
    d1.push(["C", cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]]);
  }
  if (isLoop) {
    cp1 = controlPointList[len];
    cp2 = controlPointList[len + 1];
    p = pointList[0];
    d1.push(["C", cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]]);
  }
  return d1;
}
var SPACES = "	\n\v\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029";
var PATH_COMMAND = new RegExp("([a-z])[" + SPACES + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + SPACES + "]*,?[" + SPACES + "]*)+)", "ig");
var PATH_VALUES = new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[" + SPACES + "]*,?[" + SPACES + "]*", "ig");
function parsePathString(pathString) {
  if (!pathString) {
    return null;
  }
  if (isArray$1(pathString)) {
    return pathString;
  }
  var paramCounts = {
    a: 7,
    c: 6,
    o: 2,
    h: 1,
    l: 2,
    m: 2,
    r: 4,
    q: 4,
    s: 4,
    t: 2,
    v: 1,
    u: 3,
    z: 0
  };
  var data = [];
  String(pathString).replace(PATH_COMMAND, function(a, b, c) {
    var params = [];
    var name = b.toLowerCase();
    c.replace(PATH_VALUES, function(a2, b10) {
      b10 && params.push(+b10);
    });
    if (name === "m" && params.length > 2) {
      data.push([b].concat(params.splice(0, 2)));
      name = "l";
      b = b === "m" ? "l" : "L";
    }
    if (name === "o" && params.length === 1) {
      data.push([b, params[0]]);
    }
    if (name === "r") {
      data.push([b].concat(params));
    } else {
      while (params.length >= paramCounts[name]) {
        data.push([b].concat(params.splice(0, paramCounts[name])));
        if (!paramCounts[name]) {
          break;
        }
      }
    }
    return "";
  });
  return data;
}
function vMag(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}
function vRatio(u, v) {
  return vMag(u) * vMag(v) ? (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v)) : 1;
}
function vAngle(u, v) {
  return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
}
function isSamePoint(point1, point2) {
  return point1[0] === point2[0] && point1[1] === point2[1];
}
function getArcParams(startPoint, params) {
  var rx = params[1];
  var ry = params[2];
  var xRotation = mod(toRadian(params[3]), Math.PI * 2);
  var arcFlag = params[4];
  var sweepFlag = params[5];
  var x1 = startPoint[0];
  var y1 = startPoint[1];
  var x2 = params[6];
  var y2 = params[7];
  var xp = Math.cos(xRotation) * (x1 - x2) / 2 + Math.sin(xRotation) * (y1 - y2) / 2;
  var yp = -1 * Math.sin(xRotation) * (x1 - x2) / 2 + Math.cos(xRotation) * (y1 - y2) / 2;
  var lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }
  var diff = rx * rx * (yp * yp) + ry * ry * (xp * xp);
  var f = diff ? Math.sqrt((rx * rx * (ry * ry) - diff) / diff) : 1;
  if (arcFlag === sweepFlag) {
    f *= -1;
  }
  if (isNaN(f)) {
    f = 0;
  }
  var cxp = ry ? f * rx * yp / ry : 0;
  var cyp = rx ? f * -ry * xp / rx : 0;
  var cx = (x1 + x2) / 2 + Math.cos(xRotation) * cxp - Math.sin(xRotation) * cyp;
  var cy = (y1 + y2) / 2 + Math.sin(xRotation) * cxp + Math.cos(xRotation) * cyp;
  var u = [(xp - cxp) / rx, (yp - cyp) / ry];
  var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
  var theta = vAngle([1, 0], u);
  var dTheta = vAngle(u, v);
  if (vRatio(u, v) <= -1) {
    dTheta = Math.PI;
  }
  if (vRatio(u, v) >= 1) {
    dTheta = 0;
  }
  if (sweepFlag === 0 && dTheta > 0) {
    dTheta = dTheta - 2 * Math.PI;
  }
  if (sweepFlag === 1 && dTheta < 0) {
    dTheta = dTheta + 2 * Math.PI;
  }
  return {
    cx,
    cy,
    rx: isSamePoint(startPoint, [x2, y2]) ? 0 : rx,
    ry: isSamePoint(startPoint, [x2, y2]) ? 0 : ry,
    startAngle: theta,
    endAngle: theta + dTheta,
    xRotation,
    arcFlag,
    sweepFlag
  };
}
function toSymmetry(point, center) {
  return [center[0] + (center[0] - point[0]), center[1] + (center[1] - point[1])];
}
function getSegments(path2) {
  path2 = parsePath(path2);
  var segments = [];
  var currentPoint = null;
  var nextParams = null;
  var startMovePoint = null;
  var lastStartMovePointIndex = 0;
  var count = path2.length;
  for (var i = 0; i < count; i++) {
    var params = path2[i];
    nextParams = path2[i + 1];
    var command = params[0];
    var segment = {
      command,
      prePoint: currentPoint,
      params,
      startTangent: null,
      endTangent: null
    };
    switch (command) {
      case "M":
        startMovePoint = [params[1], params[2]];
        lastStartMovePointIndex = i;
        break;
      case "A":
        var arcParams = getArcParams(currentPoint, params);
        segment["arcParams"] = arcParams;
        break;
    }
    if (command === "Z") {
      currentPoint = startMovePoint;
      nextParams = path2[lastStartMovePointIndex + 1];
    } else {
      var len = params.length;
      currentPoint = [params[len - 2], params[len - 1]];
    }
    if (nextParams && nextParams[0] === "Z") {
      nextParams = path2[lastStartMovePointIndex];
      if (segments[lastStartMovePointIndex]) {
        segments[lastStartMovePointIndex].prePoint = currentPoint;
      }
    }
    segment["currentPoint"] = currentPoint;
    if (segments[lastStartMovePointIndex] && isSamePoint(currentPoint, segments[lastStartMovePointIndex].currentPoint)) {
      segments[lastStartMovePointIndex].prePoint = segment.prePoint;
    }
    var nextPoint = nextParams ? [nextParams[nextParams.length - 2], nextParams[nextParams.length - 1]] : null;
    segment["nextPoint"] = nextPoint;
    var prePoint = segment.prePoint;
    if (["L", "H", "V"].includes(command)) {
      segment.startTangent = [prePoint[0] - currentPoint[0], prePoint[1] - currentPoint[1]];
      segment.endTangent = [currentPoint[0] - prePoint[0], currentPoint[1] - prePoint[1]];
    } else if (command === "Q") {
      var cp = [params[1], params[2]];
      segment.startTangent = [prePoint[0] - cp[0], prePoint[1] - cp[1]];
      segment.endTangent = [currentPoint[0] - cp[0], currentPoint[1] - cp[1]];
    } else if (command === "T") {
      var preSegment = segments[i - 1];
      var cp = toSymmetry(preSegment.currentPoint, prePoint);
      if (preSegment.command === "Q") {
        segment.command = "Q";
        segment.startTangent = [prePoint[0] - cp[0], prePoint[1] - cp[1]];
        segment.endTangent = [currentPoint[0] - cp[0], currentPoint[1] - cp[1]];
      } else {
        segment.command = "TL";
        segment.startTangent = [prePoint[0] - currentPoint[0], prePoint[1] - currentPoint[1]];
        segment.endTangent = [currentPoint[0] - prePoint[0], currentPoint[1] - prePoint[1]];
      }
    } else if (command === "C") {
      var cp1 = [params[1], params[2]];
      var cp2 = [params[3], params[4]];
      segment.startTangent = [prePoint[0] - cp1[0], prePoint[1] - cp1[1]];
      segment.endTangent = [currentPoint[0] - cp2[0], currentPoint[1] - cp2[1]];
      if (segment.startTangent[0] === 0 && segment.startTangent[1] === 0) {
        segment.startTangent = [cp1[0] - cp2[0], cp1[1] - cp2[1]];
      }
      if (segment.endTangent[0] === 0 && segment.endTangent[1] === 0) {
        segment.endTangent = [cp2[0] - cp1[0], cp2[1] - cp1[1]];
      }
    } else if (command === "S") {
      var preSegment = segments[i - 1];
      var cp1 = toSymmetry(preSegment.currentPoint, prePoint);
      var cp2 = [params[1], params[2]];
      if (preSegment.command === "C") {
        segment.command = "C";
        segment.startTangent = [prePoint[0] - cp1[0], prePoint[1] - cp1[1]];
        segment.endTangent = [currentPoint[0] - cp2[0], currentPoint[1] - cp2[1]];
      } else {
        segment.command = "SQ";
        segment.startTangent = [prePoint[0] - cp2[0], prePoint[1] - cp2[1]];
        segment.endTangent = [currentPoint[0] - cp2[0], currentPoint[1] - cp2[1]];
      }
    } else if (command === "A") {
      var d = 1e-3;
      var _a = segment["arcParams"] || {}, _b = _a.cx, cx = _b === void 0 ? 0 : _b, _c = _a.cy, cy = _c === void 0 ? 0 : _c, _d = _a.rx, rx = _d === void 0 ? 0 : _d, _e = _a.ry, ry = _e === void 0 ? 0 : _e, _f = _a.sweepFlag, sweepFlag = _f === void 0 ? 0 : _f, _g = _a.startAngle, startAngle = _g === void 0 ? 0 : _g, _h = _a.endAngle, endAngle = _h === void 0 ? 0 : _h;
      if (sweepFlag === 0) {
        d *= -1;
      }
      var dx1 = rx * Math.cos(startAngle - d) + cx;
      var dy1 = ry * Math.sin(startAngle - d) + cy;
      segment.startTangent = [dx1 - startMovePoint[0], dy1 - startMovePoint[1]];
      var dx2 = rx * Math.cos(startAngle + endAngle + d) + cx;
      var dy2 = ry * Math.sin(startAngle + endAngle - d) + cy;
      segment.endTangent = [prePoint[0] - dx2, prePoint[1] - dy2];
    }
    segments.push(segment);
  }
  return segments;
}
function getPathBox(segments, lineWidth) {
  var xArr = [];
  var yArr = [];
  var segmentsWithAngle = [];
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    var currentPoint = segment.currentPoint, params = segment.params, prePoint = segment.prePoint;
    var box = void 0;
    switch (segment.command) {
      case "Q":
        box = QuadUtil.box(prePoint[0], prePoint[1], params[1], params[2], params[3], params[4]);
        break;
      case "C":
        box = CubicUtil.box(prePoint[0], prePoint[1], params[1], params[2], params[3], params[4], params[5], params[6]);
        break;
      case "A":
        var arcParams = segment.arcParams;
        box = EllipseArcUtil.box(arcParams.cx, arcParams.cy, arcParams.rx, arcParams.ry, arcParams.xRotation, arcParams.startAngle, arcParams.endAngle);
        break;
      default:
        xArr.push(currentPoint[0]);
        yArr.push(currentPoint[1]);
        break;
    }
    if (box) {
      segment.box = box;
      xArr.push(box.x, box.x + box.width);
      yArr.push(box.y, box.y + box.height);
    }
    if (lineWidth && (segment.command === "L" || segment.command === "M") && segment.prePoint && segment.nextPoint) {
      segmentsWithAngle.push(segment);
    }
  }
  xArr = xArr.filter(function(item) {
    return !Number.isNaN(item) && item !== Infinity && item !== -Infinity;
  });
  yArr = yArr.filter(function(item) {
    return !Number.isNaN(item) && item !== Infinity && item !== -Infinity;
  });
  var minX = min$1(xArr);
  var minY = min$1(yArr);
  var maxX = max$1(xArr);
  var maxY = max$1(yArr);
  if (segmentsWithAngle.length === 0) {
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
  for (var i = 0; i < segmentsWithAngle.length; i++) {
    var segment = segmentsWithAngle[i];
    var currentPoint = segment.currentPoint;
    var extra = void 0;
    if (currentPoint[0] === minX) {
      extra = getExtraFromSegmentWithAngle(segment, lineWidth);
      minX = minX - extra.xExtra;
    } else if (currentPoint[0] === maxX) {
      extra = getExtraFromSegmentWithAngle(segment, lineWidth);
      maxX = maxX + extra.xExtra;
    }
    if (currentPoint[1] === minY) {
      extra = getExtraFromSegmentWithAngle(segment, lineWidth);
      minY = minY - extra.yExtra;
    } else if (currentPoint[1] === maxY) {
      extra = getExtraFromSegmentWithAngle(segment, lineWidth);
      maxY = maxY + extra.yExtra;
    }
  }
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getExtraFromSegmentWithAngle(segment, lineWidth) {
  var prePoint = segment.prePoint, currentPoint = segment.currentPoint, nextPoint = segment.nextPoint;
  var currentAndPre = Math.pow(currentPoint[0] - prePoint[0], 2) + Math.pow(currentPoint[1] - prePoint[1], 2);
  var currentAndNext = Math.pow(currentPoint[0] - nextPoint[0], 2) + Math.pow(currentPoint[1] - nextPoint[1], 2);
  var preAndNext = Math.pow(prePoint[0] - nextPoint[0], 2) + Math.pow(prePoint[1] - nextPoint[1], 2);
  var currentAngle = Math.acos((currentAndPre + currentAndNext - preAndNext) / (2 * Math.sqrt(currentAndPre) * Math.sqrt(currentAndNext)));
  if (!currentAngle || Math.sin(currentAngle) === 0 || isNumberEqual$1(currentAngle, 0)) {
    return {
      xExtra: 0,
      yExtra: 0
    };
  }
  var xAngle = Math.abs(Math.atan2(nextPoint[1] - currentPoint[1], nextPoint[0] - currentPoint[0]));
  var yAngle = Math.abs(Math.atan2(nextPoint[0] - currentPoint[0], nextPoint[1] - currentPoint[1]));
  xAngle = xAngle > Math.PI / 2 ? Math.PI - xAngle : xAngle;
  yAngle = yAngle > Math.PI / 2 ? Math.PI - yAngle : yAngle;
  var extra = {
    xExtra: Math.cos(currentAngle / 2 - xAngle) * (lineWidth / 2 * (1 / Math.sin(currentAngle / 2))) - lineWidth / 2 || 0,
    yExtra: Math.cos(yAngle - currentAngle / 2) * (lineWidth / 2 * (1 / Math.sin(currentAngle / 2))) - lineWidth / 2 || 0
  };
  return extra;
}
function path(shape) {
  var attrs = shape.attr();
  var path2 = attrs.path, stroke = attrs.stroke;
  var lineWidth = stroke ? attrs.lineWidth : 0;
  var segments = shape.get("segments") || getSegments(path2);
  var _a = getPathBox(segments, lineWidth), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
  var bbox = {
    minX: x,
    minY: y,
    maxX: x + width,
    maxY: y + height
  };
  bbox = mergeArrowBBox(shape, bbox);
  return {
    x: bbox.minX,
    y: bbox.minY,
    width: bbox.maxX - bbox.minX,
    height: bbox.maxY - bbox.minY
  };
}
function line(shape) {
  var attrs = shape.attr();
  var x1 = attrs.x1, y1 = attrs.y1, x2 = attrs.x2, y2 = attrs.y2;
  var minX = Math.min(x1, x2);
  var maxX = Math.max(x1, x2);
  var minY = Math.min(y1, y2);
  var maxY = Math.max(y1, y2);
  var bbox = {
    minX,
    maxX,
    minY,
    maxY
  };
  bbox = mergeArrowBBox(shape, bbox);
  return {
    x: bbox.minX,
    y: bbox.minY,
    width: bbox.maxX - bbox.minX,
    height: bbox.maxY - bbox.minY
  };
}
function ellipse(shape) {
  var attrs = shape.attr();
  var x = attrs.x, y = attrs.y, rx = attrs.rx, ry = attrs.ry;
  return {
    x: x - rx,
    y: y - ry,
    width: rx * 2,
    height: ry * 2
  };
}
register("rect", rect);
register("image", rect);
register("circle", circle);
register("marker", circle);
register("polyline", polyline);
register("polygon", polygon);
register("text", text);
register("path", path);
register("line", line);
register("ellipse", ellipse);
var G6GraphEvent = function(_super) {
  __extends(G6GraphEvent2, _super);
  function G6GraphEvent2(type, event) {
    var _this = _super.call(this, type, event) || this;
    _this.item = event.item;
    _this.canvasX = event.canvasX;
    _this.canvasY = event.canvasY;
    _this.wheelDelta = event.wheelDelta;
    _this.detail = event.detail;
    return _this;
  }
  return G6GraphEvent2;
}(GraphEvent);
var uniqueId = function uniqueId2(type) {
  return "".concat(type, "-").concat(Math.random()).concat(Date.now());
};
var formatPadding = function formatPadding2(padding) {
  if (isArray$1(padding)) {
    switch (padding.length) {
      case 4:
        return padding;
      case 3:
        padding.push(padding[1]);
        return padding;
      case 2:
        return padding.concat(padding);
      case 1:
        return [padding[0], padding[0], padding[0], padding[0]];
      default:
        return [0, 0, 0, 0];
    }
  }
  if (isNumber(padding)) {
    return [padding, padding, padding, padding];
  } else if (isString(padding)) {
    var intPadding = parseInt(padding, 10);
    return [intPadding, intPadding, intPadding, intPadding];
  }
  return [0, 0, 0, 0];
};
var cloneEvent = function cloneEvent2(e) {
  var event = new G6GraphEvent(e.type, e);
  event.clientX = e.clientX;
  event.clientY = e.clientY;
  event.x = e.x;
  event.y = e.y;
  event.target = e.target;
  event.currentTarget = e.currentTarget;
  event.bubbles = true;
  event.item = e.item;
  return event;
};
var isViewportChanged = function isViewportChanged2(matrix) {
  if (!matrix) {
    return false;
  }
  var MATRIX_LEN = 9;
  var ORIGIN_MATRIX = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  for (var i = 0; i < MATRIX_LEN; i++) {
    if (matrix[i] !== ORIGIN_MATRIX[i]) {
      return true;
    }
  }
  return false;
};
var isNaN$1 = function isNaN2(input) {
  return Number.isNaN(Number(input));
};
var calculationItemsBBox = function calculationItemsBBox2(items) {
  var minx = Infinity;
  var maxx = -Infinity;
  var miny = Infinity;
  var maxy = -Infinity;
  for (var i = 0; i < items.length; i++) {
    var element = items[i];
    var bbox = element.getBBox();
    var minX = bbox.minX, minY = bbox.minY, maxX = bbox.maxX, maxY = bbox.maxY;
    if (minX < minx) {
      minx = minX;
    }
    if (minY < miny) {
      miny = minY;
    }
    if (maxX > maxx) {
      maxx = maxX;
    }
    if (maxY > maxy) {
      maxy = maxY;
    }
  }
  var x = Math.floor(minx);
  var y = Math.floor(miny);
  var width = Math.ceil(maxx) - Math.floor(minx);
  var height = Math.ceil(maxy) - Math.floor(miny);
  return {
    x,
    y,
    width,
    height,
    minX: minx,
    minY: miny,
    maxX: maxx,
    maxY: maxy
  };
};
var processParallelEdges = function processParallelEdges2(edges, offsetDiff, multiEdgeType, singleEdgeType, loopEdgeType) {
  if (offsetDiff === void 0) {
    offsetDiff = 15;
  }
  if (multiEdgeType === void 0) {
    multiEdgeType = "quadratic";
  }
  if (singleEdgeType === void 0) {
    singleEdgeType = void 0;
  }
  if (loopEdgeType === void 0) {
    loopEdgeType = void 0;
  }
  var len = edges.length;
  var cod = offsetDiff * 2;
  var loopPosition = ["top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left"];
  var edgeMap = {};
  var tags = [];
  var reverses = {};
  for (var i = 0; i < len; i++) {
    var edge = edges[i];
    var source = edge.source, target = edge.target;
    var sourceTarget = "".concat(source, "-").concat(target);
    if (tags[i])
      continue;
    if (!edgeMap[sourceTarget]) {
      edgeMap[sourceTarget] = [];
    }
    tags[i] = true;
    edgeMap[sourceTarget].push(edge);
    for (var j = 0; j < len; j++) {
      if (i === j)
        continue;
      var sedge = edges[j];
      var src = sedge.source;
      var dst = sedge.target;
      if (!tags[j]) {
        if (source === dst && target === src) {
          edgeMap[sourceTarget].push(sedge);
          tags[j] = true;
          reverses["".concat(src, "|").concat(dst, "|").concat(edgeMap[sourceTarget].length - 1)] = true;
        } else if (source === src && target === dst) {
          edgeMap[sourceTarget].push(sedge);
          tags[j] = true;
        }
      }
    }
  }
  for (var key in edgeMap) {
    var arcEdges = edgeMap[key];
    var length_1 = arcEdges.length;
    for (var k = 0; k < length_1; k++) {
      var current = arcEdges[k];
      if (current.source === current.target) {
        if (loopEdgeType)
          current.type = loopEdgeType;
        current.loopCfg = {
          position: loopPosition[k % 8],
          dist: Math.floor(k / 8) * 20 + 50
        };
        continue;
      }
      if (length_1 === 1 && singleEdgeType && current.source !== current.target) {
        current.type = singleEdgeType;
        continue;
      }
      current.type = multiEdgeType;
      var sign = (k % 2 === 0 ? 1 : -1) * (reverses["".concat(current.source, "|").concat(current.target, "|").concat(k)] ? -1 : 1);
      if (length_1 % 2 === 1) {
        current.curveOffset = sign * Math.ceil(k / 2) * cod;
      } else {
        current.curveOffset = sign * (Math.floor(k / 2) * cod + offsetDiff);
      }
    }
  }
  return edges;
};
var BaseUtil = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  uniqueId,
  formatPadding,
  cloneEvent,
  isViewportChanged,
  isNaN: isNaN$1,
  calculationItemsBBox,
  processParallelEdges
}, Symbol.toStringTag, { value: "Module" }));
var ViewController = function() {
  function ViewController2(graph) {
    this.destroyed = false;
    this.graph = graph;
    this.destroyed = false;
  }
  ViewController2.prototype.getViewCenter = function() {
    var padding = this.getFormatPadding();
    var graph = this.graph;
    var width = this.graph.get("width");
    var height = graph.get("height");
    return {
      x: (width - padding[1] - padding[3]) / 2 + padding[3],
      y: (height - padding[0] - padding[2]) / 2 + padding[0]
    };
  };
  ViewController2.prototype.fitCenter = function() {
    var graph = this.graph;
    var group = graph.get("group");
    group.resetMatrix();
    var bbox = group.getCanvasBBox();
    if (bbox.width === 0 || bbox.height === 0)
      return;
    var viewCenter = this.getViewCenter();
    var groupCenter = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };
    graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
  };
  ViewController2.prototype.fitView = function() {
    var graph = this.graph;
    var padding = this.getFormatPadding();
    var width = graph.get("width");
    var height = graph.get("height");
    var group = graph.get("group");
    group.resetMatrix();
    var bbox = group.getCanvasBBox();
    if (bbox.width === 0 || bbox.height === 0)
      return;
    var viewCenter = this.getViewCenter();
    var groupCenter = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };
    graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
    var w = (width - padding[1] - padding[3]) / bbox.width;
    var h = (height - padding[0] - padding[2]) / bbox.height;
    var ratio = w;
    if (w > h) {
      ratio = h;
    }
    if (!graph.zoom(ratio, viewCenter)) {
      console.warn("zoom failed, ratio out of range, ratio: %f", ratio);
    }
  };
  ViewController2.prototype.fitViewByRules = function(rules) {
    var _a = rules.onlyOutOfViewPort, onlyOutOfViewPort = _a === void 0 ? false : _a, _b = rules.direction, direction = _b === void 0 ? "both" : _b, _c = rules.ratioRule, ratioRule = _c === void 0 ? "min" : _c;
    var graph = this.graph;
    var padding = this.getFormatPadding();
    var width = graph.get("width");
    var height = graph.get("height");
    var group = graph.get("group");
    group.resetMatrix();
    var bbox = group.getCanvasBBox();
    if (bbox.width === 0 || bbox.height === 0)
      return;
    var viewCenter = this.getViewCenter();
    var groupCenter = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };
    graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
    var wRatio = (width - padding[1] - padding[3]) / bbox.width;
    var hRatio = (height - padding[0] - padding[2]) / bbox.height;
    var ratio;
    if (direction === "x") {
      ratio = wRatio;
    } else if (direction === "y") {
      ratio = hRatio;
    } else {
      ratio = ratioRule === "max" ? Math.max(wRatio, hRatio) : Math.min(wRatio, hRatio);
    }
    if (onlyOutOfViewPort) {
      ratio = ratio < 1 ? ratio : 1;
    }
    var initZoomRatio = graph.getZoom();
    var endZoom = initZoomRatio * ratio;
    var minZoom = graph.get("minZoom");
    if (endZoom < minZoom) {
      endZoom = minZoom;
      console.warn("fitview failed, ratio out of range, ratio: %f", ratio, "graph minzoom has been used instead");
    }
    graph.zoomTo(endZoom, viewCenter);
  };
  ViewController2.prototype.getFormatPadding = function() {
    var padding = this.graph.get("fitViewPadding");
    return formatPadding(padding);
  };
  ViewController2.prototype.focusPoint = function(point, animate, animateCfg) {
    var _this = this;
    var viewCenter = this.getViewCenter();
    var modelCenter = this.getPointByCanvas(viewCenter.x, viewCenter.y);
    var viewportMatrix = this.graph.get("group").getMatrix();
    if (!viewportMatrix)
      viewportMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    if (animate) {
      var dx_1 = (modelCenter.x - point.x) * viewportMatrix[0];
      var dy_1 = (modelCenter.y - point.y) * viewportMatrix[4];
      var lastX_1 = 0;
      var lastY_1 = 0;
      var newX_1 = 0;
      var newY_1 = 0;
      this.graph.get("canvas").animate(function(ratio) {
        newX_1 = dx_1 * ratio;
        newY_1 = dy_1 * ratio;
        _this.graph.translate(newX_1 - lastX_1, newY_1 - lastY_1);
        lastX_1 = newX_1;
        lastY_1 = newY_1;
      }, __assign({}, animateCfg));
    } else {
      this.graph.translate((modelCenter.x - point.x) * viewportMatrix[0], (modelCenter.y - point.y) * viewportMatrix[4]);
    }
  };
  ViewController2.prototype.getPointByCanvas = function(canvasX, canvasY) {
    var viewportMatrix = this.graph.get("group").getMatrix();
    if (!viewportMatrix) {
      viewportMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    var point = invertMatrix({
      x: canvasX,
      y: canvasY
    }, viewportMatrix);
    return point;
  };
  ViewController2.prototype.getPointByClient = function(clientX, clientY) {
    var canvas = this.graph.get("canvas");
    var canvasPoint = canvas.getPointByClient(clientX, clientY);
    return this.getPointByCanvas(canvasPoint.x, canvasPoint.y);
  };
  ViewController2.prototype.getClientByPoint = function(x, y) {
    var canvas = this.graph.get("canvas");
    var canvasPoint = this.getCanvasByPoint(x, y);
    var point = canvas.getClientByPoint(canvasPoint.x, canvasPoint.y);
    return {
      x: point.x,
      y: point.y
    };
  };
  ViewController2.prototype.getCanvasByPoint = function(x, y) {
    var viewportMatrix = this.graph.get("group").getMatrix();
    if (!viewportMatrix) {
      viewportMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    return applyMatrix({
      x,
      y
    }, viewportMatrix);
  };
  ViewController2.prototype.focus = function(item, animate, animateCfg) {
    if (isString(item)) {
      item = this.graph.findById(item);
    }
    if (item) {
      var x = 0, y = 0;
      if (item.getType && item.getType() === "edge") {
        var sourceMatrix = item.getSource().get("group").getMatrix();
        var targetMatrix = item.getTarget().get("group").getMatrix();
        if (sourceMatrix && targetMatrix) {
          x = (sourceMatrix[6] + targetMatrix[6]) / 2;
          y = (sourceMatrix[7] + targetMatrix[7]) / 2;
        } else if (sourceMatrix || targetMatrix) {
          x = sourceMatrix ? sourceMatrix[6] : targetMatrix[6];
          y = sourceMatrix ? sourceMatrix[7] : targetMatrix[7];
        }
      } else {
        var group = item.get("group");
        var matrix = group.getMatrix();
        if (!matrix)
          matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
        x = matrix[6];
        y = matrix[7];
      }
      this.focusPoint({
        x,
        y
      }, animate, animateCfg);
    }
  };
  ViewController2.prototype.changeSize = function(width, height) {
    var graph = this.graph;
    if (!isNumber(width) || !isNumber(height)) {
      throw Error("invalid canvas width & height, please make sure width & height type is number");
    }
    graph.set({
      width,
      height
    });
    var canvas = graph.get("canvas");
    canvas.changeSize(width, height);
    var plugins = graph.get("plugins");
    plugins.forEach(function(plugin) {
      if (plugin.get("gridContainer")) {
        plugin.positionInit();
      }
    });
  };
  ViewController2.prototype.destroy = function() {
    this.graph = null;
    this.destroyed = false;
  };
  return ViewController2;
}();
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  return _typeof$1 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$1(obj);
}
function looseJSONParse(text2) {
  if (typeof text2 !== "string") {
    return text2;
  }
  var safeParse = function safeParse2(str3) {
    if (typeof str3 !== "string") {
      return str3;
    }
    try {
      return JSON.parse(str3.trim());
    } catch (e) {
      return str3.trim();
    }
  };
  var firstAttempt = safeParse(text2);
  if (typeof firstAttempt !== "string") {
    return firstAttempt;
  }
  var tail = function tail2(arr) {
    return arr[arr.length - 1];
  };
  var str2 = text2.trim();
  var objectStack = [];
  var syntaxStack = [];
  var isLastPair = function isLastPair2() {
    var syntaxes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      syntaxes[_i] = arguments[_i];
    }
    return syntaxes.some(function(syntax) {
      return tail(syntaxStack) === syntax;
    });
  };
  var getValueStore = function getValueStore2() {
    return tail(objectStack);
  };
  var rst = null;
  var i = 0;
  var temp = "";
  while (i < str2.length) {
    var nowChar = str2[i];
    var isInString = isLastPair('"', "'");
    if (!isInString && !nowChar.trim()) {
      i += 1;
      continue;
    }
    var isLastTranslate = str2[i - 1] === "\\";
    var isInObject = isLastPair("}");
    var isInArray = isLastPair("]");
    var isWaitingValue = isLastPair(",");
    var tempArr = getValueStore();
    if (isInString) {
      if (tail(syntaxStack) === nowChar && !isLastTranslate) {
        syntaxStack.pop();
        var value = safeParse(temp);
        tempArr.push(value);
        rst = value;
        temp = "";
      } else {
        temp += nowChar;
      }
    } else if (isInArray && nowChar === ",") {
      if (temp) {
        tempArr.push(safeParse(temp));
        temp = "";
      }
    } else if (isInObject && nowChar === ":") {
      syntaxStack.push(",");
      if (temp) {
        tempArr.push(temp);
        temp = "";
      }
    } else if (isWaitingValue && nowChar === ",") {
      if (temp) {
        tempArr.push(safeParse(temp));
        temp = "";
      }
      syntaxStack.pop();
    } else if (nowChar === "}" && (isInObject || isWaitingValue)) {
      if (temp) {
        tempArr.push(safeParse(temp));
        temp = "";
      }
      if (isWaitingValue) {
        syntaxStack.pop();
      }
      var obj = {};
      for (var c = 1; c < tempArr.length; c += 2) {
        obj[tempArr[c - 1]] = tempArr[c];
      }
      objectStack.pop();
      if (objectStack.length) {
        tail(objectStack).push(obj);
      }
      syntaxStack.pop();
      rst = obj;
    } else if (nowChar === "]" && isInArray) {
      if (temp) {
        tempArr.push(safeParse(temp));
        temp = "";
      }
      objectStack.pop();
      if (objectStack.length) {
        tail(objectStack).push(tempArr);
      }
      syntaxStack.pop();
      rst = tempArr;
    } else if (nowChar === "{") {
      objectStack.push([]);
      syntaxStack.push("}");
    } else if (nowChar === "[") {
      objectStack.push([]);
      syntaxStack.push("]");
    } else if (nowChar === '"') {
      syntaxStack.push('"');
    } else if (nowChar === "'") {
      syntaxStack.push("'");
    } else {
      temp += nowChar;
    }
    i += 1;
  }
  return rst || temp;
}
var keyConvert = function keyConvert2(str2) {
  return str2.split("-").reduce(function(a, b) {
    return a + b.charAt(0).toUpperCase() + b.slice(1);
  });
};
var xmlDataRenderer = function xmlDataRenderer2(xml) {
  return function(data) {
    var len = xml.length;
    var arr = [];
    var i = 0;
    var tmp = "";
    while (i < len) {
      if (xml[i] === "{" && xml[i + 1] === "{") {
        arr.push(tmp);
        tmp = "";
        i += 2;
      } else if (xml[i] === "}" && xml[i + 1] === "}") {
        if (arr.length) {
          var last = arr.pop();
          tmp = get(data, tmp, last.endsWith("=") ? '"{'.concat(tmp, '}"') : tmp);
          arr.push(last + tmp);
        }
        i += 2;
        tmp = "";
      } else {
        tmp += xml[i];
        i += 1;
      }
    }
    arr.push(tmp);
    return arr.map(function(e, index) {
      return arr[index - 1] && arr[index - 1].endsWith("=") ? '"{'.concat(e, '}"') : e;
    }).join("");
  };
};
function parseXML(xml, cfg) {
  var attrs = {};
  var keys = xml.getAttributeNames && xml.getAttributeNames() || [];
  var children = xml.children && Array.from(xml.children).map(function(e) {
    return parseXML(e, cfg);
  });
  var rst = {};
  var tagName = xml.tagName ? xml.tagName.toLowerCase() : "group";
  if (tagName === "text") {
    attrs.text = xml.innerText;
  }
  rst.type = tagName;
  if (tagName === "img") {
    rst.type = "image";
  }
  Array.from(keys).forEach(function(k) {
    var key = keyConvert(k);
    var val = xml.getAttribute(k);
    try {
      if (key === "style" || key === "attrs") {
        var style = looseJSONParse(val);
        attrs = __assign(__assign({}, attrs), style);
      } else {
        rst[key] = looseJSONParse(val);
      }
    } catch (e) {
      if (key === "style") {
        throw e;
      }
      rst[key] = val;
    }
  });
  rst.attrs = attrs;
  if (cfg && cfg.style && rst.name && _typeof$1(cfg.style[rst.name]) === "object") {
    rst.attrs = __assign(__assign({}, rst.attrs), cfg.style[rst.name]);
  }
  if (cfg && cfg.style && rst.keyshape) {
    rst.attrs = __assign(__assign({}, rst.attrs), cfg.style);
  }
  if (children.length) {
    rst.children = children;
  }
  return rst;
}
function getBBox2(node, offset, chilrenBBox) {
  var _a = node.attrs, attrs = _a === void 0 ? {} : _a;
  var bbox = {
    x: offset.x || 0,
    y: offset.y || 0,
    width: chilrenBBox.width || 0,
    height: chilrenBBox.height || 0
  };
  var shapeHeight, shapeWidth;
  switch (node.type) {
    case "maker":
    case "circle":
      if (attrs.r) {
        shapeWidth = 2 * attrs.r;
        shapeHeight = 2 * attrs.r;
      }
      break;
    case "text":
      if (attrs.text) {
        shapeWidth = getTextSize(attrs.text, attrs.fontSize || 12)[0];
        shapeHeight = 16;
        bbox.y += shapeHeight;
        bbox.height = shapeHeight;
        bbox.width = shapeWidth;
        node.attrs = __assign({
          fontSize: 12,
          fill: "#000"
        }, attrs);
      }
      break;
    default:
      if (attrs.width) {
        shapeWidth = attrs.width;
      }
      if (attrs.height) {
        shapeHeight = attrs.height;
      }
  }
  if (shapeHeight >= 0) {
    bbox.height = shapeHeight;
  }
  if (shapeWidth >= 0) {
    bbox.width = shapeWidth;
  }
  if (attrs.marginTop) {
    bbox.y += attrs.marginTop;
  }
  if (attrs.marginLeft) {
    bbox.x += attrs.marginLeft;
  }
  return bbox;
}
function generateTarget(target, lastOffset) {
  var _a;
  if (lastOffset === void 0) {
    lastOffset = {
      x: 0,
      y: 0
    };
  }
  var defaultBbox = __assign({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }, lastOffset);
  if ((_a = target.children) === null || _a === void 0 ? void 0 : _a.length) {
    var _b = target.attrs, attrs = _b === void 0 ? {} : _b;
    var marginTop = attrs.marginTop;
    var offset = __assign({}, lastOffset);
    if (marginTop) {
      offset.y += marginTop;
    }
    for (var index = 0; index < target.children.length; index++) {
      target.children[index].attrs.key = "".concat(attrs.key || "root", " -").concat(index, " ");
      var node = generateTarget(target.children[index], offset);
      if (node.bbox) {
        var bbox = node.bbox;
        if (node.attrs.next === "inline") {
          offset.x += node.bbox.width;
        } else {
          offset.y += node.bbox.height;
        }
        if (bbox.width + bbox.x > defaultBbox.width) {
          defaultBbox.width = bbox.width + bbox.x;
        }
        if (bbox.height + bbox.y > defaultBbox.height) {
          defaultBbox.height = bbox.height + bbox.y;
        }
      }
    }
  }
  target.bbox = getBBox2(target, lastOffset, defaultBbox);
  target.attrs = __assign(__assign({}, target.attrs), target.bbox);
  return target;
}
function compareTwoTarget(nowTarget, formerTarget) {
  var _a, _b, _c, _d;
  var type = (nowTarget || {}).type;
  var key = ((formerTarget === null || formerTarget === void 0 ? void 0 : formerTarget.attrs) || {}).key;
  if (key && nowTarget) {
    nowTarget.attrs.key = key;
  }
  if (!nowTarget && formerTarget) {
    return {
      action: "delete",
      val: formerTarget,
      type,
      key
    };
  }
  if (nowTarget && !formerTarget) {
    return {
      action: "add",
      val: nowTarget,
      type
    };
  }
  if (!nowTarget && !formerTarget) {
    return {
      action: "same",
      type
    };
  }
  var children = [];
  if (((_a = nowTarget.children) === null || _a === void 0 ? void 0 : _a.length) > 0 || ((_b = formerTarget.children) === null || _b === void 0 ? void 0 : _b.length) > 0) {
    var length_1 = Math.max((_c = nowTarget.children) === null || _c === void 0 ? void 0 : _c.length, (_d = formerTarget.children) === null || _d === void 0 ? void 0 : _d.length);
    var formerChilren = formerTarget.children || [];
    var nowChilren = nowTarget.children || [];
    for (var index = 0; index < length_1; index += 1) {
      children.push(compareTwoTarget(nowChilren[index], formerChilren[index]));
    }
  }
  var formerKeys = Object.keys(formerTarget.attrs);
  var nowKeys = Object.keys(nowTarget.attrs);
  if (formerTarget.type !== nowTarget.type) {
    return {
      action: "restructure",
      nowTarget,
      formerTarget,
      key,
      children
    };
  }
  if (formerKeys.filter(function(e) {
    return e !== "children";
  }).some(function(e) {
    return nowTarget.attrs[e] !== formerTarget.attrs[e] || !nowKeys.includes(e);
  })) {
    return {
      action: "change",
      val: nowTarget,
      children,
      type,
      key
    };
  }
  return {
    action: "same",
    children,
    type,
    key
  };
}
function createNodeFromXML(gen) {
  var structures = {};
  var compileXML = function compileXML2(cfg) {
    var rawStr = typeof gen === "function" ? gen(cfg) : gen;
    var target = xmlDataRenderer(rawStr)(cfg);
    var xmlParser = document.createElement("div");
    xmlParser.innerHTML = target;
    var xml = xmlParser.children[0];
    var result = generateTarget(parseXML(xml, cfg));
    xmlParser.remove();
    return result;
  };
  return {
    draw: function draw4(cfg, group) {
      var resultTarget = compileXML(cfg);
      var keyshape = group;
      var renderTarget = function renderTarget2(target) {
        var _a = target.attrs, attrs = _a === void 0 ? {} : _a, bbox = target.bbox, type = target.type, children = target.children, rest = __rest(target, ["attrs", "bbox", "type", "children"]);
        if (target.type !== "group") {
          var shape = group.addShape(target.type, __assign({
            attrs,
            origin: {
              bbox,
              type,
              children
            }
          }, rest));
          if (target.keyshape) {
            keyshape = shape;
          }
        }
        if (target.children) {
          target.children.forEach(function(n) {
            return renderTarget2(n);
          });
        }
      };
      renderTarget(resultTarget);
      structures[cfg.id] = [resultTarget];
      return keyshape;
    },
    update: function update7(cfg, node) {
      if (!structures[cfg.id]) {
        structures[cfg.id] = [];
      }
      var container = node.getContainer();
      var children = container.get("children");
      var newTarget = compileXML(cfg);
      var lastTarget = structures[cfg.id].pop();
      var diffResult = compareTwoTarget(newTarget, lastTarget);
      var addShape = function addShape2(shape) {
        var _a;
        if (shape.type !== "group") {
          container.addShape(shape.type, {
            attrs: shape.attrs
          });
        }
        if ((_a = shape.children) === null || _a === void 0 ? void 0 : _a.length) {
          shape.children.map(function(e) {
            return addShape2(e);
          });
        }
      };
      var delShape = function delShape2(shape) {
        var _a;
        var targetShape = children.find(function(e) {
          return e.attrs.key === shape.attrs.key;
        });
        if (targetShape) {
          container.removeChild(targetShape);
        }
        if ((_a = shape.children) === null || _a === void 0 ? void 0 : _a.length) {
          shape.children.map(function(e) {
            return delShape2(e);
          });
        }
      };
      var updateTarget = function updateTarget2(target) {
        var key = target.key;
        if (target.type !== "group") {
          var targetShape = children.find(function(e) {
            return e.attrs.key === key;
          });
          switch (target.action) {
            case "change":
              if (targetShape) {
                var originAttr = target.val.keyshape ? node.getOriginStyle() : {};
                targetShape.attr(__assign(__assign({}, originAttr), target.val.attrs));
              }
              break;
            case "add":
              addShape(target.val);
              break;
            case "delete":
              delShape(target.val);
              break;
            case "restructure":
              delShape(target.formerTarget);
              addShape(target.nowTarget);
              break;
          }
        }
        if (target.children) {
          target.children.forEach(function(n) {
            return updateTarget2(n);
          });
        }
      };
      updateTarget(diffResult);
      structures[cfg.id].push(newTarget);
    },
    getAnchorPoints: function getAnchorPoints4() {
      return [[0, 0.5], [1, 0.5], [0.5, 1], [0.5, 0]];
    }
  };
}
var cache = {};
function ucfirst(str2) {
  if (!cache[str2]) {
    cache[str2] = upperFirst(str2);
  }
  return cache[str2];
}
var ShapeFactoryBase = {
  defaultShapeType: "defaultType",
  className: null,
  getShape: function getShape(type) {
    var self = this;
    var shape = self[type] || self[self.defaultShapeType] || self["simple-circle"];
    return shape;
  },
  draw: function draw(type, cfg, group) {
    var shape = this.getShape(type);
    group["shapeMap"] = {};
    var rst = shape.draw(cfg, group);
    if (shape.afterDraw) {
      shape.afterDraw(cfg, group, rst);
    }
    return rst;
  },
  baseUpdate: function baseUpdate(type, cfg, item, updateType) {
    var _a, _b;
    var shape = this.getShape(type);
    if (shape.update) {
      shape.mergeStyle = (_a = shape.getOptions) === null || _a === void 0 ? void 0 : _a.call(shape, cfg, updateType);
      (_b = shape.update) === null || _b === void 0 ? void 0 : _b.call(shape, cfg, item, updateType);
    }
    if (shape.afterUpdate) {
      shape.afterUpdate(cfg, item);
    }
  },
  setState: function setState(type, name, value, item) {
    var shape = this.getShape(type);
    shape.setState(name, value, item);
  },
  shouldUpdate: function shouldUpdate2(type) {
    var shape = this.getShape(type);
    return !!shape.update;
  },
  getControlPoints: function getControlPoints(type, cfg) {
    var shape = this.getShape(type);
    return shape.getControlPoints(cfg);
  },
  getAnchorPoints: function getAnchorPoints(type, cfg) {
    var shape = this.getShape(type);
    return shape.getAnchorPoints(cfg);
  }
};
var ShapeFramework = {
  options: {},
  draw: function draw2(cfg, group) {
    return this.drawShape(cfg, group);
  },
  drawShape: function drawShape() {
  },
  afterDraw: function afterDraw() {
  },
  afterUpdate: function afterUpdate() {
  },
  setState: function setState2() {
  },
  getControlPoints: function getControlPoints2(cfg) {
    return cfg.controlPoints;
  },
  getAnchorPoints: function getAnchorPoints2(cfg) {
    var defaultAnchorPoints = this.options.anchorPoints;
    var anchorPoints = cfg.anchorPoints || defaultAnchorPoints;
    return anchorPoints;
  }
};
var Shape = function() {
  function Shape2() {
  }
  Shape2.registerFactory = function(factoryType, cfg) {
    var className = ucfirst(factoryType);
    var factoryBase = ShapeFactoryBase;
    var shapeFactory = __assign(__assign({}, factoryBase), cfg);
    Shape2[className] = shapeFactory;
    shapeFactory.className = className;
    return shapeFactory;
  };
  Shape2.getFactory = function(factoryType) {
    var className = ucfirst(factoryType);
    return Shape2[className];
  };
  Shape2.registerNode = function(shapeType, nodeDefinition, extendShapeType) {
    var shapeFactory = Shape2.Node;
    var shapeObj;
    if (typeof nodeDefinition === "string" || typeof nodeDefinition === "function") {
      var autoNodeDefinition = createNodeFromXML(nodeDefinition);
      shapeObj = __assign(__assign({}, shapeFactory.getShape("single-node")), autoNodeDefinition);
    } else if (nodeDefinition.jsx) {
      var jsx = nodeDefinition.jsx;
      var autoNodeDefinition = createNodeFromXML(jsx);
      shapeObj = __assign(__assign(__assign({}, shapeFactory.getShape("single-node")), autoNodeDefinition), nodeDefinition);
    } else {
      shapeFactory.getShape(extendShapeType);
      var extendShape = extendShapeType ? shapeFactory.getShape(extendShapeType) : ShapeFramework;
      shapeObj = __assign(__assign({}, extendShape), nodeDefinition);
    }
    shapeObj.type = shapeType;
    shapeObj.itemType = "node";
    shapeFactory[shapeType] = shapeObj;
    return shapeObj;
  };
  Shape2.registerEdge = function(shapeType, edgeDefinition, extendShapeType) {
    var shapeFactory = Shape2.Edge;
    var extendShape = extendShapeType ? shapeFactory.getShape(extendShapeType) : ShapeFramework;
    var shapeObj = __assign(__assign({}, extendShape), edgeDefinition);
    shapeObj.type = shapeType;
    shapeObj.itemType = "edge";
    shapeFactory[shapeType] = shapeObj;
    return shapeObj;
  };
  Shape2.registerCombo = function(shapeType, comboDefinition, extendShapeType) {
    var shapeFactory = Shape2.Combo;
    var extendShape = extendShapeType ? shapeFactory.getShape(extendShapeType) : ShapeFramework;
    var shapeObj = __assign(__assign({}, extendShape), comboDefinition);
    shapeObj.type = shapeType;
    shapeObj.itemType = "combo";
    shapeFactory[shapeType] = shapeObj;
    return shapeObj;
  };
  return Shape2;
}();
Shape.registerFactory("node", {
  defaultShapeType: "circle"
});
Shape.registerFactory("edge", {
  defaultShapeType: "line"
});
Shape.registerFactory("combo", {
  defaultShapeType: "circle"
});
var CACHE_BBOX$2 = "bboxCache";
var CACHE_CANVAS_BBOX$1 = "bboxCanvasCache";
var ItemBase = function() {
  function ItemBase2(cfg) {
    this._cfg = {};
    this.destroyed = false;
    var defaultCfg = {
      id: void 0,
      type: "item",
      model: {},
      group: void 0,
      animate: false,
      visible: true,
      locked: false,
      event: true,
      keyShape: void 0,
      states: []
    };
    this._cfg = Object.assign(defaultCfg, this.getDefaultCfg(), cfg);
    var model = this.get("model");
    var id = model.id;
    var itemType = this.get("type");
    if (!id) {
      id = uniqueId(itemType);
      this.get("model").id = id;
    }
    this.set("id", id);
    var group = cfg.group;
    if (group) {
      group.set("item", this);
      group.set("id", id);
    }
    this.init();
    this.draw();
    var shapeType = model.shape || model.type || (itemType === "edge" ? "line" : "circle");
    var shapeFactory = this.get("shapeFactory");
    if (shapeFactory && shapeFactory[shapeType]) {
      var options = shapeFactory[shapeType].options;
      if (options && options.stateStyles) {
        var styles = this.get("styles") || model.stateStyles;
        styles = deepMix({}, options.stateStyles, styles);
        this.set("styles", styles);
      }
    }
  }
  ItemBase2.prototype.calculateBBox = function() {
    var keyShape = this.get("keyShape");
    var group = this.get("group");
    var bbox = getBBox$1(keyShape, group);
    bbox.x = bbox.minX;
    bbox.y = bbox.minY;
    bbox.width = bbox.maxX - bbox.minX;
    bbox.height = bbox.maxY - bbox.minY;
    bbox.centerX = (bbox.minX + bbox.maxX) / 2;
    bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    return bbox;
  };
  ItemBase2.prototype.calculateCanvasBBox = function() {
    var keyShape = this.get("keyShape");
    var group = this.get("group");
    var bbox = getBBox$1(keyShape, group);
    bbox.x = bbox.minX;
    bbox.y = bbox.minY;
    bbox.width = bbox.maxX - bbox.minX;
    bbox.height = bbox.maxY - bbox.minY;
    bbox.centerX = (bbox.minX + bbox.maxX) / 2;
    bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    return bbox;
  };
  ItemBase2.prototype.drawInner = function() {
    var self = this;
    var shapeFactory = self.get("shapeFactory");
    var group = self.get("group");
    var model = self.get("model");
    group.clear();
    var visible = model.visible;
    if (visible !== void 0 && !visible)
      self.changeVisibility(visible);
    if (!shapeFactory) {
      return;
    }
    self.updatePosition(model);
    var cfg = self.getShapeCfg(model);
    var shapeType = cfg.type;
    var keyShape = shapeFactory.draw(shapeType, cfg, group);
    if (keyShape) {
      self.set("keyShape", keyShape);
      keyShape.set("isKeyShape", true);
      keyShape.set("draggable", true);
    }
    this.setOriginStyle();
    this.set("currentShape", shapeType);
    this.restoreStates(shapeFactory, shapeType);
  };
  ItemBase2.prototype.setOriginStyle = function() {
    var group = this.get("group");
    var children = group.get("children");
    var keyShape = this.getKeyShape();
    var self = this;
    var keyShapeName = keyShape.get("name");
    if (!this.get("originStyle")) {
      var originStyles = {};
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var shapeType = child.get("type");
        var name_1 = child.get("name");
        if (name_1 && name_1 !== keyShapeName) {
          originStyles[name_1] = shapeType !== "image" ? clone$1(child.attr()) : self.getShapeStyleByName(name_1);
          if (shapeType === "text" && originStyles[name_1]) {
            delete originStyles[name_1].x;
            delete originStyles[name_1].y;
            delete originStyles[name_1].matrix;
          }
        } else {
          var keyShapeStyle = self.getShapeStyleByName();
          delete keyShapeStyle.path;
          delete keyShapeStyle.matrix;
          if (!keyShapeName) {
            Object.assign(originStyles, keyShapeStyle);
          } else {
            if (!name_1) {
              var shapeName = uniqueId("shape");
              child.set("name", shapeName);
              group["shapeMap"][shapeName] = child;
              originStyles[shapeName] = shapeType !== "image" ? clone$1(child.attr()) : self.getShapeStyleByName(name_1);
            } else {
              originStyles[keyShapeName] = keyShapeStyle;
            }
          }
        }
      }
      self.set("originStyle", originStyles);
    } else {
      var styles_1 = this.get("originStyle");
      if (keyShapeName && !styles_1[keyShapeName])
        styles_1[keyShapeName] = {};
      var currentStatesStyle_1 = this.getCurrentStatesStyle();
      var _loop_1 = function _loop_12(i2) {
        var child2 = children[i2];
        var name_2 = child2.get("name");
        var shapeAttrs = child2.attr();
        if (name_2 && name_2 !== keyShapeName) {
          var shapeStateStyle_1 = currentStatesStyle_1[name_2];
          if (!styles_1[name_2])
            styles_1[name_2] = {};
          if (shapeStateStyle_1) {
            Object.keys(shapeAttrs).forEach(function(key) {
              var value = shapeAttrs[key];
              if (value !== shapeStateStyle_1[key])
                styles_1[name_2][key] = value;
            });
          } else {
            styles_1[name_2] = child2.get("type") !== "image" ? clone$1(shapeAttrs) : self.getShapeStyleByName(name_2);
          }
        } else {
          var shapeAttrs_1 = child2.attr();
          var keyShapeStateStyles_1 = {};
          Object.keys(currentStatesStyle_1).forEach(function(styleKey) {
            var subStyle = currentStatesStyle_1[styleKey];
            if (styleKey === keyShapeName || !isPlainObject(subStyle)) {
              keyShapeStateStyles_1[styleKey] = subStyle;
            }
          });
          Object.keys(shapeAttrs_1).forEach(function(key) {
            var value = shapeAttrs_1[key];
            if (keyShapeStateStyles_1[key] !== value) {
              if (keyShapeName)
                styles_1[keyShapeName][key] = value;
              else
                styles_1[key] = value;
            }
          });
        }
      };
      for (var i = 0; i < children.length; i++) {
        _loop_1(i);
      }
      delete styles_1.path;
      delete styles_1.matrix;
      delete styles_1.x;
      delete styles_1.y;
      if (styles_1[keyShapeName]) {
        delete styles_1[keyShapeName].x;
        delete styles_1[keyShapeName].y;
        delete styles_1[keyShapeName].matrix;
        delete styles_1[keyShapeName].path;
      }
      self.set("originStyle", styles_1);
    }
  };
  ItemBase2.prototype.restoreStates = function(shapeFactory, shapeType) {
    var self = this;
    var states = self.get("states");
    each(states, function(state) {
      shapeFactory.setState(shapeType, state, true, self);
    });
  };
  ItemBase2.prototype.init = function() {
    var shapeFactory = Shape.getFactory(this.get("type"));
    this.set("shapeFactory", shapeFactory);
  };
  ItemBase2.prototype.get = function(key) {
    return this._cfg[key];
  };
  ItemBase2.prototype.set = function(key, val) {
    if (isPlainObject(key)) {
      this._cfg = __assign(__assign({}, this._cfg), key);
    } else {
      this._cfg[key] = val;
    }
  };
  ItemBase2.prototype.getDefaultCfg = function() {
    return {};
  };
  ItemBase2.prototype.clearCache = function() {
    this.set(CACHE_BBOX$2, null);
    this.set(CACHE_CANVAS_BBOX$1, null);
  };
  ItemBase2.prototype.beforeDraw = function() {
  };
  ItemBase2.prototype.afterDraw = function() {
  };
  ItemBase2.prototype.afterUpdate = function() {
  };
  ItemBase2.prototype.draw = function() {
    this.beforeDraw();
    this.drawInner();
    this.afterDraw();
  };
  ItemBase2.prototype.getShapeStyleByName = function(name) {
    var group = this.get("group");
    var currentShape;
    if (name) {
      currentShape = group["shapeMap"][name];
    } else {
      currentShape = this.getKeyShape();
    }
    if (currentShape) {
      var styles_2 = {};
      each(currentShape.attr(), function(val, key) {
        if (key !== "img" || isString(val)) {
          styles_2[key] = val;
        }
      });
      return styles_2;
    }
    return {};
  };
  ItemBase2.prototype.getShapeCfg = function(model, updateType) {
    var styles = this.get("styles");
    if (styles) {
      var newModel = model;
      newModel.style = __assign(__assign({}, styles), model.style);
      return newModel;
    }
    return model;
  };
  ItemBase2.prototype.getStateStyle = function(state) {
    var styles = this.get("styles");
    var stateStyle = styles && styles[state];
    return stateStyle;
  };
  ItemBase2.prototype.getOriginStyle = function() {
    return this.get("originStyle");
  };
  ItemBase2.prototype.getCurrentStatesStyle = function() {
    var self = this;
    var styles = {};
    var states = self.getStates();
    if (!states || !states.length) {
      return this.get("originStyle");
    }
    each(self.getStates(), function(state) {
      styles = Object.assign(styles, self.getStateStyle(state));
    });
    return styles;
  };
  ItemBase2.prototype.setState = function(state, value) {
    var states = this.get("states");
    var shapeFactory = this.get("shapeFactory");
    var stateName = state;
    var filterStateName = state;
    if (isString(value)) {
      stateName = "".concat(state, ":").concat(value);
      filterStateName = "".concat(state, ":");
    }
    var newStates = states;
    if (isBoolean(value)) {
      var index = states.indexOf(filterStateName);
      if (value) {
        if (index > -1) {
          return;
        }
        states.push(stateName);
      } else if (index > -1) {
        states.splice(index, 1);
      }
    } else if (isString(value)) {
      var filterStates = states.filter(function(name) {
        return name.includes(filterStateName);
      });
      if (filterStates.length > 0) {
        this.clearStates(filterStates);
      }
      newStates = newStates.filter(function(name) {
        return !name.includes(filterStateName);
      });
      newStates.push(stateName);
      this.set("states", newStates);
    }
    if (shapeFactory) {
      var model = this.get("model");
      var type = model.type;
      shapeFactory.setState(type, state, value, this);
    }
  };
  ItemBase2.prototype.clearStates = function(states) {
    var self = this;
    var originStates = self.getStates();
    var shapeFactory = self.get("shapeFactory");
    var model = self.get("model");
    var shape = model.type;
    if (!states) {
      states = originStates;
    }
    if (isString(states)) {
      states = [states];
    }
    var newStates = originStates.filter(function(state) {
      return states.indexOf(state) === -1;
    });
    self.set("states", newStates);
    states.forEach(function(state) {
      shapeFactory.setState(shape, state, false, self);
    });
  };
  ItemBase2.prototype.getContainer = function() {
    return this.get("group");
  };
  ItemBase2.prototype.getKeyShape = function() {
    return this.get("keyShape");
  };
  ItemBase2.prototype.getModel = function() {
    return this.get("model");
  };
  ItemBase2.prototype.getType = function() {
    return this.get("type");
  };
  ItemBase2.prototype.getID = function() {
    return this.get("id");
  };
  ItemBase2.prototype.isItem = function() {
    return true;
  };
  ItemBase2.prototype.getStates = function() {
    return this.get("states");
  };
  ItemBase2.prototype.hasState = function(state) {
    var states = this.getStates();
    return states.indexOf(state) >= 0;
  };
  ItemBase2.prototype.refresh = function(updateType) {
    var model = this.get("model");
    this.updatePosition(model);
    this.updateShape(updateType);
    this.afterUpdate();
    this.clearCache();
  };
  ItemBase2.prototype.getUpdateType = function(cfg) {
    return void 0;
  };
  ItemBase2.prototype.update = function(cfg, updateType) {
    if (updateType === void 0) {
      updateType = void 0;
    }
    var model = this.get("model");
    if (updateType === "move") {
      this.updatePosition(cfg);
    } else {
      var oriVisible = model.visible;
      var cfgVisible = cfg.visible;
      if (oriVisible !== cfgVisible && cfgVisible !== void 0)
        this.changeVisibility(cfgVisible);
      var originPosition = {
        x: model.x,
        y: model.y
      };
      cfg.x = isNaN(+cfg.x) ? model.x : +cfg.x;
      cfg.y = isNaN(+cfg.y) ? model.y : +cfg.y;
      var styles = this.get("styles");
      if (cfg.stateStyles) {
        var stateStyles = cfg.stateStyles;
        mix(styles, stateStyles);
        delete cfg.stateStyles;
      }
      Object.assign(model, cfg);
      if (originPosition.x !== cfg.x || originPosition.y !== cfg.y) {
        this.updatePosition(cfg);
      }
      this.updateShape(updateType);
    }
    this.afterUpdate();
    this.clearCache();
  };
  ItemBase2.prototype.updateShape = function(updateType) {
    var shapeFactory = this.get("shapeFactory");
    var model = this.get("model");
    var shape = model.type;
    if (shapeFactory.shouldUpdate(shape) && shape === this.get("currentShape")) {
      var updateCfg2 = this.getShapeCfg(model, updateType);
      shapeFactory.baseUpdate(shape, updateCfg2, this, updateType);
      if (updateType !== "move")
        this.setOriginStyle();
    } else {
      this.draw();
    }
    this.restoreStates(shapeFactory, shape);
  };
  ItemBase2.prototype.updatePosition = function(cfg) {
    var model = this.get("model");
    var x = isNaN(+cfg.x) ? +model.x : +cfg.x;
    var y = isNaN(+cfg.y) ? +model.y : +cfg.y;
    var group = this.get("group");
    if (isNaN(x) || isNaN(y)) {
      return false;
    }
    model.x = x;
    model.y = y;
    var matrix = group.getMatrix();
    if (matrix && matrix[6] === x && matrix[7] === y)
      return false;
    group.resetMatrix();
    translate(group, {
      x,
      y
    });
    this.clearCache();
    return true;
  };
  ItemBase2.prototype.getBBox = function() {
    var bbox = this.get(CACHE_BBOX$2);
    if (!bbox) {
      bbox = this.calculateBBox();
      this.set(CACHE_BBOX$2, bbox);
    }
    return bbox;
  };
  ItemBase2.prototype.getCanvasBBox = function() {
    var bbox = this.get(CACHE_CANVAS_BBOX$1);
    if (!bbox) {
      bbox = this.calculateCanvasBBox();
      this.set(CACHE_CANVAS_BBOX$1, bbox);
    }
    return bbox;
  };
  ItemBase2.prototype.toFront = function() {
    var group = this.get("group");
    group.toFront();
  };
  ItemBase2.prototype.toBack = function() {
    var group = this.get("group");
    group.toBack();
  };
  ItemBase2.prototype.show = function() {
    this.changeVisibility(true);
  };
  ItemBase2.prototype.hide = function() {
    this.changeVisibility(false);
  };
  ItemBase2.prototype.changeVisibility = function(visible) {
    var group = this.get("group");
    if (visible) {
      group.show();
    } else {
      group.hide();
    }
    this.set("visible", visible);
  };
  ItemBase2.prototype.isVisible = function() {
    return this.get("visible");
  };
  ItemBase2.prototype.enableCapture = function(enable) {
    var group = this.get("group");
    if (group) {
      group.set("capture", enable);
    }
  };
  ItemBase2.prototype.destroy = function() {
    if (!this.destroyed) {
      var animate = this.get("animate");
      var group = this.get("group");
      if (animate) {
        group.stopAnimate();
      }
      group["shapeMap"] = {};
      this.clearCache();
      group.remove();
      this._cfg = null;
      this.destroyed = true;
    }
  };
  return ItemBase2;
}();
var END_MAP = {
  source: "start",
  target: "end"
};
var ITEM_NAME_SUFFIX = "Node";
var POINT_NAME_SUFFIX = "Point";
var ANCHOR_NAME_SUFFIX = "Anchor";
var Edge = function(_super) {
  __extends(Edge2, _super);
  function Edge2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Edge2.prototype.getDefaultCfg = function() {
    return {
      type: "edge",
      sourceNode: null,
      targetNode: null,
      startPoint: null,
      endPoint: null,
      linkCenter: false
    };
  };
  Edge2.prototype.setEnd = function(name, value) {
    var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    var itemName = name + ITEM_NAME_SUFFIX;
    var preItem = this.get(itemName);
    if (preItem && !preItem.destroyed) {
      preItem.removeEdge(this);
    }
    if (isPlainObject(value)) {
      this.set(pointName, value);
      this.set(itemName, null);
    } else if (value) {
      value.addEdge(this);
      this.set(itemName, value);
      this.set(pointName, null);
    }
  };
  Edge2.prototype.getLinkPoint = function(name, model, controlPoints) {
    var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    var itemName = name + ITEM_NAME_SUFFIX;
    var point = this.get(pointName);
    if (!point) {
      var item = this.get(itemName);
      var anchorName = name + ANCHOR_NAME_SUFFIX;
      var prePoint = this.getPrePoint(name, controlPoints);
      var anchorIndex = model[anchorName];
      if (!isNil(anchorIndex)) {
        point = item.getLinkPointByAnchor(anchorIndex);
      }
      point = point || item.getLinkPoint(prePoint);
      if (!isNil(point.index)) {
        this.set("".concat(name, "AnchorIndex"), point.index);
      }
    }
    return point;
  };
  Edge2.prototype.getPrePoint = function(name, controlPoints) {
    if (controlPoints && controlPoints.length) {
      var index = name === "source" ? 0 : controlPoints.length - 1;
      return controlPoints[index];
    }
    var oppositeName = name === "source" ? "target" : "source";
    return this.getEndPoint(oppositeName);
  };
  Edge2.prototype.getEndPoint = function(name) {
    var itemName = name + ITEM_NAME_SUFFIX;
    var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    var item = this.get(itemName);
    if (item) {
      return item.get("model");
    }
    return this.get(pointName);
  };
  Edge2.prototype.getControlPointsByCenter = function(model) {
    var sourcePoint = this.getEndPoint("source");
    var targetPoint = this.getEndPoint("target");
    var shapeFactory = this.get("shapeFactory");
    var type = model.type;
    return shapeFactory.getControlPoints(type, {
      startPoint: sourcePoint,
      endPoint: targetPoint
    });
  };
  Edge2.prototype.getEndCenter = function(name) {
    var itemName = name + ITEM_NAME_SUFFIX;
    var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    var item = this.get(itemName);
    if (item) {
      var bbox = item.getBBox();
      return {
        x: bbox.centerX,
        y: bbox.centerY
      };
    }
    return this.get(pointName);
  };
  Edge2.prototype.init = function() {
    _super.prototype.init.call(this);
    this.setSource(this.get("source"));
    this.setTarget(this.get("target"));
  };
  Edge2.prototype.getShapeCfg = function(model, updateType) {
    var self = this;
    var linkCenter = self.get("linkCenter");
    var cfg = (updateType === null || updateType === void 0 ? void 0 : updateType.includes("move")) ? model : _super.prototype.getShapeCfg.call(this, model);
    if (linkCenter) {
      cfg.startPoint = self.getEndCenter("source");
      cfg.endPoint = self.getEndCenter("target");
    } else {
      var controlPoints = cfg.controlPoints || self.getControlPointsByCenter(cfg);
      cfg.startPoint = self.getLinkPoint("source", model, controlPoints);
      cfg.endPoint = self.getLinkPoint("target", model, controlPoints);
    }
    cfg.sourceNode = self.get("sourceNode");
    cfg.targetNode = self.get("targetNode");
    return cfg;
  };
  Edge2.prototype.getModel = function() {
    var out = this.get("model");
    var sourceItem = this.get("source".concat(ITEM_NAME_SUFFIX));
    var targetItem = this.get("target".concat(ITEM_NAME_SUFFIX));
    if (sourceItem) {
      delete out["source".concat(ITEM_NAME_SUFFIX)];
    } else {
      out.source = this.get("start".concat(POINT_NAME_SUFFIX));
    }
    if (targetItem) {
      delete out["target".concat(ITEM_NAME_SUFFIX)];
    } else {
      out.target = this.get("end".concat(POINT_NAME_SUFFIX));
    }
    if (!isString(out.source) && !isPlainObject(out.source)) {
      out.source = out.source.getID();
    }
    if (!isString(out.target) && !isPlainObject(out.target)) {
      out.target = out.target.getID();
    }
    return out;
  };
  Edge2.prototype.setSource = function(source) {
    this.setEnd("source", source);
    this.set("source", source);
  };
  Edge2.prototype.setTarget = function(target) {
    this.setEnd("target", target);
    this.set("target", target);
  };
  Edge2.prototype.getSource = function() {
    return this.get("source");
  };
  Edge2.prototype.getTarget = function() {
    return this.get("target");
  };
  Edge2.prototype.updatePosition = function() {
    return false;
  };
  Edge2.prototype.update = function(cfg, updateType) {
    if (updateType === void 0) {
      updateType = void 0;
    }
    var model = this.get("model");
    var oriVisible = model.visible;
    var cfgVisible = cfg.visible;
    if (oriVisible !== cfgVisible && cfgVisible !== void 0)
      this.changeVisibility(cfgVisible);
    var styles = this.get("styles");
    if (cfg.stateStyles) {
      var stateStyles = cfg.stateStyles;
      mix(styles, stateStyles);
      delete cfg.stateStyles;
    }
    Object.assign(model, cfg);
    this.updateShape(updateType);
    this.afterUpdate();
    this.clearCache();
  };
  Edge2.prototype.destroy = function() {
    var sourceItem = this.get("source".concat(ITEM_NAME_SUFFIX));
    var targetItem = this.get("target".concat(ITEM_NAME_SUFFIX));
    if (sourceItem && !sourceItem.destroyed) {
      sourceItem.removeEdge(this);
    }
    if (targetItem && !targetItem.destroyed) {
      targetItem.removeEdge(this);
    }
    _super.prototype.destroy.call(this);
  };
  return Edge2;
}(ItemBase);
var CACHE_ANCHOR_POINTS$1 = "anchorPointsCache";
var CACHE_BBOX$1 = "bboxCache";
var Node = function(_super) {
  __extends(Node2, _super);
  function Node2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Node2.prototype.getNearestPoint = function(points, curPoint) {
    var index = 0;
    var nearestPoint2 = points[0];
    var minDistance = distance$2(points[0], curPoint);
    for (var i = 0; i < points.length; i++) {
      var point = points[i];
      var dis = distance$2(point, curPoint);
      if (dis < minDistance) {
        nearestPoint2 = point;
        minDistance = dis;
        index = i;
      }
    }
    nearestPoint2.anchorIndex = index;
    return nearestPoint2;
  };
  Node2.prototype.getDefaultCfg = function() {
    return {
      type: "node",
      edges: []
    };
  };
  Node2.prototype.getEdges = function() {
    return this.get("edges");
  };
  Node2.prototype.getInEdges = function() {
    var self = this;
    return this.get("edges").filter(function(edge) {
      return edge.get("target") === self;
    });
  };
  Node2.prototype.getOutEdges = function() {
    var self = this;
    return this.get("edges").filter(function(edge) {
      return edge.get("source") === self;
    });
  };
  Node2.prototype.getNeighbors = function(type) {
    var _this = this;
    var edges = this.get("edges");
    if (type === "target") {
      var neighhborsConverter_1 = function neighhborsConverter_12(edge) {
        return edge.getSource() === _this;
      };
      return edges.filter(neighhborsConverter_1).map(function(edge) {
        return edge.getTarget();
      });
    }
    if (type === "source") {
      var neighhborsConverter_2 = function neighhborsConverter_22(edge) {
        return edge.getTarget() === _this;
      };
      return edges.filter(neighhborsConverter_2).map(function(edge) {
        return edge.getSource();
      });
    }
    var neighhborsConverter = function neighhborsConverter2(edge) {
      return edge.getSource() === _this ? edge.getTarget() : edge.getSource();
    };
    return edges.map(neighhborsConverter);
  };
  Node2.prototype.getLinkPointByAnchor = function(index) {
    var anchorPoints = this.getAnchorPoints();
    return anchorPoints[index];
  };
  Node2.prototype.getLinkPoint = function(point) {
    var keyShape = this.get("keyShape");
    var type = keyShape.get("type");
    var itemType = this.get("type");
    var centerX;
    var centerY;
    var bbox = this.getBBox();
    if (itemType === "combo") {
      centerX = bbox.centerX || (bbox.maxX + bbox.minX) / 2;
      centerY = bbox.centerY || (bbox.maxY + bbox.minY) / 2;
    } else {
      centerX = bbox.centerX;
      centerY = bbox.centerY;
    }
    var anchorPoints = this.getAnchorPoints();
    var intersectPoint;
    switch (type) {
      case "circle":
        intersectPoint = getCircleIntersectByPoint({
          x: centerX,
          y: centerY,
          r: bbox.width / 2
        }, point);
        break;
      case "ellipse":
        intersectPoint = getEllipseIntersectByPoint({
          x: centerX,
          y: centerY,
          rx: bbox.width / 2,
          ry: bbox.height / 2
        }, point);
        break;
      default:
        intersectPoint = getRectIntersectByPoint(bbox, point);
    }
    var linkPoint = intersectPoint;
    if (anchorPoints.length) {
      if (!linkPoint) {
        linkPoint = point;
      }
      linkPoint = this.getNearestPoint(anchorPoints, linkPoint);
    }
    if (!linkPoint) {
      linkPoint = {
        x: centerX,
        y: centerY
      };
    }
    return linkPoint;
  };
  Node2.prototype.getAnchorPoints = function() {
    var anchorPoints = this.get(CACHE_ANCHOR_POINTS$1);
    if (!anchorPoints) {
      anchorPoints = [];
      var shapeFactory = this.get("shapeFactory");
      var bbox_1 = this.getBBox();
      var model = this.get("model");
      var shapeCfg = this.getShapeCfg(model);
      var type = model.type;
      var points = shapeFactory.getAnchorPoints(type, shapeCfg) || [];
      each(points, function(pointArr, index) {
        var point = {
          x: bbox_1.minX + pointArr[0] * bbox_1.width,
          y: bbox_1.minY + pointArr[1] * bbox_1.height,
          anchorIndex: index
        };
        anchorPoints.push(point);
      });
      this.set(CACHE_ANCHOR_POINTS$1, anchorPoints);
    }
    return anchorPoints;
  };
  Node2.prototype.addEdge = function(edge) {
    this.get("edges").push(edge);
  };
  Node2.prototype.lock = function() {
    this.set("locked", true);
  };
  Node2.prototype.unlock = function() {
    this.set("locked", false);
  };
  Node2.prototype.hasLocked = function() {
    return this.get("locked");
  };
  Node2.prototype.removeEdge = function(edge) {
    var edges = this.getEdges();
    var index = edges.indexOf(edge);
    if (index > -1)
      edges.splice(index, 1);
  };
  Node2.prototype.clearCache = function() {
    this.set(CACHE_BBOX$1, null);
    this.set(CACHE_ANCHOR_POINTS$1, null);
  };
  Node2.prototype.getUpdateType = function(cfg) {
    var _a, _b, _c, _d, _e;
    if (!cfg)
      return void 0;
    var existX = !isNil(cfg.x);
    var existY = !isNil(cfg.y);
    var keys = Object.keys(cfg);
    if (keys.length === 1 && (existX || existY) || keys.length === 2 && existX && existY)
      return "move";
    if (isNumber(cfg.x) || isNumber(cfg.y) || cfg.type || cfg.anchorPoints || cfg.size || (cfg === null || cfg === void 0 ? void 0 : cfg.style) && (((_a = cfg === null || cfg === void 0 ? void 0 : cfg.style) === null || _a === void 0 ? void 0 : _a.r) || ((_b = cfg === null || cfg === void 0 ? void 0 : cfg.style) === null || _b === void 0 ? void 0 : _b.width) || ((_c = cfg === null || cfg === void 0 ? void 0 : cfg.style) === null || _c === void 0 ? void 0 : _c.height) || ((_d = cfg === null || cfg === void 0 ? void 0 : cfg.style) === null || _d === void 0 ? void 0 : _d.rx) || ((_e = cfg === null || cfg === void 0 ? void 0 : cfg.style) === null || _e === void 0 ? void 0 : _e.ry)))
      return "bbox|label";
    var updateLabel2 = keys.includes("label") || keys.includes("labelCfg");
    return updateLabel2 ? "style|label" : "style";
  };
  return Node2;
}(ItemBase);
var CACHE_BBOX = "bboxCache";
var CACHE_CANVAS_BBOX = "bboxCanvasCache";
var CACHE_SIZE = "sizeCache";
var CACHE_ANCHOR_POINTS = "anchorPointsCache";
var Combo = function(_super) {
  __extends(Combo2, _super);
  function Combo2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Combo2.prototype.getDefaultCfg = function() {
    return {
      type: "combo",
      nodes: [],
      edges: [],
      combos: []
    };
  };
  Combo2.prototype.getShapeCfg = function(model) {
    var styles = this.get("styles");
    var bbox = this.get("bbox");
    if (styles && bbox) {
      var newModel = model;
      var size = {
        r: Math.hypot(bbox.height, bbox.width) / 2 || Global.defaultCombo.size[0] / 2,
        width: bbox.width || Global.defaultCombo.size[0],
        height: bbox.height || Global.defaultCombo.size[1]
      };
      newModel.style = __assign(__assign(__assign({}, styles), model.style), size);
      var padding = model.padding || Global.defaultCombo.padding;
      if (isNumber(padding)) {
        size.r += padding;
        size.width += padding * 2;
        size.height += padding * 2;
      } else {
        size.r += padding[0];
        size.width += padding[1] + padding[3] || padding[1] * 2;
        size.height += padding[0] + padding[2] || padding[0] * 2;
      }
      this.set(CACHE_SIZE, size);
      return newModel;
    }
    return model;
  };
  Combo2.prototype.calculateCanvasBBox = function() {
    if (this.destroyed)
      return;
    var keyShape = this.get("keyShape");
    var group = this.get("group");
    var bbox = getBBox$1(keyShape, group);
    bbox.centerX = (bbox.minX + bbox.maxX) / 2;
    bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    var cacheSize = this.get(CACHE_SIZE);
    var cacheBBox = this.get(CACHE_BBOX) || {};
    var oriX = cacheBBox.x;
    var oriY = cacheBBox.x;
    if (cacheSize) {
      cacheSize.width = Math.max(cacheSize.width, bbox.width);
      cacheSize.height = Math.max(cacheSize.height, bbox.height);
      var type = keyShape.get("type");
      if (type === "circle") {
        bbox.width = cacheSize.r * 2;
        bbox.height = cacheSize.r * 2;
      } else {
        bbox.width = cacheSize.width;
        bbox.height = cacheSize.height;
      }
      bbox.minX = bbox.centerX - bbox.width / 2;
      bbox.minY = bbox.centerY - bbox.height / 2;
      bbox.maxX = bbox.centerX + bbox.width / 2;
      bbox.maxY = bbox.centerY + bbox.height / 2;
    } else {
      bbox.width = bbox.maxX - bbox.minX;
      bbox.height = bbox.maxY - bbox.minY;
      bbox.centerX = (bbox.minX + bbox.maxX) / 2;
      bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    }
    bbox.x = bbox.minX;
    bbox.y = bbox.minY;
    if (bbox.x !== oriX || bbox.y !== oriY)
      this.set(CACHE_ANCHOR_POINTS, null);
    return bbox;
  };
  Combo2.prototype.getChildren = function() {
    var self = this;
    return {
      nodes: self.getNodes(),
      combos: self.getCombos()
    };
  };
  Combo2.prototype.getNodes = function() {
    var self = this;
    return self.get("nodes");
  };
  Combo2.prototype.getCombos = function() {
    var self = this;
    return self.get("combos");
  };
  Combo2.prototype.addChild = function(item) {
    var self = this;
    var itemType = item.getType();
    switch (itemType) {
      case "node":
        self.addNode(item);
        break;
      case "combo":
        self.addCombo(item);
        break;
      default:
        console.warn("Only node or combo items are allowed to be added into a combo");
        return false;
    }
    return true;
  };
  Combo2.prototype.addCombo = function(combo) {
    var self = this;
    self.get("combos").push(combo);
    return true;
  };
  Combo2.prototype.addNode = function(node) {
    var self = this;
    self.get("nodes").push(node);
    return true;
  };
  Combo2.prototype.removeChild = function(item) {
    var self = this;
    var itemType = item.getType();
    switch (itemType) {
      case "node":
        self.removeNode(item);
        break;
      case "combo":
        self.removeCombo(item);
        break;
      default:
        console.warn("Only node or combo items are allowed to be added into a combo");
        return false;
    }
    return true;
  };
  Combo2.prototype.removeCombo = function(combo) {
    if (!combo)
      return;
    var combos = this.getCombos();
    var index = combos.indexOf(combo);
    if (index > -1) {
      combos.splice(index, 1);
      return true;
    }
    return false;
  };
  Combo2.prototype.removeNode = function(node) {
    if (!node)
      return;
    var nodes = this.getNodes();
    var index = nodes.indexOf(node);
    if (index > -1) {
      nodes.splice(index, 1);
      return true;
    }
    return false;
  };
  Combo2.prototype.getUpdateType = function(cfg) {
    return void 0;
  };
  Combo2.prototype.getBBox = function() {
    this.set(CACHE_CANVAS_BBOX, null);
    var bbox = this.calculateCanvasBBox();
    return bbox;
  };
  Combo2.prototype.clearCache = function() {
    this.set(CACHE_BBOX, null);
    this.set(CACHE_CANVAS_BBOX, null);
    this.set(CACHE_ANCHOR_POINTS, null);
  };
  Combo2.prototype.destroy = function() {
    if (!this.destroyed) {
      var animate = this.get("animate");
      var group = this.get("group");
      if (animate) {
        group.stopAnimate();
      }
      group["shapeMap"] = {};
      this.clearCache();
      this.set(CACHE_SIZE, null);
      this.set("bbox", null);
      group.remove();
      this._cfg = null;
      this.destroyed = true;
    }
  };
  return Combo2;
}(Node);
var NODE$1 = "node";
var EDGE = "edge";
var VEDGE = "vedge";
var COMBO = "combo";
var CFG_PREFIX = "default";
var MAPPER_SUFFIX = "Mapper";
var STATE_SUFFIX = "stateStyles";
var ItemController = function() {
  function ItemController2(graph) {
    var _this = this;
    this.edgeToBeUpdateMap = {};
    this.throttleRefresh = throttle(function(_) {
      var _a;
      var graph2 = _this.graph;
      if (!graph2 || graph2.get("destroyed"))
        return;
      var edgeToBeUpdateMap = _this.edgeToBeUpdateMap;
      if (!edgeToBeUpdateMap || !((_a = Object.keys(edgeToBeUpdateMap)) === null || _a === void 0 ? void 0 : _a.length))
        return;
      Object.keys(edgeToBeUpdateMap).forEach(function(eid) {
        var edge = edgeToBeUpdateMap[eid].edge;
        if (!edge || edge.destroyed)
          return;
        var source = edge.getSource();
        var target = edge.getTarget();
        if (!source || source.destroyed || !target || target.destroyed)
          return;
        edge.refresh(edgeToBeUpdateMap[eid].updateType);
      });
      _this.edgeToBeUpdateMap = {};
    }, 16, {
      trailing: true,
      leading: true
    });
    this.graph = graph;
    this.destroyed = false;
  }
  ItemController2.prototype.addItem = function(type, model) {
    var graph = this.graph;
    var vType = type === VEDGE ? EDGE : type;
    var parent = graph.get("".concat(vType, "Group")) || graph.get("group");
    var upperType = upperFirst(vType);
    var item = null;
    var styles = graph.get(vType + upperFirst(STATE_SUFFIX)) || {};
    var defaultModel = graph.get(CFG_PREFIX + upperType);
    if (model[STATE_SUFFIX]) {
      styles = model[STATE_SUFFIX];
    }
    if (defaultModel) {
      each(defaultModel, function(val, cfg) {
        if (isObject$1(val) && !isArray$1(val)) {
          model[cfg] = deepMix({}, val, model[cfg]);
        } else if (isArray$1(val)) {
          model[cfg] = model[cfg] || clone$1(defaultModel[cfg]);
        } else {
          model[cfg] = model[cfg] || defaultModel[cfg];
        }
      });
    }
    var mapper = graph.get(vType + MAPPER_SUFFIX);
    if (mapper) {
      var mappedModel_1 = mapper(model);
      if (mappedModel_1[STATE_SUFFIX]) {
        styles = mappedModel_1[STATE_SUFFIX];
        delete mappedModel_1[STATE_SUFFIX];
      }
      each(mappedModel_1, function(val, cfg) {
        if (isObject$1(val) && !isArray$1(val)) {
          model[cfg] = deepMix({}, model[cfg], val);
        } else {
          model[cfg] = mappedModel_1[cfg] || model[cfg];
        }
      });
    }
    graph.emit("beforeadditem", {
      type,
      model
    });
    if (type === EDGE || type === VEDGE) {
      var source = void 0;
      var target = void 0;
      source = model.source;
      target = model.target;
      if (source && isString(source)) {
        source = graph.findById(source);
      }
      if (target && isString(target)) {
        target = graph.findById(target);
      }
      if (!source || !target) {
        console.warn("The source or target node of edge ".concat(model.id, " does not exist!"));
        return;
      }
      if (source.getType && source.getType() === "combo") {
        model.isComboEdge = true;
      }
      if (target.getType && target.getType() === "combo") {
        model.isComboEdge = true;
      }
      item = new Edge({
        model,
        source,
        target,
        styles,
        linkCenter: graph.get("linkCenter"),
        group: parent.addGroup()
      });
    } else if (type === NODE$1) {
      item = new Node({
        model,
        styles,
        group: parent.addGroup()
      });
    } else if (type === COMBO) {
      var children = model.children;
      var comboBBox = getComboBBox(children, graph);
      var bboxX = void 0, bboxY = void 0;
      if (!isNaN(comboBBox.x))
        bboxX = comboBBox.x;
      else if (isNaN(model.x))
        bboxX = Math.random() * 100;
      if (!isNaN(comboBBox.y))
        bboxY = comboBBox.y;
      else if (isNaN(model.y))
        bboxY = Math.random() * 100;
      if (isNaN(model.x) || isNaN(model.y)) {
        model.x = bboxX;
        model.y = bboxY;
      } else {
        var dx = model.x - bboxX;
        var dy = model.y - bboxY;
        this.updateComboSucceeds(model.id, dx, dy, children);
      }
      var comboGroup = parent.addGroup();
      comboGroup.setZIndex(model.depth);
      item = new Combo({
        model,
        styles,
        bbox: model.collapsed ? getComboBBox([], graph) : comboBBox,
        group: comboGroup
      });
      var comboModel_1 = item.getModel();
      (children || []).forEach(function(child) {
        var childItem = graph.findById(child.id);
        item.addChild(childItem);
        child.depth = comboModel_1.depth + 2;
      });
      if (model.collapsed) {
        setTimeout(function() {
          if (!item.destroyed) {
            graph.collapseCombo(item);
            graph.updateCombo(item);
          }
        }, 0);
      }
    }
    if (item) {
      graph.get("".concat(type, "s")).push(item);
      graph.get("itemMap")[item.get("id")] = item;
      graph.emit("afteradditem", {
        item,
        model
      });
      return item;
    }
  };
  ItemController2.prototype.updateItem = function(item, cfg) {
    var _this = this;
    var _a, _b;
    var graph = this.graph;
    if (isString(item)) {
      item = graph.findById(item);
    }
    if (!item || item.destroyed) {
      return;
    }
    var type = "";
    if (item.getType)
      type = item.getType();
    var mapper = graph.get(type + MAPPER_SUFFIX);
    var model = item.getModel();
    var oriX = model.x, oriY = model.y;
    var updateType = item.getUpdateType(cfg);
    if (mapper) {
      var result = deepMix({}, model, cfg);
      var mappedModel = mapper(result);
      var newModel = deepMix({}, model, mappedModel, cfg);
      if (mappedModel[STATE_SUFFIX]) {
        item.set("styles", newModel[STATE_SUFFIX]);
        delete newModel[STATE_SUFFIX];
      }
      each(newModel, function(val, key) {
        cfg[key] = val;
      });
    } else {
      each(cfg, function(val, key) {
        if (model[key]) {
          if (isObject$1(val) && !isArray$1(val)) {
            cfg[key] = __assign(__assign({}, model[key]), cfg[key]);
          }
        }
      });
    }
    graph.emit("beforeupdateitem", {
      item,
      cfg
    });
    if (type === EDGE) {
      if (cfg.source) {
        var source = cfg.source;
        if (isString(source)) {
          source = graph.findById(source);
        }
        item.setSource(source);
      }
      if (cfg.target) {
        var target = cfg.target;
        if (isString(target)) {
          target = graph.findById(target);
        }
        item.setTarget(target);
      }
      item.update(cfg);
    } else if (type === NODE$1) {
      item.update(cfg, updateType);
      var edges = item.getEdges();
      var refreshEdge = (updateType === null || updateType === void 0 ? void 0 : updateType.includes("bbox")) || updateType === "move";
      if (updateType === "move") {
        each(edges, function(edge) {
          _this.edgeToBeUpdateMap[edge.getID()] = {
            edge,
            updateType
          };
          _this.throttleRefresh();
        });
      } else if (refreshEdge) {
        each(edges, function(edge) {
          edge.refresh(updateType);
        });
      }
    } else if (type === COMBO) {
      item.update(cfg, updateType);
      if (!isNaN(cfg.x) || !isNaN(cfg.y)) {
        var dx = cfg.x - oriX || 0;
        var dy = cfg.y - oriY || 0;
        this.updateComboSucceeds(model.id, dx, dy);
      }
      var edges_1 = item.getEdges();
      var refreshEdge = (updateType === null || updateType === void 0 ? void 0 : updateType.includes("bbox")) || updateType === "move";
      if (refreshEdge && type === COMBO) {
        var shapeFactory = item.get("shapeFactory");
        var shapeType = model.type || "circle";
        var comboAnimate = model.animate === void 0 || cfg.animate === void 0 ? (_b = (_a = shapeFactory[shapeType]) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.animate : model.animate || cfg.animate;
        if (comboAnimate) {
          setTimeout(function() {
            if (!item || item.destroyed)
              return;
            var keyShape = item.getKeyShape();
            if (!keyShape || keyShape.destroyed)
              return;
            each(edges_1, function(edge) {
              if (edge && !edge.destroyed)
                edge.refresh();
            });
          }, 201);
        } else {
          each(edges_1, function(edge) {
            edge.refresh();
          });
        }
      }
    }
    graph.emit("afterupdateitem", {
      item,
      cfg
    });
  };
  ItemController2.prototype.updateCombo = function(combo, children, followCombo) {
    var _this = this;
    var _a, _b;
    var graph = this.graph;
    if (isString(combo)) {
      combo = graph.findById(combo);
    }
    if (!combo || combo.destroyed) {
      return;
    }
    var model = combo.getModel();
    var comboBBox = getComboBBox(children, graph, combo);
    var comboX = comboBBox.x, comboY = comboBBox.y;
    combo.set("bbox", comboBBox);
    var x = comboX, y = comboY;
    if (followCombo) {
      x = isNaN(model.x) ? comboX : model.x;
      y = isNaN(model.y) ? comboY : model.y;
    } else {
      x = isNaN(comboX) ? model.x : comboX;
      y = isNaN(comboY) ? model.y : comboY;
    }
    combo.update({
      x,
      y
    });
    var shapeFactory = combo.get("shapeFactory");
    var shapeType = model.type || "circle";
    var comboAnimate = model.animate === void 0 ? (_b = (_a = shapeFactory[shapeType]) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.animate : model.animate;
    if (comboAnimate) {
      setTimeout(function() {
        if (!combo || combo.destroyed)
          return;
        var keyShape = combo.getKeyShape();
        if (!keyShape || keyShape.destroyed)
          return;
        combo.getShapeCfg(model);
        _this.updateComboEdges(combo);
      }, 201);
    } else {
      this.updateComboEdges(combo);
    }
  };
  ItemController2.prototype.updateComboEdges = function(combo) {
    var combEdges = combo.getEdges() || [];
    for (var i = 0; i < combEdges.length; i++) {
      var edge = combEdges[i];
      if (edge && !edge.destroyed) {
        var edgeSF = edge.get("shapeFactory");
        var edgeCfg = edge.getShapeCfg(edge.getModel());
        var edgeGroup = edge.getContainer();
        edgeGroup.clear();
        var keyShape = edgeSF.draw(edgeCfg.type, edgeCfg, edgeGroup);
        edge.set("keyShape", keyShape);
        keyShape.set("isKeyShape", true);
        keyShape.set("draggable", true);
        edge.setOriginStyle();
      }
    }
  };
  ItemController2.prototype.collapseCombo = function(combo) {
    var graph = this.graph;
    if (isString(combo)) {
      combo = graph.findById(combo);
    }
    var children = combo.getChildren();
    children.nodes.forEach(function(node) {
      graph.hideItem(node);
    });
    children.combos.forEach(function(c) {
      graph.hideItem(c);
    });
  };
  ItemController2.prototype.updateComboSucceeds = function(comboId, dx, dy, children) {
    var _this = this;
    if (children === void 0) {
      children = [];
    }
    var graph = this.graph;
    if (!dx && !dy)
      return;
    var kids = children;
    if (!(kids === null || kids === void 0 ? void 0 : kids.length)) {
      var comboTrees = graph.get("comboTrees");
      comboTrees === null || comboTrees === void 0 ? void 0 : comboTrees.forEach(function(child) {
        traverseTree(child, function(subTree) {
          if (subTree.id === comboId) {
            kids = subTree.children;
            return false;
          }
          return true;
        });
      });
    }
    kids === null || kids === void 0 ? void 0 : kids.forEach(function(child) {
      var childItem = graph.findById(child.id);
      if (childItem) {
        var childModel = childItem.getModel();
        _this.updateItem(child.id, {
          x: (childModel.x || 0) + dx,
          y: (childModel.y || 0) + dy
        });
      }
    });
  };
  ItemController2.prototype.expandCombo = function(combo) {
    var graph = this.graph;
    if (isString(combo)) {
      combo = graph.findById(combo);
    }
    var children = combo.getChildren();
    children.nodes.forEach(function(node) {
      graph.showItem(node);
    });
    children.combos.forEach(function(c) {
      if (c.getModel().collapsed) {
        c.show();
      } else {
        graph.showItem(c);
      }
    });
  };
  ItemController2.prototype.removeItem = function(item) {
    var _this = this;
    var graph = this.graph;
    if (isString(item)) {
      item = graph.findById(item);
    }
    if (!item || item.destroyed) {
      return;
    }
    var itemModel = clone$1(item.getModel());
    graph.emit("beforeremoveitem", {
      item: itemModel
    });
    var type = "";
    if (item.getType)
      type = item.getType();
    var items = graph.get("".concat(type, "s"));
    var index = items.indexOf(item);
    if (index > -1)
      items.splice(index, 1);
    if (type === EDGE) {
      var vitems = graph.get("v".concat(type, "s"));
      var vindex = vitems.indexOf(item);
      if (vindex > -1)
        vitems.splice(vindex, 1);
    }
    var itemId = item.get("id");
    var itemMap = graph.get("itemMap");
    delete itemMap[itemId];
    var comboTrees = graph.get("comboTrees");
    var id = item.get("id");
    if (type === NODE$1) {
      var comboId = item.getModel().comboId;
      if (comboTrees && comboId) {
        var brothers_1 = comboTrees;
        var found_1 = false;
        comboTrees.forEach(function(ctree) {
          if (found_1)
            return;
          traverseTree(ctree, function(combo) {
            if (combo.id === id && brothers_1) {
              var bidx = brothers_1.indexOf(combo);
              brothers_1.splice(bidx, 1);
              found_1 = true;
              return false;
            }
            brothers_1 = combo.children;
            return true;
          });
        });
      }
      var edges = item.getEdges();
      for (var i = edges.length - 1; i >= 0; i--) {
        graph.removeItem(edges[i], false);
      }
      if (comboId)
        graph.updateCombo(comboId);
    } else if (type === COMBO) {
      var parentId = item.getModel().parentId;
      var comboInTree_1;
      var found_2 = false;
      (comboTrees || []).forEach(function(ctree) {
        if (found_2)
          return;
        traverseTree(ctree, function(combo) {
          if (combo.id === id) {
            comboInTree_1 = combo;
            found_2 = true;
            return false;
          }
          return true;
        });
      });
      comboInTree_1.removed = true;
      if (comboInTree_1 && comboInTree_1.children) {
        comboInTree_1.children.forEach(function(child) {
          _this.removeItem(child.id);
        });
      }
      var edges = item.getEdges();
      for (var i = edges.length; i >= 0; i--) {
        graph.removeItem(edges[i], false);
      }
      if (parentId)
        graph.updateCombo(parentId);
    }
    item.destroy();
    graph.emit("afterremoveitem", {
      item: itemModel,
      type
    });
  };
  ItemController2.prototype.setItemState = function(item, state, value) {
    var graph = this.graph;
    var stateName = state;
    if (isString(value)) {
      stateName = "".concat(state, ":").concat(value);
    }
    if (item.hasState(stateName) === value && value || isString(value) && item.hasState(stateName)) {
      return;
    }
    graph.emit("beforeitemstatechange", {
      item,
      state: stateName,
      enabled: value
    });
    item.setState(state, value);
    graph.autoPaint();
    graph.emit("afteritemstatechange", {
      item,
      state: stateName,
      enabled: value
    });
  };
  ItemController2.prototype.priorityState = function(item, state) {
    var graph = this.graph;
    var currentItem = item;
    if (isString(item)) {
      currentItem = graph.findById(item);
    }
    this.setItemState(currentItem, state, false);
    this.setItemState(currentItem, state, true);
  };
  ItemController2.prototype.clearItemStates = function(item, states) {
    var graph = this.graph;
    if (isString(item)) {
      item = graph.findById(item);
    }
    graph.emit("beforeitemstatesclear", {
      item,
      states
    });
    item.clearStates(states);
    graph.emit("afteritemstatesclear", {
      item,
      states
    });
  };
  ItemController2.prototype.refreshItem = function(item) {
    var graph = this.graph;
    if (isString(item)) {
      item = graph.findById(item);
    }
    graph.emit("beforeitemrefresh", {
      item
    });
    item.refresh();
    graph.emit("afteritemrefresh", {
      item
    });
  };
  ItemController2.prototype.addCombos = function(comboTrees, comboModels) {
    var _this = this;
    var graph = this.graph;
    (comboTrees || []).forEach(function(ctree) {
      traverseTreeUp(ctree, function(child) {
        var comboModel;
        comboModels.forEach(function(model) {
          if (model.id === child.id) {
            model.children = child.children;
            model.depth = child.depth;
            comboModel = model;
          }
        });
        if (comboModel) {
          _this.addItem("combo", comboModel);
        }
        return true;
      });
    });
    var comboGroup = graph.get("comboGroup");
    if (comboGroup)
      comboGroup.sort();
  };
  ItemController2.prototype.changeItemVisibility = function(item, visible) {
    var _this = this;
    var graph = this.graph;
    if (isString(item)) {
      item = graph.findById(item);
    }
    if (!item) {
      console.warn("The item to be shown or hidden does not exist!");
      return;
    }
    graph.emit("beforeitemvisibilitychange", {
      item,
      visible
    });
    item.changeVisibility(visible);
    if (item.getType && item.getType() === NODE$1) {
      var edges = item.getEdges();
      each(edges, function(edge) {
        if (visible && !(edge.get("source").isVisible() && edge.get("target").isVisible())) {
          return;
        }
        _this.changeItemVisibility(edge, visible);
      });
    } else if (item.getType && item.getType() === COMBO) {
      var comboTrees = graph.get("comboTrees");
      var id_1 = item.get("id");
      var children_1 = [];
      var found_3 = false;
      (comboTrees || []).forEach(function(ctree) {
        if (found_3)
          return;
        if (!ctree.children || ctree.children.length === 0)
          return;
        traverseTree(ctree, function(combo) {
          if (combo.id === id_1) {
            children_1 = combo.children;
            found_3 = true;
            return false;
          }
          return true;
        });
      });
      if (children_1 && (!visible || visible && !item.getModel().collapsed)) {
        children_1.forEach(function(child) {
          var childItem = graph.findById(child.id);
          _this.changeItemVisibility(childItem, visible);
        });
      }
      var edges = item.getEdges();
      each(edges, function(edge) {
        if (visible && !(edge.get("source").isVisible() && edge.get("target").isVisible())) {
          return;
        }
        _this.changeItemVisibility(edge, visible);
      });
    }
    graph.emit("afteritemvisibilitychange", {
      item,
      visible
    });
    return item;
  };
  ItemController2.prototype.destroy = function() {
    this.graph = null;
    this.destroyed = true;
  };
  return ItemController2;
}();
var timer = null;
var StateController = function() {
  function StateController2(graph) {
    this.graph = graph;
    this.cachedStates = {
      enabled: {},
      disabled: {}
    };
    this.destroyed = false;
  }
  StateController2.checkCache = function(item, state, cache2) {
    if (!cache2[state]) {
      return;
    }
    var index = cache2[state].indexOf(item);
    if (index >= 0) {
      cache2[state].splice(index, 1);
    }
  };
  StateController2.cacheState = function(item, state, states) {
    if (!states[state]) {
      states[state] = [];
    }
    states[state].push(item);
  };
  StateController2.prototype.updateState = function(item, state, enabled) {
    var _this = this;
    var checkCache = StateController2.checkCache, cacheState = StateController2.cacheState;
    if (item.destroyed) {
      return;
    }
    var cachedStates = this.cachedStates;
    var enabledStates = cachedStates.enabled;
    var disabledStates = cachedStates.disabled;
    if (enabled) {
      checkCache(item, state, disabledStates);
      cacheState(item, state, enabledStates);
    } else {
      checkCache(item, state, enabledStates);
      cacheState(item, state, disabledStates);
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      timer = null;
      _this.updateGraphStates();
    }, 16);
  };
  StateController2.prototype.updateStates = function(item, states, enabled) {
    var _this = this;
    if (isString(states)) {
      this.updateState(item, states, enabled);
    } else {
      states.forEach(function(state) {
        _this.updateState(item, state, enabled);
      });
    }
  };
  StateController2.prototype.updateGraphStates = function() {
    var states = this.graph.get("states");
    var cachedStates = this.cachedStates;
    each(cachedStates.disabled, function(val, key) {
      if (states[key]) {
        states[key] = states[key].filter(function(item) {
          return val.indexOf(item) < 0 && !val.destroyed;
        });
      }
    });
    each(cachedStates.enabled, function(val, key) {
      if (!states[key]) {
        states[key] = val;
      } else {
        var map_1 = {};
        states[key].forEach(function(item) {
          if (!item.destroyed) {
            map_1[item.get("id")] = true;
          }
        });
        val.forEach(function(item) {
          if (!item.destroyed) {
            var id = item.get("id");
            if (!map_1[id]) {
              map_1[id] = true;
              states[key].push(item);
            }
          }
        });
      }
    });
    this.graph.emit("graphstatechange", {
      states
    });
    this.cachedStates = {
      enabled: {},
      disabled: {}
    };
  };
  StateController2.prototype.destroy = function() {
    this.graph = null;
    this.cachedStates = null;
    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
    this.destroyed = true;
  };
  return StateController2;
}();
var substitute = function substitute2(str2, o) {
  if (!str2 || !o) {
    return str2;
  }
  return str2.replace(/\\?\{([^{}]+)\}/g, function(match, name) {
    if (match.charAt(0) === "\\") {
      return match.slice(1);
    }
    var res = o[name];
    if (res === 0)
      res = "0";
    return res || "";
  });
};
var getSpline = function getSpline2(points) {
  var data = [];
  if (points.length < 2) {
    throw new Error("point length must largn than 2, now it's ".concat(points.length));
  }
  for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
    var point = points_1[_i];
    var x = point.x, y = point.y;
    data.push(x);
    data.push(y);
  }
  var spliePath = catmullRom2Bezier(data);
  spliePath.unshift(["M", points[0].x, points[0].y]);
  return spliePath;
};
var getControlPoint = function getControlPoint2(startPoint, endPoint, percent, offset) {
  if (percent === void 0) {
    percent = 0;
  }
  if (offset === void 0) {
    offset = 0;
  }
  var point = {
    x: (1 - percent) * startPoint.x + percent * endPoint.x,
    y: (1 - percent) * startPoint.y + percent * endPoint.y
  };
  var tangent = [0, 0];
  normalize(tangent, [endPoint.x - startPoint.x, endPoint.y - startPoint.y]);
  if (!tangent || !tangent[0] && !tangent[1]) {
    tangent = [0, 0];
  }
  var perpendicular = [-tangent[1] * offset, tangent[0] * offset];
  point.x += perpendicular[0];
  point.y += perpendicular[1];
  return point;
};
var pointsToPolygon = function pointsToPolygon2(points, z) {
  var length = points.length;
  if (!length) {
    return "";
  }
  var path2 = "";
  var str2 = "";
  for (var i = 0; i < length; i++) {
    var item = points[i];
    if (i === 0) {
      str2 = "M{x} {y}";
    } else {
      str2 = "L{x} {y}";
    }
    path2 += substitute(str2, item);
  }
  if (z) {
    path2 += "Z";
  }
  return path2;
};
var pathToPoints = function pathToPoints2(path2) {
  var points = [];
  path2.forEach(function(seg) {
    var command = seg[0];
    if (command !== "A") {
      for (var i = 1; i < seg.length; i = i + 2) {
        points.push([seg[i], seg[i + 1]]);
      }
    } else {
      var length_1 = seg.length;
      points.push([seg[length_1 - 2], seg[length_1 - 1]]);
    }
  });
  return points;
};
var getClosedSpline = function getClosedSpline2(points) {
  if (points.length < 2) {
    throw new Error("point length must largn than 2, now it's ".concat(points.length));
  }
  var first = points[0];
  var second = points[1];
  var last = points[points.length - 1];
  var lastSecond = points[points.length - 2];
  points.unshift(last);
  points.unshift(lastSecond);
  points.push(first);
  points.push(second);
  var closedPath = [];
  for (var i = 1; i < points.length - 2; i += 1) {
    var x0 = points[i - 1].x;
    var y0 = points[i - 1].y;
    var x1 = points[i].x;
    var y1 = points[i].y;
    var x2 = points[i + 1].x;
    var y2 = points[i + 1].y;
    var x3 = i !== points.length - 2 ? points[i + 2].x : x2;
    var y3 = i !== points.length - 2 ? points[i + 2].y : y2;
    var cp1x = x1 + (x2 - x0) / 6;
    var cp1y = y1 + (y2 - y0) / 6;
    var cp2x = x2 - (x3 - x1) / 6;
    var cp2y = y2 - (y3 - y1) / 6;
    closedPath.push(["C", cp1x, cp1y, cp2x, cp2y, x2, y2]);
  }
  closedPath.unshift(["M", last.x, last.y]);
  return closedPath;
};
var vecScaleTo = function vecScaleTo2(v, length) {
  return scale$1([0, 0], normalize([0, 0], v), length);
};
var unitNormal = function unitNormal2(p0, p1) {
  var n = [p0[1] - p1[1], p1[0] - p0[0]];
  var nLength = Math.sqrt(n[0] * n[0] + n[1] * n[1]);
  if (nLength === 0) {
    throw new Error("p0 should not be equal to p1");
  }
  return [n[0] / nLength, n[1] / nLength];
};
var vecFrom = function vecFrom2(p0, p1) {
  return [p1[0] - p0[0], p1[1] - p0[1]];
};
function roundedHull(polyPoints, padding) {
  var roundedHull1 = function roundedHull12(points) {
    var p12 = [points[0][0], points[0][1] - padding];
    var p2 = [points[0][0], points[0][1] + padding];
    return "M ".concat(p12, " A ").concat(padding, ",").concat(padding, ",0,0,0,").concat(p2, " A ").concat(padding, ",").concat(padding, ",0,0,0,").concat(p12);
  };
  var roundedHull2 = function roundedHull22(points) {
    var offsetVector = scale$1([0, 0], unitNormal(points[0], points[1]), padding);
    var invOffsetVector = scale$1([0, 0], offsetVector, -1);
    var p02 = add([0, 0], points[0], offsetVector);
    var p12 = add([0, 0], points[1], offsetVector);
    var p2 = add([0, 0], points[1], invOffsetVector);
    var p3 = add([0, 0], points[0], invOffsetVector);
    return "M ".concat(p02, " L ").concat(p12, " A ").concat([padding, padding, "0,0,0", p2].join(","), " L ").concat(p3, " A ").concat([padding, padding, "0,0,0", p02].join(","));
  };
  if (!polyPoints || polyPoints.length < 1)
    return "";
  if (polyPoints.length === 1)
    return roundedHull1(polyPoints);
  if (polyPoints.length === 2)
    return roundedHull2(polyPoints);
  var segments = new Array(polyPoints.length);
  for (var segmentIndex = 0; segmentIndex < segments.length; ++segmentIndex) {
    var p0 = segmentIndex === 0 ? polyPoints[polyPoints.length - 1] : polyPoints[segmentIndex - 1];
    var p1 = polyPoints[segmentIndex];
    var offset = scale$1([0, 0], unitNormal(p0, p1), padding);
    segments[segmentIndex] = [add([0, 0], p0, offset), add([0, 0], p1, offset)];
  }
  var arcData = "A ".concat([padding, padding, "0,0,0,"].join(","));
  segments = segments.map(function(segment, index) {
    var pathFragment = "";
    if (index === 0) {
      pathFragment = "M ".concat(segments[segments.length - 1][1], " ");
    }
    pathFragment += "".concat(arcData + segment[0], " L ").concat(segment[1]);
    return pathFragment;
  });
  return segments.join(" ");
}
function paddedHull(polyPoints, padding) {
  var pointCount = polyPoints.length;
  var smoothHull1 = function smoothHull12(points) {
    var p1 = [points[0][0], points[0][1] - padding];
    var p2 = [points[0][0], points[0][1] + padding];
    return "M ".concat(p1, " A ").concat([padding, padding, "0,0,0", p2].join(","), " A ").concat([padding, padding, "0,0,0", p1].join(","));
  };
  var smoothHull2 = function smoothHull22(points) {
    var v = vecFrom(points[0], points[1]);
    var extensionVec2 = vecScaleTo(v, padding);
    var extension0 = add([0, 0], points[0], scale$1([0, 0], extensionVec2, -1));
    var extension1 = add([0, 0], points[1], extensionVec2);
    var tangentHalfLength = 1.2 * padding;
    var controlDelta = vecScaleTo(normalize([0, 0], v), tangentHalfLength);
    var invControlDelta = scale$1([0, 0], controlDelta, -1);
    var control0 = add([0, 0], extension0, invControlDelta);
    var control1 = add([0, 0], extension1, invControlDelta);
    var control3 = add([0, 0], extension0, controlDelta);
    return "M ".concat(extension0, " C ").concat([control0, control1, extension1].join(","), " S ").concat([control3, extension0].join(","), " Z");
  };
  if (!polyPoints || pointCount < 1)
    return "";
  if (pointCount === 1)
    return smoothHull1(polyPoints);
  if (pointCount === 2)
    return smoothHull2(polyPoints);
  var hullPoints = polyPoints.map(function(point, index) {
    var pNext = polyPoints[(index + 1) % pointCount];
    return {
      p: point,
      v: normalize([0, 0], vecFrom(point, pNext))
    };
  });
  for (var i = 0; i < hullPoints.length; ++i) {
    var priorIndex = i > 0 ? i - 1 : pointCount - 1;
    var extensionVec = normalize([0, 0], add([0, 0], hullPoints[priorIndex].v, scale$1([0, 0], hullPoints[i].v, -1)));
    hullPoints[i].p = add([0, 0], hullPoints[i].p, scale$1([0, 0], extensionVec, padding));
  }
  return hullPoints.map(function(obj) {
    var point = obj.p;
    return {
      x: point[0],
      y: point[1]
    };
  });
}
var PathUtil = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getSpline,
  getControlPoint,
  pointsToPolygon,
  pathToPoints,
  getClosedSpline,
  roundedHull,
  paddedHull
}, Symbol.toStringTag, { value: "Module" }));
var cross = function cross2(a, b, o) {
  return (a.y - o.y) * (b.x - o.x) - (a.x - o.x) * (b.y - o.y);
};
var genConvexHull = function genConvexHull2(items) {
  var points = items.map(function(item) {
    return {
      x: item.getModel().x,
      y: item.getModel().y
    };
  });
  points.sort(function(a, b) {
    return a.x === b.x ? a.y - b.y : a.x - b.x;
  });
  if (points.length === 1) {
    return points;
  }
  var lower = [];
  for (var i = 0; i < points.length; i++) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
      lower.pop();
    }
    lower.push(points[i]);
  }
  var upper = [];
  for (var i = points.length - 1; i >= 0; i--) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
      upper.pop();
    }
    upper.push(points[i]);
  }
  upper.pop();
  lower.pop();
  var strictHull = lower.concat(upper);
  return strictHull;
};
var defaultOps = {
  maxRoutingIterations: 100,
  maxMarchingIterations: 100,
  pixelGroupSize: 2,
  edgeR0: 10,
  edgeR1: 10,
  nodeR0: 5,
  nodeR1: 10,
  morphBuffer: 5,
  threshold: 1e-3,
  skip: 16,
  nodeInfluenceFactor: 1,
  edgeInfluenceFactor: 1,
  negativeNodeInfluenceFactor: -0.5
};
function MarchingSquares(contour, potentialArea, threshold) {
  var marched = false;
  var getVal = function getVal2(x, y) {
    return potentialArea.cells[x + y * potentialArea.width];
  };
  var getState = function getState2(x, y) {
    var squareVal = 0;
    if (getVal(x - 1, y - 1) >= threshold) {
      squareVal += 1;
    }
    if (getVal(x, y - 1) > threshold) {
      squareVal += 2;
    }
    if (getVal(x - 1, y) > threshold) {
      squareVal += 4;
    }
    if (getVal(x, y) > threshold) {
      squareVal += 8;
    }
    return squareVal;
  };
  var doMarch = function doMarch2(xPos, yPos) {
    var x = xPos;
    var y = yPos;
    var prevX;
    var prevY;
    for (var i = 0; i < potentialArea.width * potentialArea.height; i++) {
      prevX = x;
      prevY = y;
      if (contour.findIndex(function(item) {
        return item.x === x && item.y === y;
      }) > -1) {
        if (contour[0].x !== x || contour[0].y !== y)
          ;
        else {
          return true;
        }
      } else {
        contour.push({
          x,
          y
        });
      }
      var state = getState(x, y);
      switch (state) {
        case -1:
          console.warn("Marched out of bounds");
          return true;
        case 0:
        case 3:
        case 2:
        case 7:
          x++;
          break;
        case 12:
        case 14:
        case 4:
          x--;
          break;
        case 6:
          if (prevX === 0) {
            if (prevY === -1) {
              x -= 1;
            } else {
              x += 1;
            }
          }
          break;
        case 1:
        case 13:
        case 5:
          y--;
          break;
        case 9:
          if (prevX === 1) {
            if (prevY === 0) {
              y -= 1;
            } else {
              y += 1;
            }
          }
          break;
        case 10:
        case 8:
        case 11:
          y++;
          break;
        default:
          console.warn("Marching squares invalid state: ".concat(state));
          return true;
      }
    }
  };
  this.march = function() {
    for (var x = 0; x < potentialArea.width && !marched; x += 1) {
      for (var y = 0; y < potentialArea.height && !marched; y += 1) {
        if (getVal(x, y) > threshold && getState(x, y) !== 15) {
          marched = doMarch(x, y);
        }
      }
    }
    return marched;
  };
}
var initGridCells = function initGridCells2(width, height, pixelGroupSize) {
  var scaleWidth = Math.ceil(width / pixelGroupSize);
  var scaleHeight = Math.ceil(height / pixelGroupSize);
  var gridCells = new Float32Array(Math.max(0, scaleWidth * scaleHeight)).fill(0);
  return {
    cells: gridCells,
    width: scaleWidth,
    height: scaleHeight
  };
};
var pickBestNeighbor = function pickBestNeighbor2(item, visited, nonMembers) {
  var closestNeighbour = null;
  var minCost = Number.POSITIVE_INFINITY;
  visited.forEach(function(neighbourItem) {
    var itemP = {
      x: item.getModel().x,
      y: item.getModel().y
    };
    var neighbourItemP = {
      x: neighbourItem.getModel().x,
      y: neighbourItem.getModel().y
    };
    var dist = squareDist(itemP, neighbourItemP);
    var directLine = new Line(itemP.x, itemP.y, neighbourItemP.x, neighbourItemP.y);
    var numberObstacles = nonMembers.reduce(function(count, _item) {
      if (fractionToLine(_item, directLine) > 0) {
        return count + 1;
      }
      return count;
    }, 0);
    if (dist * Math.pow(numberObstacles + 1, 2) < minCost) {
      closestNeighbour = neighbourItem;
      minCost = dist * Math.pow(numberObstacles + 1, 2);
    }
  });
  return closestNeighbour;
};
var getIntersectItem = function getIntersectItem2(items, line2) {
  var minDistance = Number.POSITIVE_INFINITY;
  var closestItem = null;
  items.forEach(function(item) {
    var distance3 = fractionToLine(item, line2);
    if (distance3 >= 0 && distance3 < minDistance) {
      closestItem = item;
      minDistance = distance3;
    }
  });
  return closestItem;
};
var computeRoute = function computeRoute2(directLine, nonMembers, maxRoutingIterations, morphBuffer) {
  var checkedLines = [];
  var linesToCheck = [];
  linesToCheck.push(directLine);
  var hasIntersection = true;
  var iterations = 0;
  var pointExists = function pointExists2(point, lines) {
    var flag = false;
    lines.forEach(function(line2) {
      if (flag)
        return;
      if (isPointsOverlap(point, {
        x: line2.x1,
        y: line2.y1
      }) || isPointsOverlap(point, {
        x: line2.x2,
        y: line2.y2
      })) {
        flag = true;
      }
    });
    return flag;
  };
  var isPointInNonMembers = function isPointInNonMembers2(point, _nonMembers) {
    for (var _i = 0, _nonMembers_1 = _nonMembers; _i < _nonMembers_1.length; _i++) {
      var item = _nonMembers_1[_i];
      var bbox = item.getBBox();
      var itemContour = [[bbox.x, bbox.y], [bbox.x + bbox.width, bbox.y], [bbox.x, bbox.y + bbox.height], [bbox.x + bbox.width, bbox.y + bbox.height]];
      if (isPointInPolygon(itemContour, point.x, point.y)) {
        return true;
      }
    }
    return false;
  };
  while (hasIntersection && iterations < maxRoutingIterations) {
    hasIntersection = false;
    var _loop_1 = function _loop_12() {
      var line2 = linesToCheck.pop();
      var closestItem = getIntersectItem(nonMembers, line2);
      if (closestItem) {
        var _a = itemIntersectByLine(closestItem, line2), intersections_1 = _a[0], countIntersections = _a[1];
        if (countIntersections === 2) {
          var testReroute = function testReroute2(isFirst) {
            var tempMorphBuffer = morphBuffer;
            var virtualNode = rerouteLine(closestItem, tempMorphBuffer, intersections_1, isFirst);
            var exist = pointExists(virtualNode, linesToCheck) || pointExists(virtualNode, checkedLines);
            var pointInside = isPointInNonMembers(virtualNode, nonMembers);
            while (!exist && pointInside && tempMorphBuffer >= 1) {
              tempMorphBuffer /= 1.5;
              virtualNode = rerouteLine(closestItem, tempMorphBuffer, intersections_1, isFirst);
              exist = pointExists(virtualNode, linesToCheck) || pointExists(virtualNode, checkedLines);
              pointInside = isPointInNonMembers(virtualNode, nonMembers);
            }
            if (virtualNode && !exist && (!isFirst || !pointInside)) {
              linesToCheck.push(new Line(line2.x1, line2.y1, virtualNode.x, virtualNode.y));
              linesToCheck.push(new Line(virtualNode.x, virtualNode.y, line2.x2, line2.y2));
              hasIntersection = true;
            }
          };
          testReroute(true);
          if (!hasIntersection) {
            testReroute(false);
          }
        }
      }
      if (!hasIntersection) {
        checkedLines.push(line2);
      }
      iterations += 1;
    };
    while (!hasIntersection && linesToCheck.length) {
      _loop_1();
    }
  }
  while (linesToCheck.length) {
    checkedLines.push(linesToCheck.pop());
  }
  return checkedLines;
};
function getRoute(item, nonMembers, visited, maxRoutingIterations, morphBuffer) {
  var optimalNeighbor = pickBestNeighbor(item, visited, nonMembers);
  if (optimalNeighbor === null) {
    return [];
  }
  var mergeLines = function mergeLines2(checkedLines2) {
    var finalRoute2 = [];
    while (checkedLines2.length > 0) {
      var line1 = checkedLines2.pop();
      if (checkedLines2.length === 0) {
        finalRoute2.push(line1);
        break;
      }
      var line2 = checkedLines2.pop();
      var mergeLine = new Line(line1.x1, line1.y1, line2.x2, line2.y2);
      var closestItem = getIntersectItem(nonMembers, mergeLine);
      if (!closestItem) {
        checkedLines2.push(mergeLine);
      } else {
        finalRoute2.push(line1);
        checkedLines2.push(line2);
      }
    }
    return finalRoute2;
  };
  var directLine = new Line(item.getModel().x, item.getModel().y, optimalNeighbor.getModel().x, optimalNeighbor.getModel().y);
  var checkedLines = computeRoute(directLine, nonMembers, maxRoutingIterations, morphBuffer);
  var finalRoute = mergeLines(checkedLines);
  return finalRoute;
}
var genBubbleSet = function genBubbleSet2(members, nonMembers, ops) {
  var options = Object.assign(defaultOps, ops);
  var centroid = getPointsCenter(members.map(function(item) {
    return {
      x: item.getModel().x,
      y: item.getModel().y
    };
  }));
  members = members.sort(function(a, b) {
    return squareDist({
      x: a.getModel().x,
      y: a.getModel().y
    }, centroid) - squareDist({
      x: b.getModel().x,
      y: b.getModel().y
    }, centroid);
  });
  var visited = [];
  var virtualEdges = [];
  members.forEach(function(item) {
    var lines = getRoute(item, nonMembers, visited, options.maxRoutingIterations, options.morphBuffer);
    lines.forEach(function(l) {
      virtualEdges.push(l);
    });
    visited.push(item);
  });
  var activeRegion = getActiveRregion(members, virtualEdges, options.nodeR0);
  var potentialArea = initGridCells(activeRegion.width, activeRegion.height, options.pixelGroupSize);
  var contour = [];
  var hull = [];
  for (var iterations = 0; iterations < options.maxMarchingIterations; iterations++) {
    fillPotentialArea(members, nonMembers, virtualEdges, activeRegion, potentialArea, options);
    contour = [];
    hull = [];
    if (!new MarchingSquares(contour, potentialArea, options.threshold).march())
      continue;
    var marchedPath = contour.map(function(point) {
      return {
        x: Math.round(point.x * options.pixelGroupSize + activeRegion.minX),
        y: Math.round(point.y * options.pixelGroupSize + activeRegion.minY)
      };
    });
    if (marchedPath) {
      var size = marchedPath.length;
      if (options.skip > 1) {
        size = Math.floor(marchedPath.length / options.skip);
        while (size < 3 && options.skip > 1) {
          options.skip -= 1;
          size = Math.floor(marchedPath.length / options.skip);
        }
      }
      for (var i = 0, j = 0; j < size; j += 1, i += options.skip) {
        hull.push({
          x: marchedPath[i].x,
          y: marchedPath[i].y
        });
      }
    }
    var isContourValid = function isContourValid2() {
      for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
        var item = members_1[_i];
        var hullPoints = hull.map(function(point) {
          return [point.x, point.y];
        });
        if (!isPointInPolygon(hullPoints, item.getBBox().centerX, item.getBBox().centerY))
          return false;
      }
      return true;
    };
    if (hull && isContourValid()) {
      return hull;
    }
    options.threshold *= 0.9;
    if (iterations <= options.maxMarchingIterations * 0.5) {
      options.memberInfluenceFactor *= 1.2;
      options.edgeInfluenceFactor *= 1.2;
    } else if (options.nonMemberInfluenceFactor !== 0 && nonMembers.length > 0) {
      options.nonMemberInfluenceFactor *= 0.8;
    } else {
      break;
    }
  }
  return hull;
};
function getActiveRregion(members, edges, offset) {
  var activeRegion = {
    minX: Number.POSITIVE_INFINITY,
    minY: Number.POSITIVE_INFINITY,
    maxX: Number.NEGATIVE_INFINITY,
    maxY: Number.NEGATIVE_INFINITY,
    width: 0,
    height: 0,
    x: 0,
    y: 0
  };
  var bboxes = [];
  members.forEach(function(item) {
    bboxes.push(item.getBBox());
  });
  edges.forEach(function(l) {
    bboxes.push(l.getBBox());
  });
  for (var _i = 0, bboxes_1 = bboxes; _i < bboxes_1.length; _i++) {
    var bbox = bboxes_1[_i];
    activeRegion.minX = (bbox.minX < activeRegion.minX ? bbox.minX : activeRegion.minX) - offset;
    activeRegion.minY = (bbox.minY < activeRegion.minY ? bbox.minY : activeRegion.minY) - offset;
    activeRegion.maxX = (bbox.maxX > activeRegion.maxX ? bbox.maxX : activeRegion.maxX) + offset;
    activeRegion.maxY = (bbox.maxY > activeRegion.maxY ? bbox.maxY : activeRegion.maxY) + offset;
  }
  activeRegion.width = activeRegion.maxX - activeRegion.minX;
  activeRegion.height = activeRegion.maxY - activeRegion.minY;
  activeRegion.x = activeRegion.minX;
  activeRegion.y = activeRegion.minY;
  return activeRegion;
}
function fillPotentialArea(members, nonMembers, edges, activeRegion, potentialArea, options) {
  function pos2GridIx(x, offset) {
    var gridIx = Math.floor((x - offset) / options.pixelGroupSize);
    return gridIx < 0 ? 0 : gridIx;
  }
  function gridIx2Pos(x, offset) {
    return x * options.pixelGroupSize + offset;
  }
  var nodeInfA = (options.nodeR0 - options.nodeR1) * (options.nodeR0 - options.nodeR1);
  var edgeInfA = (options.edgeR0 - options.edgeR1) * (options.edgeR0 - options.edgeR1);
  var getAffectedRegion = function getAffectedRegion2(bbox, thresholdR) {
    var startX = Math.min(pos2GridIx(bbox.minX, thresholdR + activeRegion.minX), potentialArea.width);
    var startY = Math.min(pos2GridIx(bbox.minY, thresholdR + activeRegion.minY), potentialArea.height);
    var endX = Math.min(pos2GridIx(bbox.maxX, -thresholdR + activeRegion.minX), potentialArea.width);
    var endY = Math.min(pos2GridIx(bbox.maxY, -thresholdR + activeRegion.minY), potentialArea.height);
    return [startX, startY, endX, endY];
  };
  var addItemInfluence = function addItemInfluence2(item, influenceFactor) {
    var bbox = item.getBBox();
    var _a = getAffectedRegion(bbox, options.nodeR1), startX = _a[0], startY = _a[1], endX = _a[2], endY = _a[3];
    for (var y = startY; y < endY; y += 1) {
      for (var x = startX; x < endX; x += 1) {
        if (influenceFactor < 0 && potentialArea[x + y * potentialArea.width] <= 0) {
          continue;
        }
        var tempX = gridIx2Pos(x, activeRegion.minX);
        var tempY = gridIx2Pos(y, activeRegion.minY);
        var distanceSq = pointRectSquareDist({
          x: tempX,
          y: tempY
        }, {
          x: bbox.minX,
          y: bbox.minY,
          width: bbox.width,
          height: bbox.height
        });
        if (distanceSq < Math.pow(options.nodeR1, 2)) {
          var dr = Math.sqrt(distanceSq) - options.nodeR1;
          potentialArea.cells[x + y * potentialArea.width] += influenceFactor * dr * dr;
        }
      }
    }
  };
  var addEdgeInfluence = function addEdgeInfluence2(line2, influenceFactor) {
    var bbox = line2.getBBox();
    var _a = getAffectedRegion(bbox, options.edgeR1), startX = _a[0], startY = _a[1], endX = _a[2], endY = _a[3];
    for (var y = startY; y < endY; y += 1) {
      for (var x = startX; x < endX; x += 1) {
        if (influenceFactor < 0 && potentialArea.cells[x + y * potentialArea.width] <= 0) {
          continue;
        }
        var tempX = gridIx2Pos(x, activeRegion.minX);
        var tempY = gridIx2Pos(y, activeRegion.minY);
        var minDistanceSq = pointLineSquareDist({
          x: tempX,
          y: tempY
        }, line2);
        if (minDistanceSq < Math.pow(options.edgeR1, 2)) {
          var mdr = Math.sqrt(minDistanceSq) - options.edgeR1;
          potentialArea.cells[x + y * potentialArea.width] += influenceFactor * mdr * mdr;
        }
      }
    }
  };
  if (options.nodeInfluenceFactor) {
    members.forEach(function(item) {
      addItemInfluence(item, options.nodeInfluenceFactor / nodeInfA);
    });
  }
  if (options.edgeInfluenceFactor) {
    edges.forEach(function(edge) {
      addEdgeInfluence(edge, options.edgeInfluenceFactor / edgeInfA);
    });
  }
  if (options.negativeNodeInfluenceFactor) {
    nonMembers.forEach(function(item) {
      addItemInfluence(item, options.negativeNodeInfluenceFactor / nodeInfA);
    });
  }
}
function rerouteLine(item, buffer, intersections, wrapNormal) {
  var bbox = item.getBBox();
  var topIntersect = intersections[0], leftIntersect = intersections[1], bottomIntersect = intersections[2], rightIntersect = intersections[3];
  var cornerPos = {
    topLeft: {
      x: bbox.minX - buffer,
      y: bbox.minY - buffer
    },
    topRight: {
      x: bbox.maxX + buffer,
      y: bbox.minY - buffer
    },
    bottomLeft: {
      x: bbox.minX - buffer,
      y: bbox.maxY + buffer
    },
    bottomRight: {
      x: bbox.maxX + buffer,
      y: bbox.maxY + buffer
    }
  };
  var totalArea = bbox.height * bbox.width;
  function calcHalfArea(intersect1, intersect2) {
    return bbox.width * ((intersect1.y - bbox.minY + (intersect2.y - bbox.minY)) * 0.5);
  }
  if (leftIntersect) {
    if (topIntersect)
      return wrapNormal ? cornerPos.topLeft : cornerPos.bottomRight;
    if (bottomIntersect)
      return wrapNormal ? cornerPos.bottomLeft : cornerPos.topRight;
    var topArea = calcHalfArea(leftIntersect, rightIntersect);
    if (topArea < totalArea * 0.5) {
      if (leftIntersect.y > rightIntersect.y)
        return wrapNormal ? cornerPos.topLeft : cornerPos.bottomRight;
      return wrapNormal ? cornerPos.topRight : cornerPos.bottomLeft;
    }
    if (leftIntersect.y < rightIntersect.y)
      return wrapNormal ? cornerPos.bottomLeft : cornerPos.topRight;
    return wrapNormal ? cornerPos.bottomRight : cornerPos.topLeft;
  }
  if (rightIntersect) {
    if (topIntersect)
      return wrapNormal ? cornerPos.topRight : cornerPos.bottomLeft;
    if (bottomIntersect)
      return wrapNormal ? cornerPos.bottomRight : cornerPos.topLeft;
  }
  var leftArea = calcHalfArea(topIntersect, bottomIntersect);
  if (leftArea < totalArea * 0.5) {
    if (topIntersect.x > bottomIntersect.x)
      return wrapNormal ? cornerPos.topLeft : cornerPos.bottomRight;
    return wrapNormal ? cornerPos.bottomLeft : cornerPos.topRight;
  }
  if (topIntersect.x < bottomIntersect.x)
    return wrapNormal ? cornerPos.topRight : cornerPos.bottomLeft;
  return wrapNormal ? cornerPos.bottomRight : cornerPos.topLeft;
}
var Hull = function() {
  function Hull2(graph, cfg) {
    this.cfg = deepMix(this.getDefaultCfg(), cfg);
    this.graph = graph;
    this.id = this.cfg.id;
    this.group = this.cfg.group;
    this.members = this.cfg.members.map(function(item) {
      return isString(item) ? graph.findById(item) : item;
    });
    this.nonMembers = this.cfg.nonMembers.map(function(item) {
      return isString(item) ? graph.findById(item) : item;
    });
    this.setPadding();
    this.setType();
    this.path = this.calcPath(this.members, this.nonMembers);
    this.render();
  }
  Hull2.prototype.getDefaultCfg = function() {
    return {
      id: "g6-hull",
      type: "round-convex",
      members: [],
      nonMembers: [],
      style: {
        fill: "lightblue",
        stroke: "blue",
        opacity: 0.2
      },
      padding: 10
    };
  };
  Hull2.prototype.setPadding = function() {
    var nodeSize = this.members.length && this.members[0].getKeyShape().getCanvasBBox().width / 2;
    this.padding = this.cfg.padding > 0 ? this.cfg.padding + nodeSize : 10 + nodeSize;
    this.cfg.bubbleCfg = {
      nodeR0: this.padding - nodeSize,
      nodeR1: this.padding - nodeSize,
      morphBuffer: this.padding - nodeSize
    };
  };
  Hull2.prototype.setType = function() {
    this.type = this.cfg.type;
    if (this.members.length < 3) {
      this.type = "round-convex";
    }
    if (this.type !== "round-convex" && this.type !== "smooth-convex" && this.type !== "bubble") {
      console.warn("The hull type should be either round-convex, smooth-convex or bubble, round-convex is used by default.");
      this.type = "round-convex";
    }
  };
  Hull2.prototype.calcPath = function(members, nonMembers) {
    var contour, path2, hull;
    switch (this.type) {
      case "round-convex":
        contour = genConvexHull(members);
        hull = roundedHull(contour.map(function(p) {
          return [p.x, p.y];
        }), this.padding);
        path2 = parsePathString(hull);
        break;
      case "smooth-convex":
        contour = genConvexHull(members);
        if (contour.length === 2) {
          hull = roundedHull(contour.map(function(p) {
            return [p.x, p.y];
          }), this.padding);
          path2 = parsePathString(hull);
        } else if (contour.length > 2) {
          hull = paddedHull(contour.map(function(p) {
            return [p.x, p.y];
          }), this.padding);
          path2 = getClosedSpline(hull);
        }
        break;
      case "bubble":
        contour = genBubbleSet(members, nonMembers, this.cfg.bubbleCfg);
        path2 = contour.length >= 2 && getClosedSpline(contour);
        break;
    }
    return path2;
  };
  Hull2.prototype.render = function() {
    this.group.addShape("path", {
      attrs: __assign({
        path: this.path
      }, this.cfg.style),
      id: this.id,
      name: this.cfg.id,
      capture: false
    });
    this.group.toBack();
  };
  Hull2.prototype.addMember = function(item) {
    if (!item)
      return;
    if (isString(item))
      item = this.graph.findById(item);
    this.members.push(item);
    var index = this.nonMembers.indexOf(item);
    if (index > -1) {
      this.nonMembers.splice(index, 1);
    }
    this.updateData(this.members, this.nonMembers);
    return true;
  };
  Hull2.prototype.addNonMember = function(item) {
    if (!item)
      return;
    if (isString(item))
      item = this.graph.findById(item);
    this.nonMembers.push(item);
    var index = this.members.indexOf(item);
    if (index > -1) {
      this.members.splice(index, 1);
    }
    this.updateData(this.members, this.nonMembers);
    return true;
  };
  Hull2.prototype.removeMember = function(item) {
    if (!item)
      return;
    if (isString(item))
      item = this.graph.findById(item);
    var index = this.members.indexOf(item);
    if (index > -1) {
      this.members.splice(index, 1);
      this.updateData(this.members, this.nonMembers);
      return true;
    }
    return false;
  };
  Hull2.prototype.removeNonMember = function(item) {
    if (!item)
      return;
    if (isString(item))
      item = this.graph.findById(item);
    var index = this.nonMembers.indexOf(item);
    if (index > -1) {
      this.nonMembers.splice(index, 1);
      this.updateData(this.members, this.nonMembers);
      return true;
    }
    return false;
  };
  Hull2.prototype.updateData = function(members, nonMembers) {
    var _this = this;
    this.group.findById(this.id).remove();
    if (members)
      this.members = members.map(function(item) {
        return isString(item) ? _this.graph.findById(item) : item;
      });
    if (nonMembers)
      this.nonMembers = nonMembers.map(function(item) {
        return isString(item) ? _this.graph.findById(item) : item;
      });
    this.path = this.calcPath(this.members, this.nonMembers);
    this.render();
  };
  Hull2.prototype.updateStyle = function(cfg) {
    var path2 = this.group.findById(this.id);
    path2.attr(__assign({}, cfg));
  };
  Hull2.prototype.updateCfg = function(cfg) {
    var _this = this;
    this.cfg = deepMix(this.cfg, cfg);
    this.id = this.cfg.id;
    this.group = this.cfg.group;
    if (cfg.members) {
      this.members = this.cfg.members.map(function(item) {
        return isString(item) ? _this.graph.findById(item) : item;
      });
    }
    if (cfg.nonMembers) {
      this.nonMembers = this.cfg.nonMembers.map(function(item) {
        return isString(item) ? _this.graph.findById(item) : item;
      });
    }
    this.setPadding();
    this.setType();
    this.path = this.calcPath(this.members, this.nonMembers);
    this.render();
  };
  Hull2.prototype.contain = function(item) {
    var _this = this;
    var nodeItem;
    if (isString(item)) {
      nodeItem = this.graph.findById(item);
    } else {
      nodeItem = item;
    }
    var shapePoints;
    var shape = nodeItem.getKeyShape();
    if (nodeItem.get("type") === "path") {
      shapePoints = pathToPoints(shape.attr("path"));
    } else {
      var shapeBBox = shape.getCanvasBBox();
      shapePoints = [[shapeBBox.minX, shapeBBox.minY], [shapeBBox.maxX, shapeBBox.minY], [shapeBBox.maxX, shapeBBox.maxY], [shapeBBox.minX, shapeBBox.maxY]];
    }
    shapePoints = shapePoints.map(function(canvasPoint) {
      var point = _this.graph.getPointByCanvas(canvasPoint[0], canvasPoint[1]);
      return [point.x, point.y];
    });
    return isPolygonsIntersect(shapePoints, pathToPoints(this.path));
  };
  Hull2.prototype.destroy = function() {
    this.group.remove();
    this.cfg = null;
  };
  return Hull2;
}();
var transform$2 = transform$5;
var NODE = "node";
(function(_super) {
  __extends(AbstractGraph, _super);
  function AbstractGraph(cfg) {
    var _this = _super.call(this) || this;
    _this.cfg = deepMix(_this.getDefaultCfg(), cfg);
    _this.init();
    _this.animating = false;
    _this.destroyed = false;
    if (_this.cfg.enabledStack) {
      _this.undoStack = new Stack(_this.cfg.maxStep);
      _this.redoStack = new Stack(_this.cfg.maxStep);
    }
    return _this;
  }
  AbstractGraph.prototype.init = function() {
    this.initCanvas();
    var viewController = new ViewController(this);
    var modeController = new ModeController(this);
    var itemController = new ItemController(this);
    var stateController = new StateController(this);
    this.set({
      viewController,
      modeController,
      itemController,
      stateController
    });
    this.initLayoutController();
    this.initEventController();
    this.initGroups();
    this.initPlugins();
  };
  AbstractGraph.prototype.initGroups = function() {
    var canvas = this.get("canvas");
    if (!canvas)
      return;
    var el = canvas.get("el");
    var _a = (el || {}).id, id = _a === void 0 ? "g6" : _a;
    var group = canvas.addGroup({
      id: "".concat(id, "-root"),
      className: Global.rootContainerClassName
    });
    if (this.get("groupByTypes")) {
      var edgeGroup = group.addGroup({
        id: "".concat(id, "-edge"),
        className: Global.edgeContainerClassName
      });
      var nodeGroup = group.addGroup({
        id: "".concat(id, "-node"),
        className: Global.nodeContainerClassName
      });
      var comboGroup = group.addGroup({
        id: "".concat(id, "-combo"),
        className: Global.comboContainerClassName
      });
      comboGroup.toBack();
      this.set({
        nodeGroup,
        edgeGroup,
        comboGroup
      });
    }
    var delegateGroup = group.addGroup({
      id: "".concat(id, "-delegate"),
      className: Global.delegateContainerClassName
    });
    this.set({
      delegateGroup
    });
    this.set("group", group);
  };
  AbstractGraph.prototype.getDefaultCfg = function() {
    return {
      container: void 0,
      width: void 0,
      height: void 0,
      renderer: "canvas",
      modes: {},
      plugins: [],
      data: {},
      fitViewPadding: 10,
      minZoom: 0.2,
      maxZoom: 10,
      event: true,
      groupByTypes: true,
      directed: false,
      autoPaint: true,
      nodes: [],
      edges: [],
      combos: [],
      vedges: [],
      itemMap: {},
      linkCenter: false,
      defaultNode: {},
      defaultEdge: {},
      nodeStateStyles: {},
      edgeStateStyles: {},
      states: {},
      animate: false,
      animateCfg: {
        onFrame: void 0,
        duration: 500,
        easing: "easeLinear"
      },
      callback: void 0,
      enabledStack: false,
      maxStep: 10,
      tooltips: []
    };
  };
  AbstractGraph.prototype.set = function(key, val) {
    if (isPlainObject(key)) {
      this.cfg = __assign(__assign({}, this.cfg), key);
    } else {
      this.cfg[key] = val;
    }
    if (key === "enabledStack" && val && !this.undoStack && !this.redoStack) {
      this.undoStack = new Stack(this.cfg.maxStep);
      this.redoStack = new Stack(this.cfg.maxStep);
    }
    return this;
  };
  AbstractGraph.prototype.get = function(key) {
    var _a;
    return (_a = this.cfg) === null || _a === void 0 ? void 0 : _a[key];
  };
  AbstractGraph.prototype.getGroup = function() {
    return this.get("group");
  };
  AbstractGraph.prototype.getContainer = function() {
    return this.get("container");
  };
  AbstractGraph.prototype.getMinZoom = function() {
    return this.get("minZoom");
  };
  AbstractGraph.prototype.setMinZoom = function(ratio) {
    return this.set("minZoom", ratio);
  };
  AbstractGraph.prototype.getMaxZoom = function() {
    return this.get("maxZoom");
  };
  AbstractGraph.prototype.setMaxZoom = function(ratio) {
    return this.set("maxZoom", ratio);
  };
  AbstractGraph.prototype.getWidth = function() {
    return this.get("width");
  };
  AbstractGraph.prototype.getHeight = function() {
    return this.get("height");
  };
  AbstractGraph.prototype.clearItemStates = function(item, states) {
    if (isString(item)) {
      item = this.findById(item);
    }
    var itemController = this.get("itemController");
    if (!states) {
      states = item.get("states");
    }
    itemController.clearItemStates(item, states);
    var stateController = this.get("stateController");
    stateController.updateStates(item, states, false);
  };
  AbstractGraph.prototype.node = function(nodeFn) {
    if (typeof nodeFn === "function") {
      this.set("nodeMapper", nodeFn);
    }
  };
  AbstractGraph.prototype.edge = function(edgeFn) {
    if (typeof edgeFn === "function") {
      this.set("edgeMapper", edgeFn);
    }
  };
  AbstractGraph.prototype.combo = function(comboFn) {
    if (typeof comboFn === "function") {
      this.set("comboMapper", comboFn);
    }
  };
  AbstractGraph.prototype.findById = function(id) {
    return this.get("itemMap")[id];
  };
  AbstractGraph.prototype.find = function(type, fn) {
    var result;
    var items = this.get("".concat(type, "s"));
    each(items, function(item, i) {
      if (fn(item, i)) {
        result = item;
        return result;
      }
    });
    return result;
  };
  AbstractGraph.prototype.findAll = function(type, fn) {
    var result = [];
    each(this.get("".concat(type, "s")), function(item, i) {
      if (fn(item, i)) {
        result.push(item);
      }
    });
    return result;
  };
  AbstractGraph.prototype.findAllByState = function(type, state) {
    return this.findAll(type, function(item) {
      return item.hasState(state);
    });
  };
  AbstractGraph.prototype.getAnimateCfgWithCallback = function(_a) {
    var animateCfg = _a.animateCfg, callback = _a.callback;
    var animateConfig;
    if (!animateCfg) {
      animateConfig = {
        duration: 500,
        callback
      };
    } else {
      animateConfig = clone$1(animateCfg);
      if (animateCfg.callback) {
        var animateCfgCallback_1 = animateCfg.callback;
        animateConfig.callback = function() {
          callback();
          animateCfgCallback_1();
        };
      } else {
        animateConfig.callback = callback;
      }
    }
    return animateConfig;
  };
  AbstractGraph.prototype.translate = function(dx, dy, animate, animateCfg) {
    var _this = this;
    var group = this.get("group");
    var matrix = clone$1(group.getMatrix());
    if (!matrix) {
      matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    if (animate) {
      var animateConfig = this.getAnimateCfgWithCallback({
        animateCfg,
        callback: function callback() {
          return _this.emit("viewportchange", {
            action: "translate",
            matrix: group.getMatrix()
          });
        }
      });
      move(group, {
        x: group.getCanvasBBox().x + dx,
        y: group.getCanvasBBox().y + dy
      }, animate, animateConfig || {
        duration: 500,
        easing: "easeCubic"
      });
    } else {
      matrix = transform$2(matrix, [["t", dx, dy]]);
      group.setMatrix(matrix);
      this.emit("viewportchange", {
        action: "translate",
        matrix
      });
      this.autoPaint();
    }
  };
  AbstractGraph.prototype.moveTo = function(x, y, animate, animateCfg) {
    var group = this.get("group");
    move(group, {
      x,
      y
    }, animate, animateCfg || {
      duration: 500,
      easing: "easeCubic"
    });
    this.emit("viewportchange", {
      action: "move",
      matrix: group.getMatrix()
    });
  };
  AbstractGraph.prototype.fitView = function(padding, rules) {
    if (padding) {
      this.set("fitViewPadding", padding);
    }
    var viewController = this.get("viewController");
    if (rules) {
      viewController.fitViewByRules(rules);
    } else {
      viewController.fitView();
    }
    this.autoPaint();
  };
  AbstractGraph.prototype.fitCenter = function() {
    var viewController = this.get("viewController");
    viewController.fitCenter();
    this.autoPaint();
  };
  AbstractGraph.prototype.addBehaviors = function(behaviors, modes) {
    var modeController = this.get("modeController");
    modeController.manipulateBehaviors(behaviors, modes, true);
    return this;
  };
  AbstractGraph.prototype.removeBehaviors = function(behaviors, modes) {
    var modeController = this.get("modeController");
    modeController.manipulateBehaviors(behaviors, modes, false);
    return this;
  };
  AbstractGraph.prototype.updateBehavior = function(behavior, newCfg, mode) {
    var modeController = this.get("modeController");
    modeController.updateBehavior(behavior, newCfg, mode);
    return this;
  };
  AbstractGraph.prototype.zoom = function(ratio, center, animate, animateCfg) {
    var _this = this;
    var group = this.get("group");
    var matrix = clone$1(group.getMatrix());
    var minZoom = this.get("minZoom");
    var maxZoom = this.get("maxZoom");
    if (!matrix) {
      matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    if (center) {
      matrix = transform$2(matrix, [["t", -center.x, -center.y], ["s", ratio, ratio], ["t", center.x, center.y]]);
    } else {
      matrix = transform$2(matrix, [["s", ratio, ratio]]);
    }
    if (minZoom && matrix[0] < minZoom || maxZoom && matrix[0] > maxZoom) {
      return false;
    }
    if (animate) {
      var aniMatrix_1 = clone$1(group.getMatrix());
      if (!aniMatrix_1) {
        aniMatrix_1 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      }
      var initialRatio_1 = aniMatrix_1[0];
      var targetRatio_1 = initialRatio_1 * ratio;
      var animateConfig = this.getAnimateCfgWithCallback({
        animateCfg,
        callback: function callback() {
          return _this.emit("viewportchange", {
            action: "zoom",
            matrix: group.getMatrix()
          });
        }
      });
      group.animate(function(ratio2) {
        if (ratio2 === 1) {
          aniMatrix_1 = matrix;
        } else {
          var scale3 = lerp(initialRatio_1, targetRatio_1, ratio2) / aniMatrix_1[0];
          if (center) {
            aniMatrix_1 = transform$2(aniMatrix_1, [["t", -center.x, -center.y], ["s", scale3, scale3], ["t", center.x, center.y]]);
          } else {
            aniMatrix_1 = transform$2(aniMatrix_1, [["s", scale3, scale3]]);
          }
        }
        return {
          matrix: aniMatrix_1
        };
      }, animateConfig);
    } else {
      group.setMatrix(matrix);
      this.emit("viewportchange", {
        action: "zoom",
        matrix
      });
      this.autoPaint();
    }
    return true;
  };
  AbstractGraph.prototype.zoomTo = function(toRatio, center, animate, animateCfg) {
    var ratio = toRatio / this.getZoom();
    return this.zoom(ratio, center, animate, animateCfg);
  };
  AbstractGraph.prototype.focusItem = function(item, animate, animateCfg) {
    var viewController = this.get("viewController");
    var isAnimate = false;
    if (animate)
      isAnimate = true;
    else if (animate === void 0)
      isAnimate = this.get("animate");
    var curAniamteCfg = {};
    if (animateCfg)
      curAniamteCfg = animateCfg;
    else if (animateCfg === void 0)
      curAniamteCfg = this.get("animateCfg");
    viewController.focus(item, isAnimate, curAniamteCfg);
    this.autoPaint();
  };
  AbstractGraph.prototype.autoPaint = function() {
    if (this.get("autoPaint")) {
      this.paint();
    }
  };
  AbstractGraph.prototype.paint = function() {
    this.emit("beforepaint");
    this.get("canvas").draw();
    this.emit("afterpaint");
  };
  AbstractGraph.prototype.getPointByClient = function(clientX, clientY) {
    var viewController = this.get("viewController");
    return viewController.getPointByClient(clientX, clientY);
  };
  AbstractGraph.prototype.getClientByPoint = function(x, y) {
    var viewController = this.get("viewController");
    return viewController.getClientByPoint(x, y);
  };
  AbstractGraph.prototype.getPointByCanvas = function(canvasX, canvasY) {
    var viewController = this.get("viewController");
    return viewController.getPointByCanvas(canvasX, canvasY);
  };
  AbstractGraph.prototype.getCanvasByPoint = function(x, y) {
    var viewController = this.get("viewController");
    return viewController.getCanvasByPoint(x, y);
  };
  AbstractGraph.prototype.getGraphCenterPoint = function() {
    var bbox = this.get("group").getCanvasBBox();
    return {
      x: (bbox.minX + bbox.maxX) / 2,
      y: (bbox.minY + bbox.maxY) / 2
    };
  };
  AbstractGraph.prototype.getViewPortCenterPoint = function() {
    return this.getPointByCanvas(this.get("width") / 2, this.get("height") / 2);
  };
  AbstractGraph.prototype.showItem = function(item, stack) {
    if (stack === void 0) {
      stack = true;
    }
    var itemController = this.get("itemController");
    var object2 = itemController.changeItemVisibility(item, true);
    if (stack && this.get("enabledStack")) {
      var id = object2.getID();
      var type = object2.getType();
      var before = {};
      var after = {};
      switch (type) {
        case "node":
          before.nodes = [{
            id,
            visible: false
          }];
          after.nodes = [{
            id,
            visible: true
          }];
          break;
        case "edge":
          before.nodes = [{
            id,
            visible: false
          }];
          after.edges = [{
            id,
            visible: true
          }];
          break;
        case "combo":
          before.nodes = [{
            id,
            visible: false
          }];
          after.combos = [{
            id,
            visible: true
          }];
          break;
      }
      this.pushStack("visible", {
        before,
        after
      });
    }
  };
  AbstractGraph.prototype.hideItem = function(item, stack) {
    if (stack === void 0) {
      stack = true;
    }
    var itemController = this.get("itemController");
    var object2 = itemController.changeItemVisibility(item, false);
    if (stack && this.get("enabledStack")) {
      var id = object2.getID();
      var type = object2.getType();
      var before = {};
      var after = {};
      switch (type) {
        case "node":
          before.nodes = [{
            id,
            visible: true
          }];
          after.nodes = [{
            id,
            visible: false
          }];
          break;
        case "edge":
          before.nodes = [{
            id,
            visible: true
          }];
          after.edges = [{
            id,
            visible: false
          }];
          break;
        case "combo":
          before.nodes = [{
            id,
            visible: true
          }];
          after.combos = [{
            id,
            visible: false
          }];
          break;
      }
      this.pushStack("visible", {
        before,
        after
      });
    }
  };
  AbstractGraph.prototype.refreshItem = function(item) {
    var itemController = this.get("itemController");
    itemController.refreshItem(item);
  };
  AbstractGraph.prototype.setAutoPaint = function(auto) {
    var self = this;
    self.set("autoPaint", auto);
    var canvas = self.get("canvas");
    canvas.set("autoDraw", auto);
  };
  AbstractGraph.prototype.remove = function(item, stack) {
    if (stack === void 0) {
      stack = true;
    }
    this.removeItem(item, stack);
  };
  AbstractGraph.prototype.removeItem = function(item, stack) {
    if (stack === void 0) {
      stack = true;
    }
    var nodeItem = item;
    if (isString(item))
      nodeItem = this.findById(item);
    if (!nodeItem && isString(item)) {
      console.warn("The item ".concat(item, " to be removed does not exist!"));
    } else if (nodeItem) {
      var type = "";
      if (nodeItem.getType)
        type = nodeItem.getType();
      if (stack && this.get("enabledStack")) {
        var deletedModel = __assign(__assign({}, nodeItem.getModel()), {
          itemType: type
        });
        var before = {};
        switch (type) {
          case "node": {
            before.nodes = [deletedModel];
            before.edges = [];
            var edges = nodeItem.getEdges();
            for (var i = edges.length - 1; i >= 0; i--) {
              before.edges.push(__assign(__assign({}, edges[i].getModel()), {
                itemType: "edge"
              }));
            }
            break;
          }
          case "edge":
            before.edges = [deletedModel];
            break;
          case "combo":
            before.combos = [deletedModel];
            break;
        }
        this.pushStack("delete", {
          before,
          after: {}
        });
      }
      if (type === "node") {
        var model = nodeItem.getModel();
        if (model.comboId) {
          this.updateComboTree(nodeItem, void 0, false);
        }
      }
      var itemController = this.get("itemController");
      itemController.removeItem(nodeItem);
      if (type === "combo") {
        var newComboTrees = reconstructTree(this.get("comboTrees"));
        this.set("comboTrees", newComboTrees);
      }
    }
  };
  AbstractGraph.prototype.addItem = function(type, model, stack, sortCombo) {
    if (stack === void 0) {
      stack = true;
    }
    if (sortCombo === void 0) {
      sortCombo = true;
    }
    var currentComboSorted = this.get("comboSorted");
    this.set("comboSorted", currentComboSorted && !sortCombo);
    var itemController = this.get("itemController");
    if (!singleDataValidation(type, model)) {
      return false;
    }
    if (model.id && this.findById(model.id)) {
      console.warn("This item exists already. Be sure the id %c".concat(model.id, "%c is unique."), "font-size: 20px; color: red;", "");
      return;
    }
    var item;
    var comboTrees = this.get("comboTrees") || [];
    if (type === "combo") {
      var itemMap_1 = this.get("itemMap");
      var foundParent_1 = false;
      comboTrees.forEach(function(ctree) {
        if (foundParent_1)
          return;
        traverseTreeUp(ctree, function(child) {
          if (model.parentId === child.id) {
            foundParent_1 = true;
            var newCombo2 = __assign({
              id: model.id,
              depth: child.depth + 2
            }, model);
            if (child.children)
              child.children.push(newCombo2);
            else
              child.children = [newCombo2];
            model.depth = newCombo2.depth;
            item = itemController.addItem(type, model);
          }
          var childItem = itemMap_1[child.id];
          if (foundParent_1 && childItem && childItem.getType && childItem.getType() === "combo") {
            itemController.updateCombo(childItem, child.children);
          }
          return true;
        });
      });
      if (!foundParent_1) {
        var newCombo = __assign({
          id: model.id,
          depth: 0
        }, model);
        model.depth = newCombo.depth;
        comboTrees.push(newCombo);
        item = itemController.addItem(type, model);
      }
      this.set("comboTrees", comboTrees);
    } else if (type === "node" && isString(model.comboId) && comboTrees) {
      var parentCombo = this.findById(model.comboId);
      if (parentCombo && parentCombo.getType && parentCombo.getType() !== "combo") {
        console.warn("'".concat(model.comboId, "' is not a id of a combo in the graph, the node will be added without combo."));
      }
      item = itemController.addItem(type, model);
      var itemMap_2 = this.get("itemMap");
      var foundParent_2 = false, foundNode_1 = false;
      comboTrees.forEach(function(ctree) {
        if (foundNode_1 || foundParent_2)
          return;
        traverseTreeUp(ctree, function(child) {
          if (child.id === model.id) {
            foundNode_1 = true;
            return false;
          }
          if (model.comboId === child.id && !foundNode_1) {
            foundParent_2 = true;
            var cloneNode = clone$1(model);
            cloneNode.itemType = "node";
            if (child.children)
              child.children.push(cloneNode);
            else
              child.children = [cloneNode];
            cloneNode.depth = child.depth + 1;
          }
          if (foundParent_2 && itemMap_2[child.id].getType && itemMap_2[child.id].getType() === "combo") {
            itemController.updateCombo(itemMap_2[child.id], child.children);
          }
          return true;
        });
      });
    } else {
      item = itemController.addItem(type, model);
    }
    if (type === "node" && model.comboId || type === "combo" && model.parentId) {
      var parentCombo = this.findById(model.comboId || model.parentId);
      if (parentCombo && parentCombo.getType && parentCombo.getType() === "combo")
        parentCombo.addChild(item);
    }
    var combos = this.get("combos");
    if (combos && combos.length > 0) {
      this.sortCombos();
    }
    this.autoPaint();
    if (stack && this.get("enabledStack")) {
      var addedModel = __assign(__assign({}, item.getModel()), {
        itemType: type
      });
      var after = {};
      switch (type) {
        case "node":
          after.nodes = [addedModel];
          break;
        case "edge":
          after.edges = [addedModel];
          break;
        case "combo":
          after.combos = [addedModel];
          break;
      }
      this.pushStack("add", {
        before: {},
        after
      });
    }
    return item;
  };
  AbstractGraph.prototype.add = function(type, model, stack, sortCombo) {
    if (stack === void 0) {
      stack = true;
    }
    if (sortCombo === void 0) {
      sortCombo = true;
    }
    return this.addItem(type, model, stack, sortCombo);
  };
  AbstractGraph.prototype.updateItem = function(item, cfg, stack) {
    var _this = this;
    if (stack === void 0) {
      stack = true;
    }
    var itemController = this.get("itemController");
    var currentItem;
    if (isString(item)) {
      currentItem = this.findById(item);
    } else {
      currentItem = item;
    }
    var UnupdateModel = clone$1(currentItem.getModel());
    var type = "";
    if (currentItem.getType)
      type = currentItem.getType();
    var states = __spreadArray$1([], currentItem.getStates(), true);
    if (type === "combo") {
      each(states, function(state) {
        return _this.setItemState(currentItem, state, false);
      });
    }
    itemController.updateItem(currentItem, cfg);
    if (type === "combo") {
      each(states, function(state) {
        return _this.setItemState(currentItem, state, true);
      });
    }
    if (stack && this.get("enabledStack")) {
      var before = {
        nodes: [],
        edges: [],
        combos: []
      };
      var after = {
        nodes: [],
        edges: [],
        combos: []
      };
      var afterModel = __assign({
        id: UnupdateModel.id
      }, cfg);
      switch (type) {
        case "node":
          before.nodes.push(UnupdateModel);
          after.nodes.push(afterModel);
          break;
        case "edge":
          before.edges.push(UnupdateModel);
          after.edges.push(afterModel);
          break;
        case "combo":
          before.combos.push(UnupdateModel);
          after.combos.push(afterModel);
          break;
      }
      if (type === "node") {
        before.nodes.push(UnupdateModel);
      }
      this.pushStack("update", {
        before,
        after
      });
    }
  };
  AbstractGraph.prototype.update = function(item, cfg, stack) {
    if (stack === void 0) {
      stack = true;
    }
    this.updateItem(item, cfg, stack);
  };
  AbstractGraph.prototype.setItemState = function(item, state, value) {
    if (isString(item)) {
      item = this.findById(item);
    }
    var itemController = this.get("itemController");
    itemController.setItemState(item, state, value);
    var stateController = this.get("stateController");
    if (isString(value)) {
      stateController.updateState(item, "".concat(state, ":").concat(value), true);
    } else {
      stateController.updateState(item, state, value);
    }
  };
  AbstractGraph.prototype.priorityState = function(item, state) {
    var itemController = this.get("itemController");
    itemController.priorityState(item, state);
  };
  AbstractGraph.prototype.data = function(data) {
    dataValidation(data);
    this.set("data", data);
  };
  AbstractGraph.prototype.render = function() {
    var self = this;
    this.set("comboSorted", false);
    var data = this.get("data");
    if (this.get("enabledStack")) {
      this.clearStack();
    }
    if (!data) {
      throw new Error("data must be defined first");
    }
    var _a = data.nodes, nodes = _a === void 0 ? [] : _a, _b = data.edges, edges = _b === void 0 ? [] : _b, _c = data.combos, combos = _c === void 0 ? [] : _c;
    this.clear(true);
    this.emit("beforerender");
    each(nodes, function(node) {
      self.add("node", node, false, false);
    });
    if ((combos === null || combos === void 0 ? void 0 : combos.length) !== 0) {
      var comboTrees = plainCombosToTrees(combos, nodes);
      this.set("comboTrees", comboTrees);
      self.addCombos(combos);
    }
    each(edges, function(edge) {
      self.add("edge", edge, false, false);
    });
    var animate = self.get("animate");
    if (self.get("fitView") || self.get("fitCenter")) {
      self.set("animate", false);
    }
    var layoutController = self.get("layoutController");
    if (layoutController) {
      layoutController.layout(success);
      if (this.destroyed)
        return;
    } else {
      if (self.get("fitView")) {
        self.fitView();
      }
      if (self.get("fitCenter")) {
        self.fitCenter();
      }
      self.emit("afterrender");
      self.set("animate", animate);
    }
    function success() {
      if (self.get("fitView")) {
        self.fitView();
      } else if (self.get("fitCenter")) {
        self.fitCenter();
      }
      self.autoPaint();
      self.emit("afterrender");
      if (self.get("fitView") || self.get("fitCenter")) {
        self.set("animate", animate);
      }
    }
    if (!this.get("groupByTypes")) {
      if (combos && combos.length !== 0) {
        this.sortCombos();
      } else {
        if (data.nodes && data.edges && data.nodes.length < data.edges.length) {
          var nodesArr = this.getNodes();
          nodesArr.forEach(function(node) {
            node.toFront();
          });
        } else {
          var edgesArr = this.getEdges();
          edgesArr.forEach(function(edge) {
            edge.toBack();
          });
        }
      }
    }
    if (this.get("enabledStack")) {
      this.pushStack("render");
    }
  };
  AbstractGraph.prototype.read = function(data) {
    this.data(data);
    this.render();
  };
  AbstractGraph.prototype.diffItems = function(type, items, models) {
    var self = this;
    var item;
    var itemMap = this.get("itemMap");
    each(models, function(model) {
      item = itemMap[model.id];
      if (item) {
        if (self.get("animate") && type === NODE) {
          var containerMatrix = item.getContainer().getMatrix();
          if (!containerMatrix)
            containerMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
          item.set("originAttrs", {
            x: containerMatrix[6],
            y: containerMatrix[7]
          });
        }
        self.updateItem(item, model, false);
      } else {
        item = self.addItem(type, model, false);
      }
      if (item)
        items["".concat(type, "s")].push(item);
    });
  };
  AbstractGraph.prototype.changeData = function(propsData, stack) {
    if (stack === void 0) {
      stack = true;
    }
    var self = this;
    var data = propsData || self.get("data");
    if (!dataValidation(data)) {
      return this;
    }
    if (stack && this.get("enabledStack")) {
      this.pushStack("changedata", {
        before: self.save(),
        after: data
      });
    }
    this.set("comboSorted", false);
    this.removeHulls();
    this.getNodes().map(function(node) {
      return self.clearItemStates(node);
    });
    this.getEdges().map(function(edge) {
      return self.clearItemStates(edge);
    });
    var canvas = this.get("canvas");
    var localRefresh = canvas.get("localRefresh");
    canvas.set("localRefresh", false);
    if (!self.get("data")) {
      self.data(data);
      self.render();
    }
    var itemMap = this.get("itemMap");
    var items = {
      nodes: [],
      edges: []
    };
    var combosData = data.combos;
    if (combosData) {
      var comboTrees = plainCombosToTrees(combosData, data.nodes);
      this.set("comboTrees", comboTrees);
    } else {
      this.set("comboTrees", []);
    }
    this.diffItems("node", items, data.nodes);
    each(itemMap, function(item, id) {
      itemMap[id].getModel().depth = 0;
      if (item.getType && item.getType() === "edge")
        return;
      if (item.getType && item.getType() === "combo") {
        delete itemMap[id];
        item.destroy();
      } else if (items.nodes.indexOf(item) < 0) {
        delete itemMap[id];
        self.remove(item, false);
      }
    });
    var comboItems = this.getCombos();
    var combosLength = comboItems.length;
    for (var i = combosLength - 1; i >= 0; i--) {
      if (comboItems[i].destroyed) {
        comboItems.splice(i, 1);
      }
    }
    if (combosData) {
      self.addCombos(combosData);
      if (!this.get("groupByTypes")) {
        this.sortCombos();
      }
    }
    this.diffItems("edge", items, data.edges);
    each(itemMap, function(item, id) {
      if (item.getType && (item.getType() === "node" || item.getType() === "combo"))
        return;
      if (items.edges.indexOf(item) < 0) {
        delete itemMap[id];
        self.remove(item, false);
      }
    });
    this.set({
      nodes: items.nodes,
      edges: items.edges
    });
    var layoutController = this.get("layoutController");
    if (layoutController) {
      layoutController.changeData();
      if (self.get("animate") && !layoutController.getLayoutType()) {
        self.positionsAnimate();
      } else {
        self.autoPaint();
      }
    }
    setTimeout(function() {
      canvas.set("localRefresh", localRefresh);
    }, 16);
    return this;
  };
  AbstractGraph.prototype.addCombos = function(combos) {
    var self = this;
    var comboTrees = self.get("comboTrees");
    var itemController = this.get("itemController");
    itemController.addCombos(comboTrees, combos);
  };
  AbstractGraph.prototype.createCombo = function(combo, children) {
    var _this = this;
    this.set("comboSorted", false);
    var comboId = "";
    var comboConfig;
    if (!combo)
      return;
    if (isString(combo)) {
      comboId = combo;
      comboConfig = {
        id: combo
      };
    } else {
      comboId = combo.id;
      if (!comboId) {
        console.warn("Create combo failed. Please assign a unique string id for the adding combo.");
        return;
      }
      comboConfig = combo;
    }
    var trees = children.map(function(elementId) {
      var item = _this.findById(elementId);
      var model = item.getModel();
      var type = "";
      if (item.getType)
        type = item.getType();
      var cItem = {
        id: item.getID(),
        itemType: type
      };
      if (type === "combo") {
        cItem.parentId = comboId;
        model.parentId = comboId;
      } else if (type === "node") {
        cItem.comboId = comboId;
        model.comboId = comboId;
      }
      return cItem;
    });
    comboConfig.children = trees;
    this.addItem("combo", comboConfig, false);
    this.set("comboSorted", false);
    var comboTrees = this.get("comboTrees");
    (comboTrees || []).forEach(function(ctree) {
      traverseTreeUp(ctree, function(child) {
        if (child.id === comboId) {
          child.itemType = "combo";
          child.children = trees;
          return false;
        }
        return true;
      });
    });
    if (comboTrees) {
      this.sortCombos();
    }
  };
  AbstractGraph.prototype.uncombo = function(combo) {
    var _this = this;
    var _a;
    var self = this;
    var comboItem = combo;
    if (isString(combo)) {
      comboItem = this.findById(combo);
    }
    if (!comboItem || comboItem.getType && comboItem.getType() !== "combo") {
      console.warn("The item is not a combo!");
      return;
    }
    var parentId = comboItem.getModel().parentId;
    var comboTrees = self.get("comboTrees");
    if (!comboTrees)
      comboTrees = [];
    var itemMap = this.get("itemMap");
    var comboId = comboItem.get("id");
    var treeToBeUncombo;
    var brothers = [];
    var comboItems = this.get("combos");
    var parentItem = this.findById(parentId);
    comboTrees.forEach(function(ctree) {
      if (treeToBeUncombo)
        return;
      traverseTreeUp(ctree, function(subtree) {
        var _a2;
        if (subtree.id === comboId) {
          treeToBeUncombo = subtree;
          var edgeIds = comboItem.getEdges().map(function(edge) {
            return edge.getID();
          });
          edgeIds.forEach(function(edgeId) {
            _this.removeItem(edgeId, false);
          });
          var index2 = comboItems.indexOf(comboItem);
          comboItems.splice(index2, 1);
          delete itemMap[comboId];
          comboItem.destroy();
          _this.emit("afterremoveitem", {
            item: comboItem,
            type: "combo"
          });
        }
        if (parentId && treeToBeUncombo && subtree.id === parentId) {
          parentItem.removeCombo(comboItem);
          brothers = subtree.children;
          var index2 = brothers.indexOf(treeToBeUncombo);
          if (index2 !== -1) {
            brothers.splice(index2, 1);
          }
          (_a2 = treeToBeUncombo.children) === null || _a2 === void 0 ? void 0 : _a2.forEach(function(child) {
            var item = _this.findById(child.id);
            var childModel = item.getModel();
            if (item.getType && item.getType() === "combo") {
              child.parentId = parentId;
              delete child.comboId;
              childModel.parentId = parentId;
              delete childModel.comboId;
            } else if (item.getType && item.getType() === "node") {
              child.comboId = parentId;
              childModel.comboId = parentId;
            }
            parentItem.addChild(item);
            brothers.push(child);
          });
          return false;
        }
        return true;
      });
    });
    if (!parentId && treeToBeUncombo) {
      var index = comboTrees.indexOf(treeToBeUncombo);
      comboTrees.splice(index, 1);
      (_a = treeToBeUncombo.children) === null || _a === void 0 ? void 0 : _a.forEach(function(child) {
        child.parentId = void 0;
        var childModel = _this.findById(child.id).getModel();
        delete childModel.parentId;
        delete childModel.comboId;
        if (child.itemType !== "node")
          comboTrees.push(child);
      });
    }
  };
  AbstractGraph.prototype.updateCombos = function(followCombo) {
    var _this = this;
    if (followCombo === void 0) {
      followCombo = false;
    }
    var self = this;
    var comboTrees = this.get("comboTrees");
    var itemController = self.get("itemController");
    var itemMap = self.get("itemMap");
    (comboTrees || []).forEach(function(ctree) {
      traverseTreeUp(ctree, function(child) {
        if (!child) {
          return true;
        }
        var childItem = itemMap[child.id];
        if (childItem && childItem.getType && childItem.getType() === "combo") {
          var states = __spreadArray$1([], childItem.getStates(), true);
          each(states, function(state) {
            return _this.setItemState(childItem, state, false);
          });
          itemController.updateCombo(childItem, child.children, followCombo);
          each(states, function(state) {
            return _this.setItemState(childItem, state, true);
          });
        }
        return true;
      });
    });
    self.sortCombos();
  };
  AbstractGraph.prototype.updateCombo = function(combo) {
    var _this = this;
    var self = this;
    var comboItem = combo;
    var comboId;
    if (isString(combo)) {
      comboItem = this.findById(combo);
    }
    if (!comboItem || comboItem.getType && comboItem.getType() !== "combo") {
      console.warn("The item to be updated is not a combo!");
      return;
    }
    comboId = comboItem.get("id");
    var comboTrees = this.get("comboTrees");
    var itemController = self.get("itemController");
    var itemMap = self.get("itemMap");
    (comboTrees || []).forEach(function(ctree) {
      traverseTreeUp(ctree, function(child) {
        if (!child) {
          return true;
        }
        var childItem = itemMap[child.id];
        if (comboId === child.id && childItem && childItem.getType && childItem.getType() === "combo") {
          var states = __spreadArray$1([], childItem.getStates(), true);
          each(states, function(state) {
            if (childItem.getStateStyle(state)) {
              _this.setItemState(childItem, state, false);
            }
          });
          itemController.updateCombo(childItem, child.children);
          each(states, function(state) {
            if (childItem.getStateStyle(state)) {
              _this.setItemState(childItem, state, true);
            }
          });
          if (comboId)
            comboId = child.parentId;
        }
        return true;
      });
    });
  };
  AbstractGraph.prototype.updateComboTree = function(item, parentId, stack) {
    if (stack === void 0) {
      stack = true;
    }
    var self = this;
    this.set("comboSorted", false);
    var uItem;
    if (isString(item)) {
      uItem = self.findById(item);
    } else {
      uItem = item;
    }
    var model = uItem.getModel();
    var oldParentId = model.comboId || model.parentId;
    var type = "";
    if (uItem.getType)
      type = uItem.getType();
    if (parentId && type === "combo") {
      var comboTrees = this.get("comboTrees");
      var valid_1 = true;
      var itemSubTree_1;
      (comboTrees || []).forEach(function(ctree) {
        if (itemSubTree_1)
          return;
        traverseTree(ctree, function(subTree) {
          if (itemSubTree_1)
            return;
          if (subTree.id === uItem.getID()) {
            itemSubTree_1 = subTree;
          }
          return true;
        });
      });
      traverseTree(itemSubTree_1, function(subTree) {
        if (subTree.id === parentId) {
          valid_1 = false;
          return false;
        }
        return true;
      });
      if (!valid_1) {
        console.warn("Failed to update the combo tree! The parentId points to a descendant of the combo!");
        return;
      }
    }
    if (stack && this.get("enabledStack")) {
      var beforeData = {}, afterData = {};
      if (type === "combo") {
        beforeData.combos = [{
          id: model.id,
          parentId: model.parentId
        }];
        afterData.combos = [{
          id: model.id,
          parentId
        }];
      } else if (type === "node") {
        beforeData.nodes = [{
          id: model.id,
          parentId: model.comboId
        }];
        afterData.nodes = [{
          id: model.id,
          parentId
        }];
      }
      this.pushStack("updateComboTree", {
        before: beforeData,
        after: afterData
      });
    }
    if (model.parentId || model.comboId) {
      var combo = this.findById(model.parentId || model.comboId);
      if (combo) {
        combo.removeChild(uItem);
      }
    }
    if (type === "combo") {
      model.parentId = parentId;
    } else if (type === "node") {
      model.comboId = parentId;
    }
    if (parentId) {
      var parentCombo = this.findById(parentId);
      if (parentCombo) {
        parentCombo.addChild(uItem);
      }
    }
    if (oldParentId) {
      var parentCombo = this.findById(oldParentId);
      if (parentCombo) {
        parentCombo.removeChild(uItem);
      }
    }
    var newComboTrees = reconstructTree(this.get("comboTrees"), model.id, parentId);
    this.set("comboTrees", newComboTrees);
    this.updateCombos();
  };
  AbstractGraph.prototype.save = function() {
    var nodes = [];
    var edges = [];
    var combos = [];
    each(this.get("nodes"), function(node) {
      nodes.push(node.getModel());
    });
    each(this.get("edges"), function(edge) {
      edges.push(edge.getModel());
    });
    each(this.get("combos"), function(combo) {
      combos.push(combo.getModel());
    });
    return {
      nodes,
      edges,
      combos
    };
  };
  AbstractGraph.prototype.changeSize = function(width, height) {
    var viewController = this.get("viewController");
    viewController.changeSize(width, height);
    return this;
  };
  AbstractGraph.prototype.refresh = function() {
    var self = this;
    self.emit("beforegraphrefresh");
    if (self.get("animate")) {
      self.positionsAnimate();
    } else {
      var nodes = self.get("nodes");
      var edges = self.get("edges");
      var vedges = self.get("edges");
      each(nodes, function(node) {
        node.refresh();
      });
      each(edges, function(edge) {
        edge.refresh();
      });
      each(vedges, function(vedge) {
        vedge.refresh();
      });
    }
    self.emit("aftergraphrefresh");
    self.autoPaint();
  };
  AbstractGraph.prototype.getNodes = function() {
    return this.get("nodes");
  };
  AbstractGraph.prototype.getEdges = function() {
    return this.get("edges");
  };
  AbstractGraph.prototype.getCombos = function() {
    return this.get("combos");
  };
  AbstractGraph.prototype.getComboChildren = function(combo) {
    if (isString(combo)) {
      combo = this.findById(combo);
    }
    if (!combo || combo.getType && combo.getType() !== "combo") {
      console.warn("The combo does not exist!");
      return;
    }
    return combo.getChildren();
  };
  AbstractGraph.prototype.positionsAnimate = function(referComboModel) {
    var self = this;
    self.emit("beforeanimate");
    var animateCfg = self.get("animateCfg");
    var onFrame = animateCfg.onFrame;
    var nodes = referComboModel ? self.getNodes().concat(self.getCombos()) : self.getNodes();
    var toNodes = nodes.map(function(node) {
      var model = node.getModel();
      return {
        id: model.id,
        x: model.x,
        y: model.y
      };
    });
    if (self.isAnimating()) {
      self.stopAnimate();
    }
    var canvas = self.get("canvas");
    canvas.animate(function(ratio) {
      each(toNodes, function(data) {
        var node = self.findById(data.id);
        if (!node || node.destroyed) {
          return;
        }
        var originAttrs = node.get("originAttrs");
        var model = node.get("model");
        var containerMatrix = node.getContainer().getMatrix();
        if (originAttrs === void 0 || originAttrs === null) {
          if (containerMatrix) {
            originAttrs = {
              x: containerMatrix[6],
              y: containerMatrix[7]
            };
          }
          node.set("originAttrs", originAttrs || 0);
        }
        if (onFrame) {
          var attrs = onFrame(node, ratio, data, originAttrs || {
            x: 0,
            y: 0
          });
          node.set("model", Object.assign(model, attrs));
        } else if (originAttrs) {
          model.x = originAttrs.x + (data.x - originAttrs.x) * ratio;
          model.y = originAttrs.y + (data.y - originAttrs.y) * ratio;
        } else {
          model.x = data.x;
          model.y = data.y;
        }
      });
      self.refreshPositions(referComboModel);
    }, {
      duration: animateCfg.duration,
      easing: animateCfg.easing,
      callback: function callback() {
        each(nodes, function(node) {
          node.set("originAttrs", null);
        });
        if (animateCfg.callback) {
          animateCfg.callback();
        }
        self.emit("afteranimate");
        self.animating = false;
      }
    });
  };
  AbstractGraph.prototype.refreshPositions = function(referComboModel) {
    var self = this;
    self.emit("beforegraphrefreshposition");
    var nodes = self.get("nodes");
    var edges = self.get("edges");
    var vedges = self.get("vedges");
    var combos = self.get("combos");
    var model;
    var updatedNodes = {};
    var updateItems = function updateItems2(items) {
      each(items, function(item) {
        model = item.getModel();
        var originAttrs = item.get("originAttrs");
        if (originAttrs && model.x === originAttrs.x && model.y === originAttrs.y) {
          return;
        }
        var changed = item.updatePosition({
          x: model.x,
          y: model.y
        });
        updatedNodes[model.id] = changed;
        if (model.comboId)
          updatedNodes[model.comboId] = updatedNodes[model.comboId] || changed;
      });
    };
    updateItems(nodes);
    if (combos && combos.length !== 0) {
      if (referComboModel) {
        updateItems(combos);
        setTimeout(function() {
          self.updateCombos();
        }, 0);
      } else {
        self.updateCombos();
      }
    }
    each(edges, function(edge) {
      var sourceModel = edge.getSource().getModel();
      var target = edge.getTarget();
      if (!isPlainObject(target)) {
        var targetModel = target.getModel();
        if (updatedNodes[sourceModel.id] || updatedNodes[targetModel.id] || edge.getModel().isComboEdge) {
          edge.refresh();
        }
      }
    });
    each(vedges, function(vedge) {
      vedge.refresh();
    });
    self.emit("aftergraphrefreshposition");
    self.autoPaint();
  };
  AbstractGraph.prototype.stopAnimate = function() {
    this.get("canvas").stopAnimate();
  };
  AbstractGraph.prototype.isAnimating = function() {
    return this.animating;
  };
  AbstractGraph.prototype.getZoom = function() {
    var matrix = this.get("group").getMatrix();
    return matrix ? matrix[0] : 1;
  };
  AbstractGraph.prototype.getCurrentMode = function() {
    var modeController = this.get("modeController");
    return modeController.getMode();
  };
  AbstractGraph.prototype.setMode = function(mode) {
    var modeController = this.get("modeController");
    modeController.setMode(mode);
    return this;
  };
  AbstractGraph.prototype.clear = function(avoidEmit) {
    var _a;
    if (avoidEmit === void 0) {
      avoidEmit = false;
    }
    (_a = this.get("canvas")) === null || _a === void 0 ? void 0 : _a.clear();
    this.initGroups();
    this.set({
      itemMap: {},
      nodes: [],
      edges: [],
      groups: [],
      combos: [],
      comboTrees: []
    });
    if (!avoidEmit)
      this.emit("afterrender");
    return this;
  };
  AbstractGraph.prototype.updateLayout = function(cfg, align, alignPoint) {
    var _this = this;
    var layoutController = this.get("layoutController");
    if (isString(cfg)) {
      cfg = {
        type: cfg
      };
    }
    if (align) {
      var toPoint_1 = alignPoint;
      if (!toPoint_1) {
        if (align === "begin")
          toPoint_1 = {
            x: 0,
            y: 0
          };
        else
          toPoint_1 = {
            x: this.getWidth() / 2,
            y: this.getHeight() / 2
          };
      }
      toPoint_1 = this.getPointByCanvas(toPoint_1.x, toPoint_1.y);
      var forceTypes = ["force", "gForce", "fruchterman"];
      if (forceTypes.includes(cfg.type) || !cfg.type && forceTypes.includes(layoutController === null || layoutController === void 0 ? void 0 : layoutController.layoutType)) {
        cfg.center = [toPoint_1.x, toPoint_1.y];
      } else {
        this.once("afterlayout", function(e) {
          var matrix = _this.getGroup().getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
          toPoint_1.x = toPoint_1.x * matrix[0] + matrix[6];
          toPoint_1.y = toPoint_1.y * matrix[0] + matrix[7];
          var _a = _this.getGroup().getCanvasBBox(), minX = _a.minX, maxX = _a.maxX, minY = _a.minY, maxY = _a.maxY;
          var bboxPoint = {
            x: (minX + maxX) / 2,
            y: (minY + maxY) / 2
          };
          if (align === "begin") {
            bboxPoint.x = minX;
            bboxPoint.y = minY;
          }
          _this.translate(toPoint_1.x - bboxPoint.x, toPoint_1.y - bboxPoint.y);
        });
      }
    }
    var oriLayoutCfg = this.get("layout");
    var layoutCfg = {};
    Object.assign(layoutCfg, oriLayoutCfg, cfg);
    this.set("layout", layoutCfg);
    if (!layoutController)
      return;
    if (layoutController.isLayoutTypeSame(layoutCfg) && layoutCfg.gpuEnabled === oriLayoutCfg.gpuEnabled) {
      layoutController.updateLayoutCfg(layoutCfg);
    } else {
      layoutController.changeLayout(layoutCfg);
    }
  };
  AbstractGraph.prototype.destroyLayout = function() {
    var layoutController = this.get("layoutController");
    layoutController === null || layoutController === void 0 ? void 0 : layoutController.destroyLayout();
  };
  AbstractGraph.prototype.layout = function() {
    var layoutController = this.get("layoutController");
    var layoutCfg = this.get("layout");
    if (!layoutCfg || !layoutController)
      return;
    if (layoutCfg.workerEnabled) {
      layoutController.layout();
      return;
    }
    if (layoutController.layoutMethod) {
      layoutController.relayout(true);
    } else {
      layoutController.layout();
    }
  };
  AbstractGraph.prototype.collapseCombo = function(combo) {
    var _this = this;
    if (this.destroyed)
      return;
    if (isString(combo)) {
      combo = this.findById(combo);
    }
    if (!combo) {
      console.warn("The combo to be collapsed does not exist!");
      return;
    }
    this.emit("beforecollapseexpandcombo", {
      action: "expand",
      item: combo
    });
    var comboModel = combo.getModel();
    var itemController = this.get("itemController");
    itemController.collapseCombo(combo);
    comboModel.collapsed = true;
    var edges = this.getEdges().concat(this.get("vedges"));
    var cnodes = [];
    var ccombos = [];
    var comboTrees = this.get("comboTrees");
    var found = false;
    (comboTrees || []).forEach(function(ctree) {
      if (found)
        return;
      traverseTree(ctree, function(subTree) {
        if (found && subTree.depth <= comboModel.depth)
          return false;
        if (comboModel.id === subTree.id)
          found = true;
        if (found) {
          var item = _this.findById(subTree.id);
          if (item && item.getType && item.getType() === "combo") {
            cnodes = cnodes.concat(item.getNodes());
            ccombos = ccombos.concat(item.getCombos());
          }
        }
        return true;
      });
    });
    var edgeWeightMap = {};
    var addedVEdges = [];
    edges.forEach(function(edge) {
      if (edge.isVisible() && !edge.getModel().isVEdge)
        return;
      var source = edge.getSource();
      var target = edge.getTarget();
      if ((cnodes.includes(source) || ccombos.includes(source)) && !cnodes.includes(target) && !ccombos.includes(target) || source.getModel().id === comboModel.id) {
        var edgeModel = edge.getModel();
        if (edgeModel.isVEdge) {
          _this.removeItem(edge, false);
          return;
        }
        var targetModel = target.getModel();
        while (!target.isVisible()) {
          target = _this.findById(targetModel.parentId || targetModel.comboId);
          if (!target || !targetModel.parentId && !targetModel.comboId)
            return;
          targetModel = target.getModel();
        }
        var targetId = targetModel.id;
        if (edgeWeightMap["".concat(comboModel.id, "-").concat(targetId)]) {
          edgeWeightMap["".concat(comboModel.id, "-").concat(targetId)] += edgeModel.size || 1;
          return;
        }
        var vedge = _this.addItem("vedge", {
          source: comboModel.id,
          target: targetId,
          isVEdge: true
        }, false);
        edgeWeightMap["".concat(comboModel.id, "-").concat(targetId)] = edgeModel.size || 1;
        addedVEdges.push(vedge);
      } else if (!cnodes.includes(source) && !ccombos.includes(source) && (cnodes.includes(target) || ccombos.includes(target)) || target.getModel().id === comboModel.id) {
        var edgeModel = edge.getModel();
        if (edgeModel.isVEdge) {
          _this.removeItem(edge, false);
          return;
        }
        var sourceModel = source.getModel();
        while (!source.isVisible()) {
          source = _this.findById(sourceModel.parentId || sourceModel.comboId);
          if (!source || !sourceModel.parentId && !sourceModel.comboId)
            return;
          sourceModel = source.getModel();
        }
        var sourceId = sourceModel.id;
        if (edgeWeightMap["".concat(sourceId, "-").concat(comboModel.id)]) {
          edgeWeightMap["".concat(sourceId, "-").concat(comboModel.id)] += edgeModel.size || 1;
          return;
        }
        var vedge = _this.addItem("vedge", {
          target: comboModel.id,
          source: sourceId,
          isVEdge: true
        }, false);
        edgeWeightMap["".concat(sourceId, "-").concat(comboModel.id)] = edgeModel.size || 1;
        addedVEdges.push(vedge);
      }
    });
    addedVEdges.forEach(function(vedge) {
      var vedgeModel = vedge.getModel();
      _this.updateItem(vedge, {
        size: edgeWeightMap["".concat(vedgeModel.source, "-").concat(vedgeModel.target)]
      }, false);
    });
    this.emit("aftercollapseexpandcombo", {
      action: "collapse",
      item: combo
    });
  };
  AbstractGraph.prototype.expandCombo = function(combo) {
    var _this = this;
    if (isString(combo)) {
      combo = this.findById(combo);
    }
    if (!combo || combo.getType && combo.getType() !== "combo") {
      console.warn("The combo to be collapsed does not exist!");
      return;
    }
    this.emit("beforecollapseexpandcombo", {
      action: "expand",
      item: combo
    });
    var comboModel = combo.getModel();
    var itemController = this.get("itemController");
    itemController.expandCombo(combo);
    comboModel.collapsed = false;
    var edges = this.getEdges().concat(this.get("vedges"));
    var cnodes = [];
    var ccombos = [];
    var comboTrees = this.get("comboTrees");
    var found = false;
    (comboTrees || []).forEach(function(ctree) {
      if (found)
        return;
      traverseTree(ctree, function(subTree) {
        if (found && subTree.depth <= comboModel.depth)
          return false;
        if (comboModel.id === subTree.id)
          found = true;
        if (found) {
          var item = _this.findById(subTree.id);
          if (item && item.getType && item.getType() === "combo") {
            cnodes = cnodes.concat(item.getNodes());
            ccombos = ccombos.concat(item.getCombos());
          }
        }
        return true;
      });
    });
    var edgeWeightMap = {};
    var addedVEdges = {};
    edges.forEach(function(edge) {
      if (edge.isVisible() && !edge.getModel().isVEdge)
        return;
      var source = edge.getSource();
      var target = edge.getTarget();
      var sourceId = source.get("id");
      var targetId = target.get("id");
      if ((cnodes.includes(source) || ccombos.includes(source)) && !cnodes.includes(target) && !ccombos.includes(target) || sourceId === comboModel.id) {
        if (edge.getModel().isVEdge) {
          _this.removeItem(edge, false);
          return;
        }
        var targetModel = target.getModel();
        while (!target.isVisible()) {
          target = _this.findById(targetModel.comboId || targetModel.parentId);
          if (!target || !targetModel.parentId && !targetModel.comboId) {
            return;
          }
          targetModel = target.getModel();
        }
        targetId = targetModel.id;
        var sourceModel = source.getModel();
        while (!source.isVisible()) {
          source = _this.findById(sourceModel.comboId || sourceModel.parentId);
          if (!source || !sourceModel.parentId && !sourceModel.comboId) {
            return;
          }
          if (sourceModel.comboId === comboModel.id || sourceModel.parentId === comboModel.id) {
            break;
          }
          sourceModel = source.getModel();
        }
        sourceId = sourceModel.id;
        if (targetId) {
          var vedgeId = "".concat(sourceId, "-").concat(targetId);
          if (edgeWeightMap[vedgeId]) {
            edgeWeightMap[vedgeId] += edge.getModel().size || 1;
            _this.updateItem(addedVEdges[vedgeId], {
              size: edgeWeightMap[vedgeId]
            }, false);
            return;
          }
          var vedge = _this.addItem("vedge", {
            source: sourceId,
            target: targetId,
            isVEdge: true
          }, false);
          edgeWeightMap[vedgeId] = edge.getModel().size || 1;
          addedVEdges[vedgeId] = vedge;
        }
      } else if (!cnodes.includes(source) && !ccombos.includes(source) && (cnodes.includes(target) || ccombos.includes(target)) || targetId === comboModel.id) {
        if (edge.getModel().isVEdge) {
          _this.removeItem(edge, false);
          return;
        }
        var sourceModel = source.getModel();
        while (!source.isVisible()) {
          source = _this.findById(sourceModel.comboId || sourceModel.parentId);
          if (!source || !sourceModel.parentId && !sourceModel.comboId) {
            return;
          }
          sourceModel = source.getModel();
        }
        sourceId = sourceModel.id;
        var targetModel = target.getModel();
        while (!target.isVisible()) {
          target = _this.findById(targetModel.comboId || targetModel.parentId);
          if (!target || !targetModel.parentId && !targetModel.comboId) {
            return;
          }
          if (targetModel.comboId === comboModel.id || targetModel.parentId === comboModel.id) {
            break;
          }
          targetModel = target.getModel();
        }
        targetId = targetModel.id;
        if (sourceId) {
          var vedgeId = "".concat(sourceId, "-").concat(targetId);
          if (edgeWeightMap[vedgeId]) {
            edgeWeightMap[vedgeId] += edge.getModel().size || 1;
            _this.updateItem(addedVEdges[vedgeId], {
              size: edgeWeightMap[vedgeId]
            }, false);
            return;
          }
          var vedge = _this.addItem("vedge", {
            target: targetId,
            source: sourceId,
            isVEdge: true
          }, false);
          edgeWeightMap[vedgeId] = edge.getModel().size || 1;
          addedVEdges[vedgeId] = vedge;
        }
      } else if ((cnodes.includes(source) || ccombos.includes(source)) && (cnodes.includes(target) || ccombos.includes(target))) {
        if (source.isVisible() && target.isVisible()) {
          edge.show();
        }
      }
    });
    this.emit("aftercollapseexpandcombo", {
      action: "expand",
      item: combo
    });
  };
  AbstractGraph.prototype.collapseExpandCombo = function(combo) {
    if (isString(combo)) {
      combo = this.findById(combo);
    }
    if (!combo || combo.getType && combo.getType() !== "combo")
      return;
    var comboModel = combo.getModel();
    var parentItem = this.findById(comboModel.parentId);
    while (parentItem) {
      var parentModel = parentItem.getModel();
      if (parentModel.collapsed) {
        console.warn("Fail to expand the combo since it's ancestor combo is collapsed.");
        parentItem = void 0;
        return;
      }
      parentItem = this.findById(parentModel.parentId);
    }
    var collapsed = comboModel.collapsed;
    if (collapsed) {
      this.expandCombo(combo);
    } else {
      this.collapseCombo(combo);
    }
    this.updateCombo(combo);
  };
  AbstractGraph.prototype.sortCombos = function() {
    var _this = this;
    var comboSorted = this.get("comboSorted");
    if (comboSorted)
      return;
    this.set("comboSorted", true);
    var depthMap = [];
    var dataDepthMap = {};
    var comboTrees = this.get("comboTrees");
    (comboTrees || []).forEach(function(cTree) {
      traverseTree(cTree, function(child) {
        if (depthMap[child.depth])
          depthMap[child.depth].push(child.id);
        else
          depthMap[child.depth] = [child.id];
        dataDepthMap[child.id] = child.depth;
        return true;
      });
    });
    var edges = this.getEdges().concat(this.get("vedges"));
    (edges || []).forEach(function(edgeItem) {
      var edge = edgeItem.getModel();
      var sourceDepth = dataDepthMap[edge.source] || 0;
      var targetDepth = dataDepthMap[edge.target] || 0;
      var depth = Math.max(sourceDepth, targetDepth);
      if (depthMap[depth])
        depthMap[depth].push(edge.id);
      else
        depthMap[depth] = [edge.id];
    });
    depthMap.forEach(function(array) {
      if (!array || !array.length)
        return;
      for (var i = array.length - 1; i >= 0; i--) {
        var item = _this.findById(array[i]);
        if (item)
          item.toFront();
      }
    });
  };
  AbstractGraph.prototype.getNeighbors = function(node, type) {
    var item = node;
    if (isString(node)) {
      item = this.findById(node);
    }
    return item.getNeighbors(type);
  };
  AbstractGraph.prototype.getNodeDegree = function(node, type, refresh) {
    if (type === void 0) {
      type = void 0;
    }
    if (refresh === void 0) {
      refresh = false;
    }
    var item = node;
    if (isString(node)) {
      item = this.findById(node);
    }
    var degrees = this.get("degrees");
    if (!degrees || refresh) {
      degrees = degree(this.save());
      this.set("degrees", degrees);
    }
    var nodeDegrees = degrees[item.getID()];
    var res = 0;
    if (!nodeDegrees) {
      return 0;
    }
    switch (type) {
      case "in":
        res = nodeDegrees.inDegree;
        break;
      case "out":
        res = nodeDegrees.outDegree;
        break;
      case "all":
        res = nodeDegrees;
        break;
      default:
        res = nodeDegrees.degree;
        break;
    }
    return res;
  };
  AbstractGraph.prototype.getUndoStack = function() {
    return this.undoStack;
  };
  AbstractGraph.prototype.getRedoStack = function() {
    return this.redoStack;
  };
  AbstractGraph.prototype.getStackData = function() {
    if (!this.get("enabledStack")) {
      return null;
    }
    return {
      undoStack: this.undoStack.toArray(),
      redoStack: this.redoStack.toArray()
    };
  };
  AbstractGraph.prototype.clearStack = function() {
    if (this.get("enabledStack")) {
      this.undoStack.clear();
      this.redoStack.clear();
    }
  };
  AbstractGraph.prototype.pushStack = function(action, data, stackType) {
    if (action === void 0) {
      action = "update";
    }
    if (stackType === void 0) {
      stackType = "undo";
    }
    if (!this.get("enabledStack")) {
      console.warn("\u8BF7\u5148\u542F\u7528 undo & redo \u529F\u80FD\uFF0C\u5728\u5B9E\u4F8B\u5316 Graph \u65F6\u5019\u914D\u7F6E enabledStack: true !");
      return;
    }
    var stackData = data ? clone$1(data) : {
      before: {},
      after: clone$1(this.save())
    };
    if (stackType === "redo") {
      this.redoStack.push({
        action,
        data: stackData
      });
    } else {
      this.undoStack.push({
        action,
        data: stackData
      });
    }
    this.emit("stackchange", {
      undoStack: this.undoStack,
      redoStack: this.redoStack
    });
  };
  AbstractGraph.prototype.getAdjMatrix = function(cache2, directed) {
    if (cache2 === void 0) {
      cache2 = true;
    }
    if (directed === void 0)
      directed = this.get("directed");
    var currentAdjMatrix = this.get("adjMatrix");
    if (!currentAdjMatrix || !cache2) {
      currentAdjMatrix = adjMatrix(this.save(), directed);
      this.set("adjMatrix", currentAdjMatrix);
    }
    return currentAdjMatrix;
  };
  AbstractGraph.prototype.getShortestPathMatrix = function(cache2, directed) {
    if (cache2 === void 0) {
      cache2 = true;
    }
    if (directed === void 0)
      directed = this.get("directed");
    var currentAdjMatrix = this.get("adjMatrix");
    var currentShourtestPathMatrix = this.get("shortestPathMatrix");
    if (!currentAdjMatrix || !cache2) {
      currentAdjMatrix = adjMatrix(this.save(), directed);
      this.set("adjMatrix", currentAdjMatrix);
    }
    if (!currentShourtestPathMatrix || !cache2) {
      currentShourtestPathMatrix = floydWarshall$1(this.save(), directed);
      this.set("shortestPathMatrix", currentShourtestPathMatrix);
    }
    return currentShourtestPathMatrix;
  };
  AbstractGraph.prototype.on = function(eventName, callback, once) {
    return _super.prototype.on.call(this, eventName, callback, once);
  };
  AbstractGraph.prototype.destroy = function() {
    var _a, _b, _c, _d, _e;
    this.clear();
    this.clearStack();
    (_a = this.get("itemController")) === null || _a === void 0 ? void 0 : _a.destroy();
    (_b = this.get("modeController")) === null || _b === void 0 ? void 0 : _b.destroy();
    (_c = this.get("viewController")) === null || _c === void 0 ? void 0 : _c.destroy();
    (_d = this.get("stateController")) === null || _d === void 0 ? void 0 : _d.destroy();
    (_e = this.get("canvas")) === null || _e === void 0 ? void 0 : _e.destroy();
    this.cfg = null;
    this.destroyed = true;
    this.redoStack = null;
    this.undoStack = null;
  };
  AbstractGraph.prototype.createHull = function(cfg) {
    if (!cfg.members || cfg.members.length < 1) {
      console.warn("Create hull failed! The members is empty.");
      return;
    }
    var parent = this.get("hullGroup");
    var hullMap = this.get("hullMap");
    if (!hullMap) {
      hullMap = {};
      this.set("hullMap", hullMap);
    }
    if (!parent || parent.get("destroyed")) {
      parent = this.get("group").addGroup({
        id: "hullGroup"
      });
      parent.toBack();
      this.set("hullGroup", parent);
    }
    if (hullMap[cfg.id]) {
      console.warn("Existed hull id.");
      return hullMap[cfg.id];
    }
    var group = parent.addGroup({
      id: "".concat(cfg.id, "-container")
    });
    var hull = new Hull(this, __assign(__assign({}, cfg), {
      group
    }));
    var hullId = hull.id;
    hullMap[hullId] = hull;
    return hull;
  };
  AbstractGraph.prototype.getHulls = function() {
    return this.get("hullMap");
  };
  AbstractGraph.prototype.getHullById = function(hullId) {
    return this.get("hullMap")[hullId];
  };
  AbstractGraph.prototype.removeHull = function(hull) {
    var _a;
    var hullInstance;
    if (isString(hull)) {
      hullInstance = this.getHullById(hull);
    } else {
      hullInstance = hull;
    }
    (_a = this.get("hullMap")) === null || _a === void 0 ? true : delete _a[hullInstance.id];
    hullInstance.destroy();
  };
  AbstractGraph.prototype.removeHulls = function() {
    var hulls = this.getHulls();
    if (!hulls || !Object.keys(hulls).length)
      return;
    Object.keys(hulls).forEach(function(key) {
      var hull = hulls[key];
      hull.destroy();
    });
    this.set("hullMap", {});
  };
  return AbstractGraph;
})(EventEmitter);
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
var transform$1 = transform$5;
var CLS_SHAPE_SUFFIX = "-shape";
var CLS_LABEL_SUFFIX = "-label";
var ARROWS = ["startArrow", "endArrow"];
var SHAPE_DEFAULT_ATTRS = {
  lineWidth: 1,
  stroke: void 0,
  fill: void 0,
  lineAppendWidth: 1,
  opacity: void 0,
  strokeOpacity: void 0,
  fillOpacity: void 0,
  x: 0,
  y: 0,
  r: 10,
  width: 20,
  height: 20,
  shadowColor: void 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0
};
var PATH_SHAPE_DEFAULT_ATTRS = {
  lineWidth: 1,
  stroke: "#000",
  lineDash: void 0,
  startArrow: false,
  endArrow: false,
  opacity: void 0,
  strokeOpacity: void 0,
  fillOpacity: void 0,
  shadowColor: void 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0
};
var SHAPES_DEFAULT_ATTRS = {
  edge: PATH_SHAPE_DEFAULT_ATTRS,
  node: SHAPE_DEFAULT_ATTRS,
  combo: SHAPE_DEFAULT_ATTRS
};
var CLS_LABEL_BG_SUFFIX = "-label-bg";
var shapeBase = {
  options: {
    labelCfg: {
      style: {
        fontFamily: Global.windowFontFamily
      }
    },
    descriptionCfg: {
      style: {
        fontFamily: Global.windowFontFamily
      }
    }
  },
  itemType: "",
  type: "",
  getCustomConfig: function getCustomConfig(cfg) {
    return {};
  },
  getOptions: function getOptions(cfg, updateType) {
    if (updateType === "move" || (updateType === null || updateType === void 0 ? void 0 : updateType.includes("bbox"))) {
      return {};
    }
    return deepMix({}, this.options, this.getCustomConfig(cfg) || {}, cfg);
  },
  draw: function draw3(cfg, group) {
    group["shapeMap"] = {};
    this.mergeStyle = this.getOptions(cfg);
    var shape = this.drawShape(cfg, group);
    shape.set("className", this.itemType + CLS_SHAPE_SUFFIX);
    group["shapeMap"][this.itemType + CLS_SHAPE_SUFFIX] = shape;
    if (cfg.label) {
      var label = this.drawLabel(cfg, group);
      label.set("className", this.itemType + CLS_LABEL_SUFFIX);
      group["shapeMap"][this.itemType + CLS_LABEL_SUFFIX] = label;
    }
    return shape;
  },
  afterDraw: function afterDraw2(cfg, group, keyShape) {
  },
  drawShape: function drawShape2(cfg, group) {
    return null;
  },
  drawLabel: function drawLabel(cfg, group) {
    var defaultLabelCfg = (this.mergeStyle || this.getOptions(cfg) || {}).labelCfg;
    var labelCfg = defaultLabelCfg || {};
    var labelStyle = this.getLabelStyle(cfg, labelCfg, group);
    var rotate3 = labelStyle.rotate;
    delete labelStyle.rotate;
    var label = group.addShape("text", {
      attrs: labelStyle,
      draggable: true,
      className: "text-shape",
      name: "text-shape",
      labelRelated: true
    });
    group["shapeMap"]["text-shape"] = label;
    if (!isNaN(rotate3) && rotate3 !== "") {
      var labelBBox = label.getBBox();
      var labelMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      if (labelStyle.rotateCenter) {
        switch (labelStyle.rotateCenter) {
          case "center":
            labelMatrix = transform$1(labelMatrix, [["t", -labelBBox.width / 2, -labelBBox.height / 2], ["r", rotate3], ["t", labelBBox.width / 2, labelBBox.height / 2]]);
            break;
          case "lefttop":
            labelMatrix = transform$1(labelMatrix, [["t", -labelStyle.x, -labelStyle.y], ["r", rotate3], ["t", labelStyle.x, labelStyle.y]]);
            break;
          case "leftcenter":
            labelMatrix = transform$1(labelMatrix, [["t", -labelStyle.x, -labelStyle.y - labelBBox.height / 2], ["r", rotate3], ["t", labelStyle.x, labelStyle.y + labelBBox.height / 2]]);
            break;
          default:
            labelMatrix = transform$1(labelMatrix, [["t", -labelBBox.width / 2, -labelBBox.height / 2], ["r", rotate3], ["t", labelBBox.width / 2, labelBBox.height / 2]]);
            break;
        }
      } else {
        labelMatrix = transform$1(labelMatrix, [["t", -labelStyle.x, -labelStyle.y - labelBBox.height / 2], ["r", rotate3], ["t", labelStyle.x, labelStyle.y + labelBBox.height / 2]]);
      }
      label.setMatrix(labelMatrix);
    }
    if (labelStyle.background) {
      var rect2 = this.drawLabelBg(cfg, group, label);
      var labelBgClassname = this.itemType + CLS_LABEL_BG_SUFFIX;
      rect2.set("classname", labelBgClassname);
      group["shapeMap"][labelBgClassname] = rect2;
      label.toFront();
    }
    return label;
  },
  drawLabelBg: function drawLabelBg(cfg, group, label) {
    var defaultLabelCfg = this.options.labelCfg;
    var labelCfg = mix({}, defaultLabelCfg, cfg.labelCfg);
    var style = this.getLabelBgStyleByPosition(label, labelCfg);
    var rect2 = group.addShape("rect", {
      name: "text-bg-shape",
      attrs: style,
      labelRelated: true
    });
    group["shapeMap"]["text-bg-shape"] = rect2;
    return rect2;
  },
  getLabelStyleByPosition: function getLabelStyleByPosition(cfg, labelCfg, group) {
    return {
      text: cfg.label
    };
  },
  getLabelBgStyleByPosition: function getLabelBgStyleByPosition(label, labelCfg) {
    return {};
  },
  getLabelStyle: function getLabelStyle(cfg, labelCfg, group) {
    var calculateStyle = this.getLabelStyleByPosition(cfg, labelCfg, group);
    var attrName = "".concat(this.itemType, "Label");
    var defaultStyle = Global[attrName] ? Global[attrName].style : null;
    return __assign(__assign(__assign({}, defaultStyle), calculateStyle), labelCfg.style);
  },
  getShapeStyle: function getShapeStyle(cfg) {
    return cfg.style;
  },
  update: function update(cfg, item, updateType) {
    this.updateShapeStyle(cfg, item, updateType);
    this.updateLabel(cfg, item, updateType);
  },
  updateShapeStyle: function updateShapeStyle(cfg, item, updateType) {
    var _a;
    var group = item.getContainer();
    var shape = item.getKeyShape();
    var shapeStyle = mix({}, shape.attr(), cfg.style);
    var _loop_1 = function _loop_12(key2) {
      var _b;
      var style = shapeStyle[key2];
      if (isPlainObject(style)) {
        var subShape = ((_a = group["shapeMap"]) === null || _a === void 0 ? void 0 : _a[key2]) || group.find(function(element) {
          return element.get("name") === key2;
        });
        subShape === null || subShape === void 0 ? void 0 : subShape.attr(style);
      } else {
        shape.attr((_b = {}, _b[key2] = style, _b));
      }
    };
    for (var key in shapeStyle) {
      _loop_1(key);
    }
  },
  updateLabel: function updateLabel(cfg, item, updateType) {
    var _a, _b;
    if (cfg.label || cfg.label === "") {
      var group = item.getContainer();
      var _c = (this.mergeStyle || this.getOptions({}, updateType) || {}).labelCfg, labelCfg = _c === void 0 ? {} : _c;
      var labelClassName_1 = this.itemType + CLS_LABEL_SUFFIX;
      var label = group["shapeMap"][labelClassName_1] || group.find(function(ele) {
        return ele.get("className") === labelClassName_1;
      });
      var labelBgClassname_1 = this.itemType + CLS_LABEL_BG_SUFFIX;
      var labelBg = group["shapeMap"][labelBgClassname_1] || group.find(function(ele) {
        return ele.get("className") === labelBgClassname_1;
      });
      if (!label) {
        var newLabel = this.drawLabel(cfg, group);
        newLabel.set("className", labelClassName_1);
        group["shapeMap"][labelClassName_1] = newLabel;
      } else {
        if (!updateType || updateType === "bbox|label" || this.itemType === "edge" && updateType !== "style") {
          labelCfg = deepMix(labelCfg, cfg.labelCfg);
        }
        var calculateStyle = this.getLabelStyleByPosition(cfg, labelCfg, group);
        var cfgStyle = (_a = cfg.labelCfg) === null || _a === void 0 ? void 0 : _a.style;
        var labelStyle = __assign(__assign({}, calculateStyle), cfgStyle);
        var rotate3 = labelStyle.rotate;
        delete labelStyle.rotate;
        if (!isNaN(rotate3) && rotate3 !== "") {
          var rotateMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
          rotateMatrix = transform$1(rotateMatrix, [["t", -labelStyle.x, -labelStyle.y], ["r", rotate3], ["t", labelStyle.x, labelStyle.y]]);
          labelStyle.matrix = rotateMatrix;
          label.attr(labelStyle);
        } else {
          if (((_b = label.getMatrix()) === null || _b === void 0 ? void 0 : _b[4]) !== 1) {
            label.resetMatrix();
          }
          label.attr(labelStyle);
        }
        if (!labelBg) {
          if (labelStyle.background) {
            labelBg = this.drawLabelBg(cfg, group, label);
            labelBg.set("classname", labelBgClassname_1);
            group["shapeMap"][labelBgClassname_1] = labelBg;
            label.toFront();
          }
        } else if (labelStyle.background) {
          var calculateBgStyle = this.getLabelBgStyleByPosition(label, labelCfg);
          labelBg.attr(calculateBgStyle);
        } else {
          group.removeChild(labelBg);
        }
      }
    }
  },
  afterUpdate: function afterUpdate2(cfg, item) {
  },
  setState: function setState3(name, value, item) {
    var _a, _b;
    var _c;
    var shape = item.get("keyShape");
    if (!shape || shape.destroyed)
      return;
    var type = item.getType();
    var stateName = isBoolean(value) ? name : "".concat(name, ":").concat(value);
    var shapeStateStyle = this.getStateStyle(stateName, item);
    var itemStateStyle = item.getStateStyle(stateName);
    if (!itemStateStyle && !shapeStateStyle) {
      return;
    }
    var styles = mix({}, itemStateStyle || shapeStateStyle);
    var group = item.getContainer();
    var keptAttrs = {
      x: 1,
      y: 1,
      cx: 1,
      cy: 1,
      matrix: 1
    };
    if (type === "combo") {
      keptAttrs.r = 1;
      keptAttrs.width = 1;
      keptAttrs.height = 1;
    }
    if (value) {
      var _loop_2 = function _loop_22(key2) {
        var _d;
        var style = styles[key2];
        if (isPlainObject(style) && !ARROWS.includes(key2)) {
          var subShape = ((_c = group["shapeMap"]) === null || _c === void 0 ? void 0 : _c[key2]) || group.find(function(element) {
            return element.get("name") === key2;
          });
          subShape === null || subShape === void 0 ? void 0 : subShape.attr(style);
        } else {
          shape.attr((_d = {}, _d[key2] = style, _d));
        }
      };
      for (var key in styles) {
        _loop_2(key);
      }
    } else {
      var enableStatesStyle = cloneBesidesImg(item.getCurrentStatesStyle());
      var model = item.getModel();
      var originStyle_1 = mix({}, model.style, cloneBesidesImg(item.getOriginStyle()));
      var keyShapeName_1 = shape.get("name");
      var shapeAttrs_1 = shape.attr();
      var keyShapeStyles_1 = {};
      Object.keys(shapeAttrs_1).forEach(function(key2) {
        if (key2 === "img")
          return;
        var attr = shapeAttrs_1[key2];
        if (attr && _typeof(attr) === "object") {
          keyShapeStyles_1[key2] = clone$1(attr);
        } else {
          keyShapeStyles_1[key2] = attr;
        }
      });
      var filtetDisableStatesStyle = {};
      var _loop_3 = function _loop_32(p2) {
        var style = styles[p2];
        if (isPlainObject(style) && !ARROWS.includes(p2)) {
          var subShape_1 = group["shapeMap"][p2] || group.find(function(ele) {
            return ele.get("name") === p2;
          });
          if (subShape_1) {
            var subShapeStyles_1 = cloneBesidesImg(subShape_1.attr());
            each(style, function(v, key2) {
              if (p2 === keyShapeName_1 && keyShapeStyles_1[key2] && !keptAttrs[key2]) {
                delete keyShapeStyles_1[key2];
                var value_1 = originStyle_1[p2][key2] || SHAPES_DEFAULT_ATTRS[type][key2];
                shape.attr(key2, value_1);
              } else if (subShapeStyles_1[key2] || subShapeStyles_1[key2] === 0) {
                delete subShapeStyles_1[key2];
                var value_2 = originStyle_1[p2][key2] || SHAPES_DEFAULT_ATTRS[type][key2];
                subShape_1.attr(key2, value_2);
              }
            });
            filtetDisableStatesStyle[p2] = subShapeStyles_1;
          }
        } else {
          if (keyShapeStyles_1[p2] && !keptAttrs[p2]) {
            delete keyShapeStyles_1[p2];
            var value_3 = originStyle_1[p2] || (originStyle_1[keyShapeName_1] ? originStyle_1[keyShapeName_1][p2] : void 0) || SHAPES_DEFAULT_ATTRS[type][p2];
            shape.attr(p2, value_3);
          }
        }
      };
      for (var p in styles) {
        _loop_3(p);
      }
      if (!keyShapeName_1) {
        mix(filtetDisableStatesStyle, keyShapeStyles_1);
      } else {
        filtetDisableStatesStyle[keyShapeName_1] = keyShapeStyles_1;
      }
      for (var key in enableStatesStyle) {
        if (keptAttrs[key])
          continue;
        var enableStyle = enableStatesStyle[key];
        if (!isPlainObject(enableStyle) || ARROWS.includes(key)) {
          if (!keyShapeName_1) {
            mix(originStyle_1, (_a = {}, _a[key] = enableStyle, _a));
          } else {
            mix(originStyle_1[keyShapeName_1], (_b = {}, _b[key] = enableStyle, _b));
            delete originStyle_1[key];
          }
          delete enableStatesStyle[key];
        }
      }
      var originstyles = {};
      deepMix(originstyles, originStyle_1, filtetDisableStatesStyle, enableStatesStyle);
      var keyShapeSetted = false;
      var _loop_4 = function _loop_42(originKey2) {
        var _e, _f;
        var style = originstyles[originKey2];
        if (isPlainObject(style) && !ARROWS.includes(originKey2)) {
          var subShape = group["shapeMap"][originKey2] || group.find(function(ele) {
            return ele.get("name") === originKey2;
          });
          if (subShape) {
            if (subShape.get("type") === "text" || subShape.get("labelRelated")) {
              delete style.x;
              delete style.y;
              delete style.matrix;
            }
            if (originKey2 === keyShapeName_1) {
              if (type === "combo") {
                delete style.r;
                delete style.width;
                delete style.height;
              }
              keyShapeSetted = true;
            }
            subShape.attr(style);
          }
        } else if (!keyShapeSetted) {
          var value_4 = style || SHAPES_DEFAULT_ATTRS[type][originKey2];
          if (type === "combo") {
            if (!keyShapeName_1) {
              shape.attr((_e = {}, _e[originKey2] = value_4, _e));
            }
          } else {
            shape.attr((_f = {}, _f[originKey2] = value_4, _f));
          }
        }
      };
      for (var originKey in originstyles) {
        _loop_4(originKey);
      }
    }
  },
  getStateStyle: function getStateStyle(name, item) {
    var model = item.getModel();
    var type = item.getType();
    var _a = this.getOptions(model), stateStyles = _a.stateStyles, _b = _a.style, style = _b === void 0 ? {} : _b;
    var modelStateStyle = model.stateStyles ? model.stateStyles[name] : stateStyles && stateStyles[name];
    if (type === "combo") {
      return clone$1(modelStateStyle);
    }
    return mix({}, style, modelStateStyle);
  },
  getControlPoints: function getControlPoints3(cfg) {
    return cfg.controlPoints;
  },
  getAnchorPoints: function getAnchorPoints3(cfg) {
    var _a, _b;
    var anchorPoints = (cfg === null || cfg === void 0 ? void 0 : cfg.anchorPoints) || ((_a = this.getCustomConfig(cfg)) === null || _a === void 0 ? void 0 : _a.anchorPoints) || ((_b = this.options) === null || _b === void 0 ? void 0 : _b.anchorPoints);
    return anchorPoints;
  }
};
var singleNode = {
  itemType: "node",
  shapeType: "single-node",
  labelPosition: "center",
  offset: Global.nodeLabel.offset,
  getSize: function getSize(cfg) {
    var _a;
    var size = ((_a = this.mergeStyle) === null || _a === void 0 ? void 0 : _a.size) || cfg.size || this.getOptions({}).size || Global.defaultNode.size;
    if (isArray$1(size) && size.length === 1) {
      size = [size[0], size[0]];
    }
    if (!isArray$1(size)) {
      size = [size, size];
    }
    return size;
  },
  getLabelStyleByPosition: function getLabelStyleByPosition2(cfg, labelCfg) {
    var labelPosition = labelCfg.position || this.labelPosition;
    if (labelPosition === "center") {
      return {
        x: 0,
        y: 0,
        text: cfg.label,
        textBaseline: "middle",
        textAlign: "center"
      };
    }
    var offset = labelCfg.offset;
    if (isNil(offset)) {
      offset = this.offset;
    }
    var size = this.getSize(cfg);
    var style;
    switch (labelPosition) {
      case "top":
        style = {
          x: 0,
          y: -size[1] / 2 - offset,
          textBaseline: "bottom",
          textAlign: "center"
        };
        break;
      case "bottom":
        style = {
          x: 0,
          y: size[1] / 2 + offset,
          textBaseline: "top",
          textAlign: "center"
        };
        break;
      case "left":
        style = {
          x: -size[0] / 2 - offset,
          y: 0,
          textBaseline: "middle",
          textAlign: "right"
        };
        break;
      default:
        style = {
          x: size[0] / 2 + offset,
          y: 0,
          textBaseline: "middle",
          textAlign: "left"
        };
        break;
    }
    style.text = cfg.label;
    return style;
  },
  getLabelBgStyleByPosition: function getLabelBgStyleByPosition2(label, labelCfg) {
    var _a;
    if (!label)
      return {};
    var backgroundStyle = (_a = labelCfg.style) === null || _a === void 0 ? void 0 : _a.background;
    if (!backgroundStyle)
      return {};
    var bbox = label.getBBox();
    var padding = formatPadding(backgroundStyle.padding);
    var backgroundWidth = bbox.width + padding[1] + padding[3];
    var backgroundHeight = bbox.height + padding[0] + padding[2];
    return __assign(__assign({
      x: bbox.minX - padding[3],
      y: bbox.minY - padding[0]
    }, backgroundStyle), {
      width: backgroundWidth,
      height: backgroundHeight
    });
  },
  drawShape: function drawShape3(cfg, group) {
    var shapeType = this.shapeType;
    var style = this.getShapeStyle(cfg);
    var shape = group.addShape(shapeType, {
      attrs: style,
      draggable: true,
      name: "node-shape"
    });
    group["shapeMap"]["node-shape"] = shape;
    return shape;
  },
  updateLinkPoints: function updateLinkPoints(cfg, group) {
    var defaultLinkPoints = (this.mergeStyle || this.getOptions(cfg)).linkPoints;
    var markLeft = group["shapeMap"]["link-point-left"] || group.find(function(element) {
      return element.get("className") === "link-point-left";
    });
    var markRight = group["shapeMap"]["link-point-right"] || group.find(function(element) {
      return element.get("className") === "link-point-right";
    });
    var markTop = group["shapeMap"]["link-point-top"] || group.find(function(element) {
      return element.get("className") === "link-point-top";
    });
    var markBottom = group["shapeMap"]["link-point-bottom"] || group.find(function(element) {
      return element.get("className") === "link-point-bottom";
    });
    var currentLinkPoints;
    if (markLeft) {
      currentLinkPoints = markLeft.attr();
    }
    if (markRight && !currentLinkPoints) {
      currentLinkPoints = markRight.attr();
    }
    if (markTop && !currentLinkPoints) {
      currentLinkPoints = markTop.attr();
    }
    if (markBottom && !currentLinkPoints) {
      currentLinkPoints = markBottom.attr();
    }
    if (!currentLinkPoints)
      currentLinkPoints = defaultLinkPoints;
    var linkPoints = mix({}, currentLinkPoints, cfg.linkPoints);
    var markFill = linkPoints.fill, markStroke = linkPoints.stroke, borderWidth = linkPoints.lineWidth;
    var markSize = linkPoints.size / 2;
    if (!markSize)
      markSize = linkPoints.r;
    var _a = cfg.linkPoints ? cfg.linkPoints : {
      left: void 0,
      right: void 0,
      top: void 0,
      bottom: void 0
    }, left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom;
    var size = this.getSize(cfg);
    var width = size[0];
    var height = size[1];
    var styles = {
      r: markSize,
      fill: markFill,
      stroke: markStroke,
      lineWidth: borderWidth
    };
    if (markLeft) {
      if (!left && left !== void 0) {
        markLeft.remove();
        delete group["shapeMap"]["link-point-left"];
      } else {
        markLeft.attr(__assign(__assign({}, styles), {
          x: -width / 2,
          y: 0
        }));
      }
    } else if (left) {
      var name_1 = "link-point-left";
      group["shapeMap"][name_1] = group.addShape("circle", {
        attrs: __assign(__assign({}, styles), {
          x: -width / 2,
          y: 0
        }),
        className: name_1,
        name: name_1,
        isAnchorPoint: true
      });
    }
    if (markRight) {
      if (!right && right !== void 0) {
        markRight.remove();
        delete group["shapeMap"]["link-point-right"];
      }
      markRight.attr(__assign(__assign({}, styles), {
        x: width / 2,
        y: 0
      }));
    } else if (right) {
      var name_2 = "link-point-right";
      group["shapeMap"][name_2] = group.addShape("circle", {
        attrs: __assign(__assign({}, styles), {
          x: width / 2,
          y: 0
        }),
        className: name_2,
        name: name_2,
        isAnchorPoint: true
      });
    }
    if (markTop) {
      if (!top && top !== void 0) {
        markTop.remove();
        delete group["shapeMap"]["link-point-top"];
      }
      markTop.attr(__assign(__assign({}, styles), {
        x: 0,
        y: -height / 2
      }));
    } else if (top) {
      var name_3 = "link-point-top";
      group["shapeMap"][name_3] = group.addShape("circle", {
        attrs: __assign(__assign({}, styles), {
          x: 0,
          y: -height / 2
        }),
        className: name_3,
        name: name_3,
        isAnchorPoint: true
      });
    }
    if (markBottom) {
      if (!bottom && bottom !== void 0) {
        markBottom.remove();
        delete group["shapeMap"]["link-point-bottom"];
      } else {
        markBottom.attr(__assign(__assign({}, styles), {
          x: 0,
          y: height / 2
        }));
      }
    } else if (bottom) {
      var name_4 = "link-point-bottom";
      group["shapeMap"][name_4] = group.addShape("circle", {
        attrs: __assign(__assign({}, styles), {
          x: 0,
          y: height / 2
        }),
        className: name_4,
        name: name_4,
        isAnchorPoint: true
      });
    }
  },
  updateShape: function updateShape(cfg, item, keyShapeStyle, hasIcon, updateType) {
    var keyShape = item.get("keyShape");
    keyShape.attr(__assign({}, keyShapeStyle));
    {
      this.updateLabel(cfg, item, updateType);
    }
    if (hasIcon) {
      this.updateIcon(cfg, item);
    }
  },
  updateIcon: function updateIcon(cfg, item) {
    var _this = this;
    var group = item.getContainer();
    var icon = (this.mergeStyle || this.getOptions(cfg)).icon;
    var _a = cfg.icon ? cfg.icon : {
      show: void 0,
      text: void 0
    }, show = _a.show, text2 = _a.text;
    var iconShape = group["shapeMap"]["".concat(this.type, "-icon")] || group.find(function(ele) {
      return ele.get("name") === "".concat(_this.type, "-icon");
    });
    if (iconShape) {
      if (show || show === void 0) {
        var iconConfig = mix({}, iconShape.attr(), icon);
        var _b = iconConfig.width, w = _b === void 0 ? 20 : _b, _c = iconConfig.height, h = _c === void 0 ? 20 : _c;
        if (iconConfig.fontFamily === "iconfont" || iconConfig.hasOwnProperty("text")) {
          w = 0;
          h = 0;
        }
        iconShape.attr(__assign(__assign({}, iconConfig), {
          x: -w / 2,
          y: -h / 2
        }));
      } else {
        iconShape.remove();
      }
    } else if (show) {
      var name_5 = "".concat(this.type, "-icon");
      if (text2) {
        group["shapeMap"][name_5] = group.addShape("text", {
          attrs: __assign({
            x: 0,
            y: 0,
            fontSize: 12,
            fill: "#000",
            stroke: "#000",
            textBaseline: "middle",
            textAlign: "center"
          }, icon),
          className: name_5,
          name: name_5
        });
      } else {
        var w = icon.width, h = icon.height;
        group["shapeMap"][name_5] = group.addShape("image", {
          attrs: __assign(__assign({}, icon), {
            x: -w / 2,
            y: -h / 2
          }),
          className: name_5,
          name: name_5
        });
      }
      var labelShape = group["shapeMap"]["node-label"] || group.find(function(ele) {
        return ele.get("name") === "node-label";
      });
      if (labelShape) {
        labelShape.toFront();
      }
    }
  }
};
var singleNodeDef = __assign(__assign({}, shapeBase), singleNode);
Shape.registerNode("single-node", singleNodeDef);
var CLS_SHAPE = "edge-shape";
function revertAlign(labelPosition) {
  var textAlign = labelPosition;
  if (labelPosition === "start") {
    textAlign = "end";
  } else if (labelPosition === "end") {
    textAlign = "start";
  }
  return textAlign;
}
var singleEdge = {
  itemType: "edge",
  labelPosition: "center",
  refX: 0,
  refY: 0,
  labelAutoRotate: false,
  options: {
    size: Global.defaultEdge.size,
    style: {
      x: 0,
      y: 0,
      stroke: Global.defaultEdge.style.stroke,
      lineAppendWidth: Global.defaultEdge.style.lineAppendWidth
    },
    labelCfg: {
      style: {
        fill: Global.edgeLabel.style.fill,
        fontSize: Global.edgeLabel.style.fontSize,
        fontFamily: Global.windowFontFamily
      }
    },
    stateStyles: __assign({}, Global.edgeStateStyles)
  },
  getPath: function getPath(points) {
    var path2 = [];
    each(points, function(point, index) {
      if (index === 0) {
        path2.push(["M", point.x, point.y]);
      } else {
        path2.push(["L", point.x, point.y]);
      }
    });
    return path2;
  },
  getShapeStyle: function getShapeStyle2(cfg) {
    var defaultStyle = this.options.style;
    var strokeStyle = {
      stroke: cfg.color
    };
    var style = mix({}, defaultStyle, strokeStyle, cfg.style);
    var size = cfg.size || Global.defaultEdge.size;
    cfg = this.getPathPoints(cfg);
    var startPoint = cfg.startPoint, endPoint = cfg.endPoint;
    var controlPoints = this.getControlPoints(cfg);
    var points = [startPoint];
    if (controlPoints) {
      points = points.concat(controlPoints);
    }
    points.push(endPoint);
    var path2 = this.getPath(points);
    var styles = mix({}, Global.defaultEdge.style, {
      stroke: Global.defaultEdge.color,
      lineWidth: size,
      path: path2
    }, style);
    return styles;
  },
  updateShapeStyle: function updateShapeStyle2(cfg, item, updateType) {
    var _a;
    var group = item.getContainer();
    var shape = ((_a = item.getKeyShape) === null || _a === void 0 ? void 0 : _a.call(item)) || group["shapeMap"]["edge-shape"];
    var size = cfg.size;
    cfg = this.getPathPoints(cfg);
    var startPoint = cfg.startPoint, endPoint = cfg.endPoint;
    var controlPoints = this.getControlPoints(cfg);
    var points = [startPoint];
    if (controlPoints) {
      points = points.concat(controlPoints);
    }
    points.push(endPoint);
    var currentAttr = shape.attr();
    var previousStyle = cfg.style || {};
    if (previousStyle.stroke === void 0) {
      previousStyle.stroke = cfg.color;
    }
    var source = cfg.sourceNode;
    var target = cfg.targetNode;
    var routeCfg = {
      radius: previousStyle.radius
    };
    if (!controlPoints) {
      routeCfg = {
        source,
        target,
        offset: previousStyle.offset,
        radius: previousStyle.radius
      };
    }
    var path2 = this.getPath(points, routeCfg);
    var style = {};
    if (updateType === "move") {
      style = {
        path: path2
      };
    } else {
      if (currentAttr.endArrow && previousStyle.endArrow === false) {
        cfg.style.endArrow = {
          path: ""
        };
      }
      if (currentAttr.startArrow && previousStyle.startArrow === false) {
        cfg.style.startArrow = {
          path: ""
        };
      }
      style = __assign({}, cfg.style);
      if (style.lineWidth === void 0)
        style.lineWdith = (isNumber(size) ? size : size === null || size === void 0 ? void 0 : size[0]) || currentAttr.lineWidth;
      if (style.path === void 0)
        style.path = path2;
      if (style.stroke === void 0)
        style.stroke = currentAttr.stroke || cfg.color;
    }
    if (shape) {
      shape.attr(style);
    }
  },
  getLabelStyleByPosition: function getLabelStyleByPosition3(cfg, labelCfg, group) {
    var labelPosition = labelCfg.position || this.labelPosition;
    var style = {};
    var pathShape = group === null || group === void 0 ? void 0 : group["shapeMap"][CLS_SHAPE];
    var pointPercent;
    if (labelPosition === "start") {
      pointPercent = 0;
    } else if (labelPosition === "end") {
      pointPercent = 1;
    } else {
      pointPercent = 0.5;
    }
    var offsetX = labelCfg.refX || this.refX;
    var offsetY = labelCfg.refY || this.refY;
    if (cfg.startPoint.x === cfg.endPoint.x && cfg.startPoint.y === cfg.endPoint.y) {
      style.x = cfg.startPoint.x + offsetX;
      style.y = cfg.startPoint.y + offsetY;
      style.text = cfg.label;
      return style;
    }
    var autoRotate;
    if (isNil(labelCfg.autoRotate))
      autoRotate = this.labelAutoRotate;
    else
      autoRotate = labelCfg.autoRotate;
    var offsetStyle = getLabelPosition(pathShape, pointPercent, offsetX, offsetY, autoRotate);
    style.x = offsetStyle.x;
    style.y = offsetStyle.y;
    style.rotate = offsetStyle.rotate;
    style.textAlign = this._getTextAlign(labelPosition, offsetStyle.angle);
    style.text = cfg.label;
    return style;
  },
  getLabelBgStyleByPosition: function getLabelBgStyleByPosition3(label, labelCfg) {
    if (!label) {
      return {};
    }
    var bbox = label.getBBox();
    var backgroundStyle = labelCfg.style && labelCfg.style.background;
    if (!backgroundStyle) {
      return {};
    }
    var padding = backgroundStyle.padding;
    var backgroundWidth = bbox.width + padding[1] + padding[3];
    var backgroundHeight = bbox.height + padding[0] + padding[2];
    var style = __assign(__assign({}, backgroundStyle), {
      width: backgroundWidth,
      height: backgroundHeight,
      x: bbox.minX - padding[3],
      y: bbox.minY - padding[0],
      matrix: [1, 0, 0, 0, 1, 0, 0, 0, 1]
    });
    var autoRotate;
    if (isNil(labelCfg.autoRotate))
      autoRotate = this.labelAutoRotate;
    else
      autoRotate = labelCfg.autoRotate;
    if (autoRotate) {
      style.matrix = label.attr("matrix") || [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    return style;
  },
  _getTextAlign: function _getTextAlign(labelPosition, angle) {
    var textAlign = "center";
    if (!angle) {
      return labelPosition;
    }
    angle = angle % (Math.PI * 2);
    if (labelPosition !== "center") {
      if (angle >= 0 && angle <= Math.PI / 2 || angle >= 3 / 2 * Math.PI && angle < 2 * Math.PI) {
        textAlign = labelPosition;
      } else {
        textAlign = revertAlign(labelPosition);
      }
    }
    return textAlign;
  },
  getControlPoints: function getControlPoints4(cfg) {
    return cfg.controlPoints;
  },
  getPathPoints: function getPathPoints(cfg) {
    return cfg;
  },
  drawShape: function drawShape4(cfg, group) {
    var shapeStyle = this.getShapeStyle(cfg);
    var shape = group.addShape("path", {
      className: CLS_SHAPE,
      name: CLS_SHAPE,
      attrs: shapeStyle
    });
    group["shapeMap"][CLS_SHAPE] = shape;
    return shape;
  },
  drawLabel: function drawLabel2(cfg, group) {
    var defaultLabelCfg = this.options.labelCfg;
    var labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
    var labelStyle = this.getLabelStyle(cfg, labelCfg, group);
    var rotate3 = labelStyle.rotate;
    delete labelStyle.rotate;
    var label = group.addShape("text", {
      attrs: labelStyle,
      name: "text-shape",
      labelRelated: true
    });
    group["shapeMap"]["text-shape"] = label;
    if (!isNaN(rotate3) && rotate3 !== "") {
      label.rotateAtStart(rotate3);
    }
    if (labelStyle.background) {
      var rect2 = this.drawLabelBg(cfg, group, label, labelStyle, rotate3);
      var labelBgClassname = this.itemType + CLS_LABEL_BG_SUFFIX;
      rect2.set("classname", labelBgClassname);
      group["shapeMap"][labelBgClassname] = rect2;
      label.toFront();
    }
    return label;
  },
  drawLabelBg: function drawLabelBg2(cfg, group, label, labelStyle, rotate3) {
    var defaultLabelCfg = this.options.labelCfg;
    var labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
    var style = this.getLabelBgStyleByPosition(label, labelCfg);
    var rect2 = group.addShape("rect", {
      name: "text-bg-shape",
      attrs: style,
      labelRelated: true
    });
    group["shapeMap"]["text-bg-shape"] = rect2;
    return rect2;
  }
};
var singleEdgeDef = __assign(__assign({}, shapeBase), singleEdge);
Shape.registerEdge("single-edge", singleEdgeDef);
Shape.registerEdge("line", {
  getControlPoints: function getControlPoints5() {
    return void 0;
  }
}, "single-edge");
Shape.registerEdge("spline", {
  getPath: function getPath2(points) {
    var path2 = getSpline(points);
    return path2;
  }
}, "single-edge");
Shape.registerEdge("arc", {
  curveOffset: 20,
  clockwise: 1,
  getControlPoints: function getControlPoints6(cfg) {
    var startPoint = cfg.startPoint, endPoint = cfg.endPoint;
    var midPoint = {
      x: (startPoint.x + endPoint.x) / 2,
      y: (startPoint.y + endPoint.y) / 2
    };
    var center;
    var arcPoint;
    if (cfg.controlPoints !== void 0) {
      arcPoint = cfg.controlPoints[0];
      center = getCircleCenterByPoints(startPoint, arcPoint, endPoint);
      if (startPoint.x <= endPoint.x && startPoint.y > endPoint.y) {
        this.clockwise = center.x > arcPoint.x ? 0 : 1;
      } else if (startPoint.x <= endPoint.x && startPoint.y < endPoint.y) {
        this.clockwise = center.x > arcPoint.x ? 1 : 0;
      } else if (startPoint.x > endPoint.x && startPoint.y <= endPoint.y) {
        this.clockwise = center.y < arcPoint.y ? 0 : 1;
      } else {
        this.clockwise = center.y < arcPoint.y ? 1 : 0;
      }
      if ((arcPoint.x - startPoint.x) / (arcPoint.y - startPoint.y) === (endPoint.x - startPoint.x) / (endPoint.y - startPoint.y)) {
        return [];
      }
    } else {
      if (cfg.curveOffset === void 0) {
        cfg.curveOffset = this.curveOffset;
      }
      if (isArray$1(cfg.curveOffset)) {
        cfg.curveOffset = cfg.curveOffset[0];
      }
      if (cfg.curveOffset < 0) {
        this.clockwise = 0;
      } else {
        this.clockwise = 1;
      }
      var vec = {
        x: endPoint.x - startPoint.x,
        y: endPoint.y - startPoint.y
      };
      var edgeAngle = Math.atan2(vec.y, vec.x);
      arcPoint = {
        x: cfg.curveOffset * Math.cos(-Math.PI / 2 + edgeAngle) + midPoint.x,
        y: cfg.curveOffset * Math.sin(-Math.PI / 2 + edgeAngle) + midPoint.y
      };
      center = getCircleCenterByPoints(startPoint, arcPoint, endPoint);
    }
    var radius2 = distance$2(startPoint, center);
    var controlPoints = [{
      x: radius2,
      y: radius2
    }];
    return controlPoints;
  },
  getPath: function getPath3(points) {
    var path2 = [];
    path2.push(["M", points[0].x, points[0].y]);
    if (points.length === 2) {
      path2.push(["L", points[1].x, points[1].y]);
    } else {
      path2.push(["A", points[1].x, points[1].y, 0, 0, this.clockwise, points[2].x, points[2].y]);
    }
    return path2;
  }
}, "single-edge");
Shape.registerEdge("quadratic", {
  curvePosition: 0.5,
  curveOffset: -20,
  getControlPoints: function getControlPoints7(cfg) {
    var controlPoints = cfg.controlPoints;
    if (!controlPoints || !controlPoints.length) {
      var startPoint = cfg.startPoint, endPoint = cfg.endPoint;
      if (cfg.curveOffset === void 0)
        cfg.curveOffset = this.curveOffset;
      if (cfg.curvePosition === void 0)
        cfg.curvePosition = this.curvePosition;
      if (isArray$1(this.curveOffset))
        cfg.curveOffset = cfg.curveOffset[0];
      if (isArray$1(this.curvePosition))
        cfg.curvePosition = cfg.curveOffset[0];
      var innerPoint = getControlPoint(startPoint, endPoint, cfg.curvePosition, cfg.curveOffset);
      controlPoints = [innerPoint];
    }
    return controlPoints;
  },
  getPath: function getPath4(points) {
    var path2 = [];
    path2.push(["M", points[0].x, points[0].y]);
    path2.push(["Q", points[1].x, points[1].y, points[2].x, points[2].y]);
    return path2;
  }
}, "single-edge");
Shape.registerEdge("cubic", {
  curvePosition: [1 / 2, 1 / 2],
  curveOffset: [-20, 20],
  getControlPoints: function getControlPoints8(cfg) {
    var controlPoints = cfg.controlPoints;
    if (cfg.curveOffset === void 0)
      cfg.curveOffset = this.curveOffset;
    if (cfg.curvePosition === void 0)
      cfg.curvePosition = this.curvePosition;
    if (isNumber(cfg.curveOffset))
      cfg.curveOffset = [cfg.curveOffset, -cfg.curveOffset];
    if (isNumber(cfg.curvePosition))
      cfg.curvePosition = [cfg.curvePosition, 1 - cfg.curvePosition];
    if (!controlPoints || !controlPoints.length || controlPoints.length < 2) {
      var startPoint = cfg.startPoint, endPoint = cfg.endPoint;
      var innerPoint1 = getControlPoint(startPoint, endPoint, cfg.curvePosition[0], cfg.curveOffset[0]);
      var innerPoint2 = getControlPoint(startPoint, endPoint, cfg.curvePosition[1], cfg.curveOffset[1]);
      controlPoints = [innerPoint1, innerPoint2];
    }
    return controlPoints;
  },
  getPath: function getPath5(points) {
    var path2 = [];
    path2.push(["M", points[0].x, points[0].y]);
    path2.push(["C", points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y]);
    return path2;
  }
}, "single-edge");
Shape.registerEdge("cubic-vertical", {
  curvePosition: [1 / 2, 1 / 2],
  minCurveOffset: [0, 0],
  curveOffset: void 0,
  getControlPoints: function getControlPoints9(cfg) {
    var startPoint = cfg.startPoint, endPoint = cfg.endPoint;
    if (cfg.curvePosition === void 0)
      cfg.curvePosition = this.curvePosition;
    if (cfg.curveOffset === void 0)
      cfg.curveOffset = this.curveOffset;
    if (cfg.minCurveOffset === void 0)
      cfg.minCurveOffset = this.minCurveOffset;
    if (isNumber(cfg.curveOffset))
      cfg.curveOffset = [cfg.curveOffset, -cfg.curveOffset];
    if (isNumber(cfg.minCurveOffset))
      cfg.minCurveOffset = [cfg.minCurveOffset, -cfg.minCurveOffset];
    if (isNumber(cfg.curvePosition))
      cfg.curvePosition = [cfg.curvePosition, 1 - cfg.curvePosition];
    var yDist = endPoint.y - startPoint.y;
    var curveOffset = [0, 0];
    if (cfg.curveOffset) {
      curveOffset = cfg.curveOffset;
    } else if (Math.abs(yDist) < Math.abs(cfg.minCurveOffset[0])) {
      curveOffset = cfg.minCurveOffset;
    }
    var innerPoint1 = {
      x: startPoint.x,
      y: startPoint.y + yDist * this.curvePosition[0] + curveOffset[0]
    };
    var innerPoint2 = {
      x: endPoint.x,
      y: endPoint.y - yDist * this.curvePosition[1] + curveOffset[1]
    };
    return [innerPoint1, innerPoint2];
  }
}, "cubic");
Shape.registerEdge("cubic-horizontal", {
  curvePosition: [1 / 2, 1 / 2],
  minCurveOffset: [0, 0],
  curveOffset: void 0,
  getControlPoints: function getControlPoints10(cfg) {
    var startPoint = cfg.startPoint, endPoint = cfg.endPoint;
    if (cfg.curvePosition === void 0)
      cfg.curvePosition = this.curvePosition;
    if (cfg.curveOffset === void 0)
      cfg.curveOffset = this.curveOffset;
    if (cfg.minCurveOffset === void 0)
      cfg.minCurveOffset = this.minCurveOffset;
    if (isNumber(cfg.curveOffset))
      cfg.curveOffset = [cfg.curveOffset, -cfg.curveOffset];
    if (isNumber(cfg.minCurveOffset))
      cfg.minCurveOffset = [cfg.minCurveOffset, -cfg.minCurveOffset];
    if (isNumber(cfg.curvePosition))
      cfg.curvePosition = [cfg.curvePosition, 1 - cfg.curvePosition];
    var xDist = endPoint.x - startPoint.x;
    var curveOffset = [0, 0];
    if (cfg.curveOffset) {
      curveOffset = cfg.curveOffset;
    } else if (Math.abs(xDist) < Math.abs(cfg.minCurveOffset[0])) {
      curveOffset = cfg.minCurveOffset;
    }
    var innerPoint1 = {
      x: startPoint.x + xDist * this.curvePosition[0] + curveOffset[0],
      y: startPoint.y
    };
    var innerPoint2 = {
      x: endPoint.x - xDist * this.curvePosition[1] + curveOffset[1],
      y: endPoint.y
    };
    var controlPoints = [innerPoint1, innerPoint2];
    return controlPoints;
  }
}, "cubic");
Shape.registerEdge("loop", {
  getPathPoints: function getPathPoints2(cfg) {
    return getLoopCfgs(cfg);
  },
  getControlPoints: function getControlPoints11(cfg) {
    return cfg.controlPoints;
  },
  afterDraw: function afterDraw3(cfg) {
    cfg.controlPoints = void 0;
  },
  afterUpdate: function afterUpdate3(cfg) {
    cfg.controlPoints = void 0;
  }
}, "cubic");
var singleCombo = {
  itemType: "combo",
  shapeType: "single-combo",
  labelPosition: "top",
  refX: Global.comboLabel.refX,
  refY: Global.comboLabel.refY,
  options: {
    style: {
      stroke: Global.defaultCombo.style.stroke,
      fill: Global.defaultCombo.style.fill,
      lineWidth: Global.defaultCombo.style.lineWidth
    },
    labelCfg: {
      style: {
        fill: Global.comboLabel.style.fill,
        fontSize: Global.comboLabel.style.fontSize,
        fontFamily: Global.windowFontFamily
      }
    },
    stateStyles: __assign({}, Global.comboStateStyles)
  },
  getSize: function getSize2(cfg) {
    var size = clone$1(cfg.size || this.options.size || Global.defaultCombo.size);
    if (isArray$1(size) && size.length === 1) {
      size = [size[0], size[0]];
    }
    if (!isArray$1(size)) {
      size = [size, size];
    }
    return size;
  },
  getLabelStyleByPosition: function getLabelStyleByPosition4(cfg, labelCfg) {
    var labelPosition = labelCfg.position || this.labelPosition;
    var cfgStyle = cfg.style;
    var padding = cfg.padding || this.options.padding;
    if (isArray$1(padding))
      padding = padding[0];
    var refX = labelCfg.refX, refY = labelCfg.refY;
    if (isNil(refX)) {
      refX = this.refX;
    }
    if (isNil(refY)) {
      refY = this.refY;
    }
    var size = this.getSize(cfg);
    var r = Math.max(cfgStyle.r, size[0] / 2) || size[0] / 2;
    var dis = r + padding;
    var style;
    switch (labelPosition) {
      case "top":
        style = {
          x: 0,
          y: -dis - refY,
          textBaseline: "bottom",
          textAlign: "center"
        };
        break;
      case "bottom":
        style = {
          x: 0,
          y: dis + refY,
          textBaseline: "bottom",
          textAlign: "center"
        };
        break;
      case "left":
        style = {
          x: -dis + refX,
          y: 0,
          textAlign: "left"
        };
        break;
      case "center":
        style = {
          x: 0,
          y: 0,
          text: cfg.label,
          textAlign: "center"
        };
        break;
      default:
        style = {
          x: dis + refX,
          y: 0,
          textAlign: "right"
        };
        break;
    }
    style.text = cfg.label;
    return style;
  },
  drawShape: function drawShape5(cfg, group) {
    var shapeType = this.shapeType;
    var style = this.getShapeStyle(cfg);
    var shape = group.addShape(shapeType, {
      attrs: style,
      draggable: true,
      name: "combo-shape"
    });
    return shape;
  },
  updateShape: function updateShape2(cfg, item, keyShapeStyle) {
    var keyShape = item.get("keyShape");
    var animate = cfg.animate === void 0 ? this.options.animate : cfg.animate;
    if (animate && keyShape.animate) {
      keyShape.animate(keyShapeStyle, {
        duration: 200,
        easing: "easeLinear"
      });
    } else {
      keyShape.attr(__assign({}, keyShapeStyle));
    }
    this.updateLabel(cfg, item);
  }
};
var singleComboDef = __assign(__assign({}, shapeBase), singleCombo);
Shape.registerCombo("single-combo", singleComboDef);
Shape.registerCombo("circle", {
  options: {
    size: [Global.defaultCombo.size[0], Global.defaultCombo.size[0]],
    padding: Global.defaultCombo.padding[0],
    animate: true,
    style: {
      stroke: Global.defaultCombo.style.stroke,
      fill: Global.defaultCombo.style.fill,
      lineWidth: Global.defaultCombo.style.lineWidth
    },
    labelCfg: {
      style: {
        fill: Global.comboLabel.style.fill,
        fontSize: Global.comboLabel.style.fontSize
      },
      refX: 0,
      refY: 0
    },
    stateStyles: __assign({}, Global.comboStateStyles)
  },
  shapeType: "circle",
  labelPosition: "top",
  drawShape: function drawShape6(cfg, group) {
    var style = this.getShapeStyle(cfg);
    delete style.height;
    delete style.width;
    var keyShape = group.addShape("circle", {
      attrs: style,
      className: "circle-combo",
      name: "circle-combo",
      draggable: true
    });
    return keyShape;
  },
  getShapeStyle: function getShapeStyle3(cfg) {
    var defaultStyle = this.options.style;
    var padding = cfg.padding || this.options.padding;
    if (isArray$1(padding))
      padding = padding[0];
    var strokeStyle = {
      stroke: cfg.color
    };
    var style = mix({}, defaultStyle, strokeStyle, cfg.style);
    var r;
    if (cfg.fixSize) {
      r = isNumber(cfg.fixSize) ? cfg.fixSize : cfg.fixSize[0];
    } else {
      var size = this.getSize(cfg);
      if (!isNumber(style.r) || isNaN(style.r))
        r = size[0] / 2 || Global.defaultCombo.style.r;
      else
        r = Math.max(style.r, size[0] / 2) || size[0] / 2;
    }
    style.r = r + padding;
    var styles = __assign({
      x: 0,
      y: 0
    }, style);
    if (cfg.style)
      cfg.style.r = r;
    else {
      cfg.style = {
        r
      };
    }
    return styles;
  },
  update: function update2(cfg, item) {
    var size = this.getSize(cfg);
    var padding = cfg.padding || this.options.padding;
    if (isArray$1(padding))
      padding = padding[0];
    var cfgStyle = clone$1(cfg.style);
    var r;
    if (cfg.fixSize) {
      r = isNumber(cfg.fixSize) ? cfg.fixSize : cfg.fixSize[0];
    } else {
      r = Math.max(cfgStyle.r, size[0] / 2) || size[0] / 2;
    }
    cfgStyle.r = r + padding;
    var itemCacheSize = item.get("sizeCache");
    if (itemCacheSize) {
      itemCacheSize.r = cfgStyle.r;
    }
    var strokeStyle = {
      stroke: cfg.color
    };
    var keyShape = item.get("keyShape");
    var style = mix({}, keyShape.attr(), strokeStyle, cfgStyle);
    if (cfg.style)
      cfg.style.r = r;
    else {
      cfg.style = {
        r
      };
    }
    this.updateShape(cfg, item, style, true);
  }
}, "single-combo");
Shape.registerCombo("rect", {
  options: {
    size: [40, 5],
    padding: [25, 20, 15, 20],
    animate: true,
    style: {
      radius: 0,
      stroke: Global.defaultCombo.style.stroke,
      fill: Global.defaultCombo.style.fill,
      lineWidth: Global.defaultCombo.style.lineWidth
    },
    labelCfg: {
      style: {
        fill: Global.comboLabel.style.fill,
        fontSize: Global.comboLabel.style.fontSize,
        fontFamily: Global.windowFontFamily
      }
    },
    anchorPoints: [[0, 0.5], [1, 0.5]],
    stateStyles: __assign({}, Global.comboStateStyles)
  },
  shapeType: "rect",
  labelPosition: "top",
  drawShape: function drawShape7(cfg, group) {
    var style = this.getShapeStyle(cfg);
    var keyShape = group.addShape("rect", {
      attrs: style,
      className: "rect-combo",
      name: "rect-combo",
      draggable: true
    });
    return keyShape;
  },
  getLabelStyleByPosition: function getLabelStyleByPosition5(cfg, labelCfg) {
    var labelPosition = labelCfg.position || this.labelPosition;
    var cfgStyle = cfg.style;
    var padding = cfg.padding || this.options.padding;
    if (isNumber(padding))
      padding = [padding, padding, padding, padding];
    var refX = labelCfg.refX, refY = labelCfg.refY;
    if (isNil(refX)) {
      refX = this.refX;
    }
    if (isNil(refY)) {
      refY = this.refY;
    }
    var leftDis = cfgStyle.width / 2 + padding[3];
    var topDis = cfgStyle.height / 2 + padding[0];
    var style;
    switch (labelPosition) {
      case "top":
        style = {
          x: 0 - leftDis + refX,
          y: 0 - topDis + refY,
          textBaseline: "top",
          textAlign: "left"
        };
        break;
      case "bottom":
        style = {
          x: 0,
          y: topDis + refY,
          textBaseline: "bottom",
          textAlign: "center"
        };
        break;
      case "left":
        style = {
          x: 0 - leftDis + refY,
          y: 0,
          textAlign: "left"
        };
        break;
      case "center":
        style = {
          x: 0,
          y: 0,
          text: cfg.label,
          textAlign: "center"
        };
        break;
      default:
        style = {
          x: leftDis + refX,
          y: 0,
          textAlign: "right"
        };
        break;
    }
    style.text = cfg.label;
    return style;
  },
  getShapeStyle: function getShapeStyle4(cfg) {
    var defaultStyle = this.options.style;
    var padding = cfg.padding || this.options.padding;
    if (isNumber(padding))
      padding = [padding, padding, padding, padding];
    var strokeStyle = {
      stroke: cfg.color
    };
    var style = mix({}, defaultStyle, strokeStyle, cfg.style);
    var size = this.getSize(cfg);
    var width;
    var height;
    var fixSize = cfg.collapsed && cfg.fixCollapseSize ? cfg.fixCollapseSize : cfg.fixSize;
    if (fixSize) {
      if (isNumber(fixSize)) {
        width = fixSize;
        height = fixSize;
      } else {
        width = fixSize[0];
        height = fixSize[1];
      }
    } else {
      if (!isNumber(style.width) || isNaN(style.width))
        width = size[0] || Global.defaultCombo.style.width;
      else
        width = Math.max(style.width, size[0]) || size[0];
      if (!isNumber(style.height) || isNaN(style.height))
        height = size[1] || Global.defaultCombo.style.height;
      else
        height = Math.max(style.height, size[1]) || size[1];
    }
    var x = -width / 2 - padding[3];
    var y = -height / 2 - padding[0];
    style.width = width + padding[1] + padding[3];
    style.height = height + padding[0] + padding[2];
    var styles = __assign({
      x,
      y
    }, style);
    if (!cfg.style) {
      cfg.style = {
        width,
        height
      };
    } else {
      cfg.style.width = width;
      cfg.style.height = height;
    }
    return styles;
  },
  update: function update3(cfg, item) {
    var size = this.getSize(cfg);
    var padding = cfg.padding || this.options.padding;
    if (isNumber(padding))
      padding = [padding, padding, padding, padding];
    var cfgStyle = clone$1(cfg.style);
    var width, height;
    var fixSize = cfg.collapsed && cfg.fixCollapseSize ? cfg.fixCollapseSize : cfg.fixSize;
    if (fixSize) {
      if (isNumber(fixSize)) {
        width = fixSize;
        height = fixSize;
      } else {
        width = fixSize[0];
        height = fixSize[1];
      }
    } else {
      width = Math.max(cfgStyle.width, size[0]) || size[0];
      height = Math.max(cfgStyle.height, size[1]) || size[1];
    }
    cfgStyle.width = width + padding[1] + padding[3];
    cfgStyle.height = height + padding[0] + padding[2];
    var itemCacheSize = item.get("sizeCache");
    if (itemCacheSize) {
      itemCacheSize.width = cfgStyle.width;
      itemCacheSize.height = cfgStyle.height;
    }
    cfgStyle.x = -width / 2 - padding[3];
    cfgStyle.y = -height / 2 - padding[0];
    var strokeStyle = {
      stroke: cfg.color
    };
    var keyShape = item.get("keyShape");
    var style = mix({}, keyShape.attr(), strokeStyle, cfgStyle);
    if (cfg.style) {
      cfg.style.width = width;
      cfg.style.height = height;
    } else {
      cfg.style = {
        width,
        height
      };
    }
    this.updateShape(cfg, item, style, false);
  },
  updateShape: function updateShape3(cfg, item, keyShapeStyle) {
    var keyShape = item.get("keyShape");
    var animate = cfg.animate === void 0 ? this.options.animate : cfg.animate;
    if (animate && keyShape.animate) {
      keyShape.animate(keyShapeStyle, {
        duration: 200,
        easing: "easeLinear"
      });
    } else {
      keyShape.attr(__assign({}, keyShapeStyle));
    }
    this.updateLabel(cfg, item);
  }
}, "single-combo");
Shape.registerNode("simple-circle", {
  options: {
    size: Global.defaultNode.size,
    style: {
      x: 0,
      y: 0,
      stroke: Global.defaultNode.style.stroke,
      fill: Global.defaultNode.style.fill,
      lineWidth: Global.defaultNode.style.lineWidth
    },
    labelCfg: {
      style: {
        fill: Global.nodeLabel.style.fill,
        fontSize: Global.nodeLabel.style.fontSize,
        fontFamily: Global.windowFontFamily
      }
    },
    stateStyles: __assign({}, Global.nodeStateStyles)
  },
  shapeType: "simple-circle",
  labelPosition: "center",
  shapeMap: {},
  drawShape: function drawShape8(cfg, group) {
    var style = this.getShapeStyle(cfg);
    var name = "".concat(this.type, "-keyShape");
    var keyShape = group.addShape("circle", {
      attrs: style,
      className: "".concat(this.type, "-keyShape"),
      name,
      draggable: true
    });
    group["shapeMap"][name] = keyShape;
    return keyShape;
  },
  getShapeStyle: function getShapeStyle5(cfg) {
    var defaultStyle = (this.mergeStyle || this.getOptions(cfg)).style;
    var strokeStyle = {
      stroke: cfg.color
    };
    var style = deepMix({}, defaultStyle, strokeStyle);
    var size = this.getSize(cfg);
    var r = size[0] / 2;
    var styles = __assign({
      x: 0,
      y: 0,
      r
    }, style);
    return styles;
  },
  update: function update4(cfg, item, updateType) {
    var size = this.getSize(cfg);
    var strokeStyle = {
      stroke: cfg.color,
      r: size[0] / 2
    };
    var keyShape = item.get("keyShape");
    var style = deepMix({}, keyShape.attr(), strokeStyle, cfg.style);
    this.updateShape(cfg, item, style, true, updateType);
  }
}, "single-node");
Shape.registerNode("simple-rect", {
  options: {
    size: [100, 30],
    style: {
      radius: 0,
      stroke: Global.defaultNode.style.stroke,
      fill: Global.defaultNode.style.fill,
      lineWidth: Global.defaultNode.style.lineWidth
    },
    labelCfg: {
      style: {
        fill: Global.nodeLabel.style.fill,
        fontSize: Global.nodeLabel.style.fontSize,
        fontFamily: Global.windowFontFamily
      }
    },
    anchorPoints: [[0, 0.5], [1, 0.5]],
    stateStyles: __assign({}, Global.nodeStateStyles)
  },
  shapeType: "simple-rect",
  labelPosition: "center",
  drawShape: function drawShape9(cfg, group) {
    var style = this.getShapeStyle(cfg);
    var keyShape = group.addShape("rect", {
      attrs: style,
      className: "".concat(this.type, "-keyShape"),
      name: "".concat(this.type, "-keyShape"),
      draggable: true
    });
    return keyShape;
  },
  getShapeStyle: function getShapeStyle6(cfg) {
    var defaultStyle = (this.mergeStyle || this.getOptions(cfg)).style;
    var strokeStyle = {
      stroke: cfg.color
    };
    var style = mix({}, defaultStyle, strokeStyle);
    var size = this.getSize(cfg);
    var width = style.width || size[0];
    var height = style.height || size[1];
    var styles = __assign({
      x: -width / 2,
      y: -height / 2,
      width,
      height
    }, style);
    return styles;
  },
  update: function update5(cfg, item, updateType) {
    item.getContainer();
    var defaultStyle = (this.mergeStyle || this.getOptions(cfg)).style;
    var size = this.getSize(cfg);
    var keyShape = item.get("keyShape");
    if (!cfg.size) {
      size[0] = keyShape.attr("width") || defaultStyle.width;
      size[1] = keyShape.attr("height") || defaultStyle.height;
    }
    var strokeStyle = {
      stroke: cfg.color,
      x: -size[0] / 2,
      y: -size[1] / 2,
      width: size[0],
      height: size[1]
    };
    var style = mix({}, defaultStyle, keyShape.attr(), strokeStyle);
    style = mix(style, cfg.style);
    this.updateShape(cfg, item, style, false, updateType);
  }
}, "single-node");
Shape.registerNode("image", {
  options: {
    img: "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ",
    size: 200,
    labelCfg: {
      style: {
        fontFamily: Global.windowFontFamily
      }
    },
    clipCfg: {
      show: false,
      type: "circle",
      r: 50,
      rx: 50,
      ry: 35,
      width: 50,
      height: 35,
      points: [[30, 12], [12, 30], [30, 48], [48, 30]],
      path: [["M", 25, 25], ["L", 50, 25], ["A", 12.5, 12.5, 0, 1, 1, 50, 50], ["A", 12.5, 12.5, 0, 1, 0, 50, 50], ["L", 25, 75], ["Z"]],
      x: 0,
      y: 0
    }
  },
  shapeType: "image",
  labelPosition: "bottom",
  drawShape: function drawShape10(cfg, group) {
    var shapeType = this.shapeType;
    var style = this.getShapeStyle(cfg);
    delete style.fill;
    var shape = group.addShape(shapeType, {
      attrs: style,
      className: "".concat(this.type, "-keyShape"),
      name: "".concat(this.type, "-keyShape"),
      draggable: true
    });
    this.drawClip(cfg, shape);
    return shape;
  },
  drawClip: function drawClip(cfg, shape) {
    var clip = (this.mergeStyle || this.getOptions(cfg)).clipCfg;
    if (!clip.show) {
      return;
    }
    var type = clip.type, x = clip.x, y = clip.y, style = clip.style;
    if (type === "circle") {
      var r = clip.r;
      shape.setClip({
        type: "circle",
        attrs: __assign({
          r,
          x,
          y
        }, style)
      });
    } else if (type === "rect") {
      var width = clip.width, height = clip.height;
      var rectX = x - width / 2;
      var rectY = y - height / 2;
      shape.setClip({
        type: "rect",
        attrs: __assign({
          x: rectX,
          y: rectY,
          width,
          height
        }, style)
      });
    } else if (type === "ellipse") {
      var rx = clip.rx, ry = clip.ry;
      shape.setClip({
        type: "ellipse",
        attrs: __assign({
          x,
          y,
          rx,
          ry
        }, style)
      });
    } else if (type === "polygon") {
      var points = clip.points;
      shape.setClip({
        type: "polygon",
        attrs: __assign({
          points
        }, style)
      });
    } else if (type === "path") {
      var path2 = clip.path;
      shape.setClip({
        type: "path",
        attrs: __assign({
          path: path2
        }, style)
      });
    }
  },
  getShapeStyle: function getShapeStyle7(cfg) {
    var _a = this.mergeStyle || this.getOptions(cfg), defaultStyle = _a.style, img = _a.img;
    var size = this.getSize(cfg);
    var width = size[0];
    var height = size[1];
    if (defaultStyle) {
      width = defaultStyle.width || size[0];
      height = defaultStyle.height || size[1];
    }
    var style = __assign({
      x: -width / 2,
      y: -height / 2,
      width,
      height,
      img
    }, defaultStyle);
    return style;
  },
  updateShapeStyle: function updateShapeStyle3(cfg, item) {
    var group = item.getContainer();
    var shapeClassName = "".concat(this.itemType, "-shape");
    var shape = group["shapeMap"][shapeClassName] || group.find(function(element) {
      return element.get("className") === shapeClassName;
    }) || item.getKeyShape();
    var shapeStyle = this.getShapeStyle(cfg);
    if (shape && !shape.destroyed) {
      shape.attr(shapeStyle);
    }
  }
}, "single-node");
var defaultSubjectColors = ["#5F95FF", "#61DDAA", "#65789B", "#F6BD16", "#7262FD", "#78D3F8", "#9661BC", "#F6903D", "#008685", "#F08BB4"];
var ColorUtil = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defaultSubjectColors
}, Symbol.toStringTag, { value: "Module" }));
var transform = transform$5;
__assign(__assign(__assign(__assign(__assign(__assign({}, BaseUtil), GraphicUtil), PathUtil), MathUtil), ColorUtil), {
  transform,
  mat3
});
var registerEdge = Shape.registerEdge;
const distance2 = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
const isBending = (p0, p1, p2) => !(p0.x === p1.x && p1.x === p2.x || p0.y === p1.y && p1.y === p2.y);
const getBorderRadiusPoints = (p0, p1, p2, r) => {
  const d0 = distance2(p0, p1);
  const d1 = distance2(p2, p1);
  if (d0 < r) {
    r = d0;
  }
  if (d1 < r) {
    r = d1;
  }
  const ps = {
    x: p1.x - r / d0 * (p1.x - p0.x),
    y: p1.y - r / d0 * (p1.y - p0.y)
  };
  const pt = {
    x: p1.x - r / d1 * (p1.x - p2.x),
    y: p1.y - r / d1 * (p1.y - p2.y)
  };
  return [ps, pt];
};
const getPathWithBorderRadiusByPolyline = (points, borderRadius) => {
  const pathSegments = [];
  const startPoint = points[0];
  pathSegments.push(`M${startPoint.x} ${startPoint.y}`);
  points.forEach((p, i) => {
    const p1 = points[i + 1];
    const p2 = points[i + 2];
    if (p1 && p2) {
      if (isBending(p, p1, p2)) {
        const [ps, pt] = getBorderRadiusPoints(p, p1, p2, borderRadius);
        pathSegments.push(`L${ps.x} ${ps.y}`);
        pathSegments.push(`Q${p1.x} ${p1.y} ${pt.x} ${pt.y}`);
        pathSegments.push(`L${pt.x} ${pt.y}`);
      } else {
        pathSegments.push(`L${p1.x} ${p1.y}`);
      }
    } else if (p1) {
      pathSegments.push(`L${p1.x} ${p1.y}`);
    }
  });
  return pathSegments.join("");
};
registerEdge("round-poly", {
  getPath: function getPath6(points, source, target, radius2, routeCfg) {
    return getPathWithBorderRadiusByPolyline(this.getPoints(points.shift(), points.pop(), source, target), radius2);
  },
  getControlPoints: (cfg) => {
    const { startPoint, endPoint, sourceNode, targetNode } = cfg;
    const isLeft = startPoint.x < endPoint.x;
    let start = startPoint, end = endPoint;
    if (isLeft && sourceNode) {
      start = sourceNode.get("anchorPointsCache")[0];
      end = targetNode.get("anchorPointsCache")[1];
    }
    const distance3 = Math.min(Math.abs(start.x - end.x) * 1 / 3, 30);
    const offsetX = isLeft ? distance3 : -distance3;
    return [
      {
        x: start.x + offsetX,
        y: start.y
      },
      {
        x: start.x + offsetX,
        y: end.y
      }
    ];
  },
  getPoints: (startPoint, endPoint, sourceNode, targetNode) => {
    const isLeft = startPoint.x < endPoint.x;
    let start = startPoint, end = endPoint;
    if (isLeft && sourceNode) {
      start = sourceNode.get("anchorPointsCache")[0];
      end = targetNode.get("anchorPointsCache")[1];
    }
    const distance3 = Math.min(Math.abs(start.x - end.x) * 1 / 3, 40);
    const offsetX = isLeft ? distance3 : -distance3;
    return [
      {
        x: start.x,
        y: start.y
      },
      {
        x: start.x + offsetX,
        y: start.y
      },
      {
        x: start.x + offsetX,
        y: end.y
      },
      {
        x: end.x,
        y: end.y
      }
    ];
  }
}, "polyline");
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
function buildStyle(obj) {
  let res = "";
  for (let key in obj) {
    res += `${key}:${obj[key]};`;
  }
  return res;
}
const diffX = -1;
const diffY = -1;
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
        nameLineHeight,
        fontWeight,
        beforeWidth
      }
    } = (_b = nodeData._cfg) == null ? void 0 : _b.model;
    const Tree2 = globalTree.value;
    let ratio = Tree2.getZoom();
    let { x, y } = Tree2.getClientByPoint(pointX, pointY);
    NodeInput.style.cssText = buildStyle({
      transform: `scale(${ratio})`,
      "transform-origin": "0 0",
      display: "block",
      position: "fixed",
      top: `${y + diffY}px`,
      left: `${beforeWidth + x + diffX}px`,
      width: `${width + stroke}px`,
      height: `${height + stroke}px`,
      "box-sizing": `border-box`,
      "font-size": `${fontSize}px`,
      "text-align": "left",
      "padding-top": `0`,
      "padding-left": `${paddingH - stroke}px`,
      "border-radius": `${radius}px`,
      zIndex: 1,
      overflow: `hidden`,
      resize: `none`,
      outline: `none`,
      "font-weight": fontWeight,
      color: FontColor,
      background: FillColor,
      border: `${stroke}px solid ${activeStrokeColor.value}`,
      "line-height": `${height - stroke}px`
    });
    NodeInput.value = placeholderText === name ? "" : name;
    document.body.style["--placeholderText"] = placeholderText;
    NodeInput.classList[name === placeholderText ? "add" : "remove"]("empty");
    NodeInput.placeholder = placeholderText;
  }
  changeStyle({ style: { width, stroke, height } }) {
    let NodeInput = this._input;
    NodeInput.style.width = `${width + stroke}px`;
    NodeInput.style.height = `${height + stroke}px`;
  }
  bindEvent() {
    if (!this._input)
      return;
    this._input.oninput = (ev) => {
      let input = ev.target;
      const value = input.innerText || input.value;
      if (value.length > 0) {
        input.classList.remove("empty");
      } else {
        input.classList.add("empty");
      }
      this.handleInput(value === "" ? placeholderText : value);
    };
    this._input.onblur = (ev) => {
      let input = ev.target;
      const value = input.innerText || input.value;
      this.handleInputBlur(value);
    };
    this._input.onkeydown = (ev) => {
      if (ev.key === "Enter" && !ev.shiftKey) {
        let input = ev.target;
        const value = input.innerText || input.value;
        this.handleInputBlur.call(this, value);
      }
    };
  }
  hideInput() {
    if (!this._input)
      return;
    this._input.style.display = "none";
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
    let text2 = this._input.lastChild;
    if (text2) {
      range.setStart(text2, 0);
      range.setEndAfter(text2);
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
  let tree = globalTree.value;
  if (!IMData$1.data)
    return;
  tree == null ? void 0 : tree.data(IMData$1.data);
  emitter.emit("onValueChange", IMData$1.data);
  if (stack) {
    History$1.push(IMData$1.data);
  }
  tree == null ? void 0 : tree.layout();
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
  emitter.emit("onAdd", data);
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
      update6(id, _name === "" ? oldName : _name);
    }
    EditInput$1.hideInput();
    let timer2 = setTimeout(() => {
      clearTimeout(timer2);
      setIsCurrentEdit(false);
    }, 100);
  };
};
const update6 = (id, name) => {
  IMData$1.update(id, typeof name === "string" ? { name } : name);
  selectNode(id, true);
  rePaint();
};
const selectNode = (id, selected, canAddChild = true) => {
  cancelAllSelect();
  if (canAddChild) {
    globalTree.value.setItemState(id, "selected", selected);
  }
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
G6.registerBehavior("default-view", {
  getEvents() {
    return {
      "node:click": "clickNode",
      "node:touchend": "clickNode",
      "node:mouseover": "hoverNode",
      "node:mouseleave": "clearHoverStatus"
    };
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
      if (Date.now() - this.lastClickTime < 500)
        return;
      this.lastClickTime = Date.now();
      selectNode(model.id, !model.isCurrentSelected, false);
    }
  },
  hoverNode(evt) {
    const { currentTarget: tree, item: node } = evt;
    if (isDragging.value)
      return;
    tree.setItemState(node, "hover", true);
    node.toFront();
    tree.paint();
  },
  clearHoverStatus(evt) {
    let { currentTarget: tree, item: node } = evt;
    tree.setItemState(node, "hover", false);
    tree.paint();
  }
});
G6.registerBehavior("edit-mindmap-pc", {
  selectNodeId: null,
  dragNodeId: null,
  nodePosition: {},
  dragStatus: "",
  upClientInfo: [],
  lastClickTime: 0,
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
      "canvas:touchend": "clickCanvas",
      "edge:click": "clickEdge"
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
      if (Date.now() - this.lastClickTime < 500)
        return;
      this.lastClickTime = Date.now();
      selectNode(model.id, !model.isCurrentSelected);
    }
  },
  clickEdge(evt) {
    const node = evt.item.get("sourceNode");
    const tree = evt.currentTarget;
    if (isDragging.value)
      return;
    tree.setItemState(node, "hover", true);
    node.toFront();
    tree.paint();
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
    const { currentTarget: tree, item: node } = evt;
    if (isDragging.value)
      return;
    tree.setItemState(node, "hover", true);
    node.toFront();
    tree.paint();
  },
  clearHoverStatus(evt) {
    let { currentTarget: tree, item: node } = evt;
    tree.setItemState(node, "hover", false);
    tree.paint();
  },
  dragStart(evt) {
    const { currentTarget: tree, item: node, clientX, clientY } = evt;
    const id = node.get("model").id;
    setIsDragging(true);
    this.dragNodeId = id;
    const _dragnode = tree.findById(this.dragNodeId);
    tree.setItemState(id, "hover", false);
    document.documentElement.style.cursor = "grabbing";
    tree.getNodes().forEach((node2) => {
      const nodeId = node2.get("id");
      const { x: pointX, y: pointY, width, height } = node2.getBBox();
      let { x: clientX2, y: clientY2 } = tree.getClientByPoint(pointX, pointY);
      let model = node2.get("model");
      const ratio2 = tree.getZoom();
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
        tree.updateItem(node2, {
          style: {
            opacity: 0.2
          }
        });
        node2.get("edges").forEach((edge) => {
          tree.updateItem(edge, {
            style: {
              opacity: 0.2
            }
          });
        });
      }
    });
    this.showDragDiv(clientX, clientY);
    let ratio = tree.getZoom();
    window.onmousemove = (ev) => this.dragNode.call(this, {
      tree,
      clientX: ev.clientX,
      clientY: ev.clientY,
      width: 40 * ratio / 2,
      height: 20 * ratio / 2
    });
    window.onmouseup = (ev) => this.dragEnd.call(this, {
      tree,
      clientX: ev.clientX,
      clientY: ev.clientY
    });
  },
  dragNode({ tree, clientX, clientY, width, height }) {
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
  dragEnd({ tree }) {
    if (!isDragging.value)
      return;
    setIsDragging(false);
    document.documentElement.style.cursor = "default";
    this.hideDragDiv();
    if (this.dragStatus !== "" && this.selectNodeId) {
      const parentNode = tree.findDataById(this.selectNodeId);
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
    tree.getNodes().forEach((node) => {
      node.get("id");
      tree.updateItem(node, {
        style: {
          opacity: 1
        }
      });
      node.get("edges").forEach((edge) => {
        tree.updateItem(edge, {
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
    const tree = globalTree.value;
    const { x, y } = tree.getPointByClient(clientX, clientY);
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
    const moveNode = tree.getNodes().filter((item) => item.get("id") === "moveNode");
    const moveEdge = tree.getEdges().filter((item) => item.get("id") === "moveNodeEdge");
    if (moveNode.length && moveEdge.length) {
      tree.updateItem(moveNode[0], model);
      tree.updateItem(moveEdge[0], edgeOption);
    } else {
      tree.addItem("node", model);
      tree.addItem("edge", edgeOption);
    }
    return { moveNode: moveNode[0] };
  },
  hideDragDiv() {
    const tree = globalTree.value;
    const moveNode = tree.getNodes().filter((item) => item.get("id") === "moveNode");
    if (moveNode.length) {
      tree.removeItem(moveNode[0]);
    }
  }
});
G6.registerBehavior("double-finger-drag-canvas", {
  getEvents: function getEvents2() {
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
  getEvents: function getEvents22() {
    return {
      keydown: "handleKeydown"
    };
  },
  handleKeydown(evt) {
    var _a, _b;
    if (((_a = document.activeElement) == null ? void 0 : _a.id) !== this.focusCanvasId || isCurrentEdit.value)
      return;
    const { key, shiftKey, ctrlKey, altKey, metaKey } = evt;
    let handler = ((_b = hotkeys.value) == null ? void 0 : _b.filter((item) => item.key === key)) || [];
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
    if (handler.length) {
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
    let timer2 = setTimeout(() => {
      if (this.readyToDrag) {
        this.dragStart(evt);
        clearTimeout(timer2);
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
    const { currentTarget: tree, item: node, clientX, clientY } = evt;
    const id = node.get("model").id;
    setIsDragging(true);
    this.dragNodeId = id;
    const _dragnode = tree.findById(this.dragNodeId);
    tree.getNodes().forEach((node2) => {
      const nodeId = node2.get("id");
      const { x: pointX, y: pointY, width, height } = node2.getBBox();
      let { x: clientX2, y: clientY2 } = tree.getClientByPoint(pointX, pointY);
      let model = node2.get("model");
      const ratio = tree.getZoom();
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
        tree.updateItem(node2, {
          style: {
            opacity: 0.2
          }
        });
        node2.get("edges").forEach((edge) => {
          tree.updateItem(edge, {
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
    const { currentTarget: tree, clientX, clientY } = evt;
    let ratio = tree.getZoom();
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
    const { currentTarget: tree } = evt;
    setIsDragging(false);
    document.documentElement.style.cursor = "default";
    this.hideDragDiv();
    if (this.dragStatus !== "" && this.selectNodeId) {
      const parentNode = tree.findDataById(this.selectNodeId);
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
    tree.getNodes().forEach((node) => {
      node.get("id");
      tree.updateItem(node, {
        style: {
          opacity: 1
        }
      });
      node.get("edges").forEach((edge) => {
        tree.updateItem(edge, {
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
    const tree = globalTree.value;
    const { x, y } = tree.getPointByClient(clientX, clientY);
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
    const moveNode = tree.getNodes().filter((item) => item.get("id") === "moveNode");
    const moveEdge = tree.getEdges().filter((item) => item.get("id") === "moveNodeEdge");
    if (moveNode.length && moveEdge.length) {
      tree.updateItem(moveNode[0], model);
      tree.updateItem(moveEdge[0], edgeOption);
    } else {
      tree.addItem("node", model);
      tree.addItem("edge", edgeOption);
    }
    return { moveNode: moveNode[0] };
  },
  hideDragDiv() {
    const tree = globalTree.value;
    const moveNode = tree.getNodes().filter((item) => item.get("id") === "moveNode");
    if (moveNode.length) {
      tree.removeItem(moveNode[0]);
    }
  }
});
const getCenterPointById = (id) => {
  const oC = document.getElementById(id);
  const { x, y, width, height } = oC.getBoundingClientRect();
  return {
    x: x + width / 2,
    y: y + height / 2
  };
};
class Tree {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
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
        lineType: (layoutConfig == null ? void 0 : layoutConfig.sharpCorner) ? "round-poly" : "cubic-horizontal",
        closeEditInput: closeEditInput2,
        controlMoveDirection: controlMoveDirection2,
        defaultAppendNode: defaultAppendNode2
      });
    }
    const config = {
      width: (_a = this.container) == null ? void 0 : _a.scrollWidth,
      height: (_c = (_b = this.container) == null ? void 0 : _b.scrollHeight) != null ? _c : 0 - 20,
      layout: {
        type: "mindmap",
        direction: "H",
        getHeight: (node) => {
          var _a2;
          return (_a2 = node.style) == null ? void 0 : _a2.height;
        },
        getWidth: (node) => {
          var _a2;
          return (_a2 = node.style) == null ? void 0 : _a2.width;
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
      defaultNode: {
        type: "mindmap-node"
      },
      defaultEdge: {
        type: (layoutConfig == null ? void 0 : layoutConfig.sharpCorner) ? "round-poly" : "cubic-horizontal",
        style: {
          lineWidth: branch.value,
          stroke: branchColor.value,
          radius: 8,
          lineAppendWidth: branch.value + ((layoutConfig == null ? void 0 : layoutConfig.yGap) || 10) / 2
        }
      },
      modes: {
        default: ["default-view", "double-finger-drag-canvas", "drag-canvas"],
        edit: [isMobile() ? "edit-mindmap-mobile" : "edit-mindmap-pc", "my-shortcut", "double-finger-drag-canvas", "drag-canvas"],
        connect: ["double-finger-drag-canvas", "drag-canvas"]
      },
      groupByTypes: false
    };
    return config;
  }
  async init(layoutConfig) {
    if (!this.container)
      return;
    const config = this.createLayoutConfig(layoutConfig);
    this.config = layoutConfig;
    const tree = new G6.TreeGraph(__spreadProps(__spreadValues({}, config), {
      container: this.container,
      animate: false,
      renderer: layoutConfig.renderer || "canvas"
    }));
    this.tree = tree;
    let global = window;
    global.mindTree = tree;
    global.mindTree.version = "3.0.0";
    setGlobalTree(tree);
    return tree;
  }
  render(_data) {
    if (!(_data == null ? void 0 : _data.length))
      return;
    const data = IMData$1.init(_data, true);
    this.tree.data(data);
    this.tree.layout(true);
    const { x, y } = getCenterPointById(this.container.id);
    this.tree.zoomTo(this.config.scaleRatio, { x, y });
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
        let timer2 = setTimeout(() => {
          var _a;
          (_a = EditInput$1._input) == null ? void 0 : _a.focus();
          clearTimeout(timer2);
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
const transferTree = (tree, func, depth = 0, parent = null) => {
  let node, list = [...tree];
  return list.map((item, index) => {
    node = func(item, index, depth, parent);
    const children = item.children.length ? item.children : item._children;
    if (children) {
      const _children = transferTree(children, func, depth + 1, node);
      if (_children && _children.length) {
        item.children.length ? node.children = _children : node._children = _children;
      }
    }
    return node;
  });
};
let treeInited = false;
const _sfc_main = {
  props: {
    modelValue: { required: true },
    xGap: { type: Number, default: 20 },
    yGap: { type: Number, default: 20 },
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
    defaultAppendNode: Boolean,
    createEdge: Boolean
  },
  data() {
    return {
      id: "mxs-mindmap_container",
      tree: void 0
    };
  },
  mounted() {
    this.treeInit();
    this.$props.onAdd && emitter.on("onAdd", this.$props.onAdd);
    this.$props.onExpand && emitter.on("onExpand", this.$props.onExpand);
    this.$props.onCollapse && emitter.on("onCollapse", this.$props.onCollapse);
    this.$props.onSelectedNode && emitter.on("onSelectedNode", this.$props.onSelectedNode);
    this.$props.onAfterEdit && emitter.on("onAfterEdit", this.$props.onAfterEdit);
    this.$props.onDragEnd && emitter.on("onDragEnd", this.$props.onDragEnd);
    this.$props.onCancelSelected && emitter.on("onCancelSelected", this.$props.onCancelSelected);
    this.$props.onEdit && emitter.on("onEdit", this.$props.onEdit);
    emitter.on("onValueChange", this.handleValueChange);
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
    emitter.off("onValueChange", this.handleValueChange);
    this.tree.destroy();
    this.tree = null;
  },
  methods: {
    handleValueChange(data) {
      let value = transferTree([...[data]], (node) => {
        var _a;
        const info = (_a = node == null ? void 0 : node.rawData) == null ? void 0 : _a.info;
        return info ? { title: node.fullName, info, collapse: node.collapse, children: node.children, _children: node._children } : __spreadProps(__spreadValues({}, node), { id: void 0, title: node.fullName });
      });
      this.$emit("update:modelValue", value);
    },
    treeInit() {
      if (treeInited)
        return;
      this.tree = new Tree("mxs-mindmap_container");
      this.tree.init(this.$props);
      this.tree.render(this.$props.modelValue);
      console.log(this.tree);
      this.inputInit();
      treeInited = true;
    },
    inputInit() {
      EditInput$1.init("node-input");
    },
    add: addData,
    update: update6,
    deleteNode,
    deleteOneNode,
    expand,
    collapse,
    addSibling,
    addParent,
    find: findData,
    editNode: edit,
    fitCenter() {
      const tree = this.tree.tree;
      const { x, y } = getCenterPointById("mxs-mindmap_container");
      tree.zoomTo(this.$props.scaleRatio, { x, y });
    },
    zoomOut() {
      const graph = this.tree.tree;
      const currentZoom = graph.getZoom();
      const ratioOut = 1 / (1 - 0.05 * 2);
      const maxZoom = graph.get("maxZoom");
      const { x, y } = getCenterPointById(this.id);
      if (ratioOut * currentZoom > maxZoom) {
        return;
      }
      graph.zoomTo(currentZoom * ratioOut, { x, y });
    },
    zoomIn() {
      const graph = this.tree.tree;
      const currentZoom = graph.getZoom();
      const ratioIn = 1 - 0.05 * 2;
      const minZoom = graph.get("minZoom");
      if (ratioIn * currentZoom < minZoom) {
        return;
      }
      const { x, y } = getCenterPointById(this.id);
      graph.zoomTo(currentZoom * ratioIn, { x, y });
    },
    InputFocus() {
      EditInput$1.toFocus();
    }
  },
  watch: {
    "$props.modelValue": {
      handler(val) {
        if (isArray(val) && !val.length)
          return;
        if (isObject(val) && !Object.keys(val).length)
          return;
        this.tree.render(val);
      },
      immediate: true
    },
    "$props.edit": {
      handler(val) {
        this.tree.changeEditMode(val);
      }
    },
    hotKey: {
      handler(val) {
        changehotKeyList(val == null ? void 0 : val.filter((i) => i.enabled == null || i.enabled === true).map((item) => {
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
const _hoisted_2 = /* @__PURE__ */ createElementVNode("input", {
  id: "node-input",
  type: "textarea",
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

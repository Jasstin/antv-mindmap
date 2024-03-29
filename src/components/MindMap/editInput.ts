import {
  paddingH,
  paddingV,
  placeholderText,
  globalTree,
  radius,
  activeStrokeColor,
} from "./variable";
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
  _input: HTMLInputElement | null = null;
  _id: string;

  init(id: string) {
    this._input = document.getElementById(id) as HTMLInputElement;
    this._id = id;
    this.bindEvent();
  }

  showInput(nodeData) {
    if (!this._input) {
      this.init(this._id);
      if (!this._input) return;
    }

    let NodeInput = this._input;
    const { x: pointX, y: pointY } = nodeData._cfg?.bboxCache;
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
      },
    } = nodeData._cfg?.model;
    const Tree = globalTree.value;
    let ratio = Tree.getZoom();
    let { x, y } = Tree.getClientByPoint(pointX, pointY);
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
      "line-height": `${height - stroke}px`,
    });
    // NodeInput.innerText = placeholderText === name ? "" : name;
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
    if (!this._input) return;
    this._input.oninput = (ev) => {
      let input = ev.target as HTMLInputElement;
      const value = input.innerText || input.value;
      if (value.length > 0) {
        input.classList.remove("empty");
      } else {
        input.classList.add("empty");
      }
      this.handleInput(
        value === "" ? placeholderText : value
      );
    };
    this._input.onblur = (ev) => {
      let input = ev.target as HTMLInputElement;
      const value = input.innerText || input.value;
      this.handleInputBlur(value);
    };
    this._input.onkeydown = (ev) => {
      if (ev.key === "Enter" && !ev.shiftKey) {
        let input = ev.target as HTMLInputElement;
        const value = input.innerText || input.value;
        this.handleInputBlur.call(this, value);
      }
    };
  }
  hideInput() {
    if (!this._input) return;
    this._input.style.display = "none";
    // document.getElementById("mxs-mindmap_container").focus(); // 隐藏输入框时让画布focus
  }
  handlefocus(name: string) {
    //    methods 将会重写，用来更新节点状态
  }

  handleInput(name: string) {}

  handleInputBlur(name: string) {
    //    methods 将会重写，用来更新节点数据
  }

  moveCursor(len) {
    let range = new Range();
    let selection = document.getSelection();
    if (!selection) return;
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
    // Todo: 支持设置光标位置
    if (!this._input) return;
    this._input.focus();
    // try {
    //   let timer = setTimeout(() => {
    //     this.moveCursor(this._input.innerText.length); // 光标在末尾
    //     clearTimeout(timer);
    //   }, 0);
    // } catch (e) {
    //   console.log(e);
    // }
  }
}

export default new EditInput();

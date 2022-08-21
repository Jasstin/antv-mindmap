import { fontColor_leaf, fontColor_root, fontColor_sub, maxFontCount, paddingH, paddingV, themeColor, themeColor_leaf, themeColor_sub, placeholderText } from "./variable";

class EditInput {
  _input: HTMLInputElement | null = null
  _fontSize: number = 0
  _height: number = 0
  _ratio: number = 1
  _lineHeight = 12
  _width = 0
  _id: string

  init(id: string) {
    this._input = document.getElementById(id) as HTMLInputElement
    this._id = id
    this.bindEvent()
  }

  showInput(x: number, y: number, width: number, height: number, name: string, fontSize: number, type: string, radius: number, ratio: number) {
    if (!this._input) {
      this.init(this._id)
      if (!this._input) return
    };
    let NodeInput = this._input;
    this._fontSize = fontSize
    this._height = height
    this._ratio = ratio;
    this._width = width + 4 * ratio;
    this._lineHeight = fontSize + paddingV * ratio * 2;
    NodeInput.style.display = 'block'
    NodeInput.style.position = 'fixed';
    NodeInput.style.top = y + 'px';
    NodeInput.style.left = x + 'px';
    NodeInput.style.width = width + 4 * ratio + 'px';
    NodeInput.style.height = height + 4 * ratio + 'px';
    NodeInput.style.border = `${2 * ratio}px solid`;
    NodeInput.style.boxSizing = 'border-box';
    NodeInput.innerText = placeholderText === name ? "" : name
    NodeInput.style.fontSize = fontSize + 'px'
    NodeInput.style.textAlign = 'left'
    NodeInput.style.paddingTop = paddingV / 2 * ratio + 'px'
    NodeInput.style.paddingLeft = paddingH * ratio + 'px'
    NodeInput.style.lineHeight = (fontSize + paddingV) * ratio + 'px'
    NodeInput.style.borderRadius = radius + 'px'
    NodeInput.style.zIndex = '1'
    NodeInput.style.overflow = 'hidden'
    NodeInput.style.resize = 'none'
    NodeInput.style.outline = 'none';
    NodeInput.style.fontWeight = "600";
    document.body.style['--placeholderText'] = placeholderText
    if (name === placeholderText) {
      NodeInput.classList.add("empty")
    }
    if (name === '') {
      NodeInput.style.width = '120px';
    }
    if (type === 'dice-mind-map-root') {
      NodeInput.style.color = fontColor_root.value
      NodeInput.style.background = themeColor.value
      NodeInput.style.borderColor = themeColor.value;
    } else if (type === 'dice-mind-map-sub') {
      NodeInput.style.color = fontColor_sub.value
      NodeInput.style.background = themeColor_sub.value
      NodeInput.style.borderColor = themeColor_sub.value;
    } else if (type === 'dice-mind-map-leaf') {
      NodeInput.style.color = fontColor_leaf.value
      NodeInput.style.background = themeColor_leaf.value
      NodeInput.style.borderColor = themeColor.value;
    }
    let timer = setTimeout(() => {
      NodeInput.focus()
      clearTimeout(timer)
    }, 100)
  }

  changeLength(ev: Event) {
    let input = ev.target as HTMLInputElement
    let row = input.innerText.split('\n').sort((a, b) => b.length - a.length);
    let lineWidth = row[0].replace(/[^\x00-\xff]/g, "00").length;
    if (lineWidth > 30) lineWidth = 30;
    let width = lineWidth * this._fontSize / 2 + paddingH * 2;
    width = width + 4 * this._ratio;
    input.style.width = `${Math.max(width, this._width)}px`
    input.style.height = `${Math.max(input.scrollHeight, this._height + 5)}px`
    if (input.innerText.length > 0) {
      input.classList.remove("empty")
    } else {
      input.classList.add("empty")
    }
  }

  bindEvent() {
    if (!this._input) return
    this._input.addEventListener('input', this.changeLength.bind(this))
    this._input.addEventListener('blur', () => {
      this.handleInputBlur(this._input.innerText)
    })
    this._input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' && !ev.shiftKey) {
        let input = ev.target as HTMLInputElement
        this.handleInputBlur.call(this, input.innerText)
      }
    })
  }

  hideInput() {
    this._input.style.display = 'none'
  }

  handleInputBlur(name: string) {
    //    methods 将会重写，用来更新节点数据
  }
}

export default new EditInput()

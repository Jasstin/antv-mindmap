import {fontColor_root, fontColor_sub, maxFontCount, paddingH, paddingV, themeColor, themeColor_sub} from "./variable";

class EditInput {
    _input: HTMLInputElement | null = null
    _fontSize: number = 0
    _height: number = 0

    init(id: string) {
        this._input = document.getElementById(id) as HTMLInputElement
        this.bindEvent()
    }

    showInput(x: number, y: number, width: number, height: number, name: string, fontSize: number, type: string, radius: number, ratio: number) {
        let NodeInput = this._input;
        if (!NodeInput) return;
        this._fontSize = fontSize
        this._height = height
        NodeInput.style.display = 'block'
        NodeInput.style.position = 'fixed';
        NodeInput.style.top = y + 'px';
        NodeInput.style.left = x + 'px';
        NodeInput.style.width = width + 'px';
        NodeInput.style.height = height + 'px';
        NodeInput.style.border = 'none';
        NodeInput.style.boxSizing = 'border-box';
        NodeInput.value = name
        NodeInput.style.fontSize = fontSize + 'px'
        NodeInput.style.textAlign = 'left'
        NodeInput.style.paddingTop = paddingV / 2 * ratio + 'px'
        NodeInput.style.paddingLeft = paddingH / 2 * ratio + 'px'
        NodeInput.style.lineHeight = fontSize + paddingV * ratio + 'px'
        NodeInput.style.borderRadius = radius + 'px'
        NodeInput.style.zIndex = '1'
        NodeInput.style.resize = 'none'
        NodeInput.placeholder = '请输入内容'
        if (name === '') {
            NodeInput.style.width = '120px';
        }
        if (type === 'dice-mind-map-root') {
            NodeInput.style.color = fontColor_root.value
            NodeInput.style.background = themeColor.value
        } else if (type === 'dice-mind-map-sub') {
            NodeInput.style.color = fontColor_sub.value
            NodeInput.style.background = themeColor_sub.value
        } else if (type === 'dice-mind-map-leaf') {
            NodeInput.style.color = fontColor_sub.value
            NodeInput.style.background = '#fff'
            NodeInput.style.borderRadius = '0px'
            NodeInput.style.borderBottom = `1px solid ${themeColor.value}`
        }
        NodeInput.focus()
    }

    changeLength(ev: Event) {
        let input = ev.target as HTMLInputElement
        let width = input.value.replace(/[^\x00-\xff]/g, "00").length * this._fontSize / 2 + paddingH * 2;
        const size = this._fontSize * maxFontCount + paddingH * 2; // 节点最多显示12个字
        if (width > size) width = size + paddingH * 3
        input.style.height = '0px'
        input.style.width = `${Math.max(width, 120)}px`
        input.style.height = Math.max(input.scrollHeight, this._height) + 'px'
    }

    bindEvent() {
        if (!this._input) return
        this._input.addEventListener('input', this.changeLength.bind(this))
        this._input.addEventListener('blur', this.handleSave.bind(this))
        this._input.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter') {
                this.handleSave.call(this, ev)
            }
        })
    }

    handleSave(ev: Event) {
        let input = ev.target as HTMLInputElement
        if (typeof this.handleInputBlur === 'function') {
            this.handleInputBlur(input.value)
        }
        input.style.display = 'none'
    }

    handleInputBlur(name: string) {
        //    methods 将会重写，用来更新节点数据
    }
}

export default new EditInput()

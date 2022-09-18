<template>
  <div class="container">
    <div class="left-top">
      <a href="https://github.com/hellowuxin/vue3-mindmap" target="_blank">GitHub</a>
    </div>
    <div class="right-top"><span>Props</span></div>
    <mindmap ref="mindMapRef" class="left-bottom" v-model="data" :branch="themeList['branch'].value"
      :branchColor="themeList['branchColor'].value" :xGap="themeList['xGap'].value" :yGap="themeList['yGap'].value"
      :themeColor="themeList['themeColor'].value" :rootFontColor="themeList['rootFontColor'].value"
      :subThemeColor="themeList['subThemeColor'].value" :subFontColor="themeList['subFontColor'].value"
      :leafThemeColor="themeList['leafThemeColor'].value" :leafFontColor="themeList['leafFontColor'].value"
      :sharp-corner="themeList['sharp-corner'].value" :scale-ratio="themeList['scale-ratio'].value"
      :tooltip="featureList['tooltip'].value" :edit="featureList['edit'].value" :drag="featureList['drag'].value"
      :zoom="featureList['zoom'].value" :centerBtn="featureList['centerBtn'].value"
      :fitBtn="featureList['fitBtn'].value" :downloadBtn="featureList['downloadBtn'].value"
      :timetravel="featureList['timetravel'].value" :mindmap="featureList['mindmap'].value"
      :watchResize="featureList['watchResize'].value" :nodeMenu="nodeMenuList" :hotKey="hostKeyList"
      :onDragEnd="onDragEnd">
    </mindmap>
    <div class="right-bottom">
      <div style="font-weight: bold;font-size: 16px">样式设置</div>
      <div v-for="(item, key) in themeList" :key="key">
        <label :for="key.toString()" style="width:130px" :title="item.desc">{{ key }}</label>
        <input type="range" :name="key" v-model.number="item.value" :min="item.min" :max="item.max" :step="item.step"
          v-if="item.type === 'range'" disabled>
        <input :type="item.type" :name="key.toString()" v-model="item.value" disabled v-else>
        <span class="value">{{ item.value }}</span>
      </div>
      <div style="font-weight: bold;font-size: 16px">功能设置</div>
      <div v-for="(item, key) in featureList" :key="key">
        <label :for="key.toString()" style="width:130px" :title="item.desc">{{ key }}</label>
        <input type="range" :name="key" v-model.number="item.value" :min="item.min" :max="item.max" :step="item.step"
          v-if="item.type === 'range'" :disabled="item.disabled">
        <input :type="item.type" :name="key.toString()" v-model="item.value" :disabled="item.disabled" v-else>
        <span class="value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import learn from './test.json'
import { defineComponent, reactive, ref } from 'vue'
import Mindmap from "./components/MindMap"
// import "../dist/style.css"
type input = { [key: string]: { type: string, value: boolean | string | number, desc?: string, min?: number, max?: number, step?: number, disabled?: boolean } }

export default defineComponent({
  name: 'App',
  components: {
    Mindmap
  },
  setup(props, context) {
    const themeList = reactive<input>({
      'branch': { type: 'range', value: 1, desc: '线条宽度', min: 1, max: 6, step: 1 },
      'branchColor': { type: 'color', value: '#ff0f00', desc: '线条颜色' },
      'xGap': { type: 'range', value: 10, desc: '节点横向间距', min: 10, max: 100, step: 1 },
      'yGap': { type: 'range', value: 10, desc: '节点纵向间距', min: 10, max: 100, step: 1 },
      'themeColor': { type: 'color', value: '#ff4444', desc: '根节点背景色' },
      'rootFontColor': { type: 'color', value: '#f5f5f5', desc: '根节点文字颜色' },
      'subThemeColor': { type: 'color', value: '#000000', desc: '二级节点背景色' },
      'subFontColor': { type: 'color', value: '#ffffff', desc: '二级节点文字颜色' },
      'leafThemeColor': { type: 'color', value: '#48ff38', desc: '二级以下节点背景色' },
      'leafFontColor': { type: 'color', value: '#9b9b9b', desc: '二级以下节点文字颜色' },
      'sharp-corner': { type: 'checkbox', value: true, desc: '直线链接' },
      'scale-ratio': { type: 'range', value: 1, desc: '初始化缩放比例', min: 0, max: 10, step: 0.1 }
    })
    const featureList = reactive<input>({
      'tooltip': { type: 'checkbox', value: false, desc: '显示tooltip更多内容' },
      'edit': { type: 'checkbox', value: true, desc: '可以对节点进行增删改查操作', disabled: true },
      'drag': { type: 'checkbox', value: true, desc: '可以对画布进行拖拽' },
      'zoom': { type: 'checkbox', value: true, desc: '可以对画布进行缩放' },
      'centerBtn': { type: 'checkbox', value: true, desc: '把脑图对准画布中心' },
      'fitBtn': { type: 'checkbox', value: true, desc: '缩放脑图到合适大小' },
      'downloadBtn': { type: 'checkbox', value: true, desc: '下载脑图' },
      'timetravel': { type: 'checkbox', value: true, desc: 'redo/undo' },
      'mindmap': { type: 'checkbox', value: true, desc: '脑图缩略图', disabled: true },
      'watchResize': { type: 'checkbox', value: true, desc: '监听屏幕变化时重置脑图大小', disabled: true },
    })
    const data = ref({})
    const nodeMenuList = [
      ['add-sibling', 'add', 'add-parent'],
      ['edit', 'delete', 'collapse', 'expand'],
      ['only-show-current', 'show-parent'],
      [{
        title: '查看节点详情',
        name: 'see-detail',
        click: (node, graph) => {
          console.log('查看节点详情', node, graph);
        }
      }]
    ]
    const hostKeyList = ['add-sibling', 'add', 'add-parent', {
      name: 'copy',
      enabled: true
    }, 'cut', 'paste', 'create-a-copy', 'revert', 'redo', 'delete', 'edit']
    const $mindmap = ref('mindMapRef');
    return {
      data,
      nodeMenuList,
      featureList,
      themeList,
      hostKeyList
    }
  },
  mounted() {
    console.log(this.$refs.mindMapRef)
    let timer = setTimeout(() => {
      this.data = learn;
      clearTimeout(timer)
    });
  },
  methods: {
    onDragEnd() {
      console.log('onDragEnd', arguments)
    }
  }
})
</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  outline: none;
  overflow: hidden;
  user-select: none;
}

.container {
  width: 100%;
  height: calc(100vh - 16px);
  border-radius: 4px;
  border: thin solid rgba(0, 0, 0, .12);
  overflow: hidden;
  background-color: #fff;
  display: grid;
  grid-template-columns: 75% 1px 25%;
  grid-template-rows: 48px 1px auto;
}

.right-top {
  grid-column: 3 / 4;
}

.left-bottom {
  grid-row: 3 / 4;
}

.right-bottom {
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  background-color: white;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: scroll;
  border-left: 1px solid #eee;
  z-index: 1;

  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}

.left-top,
.right-top {
  background-color: #eee;
  padding: 0 12px;
  display: flex;
  align-items: center;
}

label {
  font-size: 14px;
}

.value {
  font-size: 12px;
  color: #666
}

input[type='checkbox'] {
  cursor: pointer;
}

input:disabled {
  cursor: not-allowed;
}
</style>

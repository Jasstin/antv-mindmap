import G6 from "@antv/g6";
import { centerBtn, fitBtn, downloadBtn, scaleRatio, nodeMenuList, setCurrentNode } from "./variable";
import {
  addData,
  addParent,
  addSibling,
  edit,
  deleteNode,
  collapse,
  expand,
  onlyShowCurrent,
  backParent
} from "./tree/methods"
import { INode } from "@antv/g6-core/lib/interface/item";
import hotkeys from "./tree/hotkeys";

const nodeMenuMap = {
  add: {
    name: 'add',
    title: '添加子节点',
    click: (node: INode) => {
      addData(node?._cfg?.model?.id as string, '')
    }
  },
  'add-parent': {
    name: 'add-parent',
    title: '添加父级节点',
    click: (node: INode) => {
      addParent(node?._cfg?.model?.id as string, '')
    }
  },
  'add-sibling': {
    name: 'add-sibling',
    title: '添加兄弟节点',
    click: (node: INode) => {
      addSibling(node?._cfg?.model?.id as string, '')
    }
  },
  'edit': {
    name: 'edit',
    title: '编辑当前节点',
    click: (node: INode) => {
      edit(node?._cfg?.model?.id as string)
    }
  },
  'delete': {
    name: 'delete',
    title: '删除当前节点',
    click: (node: INode) => {
      deleteNode(node?._cfg?.model?.id as string)
    }
  },
  'collapse': {
    name: 'collapse',
    title: '收起当前节点',
    click: (node: INode) => {
      collapse(node?._cfg?.model?.id as string)
    }
  },
  'expand': {
    name: 'expand',
    title: '展开当前节点',
    click: (node: INode) => {
      expand(node?._cfg?.model?.id as string)
    }
  },
  'only-show-current': {
    name: 'only-show-current',
    title: '进入当前节点',
    click: (node: INode) => {
      onlyShowCurrent(node?._cfg?.model?.id as string)
    }
  },
  'back-parent': {
    name: 'back-parent',
    title: '返回上一级节点',
    click: (node: INode) => {
      backParent(node?._cfg?.model?.id as string)
    }
  }
}
const nodeMenuClickList = {}
const contextMenu = new G6.Menu({
  getContent(evt) {
    if (!evt) return `div`;
    const isCanvasTarget = evt.target && evt.target.isCanvas && evt.target.isCanvas()
    return isCanvasTarget ? renderCanvasMenu(evt) : renderNodeMenu(evt);
  },
  handleMenuClick: (target, item, graph) => {
    handleMenuClick(target, item, graph)
  },
  // offsetX and offsetY include the padding of the parent container
  // 需要加上父级容器的 padding-left 16 与自身偏移量 10
  offsetX: 10,
  // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
  offsetY: -100,
  // the types of items that allow the menu show up
  // 在哪些类型的元素上响应
  itemTypes: ['node', 'canvas'],
});

function renderCanvasMenu(evt) {
  return `<ul>
               <li code="enlarge">放大</li>
               <li code="ensmall">缩小</li>
              ${fitBtn.value ? `<li code="fit">缩放到合适大小</li>` : ``} 
               ${centerBtn.value ? `<li code="center">缩放到屏幕中间</li>` : ``}
               ${downloadBtn.value ? `<li code="download">下载</li>` : ``}
           </ul>`
}

function renderNodeMenu(evt: any) {
  const nodeData = evt.item._cfg.model;
  let menuList = nodeMenuList.value
  let { depth, collapse, isSubView, children } = nodeData
  let str = menuList.map(group => {
    return `<ul class="group">
            ${group.map(item => {
      if (typeof item === 'string') {
        // 内部配置
        let itemInfo = nodeMenuMap[item];
        if (!itemInfo) return '';
        if (depth === 0 && ['add-parent', 'add-sibling', 'delete'].indexOf(item) != -1) return ''
        if (item === 'collapse' && (collapse || children.length === 0)) return ''
        if (!collapse && item === 'expand') return ''
        if (!isSubView && depth === 0 && item === 'only-show-current') return ''
        if (isSubView && depth === 0 && item === 'only-show-current') itemInfo = nodeMenuMap['back-parent']
        nodeMenuClickList[itemInfo.name] = itemInfo.click;
        let hotkey = hotkeys.filter(item => item.name === itemInfo.name)[0]
        if (hotkey) {
          return `<li code="Node" name="${itemInfo.name}"><div code="Node" name="${itemInfo.name}">${itemInfo.title}</div><div class="small-tip" code="Node" name="${itemInfo.name}">${hotkey.control ? `${hotkey.control}+` : ''}${hotkey.key}</div></li>`
        } else {
          return `<li code="Node" name="${itemInfo.name}">${itemInfo.title}</li>`
        }
      } else if (typeof item === 'object' && item.title) {
        // 外部配置
        nodeMenuClickList[item.name] = item.click;
        return `<li code="Node" name="${item.name}">${item.title}</li>`
      } else {
        return ''
      }
    }).join('')}
        </ul>`
  }).join('')
  return str
}

function handleMenuClick(target, item, graph) {
  if (target.getAttribute('code') === 'enlarge') {
    graph.zoom(1.2, { x: graph.getWidth() / 2, y: graph.getHeight() / 2 });
  } else if (target.getAttribute('code') === 'ensmall') {
    graph.zoom(0.8, { x: graph.getWidth() / 2, y: graph.getHeight() / 2 });
  } else if (target.getAttribute('code') === 'fit') {
    graph.layout(true)
  } else if (target.getAttribute('code') === 'center') {
    graph.fitCenter()
    graph.zoomTo(scaleRatio.value, {
      x: graph.getWidth() / 2,
      y: graph.getHeight() / 2
    })
  } else if (target.getAttribute('code') === 'download') {
    graph.downloadFullImage('mindmap_' + Date.now(), 'image/jpeg', {
      backgroundColor: '#ddd',
      padding: [30, 15, 15, 15],
    });
  } else if (target.getAttribute('code') === 'Node') {
    let name = target.getAttribute('name');
    if (name) {
      nodeMenuClickList[name](item.get('model'), item, graph)
    }
  }
}

export default contextMenu

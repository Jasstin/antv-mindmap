# mxs-mindmap

live demo: https://jasstin.github.io/antv-mindmap/

```markdown
1. 组件使用方法可参考docs文件
2. 组件会在window对象注入mindTree,因此可以在业务层做任意antv行为的修改
```

## PROPS

属性设置可参考https://jasstin.github.io/antv-mindmap/,暂时只支持初始配置，后续会看情况开发在线修改配置的功能

## Data

| Name         | Type              | Description          |
| ---          | ---               | ---                  |
| name         | string            | 节点名称               |
| collapse     | boolean           | 是否折叠               |
| children     | Node[]            | 节点数组               |

## NodeMenu

具体右键菜单配置可参考https://jasstin.github.io/antv-mindmap/

| Name         | Type              | Description          |
| ---          | ---               | ---                  |
| name         | string            | 英文名称               |
| title        | string            | 显示节点名称               |
| click        |（currentNode)=>void | 点击回调               |

## 钩子方法

| 钩子             | 触发时机  | 说明                      |
|----------------|-------|-------------------------|
| onAdd          | 新建节点时 | 新增节点数据                  |
| onExpand       | 点击展开时 | 展开节点的数据                 |
| onCollapse     | 点击收起时 | 收起节点的数据                 |
| onSelectedNode | 选中节点时 | null(老版本占位符),选中节点数据                  |
| onAfterEdit    | 完成编辑时 | 用户输入的文本内容               |
| onDragEnd      | 拖拽结束时 | 被拖拽节点、即将被放入的父级、即将被放入的位置 |

## 组件方法

```ts
// 新增子节点
export const add = (id: string, name: string | Data) => IsMdata;
// 修改节点数据
export const update = (id, data: Data) => IsMdata;
// 删除节点及子集
export const deleteNode = (id: string) => void;
// 删除节点并将节点子节点复制到当前父节点
export const deleteOneNode = (id: string) => void;
// 展开节点
export const expand = (id: string) => void;
// 收起节点
export const collapse = (id: string) => void;
// 添加兄弟节点
export const addSibling = (id: string, name: string, before = false) => IsMdata
// 添加父节点
export const addParent = (id: string, name: string) => IsMdata
// 根据id查找到对应的节点数据
export const find = (id: string) => IsMdata
```

## Example

```html

<template>
    <mindmap v-model="data" ref="mindMapRef"></mindmap>
</template>

<script>
    import mindmap from 'mxs-mindmap'
    import 'mxs-mindmap/dist/style.css'

    export default defineComponent({
        components: {mindmap},
        setup()
    =>
    {
        const data = [{
            "name": "如何学习D3",
            "children": [
                {
                    "name": "预备知识",
                    "children": [
                        {"name": "HTML & CSS"},
                        {"name": "JavaScript"},
                        ...
                    ]
                },
                {
                    "name": "安装",
                    "collapse": true,
                    "children": [{"name": "折叠节点"}]
                },
                {"name": "进阶", "left": true},
                ...
            ]
        }]

        return {data}
    }
    })
</script>
```

## 注意

- 当xGap小于一定数值，父节点的trigger由于添加按钮的存在可能遮挡住子节点的trigger，无法响应子节点的点击

## Todo

- mindmap主题
    - 节点样式
        - 节点样式支持配置字体颜色
        - 节点样式支持配置图片
        - 节点支持添加描述
        - 数据支持配置字体颜色


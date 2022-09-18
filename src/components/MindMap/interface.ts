export interface NodeData {
  name: string, // 节点名称
  id: string, // 节点Id 根节点id '0'
  type: string, // 节点类型
  parentId: string, // 父级节点id
  children: NodeData[] // 子节点
  _children: NodeData[] // 折叠的子节点
  collapse: boolean // 是否折叠
  fullName: string // 未截取的完整标题
  isSubView: boolean // 是否为当前主要显示内容，用于切换到子节点视图
  style: {
    width: number // 节点宽度
    height: number // 节点高度
  }
  desc?: string // 可配置的描述字段
  content?: string //可配置的内容字段
  destroyed?: boolean // 是否被废弃
  rawData?: any  // 业务层记录数据
  [key: string]: any
}

export interface InputData {
  name?: string,
  desc?: string // 可配置的描述字段
  content?: string //可配置的内容字段
  children?: InputData[]
  isSubView?: boolean // 是否为主视图
  [key: string]: any
}

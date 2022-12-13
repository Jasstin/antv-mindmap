export interface InputData {
  name?: string;
  desc?: string; // 可配置的描述字段
  content?: string; //可配置的内容字段
  children?: InputData[];
  isSubView?: boolean; // 是否为主视图
  [key: string]: any;
}

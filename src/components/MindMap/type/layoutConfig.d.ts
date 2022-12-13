export interface layoutConfig {
  xGap?: number;
  yGap?: number;
  direction?: string;
  sharpCorner?: boolean; // 直角边框
  branch?: number;
  branchColor?: string;
  themeColor?: string;
  rootFontColor?: string;
  subThemeColor?: string;
  subFontColor?: string;
  scaleExtent?: string;
  leafThemeColor?: string;
  leafFontColor?: string;
  scaleRatio?: number;
  tooltip?: boolean;
  edit?: boolean;
  drag?: boolean;
  zoom?: boolean;
  centerBtn?: boolean;
  fitBtn?: boolean;
  downloadBtn?: boolean;
  timetravel?: boolean;
  mindmap?: boolean;
  addNodeBtn?: boolean;
  collapseBtn?: boolean;
  watchResize?: boolean;
  closeEditInput?: boolean;
  renderer?: string;
  containerWidth?: number; // 容器宽度
  containerHeight?: number; // 容器高度
}

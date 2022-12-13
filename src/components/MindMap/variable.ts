import { ref } from "vue";
import { TreeGraph } from "@antv/g6";
import { INode } from "@antv/g6-core/lib/interface/item";

export const themeColor = ref("rgb(19, 128, 255)");
export const activeStrokeColor = ref("red");
export const hoverStrokeColor = ref("green");
export const changeThemeColor = (val: string) => {
  themeColor.value = val;
  activeStrokeColor.value = val;
  hoverStrokeColor.value = val;
};
export const themeColor_sub = ref("rgb(245,245,245)");
export const changeSubThemeColor = (val: string) =>
  (themeColor_sub.value = val);
export const themeColor_leaf = ref("transparent");
export const changeLeafThemeColor = (val: string) =>
  (themeColor_leaf.value = val);
export const fontColor_root = ref("#ffffff"); // 字体颜色
export const changeRootFontColor = (val: string) =>
  (fontColor_root.value = val);
export const fontColor_sub = ref("#333"); // 字体颜色
export const changeSubFontColor = (val: string) => (fontColor_sub.value = val);
export const fontColor_leaf = ref("#333"); // 字体颜色
export const changeLeafFontColor = (val: string) =>
  (fontColor_leaf.value = val);
export const branch = ref(2); // 线条宽度
export const changeBranch = (val: number) => (branch.value = val);
export const branchColor = ref("rgb(19, 128, 255)"); // 线条颜色
export const changeBranchColor = (val: string) => (branchColor.value = val);
export const timetravel = ref(false); // 显示历史操作栈
export const changeTimetravel = (val: boolean) => (timetravel.value = val);
export const downloadBtn = ref(false);
export const changeDownloadBtn = (val: boolean) => (downloadBtn.value = val);
export const fitBtn = ref(false);
export const changeFitBtn = (val: boolean) => (fitBtn.value = val);
export const centerBtn = ref(false);
export const changeCenterBtn = (val: boolean) => (centerBtn.value = val);
export const scaleRatio = ref(1);
export const changeScaleRatio = (val: number) => (scaleRatio.value = val);
export const radius = 4;
export const paddingH = 10;
export const paddingV = 10;
export const maxFontCount = 12; // 最多显示字个数
export const globalFontSize = [16, 14, 12]; // 字体大小
export const nodeMenuList = ref([]); // 节点右键菜单列表
export const changeNodeMenuList = (val: []) => (nodeMenuList.value = val);
export const currentNode = ref<INode | null>(null); // 当前选中的节点
export const setCurrentNode = (val: INode) => (currentNode.value = val);
export const globalTree = ref<TreeGraph | null>(null); // 树实例
export const setGlobalTree = (val: TreeGraph) => (globalTree.value = val);
export const lineType = ref<string>("cubic-horizontal");
export const setLineType = (val: string) => (lineType.value = val);
export const isCurrentEdit = ref<boolean>(false);
export const setIsCurrentEdit = (val: boolean) => (isCurrentEdit.value = val);
export const placeholderText = "新建模型";
export const isDragging = ref<boolean>(false);
export const setIsDragging = (val: boolean) => (isDragging.value = val);
export const hotkeys = ref([]); // 节点右键菜单列表
export const changehotKeyList = (val: []) => (hotkeys.value = val);
export const closeEditInput = ref(false);
export const changeCloseEditInput = (val: boolean) =>
  (closeEditInput.value = val);
export const isCurrentConnect = ref(false); // 当前是否为联系模式
export const setIsCurrentConnect = (val: boolean) =>
  (isCurrentConnect.value = val);

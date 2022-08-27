import G6 from "@antv/g6";
import { timetravel, centerBtn, fitBtn, downloadBtn, scaleR, scaleRatio, themeColor } from "./variable";
// 小地图
export const mindmap = () => new G6.Minimap({
  size: [100, 100],
  className: 'mindmap-miniGap',
  viewportClassName: 'mindmap-miniGap-viewPort',
  type: 'delegate',
  delegateStyle: {
    fill: themeColor.value,
    stroke: themeColor.value
  }
})
// 工具栏
export const toolbar = () => new G6.ToolBar({
  className: 'mindmap-toolbar',
  getContent: () => {
    return `
<div>
${timetravel.value ? `
<div class="mindmap-toolbar-top">
<ul class='mindmap-toolbar'>
        <li class='mindmap-toolbar-list_item' code='undo' title="撤销"><i class="icon-undo"></i></li>
        <li class='mindmap-toolbar-list_item' code='redo' title="恢复"><i class="icon-redo"></i></li>
      </ul>
</div>` : ''}
<div class="mindmap-toolbar-bottom">
<ul class='mindmap-toolbar'>
        ${downloadBtn.value ? `<li class='mindmap-toolbar-list_item' code='download' title="下载图片"><i class="icon-download"></i></li>` : ''}
        ${centerBtn.value ? `<li class='mindmap-toolbar-list_item' code='center' title="缩放到屏幕中心"><i class="icon-center"></i>缩放到画布中心</li>` : ''}
        ${fitBtn.value ? `<li class='mindmap-toolbar-list_item' code='fit' title="缩放到合适比例"><i class="icon-fit"></i></li>` : ''}
      </ul>
</div>
</div>
    `;
  },
  handleClick: (code, graph) => {
    switch (code) {
      case
        'undo'
        :
        toolbar.undo();
        break;
      case
        'redo'
        :
        toolbar.redo();
        break;
      case
        'download'
        :
        graph.downloadFullImage('mindmap_' + Date.now(), 'image/jpeg', {
          backgroundColor: '#ddd',
          padding: [30, 15, 15, 15],
        });
        break;
      case
        'fit'
        :
        graph.layout(true);
        break;
      case
        'center'
        :
        graph.fitCenter()
        graph.zoomTo(scaleRatio.value, {
          x: graph.getWidth() / 2,
          y: graph.getHeight() / 2
        })
        break;
    }
  }
});

// tooltip
export const tooltip = {
  type: 'tooltip',
  formatText(model) {
    return model.content || model.desc || model.fullName;
  },
  offset: 10,
}

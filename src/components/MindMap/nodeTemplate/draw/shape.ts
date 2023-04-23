import splitText from '../utils/splitText';
import type { IGroup, IShape } from '@antv/g6';
import { measureTextWidth } from '@antv/util';
import { defaultTextStyle } from '../constant';
class Shape {
  group: IGroup;
  zIndex: number;
  constructor(group: IGroup) {
    this.group = group.addGroup();
    this.zIndex = 0;
  }
  Rect(name: string, attrs: RectOptions, rest = {}) {
    return this.group.addShape('rect', {
      name,
      attrs,
      zIndex: this.zIndex,
      ...rest
    });

  }
  Circle(name: string, attrs: CircleOptions, rest = {}) {
    return this.group.addShape('circle', {
      name,
      attrs,
      zIndex: this.zIndex,
    });

  }
  Image(name: string, attrs: ImageOptions, rest = {}) {
    return this.group.addShape('image', {
      name,
      attrs,
      zIndex: this.zIndex,
      ...rest
    });

  }
  Text(name: string, attrs: TextOptions, maxWidth: number, rest = {}) {
    const { text } = attrs;
    let renderItems: string[] = [];
    const itemAttrs = Object.assign({}, defaultTextStyle, attrs);
    const x = itemAttrs.x || 0;
    let y = 0;
    const originy = (y =
      (itemAttrs.y || 0) + (itemAttrs.lineHeight! - itemAttrs.fontSize!) / 2);
    splitText(text).forEach((item, index, arr) => {
      const textWidth = measureTextWidth(
        renderItems.join('') + item,
        itemAttrs
      );
      const textIndent = attrs.textIndent || 0;
      let isFirstLine = y === originy;
      if (textWidth + (isFirstLine ? textIndent : 0) > maxWidth) {
        this.group.addShape('text', {
          name,
          attrs: Object.assign({}, itemAttrs, {
            x: isFirstLine ? x + textIndent : x,
            y,
            text: renderItems.join(''),
          }),
          zIndex: this.zIndex,
          ...rest
        });
        renderItems = [item];
        y += itemAttrs.lineHeight;
        isFirstLine = false;
      } else {
        renderItems.push(item);
      }
      if (index === arr.length - 1) {
        this.group.addShape('text', {
          name,
          attrs: Object.assign({}, itemAttrs, {
            x: isFirstLine ? x + textIndent : x,
            y,
            text: renderItems.join(''),
          }),
          zIndex: this.zIndex,
          ...rest
        });
      }
    });
  }
  sync(cb: (_this: Shape) => void) {
    cb(this);

  }
  inner() {
    this.group = this.group.addGroup();
    this.zIndex++;

  }
}
export default Shape;

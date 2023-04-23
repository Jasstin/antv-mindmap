import getTextBounds from '../utils/getTextBounds';
import Shape from './shape';
import { defaultTextStyle } from '../constant';
import { IGroup, IShape } from '@antv/g6';

const error = (msg) => console.log(`[shape error]:`, msg);
class DrawNode {
  maxContainerWidth = 300;
  lastBounds = { x: 0, y: 0 };
  paramHeight = 10;
  shape: Shape
  constructor(props?) {
    const { maxContainerWidth } = props || {};
    if (maxContainerWidth) this.maxContainerWidth = maxContainerWidth;
  }
  init(group: IGroup) {
    this.shape = new Shape(group!);
    return this
  }
  drawImage(data: ImageShape, shape: Shape = this.shape, inline: boolean) {
    const { src } = data;
    const width = inline ? defaultTextStyle.lineHeight : this.maxContainerWidth;
    const height = inline
      ? defaultTextStyle.lineHeight
      : this.maxContainerWidth;
    shape.Image(`img${Date.now()}`, {
      x: this.lastBounds.x,
      y: this.lastBounds.y,
      width,
      height,
      img: src,
    });
    this.lastBounds = {
      x: this.lastBounds.x + width,
      y: this.lastBounds.y + (inline ? 0 : height),
    };
  }
  drawEm(data: EmTextShape, shape: Shape = this.shape) {
    const { text, label, ...textOptions } = data;
    if (label != 'em') return;
    const { x, y } = this.lastBounds;
    const emStyle = {
      text,
      textIndent: x,
      fontStyle: 'italic',
      ...textOptions,
    };
    const { endlineWidth, height, line } = getTextBounds(
      text,
      emStyle,
      this.maxContainerWidth
    );
    shape.Text(
      `em${Date.now()}`,
      Object.assign({}, emStyle, { x: 0, y }),
      this.maxContainerWidth
    );
    this.lastBounds = { x: endlineWidth, y: y + (height / line) * (line - 1) };
  }
  drawBold(data: BoldTextShape, shape: Shape = this.shape) {
    const { text, label, ...textOptions } = data;
    if (label != 'bold') return;
    const { x, y } = this.lastBounds;
    const boldStyle = { text, textIndent: x, fontWeight: 600, ...textOptions };
    const { endlineWidth, height, line } = getTextBounds(
      text,
      boldStyle,
      this.maxContainerWidth
    );
    shape.Text(
      `bold${Date.now()}`,
      Object.assign({}, boldStyle, { x: 0, y }),
      this.maxContainerWidth
    );
    this.lastBounds = { x: endlineWidth, y: y + (height / line) * (line - 1) };
  }
  drawText(data: TextShape, shape: Shape = this.shape) {
    const { text, label, ...textOptions } = data;
    if (label != 'text') return;
    if (typeof text === 'string') {
      const { x, y } = this.lastBounds;
      const textStyle = { text, textIndent: x, ...textOptions };
      const { endlineWidth, height, line } = getTextBounds(
        text,
        textStyle,
        this.maxContainerWidth
      );
      shape.Text(
        `text${Date.now()}`,
        Object.assign({}, textStyle, { x: 0, y }),
        this.maxContainerWidth
      );
      this.lastBounds = {
        x: endlineWidth,
        y: y + (height / line) * (line - 1),
      };
    }
  }
  drawLink(data: LinkShape, shape: Shape = this.shape) {
    const { text, label, ...textOptions } = data;
    if (label != 'link') return;
    const { x, y } = this.lastBounds;
    const linkStyle = { text, textIndent: x, fill: 'blue', ...textOptions };
    const { endlineWidth, height, line } = getTextBounds(
      text,
      linkStyle,
      this.maxContainerWidth
    );
    shape.Text(
      `link${Date.now()}`,
      Object.assign({}, linkStyle, { x: 0, y }),
      this.maxContainerWidth
    );
    this.lastBounds = { x: endlineWidth, y: y + (height / line) * (line - 1) };
  }
  loadImage(src: string) {
    return new Promise((resolve) => {
      const oImg = document.createElement('img');
      oImg.src = src;
      oImg.style.maxWidth = this.maxContainerWidth + 'px';
      oImg.onload = () => resolve({ width: oImg.width, height: oImg.height });
      oImg.onerror = () => error(`加载图片失败,图片路径${src}`);
    }) as Promise<{
      width: number;
      height: number;
    }>;
  }
}
export default DrawNode;

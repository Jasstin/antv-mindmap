import splitText from './splitText';
import { defaultTextStyle } from '../constant';
import { measureTextWidth } from '@antv/util';
const getTextWrapHeight = (
  text: string,
  attrs: TextOptions,
  maxWidth?: number
) => {
  if (!text) {
    return {
      width: 0,
      height: 0,
      line: 0,
      endlineWidth: 0
    };
  }
  let renderItems: string[] = [];
  let line = 1;
  let lineLetter = '';
  let tempLine = '';
  const textIndent = attrs.textIndent || 0;
  const textAttr = Object.assign({}, defaultTextStyle, attrs);
  const originy =
    (textAttr.y || 0) + (textAttr.lineHeight! - textAttr.fontSize!) / 2;
  let y = originy;
  const getWidth = (text) => Math.ceil(measureTextWidth(text, textAttr))
  if (!maxWidth) {
    return {
      width: getWidth(text) + textIndent,
      height: textAttr.lineHeight,
      line: 1,
      endlineWidth: getWidth(text) + textIndent,
    };
  }
  splitText(text).forEach((item, index, arr) => {
    const textWidth = measureTextWidth(
      renderItems.join('') + item,
      textAttr
    );
    const textIndent = attrs.textIndent || 0;
    let isFirstLine = y === originy;
    if (textWidth + (isFirstLine ? textIndent : 0) > maxWidth) {
      renderItems = [item];
      y += textAttr.lineHeight;
      isFirstLine = false;
      if (getWidth(tempLine) > getWidth(lineLetter)) {
        lineLetter = tempLine;
      }
      line++;
      tempLine = item;
    } else {
      renderItems.push(item);
      tempLine += item;
    }
    if (index === arr.length - 1) {
      if (getWidth(tempLine) > getWidth(lineLetter)) {
        lineLetter = tempLine;
      }
      tempLine = '';
    }
  });
  return {
    width: line > 1 ? getWidth(lineLetter) + textIndent : getWidth(text) + textIndent,
    height: line * textAttr.lineHeight,
    line,
    endlineWidth:
      line > 1
        ? getWidth(renderItems.join(''))
        : getWidth(text) + textIndent,
  };
};
export default getTextWrapHeight;

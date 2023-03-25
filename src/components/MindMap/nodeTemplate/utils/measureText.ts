let ctx: CanvasRenderingContext2D | null;
const measureText = (text: string, font: TextOptions) => {
  if (!ctx) {
    ctx = document.createElement('canvas').getContext('2d')!;
  }
  const { fontStyle, fontWeight, fontSize, fontFamily } = font;
  ctx.font = [fontStyle, fontWeight, fontSize + 'px', fontFamily].join(' ');
  return ctx.measureText(text);
};
export default measureText;

interface ShapeBase {
  fill?: string;
  stroke?: string;
  lineWidth?: number;
  lineDash?: number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  opacity?: number;
  fillOpacity?: number;
  strokeOpacity?: number;
  cursor?: string;
}
interface RectOptions extends ShapeBase {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number | number[];
}
interface CircleOptions extends ShapeBase {
  x: number;
  y: number;
  r: number;
}
interface TextOptions extends ShapeBase {
  x?: number;
  y?: number;
  text: string;
  textAlign?: string;//'center' | 'end' | 'left' | 'right' | 'start';
  textBaseline?: string;//'top' | 'middle' | 'bottom' | 'alphabetic' | 'hanging';
  fontStyle?: string;//'normal' | 'italic' | 'oblique';
  fontWeight?: number;
  fontSize?: number;
  fontFamily?: string;
  lineHeight?: number;
  textIndent?: number; //首行缩进量
}

interface ImageOptions extends ShapeBase {
  x?: number;
  y?: number;
  width: number;
  height: number;
  img: string;
}
type GroupItemShape = ImageShape | TextShape | LinkShape;
type TextItemShape = TextShape | BoldTextShape | EmTextShape | LinkShape;
interface GroupShape {
  label: string;
  content: GroupItemShape[];
}

interface ImageShape {
  label: string;
  src: string;
}
interface TextShape extends TextOptions {
  label: string;
  text: string;
}
interface BoldTextShape extends TextOptions {
  label: string;
  text: string;
}
interface LinkShape {
  label: string;
  href: string;
  text: string;
}
interface EmTextShape extends TextOptions {
  label: string;
  text: string;
}
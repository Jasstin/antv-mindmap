import { each } from '@antv/util';
import { registerBehavior } from '@antv/g6-core';
import doubleFingerDragCanvas from './double-finger-drag-canvas';
const behaviors = {
  'double-finger-drag-canvas':doubleFingerDragCanvas
}
each(behaviors, (behavior, type: string) => {
  registerBehavior(type, behavior);
});

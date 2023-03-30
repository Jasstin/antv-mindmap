import { each } from '@antv/util';
import { registerBehavior } from '@antv/g6-core';
const behaviors = {}
each(behaviors, (behavior, type: string) => {
  registerBehavior(type, behavior);
});

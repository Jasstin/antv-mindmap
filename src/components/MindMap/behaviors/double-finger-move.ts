import { registerBehavior } from "@antv/g6-core";
registerBehavior("double-finger-drag-canvas", {
    reCalcDir: true,
    timer: null,
    getDefaultCfg() {
        return {
            controlMoveDirection: false
        }
    },
    getEvents: function getEvents() {
        return {
            wheel: "onWheel",
        };
    },
    onWheel: function onWheel(ev) {
        const graph = this.get('graph');
        if (ev.ctrlKey) {
            const canvas = graph.get("canvas");
            const point = canvas.getPointByClient(ev.clientX, ev.clientY);
            let ratio = graph.getZoom();
            if (ev.wheelDelta > 0) {
                ratio = ratio + ratio * 0.05;
            } else {
                ratio = ratio - ratio * 0.05;
            }
            graph.zoomTo(ratio, {
                x: point.x,
                y: point.y,
            });
        } else {
            const x = ev.deltaX || ev.movementX;
            let y = ev.deltaY || ev.movementY;
            if (this.get('controlMoveDirection')) {
                direction = Math.abs(x) < Math.abs(y) ? "v" : "h";
                this.reCalcDir = false;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.reCalcDir = true;
                }, 1000);
            }
            if (!y && navigator.userAgent.indexOf("Firefox") > -1)
                y = (-ev.wheelDelta * 125) / 3;
            graph.translate(-x, -y);
        }
        ev.preventDefault();
    },
});
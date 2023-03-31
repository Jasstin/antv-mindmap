export default {
    reCalcDir:true,
    direction:'all',
    getDefaultCfg(){
        return {
            controlMoveDirection:false
        }
    },
    getEvents: function getEvents() {
        return {
            wheel: "onWheel",
        };
    },

    onWheel: function onWheel(ev) {
        const self = this;
        const graph = self.get('graph');
        const controlMoveDirection = self.get('controlMoveDirection');
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
            let x = ev.deltaX || ev.movementX;
            let y = ev.deltaY || ev.movementY;
            if (controlMoveDirection && this.reCalcDir) {
                this.direction = Math.abs(x) < Math.abs(y) ? "v" : "h";
                this.reCalcDir = false;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.reCalcDir = true;
                }, 300);
            }
            if (!y && navigator.userAgent.indexOf("Firefox") > -1)
                y = (-ev.wheelDelta * 125) / 3;
            if (this.direction === "h") {
                y = 0;
            } else if (this.direction === "v") {
                x = 0;
            }
            graph.translate(-x, -y);
        }
        ev.preventDefault();
    },
}
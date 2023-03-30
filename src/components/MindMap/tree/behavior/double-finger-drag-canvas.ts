export default {
    getEvents: function getEvents() {
        return {
            wheel: "onWheel",
        };
    },

    onWheel: function onWheel(ev,self) {
        const graph = self.get('graph');
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
            if (!y && navigator.userAgent.indexOf("Firefox") > -1)
                y = (-ev.wheelDelta * 125) / 3;
            graph.translate(-x, -y);
        }
        ev.preventDefault();
    },
}
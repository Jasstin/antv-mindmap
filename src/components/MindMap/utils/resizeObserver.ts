export default function observer(id, callback) {
    var objResizeObserver = new ResizeObserver(function (entries) {
        var entry = entries[0];
        var cr = entry.contentRect;
        callback(cr);
    });
    // 观察文本域元素
    objResizeObserver.observe(document.getElementById(id));
}
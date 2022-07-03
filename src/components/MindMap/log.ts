const log = function () {
  if(window['mindmap_debug']){
    console.log.apply(this, arguments)
  }
}
export default {log}
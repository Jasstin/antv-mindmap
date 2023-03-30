/** 获取到id元素的中心点坐标 */
const getCenterPointById = (id)=>{
    const oC = document.getElementById(id);
    const {x,y,width,height} = oC.getBoundingClientRect();
    return {
        x:x+width/2,
        y:y+height/2
    }
}
export default getCenterPointById
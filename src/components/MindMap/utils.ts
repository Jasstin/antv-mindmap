import G6 from "@antv/g6";

/**
 * 文本超出显示……
 * **/
export const fittingString = (str: string, maxWidth: number, fontSize: number) => {
    const ellipsis = '...';
    const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
    let currentWidth = 0;
    let res = str;
    const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
    str.split('').forEach((letter, i) => {
        if (currentWidth > maxWidth - ellipsisLength) return;
        if (pattern.test(letter)) {
            // Chinese charactors
            currentWidth += fontSize;
        } else {
            // get the width of single letter according to the fontSize
            currentWidth += G6.Util.getLetterWidth(letter, fontSize);
        }
        if (currentWidth > maxWidth - ellipsisLength) {
            res = `${str.substr(0, i)}${ellipsis}`;
        }
    });
    return res;
};
/**
 * 文本超出换行
 * */
export const wrapString = (str: string, maxWidth: number, fontSize: number): { line: number, text: string } => {
    let currentWidth = 0;
    const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
    const lineGroup = []
    let firstIndex = 0
    str = str.replace(/\s/g, '')
    str.split('').forEach((letter, i, array) => {
        if (pattern.test(letter)) {
            // Chinese charactors
            currentWidth += fontSize;
        } else {
            // get the width of single letter according to the fontSize
            currentWidth += G6.Util.getLetterWidth(letter, fontSize);
        }
        if (currentWidth > maxWidth) {
            lineGroup.push(str.slice(firstIndex, i))
            currentWidth = 0;
            firstIndex = i
        } else if (i === array.length - 1) {
            lineGroup.push(str.slice(firstIndex, i + 1))
        }
    });
    return {line: lineGroup.length, text: lineGroup.join('\n')}
};
window.wrapString = wrapString

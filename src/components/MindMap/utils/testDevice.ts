import Bowser from "bowser";
const browser = Bowser.getParser(window.navigator.userAgent).parsedResult;

export const isWin = browser.os.name === 'Windows';
export const isSafari = browser.browser.name === 'Safari';
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

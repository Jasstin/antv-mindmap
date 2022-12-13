export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};
export const isMac = function () {
  return /macintosh|mac os x/i.test(navigator.userAgent);
};

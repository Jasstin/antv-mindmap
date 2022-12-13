const getAnchorByDirection = (direction) => {
  let res = {};
  switch (direction) {
    case "BT":
      res = {
        sourceAnchor: 1, // 下边的中间点位
        targetAnchor: 3, // 上边的中间点位
      };
      break;
    case "V":
    case "TB":
      res = {
        sourceAnchor: 3, // 下边的中间点位
        targetAnchor: 1, // 上边的中间点位
      };
      break;
    case "RL":
      res = {
        sourceAnchor: 0, // 下边的中间点位
        targetAnchor: 2, // 上边的中间点位
      };
      break;
    default:
      res = {
        sourceAnchor: 2, // 右边的中间点位
        targetAnchor: 0, // 左边的中间点位
      };
  }
  return res;
};
export default getAnchorByDirection;

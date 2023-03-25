const getImageBounds = (width: number, height: number, maxWidth: number) => {
  if (width < maxWidth) return { width, height, ratio: 1 };
  const ratio = maxWidth / width;
  return { width: maxWidth, height: height * ratio, ratio };
};
export default getImageBounds;

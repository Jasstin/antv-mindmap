export const isArray = (arg) =>
  Object.prototype.toString.call(arg).toLowerCase().indexOf("array") > 5;
export const isObject = (arg) =>
  Object.prototype.toString.call(arg).toLowerCase() === "[object object]";

const withCss = (dom, cssObj) => {
  Object.keys(cssObj).forEach((item) => {
    dom.style.item = cssObj[item];
  });
};
export default withCss;

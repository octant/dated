import glamorous from "glamorous";

export const StyledItem = glamorous.div(
  {
    position: `relative`,
    boxSizing: `border-box`,
    float: `left`,
    margin: `0em`,
    textAlign: `center`,
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: `white`
  },
  ({ width, units, clickable, selected, muted, focused }) => {
    const style = {
      width: `${width}${units}`,
      height: `${width}${units}`,
      lineHeight: `${width}${units}`
    };

    /**
     * Come up with names for the 'styles'
     * selected, highlighted, emphasized etc...
     */
    if (focused) {
      style.lineHeight = `calc(${style.height} - 2px)`;
      style.border = `1px #FFF solid`;
      style.color = `#FFF`;
      style.backgroundColor = "rgb(0, 120, 215)";
    }

    if (muted) {
      style.color = `#BBB`;
    }

    if (selected) {
      style.lineHeight = `calc(${style.height} - 2px)`;
      style.fontWeight = `bold`;
      style.border = `1px #0A64A4 solid`;
      style.color = "rgb(0, 90, 161)";
      style.backgroundColor = "white";
    }

    if (clickable) {
      style[":hover"] = {
        lineHeight: `calc(${style.height} - 2px)`,
        border: `1px #FFF solid`,
        cursor: `pointer`,
        color: `white`,
        backgroundColor: `#0A64A4`
      };
    }

    return style;
  }
);

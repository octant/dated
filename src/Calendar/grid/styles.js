import glamorous from "glamorous";

export const StyledGrid = glamorous.div(
  {
    position: `relative`
  },
  ({ itemsWide, itemWidth, widthUnit }) => {
    const width = `${itemsWide * itemWidth}`;
    const style = {
      width: `${width}${widthUnit}`
    };
    return style;
  }
);

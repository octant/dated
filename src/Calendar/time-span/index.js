import React from "react";
import PropTypes from "prop-types";
import Grid from "../grid";
import Item from "../item";

import { build, weekdays } from "../lib/calendar-fns";
import { format } from "date-fns";

const TimeSpan = props => {
  function handleSelect({ id }) {
    props.dispatcher({ type: "level.descend", payload: id });
  }

  function items() {
    const units = [];

    if (props.span === "month") {
      weekdays().forEach(weekday => {
        units.push(<Item label={weekday} />);
      });
    }

    build(props.span, props.startOfCalendar).forEach(date => {
      const dateString = format(date, "YYYY-MM-DD");
      const startOfMonth = format(props.startOfMonth, "YYYY-MM-DD");
      let label, id, selected, muted, focused;
      switch (props.span) {
        case "decade":
          id = dateString.slice(0, 4);
          label = format(date, "YYYY");
          selected = (props.selected || "").slice(0, 4) === id;
          muted = startOfMonth.slice(0, 3) !== id.slice(0, 3);
          focused = (props.today || "").slice(0, 4) === id;
          break;
        case "year":
          id = dateString.slice(0, 7);
          label = format(date, "MMM");
          selected = (props.selected || "").slice(0, 7) === id;
          muted = startOfMonth.slice(0, 4) !== id.slice(0, 4);
          focused = (props.today || "").slice(0, 7) === id;
          break;
        case "month":
          id = dateString;
          label = date.getDate();
          selected = props.selected === id;
          muted = startOfMonth.slice(0, 7) !== id.slice(0, 7);
          focused = props.today === id;
          break;
        default:
          id = dateString;
          label = date.getDate();
          selected = props.selected === id;
          muted = startOfMonth.slice(0, 7) !== id.slice(0, 7);
          focused = props.today === id;
      }
      units.push(
        <Item
          id={id}
          clickMethod={handleSelect}
          date={date}
          focused={focused}
          muted={muted}
          selected={selected}
          label={label}
        />
      );
    });

    return units;
  }

  function calcSize() {
    let itemWidth, widthUnit, itemsWide;

    switch (props.span) {
      case "decade":
      case "year":
        itemWidth = 4.375;
        widthUnit = "em";
        itemsWide = 4;
        break;
      default:
        itemWidth = 2.5;
        widthUnit = "em";
        itemsWide = 7;
    }
    return {
      itemWidth,
      widthUnit,
      itemsWide
    };
  }

  const sizes = calcSize();

  return (
    <Grid
      items={items()}
      itemWidth={sizes["itemWidth"]}
      widthUnit={sizes["widthUnit"]}
      itemsWide={sizes["itemsWide"]}
    />
  );
};

TimeSpan.propTypes = {
  span: PropTypes.string.isRequired,
  startOfMonth: PropTypes.instanceOf(Date).isRequired,
  startOfCalendar: PropTypes.instanceOf(Date).isRequired,
  selected: PropTypes.string,
  today: PropTypes.string
};

export default TimeSpan;

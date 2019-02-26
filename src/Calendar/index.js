import React, { useReducer, useEffect } from "react";

import { format, get, stringToDate, startOf } from "./lib/date-fns";
import {
  get as calendarGet,
  startOf as startOfCalendar
} from "./lib/calendar-fns";

import Calendar from "./Calendar";
import onClickOutside from "react-onclickoutside";

const levels = ["month", "year", "decade"];
const today = format(new Date(), "YYYY-MM-DD");

const initialState = {
  isOpen: false,
  selected: today,
  levels,
  enableOnClickOutside: false,
  level: "month",
  today,
  startOfMonth: startOf("month", stringToDate(today)),
  startOfCalendar: startOfCalendar("month", stringToDate(today))
};

const reducer = (state, { type, payload }) => {
  const { level, levels } = state;
  const currentLevelIndex = levels.indexOf(level);
  const nextLevel =
    currentLevelIndex < levels.length - 1
      ? levels[currentLevelIndex + 1]
      : level;
  const prevLevel =
    currentLevelIndex > 0 ? levels[currentLevelIndex - 1] : level;

  switch (type) {
    case "toggle":
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case "close":
      return {
        ...state,
        isOpen: false
      };
    case "date.next":
      return {
        ...state,
        startOfMonth: get("next", state.level, state.startOfMonth),
        startOfCalendar: calendarGet("next", state.level, state.startOfMonth)
      };
    case "date.prev":
      return {
        ...state,
        startOfMonth: get("previous", state.level, state.startOfMonth),
        startOfCalendar: calendarGet(
          "previous",
          state.level,
          state.startOfMonth
        )
      };
    case "date.select":
      return {
        ...state,
        selected: payload,
        startOfMonth: startOf(state.level, stringToDate(payload)),
        startOfCalendar: startOfCalendar(state.level, stringToDate(payload))
      };
    case "date.today":
      return {
        ...state,
        startOfMonth: startOf(state.level, stringToDate(state.today)),
        startOfCalendar: startOfCalendar(state.level, stringToDate(state.today))
      };
    case "level.select":
      return {
        ...state,
        level: payload
      };
    case "level.ascend":
      return {
        ...state,
        level: nextLevel,
        startOfMonth: startOf(nextLevel, stringToDate(state.selected)),
        startOfCalendar: startOfCalendar(
          nextLevel,
          stringToDate(state.selected)
        )
      };
    case "level.descend":
      return {
        ...state,
        level: prevLevel,
        selected: currentLevelIndex === 0 ? payload : state.selected,
        isOpen: currentLevelIndex !== 0,
        startOfMonth: startOf(prevLevel, stringToDate(payload)),
        startOfCalendar: startOfCalendar(prevLevel, stringToDate(payload))
      };
    default:
      return { ...state };
  }
};

const CalendarWrapper = ({
  level = initialState.level,
  name,
  onChange,
  input,
  isOpen,
  value = initialState.today
}) => {
  const [state, dispatcher] = useReducer(reducer, {
    ...initialState,
    level: level,
    selected: value,
    isOpen: !!isOpen,
    startOfMonth: startOf(level, stringToDate(value)),
    startOfCalendar: startOfCalendar(level, stringToDate(value))
  });

  useEffect(() => {
    onChange({ name, value: state.selected });
  }, [state.selected]);

  function handleChange(e) {
    dispatcher({ type: "date.select", payload: e.target.value });
    onChange({ name, value: e.target.value });
  }

  function handleKeyUp(e) {
    switch (e.keyCode) {
      case 27:
        dispatcher({ type: "close" });
        break;
      case 13:
        dispatcher({ type: "toggle" });
        break;
      default:
        break;
    }
  }

  CalendarWrapper.handleClickOutside = () => dispatcher({ type: "close" });

  return (
    <div onKeyUp={handleKeyUp}>
      {input !== undefined &&
        React.createElement(input, {
          type: "text",
          value,
          onClick: () => dispatcher({ type: "toggle" }),
          onChange: handleChange
        })}

      <Calendar
        dispatcher={dispatcher}
        name={name}
        isOpen={state.isOpen}
        state={state}
      />
    </div>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => CalendarWrapper.handleClickOutside
};

export default onClickOutside(CalendarWrapper, clickOutsideConfig);

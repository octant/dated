import React from "react";
import { format } from "date-fns";

const Controls = ({ dispatcher, state }) => {
  function handleAscendLevel() {
    dispatcher({ type: "level.ascend" });
  }

  function handleNext() {
    dispatcher({ type: "date.next" });
  }

  function handlePrev() {
    dispatcher({ type: "date.prev" });
  }

  function handleToday() {
    dispatcher({ type: "date.today" });
  }

  function buttonLabel() {
    switch (state.level) {
      case "decade":
        const startYear = state.startOfMonth.getFullYear();
        const decade = startYear - (startYear % 10);

        return `${decade} - ${decade + 9}`;
      case "year":
        return state.startOfMonth.getFullYear();
      default:
        return format(state.startOfMonth, "MMMM YYYY");
    }
  }

  return (
    <>
      <div>
        <button onClick={handleToday}>{state.today}</button>
      </div>
      <div>
        <button onClick={handlePrev}>{"<"}</button>
        <button onClick={handleAscendLevel}>{buttonLabel()}</button>
        <button onClick={handleNext}>{">"}</button>
      </div>
    </>
  );
};

export default Controls;

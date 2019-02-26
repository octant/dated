import React from "react";

import Controls from "./Controls";
import TimeSpan from "./time-span";

export default ({ dispatcher, isOpen, name, state }) => {
  return (
    isOpen && (
      <div
        style={{ position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <Controls state={state} dispatcher={dispatcher} />
        <TimeSpan
          span={state.level}
          startOfMonth={state.startOfMonth}
          startOfCalendar={state.startOfCalendar}
          today={state.today}
          name={name}
          selected={state.selected}
          dispatcher={dispatcher}
        />
      </div>
    )
  );
};

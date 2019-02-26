import React, { useState } from "react";

import Calendar from "./Calendar";

const App = () => {
  const selected = "2018-06-04";
  const [date, setDate] = useState(selected);

  return (
    <Calendar
      name="dob"
      value={date}
      onChange={({ name, value }) => {
        setDate(value);
      }}
      input="input"
    />
  );
};

export default App;

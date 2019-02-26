/* eslint-env jest */

import React from "react";
import Grid from "./";
import Enzyme, { mount } from "enzyme";
import Adaptor from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adaptor() });

describe("<Grid /> functionality", () => {
  test("displays all items passed to it", () => {
    const items = [<input />, <input />];

    const grid = mount(<Grid items={items} />);

    expect(grid.find("input").length).toBe(2);
  });
});

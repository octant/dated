/* eslint-env jest */

import React from "react";
import Item from "./";
import renderer from "react-test-renderer";
import serializer from "jest-glamor-react";
import Enzyme, { mount } from "enzyme";
import Adaptor from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adaptor() });
expect.addSnapshotSerializer(serializer);

describe("<Item /> appearance", () => {
  test("renders the same each time", () => {
    const component = renderer.create(<Item label="3" />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("<Item /> functionality", () => {
  test("displays label property", () => {
    const text = "Mo";
    const item = mount(<Item label={text} />);
    expect(item.text()).toEqual(text);
  });
});

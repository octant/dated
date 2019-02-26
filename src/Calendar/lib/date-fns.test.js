/* eslint-env jest */

import {
  format,
  partialToFullDate,
  replace,
  stringToDate,
  startOf
} from "./date-fns";

describe("replace", () => {
  test("replace year", () => {
    const date = new Date(2018, 2, 26);
    const replaceYear = replace(new RegExp("Y{2,4}"), date.getFullYear());

    expect(replaceYear("YY")).toEqual("18");
    expect(replaceYear("YYYY")).toEqual("2018");
  });

  test("replace month", () => {
    const date = new Date(2018, 2, 2);
    const replaceMonth = replace(
      new RegExp("M{1,2}"),
      ("0" + (date.getMonth() + 1)).slice(-2)
    );

    expect(replaceMonth("M")).toEqual("3");
    expect(replaceMonth("MM")).toEqual("03");
  });

  test("replace day", () => {
    const date = new Date(2018, 2, 2);
    const replaceDay = replace(
      new RegExp("D{1,2}"),
      ("0" + date.getDate()).slice(-2)
    );

    expect(replaceDay("D")).toEqual("2");
    expect(replaceDay("DD")).toEqual("02");
  });
});

describe("format", () => {
  test("returns a string with dates substituted", () => {
    const date = new Date(2018, 2, 9);

    expect(format(date, "YY")).toEqual("18");
    expect(format(date, "YYYY")).toEqual("2018");
    expect(format(date, "YYYY-MM")).toEqual("2018-03");
    expect(format(date, "M/D/YY")).toEqual("3/9/18");
  });
});

describe("partialToFullDate", () => {
  test("returns a full date given only a year", () => {
    expect(partialToFullDate(2016)).toEqual(new Date(2016, 0, 1));
  });

  test("returns a full date given only a year and month", () => {
    expect(partialToFullDate(2018, 12)).toEqual(new Date(2018, 11, 1));
  });

  test("returns a full date if year, month and day are provided", () => {
    expect(partialToFullDate(2018, 1, 31)).toEqual(new Date(2018, 0, 31));
  });
});

describe("stringToDate", () => {
  test("returns a date given a string in the form of yyyy-mm-dd", () => {
    const dateString = "2016-04-12";

    expect(stringToDate(dateString)).toEqual(new Date(2016, 3, 12));
  });

  test("returns a date given a string in the form of yyyy-mm", () => {
    const dateString = "2016-04";

    expect(stringToDate(dateString)).toEqual(new Date(2016, 3, 1));
  });

  test("returns a date given a string in the form of yyyy", () => {
    const dateString = "2020";

    expect(stringToDate(dateString)).toEqual(new Date(2020, 0, 1));
  });

  test("returns today when passed an empty string", () => {
    const today = new Date();
    expect(stringToDate("")).toEqual(
      new Date(today.getFullYear(), today.getMonth(), 1)
    );
  });
});

describe("startOf", () => {
  test("returns first day of month", () => {
    const date = new Date(2018, 2, 30);
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const startOfDecade = new Date(2010, 0, 1);

    expect(startOf("month", date)).toEqual(startOfMonth);
    expect(startOf("year", date)).toEqual(startOfYear);
    expect(startOf("decade", date)).toEqual(startOfDecade);
  });
});

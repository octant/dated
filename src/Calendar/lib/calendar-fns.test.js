/* eslint-env jest */

import {
  build,
  get,
  getNextMonth,
  getPreviousMonth,
  nextDecade,
  previousDecade,
  startOf,
  weekdays,
  weekOfMonth
} from "./calendar-fns";

describe("decade functions", () => {
  test("next", () => {
    expect(get("current", "decade", new Date(2018, 2, 28))).toEqual(
      new Date(2010, 0, 1)
    );
    expect(get("current", "decade", new Date(2020, 4, 4))).toEqual(
      new Date(2018, 0, 1)
    );
  });

  test("previous", () => {
    expect(previousDecade(2020)).toEqual(new Date(2006, 0, 1));
    expect(previousDecade(2000)).toEqual(new Date(1986, 0, 1));
    expect(previousDecade(1990)).toEqual(new Date(1978, 0, 1));
  });

  test("next", () => {
    expect(nextDecade(2010)).toEqual(new Date(2018, 0, 1));
    expect(nextDecade(2020)).toEqual(new Date(2030, 0, 1));
    expect(nextDecade(2030)).toEqual(new Date(2038, 0, 1));
  });

  test("together", () => {
    const date = new Date(2021, 11, 14);
    expect(get("current", "decade", date)).toEqual(new Date(2018, 0, 1));
    expect(get("next", "decade", date)).toEqual(new Date(2030, 0, 1));
  });
});

describe("getPreviousYear", () => {
  test("gets the first date to display for the previous year", () => {
    const date = new Date(2018, 2, 28);
    const firstDay = get("previous", "year", date);

    expect(firstDay.getDate()).toBe(1);
    expect(firstDay.getMonth()).toBe(8);
    expect(firstDay.getFullYear()).toBe(2016);
  });
});

describe("getNextYear", () => {
  test("gets the first date to display for the next year", () => {
    const date = new Date(2018, 2, 28);
    const firstDay = get("next", "year", date);

    expect(firstDay.getDate()).toBe(1);
    expect(firstDay.getMonth()).toBe(0);
    expect(firstDay.getFullYear()).toBe(2019);
  });
});

describe("getCurrentYear", () => {
  test("gets the first date to display for the next year", () => {
    const date = new Date(2018, 2, 28);
    const firstDay = get("current", "year", date);

    expect(firstDay.getDate()).toBe(1);
    expect(firstDay.getMonth()).toBe(0);
    expect(firstDay.getFullYear()).toBe(2018);
  });
});

describe("build month", () => {
  test("returns 42 days", () => {
    const date = new Date(2018, 2, 28);
    const firstDay = get("current", "month", date);
    const months = build("month", firstDay);

    expect(months.length).toBe(42);
    expect(months[0]).toEqual(new Date(2018, 1, 25));
    expect(months[41]).toEqual(new Date(2018, 3, 7));
  });
});

describe("build year", () => {
  test("returns 16 months", () => {
    const date = new Date(2018, 2, 28);
    const firstDay = get("current", "year", date);
    const months = build("year", firstDay);

    expect(months.length).toBe(16);
    expect(months[0]).toEqual(new Date(2018, 0, 1));
    expect(months[15]).toEqual(new Date(2019, 3, 1));
  });
});

describe("build decade", () => {
  test("returns 16 years", () => {
    const date = new Date(2018, 2, 28);
    const firstDay = get("current", "decade", date);
    const years = build("decade", firstDay);

    expect(years.length).toBe(16);
    expect(years[0]).toEqual(new Date(2010, 0, 1));
    expect(years[15]).toEqual(new Date(2025, 0, 1));
  });
});

describe("getPreviousMonth", () => {
  test("gets the first date to display for the previous month", () => {
    const date = new Date(2018, 4, 23);
    const firstDay = getPreviousMonth(date);

    expect(firstDay.getDate()).toBe(25);
    expect(firstDay.getMonth()).toBe(2);
  });

  test("gets the first date using offset when month begins on offset 1", () => {
    const date = new Date(2018, 1, 18);
    const firstDay = getPreviousMonth(date, 2);

    expect(firstDay.getDate()).toBe(26);
    expect(firstDay.getMonth()).toBe(11);
    expect(firstDay.getFullYear()).toBe(2017);
  });

  test("gets the first date to display for the previous month using an offset", () => {
    const date = new Date(2018, 3, 23);
    const firstDay = getPreviousMonth(date, 1);

    expect(firstDay.getDate()).toBe(26);
    expect(firstDay.getMonth()).toBe(1);
  });
});

describe("getNextMonth", () => {
  test("gets the first date to display for the next month", () => {
    const date = new Date(2018, 2, 23);
    const firstDay = get("next", "month", date);

    expect(firstDay.getDate()).toBe(1);
    expect(firstDay.getMonth()).toBe(3);
  });

  test("gets the first date using offset when month begins on offset 1", () => {
    const date = new Date(2017, 11, 18);
    const firstDay = getNextMonth(date, 2);

    expect(firstDay.getDate()).toBe(26);
    expect(firstDay.getMonth()).toBe(11);
    expect(firstDay.getFullYear()).toBe(2017);
  });

  test("gets the first date to display for the next month using an offset", () => {
    const date = new Date(2018, 3, 23);
    const firstDay = getNextMonth(date, 1);

    expect(firstDay.getDate()).toBe(30);
    expect(firstDay.getMonth()).toBe(3);
  });
});

describe("weekOfMonth", () => {
  test("returns the 0-indexed week of the month", () => {
    // 2018-03-02
    expect(weekOfMonth(new Date(2018, 2, 1).getDay(), 2)).toBe(0);
    // 2018-01-13
    expect(weekOfMonth(new Date(2018, 0, 1).getDay(), 13)).toBe(1);
    // 2018-12-15
    expect(weekOfMonth(new Date(2018, 11, 1).getDay(), 15)).toBe(2);
    // 2018-06-23
    expect(weekOfMonth(new Date(2018, 5, 1).getDay(), 23)).toBe(3);
    // 2018-02-28
    expect(weekOfMonth(new Date(2018, 1, 1).getDay(), 28)).toBe(4);
  });
});

describe("weekdays", () => {
  test("returns Su-Sa by default", () => {
    expect(weekdays().join(" ")).toEqual("Su Mo Tu We Th Fr Sa");
  });

  test("returns Mo-Su with an offset of 1", () => {
    expect(weekdays(1).join(" ")).toEqual("Mo Tu We Th Fr Sa Su");
  });
});

describe("startOf", () => {
  test("return start of calendar for month", () => {
    const date = new Date(2018, 2, 22);

    expect(startOf("month", date)).toEqual(new Date(2018, 1, 25));
  });

  test("return start of calendar for year", () => {
    const date = new Date(2018, 2, 22);

    expect(startOf("year", date)).toEqual(new Date(2018, 0, 1));
  });

  test("return start of calendar for decade", () => {
    const date = new Date(2018, 2, 22);

    expect(startOf("decade", date)).toEqual(new Date(2010, 0, 1));
  });
});

describe("get, getNext, getPrevious", () => {
  test("return start of calendar for previous month", () => {
    const date = new Date(2018, 2, 22);

    expect(get("previous", "month", date)).toEqual(new Date(2018, 0, 28));
  });

  test("return start of calendar for next month", () => {
    const date = new Date(2018, 2, 22);

    expect(get("next", "month", date)).toEqual(new Date(2018, 3, 1));
  });

  test("return start of calendar for previous year", () => {
    const date = new Date(2018, 2, 22);

    expect(get("previous", "year", date)).toEqual(new Date(2016, 8, 1));
  });

  test("return start of calendar for next year", () => {
    const date = new Date(2018, 2, 22);

    expect(get("next", "year", date)).toEqual(new Date(2019, 0, 1));
  });

  test("return start of calendar for previous decade", () => {
    const date = new Date(2018, 2, 22);

    expect(get("previous", "decade", date)).toEqual(new Date(1998, 0, 1));
  });

  test("return start of calendar for next decade", () => {
    const date = new Date(2018, 2, 22);

    expect(get("next", "decade", date)).toEqual(new Date(2018, 0, 1));
  });
});

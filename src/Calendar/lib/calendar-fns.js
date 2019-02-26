export const currentDecade = decade => {
  const startingYear = decade - 2 + (decade % 20) / 5;
  return new Date(startingYear, 0, 1);
};

export const nextDecade = decade => {
  const startingYear = decade + 10 - 0.2 * (decade % 20);
  return new Date(startingYear, 0, 1);
};

export const previousDecade = decade => {
  const startingYear = decade - 14 + 0.2 * (decade % 20);
  return new Date(startingYear, 0, 1);
};

const previousYear = year => {
  return new Date(year - 1, 0 - 4, 1);
};

const nextYear = year => {
  return new Date(year + 1, 0, 1);
};

const previousMonth = (year, month, offset) => {
  const firstDayIndex = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const previousMonthFill = (firstDayIndex - 1 + 7) % 7;
  const shift = previousMonthFill + daysInMonth - offset;

  if (new Date(year, month, 0 - shift) >= new Date(year, month - 1, 1)) {
    return new Date(year, month, 0 - shift - 7);
  } else {
    return new Date(year, month, 0 - shift);
  }
};

const nextMonth = (year, month, offset) => {
  const firstDayIndex = new Date(year, month + 1, 1).getDay();
  const previousMonthFill = (0 - 7) % 7;
  const shift = firstDayIndex + previousMonthFill - offset;

  if (new Date(year, month + 1, 1 - shift) > new Date(year, month + 1, 1)) {
    return new Date(year, month + 1, 1 - shift - 7);
  } else {
    return new Date(year, month + 1, 1 - shift);
  }
};

export const buildMonth = startDate => {
  const days = [];
  for (let offset = 0; offset < 42; offset++) {
    days.push(
      new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + offset
      )
    );
  }

  return [...days];
};

export const buildYear = startDate => {
  const months = [];
  for (let i = 0; i < 16; i++) {
    months.push(new Date(startDate.getFullYear(), startDate.getMonth() + i, 1));
  }

  return [...months];
};

export const buildDecade = startDate => {
  const years = [];
  for (let i = 0; i < 16; i++) {
    years.push(new Date(startDate.getFullYear() + i, 0, 1));
  }

  return [...years];
};

export const build = (duration, startDate) => {
  switch (duration) {
    case "decade":
      return buildDecade(startDate);
    case "year":
      return buildYear(startDate);
    default:
      return buildMonth(startDate);
  }
};

export const weekOfMonth = (monthStart, date) => {
  return Math.floor((date - 1 + monthStart) / 7);
};

export const weekdays = (offset = 0) => {
  const week = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return [...week.slice(offset), ...week.slice(0, offset)];
};

export const getPreviousYear = date => {
  return previousYear(date.getFullYear());
};

export const getNextYear = date => {
  return nextYear(date.getFullYear());
};

export const getCurrentYear = date => {
  return nextYear(date.getFullYear() - 1);
};

export const getPreviousMonth = (date, offset = 0) => {
  return previousMonth(date.getFullYear(), date.getMonth(), offset);
};

export const getCurrentMonth = (date, offset = 0) => {
  return nextMonth(date.getFullYear(), date.getMonth() - 1, offset);
};

export const getNextMonth = (date, offset = 0) => {
  return nextMonth(date.getFullYear(), date.getMonth(), offset);
};

export const getCurrentDecade = date => {
  const year = date.getFullYear();
  const decade = year - (year % 10);
  return currentDecade(decade);
};

export const getNextDecade = date => {
  const year = date.getFullYear();
  const decade = year - (year % 10);
  return nextDecade(decade);
};

export const getPreviousDecade = date => {
  const year = date.getFullYear();
  const decade = year - (year % 10);
  return previousDecade(decade);
};

export const startOf = (selector, date) => {
  switch (selector) {
    case "decade":
      return getCurrentDecade(date);
    case "year":
      return getCurrentYear(date);
    default:
      return getCurrentMonth(date);
  }
};

export const getCurrent = (duration, from) => {
  switch (duration) {
    case "decade":
      return getCurrentDecade(from);
    case "year":
      return getCurrentYear(from);
    default:
      return getCurrentMonth(from);
  }
};

export const getNext = (duration, from) => {
  switch (duration) {
    case "decade":
      return getNextDecade(from);
    case "year":
      return getNextYear(from);
    default:
      return getNextMonth(from);
  }
};

export const getPrevious = (duration, from) => {
  switch (duration) {
    case "decade":
      return getPreviousDecade(from);
    case "year":
      return getPreviousYear(from);
    default:
      return getPreviousMonth(from);
  }
};

export const get = (direction, duration, from) => {
  switch (direction) {
    case "next":
      return getNext(duration, from);
    case "previous":
      return getPrevious(duration, from);
    default:
      return getCurrent(duration, from);
  }
};

export const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};

export const replace = (regex, datePart) => {
  return formatString => {
    const match = formatString.match(regex);
    return match
      ? formatString.replace(regex, `${datePart}`.slice(-match[0].length))
      : formatString;
  };
};

export const format = (date, formatString) => {
  const replaceYear = replace(/Y{2,4}/, date.getFullYear());
  const replaceMonth = replace(
    /M{1,2}/,
    ("0" + (date.getMonth() + 1)).slice(-2)
  );
  const replaceDay = replace(/D{1,2}/, ("0" + date.getDate()).slice(-2));

  return replaceYear(replaceMonth(replaceDay(formatString)));
};

export const partialToFullDate = (y, m = 1, d = 1) => {
  return new Date(y, m - 1, d);
};

export const stringToDate = dateString => {
  const today = new Date();
  return dateString
    ? partialToFullDate(...dateString.split("-"))
    : partialToFullDate(today.getFullYear(), today.getMonth() + 1);
};

export const startOf = (selector, date) => {
  switch (selector) {
    case "decade":
      const decade = date.getFullYear() - (date.getFullYear() % 10);
      return new Date(decade, 0, 1);
    case "year":
      return new Date(date.getFullYear(), 0, 1);
    default:
      return new Date(date.getFullYear(), date.getMonth(), 1);
  }
};

const getNextDecade = date => {
  const decade = date.getFullYear() - (date.getFullYear() % 10);
  return new Date(decade + 10, 0, 1);
};

const getNextYear = date => {
  return new Date(date.getFullYear() + 1, 0, 1);
};

const getNextMonth = date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

const getPreviousDecade = date => {
  const decade = date.getFullYear() - (date.getFullYear() % 10);
  return new Date(decade - 10, 0, 1);
};

const getPreviousYear = date => {
  return new Date(date.getFullYear() - 1, 0, 1);
};

const getPreviousMonth = date => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};

export const getNext = (duration, currentDate) => {
  switch (duration) {
    case "decade":
      return getNextDecade(currentDate);
    case "year":
      return getNextYear(currentDate);
    default:
      return getNextMonth(currentDate);
  }
};

export const getPrevious = (duration, currentDate) => {
  switch (duration) {
    case "decade":
      return getPreviousDecade(currentDate);
    case "year":
      return getPreviousYear(currentDate);
    default:
      return getPreviousMonth(currentDate);
  }
};

export const get = (direction, duration, currentDate) => {
  return direction === "next"
    ? getNext(duration, currentDate)
    : getPrevious(duration, currentDate);
};

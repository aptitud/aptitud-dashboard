export type Month = {
  from: Date;
  to: Date;
};

export const getMonths = (date: Date, numberOfMonth: number): Month[] => {
  const months = new Array<Month>(numberOfMonth);

  for (let index = 0; index < numberOfMonth; index++) {
    months[index] = {
      from: getFirstDateInMonth(date, index),
      to: getLastDateInMonth(date, index),
    };
  }
  return months;
};

const getFirstDateInMonth = (date: Date, monthOffset: number) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  return new Date(Date.UTC(year, month + monthOffset, 1));
};

const getLastDateInMonth = (date: Date, monthOffset: number) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  return new Date(Date.UTC(year, month + 1 + monthOffset, 0));
};

export const formatDate = (date?: Date, pattern?: string) => {
  if (!date) {
    return "";
  }
  if (pattern === "yyyy-mm-dd") {
    return date.toLocaleDateString("sv-SE", { year: "numeric", month: "2-digit", day: "2-digit" });
  } else {
    return date.toLocaleDateString("sv-SE", { year: "numeric", month: "2-digit" });
  }
};

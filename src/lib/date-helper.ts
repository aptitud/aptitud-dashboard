export type Month = {
    from: Date;
    to: Date;
};

export const getMonths = (date: Date, numberOfMonth: number): Month[] => {
    let months = new Array<Month>(numberOfMonth);

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

type Props = {
  currentDate: Date;
};
export function MonthHeader({ currentDate }: Props) {
  const months = getMonthArray(currentDate);
  return (
    <>
      {months.map((month) => (
        <div key={month} className="p-1 rounded-t-md border-x-2 border-t-2 overflow-hidden">
          {month}
        </div>
      ))}
    </>
  );
}

const getMonthArray = (date: Date) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
  const currentMonthIndex = date.getMonth();

  // Create array starting from current month + remaining months + months before current month
  return [...monthNames.slice(currentMonthIndex), ...monthNames.slice(0, currentMonthIndex)];
};

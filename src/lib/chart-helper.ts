import { FinanceRowData } from "@/types/finance-types";

export const calculateYAxisValues = (chartData: FinanceRowData[]) => {
  const allValues = [
    ...chartData.flatMap((p) => p.revenue),
    ...chartData.flatMap((p) => p.result),
    ...chartData.flatMap((p) => p.liquidity),
    ...chartData.flatMap((p) => p.employees),
  ].filter((p) => p !== undefined);

  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  const startValue = Math.floor(minValue / 1000000) * 1000000;
  const endValue = Math.ceil(maxValue / 1000000) * 1000000;
  const millionValues = Array.from(
    { length: (endValue - startValue) / 2000000 + 1 },
    (_, index) => startValue + index * 2000000,
  );
  // Set the max axis value a bit higher than the real max value this so that chart looks a bit nicer for the max value
  return { min: minValue, max: maxValue + 100000, ticks: millionValues };
};

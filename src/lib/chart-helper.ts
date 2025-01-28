import { FinanceRowData } from "@/types/finance-types";

export const calculateYAxisValues = (chartData: FinanceRowData[]) => {
  const allValues = [
    ...chartData.flatMap((p) => p.revenue),
    ...chartData.flatMap((p) => p.result),
    ...chartData.flatMap((p) => p.liquidity),
    ...chartData.flatMap((p) => p.employees),
  ].filter((p) => p !== undefined);

  const minValue = allValues.sort((a, b) => a - b)[0];
  const maxValue = allValues.sort((a, b) => b - a)[0];

  const startValue = Math.floor(minValue / 1000000) * 1000000;
  const endValue = Math.ceil(maxValue / 1000000) * 1000000;
  const millionValues = Array.from(
    { length: (endValue - startValue) / 2000000 + 1 },
    (_, index) => startValue + index * 2000000,
  );
  return { min: minValue, max: maxValue, ticks: millionValues };
};

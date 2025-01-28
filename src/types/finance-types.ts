export interface FinanceRowData {
  date: Date | undefined;
  revenue?: number;
  result?: number;
  liquidity?: number;
  employees?: number;
}
export interface FinanceData {
  data: FinanceRowData[];
}

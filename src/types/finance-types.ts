interface MonthData {
    date: Date | undefined;
    revenue: number;
    result: number;
    liquidity: number;
    numberOfEmployees: number;
}
export interface FinanceData {
    data: {
        monthData: MonthData[];
    };
}

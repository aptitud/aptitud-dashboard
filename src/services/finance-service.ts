import { FinanceData } from "@/types/finance-types";
import { googleConfig } from "@/configs/google-config";
import { getFinanceSheetData } from "./google-sheets";

export const getFinance = async (): Promise<FinanceData> => {
    const financeData = await getFinanceSheetData(googleConfig.FinanceSheetId);

    const values = financeData?.values.filter((p) => !!p[0]);

    return {
        data:
            values?.map((value) => ({
                date: getDateFromSerialFormat(value[0]),
                revenue: value[1],
                result: value[2],
                liquidity: value[3],
                employees: value[5],
            })) ?? [],
    };
};

const getDateFromSerialFormat = (serialDate: number | undefined): Date | undefined => {
    if (!serialDate) return undefined;

    const baseDate = new Date(1899, 11, 31);
    return new Date(baseDate.getTime() + serialDate * 24 * 60 * 60 * 1000);
};

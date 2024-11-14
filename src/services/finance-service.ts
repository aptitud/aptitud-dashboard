import { FinanceData } from "@/types/finance-types";
import { googleConfig } from "@/configs/google-config";
import { getFinanceSheetData } from "./google-sheets";

export const getFinance = async (): Promise<FinanceData> => {
    const financeData = await getFinanceSheetData(googleConfig.FinanceSheetId);

    let values = financeData?.values.filter((p) => !!p[0]);

    return {
        data: {
            monthData:
                values?.map((value) => ({
                    date: getDateFromSerialFormat(value[0]),
                    revenue: value[1],
                    result: value[2],
                    liquidity: value[3],
                    numberOfEmployees: value[5],
                })) ?? [],
        },
    };
};

const getDateFromSerialFormat = (serialDate: number | undefined): Date | undefined => {
    if (!serialDate) return undefined;

    const baseDate = new Date(1899, 11, 31); // December 30, 1899
    return new Date(baseDate.getTime() + serialDate * 24 * 60 * 60 * 1000);
};

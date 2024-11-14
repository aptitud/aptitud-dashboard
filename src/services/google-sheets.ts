import { FinanceSheetData } from "@/types/sheet-types";
import { auth } from "@/auth";

const fetchOptions = (accessToken: string): RequestInit => {
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        next: { revalidate: 3600, tags: ["google-sheets"] },
    };
};

export const getFinanceSheetData = async (spreadsheetId: string): Promise<FinanceSheetData | undefined> => {
    const session = await auth();

    const accessToken = session?.accessToken ?? "";
    console.log({ accessToken });
    const range = "Sammanställning!A:F";
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=SERIAL_NUMBER`;
        console.log({ url });
        const response = await fetch(url, fetchOptions(accessToken));
        if (!response.ok) throw new Error(`Could not fetch data from Google Sheets for range ${range}`);

        const result: FinanceSheetData = await response.json();
        if (!result.values) return undefined;
        return { values: result.values };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch data from Google Sheets");
    }
};

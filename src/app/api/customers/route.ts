import { Customer } from "@/types/customer-types";
import { NextResponse } from "next/server";

export async function GET() {
    const data: Customer[] = [
        {
            name: "Tradera",
            trello: {
                url: "todo",
            },
            employees: [
                {
                    name: "Peter Qwärnström",
                    startDate: new Date("2021-12-13"),
                    endDate: new Date("2025-03-05"),
                },
                {
                    name: "Emil Ingridsson",
                    startDate: new Date("2020-12-13"),
                    endDate: new Date("2024-03-05"),
                },
            ],
        },
    ];

    return NextResponse.json(data, { status: 200 });
}

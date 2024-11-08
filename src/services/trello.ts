import { trelloConfig } from "@/configs/trello-config";
import { CustomerCard, EmployeeCard } from "./trello-types";

const config = trelloConfig();

const options: RequestInit = {
    headers: {
        "Content-Type": "application/json",
    },
    next: {
        revalidate: 3600, // Cache for 1 hour
    },
};

export const getCustomerCards = async (): Promise<CustomerCard[]> => {
    try {
        const url = getUrl(`lists/${config.ASSIGNMENTS_LIST_ID}/cards`);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Could not fetch customer cards from Trello");
        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch customer cards from Trello");
    }
};

export const getEmployeeCards = async (): Promise<EmployeeCard[]> => {
    try {
        const url = getUrl(`lists/${config.EMPLOYEES_BOARD_ID}/cards`);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Could not fetch employee cards from Trello");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch emloyee cards from Trello");
    }
};

const getUrl = (resource: string) => {
    return `https://trello.com/1/${resource}?key=${config.KEY}&token=${config.TOKEN}`;
};

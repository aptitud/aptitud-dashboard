import { trelloConfig } from "@/configs/trello-config";
import { CustomerCard, EmployeeCard } from "./trello-types";

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
        const url = getUrl(`lists/${trelloConfig.AssignmentsBoardId}/cards`);
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
        const url = getUrl(`lists/${trelloConfig.EmployeesBoarId}/cards`);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Could not fetch employee cards from Trello");
        const result: EmployeeCard[] = await response.json();
        return result.filter((p) => p.idMembers.length > 0);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch emloyee cards from Trello");
    }
};

const getUrl = (resource: string) => {
    return `https://trello.com/1/${resource}?key=${trelloConfig.Key}&token=${trelloConfig.Token}`;
};

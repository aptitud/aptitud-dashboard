import { trelloConfig } from "@/configs/trello-config";
import { CustomerCard, EmployeeCard, Member } from "./trello-types";

const fetchOptions: RequestInit = {
    headers: {
        "Content-Type": "application/json",
    },
    next: { revalidate: 3600, tags: ["trello"] },
};

export const getCustomerCards = async (): Promise<CustomerCard[]> => {
    try {
        const url = getUrl(`lists/${trelloConfig.AssignmentsBoardId}/cards`);
        const response = await fetch(url, fetchOptions);
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
        const response = await fetch(url, fetchOptions);
        if (!response.ok) throw new Error("Could not fetch employee cards from Trello");
        const result: EmployeeCard[] = await response.json();
        return result.filter((p) => p.idMembers.length > 0);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch emloyee cards from Trello");
    }
};

export const getMembers = async (): Promise<Member[]> => {
    try {
        const url = getUrl(`organizations/${trelloConfig.OrganizationId}/members`, "fullName,avatarUrl");
        console.log({ url });
        const response = await fetch(url, fetchOptions);
        if (!response.ok) throw new Error("Could not fetch members from Trello");
        const a = await response.json();
        console.log(JSON.stringify(a, null, 2));
        return a;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch members from Trello");
    }
};

const getUrl = (resource: string, fields?: string) => {
    let url = `https://api.trello.com/1/${resource}?`;
    url += fields ? `fields=${fields}&` : "";
    url += `key=${trelloConfig.Key}&token=${trelloConfig.Token}`;

    return url;
};

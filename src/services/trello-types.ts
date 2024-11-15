export type CustomerCard = {
    id: string;
    name: string;
    shortUrl: string;
    idMembers: string[];
    desc: string;
};

export type EmployeeCard = {
    id: string;
    name: string;
    shortUrl: string;
    idMembers: string[];
    desc: string;
};

export type Member = {
    id: string;
    fullName: string;
    avatarUrl: string;
};

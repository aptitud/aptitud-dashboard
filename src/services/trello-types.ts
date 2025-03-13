export type CustomerCard = {
  id: string;
  name: string;
  coordinates: { latitude: number; longitude: number } | undefined;
  locationName: string;
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

export type CommentData = {
  id: string;
  date: Date;
  data: {
    text: string;
  };
  memberCreator: {
    id: string;
    fullName: string;
  };
};

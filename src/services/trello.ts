import { trelloConfig } from "@/configs/trello-config";
import { CustomerCard, EmployeeCard, Member, CommentData } from "./trello-types";
import { cleanupCommentText, isActiveCustomerComment } from "@/lib/comment-helper";

const fetchOptions: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
  next: { revalidate: 3600, tags: ["trello", "external-data"] },
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
    const url = getUrl(`organizations/${trelloConfig.OrganizationId}/members`, { fields: "fullName,avatarUrl" });
    const response = await fetch(url, fetchOptions);
    if (!response.ok) throw new Error("Could not fetch members from Trello");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch members from Trello");
  }
};

interface BatchResponse {
  "200": CommentData[];
}

async function executeBatchRequests(urls: string[], cache = true): Promise<BatchResponse[]> {
  // Trello has a limit of 10 URLs per batch request
  const batchSize = 10;
  const batches = [];

  for (let i = 0; i < urls.length; i += batchSize) {
    const batchUrls = urls.slice(i, i + batchSize);
    const urlsParam = encodeURIComponent(batchUrls.join(","));

    const response = await fetch(
      `https://api.trello.com/1/batch?urls=${urlsParam}&key=${trelloConfig.Key}&token=${trelloConfig.Token}`,
      cache ? fetchOptions : undefined,
    );

    if (!response.ok) {
      throw new Error(`Batch request failed: ${response.statusText}`);
    }

    const batchResults = await response.json();
    batches.push(...batchResults);
  }

  return batches;
}

export async function getMemberComments(
  cardIds: string[],
  since?: Date,
  limit = 5,
  cache = true,
): Promise<Record<string, CommentData[]>> {
  const params = {
    filter: "commentCard",
    since: since ? since.toISOString().split("T")[0] : "",
    limit: limit.toString(),
    fields: "id,data,date",
    memberCreator_fields: "id,fullName",
  };
  const urls = cardIds.map((id) => `/cards/${id}/actions?${new URLSearchParams(params)}`);

  const batchResults = await executeBatchRequests(urls, cache);
  const commentsByCard: Record<string, CommentData[]> = {};

  cardIds.forEach((cardId, index) => {
    const result = batchResults[index];
    if (result && result["200"]) {
      // Only include comments with a specific emoji but don't shoe the emoji on dashboard
      commentsByCard[cardId] = result["200"]
        .filter((c) => isActiveCustomerComment(c.data?.text))
        .map((c) => ({
          ...c,
          data: {
            text: cleanupCommentText(c.data.text),
          },
        }));
    } else {
      commentsByCard[cardId] = [];
    }
  });

  return commentsByCard;
}

const getUrl = (resource: string, options?: { fields?: string; filter?: string }) => {
  let url = `https://api.trello.com/1/${resource}?`;
  url += options?.fields ? `fields=${options.fields}&` : "";
  url += options?.filter ? `filter=${options.filter}&` : "";
  url += `key=${trelloConfig.Key}&token=${trelloConfig.Token}`;

  return url;
};

"use server";

import { revalidateTag } from "next/cache";

export async function refreshAll() {
    refreshTrello();
    refreshGoogle();
}

export async function refreshTrello() {
    revalidateTag("trello");
}

export async function refreshGoogle() {
    revalidateTag("google");
}

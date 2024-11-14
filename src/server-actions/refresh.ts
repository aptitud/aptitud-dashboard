"use server";

import { revalidateTag } from "next/cache";

export async function refreshAll() {
    refreshTrello();
    refreshGoogleMaps();
    refreshGoogleSheets();
}

export async function refreshTrello() {
    revalidateTag("trello");
}

export async function refreshGoogleMaps() {
    revalidateTag("google-maps");
}

export async function refreshGoogleSheets() {
    revalidateTag("google-sheets");
}

"use server";

import { revalidateTag } from "next/cache";

export async function refreshAll() {
  revalidateTag("external-data");
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

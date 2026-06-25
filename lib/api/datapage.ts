// /lib/api/datapage.ts

import { DataPageDocument } from "@/model/datapage";

export async function getDataPages() {
  const res = await fetch("/api/datapage");

  if (!res.ok) {
    throw new Error("Failed to fetch datapages");
  }

  return res.json() as Promise<DataPageDocument[]>;
}

export async function createDataPage(data: Partial<DataPageDocument>) {
  const res = await fetch("/api/datapage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create datapage");
  }

  return res.json() as Promise<DataPageDocument>;
}

export async function updateDataPage(id: string, data: Partial<DataPageDocument>) {
  const res = await fetch(`/api/datapage/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update datapage");
  }

  return res.json() as Promise<DataPageDocument>;
}

export async function deleteDataPage(id: string) {
  const res = await fetch(`/api/datapage/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete datapage");
  }

  return res.json();
}

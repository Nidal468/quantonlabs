import { PackageDocument } from "@/model/package";

export async function getPackages() {
  const res = await fetch("/api/package");

  if (!res.ok) {
    throw new Error("Failed to fetch packages");
  }

  return res.json() as Promise<PackageDocument[]>;
}

export async function createPackage(data: Partial<PackageDocument>) {
  const res = await fetch("/api/package", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create package");
  }

  return res.json() as Promise<PackageDocument>;
}

export async function updatePackage(
  id: string,
  data: Partial<PackageDocument>
) {
  const res = await fetch(`/api/package?id=${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update package");
  }

  return res.json() as Promise<PackageDocument>;
}

export async function deletePackage(id: string) {
  const res = await fetch(`/api/package?id=${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete package");
  }

  return res.json();
}

// /lib/api/workspace.ts

export async function getWorkspaces() {
  const res = await fetch("/api/workspace");
  if (!res.ok) throw new Error("Failed to fetch workspaces");
  return res.json();
}

export async function createWorkspace(name: string) {
  const res = await fetch("/api/workspace", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("Failed to create workspace");
  return res.json();
}

export async function updateWorkspace(id: string, data: any) {
  const res = await fetch(`/api/workspace/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update workspace");
  return res.json();
}

export async function deleteWorkspace(id: string) {
  const res = await fetch(`/api/workspace/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete workspace");
  return res.json();
}
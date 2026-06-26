// /lib/api/workspace.ts

export async function getWorkspaces() {
  const res = await fetch("/api/workspace");
  if (!res.ok) throw new Error("Failed to fetch workspaces");
  return res.json();
}

export async function getWorkspaceTasks(id: string) {
  const res = await fetch(`/api/workspace/task?id=${id}`);
  if (!res.ok) throw new Error("Failed to fetch workspaces");
  return res.json();
}

export async function getWorkspaceDatapages(id: string) {
  const res = await fetch(`/api/workspace/datapage?id=${id}`);
  if (!res.ok) throw new Error("Failed to fetch workspaces");
  return res.json();
}

export async function createWorkspace(name: string) {
  const res = await fetch("/api/workspace", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
    cache: "no-store"
  });

  if (!res.ok) throw new Error("Failed to create workspace");
  return res.json();
}

export async function updateWorkspace(id: string, data: any) {
  const res = await fetch(`/api/workspace/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update workspace");
  return res.json();
}

export async function deleteWorkspace(id: string) {
  try {
    const res = await fetch(`/api/workspace/${id}`, {
      method: "DELETE",
      cache: "no-store"
    });

    if (!res.ok) throw new Error("Failed to delete workspace");
    return res.json();
  } catch (error) {
    console.log(error)
  }
}

export async function generateKeyWorkspace(id: string, name: string) {
  try {
    const res = await fetch(`/api/workspace/key/${id}`, {
      method: "POST",
      body: JSON.stringify({name}),
      cache: "no-store"
    });

    if (!res.ok) throw new Error("Failed to delete workspace");
    return res.json();
  } catch (error) {
    console.log(error)
  }
}

export async function removekey(id: string, keyId: string) {
  try {
    const res = await fetch(`/api/workspace/key/${id}`, {
      method: "DELETE",
      body: JSON.stringify({keyId}),
      cache: "no-store"
    });

    if (!res.ok) throw new Error("Failed to delete workspace");
    return res.json();
  } catch (error) {
    console.log(error)
  }
}
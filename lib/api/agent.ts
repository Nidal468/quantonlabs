export async function getAgents() {
  const res = await fetch("/api/agent");

  if (!res.ok) throw new Error("Failed to fetch agents");
  return res.json();
}

export async function getAgent(id: string) {
  const res = await fetch(`/api/agent/${id}`);

  if (!res.ok) throw new Error("Failed to fetch agent");
  return res.json();
}

export async function createAgent(data: any) {
  const res = await fetch("/api/agent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create agent");
  return res.json();
}

export async function updateAgent(id: string, data: any) {
  const res = await fetch(`/api/agent/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update agent");
  return res.json();
}

export async function deleteAgent(id: string) {
  const res = await fetch(`/api/agent/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete agent");
  return res.json();
}
import { IMessage } from "@/model/message";

export async function getMessages() {
  const res = await fetch("/api/message");

  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }

  return res.json() as Promise<IMessage[]>;
}

export async function createMessage(data: Partial<IMessage>) {
  const res = await fetch("/api/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create message");
  }

  return res;
}

export async function updateMessage(id: string, data: Partial<IMessage>) {
  const res = await fetch(`/api/message?id=${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update message");
  }

  return res.json() as Promise<IMessage>;
}

export async function deleteMessage(id: string) {
  const res = await fetch(`/api/message?id=${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete message");
  }

  return res.json();
}

// lib/api/user.ts

import { UserDocument } from "@/model/user";

// GET all users
export async function getUsers(): Promise<UserDocument[]> {
  const res = await fetch("/api/user");

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
}

// GET single user
export async function getUser(id: string): Promise<UserDocument> {
  const res = await fetch(`/api/user/${id}`);

  if (!res.ok) throw new Error("Failed to fetch user");

  return res.json();
}

// CREATE user
export async function createUser(data: Partial<UserDocument>) {
  const res = await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create user");

  return res.json();
}

// UPDATE user
export async function updateUser(
  id: string,
  data: Partial<UserDocument>
) {
  const res = await fetch(`/api/user/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update user");

  return res.json();
}

// DELETE user
export async function deleteUser(id: string) {
  const res = await fetch(`/api/user/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete user");

  return res.json();
}
"use server";

import { User } from "@/db/schema/users";
import { authClient } from "@/features/auth/auth-client";

export async function fetchUsers(limit?: number): Promise<User[]> {
  const response = await authClient.admin.listUsers({
    query: { limit: limit ?? 10 },
  });

  console.log(response);

  if (response.error) {
    console.log("Failed to fetch users", response.error?.message);
  }

  return (response?.data?.users as User[]) ?? [];
}

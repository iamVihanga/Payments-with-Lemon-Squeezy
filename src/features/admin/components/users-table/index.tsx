"use client";

import React, { useEffect, useState, useTransition } from "react";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { User } from "@/db/schema/users";
import { authClient } from "@/features/auth/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function UsersTable() {
  const [isFetching, startFetching] = useTransition();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const handleFetchUsers = () => {
    startFetching(async () => {
      const response = await authClient.admin.listUsers({
        query: { limit: 10 },
      });

      if (response.error) {
        toast.error(response.error.message);
      }

      setUsers((response?.data?.users as User[]) || []);
    });
  };

  return <DataTable isLoading={isFetching} columns={columns} data={users} />;
}

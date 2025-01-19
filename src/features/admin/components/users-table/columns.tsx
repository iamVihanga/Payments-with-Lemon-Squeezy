"use client";

import { ColumnDef } from "@tanstack/react-table";

import { type User } from "@/db/schema/users";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "emailVerified",
    header: "Verified",
  },
  {
    accessorKey: "premium",
    header: "Premium",
  },
  {
    accessorKey: "banned",
    header: "Status",
    cell: ({ row }) => {
      if (row.original.banned) {
        return <span className="text-red-600">Banned</span>;
      } else {
        return <span className="text-green-500">Active</span>;
      }
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString();
    },
  },

  //   Actions Column
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const rowData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log(`View ${rowData.id}`)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log(`Edit ${rowData.id}`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => console.log(`Delete ${rowData.id}`)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

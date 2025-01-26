import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManagePlansLoading() {
  return (
    <div className="grid sm:grid-cols-4 grid-cols-1 gap-4">
      <Skeleton className="h-56 rounded-lg" />
      <Skeleton className="h-56 rounded-lg" />
      <Skeleton className="h-56 rounded-lg" />
      <Skeleton className="h-56 rounded-lg" />
    </div>
  );
}

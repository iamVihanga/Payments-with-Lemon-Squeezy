import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="w-full max-w-7xl grid grid-cols-4 gap-3">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="w-full h-72 rounded-lg" />
        ))}
    </div>
  );
}

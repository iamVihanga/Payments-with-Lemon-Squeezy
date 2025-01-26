"use client";

import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { syncPlans } from "../actions/sync-plans";

export default function SyncPlanButton({ className }: { className?: string }) {
  const [isSyncing, startSyncing] = useTransition();
  const router = useRouter();

  const handleStartSync = () => {
    startSyncing(async () => {
      // Fake async syncing
      await syncPlans();

      toast.success("Plans synced successfully");
      router.refresh();
    });
  };

  return (
    <Button
      disabled={isSyncing}
      variant={"yellow"}
      onClick={handleStartSync}
      className={cn(className)}
    >
      <RefreshCcw className={`size-4 ${isSyncing && "animate-spin"}`} />
      Sync Plan
    </Button>
  );
}

import React, { Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ManagePlansLoading from "./loading";

import SyncPlanButton from "@/features/plans/components/sync-plan-button";

type Props = {
  children: React.ReactNode;
};

export default function ManagePlansLayouts({ children }: Props) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <div className="space-y-3">
            <CardTitle>Subscription Plans</CardTitle>
            <CardDescription>
              Manage subscription plans in the system
            </CardDescription>
          </div>

          <SyncPlanButton />
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<ManagePlansLoading />}>{children}</Suspense>
      </CardContent>
    </Card>
  );
}

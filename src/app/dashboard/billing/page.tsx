import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { PlansSection } from "@/features/plans/components/plans-list";

type Props = {};

export default async function BillingPage({}: Props) {
  return (
    <Card className="flex-1 border-none">
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <div className="space-y-3">
            <CardTitle>Subscription Plans</CardTitle>
            <CardDescription>
              Manage subscription plans in the system
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={
            <div className="grid sm:grid-cols-4 grid-cols-1 gap-4">
              <Skeleton className="h-56 rounded-lg" />
              <Skeleton className="h-56 rounded-lg" />
              <Skeleton className="h-56 rounded-lg" />
              <Skeleton className="h-56 rounded-lg" />
            </div>
          }
        >
          <PlansSection />
        </Suspense>
      </CardContent>
    </Card>
  );
}

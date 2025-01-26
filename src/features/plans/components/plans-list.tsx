import React, { Suspense } from "react";
import { XIcon } from "lucide-react";

import { fetchPlans } from "@/features/plans/actions/fetch-plans";
import { PlanCard } from "@/features/plans/components/plan-card";
import { Card, CardContent } from "@/components/ui/card";
import { SubscriptionButton } from "./subscription-button";

// Separate async component for plans section
export async function PlansSection() {
  const { data: plans, error: plansError } = await fetchPlans();

  if (plansError || !plans) {
    return (
      <Card className="p-0 px-20 mt-5">
        <CardContent className="p-4 h-52 flex items-center justify-center flex-col">
          <div className="bg-red-500/20 p-4 rounded-full mb-4">
            <XIcon className="size-6 text-red-500" />
          </div>

          <div className="space-y-2 flex flex-col items-center">
            <h2 className="font-heading text-2xl font-bold">
              {plansError || "Something went wrong!"}
            </h2>
            <p className="text-muted-foreground text-sm">
              Error fetching subscription plans. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-7xl grid grid-cols-4 gap-3">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          name={plan.productName!}
          description={plan.description!}
          features={[]}
          price={`$${Number(plan.price!) / 100}`}
          actionButton={<SubscriptionButton plan={plan} />}
        />
      ))}
    </div>
  );
}

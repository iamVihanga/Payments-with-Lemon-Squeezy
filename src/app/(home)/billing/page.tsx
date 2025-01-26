import React, { Suspense } from "react";
import { BellDotIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Loading from "../_components/loading";
import { PlansSection } from "@/features/plans/components/plans-list";

export default function BillingPage() {
  return (
    <div className="space-y-4 flex flex-col items-center justify-start h-screen py-12">
      <div className="space-y-2 flex flex-col items-center mb-14">
        <Button variant={"yellow"} size="icon">
          <BellDotIcon className="size-4" />
        </Button>

        <h1 className="font-heading text-3xl font-bold">Subscription Plans</h1>
        <p className="text-sm text-muted-foreground">
          Choose from our range of subscription plans that suit your business
          needs.
        </p>
      </div>

      {/* Subscription plans section */}
      <Suspense fallback={<Loading />}>
        <PlansSection />
      </Suspense>
    </div>
  );
}

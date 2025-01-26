import { fetchPlans } from "@/features/plans/actions/fetch-plans";
import { PlanCard } from "@/features/plans/components/plan-card";
import React from "react";

export default async function ManagePlans() {
  const { data, error } = await fetchPlans();

  if (error || !data) {
    return <div>{error || " Error fetching plans"}</div>;
  }

  return (
    <div className="grid sm:grid-cols-4 grid-cols-1 gap-4">
      {data.map((plan) => (
        <PlanCard
          key={plan.id}
          name={plan.productName!}
          description={plan.description!}
          features={[]}
          price={`$${Number(plan.price!) / 100}`}
        />
      ))}
    </div>
  );
}

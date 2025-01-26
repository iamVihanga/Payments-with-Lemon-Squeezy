"use server";

import { db } from "@/db";
import { PlanInput, plans } from "@/db/schema/plan";

export async function upsertPlan(plan: PlanInput) {
  try {
    await db
      .insert(plans)
      .values(plan)
      .onConflictDoUpdate({
        target: plans.variantId,
        set: {
          ...plan,
        },
      });

    console.log(`${plan.productName} - Synced with Database`);
  } catch (err) {
    console.error("Error upserting plan", err);
  }
}

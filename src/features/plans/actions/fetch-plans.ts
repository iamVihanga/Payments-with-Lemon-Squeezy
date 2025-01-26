"use server";

import { headers } from "next/headers";

import { auth } from "@/auth";
import { db } from "@/db";
import { plans } from "@/db/schema";

export async function fetchPlans() {
  try {
    // const session = await auth.api.getSession({
    //   headers: await headers(),
    // });

    // if (!session) {
    //   return { error: "Unauthroized" };
    // }

    const data = await db.select().from(plans);

    let sortedPlans = data.sort((a, b) => {
      return parseInt(a.price!) - parseInt(b.price!);
    });

    return {
      data: sortedPlans,
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
}

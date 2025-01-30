"use server";

import crypto from "node:crypto";

import { NewWebhookEvent, webhookEvents } from "@/db/schema/webhookEvents";
import { db } from "@/db";
import { plans } from "@/db/schema";

export async function storeWebhookEvent(
  eventName: string,
  body: NewWebhookEvent["body"]
) {
  if (!process.env.DATABASE_URL) {
    return { error: "Missing DATABASE_URL env variable" };
  }

  const id = crypto.randomInt(100000000, 1000000000).toString();

  const relatedValue = await db
    .insert(webhookEvents)
    .values({
      id,
      eventName,
      processed: false,
      body,
    })
    .onConflictDoNothing({ target: plans.id })
    .returning();

  return { data: relatedValue[0] };
}

import { pgTable, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const generateWebhookId = () => {
  const WEBHOOK_ID_PREFIX = "webhook_";

  return `${WEBHOOK_ID_PREFIX}${nanoid()}`;
};

export const webhookEvents = pgTable("webhook_events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateWebhookId()),
  eventName: text("event_name"),
  processed: boolean("processed").default(false),
  body: jsonb("body"),
  processingError: text("processing_error"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

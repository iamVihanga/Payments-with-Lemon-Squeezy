import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

import { plans } from "./plan";
import { users } from "./users";

export const generateSubscriptionId = () => {
  const SUBSCRIPTION_ID_PREFIX = "subscription_";

  return `${SUBSCRIPTION_ID_PREFIX}${nanoid()}`;
};

export const subscriptions = pgTable("subscriptions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateSubscriptionId()),
  lemonSqueezyId: text("lemonSqueezyId").unique(),
  orderId: integer("orderId").notNull(),
  name: text("name"),
  email: text("email"),
  status: text("status"),
  statusFormatted: text("statusFormatted"),
  renewsAt: text("renewsAt"),
  endsAt: text("endsAt"),
  trialEndsAt: text("trialEndsAt"),
  price: text("price"),
  isUsageBased: boolean("isUsageBased").default(false),
  isPaused: boolean("isPaused").default(false),
  subscriptionItemId: text("subscriptionItemId"),

  planId: text("planId")
    .notNull()
    .references(() => plans.id, { onDelete: "cascade" }),

  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  plan: one(plans, { fields: [subscriptions.planId], references: [plans.id] }),
  user: one(users, { fields: [subscriptions.userId], references: [users.id] }),
}));

export type NewSubscription = typeof subscriptions.$inferInsert;

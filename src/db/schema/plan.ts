import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { nanoid } from "nanoid";

import { subscriptions } from "./subscriptions";

export const generatePlanId = () => {
  const PLAN_ID_PREFIX = "plan_";

  return `${PLAN_ID_PREFIX}${nanoid()}`;
};

export const plans = pgTable("plans", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generatePlanId()),
  productId: text("productId"),
  productName: text("productName"),
  variantId: text("variantId").unique(),
  name: text("name"),
  description: text("description"),
  price: text("price"),
  isUsageBased: boolean("isUsageBased").default(false),
  interval: text("interval"),
  intervalCount: integer("intervalCount"),
  trialInterval: text("trialInterval"),
  trialIntervalCount: integer("trialIntervalCount"),
  sort: integer("sort").default(0),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const plansRelations = relations(plans, ({ many }) => ({
  subscriptions: many(subscriptions),
}));

// Plans Type
export type Plan = typeof plans.$inferSelect;

export type PlanInput = typeof plans.$inferInsert;

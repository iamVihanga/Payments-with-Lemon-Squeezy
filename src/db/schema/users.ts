import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { InferSelectModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").notNull().primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// Zod Schema for user model
export const baseSchema = createInsertSchema(users, {
  fullName: (schema) =>
    schema.min(3, {
      message: "Your name must be at least 3 characters long !",
    }),
  password: (schema) =>
    schema.min(6, {
      message: "Password must be at least 6 characters long !",
    }),
  email: (schema) => schema.email({ message: "Email is invalid !" }),
}).pick({
  fullName: true,
  password: true,
  email: true,
});

export type SelectUserModel = InferSelectModel<typeof users>;

// Zod Schema for update
// export const updateSchema = z.object({
//   fullName: baseSchema.shape.fullName,
//   id: z.number().min(1),
// });

// export type UpdateSchemaT = z.infer<typeof updateSchema>;

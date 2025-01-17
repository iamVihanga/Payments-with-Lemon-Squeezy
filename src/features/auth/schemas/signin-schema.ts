import { z } from "zod";
import { baseSchema } from "@/db/schema/users";

// Zod Schema for sign in
export const signInSchema = z.object({
  email: baseSchema.shape.email,
  password: baseSchema.shape.password,
});

export type SignInSchemaT = z.infer<typeof signInSchema>;

import { z } from "zod";
import { baseSchema } from "@/db/schema/users";

// Zod Schema for sign up
export const signupSchema = z
  .object({
    fullName: baseSchema.shape.fullName,
    email: baseSchema.shape.email,
    password: baseSchema.shape.password,
    confirmPassword: z.string().min(1, "Confirm password is required !"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match !",
    path: ["confirmPassword"],
  });

export type SignupSchemaT = z.infer<typeof signupSchema>;

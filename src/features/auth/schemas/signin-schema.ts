import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address !",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long !",
  }),
});

export type SigninSchemaT = z.infer<typeof signinSchema>;

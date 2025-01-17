import { z } from "zod";

const envSchema = z.object({
  BETTER_AUTH_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),

  DATABASE_URL: z.string().min(1),
});

const env = envSchema.parse(process.env);

export default env;

export type Environment = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Environment {}
  }
}

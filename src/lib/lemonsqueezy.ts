import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

export const configureLemonSqueezy = () => {
  const requiredVars = [
    "LEMON_SQUEEZY_STORE_ID",
    "LEMON_SQUEEZY_WEBHOOK_SECRET",
    "LEMON_SQUEEZY_API_KEY",
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      "Missing required environment variables: " + missingVars.join(", ")
    );
  }

  lemonSqueezySetup({
    apiKey: process.env.LEMON_SQUEEZY_API_KEY,
    onError: (error) => {
      throw new Error(`Lemon Squeezy API Error: ${error.message}`);
    },
  });
};

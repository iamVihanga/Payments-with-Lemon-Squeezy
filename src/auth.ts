import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI, admin } from "better-auth/plugins";

import * as schema from "@/db/schema";
import { db } from "./db";
import { resend } from "@/lib/resend";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      user: schema.users,
    },
    usePlural: true,
  }),
  user: {
    additionalFields: {
      premium: {
        type: "boolean",
        required: false,
      },
    },
  },
  plugins: [openAPI(), admin()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,

    // This function is called when a user request reset password link
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [user.email],
        subject: "Reset your password",
        html: '<a href="' + url + '">Reset password</a>',
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    // This function is called when a user signs up and the email verification
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;

      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [user.email],
        subject: "Verify your email address",
        html: '<a href="' + verificationUrl + '">Verify your email address</a>',
      });
    },
  },
  socialProviders: {
    github: {
      enabled: true,
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});

export type Session = typeof auth.$Infer.Session;

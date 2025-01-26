"use server";

import { headers } from "next/headers";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

import { configureLemonSqueezy } from "@/lib/lemonsqueezy";
import { auth } from "@/auth";

export async function getCheckoutUrl(variantId: number, embed = false) {
  configureLemonSqueezy();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session?.session || !session.user) {
    console.log("Get Checkout URL Failed: Unauthorized");
    throw new Error("Unauthorized");
  }

  const checkout = await createCheckout(
    process.env.LEMON_SQUEEZY_STORE_ID!,
    variantId,
    {
      checkoutOptions: {
        embed,
        media: false,
        logo: !embed,
      },
      checkoutData: {
        email: session.user.email,
        custom: {
          user_id: session.user.id,
        },
      },
      productOptions: {
        enabledVariants: [variantId],
        redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/billing`,
        receiptButtonText: "Go to Dashboard",
        receiptThankYouNote: "Thank you for signing up to lemon squeezy app!",
      },
    }
  );

  return checkout.data?.data.attributes.url;
}

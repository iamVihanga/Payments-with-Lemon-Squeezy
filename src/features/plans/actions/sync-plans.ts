"use server";

import {
  listProducts,
  Variant,
  getProduct,
  listPrices,
} from "@lemonsqueezy/lemonsqueezy.js";

import { configureLemonSqueezy } from "@/lib/lemonsqueezy";
import { PlanInput } from "@/db/schema/plan";
import { upsertPlan } from "./upsert-plan";

export async function syncPlans() {
  configureLemonSqueezy();

  const products = await listProducts({
    filter: { storeId: process.env.LEMON_SQUEEZY_STORE_ID },
    include: ["variants"],
  });

  const allVariants = products.data?.included as Variant["data"][] | undefined;

  if (allVariants) {
    for (const v of allVariants) {
      const variant = v.attributes;

      const productName =
        (await getProduct(variant.product_id)).data?.data.attributes.name ?? "";
      const description =
        (await getProduct(variant.product_id)).data?.data.attributes
          .description ?? "";

      const variantPriceObject = await listPrices({
        filter: {
          variantId: v.id,
        },
      });

      const currentPriceObj = variantPriceObject.data?.data[0];
      const isUsageBased =
        currentPriceObj?.attributes.usage_aggregation !== null;
      const interval = currentPriceObj?.attributes.renewal_interval_unit;
      const intervalCount =
        currentPriceObj?.attributes.renewal_interval_quantity;
      const trialInterval = currentPriceObj?.attributes.trial_interval_unit;
      const trialIntervalCount =
        currentPriceObj?.attributes.trial_interval_quantity;

      const price = isUsageBased
        ? currentPriceObj?.attributes.unit_price_decimal
        : currentPriceObj.attributes.unit_price;

      const priceString = price !== null ? price?.toString() ?? "" : "";

      const isSubscription =
        currentPriceObj?.attributes.category === "subscription";

      if (!isSubscription) {
        continue;
      }

      // Call to add variant function
      const plan: PlanInput = {
        name: variant.name,
        description: description,
        price: priceString,
        interval: interval ?? null,
        intervalCount: intervalCount ?? null,
        isUsageBased: isUsageBased,
        productId: variant.product_id.toString(),
        productName: productName,
        trialInterval: trialInterval ?? null,
        trialIntervalCount: trialIntervalCount ?? null,
        sort: variant.sort,
        variantId: v.id,
      };

      console.log(plan);

      // Call to upsert plan function
      await upsertPlan(plan);
    }
  }
}

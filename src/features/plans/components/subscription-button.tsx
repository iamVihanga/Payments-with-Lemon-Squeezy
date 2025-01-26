"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

import { type PlanInput } from "@/db/schema/plan";

import { getCheckoutUrl } from "@/features/plans/actions/get-checkout-url";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SubscriptionButtonProps {
  plan: PlanInput;
  currentPlan?: PlanInput;
  embed?: boolean;
}

export function SubscriptionButton({
  plan,
  currentPlan,
  embed,
}: SubscriptionButtonProps) {
  const [isPending, startAction] = useTransition();
  const router = useRouter();
  const isCurrent = plan.id === currentPlan?.id;

  const label = isCurrent ? "Your plan" : "Sign up";

  useEffect(() => {
    if (typeof window.createLemonSqueezy === "function") {
      window.createLemonSqueezy();
    }
  }, []);

  const handleSubscription = () => {
    startAction(async () => {
      let checkoutUrl: string | undefined = "";

      try {
        const variantId = parseInt(plan.variantId!);

        checkoutUrl = await getCheckoutUrl(variantId, embed);
      } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
          toast.error("You need to be logged in to sign up for a plan.");
          router.push("/signin?redirect_to=billing");
          return;
        }

        toast.error("Error creating a checkout.", {
          description: "Please check the server console for more information.",
        });
      }

      embed
        ? checkoutUrl && window.LemonSqueezy.Url.Open(checkoutUrl)
        : router.push(checkoutUrl ?? "/");
    });
  };

  return (
    <Button
      loading={isPending}
      onClick={handleSubscription}
      className={cn("w-full")}
    >
      {label}
    </Button>
  );
}

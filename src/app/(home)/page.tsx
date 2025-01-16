import React from "react";

import { PlanCard } from "@/features/payments/components/plan-card";
import { plans } from "@/lib/mock-data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Props = {};

export default function Homepage({}: Props) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div>
        <div className="container px-4 py-12 mx-auto">
          <div className="flex justify-center mb-8">
            <Image
              src="/assets/Logo-Black.png"
              alt="Lemon Squeezy"
              width={240}
              height={48}
              className="block dark:hidden"
            />
            <Image
              src="/assets/Logo-White.png"
              alt="Lemon Squeezy"
              width={240}
              height={48}
              className="hidden dark:block"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold font-heading tracking-tighter sm:text-5xl md:text-6xl mb-4">
            Subscription Payments Made Simple
          </h1>
          <p className="text-xl text-muted-foreground">
            Start accepting subscription payments in minutes with our
            easy-to-use platform.
          </p>

          <div className="flex justify-center mt-8">
            <Button className="w-fit group" variant={"yellow"}>
              Get Started
              <ArrowRight className="size-4 group-hover:ml-2 transition-all duration-100 ease-in-out" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* Plan cards */
}
{
  /* <div className="container mx-auto py-12">
    <h2 className="text-3xl font-bold text-center mb-8 font-heading">
      Choose Your Plan
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan, index) => (
        <PlanCard key={index} {...plan} />
      ))}
    </div>
  </div> */
}

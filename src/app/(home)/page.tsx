import React from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
            <Button className="w-fit group" variant={"yellow"} asChild>
              <Link href={"/dashboard"}>
                Get Started
                <ArrowRight className="size-4 group-hover:ml-2 transition-all duration-100 ease-in-out" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

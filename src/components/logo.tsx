import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import Image from "next/image";

type Props = { className?: string };

export function Logo({ className }: Props) {
  return (
    <Link
      href={"/"}
      className={`flex items-center gap-2 text-foreground w-fit ${className}`}
    >
      <Image
        src="/assets/Logo-Black.png"
        alt="Lemon Squeezy"
        width={140}
        height={28}
        className="block dark:hidden"
      />
      <Image
        src="/assets/Logo-White.png"
        alt="Lemon Squeezy"
        width={140}
        height={28}
        className="hidden dark:block"
      />
    </Link>
  );
}

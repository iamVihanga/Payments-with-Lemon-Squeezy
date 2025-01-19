import { headers } from "next/headers";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardAdminLayout({
  children,
}: AdminLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex flex-col flex-1">{children}</div>
    </div>
  );
}

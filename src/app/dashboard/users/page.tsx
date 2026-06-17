import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { UsersContainer } from "@/components/dashboard/users-container";

export const metadata: Metadata = {
  title: "User Administration — Aether AI",
  description: "Manage registered operator accounts and role permissions.",
};

export default async function UsersAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return <UsersContainer currentUserId={session.user.id} />;
}

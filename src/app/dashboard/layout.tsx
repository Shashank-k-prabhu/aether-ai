import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-[#09090B] text-white overflow-hidden">
        {/* Desktop Sidebar (hidden on mobile) */}
        <aside className="hidden md:block w-64 shrink-0">
          <DashboardSidebar userRole={session.user?.role} />
        </aside>

        {/* Main Application Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <DashboardHeader session={session} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-zinc-950/30 relative">
            {/* Ambient background grid pattern or light glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(14,165,233,0.04) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10 p-6 md:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

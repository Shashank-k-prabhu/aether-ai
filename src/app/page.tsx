import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />


      <main className="flex-1 flex items-center justify-center mt-16">
        <p className="text-muted-foreground text-sm">Phase 3 marketing sections coming next…</p>
      </main>

      <Footer />
    </div>
  );
}

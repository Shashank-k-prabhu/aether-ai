import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/marketing/hero";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { TrustedBy } from "@/components/marketing/trusted-by";
import { Features } from "@/components/marketing/features";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ServicesPreview } from "@/components/marketing/services-preview";
import { Testimonials } from "@/components/marketing/testimonials";
import { Faq } from "@/components/marketing/faq";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <DashboardPreview />
        <TrustedBy />
        <Features />
        <HowItWorks />
        <ServicesPreview />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}

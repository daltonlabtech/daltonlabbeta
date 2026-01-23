import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";

// Lazy load below-the-fold sections for better performance
const ClientsSection = lazy(() => import("@/components/sections/ClientsSection"));
const ProspectionSection = lazy(() => import("@/components/sections/ProspectionSection"));
const InsightsSection = lazy(() => import("@/components/sections/InsightsSection"));
const AudioDemoSection = lazy(() => import("@/components/sections/AudioDemoSection"));
const FAQSection = lazy(() => import("@/components/sections/FAQSection"));
const Footer = lazy(() => import("@/components/sections/Footer"));

// Minimal loading placeholder for lazy sections
const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-dalton-blue border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <Suspense fallback={<SectionLoader />}>
        <ClientsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ProspectionSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <InsightsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <AudioDemoSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;

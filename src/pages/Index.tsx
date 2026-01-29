import { lazy, Suspense, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import SkeletonSection from "@/components/ui/SkeletonSection";

// Lazy load ALL below-the-fold sections for aggressive code splitting
const ClientsSection = lazy(() => import("@/components/sections/ClientsSection"));
const ProspectionSection = lazy(() => import("@/components/sections/ProspectionSection"));
const InsightsSection = lazy(() => import("@/components/sections/InsightsSection"));
const SquadPlansSection = lazy(() => import("@/components/sections/SquadPlansSection"));
const AudioDemoSection = lazy(() => import("@/components/sections/AudioDemoSection"));
const FAQSection = lazy(() => import("@/components/sections/FAQSection"));
const Footer = lazy(() => import("@/components/sections/Footer"));

// Prefetch next sections after initial load
const prefetchSections = () => {
  // Prefetch after hero is visible and interactive
  const prefetchTimeout = setTimeout(() => {
    // Trigger chunk loading for next visible sections
    import("@/components/sections/ClientsSection");
    import("@/components/sections/ProspectionSection");
  }, 1500);
  
  return () => clearTimeout(prefetchTimeout);
};

const Index = () => {
  // Prefetch below-fold content after initial paint
  useEffect(() => {
    const cleanup = prefetchSections();
    return cleanup;
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Lazy-loaded sections with skeleton placeholders */}
      <Suspense fallback={<SkeletonSection height="min-h-[200px]" />}>
        <ClientsSection />
      </Suspense>
      
      <Suspense fallback={<SkeletonSection height="min-h-[600px]" showCards />}>
        <ProspectionSection />
      </Suspense>
      
      <Suspense fallback={<SkeletonSection height="min-h-[500px]" showCards />}>
        <InsightsSection />
      </Suspense>

      <Suspense fallback={<SkeletonSection height="min-h-[400px]" showCards />}>
        <SquadPlansSection />
      </Suspense>
      
      <Suspense fallback={<SkeletonSection height="min-h-[400px]" />}>
        <AudioDemoSection />
      </Suspense>
      
      <Suspense fallback={<SkeletonSection height="min-h-[500px]" />}>
        <FAQSection />
      </Suspense>
      
      <Suspense fallback={<SkeletonSection height="min-h-[300px]" />}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;

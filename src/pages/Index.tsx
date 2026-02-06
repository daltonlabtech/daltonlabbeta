import { lazy, Suspense, useEffect } from "react";
import Header from "@/components/Header";
import HomeHeroSection from "@/components/sections/HomeHeroSection";
import SkeletonSection from "@/components/ui/SkeletonSection";

// Lazy load below-the-fold sections
const DefinitionSection = lazy(() => import("@/components/sections/DefinitionSection"));
const StatsSection = lazy(() => import("@/components/sections/StatsSection"));
const JourneySection = lazy(() => import("@/components/sections/JourneySection"));
const ProspectionSection = lazy(() => import("@/components/sections/ProspectionSection"));
const HomeFinalCTASection = lazy(() => import("@/components/sections/HomeFinalCTASection"));
const MediaSection = lazy(() => import("@/components/sections/MediaSection"));
const Footer = lazy(() => import("@/components/sections/Footer"));

// Prefetch next sections after initial load
const prefetchSections = () => {
  const prefetchTimeout = setTimeout(() => {
    import("@/components/sections/DefinitionSection");
    import("@/components/sections/StatsSection");
  }, 1500);
  
  return () => clearTimeout(prefetchTimeout);
};

const Index = () => {
  useEffect(() => {
    const cleanup = prefetchSections();
    return cleanup;
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F5F3F0' }}>
      <Header />
      <HomeHeroSection />
      
      <Suspense fallback={<SkeletonSection height="min-h-[400px]" />}>
        <DefinitionSection />
      </Suspense>
      
      <Suspense fallback={<SkeletonSection height="min-h-[200px]" />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<SkeletonSection height="min-h-[400px]" showCards />}>
        <JourneySection />
      </Suspense>

      <Suspense fallback={<SkeletonSection height="min-h-[500px]" showCards />}>
        <ProspectionSection />
      </Suspense>

      <Suspense fallback={<SkeletonSection height="min-h-[200px]" />}>
        <HomeFinalCTASection />
      </Suspense>

      <Suspense fallback={<SkeletonSection height="min-h-[300px]" showCards />}>
        <MediaSection />
      </Suspense>
      
      <Suspense fallback={<SkeletonSection height="min-h-[300px]" />}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;

import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import HomeHeroSection from "@/components/sections/HomeHeroSection";
import SkeletonSection from "@/components/ui/SkeletonSection";

const ClientsSection = lazy(() => import("@/components/sections/ClientsSection"));

const DefinitionSection = lazy(() => import("@/components/sections/DefinitionSection"));
const JourneySection = lazy(() => import("@/components/sections/JourneySection"));
const ProspectionSection = lazy(() => import("@/components/sections/ProspectionSection"));
const HomeFinalCTASection = lazy(() => import("@/components/sections/HomeFinalCTASection"));
const GlobalMapSection = lazy(() => import("@/components/sections/GlobalMapSection"));
const MediaSection = lazy(() => import("@/components/sections/MediaSection"));
const Footer = lazy(() => import("@/components/sections/Footer"));

const prefetchSections = () => {
  const prefetchTimeout = setTimeout(() => {
    import("@/components/sections/DefinitionSection");
    import("@/components/sections/JourneySection");
  }, 5000);
  return () => clearTimeout(prefetchTimeout);
};

const Index = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('pages.index.title');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('pages.index.description'));
    }
    const cleanup = prefetchSections();
    return cleanup;
  }, [t]);

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F5F3F0' }}>
      <Header />
      <HomeHeroSection />
      <Suspense fallback={<SkeletonSection height="min-h-[400px]" showCards />}>
        <JourneySection />
      </Suspense>
      <Suspense fallback={<SkeletonSection height="min-h-[400px]" />}>
        <DefinitionSection />
      </Suspense>
      <Suspense fallback={<SkeletonSection height="min-h-[500px]" showCards />}>
        <ProspectionSection />
      </Suspense>
      <Suspense fallback={<SkeletonSection height="min-h-[200px]" />}>
        <HomeFinalCTASection />
      </Suspense>
      <Suspense fallback={<SkeletonSection height="min-h-[400px]" />}>
        <GlobalMapSection />
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
import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { trackPageView } from "@/lib/analytics";
import SiteHeader from "@/components/redesign/shell/SiteHeader";
import HeroSection from "@/components/redesign/home/HeroSection";
import SkeletonSection from "@/components/ui/SkeletonSection";

// Abaixo da dobra → lazy + Suspense
const VideoBand = lazy(() => import("@/components/redesign/home/VideoBand"));
const ManifestoSection = lazy(() => import("@/components/redesign/home/ManifestoSection"));
const MarketSection = lazy(() => import("@/components/redesign/home/MarketSection"));
const PositioningSection = lazy(() => import("@/components/redesign/home/PositioningSection"));
const ClientsSection = lazy(() => import("@/components/redesign/home/ClientsSection"));
const OrgChartSection = lazy(() => import("@/components/redesign/home/OrgChartSection"));
const MethodologySection = lazy(() => import("@/components/redesign/home/MethodologySection"));
const SolutionsCarousel = lazy(() => import("@/components/redesign/home/SolutionsCarousel"));
const PlatformSection = lazy(() => import("@/components/redesign/home/PlatformSection"));
const SetoresSection = lazy(() => import("@/components/redesign/home/SetoresSection"));
const TrustSection = lazy(() => import("@/components/redesign/home/TrustSection"));
const CasesSection = lazy(() => import("@/components/redesign/home/CasesSection"));
const FinalCTASection = lazy(() => import("@/components/redesign/home/FinalCTASection"));
const InsightsPreviewSection = lazy(() => import("@/components/redesign/home/InsightsPreviewSection"));
const ClosingSection = lazy(() => import("@/components/redesign/home/ClosingSection"));
const SiteFooter = lazy(() => import("@/components/redesign/shell/SiteFooter"));

const prefetchSections = () => {
  const prefetchTimeout = setTimeout(() => {
    import("@/components/redesign/home/VideoBand");
    import("@/components/redesign/home/PositioningSection");
    import("@/components/redesign/home/OrgChartSection");
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
    trackPageView(window.location.pathname, document.title);
    const cleanup = prefetchSections();
    return cleanup;
  }, [t]);

  return (
    <div
      className="redesign-scope min-h-screen"
      style={{ background: 'var(--bg, #0A1628)', color: 'var(--text, #FFFFFF)' }}
    >
      <SiteHeader />
      <main id="top" style={{ overflowX: 'hidden', maxWidth: '100vw', width: '100%' }}>
        <HeroSection />
        <Suspense fallback={<SkeletonSection height="min-h-[400px]" />}>
          <VideoBand />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[300px]" />}>
          <ManifestoSection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[400px]" />}>
          <MarketSection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[300px]" />}>
          <PositioningSection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[200px]" />}>
          <ClientsSection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[500px]" />}>
          <OrgChartSection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[400px]" showCards />}>
          <MethodologySection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[500px]" showCards />}>
          <SolutionsCarousel />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[500px]" showCards />}>
          <PlatformSection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[300px]" />}>
          <SetoresSection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[300px]" showCards />}>
          <TrustSection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[400px]" />}>
          <CasesSection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[400px]" />}>
          <FinalCTASection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[400px]" showCards />}>
          <InsightsPreviewSection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[300px]" />}>
          <ClosingSection />
        </Suspense>
      </main>
      <Suspense fallback={<SkeletonSection height="min-h-[300px]" />}>
        <SiteFooter />
      </Suspense>
    </div>
  );
};

export default Index;

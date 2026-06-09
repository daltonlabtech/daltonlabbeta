import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { trackPageView } from "@/lib/analytics";
import SiteHeader from "@/components/redesign/shell/SiteHeader";
import HeroSection from "@/components/redesign/home/HeroSection";
import SkeletonSection from "@/components/ui/SkeletonSection";

// Abaixo da dobra → lazy + Suspense
// Estrutura espelha exatamente as 9 dobras do index.html de referência.
const VideoBand = lazy(() => import("@/components/redesign/home/VideoBand"));
const PositioningSection = lazy(() => import("@/components/redesign/home/PositioningSection"));
const ClientsSection = lazy(() => import("@/components/redesign/home/ClientsSection"));
const OrgChartSection = lazy(() => import("@/components/redesign/home/OrgChartSection"));
const SolutionsCarousel = lazy(() => import("@/components/redesign/home/SolutionsCarousel"));
const CasesSection = lazy(() => import("@/components/redesign/home/CasesSection"));
const FinalCTASection = lazy(() => import("@/components/redesign/home/FinalCTASection"));
const InsightsPreviewSection = lazy(() => import("@/components/redesign/home/InsightsPreviewSection"));
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
  const location = useLocation();

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

  // Rola até a seção do hash (ex.: "#solutions") ao chegar de outra página.
  // Faz polling porque as seções são lazy e podem montar depois da navegação.
  useEffect(() => {
    if (!location.hash) return;
    const selector = location.hash;
    let elapsed = 0;
    const interval = window.setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.clearInterval(interval);
      } else if ((elapsed += 100) >= 3000) {
        window.clearInterval(interval);
      }
    }, 100);
    return () => window.clearInterval(interval);
  }, [location.hash, location.key]);

  return (
    <div
      className="redesign-scope min-h-screen"
      style={{ background: 'var(--bg, #0A1628)', color: 'var(--text, #FFFFFF)' }}
    >
      <SiteHeader />
      {/* overflow-x: clip (não 'hidden') — 'hidden' força overflow-y a computar como
          'auto', criando um scroll container aninhado (segundo scrollbar). 'clip' corta
          o overflow horizontal sem virar scroller nem afetar o eixo vertical. */}
      <main id="top" style={{ overflowX: 'clip', maxWidth: '100vw', width: '100%' }}>
        <HeroSection />
        <Suspense fallback={<SkeletonSection height="min-h-[400px]" />}>
          <VideoBand />
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
        <Suspense fallback={<SkeletonSection height="min-h-[500px]" showCards />}>
          <SolutionsCarousel />
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
      </main>
      <Suspense fallback={<SkeletonSection height="min-h-[300px]" />}>
        <SiteFooter />
      </Suspense>
    </div>
  );
};

export default Index;

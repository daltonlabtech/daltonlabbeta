import { lazy, Suspense, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { trackPageView } from "@/lib/analytics";
import Seo from "@/components/Seo";
import SiteHeader from "@/components/redesign/shell/SiteHeader";
import ChoreoSection from "@/components/redesign/home/ChoreoSection";
import SkeletonSection from "@/components/ui/SkeletonSection";

// Abaixo da dobra → lazy + Suspense.
// Estrutura espelha as 8 dobras do protótipo (design-reference/site-novo):
// 1–3 coreografia · 4 o caminho · 5 jornada · 6 places to work · 7 fecho · 8 conteúdos.
const PathRailSection = lazy(() => import("@/components/redesign/home/PathRailSection"));
const JourneySection = lazy(() => import("@/components/redesign/home/JourneySection"));
const PlacesSection = lazy(() => import("@/components/redesign/home/PlacesSection"));
const CloseFoldSection = lazy(() => import("@/components/redesign/home/CloseFoldSection"));
const PressSection = lazy(() => import("@/components/redesign/home/PressSection"));
const SiteFooter = lazy(() => import("@/components/redesign/shell/SiteFooter"));

const prefetchSections = () => {
  const prefetchTimeout = setTimeout(() => {
    import("@/components/redesign/home/PathRailSection");
    import("@/components/redesign/home/JourneySection");
    import("@/components/redesign/home/PlacesSection");
  }, 5000);
  return () => clearTimeout(prefetchTimeout);
};

const Index = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView(window.location.pathname, t('pages.index.title'));
    const cleanup = prefetchSections();
    return cleanup;
  }, [t]);

  // Legacy: /#cases ia para a seção de casos. Casos agora vivem em /casos.
  useEffect(() => {
    if (location.hash === '#cases') {
      navigate('/casos', { replace: true });
    }
  }, [location.hash, navigate]);

  // Rola até a seção do hash (ex.: "#solutions") ao chegar de outra página.
  // Faz polling porque as seções são lazy e podem montar depois da navegação.
  useEffect(() => {
    if (!location.hash || location.hash === '#cases') return;
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
      style={{ background: 'transparent', color: 'var(--ink2)' }}
    >
      <Seo title={t('pages.index.title')} description={t('pages.index.description')} />
      <SiteHeader />
      {/* overflow-x: clip (não 'hidden') — 'hidden' força overflow-y a computar como
          'auto', criando um scroll container aninhado, o que quebraria o sticky da
          coreografia. 'clip' corta o overflow horizontal sem virar scroller. */}
      <main id="top" style={{ overflowX: 'clip', maxWidth: '100vw', width: '100%', position: 'relative', zIndex: 3 }}>
        <ChoreoSection />
        <Suspense fallback={<SkeletonSection height="min-h-[300px]" />}>
          <PathRailSection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[400px]" showCards />}>
          <JourneySection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[300px]" />}>
          <PlacesSection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[300px]" />}>
          <CloseFoldSection />
        </Suspense>
        <Suspense fallback={<SkeletonSection height="min-h-[400px]" showCards />}>
          <PressSection />
        </Suspense>
      </main>
      <Suspense fallback={<SkeletonSection height="min-h-[300px]" />}>
        <SiteFooter />
      </Suspense>
    </div>
  );
};

export default Index;

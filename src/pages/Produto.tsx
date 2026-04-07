import { lazy, Suspense, useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import SkeletonSection from "@/components/ui/SkeletonSection";
import { useTranslation } from "react-i18next";

// Lazy load below-the-fold sections
const ClientsSection = lazy(() => import("@/components/sections/ClientsSection"));
const ProspectionSection = lazy(() => import("@/components/sections/ProspectionSection"));
const InsightsSection = lazy(() => import("@/components/sections/InsightsSection"));
const SquadPlansSection = lazy(() => import("@/components/sections/SquadPlansSection"));
const AudioDemoSection = lazy(() => import("@/components/sections/AudioDemoSection"));
const FAQSection = lazy(() => import("@/components/sections/FAQSection"));
const Footer = lazy(() => import("@/components/sections/Footer"));

const Produto = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const pageTitle = t('pages.produto.title');
    document.title = pageTitle;
    trackPageView('/produto', pageTitle);
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('pages.produto.description'));
    }
  }, [t]);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* SEO H1 - visually hidden but accessible */}
      <h1 className="sr-only">{t('pages.produto.h1')}</h1>
      
      <HeroSection />
      
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

export default Produto;

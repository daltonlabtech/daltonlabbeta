import { lazy, Suspense, useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import { useTranslation } from "react-i18next";
import Seo from "@/components/Seo";
import SiteHeader from "@/components/redesign/shell/SiteHeader";
import SiteFooter from "@/components/redesign/shell/SiteFooter";
import ProdutoHero from "@/components/redesign/produto/ProdutoHero";
import ProdutoCapabilities from "@/components/redesign/produto/ProdutoCapabilities";

// CTA final compartilhada (canvas outlier) — lazy abaixo do fold
const FinalCTASection = lazy(() => import("@/components/redesign/home/FinalCTASection"));

const Produto = () => {
  const { t } = useTranslation();

  useEffect(() => {
    trackPageView('/produto', t('pages.produto.title'));
  }, [t]);

  return (
    <div
      className="redesign-scope"
      style={{ background: "transparent", minHeight: "100vh", color: "var(--text)" }}
    >
      <Seo title={t('pages.produto.title')} description={t('pages.produto.description')} />
      <SiteHeader />

      <main id="top">
        {/* SEO H1 já renderizado dentro do ProdutoHero como <h1> visível */}
        <ProdutoHero />
        <ProdutoCapabilities />

        <Suspense fallback={<div style={{ minHeight: 360 }} />}>
          <FinalCTASection />
        </Suspense>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Produto;

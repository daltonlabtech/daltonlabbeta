import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { trackPageView } from "@/lib/analytics";
import SiteHeader from "@/components/redesign/shell/SiteHeader";
import SiteFooter from "@/components/redesign/shell/SiteFooter";
import AboutHero from "@/components/redesign/about/AboutHero";
import CompanyPanel from "@/components/redesign/about/CompanyPanel";
import FoundersPanel from "@/components/redesign/about/FoundersPanel";

type Tab = "company" | "founders";

const QuemSomos = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>("company");

  useEffect(() => {
    const pageTitle = t("pages.quemSomos.title");
    document.title = pageTitle;
    trackPageView("/quem-somos", pageTitle);
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("pages.quemSomos.description"));
    }
  }, [t]);

  return (
    <div className="redesign-scope" style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      {/* Estilos escopados: fade dos painéis + grids responsivos (media queries não cabem em inline style) */}
      <style>{`
        .qs-panel-anim { animation: qsFade .45s ease both; }
        @keyframes qsFade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .qs-panel-anim { animation: none; } }
        @media (min-width: 720px) {
          .redesign-scope .qs-stats { grid-template-columns: repeat(4, 1fr) !important; }
          .redesign-scope .qs-founders { display: grid !important; grid-template-columns: repeat(3, 1fr); align-items: stretch; }
        }
      `}</style>

      <SiteHeader />

      <main id="top">
        <AboutHero activeTab={activeTab} onTabChange={setActiveTab} />

        <section
          className="wrap"
          style={{
            maxWidth: "var(--navy-maxw)",
            marginInline: "auto",
            paddingInline: "var(--navy-gutter)",
            paddingTop: 8,
            paddingBottom: "var(--navy-section-y)",
            boxSizing: "border-box",
          }}
        >
          {/* key força o remount → re-dispara o fade a cada troca de aba */}
          <div key={activeTab} className="qs-panel-anim">
            {activeTab === "company" ? <CompanyPanel /> : <FoundersPanel />}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default QuemSomos;

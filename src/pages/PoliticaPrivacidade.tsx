import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { trackPageView } from "@/lib/analytics";
import Seo from "@/components/Seo";
import SiteHeader from "@/components/redesign/shell/SiteHeader";
import SiteFooter from "@/components/redesign/shell/SiteFooter";

const sectionStyle: React.CSSProperties = { marginTop: 36 };
const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "1.25rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "var(--text)",
  marginBottom: 12,
};
const pStyle: React.CSSProperties = {
  fontSize: "1rem",
  lineHeight: 1.75,
  color: "var(--text-dim)",
};

const PoliticaPrivacidade = () => {
  const { t } = useTranslation();

  useEffect(() => {
    trackPageView('/politica-de-privacidade', 'Política de Privacidade');
  }, [t]);

  return (
    <div
      className="redesign-scope"
      style={{ background: "transparent", minHeight: "100vh", color: "var(--text)" }}
    >
      <Seo
        title={`${t('pp.title')} | Dalton Lab`}
        description={t('pages.politica.description')}
      />
      <SiteHeader />

      <main
        className="mx-auto px-6 md:px-12"
        style={{
          maxWidth: 760,
          width: "100%",
          boxSizing: "border-box",
          paddingTop: "clamp(120px, 16vh, 180px)",
          paddingBottom: "clamp(64px, 10vw, 120px)",
        }}
      >
        <span className="eyebrow">{t('legalPage.eyebrow')}</span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            marginTop: 16,
            marginBottom: 8,
          }}
        >
          {t('pp.title')}
        </h1>
        <span
          aria-hidden="true"
          className="block"
          style={{ width: 60, height: 2, marginTop: 22, marginBottom: 8, background: "var(--cyan-deep)", borderRadius: 2 }}
        />

        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <section key={n} style={sectionStyle}>
            <h2 style={h2Style}>{t(`pp.${n}.t`)}</h2>
            <p style={pStyle}>{t(`pp.${n}.b`)}</p>
          </section>
        ))}

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--muted-navy)",
            marginTop: 48,
          }}
        >
          {t('pp.updated')}
        </p>
      </main>

      <SiteFooter />
    </div>
  );
};

export default PoliticaPrivacidade;

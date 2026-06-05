import { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";
import SiteHeader from "@/components/redesign/shell/SiteHeader";
import SiteFooter from "@/components/redesign/shell/SiteFooter";
import { CASES } from "@/data/cases";

const Casos = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "pt").startsWith("en") ? "en" : "pt";

  useEffect(() => {
    document.title = "Casos — Dalton Lab";
    trackPageView("/casos", document.title);
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("casos.lede"));
    }
  }, [t]);

  return (
    <div className="redesign-scope" style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      <style>{`
        .cases-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-top: 48px;
        }
        @media (min-width: 760px) {
          .redesign-scope .cases-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .redesign-scope .case-prev {
          display: flex;
          flex-direction: column;
          gap: 18px;
          border: 1px solid var(--border-navy);
          background: var(--surface);
          border-radius: 20px;
          padding: 30px;
          text-decoration: none;
          color: inherit;
          transition: transform .25s ease, border-color .25s ease;
        }
        .redesign-scope .case-prev:hover {
          transform: translateY(-3px);
          border-color: var(--cyan);
        }
        .redesign-scope .cp-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .redesign-scope .cp-logo {
          height: 30px;
          width: auto;
          filter: brightness(0) invert(1);
        }
        .redesign-scope .cp-logo--sq { height: 44px; }
        .redesign-scope .cp-sector {
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .08em;
          font-size: .72rem;
          color: var(--text-dim);
        }
        .redesign-scope .cp-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          line-height: 1.2;
          font-weight: 800;
          color: var(--text);
          margin: 0;
        }
        .redesign-scope .cp-go {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: auto;
          color: var(--cyan);
          font-family: var(--font-mono);
          font-size: .82rem;
          text-transform: uppercase;
          letter-spacing: .06em;
        }
        .redesign-scope .casos-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 56px;
          color: var(--text-dim);
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: .82rem;
        }
        .redesign-scope .casos-back:hover { color: var(--text); }
      `}</style>

      <SiteHeader />

      <main
        id="top"
        style={{
          maxWidth: 1100,
          marginInline: "auto",
          paddingInline: 24,
          paddingTop: 120,
          paddingBottom: 80,
          boxSizing: "border-box",
        }}
      >
        <span className="eyebrow">{t("cases.tag", "Casos")}</span>
        <h1 className="headline" style={{ marginTop: 12 }}>
          <Trans i18nKey="casos.title" components={{ b: <b /> }} />
        </h1>
        <p
          style={{
            marginTop: 18,
            maxWidth: 640,
            color: "var(--text-dim)",
            lineHeight: 1.7,
          }}
        >
          {t("casos.lede")}
        </p>

        <div className="cases-grid">
          {CASES.map((c) => (
            <Link key={c.slug} to={`/casos/${c.slug}`} className="case-prev">
              <div className="cp-top">
                <img
                  className={"cp-logo" + (c.logoSquare ? " cp-logo--sq" : "")}
                  src={c.logo}
                  alt={c.name}
                />
                <span className="cp-sector">{c.sector[lang]}</span>
              </div>
              <h2 className="cp-title">{c.title[lang]}</h2>
              <span className="cp-go">
                {t("casos.read", "Ler o caso")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <Link to="/" className="casos-back">← {t("casos.back")}</Link>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Casos;

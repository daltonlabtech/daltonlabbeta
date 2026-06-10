import { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";
import SiteHeader from "@/components/redesign/shell/SiteHeader";
import SiteFooter from "@/components/redesign/shell/SiteFooter";
import { CASES } from "@/data/cases";

// Ordem da grade /casos (independente da home) — espelha o site de referência v3.
const CASOS_ORDER = ["smartrisk", "jeisys", "fialdini", "uny"];
const orderedCases = CASOS_ORDER
  .map((slug) => CASES.find((c) => c.slug === slug))
  .filter((c): c is (typeof CASES)[number] => Boolean(c));

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
    <div className="redesign-scope" style={{ background: "transparent", minHeight: "100vh", color: "var(--text)" }}>
      <style>{`
        .cases-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 48px;
        }
        @media (min-width: 680px) {
          .redesign-scope .cases-grid { grid-template-columns: 1fr 1fr; gap: 18px; }
        }
        .redesign-scope .case-prev {
          border: 1px solid var(--border-navy);
          border-radius: var(--navy-radius, 16px);
          background:
            radial-gradient(120% 90% at 0% 0%, rgba(76,184,232,0.07), transparent 52%),
            var(--surface);
          padding: clamp(22px, 4vw, 30px);
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-height: 220px;
          text-decoration: none;
          color: inherit;
          transition: border-color .3s, transform .3s, box-shadow .3s;
        }
        .redesign-scope .case-prev:hover {
          border-color: rgba(76,184,232,0.42);
          transform: translateY(-3px);
          box-shadow: 0 22px 48px rgba(0,0,0,0.36);
        }
        .redesign-scope .cp-top {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 11px;
        }
        @media (min-width: 600px) {
          .redesign-scope .cp-top {
            flex-direction: row;
            align-items: center;
            gap: 14px;
            flex-wrap: wrap;
          }
          .redesign-scope .cp-sector {
            padding-left: 14px;
            border-left: 1px solid var(--border-navy);
          }
        }
        .redesign-scope .cp-logo {
          height: 24px;
          width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: .95;
        }
        .redesign-scope .cp-logo--sq { height: 32px; }
        .redesign-scope .cp-sector {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--cyan);
        }
        .redesign-scope .cp-title {
          font-family: var(--font-display);
          font-weight: 700;
          letter-spacing: -0.02em;
          font-size: clamp(1.22rem, 2.7vw, 1.55rem);
          line-height: 1.18;
          color: var(--text);
          text-wrap: pretty;
          flex: 1;
          margin: 0;
        }
        .redesign-scope .cp-go {
          margin-top: auto;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.03em;
          color: var(--cyan);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-transform: none;
        }
        .redesign-scope .cp-go svg {
          width: 15px;
          height: 15px;
          transition: transform .3s;
        }
        .redesign-scope .case-prev:hover .cp-go svg { transform: translateX(4px); }
        .redesign-scope .casos-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 44px;
          color: var(--cyan);
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: gap .25s ease, opacity .25s ease;
        }
        .redesign-scope .casos-back:hover { gap: 12px; opacity: .85; }
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
        <h1 className="headline h-xl" style={{ marginTop: 12 }}>
          <Trans i18nKey="casos.title" components={{ b: <b /> }} />
        </h1>

        <div className="cases-grid">
          {orderedCases.map((c) => (
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

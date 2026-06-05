import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams, Navigate } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";
import SiteHeader from "@/components/redesign/shell/SiteHeader";
import SiteFooter from "@/components/redesign/shell/SiteFooter";
import { getCase } from "@/data/cases";

const CasoDetalhe = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "pt").startsWith("en") ? "en" : "pt";
  const { slug = "" } = useParams();
  const c = getCase(slug);

  useEffect(() => {
    if (c) {
      document.title = `${c.name} — Dalton Lab`;
      trackPageView(`/casos/${slug}`, document.title);
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", c.summary[lang]);
      }
    }
  }, [slug, c, lang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!c) return <Navigate to="/casos" replace />;

  const sections: Array<{ num: string; label: string; body: string }> = [
    { num: "01", label: t("casos.challenge"), body: c.challenge[lang] },
    { num: "02", label: t("casos.solution"), body: c.solution[lang] },
    { num: "03", label: t("casos.how"), body: c.how[lang] },
  ];

  return (
    <div className="redesign-scope" style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      <SiteHeader />

      <main
        id="top"
        style={{
          maxWidth: 760,
          marginInline: "auto",
          paddingInline: 24,
          paddingTop: 120,
          paddingBottom: 80,
          boxSizing: "border-box",
        }}
      >
        <Link
          to="/casos"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "var(--text-dim)",
            textDecoration: "none",
            fontFamily: "var(--font-mono)",
            fontSize: ".82rem",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t("casos.allcases", "Todos os casos")}
        </Link>

        <div style={{ marginTop: 40 }}>
          <span className="eyebrow">{t("casos.tagcase", "Caso")}</span>
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            fontSize: ".72rem",
            color: "var(--text-dim)",
          }}
        >
          {c.sector[lang]}
        </div>
        <h1 className="headline" style={{ marginTop: 14 }}>
          {c.title[lang]}
        </h1>

        <div style={{ marginTop: 28 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: ".08em",
              fontSize: ".72rem",
              color: "var(--cyan)",
            }}
          >
            {t("casos.resumo", "Resumo")}
          </div>
          <p style={{ marginTop: 10, lineHeight: 1.7, color: "rgba(245,243,240,0.78)" }}>
            {c.summary[lang]}
          </p>
        </div>

        <div
          style={{
            marginTop: 36,
            border: "1px solid var(--border-navy)",
            background: "var(--surface)",
            borderRadius: 20,
            padding: "44px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={c.logo}
            alt={c.name}
            style={{
              height: c.logoSquare ? 70 : 44,
              width: "auto",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        <div
          style={{
            marginTop: 36,
            border: "1px solid rgba(76,184,232,0.35)",
            background: "rgba(76,184,232,0.06)",
            borderRadius: 20,
            padding: 30,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: ".08em",
              fontSize: ".72rem",
              color: "var(--cyan)",
            }}
          >
            {t("casos.highlights", "Destaques")}
          </div>
          <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {c.highlights.map((h, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, lineHeight: 1.6 }}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  style={{ flexShrink: 0, marginTop: 3, color: "var(--cyan)" }}
                >
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{h[lang]}</span>
              </li>
            ))}
          </ul>
        </div>

        {sections.map((s) => (
          <section key={s.num} style={{ marginTop: 48 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: ".82rem",
                letterSpacing: ".08em",
                color: "var(--cyan)",
              }}
            >
              {s.num}
            </div>
            <h2
              style={{
                marginTop: 8,
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.6rem",
                lineHeight: 1.2,
                color: "var(--text)",
              }}
            >
              {s.label}
            </h2>
            <p style={{ marginTop: 14, lineHeight: 1.7, color: "rgba(245,243,240,0.78)" }}>
              {s.body}
            </p>
          </section>
        ))}

        <div
          style={{
            marginTop: 72,
            paddingTop: 48,
            borderTop: "1px solid var(--border-navy)",
            textAlign: "center",
          }}
        >
          <h2 className="headline" dangerouslySetInnerHTML={{ __html: t("final.title") }} />
          <a
            href="https://formulario.daltonlab.ai/"
            className="btn btn-primary"
            style={{ marginTop: 28, display: "inline-flex" }}
          >
            {t("final.cta1")}
          </a>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default CasoDetalhe;

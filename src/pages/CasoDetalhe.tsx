import { Fragment, useEffect } from "react";
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
      <style>{`
        .redesign-scope .cr-tagcase { align-self: flex-start; display: inline-flex; align-items: center; padding: 5px 12px; margin-bottom: 18px; border: 1px solid var(--border-navy); border-radius: 999px; font-family: var(--font-mono); font-size: 10.5px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-dim); }

        .redesign-scope .cr-back { appearance: none; background: none; border: 0; cursor: pointer; align-self: flex-start; display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 12.5px; letter-spacing: 0.03em; color: var(--text-dim); padding: 0; margin: 0 0 24px; text-decoration: none; transition: color .3s, gap .3s; }
        .redesign-scope .cr-back:hover { color: var(--cyan); gap: 11px; }
        .redesign-scope .cr-back svg { width: 15px; height: 15px; }
        .redesign-scope .cr-back--bottom { margin: 10px 0 0; }

        .redesign-scope .cr-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; font-family: var(--font-mono); font-size: 11.5px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--cyan); margin-bottom: 16px; }

        .redesign-scope .cr-hero { height: 168px; margin: 18px 0 32px; border-radius: var(--navy-radius); border: 1px solid var(--border-navy); position: relative; overflow: hidden; display: grid; place-items: center; background: radial-gradient(90% 130% at 50% -10%, rgba(76,184,232,0.16), transparent 60%), radial-gradient(80% 120% at 100% 120%, rgba(168,85,247,0.10), transparent 55%), var(--surface); }
        .redesign-scope .cr-hero::after { content: ""; position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 22px 22px; opacity: .5; -webkit-mask-image: radial-gradient(70% 80% at 50% 50%, #000, transparent 85%); mask-image: radial-gradient(70% 80% at 50% 50%, #000, transparent 85%); }
        .redesign-scope .cr-herologo { position: relative; z-index: 1; height: 40px; width: auto; max-width: 62%; object-fit: contain; filter: brightness(0) invert(1); }
        .redesign-scope .cr-herologo--sq { height: 60px; }

        .redesign-scope .cr-title { font-family: var(--font-display); font-weight: 800; letter-spacing: -0.035em; font-size: clamp(1.9rem, 6.5vw, 2.6rem); line-height: 1.06; color: var(--text); text-wrap: balance; }

        .redesign-scope .cr-reslabel { font-family: var(--font-mono); font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--cyan); display: flex; align-items: center; gap: 9px; margin: 30px 0 12px; }
        .redesign-scope .cr-reslabel::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--cyan); flex: none; }

        .redesign-scope .cr-dek { color: var(--text-dim); font-size: clamp(1.06rem, 3vw, 1.24rem); line-height: 1.55; margin-top: 0; max-width: 56ch; }

        .redesign-scope .cr-body { margin-top: 36px; }

        .redesign-scope .cr-callout { border: 1px solid var(--border-navy); border-radius: var(--navy-radius); background: radial-gradient(100% 120% at 0% 0%, rgba(76,184,232,0.06), transparent 55%), rgba(255,255,255,0.015); padding: clamp(22px, 4vw, 28px); margin-bottom: 40px; }
        .redesign-scope .cr-callout-h { font-family: var(--font-mono); font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--cyan); display: flex; align-items: center; gap: 9px; margin-bottom: 18px; }
        .redesign-scope .cr-callout-h::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--cyan); flex: none; }
        .redesign-scope .cr-keys { list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; }
        .redesign-scope .cr-keys li { display: flex; align-items: flex-start; gap: 13px; }
        .redesign-scope .cr-keys .ic { flex: none; width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; background: rgba(76,184,232,0.12); color: var(--cyan); margin-top: 1px; }
        .redesign-scope .cr-keys .ic svg { width: 14px; height: 14px; }
        .redesign-scope .cr-keys span.t { color: var(--text); font-size: 15px; line-height: 1.5; font-weight: 500; }

        .redesign-scope .cr-sec { margin-bottom: 30px; }
        .redesign-scope .cr-kicker { font-family: var(--font-mono); font-size: 12px; font-weight: 500; letter-spacing: 0.06em; color: var(--cyan); display: block; margin-bottom: 8px; }
        .redesign-scope .cr-h { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.02em; font-size: clamp(1.3rem, 5vw, 1.62rem); line-height: 1.16; color: var(--text); margin: 0 0 14px; }
        .redesign-scope .cr-p { color: var(--text-dim); font-size: clamp(1.04rem, 2.7vw, 1.13rem); line-height: 1.74; margin: 0; max-width: 64ch; text-wrap: pretty; }

        .redesign-scope .cr-q { margin: 40px 0; padding-left: 22px; border-left: 2px solid var(--cyan); font-family: var(--font-serif); font-style: italic; font-weight: 500; font-size: clamp(1.35rem, 5vw, 1.75rem); line-height: 1.3; color: var(--text); text-wrap: balance; }

        .redesign-scope .cr-cta { margin-top: 24px; padding: clamp(28px, 5vw, 42px); border: 1px solid var(--border-navy); border-radius: var(--navy-radius); text-align: center; background: radial-gradient(90% 120% at 50% 0%, rgba(76,184,232,0.09), transparent 60%), var(--surface); }
        .redesign-scope .cr-cta h2 { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.02em; font-size: clamp(1.4rem, 3.2vw, 1.9rem); color: var(--text); margin-bottom: 18px; text-wrap: balance; }
      `}</style>

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
        <span className="cr-tagcase">{t("casos.tagcase", "Caso")}</span>

        <Link to="/casos" className="cr-back">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{t("casos.allcases", "Todos os casos")}</span>
        </Link>

        <div className="cr-meta">{c.sector[lang]}</div>

        <div className="cr-hero">
          <img
            className={"cr-herologo" + (c.logoSquare ? " cr-herologo--sq" : "")}
            src={c.logo}
            alt={c.name}
          />
        </div>

        <h1 className="cr-title">{c.title[lang]}</h1>

        <div className="cr-reslabel">{t("casos.resumo", "Resumo")}</div>
        <p className="cr-dek">{c.summary[lang]}</p>

        <div className="cr-body">
          <div className="cr-callout">
            <div className="cr-callout-h">{t("casos.highlights", "Destaques")}</div>
            <ul className="cr-keys">
              {c.highlights.map((h, i) => (
                <li key={i}>
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="t">{h[lang]}</span>
                </li>
              ))}
            </ul>
          </div>

          {sections.map((s, idx) => (
            <Fragment key={s.num}>
              <div className="cr-sec">
                <span className="cr-kicker">{s.num}</span>
                <h2 className="cr-h">{s.label}</h2>
                <p className="cr-p">{s.body}</p>
              </div>

              {/* Pull-quote entre "A solução" e "Como funciona na prática" — porta `.cr-q` */}
              {idx === 1 && (
                <blockquote className="cr-q">
                  {c.highlights[c.pullQuoteIndex ?? 0][lang]}
                </blockquote>
              )}
            </Fragment>
          ))}
        </div>

        {/* Voltar (rodapé) — porta `.cr-back--bottom` */}
        <Link to="/casos" className="cr-back cr-back--bottom">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{t("casos.allcases", "Todos os casos")}</span>
        </Link>

        <div className="cr-cta">
          <h2 className="headline" dangerouslySetInnerHTML={{ __html: t("final.title") }} />
          <a
            href="https://formulario.daltonlab.ai/"
            className="btn btn-primary"
            style={{ marginTop: 8, display: "inline-flex" }}
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

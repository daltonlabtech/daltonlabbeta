import { useEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { trackCtaClick } from '@/lib/analytics';

const CONTACT_URL = 'https://formulario.daltonlab.ai/';

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(el);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
    return () => io.disconnect();
  }, []);
  return ref;
}

/**
 * Hero da página Produto — porta o intent do HeroSection original
 * ("Agentes de IA para Vendas") para o design system navy/ciano.
 */
export default function ProdutoHero() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal relative overflow-hidden"
      style={{ paddingTop: 'clamp(120px, 18vh, 200px)', paddingBottom: 'clamp(48px, 8vw, 120px)', isolation: 'isolate' }}
    >
      <span aria-hidden="true" className="hero-grid" />
      {/* glow top-right */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: '-12%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          maxWidth: 680,
          maxHeight: 680,
          background: 'radial-gradient(circle at 70% 30%, rgba(143,230,255,0.16), transparent 62%)',
          filter: 'blur(40px)',
          zIndex: -1,
        }}
      />

      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        <span className="eyebrow" style={{ marginBottom: 20 }}>
          {t('produto.hero.tag', 'Agentes de IA para Vendas')}
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 200,
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            fontSize: 'clamp(2.2rem, 7vw, 4.6rem)',
            marginTop: 18,
            maxWidth: '16ch',
            overflowWrap: 'break-word',
            textWrap: 'pretty',
          }}
        >
          <Trans i18nKey="produto.hero.title" components={{ b: <b style={serifStrong} /> }}>
            {'Transforme sua empresa em uma <b>Organização Agêntica</b>'}
          </Trans>
        </h1>

        <p
          style={{
            marginTop: 22,
            maxWidth: '52ch',
            fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
            lineHeight: 1.6,
            color: 'var(--text-dim)',
          }}
        >
          {t(
            'produto.hero.sub',
            'Agentes de IA que qualificam leads, fazem follow-up 24/7 e conduzem o fechamento — escalando sua operação comercial sem aumentar o time.'
          )}
        </p>

        <div style={{ marginTop: 34 }}>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick(t('produto.hero.cta', 'Fale conosco'), 'produto-hero', CONTACT_URL)}
            className="inline-flex items-center justify-center rounded-full"
            style={{
              gap: 9,
              padding: '15px 28px',
              minHeight: 48,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              background: 'var(--cyan)',
              color: 'var(--accent-ink)',
              transition: 'transform .3s var(--ease), box-shadow .3s var(--ease)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 34px rgba(143,230,255,0.38)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            {t('produto.hero.cta', 'Fale conosco')}
          </a>
        </div>
      </div>
    </section>
  );
}

const serifStrong: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 500,
  fontStyle: 'italic',
  color: 'var(--cyan)',
  WebkitTextFillColor: 'var(--cyan)',
};

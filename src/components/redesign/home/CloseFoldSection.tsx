import { Trans, useTranslation } from 'react-i18next';
import { trackCtaClick } from '@/lib/analytics';

const CONTACT_URL = 'https://formulario.daltonlab.ai/';

/**
 * Dobra 7 — fecho: a frase-tese centralizada + CTA principal.
 */
export default function CloseFoldSection() {
  const { t } = useTranslation();

  return (
    <section
      id="final"
      className="na"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '52px 22px',
        scrollMarginTop: 92,
      }}
    >
      <style>{`
        .close-phrase { font-weight: 200; font-size: 23px; line-height: 1.2; color: var(--ink); max-width: 20ch; text-wrap: balance; }
        .close-btns { display: flex; flex-direction: column; align-items: center; gap: 10px; width: 100%; margin-top: 26px; }
        .close-btns .btn-p { width: 100%; max-width: 320px; }
        @media (min-width: 760px) {
          .close-phrase { font-size: clamp(24px, 2.2vw, 34px); line-height: 1.15; max-width: 26ch; }
          .close-btns { margin-top: 28px; width: auto; }
          .close-btns .btn-p { width: auto; max-width: none; }
        }
      `}</style>
      <p className="close-phrase">
        <Trans i18nKey="close.phrase" components={{ s: <s />, em: <em /> }}>
          As empresas do futuro não serão <s>maiores</s>. Serão <em>agênticas</em>.
        </Trans>
      </p>
      <div className="close-btns">
        <a
          className="btn-p"
          href={CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCtaClick(t('hero.cta1', 'Fale com um especialista'), 'close_fold', CONTACT_URL)}
        >
          {t('hero.cta1', 'Fale com um especialista')}
        </a>
      </div>
    </section>
  );
}

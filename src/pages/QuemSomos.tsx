import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { trackPageView } from '@/lib/analytics';
import Seo from '@/components/Seo';
import SiteHeader from '@/components/redesign/shell/SiteHeader';
import SiteFooter from '@/components/redesign/shell/SiteFooter';
import { trackCtaClick } from '@/lib/analytics';

const CONTACT_URL = 'https://formulario.daltonlab.ai/';

const FOUNDERS = [
  {
    nome: 'Rodrigo Spínola',
    foto: '/novo/assets/team/rodrigo-novo.jpg',
    roleKey: 'qs.fo.1.role',
    roleDefault: 'Fundador e CEO',
    bioKey: 'qs.fo.1.bio',
    bioDefault:
      'Foi CEO da maior operação comercial da Serasa para PMEs no Brasil. Liderou e formou +500 vendedores de alta performance. Recebeu diversos prêmios nacionais e internacionais (Paris 2018, Hawaii 2019, Montevideo 2019 e USA 2020). Hoje lidera o Dalton Lab na transformação de empresas em Organizações Agênticas. Embaixador da Escola de IA da Pós PUC/PR. Obcecado por cultura, resultado e crescimento.',
    linkedin: 'https://www.linkedin.com/in/orodrigospinola/',
    instagram: 'https://www.instagram.com/orodrigospinola',
  },
  {
    nome: 'Marcelo Ramos',
    foto: '/novo/assets/team/marcelo-novo.jpg',
    roleKey: 'qs.fo.2.role',
    roleDefault: 'Fundador e COO',
    bioKey: 'qs.fo.2.bio',
    bioDefault:
      'Gerenciou mais de 120 projetos de iniciativas digitais no mercado de Saúde e Educação, gerando +7000 clientes em seu primeiro empreendimento, aos 21 anos. Tendo experiência em multinacionais como Deloitte, hoje desenha a arquitetura operacional que transforma estratégia em execução no Dalton Lab.',
    linkedin: 'https://www.linkedin.com/in/marceloramossa/',
    instagram: 'https://www.instagram.com/marceloramos.ia',
  },
  {
    nome: 'Julio Lohn',
    foto: '/novo/assets/team/julio-novo.jpg',
    roleKey: 'qs.fo.3.role',
    roleDefault: 'Sócio-conselheiro',
    bioKey: 'qs.fo.3.bio',
    bioDefault:
      'Diretor Comercial e Marketing do Grupo Mundial Mix, que controla Brasil Atacadista e Supermercados Imperatriz, uma das maiores redes do varejo alimentar de Santa Catarina. Presidente do Conselho da Rede Brasil - RBSM. +13 anos liderando estratégia comercial e inovação no setor.',
    linkedin: 'https://www.linkedin.com/in/julio-cesar-lohn-6b63b231/',
    instagram: null,
  },
];

const LINKEDIN_PATH =
  'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z';
const INSTAGRAM_PATH =
  'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.73 3.73 0 0 1-1.38-.9c-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.32a4.57 4.57 0 1 1 0 9.14 4.57 4.57 0 0 1 0-9.14zm0 7.54a2.97 2.97 0 1 0 0-5.94 2.97 2.97 0 0 0 0 5.94zm5.82-7.74a1.07 1.07 0 1 1-2.14 0 1.07 1.07 0 0 1 2.14 0z';

/**
 * /quem-somos no novo design — fluxo único (sem abas): hero, foto do time,
 * a empresa (parágrafos + destaque + stats), fundadores e fecho.
 */
const QuemSomos = () => {
  const { t } = useTranslation();

  useEffect(() => {
    trackPageView('/quem-somos', t('pages.quemSomos.title'));
  }, [t]);

  return (
    <div className="redesign-scope min-h-screen" style={{ background: 'transparent', color: 'var(--ink2)' }}>
      <Seo title={t('pages.quemSomos.title')} description={t('pages.quemSomos.description')} />
      <SiteHeader />
      <style>{`
        .qs-hero { padding: 110px 22px 16px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .qs-hero h1 { margin-top: 18px; font-weight: 200; font-size: clamp(26px, 7.8vw, 31px); line-height: 1.1; letter-spacing: -0.01em; color: var(--ink); max-width: 820px; text-wrap: balance; }
        .qs-wrap { max-width: 1120px; margin: 0 auto; padding: 28px 22px 0; }
        .qs-foto { width: 100%; border-radius: 16px; border: 1px solid var(--line-soft); display: block; }
        .qs-empresa { margin-top: 36px; display: grid; grid-template-columns: 1fr; gap: 36px; align-items: start; }
        .qs-empresa p { font-size: 15.5px; line-height: 1.65; color: var(--ink2); }
        .qs-empresa p + p { margin-top: 18px; }
        .qs-empresa .destaque { margin-top: 26px; font-weight: 200; font-size: 21px; line-height: 1.45; color: var(--ink); }
        .qs-stats { display: flex; flex-direction: column; border-top: 1px solid var(--line-soft); }
        .qs-stat { padding: 20px 0; border-bottom: 1px solid var(--line-soft); }
        .qs-stat .num { font-size: 38px; font-weight: 200; line-height: 1.05; color: var(--ink); }
        .qs-stat .rot { margin-top: 6px; font-size: 13.5px; line-height: 1.5; color: var(--ink3); }
        .qs-sec-head { max-width: 1120px; margin: 0 auto; padding: 56px 22px 0; }
        .qs-sec-head h2 { margin-top: 14px; font-weight: 200; font-size: clamp(24px, 2.2vw, 34px); line-height: 1.15; color: var(--ink); }
        .qs-founders { max-width: 1120px; margin: 0 auto; padding: 28px 22px 16px; display: grid; grid-template-columns: 1fr; gap: 18px; }
        .qs-founder { display: flex; flex-direction: column; border-radius: 14px; overflow: hidden; background: rgba(14,18,24,.72); border: 1px solid var(--line-soft); }
        .qs-founder img { width: 100%; aspect-ratio: 4/5; object-fit: cover; display: block; }
        .qs-fbody { padding: 20px 22px 24px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .qs-fnome { font-weight: 400; font-size: 17px; color: var(--ink); }
        .qs-fcargo { font-family: var(--font-mono); font-size: 10px; letter-spacing: .22em; text-transform: uppercase; color: var(--accent); }
        .qs-fbio { margin-top: 6px; font-size: 13px; line-height: 1.6; color: var(--ink2); }
        .qs-flinks { margin-top: auto; padding-top: 14px; display: flex; gap: 16px; }
        .qs-flinks a { color: var(--ink3); display: inline-flex; }
        .qs-flinks a:hover { color: var(--ink); }
        .qs-fecho { padding: 40px 22px 48px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .qs-fecho p { font-weight: 200; font-size: clamp(24px, 2.2vw, 34px); line-height: 1.25; color: var(--ink); }
        .qs-fecho .acts { margin-top: 22px; }
        @media (min-width: 760px) {
          .qs-hero { padding: 150px 40px 20px; }
          .qs-hero h1 { font-size: clamp(30px, 3.4vw, 46px); }
          .qs-wrap { padding: 36px 40px 0; }
          .qs-empresa { margin-top: 44px; grid-template-columns: 1.4fr 1fr; gap: 56px; }
          .qs-sec-head { padding: 72px 40px 0; }
          .qs-founders { padding: 32px 40px 24px; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .qs-fecho { padding: 44px 40px 56px; }
        }
      `}</style>
      <main style={{ position: 'relative', zIndex: 3 }}>
        <section className="qs-hero">
          <div className="mono-label">{t('qs.label', 'Quem Somos')}</div>
          <h1>
            <Trans i18nKey="qs.headline" components={{ em: <em className="em" /> }}>
              Transformamos empresas tradicionais em organizações <em className="em">agênticas</em>.
            </Trans>
          </h1>
        </section>

        <div className="qs-wrap">
          <img
            className="qs-foto"
            src="/novo/assets/team/time-novo.jpg"
            alt={t('qs.fotoAlt', 'Time do Dalton Lab reunido no escritório')}
          />
          <div className="qs-empresa">
            <div>
              <p>
                {t(
                  'qs.co.p1',
                  'Nossa missão é clara: transformar empresas tradicionais em organizações agênticas, onde agentes de IA executam tarefas operacionais complexas e humanos se concentram em decisões estratégicas.',
                )}
              </p>
              <p>
                {t(
                  'qs.co.p2',
                  'Enquanto o mercado ainda debate o potencial da IA, nós já vivemos essa realidade. Somos 11 profissionais trabalhando lado a lado com mais de 30 agentes de IA proprietários — uma configuração híbrida que define a nova era do trabalho.',
                )}
              </p>
              <p>
                {t(
                  'qs.co.p3',
                  'Nesse modelo, agentes operam em escala e mantêm operações 24/7, enquanto humanos focam no que fazem de melhor: estratégia, relacionamentos e liderança.',
                )}
              </p>
              <p className="destaque">
                <Trans i18nKey="qs.co.destaque" components={{ em: <em className="em" /> }}>
                  Praticamos o que vendemos: escala infinita através de organizações <em className="em">agênticas</em>.
                </Trans>
              </p>
            </div>
            <div className="qs-stats">
              <div className="qs-stat">
                <div className="num">11</div>
                <div className="rot">{t('qs.stat1.l', 'profissionais')}</div>
              </div>
              <div className="qs-stat">
                <div className="num">+30</div>
                <div className="rot">{t('qs.stat2.l', 'agentes de IA proprietários')}</div>
              </div>
              <div className="qs-stat">
                <div className="num">24/7</div>
                <div className="rot">{t('qs.stat3.l', 'de operação contínua')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="qs-sec-head">
          <div className="mono-label">{t('qs.fo.label', 'Os fundadores')}</div>
          <h2>{t('qs.fo.head', 'Quem lidera essa transformação.')}</h2>
        </div>
        <div className="qs-founders">
          {FOUNDERS.map((f) => (
            <article className="qs-founder" key={f.nome}>
              <img src={f.foto} alt={f.nome} loading="lazy" />
              <div className="qs-fbody">
                <div className="qs-fnome">{f.nome}</div>
                <div className="qs-fcargo">{t(f.roleKey, f.roleDefault)}</div>
                <p className="qs-fbio">{t(f.bioKey, f.bioDefault)}</p>
                <div className="qs-flinks">
                  <a href={f.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${f.nome}`}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                      <path d={LINKEDIN_PATH} />
                    </svg>
                  </a>
                  {f.instagram && (
                    <a href={f.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram de ${f.nome}`}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                        <path d={INSTAGRAM_PATH} />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="qs-fecho">
          <p>
            <Trans i18nKey="casos.fecho" components={{ em: <em className="em" /> }}>
              Seja uma organização <em className="em">agêntica</em>.
            </Trans>
          </p>
          <div className="acts">
            <a
              className="btn-p"
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick(t('hero.cta1', 'Fale com um especialista'), 'qs_fecho', CONTACT_URL)}
            >
              {t('hero.cta1', 'Fale com um especialista')}
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default QuemSomos;

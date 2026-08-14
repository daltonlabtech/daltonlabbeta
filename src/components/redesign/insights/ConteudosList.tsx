import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { useArticles } from '@/hooks/useSanity';
import { trackCtaClick } from '@/lib/analytics';
import { PRESS_ITEMS, PRESS_GRADS } from '@/data/mediaContent';

const CONTACT_URL = 'https://formulario.daltonlab.ai/';

type Tipo = 'Artigo' | 'Mídia';
type Filtro = 'Todos' | 'Artigos' | 'Mídia';

interface Item {
  key: string;
  tipo: Tipo;
  titulo: string;
  data: string;
  veiculo: string;
  img?: string;
  /** Link externo (mídia) */
  href?: string;
  /** Rota interna (artigo) */
  to?: string;
}

/**
 * Lista da página /artigos no novo design — destaque + filtro Todos/Artigos/Mídia
 * + grid de cards. Artigos vêm do Sanity (estrutura mantida); mídia vem de
 * mediaContent.ts (mesma fonte do carrossel da home).
 *
 * Estados de loading/vazio usam as chaves insp.loading/insp.empty — são as
 * strings-sentinela do prerender; não remover nem trocar as chaves.
 */
export default function ConteudosList() {
  const { t, i18n } = useTranslation();
  const lang: 'pt' | 'en' = i18n.language?.startsWith('en') ? 'en' : 'pt';
  const [filtro, setFiltro] = useState<Filtro>('Todos');
  const { data: articles, isLoading } = useArticles();

  const itens = useMemo<Item[]>(() => {
    const arts: Item[] = (articles ?? []).map((a: { _id?: string; title: string; slug?: { current: string }; publishedAt?: string; thumbnailUrl?: string }) => ({
      key: a._id ?? a.slug?.current ?? a.title,
      tipo: 'Artigo',
      titulo: a.title,
      data: formatMonthYear(a.publishedAt, lang),
      veiculo: 'Dalton Lab',
      img: a.thumbnailUrl,
      to: `/artigos/${a.slug?.current ?? ''}`,
    }));
    const midia: Item[] = PRESS_ITEMS.map((m) => ({
      key: m.id,
      tipo: 'Mídia',
      titulo: m.titulo[lang],
      data: m.data[lang],
      veiculo: m.veiculo,
      img: m.img,
      href: m.url,
    }));
    return [...arts, ...midia];
  }, [articles, lang]);

  const lista = itens.filter((x) =>
    filtro === 'Todos' ? true : filtro === 'Artigos' ? x.tipo === 'Artigo' : x.tipo === 'Mídia',
  );
  const destaque = lista[0];
  const resto = lista.slice(1);

  const filtros: Filtro[] = ['Todos', 'Artigos', 'Mídia'];
  const filtroLabel: Record<Filtro, string> = {
    Todos: t('conteudos.todos', 'Todos'),
    Artigos: t('conteudos.artigos', 'Artigos'),
    Mídia: t('conteudos.midia', 'Mídia'),
  };

  return (
    <>
      <style>{`
        .ct-hero { padding: 110px 22px 24px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .ct-hero h1 { margin-top: 18px; font-weight: 200; font-size: clamp(26px, 7.8vw, 31px); line-height: 1.08; letter-spacing: -0.01em; color: var(--ink); max-width: 840px; text-wrap: balance; }
        .ct-wrap { max-width: 1120px; margin: 0 auto; padding: 0 22px 48px; }
        .ct-feat { display: grid; grid-template-columns: 1fr; border-radius: 16px; overflow: hidden; background: rgba(14,18,24,.72); border: 1px solid var(--line-soft); transition: border-color .3s; color: inherit; }
        .ct-feat:hover { border-color: var(--line); color: inherit; }
        .ct-img { background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; }
        .ct-feat .ct-img { min-height: 190px; }
        .ct-feat .body { padding: 22px; display: flex; flex-direction: column; gap: 12px; }
        .ct-tagrow { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; }
        .ct-tag { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: .26em; text-transform: uppercase; color: var(--accent); }
        .ct-tag.artigo { color: #c9b8ff; }
        .ct-data { font-family: var(--font-mono); font-size: 10px; letter-spacing: .1em; color: var(--ink3); }
        .ct-feat h2 { font-weight: 200; font-size: clamp(19px, 1.8vw, 26px); line-height: 1.3; color: var(--ink); }
        .ct-veic { margin-top: auto; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .08em; color: var(--ink3); }
        .ct-leia { display: inline-flex; align-items: center; gap: 8px; margin-top: 14px; font-size: 14px; color: var(--accent); }
        .ct-filtro { margin-top: 32px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .ct-filtro .lbl { font-family: var(--font-mono); font-size: 10px; letter-spacing: .26em; text-transform: uppercase; color: var(--ink3); margin-right: 8px; }
        .ct-pill { flex: none; padding: 10px 20px; min-height: 40px; border-radius: 999px; font-size: 13.5px; cursor: pointer; white-space: nowrap; border: 1px solid var(--line); background: rgba(16,20,27,.7); backdrop-filter: blur(8px); color: var(--ink2); transition: background .2s, color .2s, border-color .2s; }
        .ct-pill:hover { color: var(--ink); }
        .ct-pill.on { background: var(--accent); border-color: var(--accent); color: #04121a; box-shadow: 0 0 26px rgba(143,230,255,.28); }
        .ct-grid { margin-top: 28px; display: grid; grid-template-columns: 1fr; gap: 14px; }
        .ct-card { display: flex; flex-direction: column; border-radius: 14px; overflow: hidden; background: rgba(14,18,24,.72); border: 1px solid var(--line-soft); transition: border-color .3s, transform .2s; color: inherit; }
        .ct-card:hover { border-color: var(--line); transform: translateY(-2px); color: var(--ink2); }
        .ct-card .ct-img { aspect-ratio: 16/9; }
        .ct-card .body { padding: 16px 18px 20px; display: flex; flex-direction: column; gap: 9px; flex: 1; }
        .ct-card h3 { font-weight: 400; font-size: 13.5px; line-height: 1.45; color: var(--ink); }
        .ct-fallback { font-family: var(--font-mono); font-size: 11px; letter-spacing: .22em; text-transform: uppercase; color: rgba(230,237,244,.8); text-align: center; padding: 0 20px; }
        .ct-vazio { margin-top: 28px; border: 1px dashed var(--line); border-radius: 14px; padding: 48px 32px; display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; }
        .ct-vazio .tt { font-weight: 200; font-size: 19px; color: var(--ink); }
        .ct-vazio .ss { font-size: 13.5px; color: var(--ink3); max-width: 46ch; }
        .ct-fecho { padding: 20px 22px 40px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .ct-fecho p { font-weight: 200; font-size: clamp(24px, 2.2vw, 34px); line-height: 1.25; color: var(--ink); }
        .ct-fecho .acts { margin-top: 22px; }
        .ct-loading { margin-top: 24px; text-align: center; font-family: var(--font-mono); font-size: 11px; letter-spacing: .14em; color: var(--ink3); }
        @media (min-width: 760px) {
          .ct-hero { padding: 150px 40px 32px; }
          .ct-hero h1 { font-size: clamp(30px, 3.4vw, 46px); }
          .ct-wrap { padding: 0 40px 56px; }
          .ct-feat { grid-template-columns: 1.25fr 1fr; }
          .ct-feat .ct-img { min-height: 300px; }
          .ct-feat .body { padding: 34px 36px; gap: 14px; }
          .ct-filtro { margin-top: 40px; }
          .ct-grid { margin-top: 28px; grid-template-columns: repeat(3, 1fr); gap: 16px; }
          .ct-fecho { padding: 20px 40px 48px; }
        }
      `}</style>

      <section className="ct-hero">
        <div className="mono-label">{t('conteudos.label', 'Conteúdos')}</div>
        <h1>
          <Trans i18nKey="conteudos.title" components={{ em: <em className="em" /> }}>
            O Dalton Lab na mídia e nossos <em className="em">artigos</em>.
          </Trans>
        </h1>
      </section>

      <div className="ct-wrap" aria-live="polite">
        {isLoading && <div className="ct-loading">{t('insp.loading', 'Carregando…')}</div>}

        {destaque && (
          <ItemLink item={destaque} className="ct-feat">
            <ItemImg item={destaque} index={0} />
            <span className="body">
              <span className="ct-tagrow">
                <span className={`ct-tag${destaque.tipo === 'Artigo' ? ' artigo' : ''}`}>
                  {destaque.tipo === 'Artigo' ? t('conteudos.tagArtigo', 'Artigo') : t('press.tag', 'Mídia')}
                </span>
                <span className="ct-data">{destaque.data}</span>
              </span>
              <h2>{destaque.titulo}</h2>
              <span className="ct-veic">{destaque.veiculo}</span>
              <span className="ct-leia">
                {destaque.tipo === 'Artigo' ? t('conteudos.leiaArtigo', 'Leia o artigo →') : t('conteudos.leia', 'Leia a matéria →')}
              </span>
            </span>
          </ItemLink>
        )}

        <div className="ct-filtro" role="group" aria-label={t('conteudos.filterAria', 'Filtrar conteúdo')}>
          <span className="lbl">{t('conteudos.filtrar', 'Filtrar')}</span>
          {filtros.map((f) => (
            <button
              key={f}
              type="button"
              className={`ct-pill${f === filtro ? ' on' : ''}`}
              aria-pressed={f === filtro}
              onClick={() => setFiltro(f)}
            >
              {filtroLabel[f]}
            </button>
          ))}
        </div>

        {resto.length > 0 && (
          <div className="ct-grid">
            {resto.map((item, i) => (
              <ItemLink key={item.key} item={item} className="ct-card">
                <ItemImg item={item} index={i + 1} />
                <span className="body">
                  <span className="ct-tagrow">
                    <span className={`ct-tag${item.tipo === 'Artigo' ? ' artigo' : ''}`}>
                      {item.tipo === 'Artigo' ? t('conteudos.tagArtigo', 'Artigo') : t('press.tag', 'Mídia')}
                    </span>
                    <span className="ct-data">{item.data}</span>
                  </span>
                  <h3>{item.titulo}</h3>
                  <span className="ct-veic">{item.veiculo} →</span>
                </span>
              </ItemLink>
            ))}
          </div>
        )}

        {!isLoading && lista.length === 0 && (
          <div className="ct-vazio">
            <div className="tt">{t('insp.empty', 'Nada encontrado.')}</div>
            <div className="ss">
              {t('conteudos.vazioSub', 'Estamos preparando publicações sobre organizações agênticas, agentes de IA na operação e o futuro do trabalho.')}
            </div>
          </div>
        )}
      </div>

      <section className="ct-fecho">
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
            onClick={() => trackCtaClick(t('hero.cta1', 'Fale com um especialista'), 'conteudos_fecho', CONTACT_URL)}
          >
            {t('hero.cta1', 'Fale com um especialista')}
          </a>
        </div>
      </section>
    </>
  );
}

function ItemLink({ item, className, children }: { item: Item; className: string; children: React.ReactNode }) {
  if (item.to) {
    return (
      <Link to={item.to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function ItemImg({ item, index }: { item: Item; index: number }) {
  if (item.img) {
    return <div className="ct-img" style={{ backgroundImage: `url('${item.img}')` }} />;
  }
  return (
    <div className="ct-img" style={{ background: PRESS_GRADS[index % PRESS_GRADS.length] }}>
      <span className="ct-fallback">{item.veiculo}</span>
    </div>
  );
}

function formatMonthYear(iso: string | undefined, lang: 'pt' | 'en') {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const s = d.toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', { month: 'short', year: 'numeric' });
  return s.charAt(0).toUpperCase() + s.slice(1).replace('. de ', ' ');
}

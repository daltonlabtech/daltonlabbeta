import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Domínio canônico de produção. O canonical/OG:url sempre apontam para este
 * host — nunca para URLs de preview da Vercel — para que os buscadores
 * consolidem os sinais no domínio correto.
 */
export const SITE_URL = 'https://daltonlab.ai';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface SeoProps {
  /** <title> completo da página (já inclui sufixo de marca quando aplicável). */
  title: string;
  /** meta description / og:description / twitter:description. */
  description: string;
  /**
   * URL canônica completa. Se omitida, é derivada de SITE_URL + pathname atual
   * (self-referencing canonical por rota).
   */
  canonical?: string;
  /** Imagem social absoluta ou caminho relativo (default: /og-image.png). */
  image?: string;
  /** og:type — "website" para páginas, "article" para artigos. */
  type?: 'website' | 'article';
  /** Impede indexação (ex.: página 404). Também suprime o canonical. */
  noindex?: boolean;
}

const toAbsolute = (url: string): string => {
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

/**
 * Gerencia o <head> por rota via react-helmet-async: title, description,
 * canonical e tags Open Graph / Twitter. Fonte única dessas tags — os
 * equivalentes estáticos foram removidos do index.html para evitar duplicatas.
 */
const Seo = ({ title, description, canonical, image, type = 'website', noindex = false }: SeoProps) => {
  const location = useLocation();
  const { i18n } = useTranslation();

  const canonicalUrl = canonical ?? `${SITE_URL}${location.pathname}`;
  const ogImage = toAbsolute(image ?? DEFAULT_OG_IMAGE);
  const ogLocale = (i18n.language || 'pt').startsWith('en') ? 'en_US' : 'pt_BR';

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <link rel="canonical" href={canonicalUrl} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Dalton Lab" />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@DaltonLab" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
    </Helmet>
  );
};

export default Seo;

import { describe, it, expect, beforeEach } from 'vitest';
import { render, waitFor, cleanup } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import Seo, { SITE_URL, SeoProps } from './Seo';
import '@/lib/i18n'; // initialize global i18n so useTranslation works

const renderSeo = (props: SeoProps, path = '/quem-somos') =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Seo {...props} />
      </MemoryRouter>
    </HelmetProvider>,
  );

const canonicals = () => document.head.querySelectorAll('link[rel="canonical"]');
const descriptions = () => document.head.querySelectorAll('meta[name="description"]');

describe('Seo', () => {
  beforeEach(() => {
    cleanup();
  });

  it('emits a self-referencing canonical for a static route', async () => {
    renderSeo({ title: 'Quem Somos | Dalton Lab', description: 'Sobre a Dalton Lab.' }, '/quem-somos');
    await waitFor(() => {
      expect(document.title).toBe('Quem Somos | Dalton Lab');
    });
    expect(canonicals()).toHaveLength(1);
    expect(canonicals()[0].getAttribute('href')).toBe(`${SITE_URL}/quem-somos`);
  });

  it('emits exactly one description meta tag', async () => {
    renderSeo({ title: 'T', description: 'Uma descrição única.' }, '/artigos');
    await waitFor(() => {
      expect(document.title).toBe('T');
    });
    expect(descriptions()).toHaveLength(1);
    expect(descriptions()[0].getAttribute('content')).toBe('Uma descrição única.');
  });

  it('reflects article title/description and og:type=article', async () => {
    renderSeo(
      { title: 'Meu Artigo | Dalton Lab', description: 'Resumo do artigo.', type: 'article' },
      '/artigos/meu-artigo',
    );
    await waitFor(() => {
      expect(document.title).toBe('Meu Artigo | Dalton Lab');
    });
    expect(canonicals()[0].getAttribute('href')).toBe(`${SITE_URL}/artigos/meu-artigo`);
    const ogType = document.head.querySelector('meta[property="og:type"]');
    expect(ogType?.getAttribute('content')).toBe('article');
    const ogDesc = document.head.querySelector('meta[property="og:description"]');
    expect(ogDesc?.getAttribute('content')).toBe('Resumo do artigo.');
  });

  it('uses the default og-image', async () => {
    renderSeo({ title: 'T', description: 'D' }, '/');
    await waitFor(() => {
      expect(document.title).toBe('T');
    });
    const ogImage = document.head.querySelector('meta[property="og:image"]');
    expect(ogImage?.getAttribute('content')).toBe(`${SITE_URL}/og-image.png`);
  });

  it('emits noindex (and no canonical) when noindex is set', async () => {
    renderSeo({ title: '404', description: 'Not found', noindex: true }, '/rota-inexistente');
    await waitFor(() => {
      expect(document.title).toBe('404');
    });
    expect(canonicals()).toHaveLength(0);
    const robots = document.head.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute('content')).toBe('noindex, follow');
  });
});

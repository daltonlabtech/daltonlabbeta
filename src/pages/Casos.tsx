import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '@/lib/analytics';
import Seo from '@/components/Seo';
import SiteHeader from '@/components/redesign/shell/SiteHeader';
import SiteFooter from '@/components/redesign/shell/SiteFooter';
import CasosIndex from '@/components/redesign/casos/CasosIndex';
import CasoReader from '@/components/redesign/casos/CasoReader';
import { getAgenticCase } from '@/data/agenticCases';

/**
 * /casos — duas telas por hash, como no protótipo:
 * sem hash → índice com filtros por setor; `#caso-<slug>` → leitor do caso.
 * A rota permanece única (amigável ao sitemap/prerender).
 */
export default function Casos() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const match = location.hash.match(/^#caso-([a-z0-9-]+)$/);
  const caso = getAgenticCase(match?.[1]);

  useEffect(() => {
    trackPageView(window.location.pathname, t('pages.casos.title', 'Casos | Dalton Lab'));
  }, [t]);

  // Troca de tela (índice ↔ leitor) sempre volta ao topo, como no protótipo.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [caso?.slug]);

  const abrir = (slug: string) => navigate(`/casos#caso-${slug}`);
  const voltar = () => navigate('/casos');

  return (
    <div className="redesign-scope min-h-screen" style={{ background: 'transparent', color: 'var(--ink2)' }}>
      <Seo
        title={t('pages.casos.title', 'Casos | Dalton Lab')}
        description={t('pages.casos.description', 'Organizações que já operam com agentes de IA.')}
      />
      <SiteHeader />
      <main aria-live="polite" style={{ position: 'relative', zIndex: 3 }}>
        {caso ? <CasoReader caso={caso} onBack={voltar} /> : <CasosIndex onOpen={abrir} />}
      </main>
      <SiteFooter />
    </div>
  );
}

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { trackPageView } from '@/lib/analytics'
import Seo from '@/components/Seo'
import SiteHeader from '@/components/redesign/shell/SiteHeader'
import SiteFooter from '@/components/redesign/shell/SiteFooter'
import ConteudosList from '@/components/redesign/insights/ConteudosList'

const Artigos = () => {
  const { t } = useTranslation()

  const pageTitle = `${t('articles.pageTitle', 'Conteúdos')} | Dalton Lab`
  const pageDescription = t(
    'conteudos.lede',
    'O Dalton Lab na mídia e nossos artigos sobre organizações agênticas.',
  )

  useEffect(() => {
    trackPageView('/artigos', t('articles.pageTitle', 'Conteúdos'))
  }, [t])

  return (
    <div className="redesign-scope" style={{ minHeight: '100vh', background: 'transparent' }}>
      <Seo title={pageTitle} description={pageDescription} />
      <SiteHeader />
      <main style={{ position: 'relative', zIndex: 3 }}>
        <ConteudosList />
      </main>
      <SiteFooter />
    </div>
  )
}

export default Artigos

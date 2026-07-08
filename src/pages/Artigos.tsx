import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { trackPageView } from '@/lib/analytics'
import Seo from '@/components/Seo'
import SiteHeader from '@/components/redesign/shell/SiteHeader'
import SiteFooter from '@/components/redesign/shell/SiteFooter'
import InsightsList from '@/components/redesign/insights/InsightsList'

const Artigos = () => {
  const { t } = useTranslation()

  const pageTitle = `${t('articles.pageTitle', 'Insights')} | Dalton Lab`
  const pageDescription = t(
    'insp.lede',
    'Ideias, artigos e pontos de vista sobre transformação agêntica.',
  )

  useEffect(() => {
    trackPageView('/artigos', t('articles.pageTitle', 'Insights'))
  }, [t])

  return (
    <div className="redesign-scope" style={{ minHeight: '100vh', background: 'transparent' }}>
      <Seo title={pageTitle} description={pageDescription} />
      <SiteHeader />
      <main>
        <InsightsList />
      </main>
      <SiteFooter />
    </div>
  )
}

export default Artigos

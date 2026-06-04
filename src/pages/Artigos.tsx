import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { trackPageView } from '@/lib/analytics'
import SiteHeader from '@/components/redesign/shell/SiteHeader'
import SiteFooter from '@/components/redesign/shell/SiteFooter'
import InsightsList from '@/components/redesign/insights/InsightsList'

const Artigos = () => {
  const { t } = useTranslation()

  useEffect(() => {
    const pageTitle = t('articles.pageTitle', 'Insights') + ' | Dalton Lab'
    document.title = pageTitle
    trackPageView('/artigos', t('articles.pageTitle', 'Insights'))
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        t('insp.lede', 'Ideias, artigos e pontos de vista sobre transformação agêntica.'),
      )
    }
  }, [t])

  return (
    <div className="redesign-scope" style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <SiteHeader />
      <main>
        <InsightsList />
      </main>
      <SiteFooter />
    </div>
  )
}

export default Artigos

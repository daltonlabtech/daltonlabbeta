import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { trackPageView } from '@/lib/analytics'
import Seo from '@/components/Seo'
import SiteHeader from '@/components/redesign/shell/SiteHeader'
import SiteFooter from '@/components/redesign/shell/SiteFooter'
import StaticInsightReader from '@/components/redesign/insights/StaticInsightReader'
import { findInsight, L } from '@/data/insightsContent'

const ArtigoInsight = () => {
  const { id = '' } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('pt') ? 'pt' : 'en'
  const insight = findInsight(id)
  const title = insight ? L(insight.title, lang) : ''

  useEffect(() => {
    if (insight) {
      trackPageView(`/artigos/insight/${id}`, title)
    }
  }, [insight, id, title])

  const description =
    (insight && L(insight.dek, lang)) ||
    t('insp.lede', 'Publicações do Dalton Lab e o que nosso time está pensando sobre a era agêntica.')

  return (
    <div className="redesign-scope" style={{ minHeight: '100vh', background: 'transparent' }}>
      {insight && (
        <Seo title={`${title} | Dalton Lab`} description={description} type="article" />
      )}
      <SiteHeader />
      <main>
        <StaticInsightReader id={id} />
      </main>
      <SiteFooter />
    </div>
  )
}

export default ArtigoInsight

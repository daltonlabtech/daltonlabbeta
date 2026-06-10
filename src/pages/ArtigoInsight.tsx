import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { trackPageView } from '@/lib/analytics'
import SiteHeader from '@/components/redesign/shell/SiteHeader'
import SiteFooter from '@/components/redesign/shell/SiteFooter'
import StaticInsightReader from '@/components/redesign/insights/StaticInsightReader'
import { findInsight, L } from '@/data/insightsContent'

const ArtigoInsight = () => {
  const { id = '' } = useParams<{ id: string }>()
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('pt') ? 'pt' : 'en'
  const insight = findInsight(id)

  useEffect(() => {
    if (insight) {
      const title = L(insight.title, lang)
      document.title = `${title} | Dalton Lab`
      trackPageView(`/artigos/insight/${id}`, title)
    }
  }, [insight, id, lang])

  return (
    <div className="redesign-scope" style={{ minHeight: '100vh', background: 'transparent' }}>
      <SiteHeader />
      <main>
        <StaticInsightReader id={id} />
      </main>
      <SiteFooter />
    </div>
  )
}

export default ArtigoInsight

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { trackPageView } from '@/lib/analytics'
import SiteHeader from '@/components/redesign/shell/SiteHeader'
import SiteFooter from '@/components/redesign/shell/SiteFooter'
import InsightsReader from '@/components/redesign/insights/InsightsReader'
import { useArticle } from '@/hooks/useSanity'

const Artigo = () => {
  const { slug = '' } = useParams<{ slug: string }>()
  const { data: article } = useArticle(slug) as { data?: { title?: string } }

  useEffect(() => {
    if (article?.title) {
      document.title = `${article.title} | Dalton Lab`
      trackPageView(`/artigos/${slug}`, article.title)
    }
  }, [article?.title, slug])

  return (
    <div className="redesign-scope" style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <SiteHeader />
      <main>
        <InsightsReader slug={slug} />
      </main>
      <SiteFooter />
    </div>
  )
}

export default Artigo

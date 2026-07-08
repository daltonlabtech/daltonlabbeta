import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { trackPageView } from '@/lib/analytics'
import Seo from '@/components/Seo'
import SiteHeader from '@/components/redesign/shell/SiteHeader'
import SiteFooter from '@/components/redesign/shell/SiteFooter'
import InsightsReader from '@/components/redesign/insights/InsightsReader'
import { useArticle } from '@/hooks/useSanity'
import { getArticleExcerpt, PortableTextBlock } from '@/lib/excerpt'

const Artigo = () => {
  const { t } = useTranslation()
  const { slug = '' } = useParams<{ slug: string }>()
  const { data: article } = useArticle(slug) as {
    data?: { title?: string; body?: PortableTextBlock[] }
  }

  useEffect(() => {
    if (article?.title) {
      trackPageView(`/artigos/${slug}`, article.title)
    }
  }, [article?.title, slug])

  // Description derivada do primeiro parágrafo do corpo (mesma lógica dos cards).
  // Fallback para a lede da seção de conteúdos quando o artigo não tem corpo legível.
  const fallbackDescription = t(
    'insp.lede',
    'Publicações do Dalton Lab e o que nosso time está pensando sobre a era agêntica.',
  )
  const description = getArticleExcerpt(article?.body) || fallbackDescription
  const title = article?.title ? `${article.title} | Dalton Lab` : 'Dalton Lab'

  return (
    <div className="redesign-scope" style={{ minHeight: '100vh', background: 'transparent' }}>
      <Seo title={title} description={description} type="article" />
      <SiteHeader />
      <main>
        <InsightsReader slug={slug} />
      </main>
      <SiteFooter />
    </div>
  )
}

export default Artigo

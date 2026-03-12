import { lazy, Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { trackPageView } from '@/lib/analytics'
import Header from '@/components/Header'
import SkeletonSection from '@/components/ui/SkeletonSection'
import { useArticles } from '@/hooks/useSanity'
import ArticleFeatured from '@/components/sections/articles/ArticleFeatured'
import ArticleGrid from '@/components/sections/articles/ArticleGrid'

const Footer = lazy(() => import('@/components/sections/Footer'))

const Artigos = () => {
  const { t } = useTranslation()
  const { data: articles = [], isLoading } = useArticles()

  useEffect(() => {
    const pageTitle = t('articles.pageTitle') + ' | Dalton Lab';
    document.title = pageTitle;
    trackPageView('/artigos', t('articles.pageTitle'));
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', t('articles.pageSubtitle'))
    }
  }, [t])

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Hero */}
      <section className="pt-32 pb-16 px-5 md:px-12 lg:px-20">
        <div className="container mx-auto max-w-5xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: '#F5F3F0' }}
          >
            {t('articles.pageTitle')}
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(245, 243, 240, 0.6)' }}
          >
            {t('articles.pageSubtitle')}
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {isLoading ? (
        <section className="px-5 md:px-12 lg:px-20 pb-16">
          <div className="container mx-auto max-w-6xl">
            <SkeletonSection height="min-h-[400px]" />
          </div>
        </section>
      ) : articles.length > 0 ? (
        <section className="px-5 md:px-12 lg:px-20 pb-16">
          <div className="container mx-auto max-w-6xl">
            <ArticleFeatured article={articles[0]} />
          </div>
        </section>
      ) : null}

      {/* Articles Grid */}
      {!isLoading && articles.length > 1 && (
        <section className="px-5 md:px-12 lg:px-20 pb-24">
          <div className="container mx-auto max-w-6xl">
            <h2
              className="text-2xl font-semibold mb-10"
              style={{ color: '#F5F3F0' }}
            >
              {t('articles.latestThinking')}
            </h2>
            <ArticleGrid articles={articles.slice(1)} />
          </div>
        </section>
      )}

      <Suspense fallback={<SkeletonSection height="min-h-[300px]" />}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default Artigos

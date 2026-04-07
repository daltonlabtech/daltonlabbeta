import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PortableText } from '@portabletext/react'
import { trackPageView } from '@/lib/analytics'
import Header from '@/components/Header'
import { useArticle, useRelatedArticles } from '@/hooks/useSanity'

const countWords = (body?: unknown[]): number => {
  if (!Array.isArray(body)) return 0
  return body.reduce((acc, block: unknown) => {
    const b = block as { _type?: string; children?: Array<{ text?: string }> }
    if (b._type !== 'block' || !b.children) return acc
    return acc + b.children.reduce((s, c) => s + (c.text?.split(/\s+/).length ?? 0), 0)
  }, 0)
}

const portableTextComponents = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl font-bold mt-10 mb-4" style={{ color: '#F5F3F0' }}>{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold mt-8 mb-3" style={{ color: '#F5F3F0' }}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold mt-6 mb-2" style={{ color: '#F5F3F0' }}>{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-5 leading-relaxed" style={{ color: 'rgba(245, 243, 240, 0.75)' }}>{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote
        className="border-l-4 pl-5 my-6 italic"
        style={{ borderColor: '#3B82F6', color: 'rgba(245, 243, 240, 0.7)' }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-5 space-y-1" style={{ color: 'rgba(245, 243, 240, 0.75)' }}>{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-5 space-y-1" style={{ color: 'rgba(245, 243, 240, 0.75)' }}>{children}</ol>
    ),
  },
}

const RelatedArticles = ({
  articles,
}: {
  articles: Array<{ title: string; slug: { current: string }; publishedAt: string }>
}) => {
  const { t } = useTranslation()
  if (!articles.length) return null

  return (
    <div>
      <h3
        className="text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: 'rgba(245, 243, 240, 0.5)' }}
      >
        {t('articles.relatedArticles')}
      </h3>
      <div className="flex flex-col">
        {articles.map((a, i) => (
          <a
            key={a.slug.current}
            href={`/artigos/${a.slug.current}`}
            className={`group flex items-center justify-between gap-3 py-4 transition-colors duration-200 ${
              i < articles.length - 1 ? 'border-b border-white/[0.08]' : ''
            }`}
          >
            <p
              className="text-sm font-medium line-clamp-2 group-hover:text-dalton-blue transition-colors duration-200"
              style={{ color: '#F5F3F0' }}
            >
              {a.title}
            </p>
            <span
              className="flex-shrink-0 text-sm transition-transform duration-200 group-hover:translate-x-1 inline-block"
              style={{ color: '#3B82F6' }}
            >
              →
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

const Artigo = () => {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const { data: article, isLoading } = useArticle(slug ?? '')
  const { data: related = [] } = useRelatedArticles(slug ?? '')

  const readTime = Math.max(1, Math.round(countWords(article?.body) / 200))

  useEffect(() => {
    if (article?.title) {
      const pageTitle = `${article.title} | Dalton Lab`;
      document.title = pageTitle;
      trackPageView(`/artigos/${slug}`, article.title);
    }
  }, [article?.title, slug])

  const date = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : ''

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-2 border-dalton-blue border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    )
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <p style={{ color: 'rgba(245, 243, 240, 0.6)' }}>Artigo não encontrado.</p>
          <a href="/artigos" className="text-sm underline" style={{ color: '#3B82F6' }}>
            {t('articles.backToArticles')}
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero tipográfico */}
      <section className="px-5 md:px-12 lg:px-20 pt-36 pb-12 border-b border-white/10">
        <div className="container mx-auto max-w-4xl">
          {/* Voltar */}
          <a
            href="/artigos"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors duration-200 hover:text-dalton-blue"
            style={{ color: 'rgba(245, 243, 240, 0.5)' }}
          >
            ← {t('articles.backToArticles')}
          </a>

          {/* Título */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8"
            style={{ color: '#F5F3F0' }}
          >
            {article.title}
          </h1>

          {/* Metadados */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium" style={{ color: 'rgba(245, 243, 240, 0.7)' }}>
              {article.author}
            </span>
            <span style={{ color: 'rgba(245, 243, 240, 0.3)' }}>·</span>
            <span className="text-sm" style={{ color: 'rgba(245, 243, 240, 0.5)' }}>
              {t('articles.publishedAt')} {date}
            </span>
            <span style={{ color: 'rgba(245, 243, 240, 0.3)' }}>·</span>
            <span className="text-sm" style={{ color: 'rgba(245, 243, 240, 0.5)' }}>
              {readTime} {t('articles.readTime')}
            </span>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="px-5 md:px-12 lg:px-20 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Body */}
            <div className="lg:col-span-2 prose prose-invert max-w-none">
              {article.body && (
                <PortableText value={article.body} components={portableTextComponents} />
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 flex flex-col gap-8">
                {/* Info card */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: '#F5F3F0' }}
                  >
                    {article.author}
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(245, 243, 240, 0.5)' }}>
                    {date}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(245, 243, 240, 0.4)' }}>
                    {readTime} {t('articles.readTime')}
                  </p>
                </div>

                <RelatedArticles articles={related} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Artigo

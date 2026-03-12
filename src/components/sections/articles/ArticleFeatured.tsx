import { useTranslation } from 'react-i18next'

interface ArticleFeaturedProps {
  article: {
    _id: string
    title: string
    slug: { current: string }
    author: string
    publishedAt: string
    thumbnail?: object
    thumbnailUrl?: string
    body?: Array<{ _type: string; children?: Array<{ text: string }> }>
  }
}

const getExcerpt = (body?: Array<{ _type: string; children?: Array<{ text: string }> }>) => {
  if (!body) return ''
  const block = body.find(b => b._type === 'block' && b.children?.length)
  if (!block?.children) return ''
  return block.children.map(c => c.text).join('').slice(0, 220) + '…'
}

const ArticleFeatured = ({ article }: ArticleFeaturedProps) => {
  const { t } = useTranslation()

  const date = new Date(article.publishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div
      className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/[0.04] cursor-pointer hover:bg-white/[0.07] transition-colors duration-300"
      onClick={() => window.location.href = `/artigos/${article.slug.current}`}
    >
      {/* Borda esquerda azul */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-dalton-blue" />

      <div className="p-10 lg:p-16">
        {/* Tag destaque */}
        <span
          className="inline-block text-xs font-semibold tracking-widest uppercase mb-6"
          style={{ color: '#3B82F6' }}
        >
          {t('articles.featuredLabel')}
        </span>

        {/* Título */}
        <h2
          className="text-3xl lg:text-4xl font-bold leading-tight mb-5 max-w-3xl"
          style={{ color: '#F5F3F0' }}
        >
          {article.title}
        </h2>

        {/* Excerpt */}
        <p
          className="text-base leading-relaxed mb-8 max-w-2xl"
          style={{ color: 'rgba(245, 243, 240, 0.6)' }}
        >
          {getExcerpt(article.body)}
        </p>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium" style={{ color: 'rgba(245, 243, 240, 0.6)' }}>
              {article.author}
            </span>
            <span style={{ color: 'rgba(245, 243, 240, 0.3)' }}>·</span>
            <span className="text-sm" style={{ color: 'rgba(245, 243, 240, 0.4)' }}>
              {date}
            </span>
          </div>

          <a
            href={`/artigos/${article.slug.current}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 group"
            style={{ color: '#F5F3F0' }}
          >
            {t('articles.readArticle')}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ArticleFeatured

import { useTranslation } from 'react-i18next'
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal'

interface ArticleCardProps {
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
  index?: number
}

const getExcerpt = (body?: Array<{ _type: string; children?: Array<{ text: string }> }>) => {
  if (!body) return ''
  const block = body.find(b => b._type === 'block' && b.children?.length)
  if (!block?.children) return ''
  return block.children.map(c => c.text).join('').slice(0, 120) + '…'
}

const ArticleCard = ({ article, index = 0 }: ArticleCardProps) => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollReveal()

  const date = new Date(article.publishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={`/artigos/${article.slug.current}`}
      className={`group flex flex-col min-h-[220px] rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08] transition-all duration-300 p-7 ${revealClasses(isVisible)}`}
      style={getStaggerDelay(index)}
    >
      {/* Topo: data */}
      <div className="mb-4">
        <span className="text-xs" style={{ color: 'rgba(245, 243, 240, 0.4)' }}>
          {date}
        </span>
      </div>

      {/* Título */}
      <h3
        className="text-base font-semibold mb-3 line-clamp-2 transition-colors duration-200 group-hover:text-dalton-blue"
        style={{ color: '#F5F3F0' }}
      >
        {article.title}
      </h3>

      {/* Excerpt */}
      <p
        className="text-sm line-clamp-3 leading-relaxed flex-1"
        style={{ color: 'rgba(245, 243, 240, 0.55)' }}
      >
        {getExcerpt(article.body)}
      </p>

      {/* Rodapé: autor + seta */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.08]">
        <span className="text-xs font-medium" style={{ color: 'rgba(245, 243, 240, 0.5)' }}>
          {article.author}
        </span>
        <span
          className="text-xs font-semibold transition-transform duration-200 group-hover:translate-x-1 inline-block"
          style={{ color: '#3B82F6' }}
        >
          →
        </span>
      </div>
    </a>
  )
}

export default ArticleCard

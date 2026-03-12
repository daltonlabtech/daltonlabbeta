import ArticleCard from './ArticleCard'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  author: string
  publishedAt: string
  thumbnail?: object
  body?: Array<{ _type: string; children?: Array<{ text: string }> }>
}

interface ArticleGridProps {
  articles: Article[]
}

const ArticleGrid = ({ articles }: ArticleGridProps) => {
  if (!articles.length) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <ArticleCard key={article._id} article={article} index={index} />
      ))}
    </div>
  )
}

export default ArticleGrid

import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/sanity'

const ARTICLES_LIST_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  _id, title, slug, author, publishedAt, thumbnail, thumbnailUrl, body
}`

const ARTICLE_BY_SLUG_QUERY = `*[_type == "article" && slug.current == $slug][0] {
  title, author, publishedAt, coverImage, coverImageUrl, body
}`

const RELATED_ARTICLES_QUERY = `*[_type == "article" && slug.current != $slug] | order(publishedAt desc) [0..1] {
  title, slug, thumbnail, thumbnailUrl, publishedAt
}`

export const useArticles = () =>
  useQuery({ queryKey: ['articles'], queryFn: () => client.fetch(ARTICLES_LIST_QUERY) })

export const useArticle = (slug: string) =>
  useQuery({ queryKey: ['article', slug], queryFn: () => client.fetch(ARTICLE_BY_SLUG_QUERY, { slug }) })

export const useRelatedArticles = (slug: string) =>
  useQuery({ queryKey: ['related', slug], queryFn: () => client.fetch(RELATED_ARTICLES_QUERY, { slug }) })

#!/usr/bin/env node
/**
 * Build-time dynamic sitemap generator.
 *
 * Queries Sanity for published articles and produces a complete sitemap.xml
 * containing the public static routes + one <url> per article.
 *
 * Guard-rail: if the Sanity query fails OR returns zero articles, the script
 * exits non-zero (failing the build) and does NOT overwrite the existing
 * sitemap with an article-less one.
 *
 * Wired into the build via the `prebuild` npm script, so it runs before
 * `vite build` copies public/ into dist/.
 */
import { createClient } from '@sanity/client'
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { SITE_URL } from '../shared/site.mjs'

export { SITE_URL }

/**
 * Public static routes to include.
 *
 * Excluded on purpose:
 *  - /produto, /newton      -> legacy; 301 → / (not indexed)
 *  - *  (NotFound)          -> not a real page
 *  - /artigos/insight/:id   -> dynamic, non-canonical entry route
 *  - /casos and /casos/:slug -> SPA-only (no prerender snapshot yet)
 */
export const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/quem-somos', changefreq: 'monthly', priority: '0.7' },
  { path: '/artigos', changefreq: 'weekly', priority: '0.8' },
  { path: '/politica-de-privacidade', changefreq: 'yearly', priority: '0.3' },
  { path: '/termos-de-uso', changefreq: 'yearly', priority: '0.3' },
]

const ARTICLES_QUERY =
  '*[_type == "article" && defined(slug.current)]{"slug": slug.current, publishedAt, _updatedAt} | order(_updatedAt desc)'

/** Escape the five XML predefined entities. */
export function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** Normalize any date-ish value to a YYYY-MM-DD string. */
export function toIsoDate(value) {
  const d = value ? new Date(value) : new Date()
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10)
  return d.toISOString().slice(0, 10)
}

/**
 * Guard-rail: validate the Sanity result before we touch any file.
 * Throws if the payload is not a non-empty array of articles.
 */
export function assertArticles(articles) {
  if (!Array.isArray(articles)) {
    throw new Error(`Sanity returned a non-array result (${typeof articles})`)
  }
  if (articles.length === 0) {
    throw new Error('Sanity returned zero articles — refusing to write an article-less sitemap')
  }
  return articles
}

/** Render a single <url> entry. `loc` is XML-escaped here. */
function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${xmlEscape(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n')
}

/** Build the full sitemap XML string. Pure + deterministic (given buildDate). */
export function buildSitemap({ staticRoutes = STATIC_ROUTES, articles = [], buildDate = new Date() } = {}) {
  const buildLastmod = toIsoDate(buildDate)

  const staticEntries = staticRoutes.map((route) =>
    urlEntry({
      loc: `${SITE_URL}${route.path}`,
      lastmod: buildLastmod,
      changefreq: route.changefreq,
      priority: route.priority,
    }),
  )

  const articleEntries = articles.map((article) =>
    urlEntry({
      loc: `${SITE_URL}/artigos/${article.slug}`,
      lastmod: toIsoDate(article._updatedAt || article.publishedAt),
      changefreq: 'monthly',
      priority: '0.6',
    }),
  )

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...articleEntries,
    '</urlset>',
    '',
  ].join('\n')
}

async function fetchArticles() {
  const projectId = process.env.VITE_SANITY_PROJECT_ID || 'ss6d4h78'
  const dataset = process.env.VITE_SANITY_DATASET || 'production'
  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2023-05-03',
    useCdn: true,
  })
  return client.fetch(ARTICLES_QUERY)
}

async function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const outputPath = resolve(__dirname, '..', 'public', 'sitemap.xml')

  let articles
  try {
    articles = await fetchArticles()
  } catch (err) {
    console.error('[generate-sitemap] Sanity query FAILED — build aborted, existing sitemap left untouched.')
    console.error(err?.message || err)
    process.exit(1)
  }

  try {
    assertArticles(articles)
  } catch (err) {
    console.error(`[generate-sitemap] ${err.message}`)
    console.error('[generate-sitemap] Build aborted, existing sitemap left untouched.')
    process.exit(1)
  }

  const xml = buildSitemap({ articles, buildDate: new Date() })
  writeFileSync(outputPath, xml, 'utf8')

  const total = STATIC_ROUTES.length + articles.length
  console.log(
    `[generate-sitemap] Wrote ${outputPath} — ${total} URLs (${STATIC_ROUTES.length} static + ${articles.length} articles).`
  )
}

/** Slugs publicados, reusando a mesma query do sitemap. */
export async function fetchArticleSlugs() {
  const articles = await fetchArticles()
  assertArticles(articles)
  return articles.map((a) => a.slug)
}

/** Lista de paths a prerenderizar: rotas estáticas + 1 por artigo. */
export function getPrerenderRoutes(slugs = []) {
  return [
    ...STATIC_ROUTES.map((r) => r.path),
    ...slugs.map((slug) => `/artigos/${slug}`),
  ]
}

// Only run when executed directly (not when imported by tests).
if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  main()
}
